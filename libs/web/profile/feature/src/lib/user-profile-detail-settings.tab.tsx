import { useUserFindOneProfile } from '@pubkey-program-sandbox/web-profile-data-access'
import { UserProfileUiUpdateForm } from '@pubkey-program-sandbox/web-profile-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserProfileDetailSettingsTab({ profileId }: { profileId: string }) {
  const { item, query, updateProfile } = useUserFindOneProfile({ profileId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Profile not found." />
  }

  return (
    <UiCard>
      <UserProfileUiUpdateForm profile={item} submit={updateProfile} />
    </UiCard>
  )
}
