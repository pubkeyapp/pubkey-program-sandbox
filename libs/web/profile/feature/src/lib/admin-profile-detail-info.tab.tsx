import { useAdminFindOneProfile } from '@pubkey-program-sandbox/web-profile-data-access'
import { ProfileUiInfo } from '@pubkey-program-sandbox/web-profile-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function AdminProfileDetailInfoTab({ profileId }: { profileId: string }) {
  const { item, query } = useAdminFindOneProfile({ profileId })

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
