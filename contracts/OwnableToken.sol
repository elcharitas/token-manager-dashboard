// SPDX-License-Identifier: MIT
pragma solidity <=0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract OwnableToken is ERC20, Ownable {
    uint256 public immutable initialSupply;

    uint256 public minAmount;
    uint256 public maxAmount;

    constructor(uint256 _initialSupply) ERC20("OwnableToken", "OTX") {
        initialSupply = _initialSupply;
        _mint(msg.sender, _initialSupply);
    }

    function setLimit(uint256 _minAmount, uint256 _maxAmount) external {
        minAmount = _minAmount;
        maxAmount = _maxAmount;
    }
}
