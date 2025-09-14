const { ethers } = require("hardhat");

async function main() {
  // Get contract factory
  const Voting = await ethers.getContractFactory("Voting");

  // Deploy with constructor arguments
  const voting = await Voting.deploy(["Alice", "Bob", "Charlie"]);

  // Wait for deployment
  await voting.waitForDeployment();

  console.log("Voting contract deployed to:", await voting.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
