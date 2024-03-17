import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiPage, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useUserFindOneProfile } from '@pubkey-program-sandbox/web-profile-data-access'
import { ProfileUiItem } from '@pubkey-program-sandbox/web-profile-ui'
import { useParams } from 'react-router-dom'
import { UserProfileDetailInfoTab } from './user-profile-detail-info.tab'
import { UserProfileDetailSettingsTab } from './user-profile-detail-settings.tab'

export default function UserProfileDetailFeature() {
  const { profileId } = useParams<{ profileId: string }>() as { profileId: string }
  const { item, query } = useUserFindOneProfile({ profileId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Profile not found." />
  }

  const tabs: UiTabRoute[] = [
    {
      path: 'info',
      label: 'Info',
      element: <UserProfileDetailInfoTab profileId={profileId} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <UserProfileDetailSettingsTab profileId={profileId} />,
    },
  ]

  return (
    <UiPage
      title={<ProfileUiItem profile={item} />}
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      <UiTabRoutes tabs={tabs} />
    </UiPage>
  )
}
