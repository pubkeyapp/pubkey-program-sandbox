import { Anchor, Loader, UnstyledButton } from '@mantine/core'
import { formatSol } from '@pubkey-program-sandbox/sdk'
import { useAppConfig, useSdk } from '@pubkey-program-sandbox/web-core-data-access'
import { useCluster } from '@pubkey-program-sandbox/web-solana-data-access'
import { UiCard, UiInfoTable, UiStack } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export default function OverviewFeature() {
  const { solana } = useAppConfig()
  const { cluster, getExplorerUrl } = useCluster()
  return (
    <UiStack>
      <UiCard title="Connection">
        <UiInfoTable
          items={[
            ['Endpoint', solana.endpoint],
            ['Cluster', cluster.network],
          ]}
        />
      </UiCard>
      <UiCard title="Fee Payer">
        <UiInfoTable
          items={[
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
            ['Fee Payer Balance', <UserSolanaGetBalance account={solana.feePayer} />],
          ]}
        />
      </UiCard>
    </UiStack>
  )
}

function useUserSolanaGetBalance({ account }: { account: string }) {
  const sdk = useSdk()
  return useQuery({
    queryKey: ['userSolanaGetBalance', { account }],
    queryFn: async () => sdk.userSolanaGetBalance({ account }).then((res) => res.data?.balance ?? null),
  })
}

export function UserSolanaGetBalance({ account }: { account: string }) {
  const query = useUserSolanaGetBalance({ account })

  return query.isLoading ? (
    <Loader type="dots" size="xs" />
  ) : query.data ? (
    <UnstyledButton onClick={() => query.refetch()}>{formatSol(query.data ?? '0')}</UnstyledButton>
  ) : (
    'N/A'
  )
}
