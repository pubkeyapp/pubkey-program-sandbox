import { UiDashboard } from '@pubkey-program-sandbox/web-core-ui'
import { UserProfileFeature } from '@pubkey-program-sandbox/web-profile-feature'
import { UserProfileProgramFeature } from '@pubkey-program-sandbox/web-profile-program-feature'
import { SettingsFeature } from '@pubkey-program-sandbox/web-settings-feature'
import { SolanaFeature } from '@pubkey-program-sandbox/web-solana-feature'
import { UserFeature } from '@pubkey-program-sandbox/web-user-feature'
import { UiDashboardItem, UiNotFound } from '@pubkey-ui/core'
import { IconCurrencySolana, IconSettings, IconUsers } from '@tabler/icons-react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

const links: UiDashboardItem[] = [
  // User Dashboard Links are added by the web-crud generator
  { label: 'Settings', icon: IconSettings, to: '/settings' },
  { label: 'Solana', icon: IconCurrencySolana, to: '/solana' },
  { label: 'Users', icon: IconUsers, to: '/u' },
  { label: 'Profiles', icon: IconSettings, to: '/profiles' },
  { label: 'Profile Program', icon: IconSettings, to: '/profile-program' },
]

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/u/*', element: <UserFeature /> },
  { path: '/profiles/*', element: <UserProfileFeature /> },
  { path: '/profile-program/*', element: <UserProfileProgramFeature /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: '/dashboard', element: <UiDashboard links={links} /> },
    ...routes,
    { path: '*', element: <UiNotFound to="/dashboard" /> },
  ])
}
