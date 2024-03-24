"use client";
import React from "react";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import TransferPage from "../../../utils/transfer";
import { http, createConfig, WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const HomePage: React.FC = () => {
    const config = createConfig({
        chains: [baseSepolia],
        transports: {
            [baseSepolia.id]: http(),
        },
    });
    const queryClient = new QueryClient();

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <DynamicContextProvider
                    settings={{
                        environmentId: "a71ee702-ab16-4ce6-b3d9-42c6402f9fab",
                        walletConnectors: [EthereumWalletConnectors as any],
                    }}
                >
                    <TransferPage />
                </DynamicContextProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

export default HomePage;
