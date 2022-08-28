import { utils, ethers } from "ethers";

export const parseCurrency = (value, symbol, decimals = 2) =>
  `${new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: decimals,
  }).format(value)} ${symbol || ""}`;

export const parseAddress = (address) => utils.getAddress(address);

export const parseNumber = (number) => ethers.BigNumber.from(utils.parseEther(number.toString()));

export const parseBytes = (string) => utils.toUtf8Bytes(string);

export const parseAbi = (abi) =>
  JSON.parse(new utils.Interface(abi).format(utils.FormatTypes.json));

export const formatBigNumber = (bigNum, unit = "ether") =>
  Number(utils.formatUnits(String(bigNum || "0x0"), unit));

export const formatBytes = (bytes) => utils.toUtf8String(bytes);
