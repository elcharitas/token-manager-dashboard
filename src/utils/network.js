import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { formatBigNumber } from "./formats";
import { erc20Abi } from "./abi";

const providerOptions = {
  binancechainwallet: {
    package: true,
  },
};

export const networks = {
  1: {
    id: "mainnet",
    name: "Homestead (Mainnet)",
  },
  3: {
    id: "ropsten",
    name: "Ropsten (Testnet)",
  },
  4: {
    id: "rinkeby",
    name: "Rinkeby (Testnet)",
  },
  5: {
    id: "goerli",
    name: "Goerli (Testnet)",
  },
  137: {
    id: "polygon-mainnet",
    name: "Polygon (Mainnet)",
  },
  80001: {
    id: "polygon-mumbai",
    name: "Mumbai (Testnet)",
  },
};

/**
 *
 * @param {keyof networks} network
 * @returns
 */
const getRPCNode = (network) =>
  `https://${networks[network].id}.infura.io/v3/${process.env.NEXT_PUBLIC_RPC_KEY}`;

export const web3Modal = (chainId, theme = "dark") => {
  return new Web3Modal({
    theme,
    network: chainId,
    cacheProvider: true,
    disableInjectedProvider: false,
    providerOptions,
  });
};

export const manager = async ({
  logger = () => {},
  sync = false,
  chainId,
  address,
  abi = erc20Abi,
}) => {
  const rpcNode = getRPCNode(chainId);
  const syncProvider = provider.ethersSync(rpcNode);
  const eth3 = !sync && (await provider.ethers(chainId, logger))?.getSigner();

  return new ethers.Contract(address, abi, eth3 || syncProvider);
};

export const provider = {
  chainId: null,
  instance: null,

  async connect(chainId, reject) {
    if (!this.instance) {
      this.instance = await web3Modal(chainId).connect().catch(reject);
    }
    this.chainId = chainId;
    return typeof this.instance === "object" && this.instance;
  },

  async disconnect() {
    web3Modal().clearCachedProvider();
    this.instance = null;
  },

  async ethers(chainId, reject) {
    return await this.connect(chainId, reject)
      .then((instance) => {
        if (!instance)
          return reject({
            message: "No available wallet instance. Try using a dApp browser",
          });
        if (
          instance.chainId &&
          formatBigNumber(instance.chainId, "wei").toString() !== String(chainId)
        )
          return reject({ message: `Please switch to ${networks[chainId].name} network` });
        return instance.chainId && new ethers.providers.Web3Provider(instance);
      })
      .catch(reject);
  },

  ethersSync(rpcNode = null) {
    return new ethers.providers.JsonRpcProvider(rpcNode);
  },
};
