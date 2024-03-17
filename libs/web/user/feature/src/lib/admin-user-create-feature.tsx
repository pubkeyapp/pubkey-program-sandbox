import { UserAdminCreateInput } from '@pubkey-program-sandbox/sdk'
import { useAdminFindManyUser } from '@pubkey-program-sandbox/web-user-data-access'
import { AdminUiCreateUserForm } from '@pubkey-program-sandbox/web-user-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export default function AdminUserCreateFeature() {
  const navigate = useNavigate()
  const { createUser } = useAdminFindManyUser()

  async function submit(input: UserAdminCreateInput) {
    return createUser(input)
      .then((res) => {
        if (res?.id) {
          navigate(`/admin/users/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create User">
      <UiCard>
        <AdminUiCreateUserForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
