import { ethers, upgrades } from 'hardhat';
import { swapRouterAddresses } from '../config';
import { parseEther, parseUnits } from 'ethers';

async function main() {
    const provider = ethers.provider
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    const balance = await provider.getBalance(deployer.address)

    console.log("Account balance:", balance.toString());

    const Swapper = await ethers.getContractFactory("Swapper");
    const swapRouterAddress = swapRouterAddresses.sepolia; // Replace with the actual Uniswap V2 Router address

    // Deploy the proxy, initializing with the Uniswap V2 Router address
    const swapper = await upgrades.deployProxy(Swapper, [swapRouterAddress], { initializer: 'initialize' });
    const deployTx = swapper.deploymentTransaction()

    console.log("Swapper deployed to:", await swapper.getAddress());
    const deployTransactionHash = deployTx?.hash!
    const deployTransactionReceipt = await ethers.provider.getTransactionReceipt(deployTransactionHash);
    const deployGasUsed = deployTransactionReceipt?.gasUsed!;
    const deployGasPrice = deployTx?.gasPrice!;

    const deployFee = deployGasPrice * deployGasUsed
    console.log("Deploy fee:", deployFee)

    // const tokenAddress = "0x7169d38820dfd117c3fa1f22a697dba58d90ba06"; // replace with the actual token address
    // const minAmount = parseUnits("1.0", 18); // replace with the actual minimum amount required
    // const swapTx = await swapper.swapEtherToToken({ value: parseEther("0.01") });
    // const swapReceipt = await swapTx.wait()
    // const swapHash = swapReceipt.
    // const txResult = await tx.wait();
    // console.log("Gas used for swapEtherToToken:", txResult.gasUsed);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
