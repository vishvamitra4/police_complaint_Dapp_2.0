require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;


module.exports = {
  solidity: '0.8.17',
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};



/*

Address of officer :  0x852C9434BbaE96e3420CC835806990d0593c9D61
Address of Contract :  0x77Eb48b0025DF171d6693Ed9cCEDE484e5fAE020

*/

