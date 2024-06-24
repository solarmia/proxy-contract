import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

import { alchemyKey, apiKey, privateKey } from "./config";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },
  networks: {
    bsctest: {
      url: `https://data-seed-prebsc-1-s1.bnbchain.org:8545`,
      chainId: 97,
      accounts: [privateKey],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`,
      chainId: 11155111,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: apiKey,
  },
};

export default config;
