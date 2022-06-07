import onboard from "bnc-onboard";
import { Subscriptions } from "bnc-onboard/dist/src/interfaces";

// GOLIVE
const INFURA_RPC_URL = `${process.env.INFURA_ENDPOINT}`;
export const MAINNET_NETWORK_ID = 1;
export const RINKEBY_NETWORK_ID = 4;

export const initOnboard = (subscriptions: Subscriptions) => {
  return onboard({
    dappId: process.env.NEXT_PUBLIC_BN_ONBOARD_API_KEY,
    hideBranding: true,
    networkId: RINKEBY_NETWORK_ID,
    subscriptions,
    darkMode: true,
    walletSelect: {
      wallets: [
        { walletName: "metamask", preferred: true },
        {
          walletName: "ledger",
          rpcUrl: INFURA_RPC_URL,
          preferred: true,
        },
        {
          walletName: "trezor",
          appUrl: "https://www.spaceprotocol.io",
          email: "info@spaceprotocol.io",
          rpcUrl: INFURA_RPC_URL,
          preferred: true,
        },
        {
          walletName: "walletConnect",
          rpc: { [RINKEBY_NETWORK_ID]: INFURA_RPC_URL },
          preferred: true,
        },
        { walletName: "trust", rpcUrl: INFURA_RPC_URL },
        { walletName: "walletLink", rpcUrl: INFURA_RPC_URL, preferred: true },
      ],
    },
    walletCheck: [
      { checkName: "derivationPath" },
      { checkName: "accounts" },
      { checkName: "connect" },
    ],
  });
};
