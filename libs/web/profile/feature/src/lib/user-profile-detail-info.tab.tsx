import { useUserFindOneProfile } from '@pubkey-program-sandbox/web-profile-data-access'
import { ProfileUiInfo } from '@pubkey-program-sandbox/web-profile-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserProfileDetailInfoTab({ profileId }: { profileId: string }) {
  const { item, query } = useUserFindOneProfile({ profileId })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!item) {
    return <UiError message="Profile not found." />
  }

  return (
    <UiCard>
      <ProfileUiInfo profile={item} />
    </UiCard>
  )
}
