import md5 from "md5";

export const etherScanUrl = (address) =>
  `https://etherscan.io/address/${address}`;

export const formatAddress = (address) =>
  address.substring(0, 6) + "..." + address.substring(address.length - 4);

export const isNullAddress = (address) =>
  address && address.indexOf("0x0") === 0;

export const getGravatar = (address) =>
  `https://www.gravatar.com/avatar/${md5(address)}.jpg?d=robohash&s=500`;
