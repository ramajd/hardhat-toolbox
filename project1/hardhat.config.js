require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const deployUrl = process.env.DEPLOY_URL;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.8",
  networks: {
    rinkeby: {
      url: deployUrl,
      accounts: [`0x${privateKey}`],
    },
  },
};
