import { useAdminFindOneProfile } from '@pubkey-program-sandbox/web-profile-data-access'
import { AdminProfileUiUpdateForm } from '@pubkey-program-sandbox/web-profile-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminProfileDetailSettingsTab({ profileId }: { profileId: string }) {
  const { item, query, updateProfile } = useAdminFindOneProfile({ profileId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Profile not found." />
  }

  return (
    <UiCard>
      <AdminProfileUiUpdateForm profile={item} submit={updateProfile} />
    </UiCard>
  )
}
