// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Token - a simple example (non - ERC20 compliant) token contract.
 */
contract Token {
    address private owner;

    string public constant name = "MyToken";

    uint256 private totalSupply;

    mapping(address => uint256) private balances;

    /**
     * @param _totalSupply total supply ever exists
     */
    constructor(uint256 _totalSupply) {
        owner = msg.sender;
        totalSupply = _totalSupply;
        balances[owner] += totalSupply;
    }

    /**
     * @param _amount amount to transfer. needs to be less than msg.sender balance
     * @param _to receiver address
     */
    function transfer(uint256 _amount, address _to) external {
        require(_amount <= balances[msg.sender], "Not enough funds");
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }

    /**
     *@param _address address to view balance
     */
    function balanceOf(address _address)
        external
        view
        returns (uint256 result)
    {
        result = balances[_address];
    }

    /**
     * @notice returns the total supply
     */
    function getTotalSupply() external view returns (uint256 _totalSuply) {
        _totalSuply = totalSupply;
    }
}
