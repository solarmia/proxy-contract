import { ethers, upgrades } from 'hardhat';
import { swapRouterAddresses } from '../config';

async function main() {
    const provider = ethers.provider
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    const balance = await provider.getBalance(deployer.address)

    console.log("Account balance:", balance.toString());

    const Swapper = await ethers.getContractFactory("Swapper");
    const swapRouterAddress = swapRouterAddresses['bsctest']; // Replace with the actual Uniswap V2 Router address

    // Deploy the proxy, initializing with the Uniswap V2 Router address
    const swapper = await upgrades.deployProxy(Swapper, [swapRouterAddress], { initializer: 'initialize' });
    await swapper.waitForDeployment();

    console.log("Swapper deployed to:", await swapper.getAddress());

    // You can perform additional setup or interactions with the contract here

    // Example of upgrading the contract to a new implementation
    // Uncomment and modify the following lines when you have a new implementation
    // const SwapperV2 = await ethers.getContractFactory("SwapperV2");
    // const upgraded = await upgrades.upgradeProxy(swapper.address, SwapperV2);
    // console.log("Swapper upgraded to:", upgraded.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
