import { Group } from '@mantine/core'
import { useProfileGetProfileByUsername } from '@pubkey-program-sandbox/web-profile-program-data-access'
import { ProfileProgramUiItem } from '@pubkey-program-sandbox/web-profile-program-ui'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useParams } from 'react-router-dom'
import { UserProfileProgramDetailInfoTab } from './user-profile-program-detail-info.tab'
import { UserProfileProgramDetailSettingsTab } from './user-profile-program-detail-settings.tab'

export default function UserProfileProgramDetailFeature() {
  const { username } = useParams<{ username: string }>() as { username: string }
  const query = useProfileGetProfileByUsername({ username })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!query.data) {
    return <UiError message="ProfileProgram not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'info',
      label: 'Info',
      element: <UserProfileProgramDetailInfoTab username={username} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <UserProfileProgramDetailSettingsTab username={username} />,
    },
  ]

  return (
    <UiPage
      title={<ProfileProgramUiItem profile={query.data} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={query.data} />
        </Group>
      }
    >
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}
