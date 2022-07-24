export const erc20Abi = [
  "function minAmount() public view returns (uint256)",
  "function maxAmount() public view returns (uint256)",
  "function symbol() public view returns (string)",
  "function name() public view returns (string)",
  "function initialSupply() public view returns (uint256)",
  "function totalSupply() public view returns (uint256)",
  "function setLimit(uint256 _minAmount, uint256 _maxAmount) public",
  "function approve(address spender, uint256 amount) public",
  "function transfer(address to, uint256 amount) public",
];
