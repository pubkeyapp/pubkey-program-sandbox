import { Group } from '@mantine/core'
import { UiBack, UiDebugModal, UiError, UiLoader, UiStack, UiTabRoute, UiTabRoutes } from '@pubkey-ui/core'
import { useAdminFindOneProfile } from '@pubkey-program-sandbox/web-profile-data-access'
import { ProfileUiItem } from '@pubkey-program-sandbox/web-profile-ui'
import { useParams } from 'react-router-dom'
import { AdminProfileDetailInfoTab } from './admin-profile-detail-info.tab'
import { AdminProfileDetailSettingsTab } from './admin-profile-detail-settings.tab'

export default function AdminProfileDetailFeature() {
  const { profileId } = useParams<{ profileId: string }>() as { profileId: string }
  const { item, query } = useAdminFindOneProfile({ profileId })

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
      element: <AdminProfileDetailInfoTab profileId={profileId} />,
    },
    {
      path: 'settings',
      label: 'Settings',
      element: <AdminProfileDetailSettingsTab profileId={profileId} />,
    },
  ]

  return (
    <UiStack>
      <Group>
        <UiBack />
        <ProfileUiItem profile={item} />
        <UiDebugModal data={item} />
      </Group>

      <UiTabRoutes tabs={tabs} />
    </UiStack>
  )
}
