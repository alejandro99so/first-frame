"use client";
import React, { useEffect, useState } from "react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import styles from "../styles/Transfer.module.css";
import Moralis from "moralis";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import { useWriteContract } from "wagmi";
import constant from "./constants.json";

const TransferPage: React.FC = () => {
    const userWallets = useUserWallets();
    const [userAddress, setUserAddress] = useState("");
    const [nftsData, setNftsData] = useState([]);
    const [message, setMessage] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [isOk, setIsOk] = useState(false);
    useEffect(() => {
        if (!isOk)
            userWallets.forEach(async (wallet) => {
                if (!wallet) return;
                console.log(wallet.address);
                setUserAddress(wallet.address);
                setIsOk(true);
            });
    }, [userWallets]);

    useEffect(() => {
        if (userAddress != "") getMyNfts();
    }, [userAddress]);
    const { data: hash, isPending, writeContract } = useWriteContract();

    const transferNFT = async (e: any) => {
        e.preventDefault();
        writeContract({
            abi: constant.CONTRACT_ABI,
            address: constant.CONTRACT_ADDRESS_BASE as `0x${string}`,
            functionName: "transferFrom",
            args: [userAddress, message, tokenId],
        });
        console.log("here: ", message);
    };

    useEffect(() => {
        console.log({ hash });
    }, [hash]);

    const getMyNfts = async () => {
        if (userAddress != "") {
            console.log({
                userAddress,
                apiKey: String(process.env.NEXT_PUBLIC_MORALIS),
            });
            try {
                await Moralis.start({
                    apiKey: String(process.env.NEXT_PUBLIC_MORALIS),
                });

                const response = await Moralis.EvmApi.nft.getWalletNFTs({
                    chain: "0x14a34",
                    format: "decimal",
                    mediaItems: true,
                    address: userAddress,
                });
                console.log({ raw: response.raw.result });
                if (response.raw.result.length > 0) {
                    setNftsData(response.raw.result as never[]);
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <div>
            <div className={styles.transfer_header}>
                <span>Transferir NFTs</span>
                <DynamicWidget />
            </div>
            <div className={styles.transfer_body}>
                {nftsData.length > 0 && (
                    <div className={styles.transfer_carrousel}>
                        {[
                            ...nftsData,
                            ...nftsData,
                            ...nftsData,
                            ...nftsData,
                            ...nftsData,
                            ...nftsData,
                        ].map((nft: any, index: number) => (
                            <div
                                key={index}
                                className={styles.transfer_carrousel_nft}
                            >
                                <Image
                                    src={`https://ipfs.io/ipfs/${
                                        nft?.media?.original_media_url.split(
                                            "//"
                                        )[1]
                                    }`}
                                    width={300}
                                    height={300}
                                    alt={`nft_${index}`}
                                />
                                {`Name: "${JSON.parse(nft.metadata).name}"`}
                                <form onSubmit={transferNFT}>
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setMessage(
                                                String(e?.target?.value)
                                            );
                                            setTokenId(nft.token_id);
                                        }}
                                        placeholder="Type address destination"
                                        required
                                    />
                                    <button type="submit">Transferir</button>
                                </form>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransferPage;
