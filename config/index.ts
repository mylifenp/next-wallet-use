import {WagmiAdapter} from "@reown/appkit-adapter-wagmi";
import {cookieStorage, createStorage} from "@wagmi/core";
import {
  type AppKitNetwork,
  arbitrum,
  avalanche,
  base,
  defineChain,
  fantom,
  mainnet,
  optimism,
  polygon
} from '@reown/appkit/networks'


export const projectId = process.env['NEXT_PUBLIC_PROJECT_ID']
export const localnet_url = process.env['NEXT_PUBLIC_LOCALNET_URL']
export const myContractAddress = process.env['NEXT_PUBLIC_MY_CONTRACT_ADDRESS']

if (!projectId) {
  throw new Error('Project ID is not defined')
}

export const localnet = defineChain({
  id: 1337,
  caipNetworkId: 'eip155:1337',
  chainNamespace: 'eip155',
  name: 'localhost Ganache',
  nativeCurrency: {name: 'Ether', symbol: 'ETH', decimals: 18},
  rpcUrls: {
    default: {
      http: ['HTTP://127.0.0.1:7545'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://etherscan.io',
      apiUrl: 'https://api.etherscan.io/api',
    },
  },
  contracts: {},
})

export const networks = [localnet, mainnet, arbitrum, avalanche, base, optimism, polygon, fantom] as [AppKitNetwork, ...AppKitNetwork[]]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  networks,
  projectId
})

export const config = wagmiAdapter.wagmiConfig;