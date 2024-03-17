import { ProfileUserCreateInput } from '@pubkey-program-sandbox/sdk'
import { useUserFindManyProfile } from '@pubkey-program-sandbox/web-profile-data-access'
import { UserProfileUiCreateForm } from '@pubkey-program-sandbox/web-profile-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export default function UserProfileCreateFeature() {
  const navigate = useNavigate()
  const { createProfile } = useUserFindManyProfile()

  async function submit(input: ProfileUserCreateInput) {
    return createProfile(input)
      .then((res) => {
        if (res) {
          navigate(`../${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Profile">
      <UiCard>
        <UserProfileUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
