import { getDefaultWallets, } from '@rainbow-me/rainbowkit'
import { createConfig, http } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'


const projectId = '43798cd19f10807149b21bac552ccf8d'

const { connectors, } = getDefaultWallets({
  appName: 'Pyano.fun',
  projectId,
})

export const config = createConfig({
  chains: [base, mainnet],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http()
  },
  connectors,
})