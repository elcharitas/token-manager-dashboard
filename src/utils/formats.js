import { utils, ethers } from "ethers";

export const parseCurrency = (value, symbol = "USD", decimals = 2) =>
  `$${symbol} ${new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: decimals,
  }).format(value)}`;

export const parseAddress = (address) => utils.getAddress(address);

export const parseNumber = (number) => ethers.BigNumber.from(utils.parseEther(number.toString()));

export const parseBytes = (string) => utils.toUtf8Bytes(string);

export const parseAbi = (abi) =>
  JSON.parse(new utils.Interface(abi).format(utils.FormatTypes.json));

export const formatBigNumber = (bigNum, unit = "ether") => utils.formatUnits(String(bigNum), unit);

export const formatBytes = (bytes) => utils.toUtf8String(bytes);
