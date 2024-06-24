import { ethers, upgrades } from "hardhat";

async function main() {
    const provider = ethers.provider
    const [deployer] = await ethers.getSigners();

    console.log("Upgrading contracts with the account:", deployer.address);
    const balance = await provider.getBalance(deployer.address)

    console.log("Account balance:", balance.toString());

    const proxyAddress = "0xYourProxyAddressHere"; // Replace with the address of the deployed proxy

    const SwapperV2 = await ethers.getContractFactory("SwapperV2");

    // Upgrade the proxy to the new implementation
    const upgraded = await upgrades.upgradeProxy(proxyAddress, SwapperV2);
    await upgraded.deployed();

    console.log("Swapper upgraded to SwapperV2 at:", upgraded.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
