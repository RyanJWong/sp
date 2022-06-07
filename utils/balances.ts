import { BigNumber, ethers, Contract } from "ethers";
import { getEthersBalances } from "./eth-balance-checker";
import { fetchTokens, fetchCoinGeckoTokens } from "./tokens";
import abi from "../abi/IERC20.abi.json";
// TODO https://github.com/wbobeirne/eth-balance-checker

export const getETHBalance = async (
    provider: ethers.providers.Web3Provider,
): Promise<BigNumber> => {
    const signer = provider.getSigner();
    // console.log(`getETHBalance`, signer)
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    return balance;
};

export const getTokensBalances = async (
    provider: ethers.providers.Web3Provider,
) => {
    const tokens = await fetchTokens();

    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const tokensWithBalances = await getEthersBalances(
        provider,
        [address],
        tokens
    );
    return tokensWithBalances;
};

export const getPTBalances = async (
    provider: ethers.providers.Web3Provider,
) => {
    const tokenList = await fetchCoinGeckoTokens();
    
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const coinGeckoTokensWithBalances = await getEthersBalances(
        provider,
        [address],
        tokenList
    );
    return coinGeckoTokensWithBalances;
};

export const getSpaceBalance = async (
    provider: ethers.providers.Web3Provider,
) => {
    const tokenAddress = '0x24430Fa8C19e9b14D1daca791cdC567Da39e034D';

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    const contract = new Contract(tokenAddress, abi, provider);
    const balance = await contract.balanceOf(address);

    return BigInt(balance);
};
