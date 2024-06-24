import 'dotenv/config'

export const privateKey = process.env.PRIVATE_KEY!
export const apiKey = process.env.ETHER_SCAN_API_KEY!
export const alchemyKey = process.env.ALCHEMY_KEY!

export const swapRouterAddresses = {
  bsctest: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  sepolia: '0x86dcd3293C53Cf8EFd7303B57beb2a3F671dDE98',
}