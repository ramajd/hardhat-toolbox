const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Token.sol", () => {
  let contractFactory;
  let contract;
  let owner;
  let alice;
  let bob;
  let initialSupply;
  let ownerAddress;
  let aliceAddress;
  let bobAddress;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    initialSupply = ethers.utils.parseEther("100000");
    contractFactory = await ethers.getContractFactory("Token");
    contract = await contractFactory.deploy(initialSupply);
    ownerAddress = await owner.getAddress();
    aliceAddress = await alice.getAddress();
    bobAddress = await bob.getAddress();
  });

  describe("Correct setup", () => {
    it("should be named 'MyToken'", async () => {
      const name = await contract.name();
      expect(name).to.equal("MyToken");
    });

    it("should have correct supply", async () => {
      const totalSupply = await contract.getTotalSupply();
      expect(totalSupply).to.equal(initialSupply);
    });

    it("owner should have all the supply", async () => {
      const ownerBalance = await contract.balanceOf(ownerAddress);
      const totalSupply = await contract.getTotalSupply();
      expect(ownerBalance).to.equal(totalSupply);
    });
  });

  describe("Core", () => {
    it("owner should transfer to alice and update balances", async () => {
      const transferAmount = ethers.utils.parseEther("100");
      let aliceBalance = await contract.balanceOf(aliceAddress);
      expect(aliceBalance).to.equal(0);
      await contract.transfer(transferAmount, aliceAddress);
      aliceBalance = await contract.balanceOf(aliceAddress);
      expect(aliceBalance).to.equal(transferAmount);
    });

    it("owner should transfer to alice and alice to bob", async () => {
      const transferAmount = ethers.utils.parseEther("1000");
      await contract.transfer(transferAmount, aliceAddress);
      let bobBalance = await contract.balanceOf(bobAddress);
      expect(bobBalance).to.equal(0);
      await contract.connect(alice).transfer(transferAmount, bobAddress);
      bobBalance = await contract.balanceOf(bobAddress);
      expect(bobBalance).to.equal(transferAmount);
    });

    it("should fail by depositing more than current balance", async () => {
      const failureAmount = initialSupply + 1;
      await expect(
        contract.transfer(failureAmount, aliceAddress)
      ).to.be.revertedWith("Not enough funds");
    });
  });
});
