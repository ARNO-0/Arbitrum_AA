require("@nomicfoundation/hardhat-toolbox");

require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "avalancheTestnet",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/HKPIXNdXAyF4k4UA5fegMXIDtjTWHLR9",
      accounts: [
        "",
      ],
      saveDeployments: true,
      chainId: 11155111,
    },
    avalancheTestnet: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: [
        "",
      ],
      saveDeployments: true,
      chainId: 43113,
    },
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: "S79D78XE2THVRET1GBANCT87WEHG2F81VY",
  },
  solidity: "0.8.19",
};
