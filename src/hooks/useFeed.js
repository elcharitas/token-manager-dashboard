import snackbar from "react-hot-toast";
import { formatBigNumber, getSourceByToken } from "src/utils";
import { feedsAbi } from "src/utils/abi";
import { useApp } from "./useApp";
import { useToken } from "./useToken";

export const useTokenFeed = () => {
  const { tokenAddress, chainId } = useApp();
  const { feed } = getSourceByToken(tokenAddress, chainId);
  const { result } = useToken({
    abi: feedsAbi,
    method: "latestRoundData",
    address: feed,
    chainId,
    logger: (e) => snackbar.error(e.message),
    skip: !feed,
  });

  const [, _priceUSD, , _updatedAt] = result || [];

  return {
    priceUSD: formatBigNumber(_priceUSD, "wei"),
    updatedAt: formatBigNumber(_updatedAt, "wei"),
  };
};
