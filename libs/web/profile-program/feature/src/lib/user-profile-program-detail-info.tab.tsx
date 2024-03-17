import { useProfileGetProfileByUsername } from '@pubkey-program-sandbox/web-profile-program-data-access'
import { ProfileProgramUiInfo } from '@pubkey-program-sandbox/web-profile-program-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserProfileProgramDetailInfoTab({ username }: { username: string }) {
  const query = useProfileGetProfileByUsername({ username })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!query.data) {
    return <UiError message="ProfileProgram not found." />
  }

  return (
    <UiCard>
      <ProfileProgramUiInfo profile={query.data} />
    </UiCard>
  )
}
