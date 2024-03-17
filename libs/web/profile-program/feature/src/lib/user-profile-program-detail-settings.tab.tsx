import { useProfileGetProfileByUsername } from '@pubkey-program-sandbox/web-profile-program-data-access'
import { UserProfileProgramUiUpdateForm } from '@pubkey-program-sandbox/web-profile-program-ui'
import { UiCard, UiError, UiLoader } from '@pubkey-ui/core'

export function UserProfileProgramDetailSettingsTab({ username }: { username: string }) {
  const query = useProfileGetProfileByUsername({ username })

  if (query.isLoading) {
    return <UiLoader />
  }
  if (!query.data) {
    return <UiError message="ProfileProgram not found." />
  }

  return (
    <UiCard>
      <UserProfileProgramUiUpdateForm
        profile={query.data}
        submit={async (res) => {
          console.log('submit', res)
          return true
        }}
      />
    </UiCard>
  )
}
