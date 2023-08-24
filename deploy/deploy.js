const { ethers } = require("hardhat");
const { randomBytes } = require("node:crypto");
const { verify } = require("../utils/verify");
module.exports = async () => {
  const signersArray = await ethers.getSigners();
  const deployer = signersArray[0];
  const user = signersArray[1];
  const randomUser = signersArray[2];

  // // Deploy SmartWallet contract
  const SmartWallet = await ethers.getContractFactory("SmartWallet", deployer);
  const smartWalletInstance = await SmartWallet.deploy();
  await smartWalletInstance.waitForDeployment(); // Await deployment confirmation

  console.log("SmartWallet deployed to:", smartWalletInstance.target);

  // Deploy WalletFactory contract
  const signer = await ethers.getSigner(
    "0x5AfB232040bb6c734486B28837AC1eE78Bae0A1A"
  );
  const WalletFactory = await ethers.getContractFactory(
    "SmartWalletFactory",
    signer
  );
  const walletFactoryInstance = await WalletFactory.deploy(
    "0xa3BE3E824827904163618C7FbFAd3Db87d4EfA11"
  );
  await walletFactoryInstance.waitForDeployment(); // Await deployment confirmation

  console.log("WalletFactory deployed to:", walletFactoryInstance.target);

  const salt = randomBytes(32);
  console.log("salt:", salt.toString("hex"));
  const upgradeDelay = 172800;
  const proxy = await walletFactoryInstance
    .connect(user)
    .createSmartWallet(randomUser.address, user.address, upgradeDelay, salt);
  await proxy.wait();
  const proxyContract = await walletFactoryInstance.getWalletAddress(
    randomUser.address,
    user.address,
    upgradeDelay,
    salt
  );
  console.log("proxy deployed to:", proxyContract);
  const proxyInstance = await ethers.getContractAt(
    "SmartWalletProxy",
    proxyContract,
    user
  );
  console.log("proxyInstance deployed to:", proxyInstance.target);
};
