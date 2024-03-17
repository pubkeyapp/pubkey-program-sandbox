import { UserProfileProgramUiCreateForm } from '@pubkey-program-sandbox/web-profile-program-ui'
import { UiBack, UiCard, UiPage } from '@pubkey-ui/core'

export default function UserProfileProgramCreateFeature() {
  async function submit(input: { username: string }) {
    console.log('create', input)
    return true
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create ProfileProgram">
      <UiCard>
        <UserProfileProgramUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
