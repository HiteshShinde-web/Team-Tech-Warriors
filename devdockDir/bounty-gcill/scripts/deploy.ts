import { ethers } from "hardhat";

async function main() {
  const Innovation = await ethers.getContractFactory("Innovation");
  const innovation = await Innovation.deploy();
  await innovation.waitForDeployment();

  console.log(`Innovation contract deployed to ${await innovation.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});