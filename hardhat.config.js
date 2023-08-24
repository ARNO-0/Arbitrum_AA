require("@nomicfoundation/hardhat-toolbox");

require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/HKPIXNdXAyF4k4UA5fegMXIDtjTWHLR9",
      accounts: [
        "0x1231231231231231231231231231231231231231231232132131232132133212312323",
      ],
      saveDeployments: true,
      chainId: 11155111,
    },
  },
  etherscan: {
    // yarn hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: "5RXPE6AY45BPPISI59NIRY654D17WDP66V",
  },
  solidity: "0.8.19",
};
