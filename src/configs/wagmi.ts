import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { createConfig, http } from 'wagmi'
import { mainnet, polygon, goerli, polygonMumbai } from 'wagmi/chains'

// forom https://cloud.reown.com/
const projectId = 'PROJECT_ID'

const { connectors } = getDefaultWallets({
 appName: 'My RainbowKit App',
 projectId,
})

export const config = createConfig({
 chains: [mainnet, polygon, goerli, polygonMumbai],
 transports: {
   [mainnet.id]: http(),
   [polygon.id]: http(),
   [goerli.id]: http(),
   [polygonMumbai.id]: http()
 },
 connectors
})