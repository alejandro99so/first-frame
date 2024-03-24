import Web3 from "web3";
import constants from "./constants.json";

export const callContract = async (
    blockchain: "AVALANCHE" | "BASE",
    method: string,
    args: any[]
) => {
    const rpc = constants[`${blockchain}_RPC`];
    const privateKey = String(process.env.NEXT_PUBLIC_PRIVATE_KEY);
    const { _contractProxy, _proxy } = instanceContract(
        rpc,
        constants.CONTRACT_ABI,
        constants.CONTRACT_ADDRESS_AVALANCHE
    );
    const account = _proxy.eth.accounts.privateKeyToAccount(privateKey);
    if (!account) return "ACCOUNT_NOT_FOUND";
    const { address } = account;
    let balance;
    try {
        balance = await _proxy.eth.getBalance(address);
    } catch (ex: any) {
        console.log("error del balance");
        console.log({ error: ex.error });
    }
    console.log({ balance });
    let estimate;
    try {
        estimate = await _contractProxy.methods[method](...args).estimateGas({
            from: address,
        });
    } catch (e) {
        console.log(e);
        return "ERROR_ESTIMATING_GAS";
    }
    console.log({ estimate });
    if (Number(estimate) > Number(balance)) {
        return "BALANCE_IS_NOT_ENOUGH";
    }
    const txObject = {
        from: account.address,
        to: constants.CONTRACT_ADDRESS_AVALANCHE,
        gas: estimate,
        gasPrice: _proxy.utils.toWei("25", "gwei"),
        data: _contractProxy.methods[method](...args).encodeABI(),
    };
    const signedTrx = await _proxy.eth.accounts.signTransaction(
        txObject,
        privateKey
    );
    let receipt;
    try {
        receipt = await _proxy.eth.sendSignedTransaction(
            signedTrx.rawTransaction
        );
    } catch (ex: any) {
        console.log("ERROR_SENDING_TRANSACTION");
    }
    console.log(receipt);
};

const instanceContract = (rpc: string, abi: any[], contract: string) => {
    let _readOnly: Web3 = new Web3(rpc);
    let _proxy: Web3 = new Web3(rpc);
    let _contractProxy: any = new _readOnly.eth.Contract(abi, contract);
    return { _contractProxy, _proxy };
};
