import { useAppConfig } from '@pubkey-program-sandbox/web-core-data-access'
import { createContext, ReactNode, useContext, useMemo } from 'react'

export interface Cluster {
  name: string
  endpoint: string
  network?: ClusterNetwork
  active?: boolean
}

export enum ClusterNetwork {
  Mainnet = 'mainnet-beta',
  Testnet = 'testnet',
  Devnet = 'devnet',
  Custom = 'custom',
}
export function guessNetwork(endpoint: string): ClusterNetwork {
  if (endpoint.toLowerCase().includes('devnet')) {
    return ClusterNetwork.Devnet
  }
  if (endpoint.toLowerCase().includes('testnet')) {
    return ClusterNetwork.Testnet
  }
  if (endpoint.toLowerCase().includes('mainnet')) {
    return ClusterNetwork.Mainnet
  }
  return ClusterNetwork.Custom
}

export interface ClusterProviderContext {
  cluster: Cluster
  getExplorerUrl(path: string): string
}

const Context = createContext<ClusterProviderContext>({} as ClusterProviderContext)

export function ClusterProvider({ children }: { children: ReactNode }) {
  const { appConfig } = useAppConfig()

  const cluster: Cluster = useMemo(() => {
    const endpoint = appConfig?.solanaEndpoint ?? ''
    const network = guessNetwork(endpoint)

    return { name: network, active: true, endpoint, network }
  }, [appConfig])

  const value: ClusterProviderContext = {
    cluster,
    getExplorerUrl: (path: string) => `https://explorer.solana.com/${path}${getClusterUrlParam(cluster)}`,
  }
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useCluster() {
  return useContext(Context)
}

function getClusterUrlParam(cluster: Cluster): string {
  let suffix = ''
  switch (cluster.network) {
    case ClusterNetwork.Devnet:
      suffix = 'devnet'
      break
    case ClusterNetwork.Mainnet:
      suffix = ''
      break
    case ClusterNetwork.Testnet:
      suffix = 'testnet'
      break
    default:
      suffix = `custom&customUrl=${encodeURIComponent(cluster.endpoint)}`
      break
  }

  return suffix.length ? `?cluster=${suffix}` : ''
}
