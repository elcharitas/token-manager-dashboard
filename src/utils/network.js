import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { formatBigNumber } from "./formats";
import { erc20Abi } from "./abi";

const providerOptions = {
  binancechainwallet: {
    package: true,
  },
};

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
  const eth3 = sync
    ? provider.ethersSync(process.env.NEXT_PUBLIC_RPC_NODE)
    : (await provider.ethers(chainId, logger)).getSigner();

  return new ethers.Contract(address, abi, eth3);
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
        if (instance.chainId && formatBigNumber(instance.chainId, "wei") !== String(this.chainId))
          return reject({ message: "Please switch to the required network" });
        return instance.chainId && new ethers.providers.Web3Provider(instance);
      })
      .catch(reject);
  },

  ethersSync(rpcNode = null) {
    return new ethers.providers.JsonRpcProvider(rpcNode);
  },
};
