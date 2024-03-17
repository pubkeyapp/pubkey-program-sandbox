import { type UiGridRoute, UiGridRoutes } from '@pubkey-ui/core'
import { IconDashboard, IconNumber, IconWallet } from '@tabler/icons-react'
import { lazy } from 'react'

export const AccountListFeature = lazy(() => import('./account/account-list-feature'))
export const AccountDetailFeature = lazy(() => import('./account/account-detail-feature'))
export const CounterFeature = lazy(() => import('./counter/counter-feature'))
export const OverviewFeature = lazy(() => import('./overview/overview-feature'))

export default function SolanaFeature() {
  const routes: UiGridRoute[] = [
    { path: 'overview', label: 'Overview', element: <OverviewFeature />, leftSection: <IconDashboard size={20} /> },
    { path: 'accounts', label: 'Accounts', element: <AccountListFeature />, leftSection: <IconWallet size={20} /> },
    { path: 'accounts/:address', element: <AccountDetailFeature /> },
    { path: 'counter', label: 'Counter', element: <CounterFeature />, leftSection: <IconNumber size={20} /> },
  ]
  return <UiGridRoutes basePath={`/solana`} routes={routes} />
}
