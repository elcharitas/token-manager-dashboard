export const erc20Abi = [
  "function minAmount() public view returns (uint256)",
  "function maxAmount() public view returns (uint256)",
  "function symbol() public view returns (string)",
  "function name() public view returns (string)",
  "function initialSupply() public view returns (uint256)",
  "function balanceOf(address account) public view returns (uint256)",
  "function totalSupply() public view returns (uint256)",
  "function setLimit(uint256 _minAmount, uint256 _maxAmount) public",
  "function approve(address spender, uint256 amount) public",
  "function transfer(address to, uint256 amount) public",
];

export const feedsAbi = [
  "function latestRoundData() public view returns ( uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)",
];
