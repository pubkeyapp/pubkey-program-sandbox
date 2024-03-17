import { Anchor } from '@mantine/core'
import { useAppConfig } from '@pubkey-program-sandbox/web-core-data-access'
import { useCluster } from '@pubkey-program-sandbox/web-solana-data-access'
import { UiCard, UiInfoTable } from '@pubkey-ui/core'

export default function OverviewFeature() {
  const { solana } = useAppConfig()
  const { cluster, getExplorerUrl } = useCluster()
  return (
    <UiCard title="Overview">
      <UiInfoTable
        items={[
          ['Endpoint', solana.endpoint],
          [
            'Fee Payer',
            <Anchor
              c="brand"
              href={getExplorerUrl(`account/${solana.feePayer}`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {solana.feePayer}
            </Anchor>,
          ],
          ['Cluster', cluster.network],
        ]}
      />
    </UiCard>
  )
}
