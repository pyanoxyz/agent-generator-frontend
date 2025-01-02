import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'


const projectId = 'b31d81470d564d07116f3d0893a387b0'

const { connectors } = getDefaultWallets({
 appName: 'My RainbowKit App',
 projectId,
})

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http()
  },
 connectors
})