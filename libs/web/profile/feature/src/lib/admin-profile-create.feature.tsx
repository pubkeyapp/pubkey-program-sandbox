import { ProfileAdminCreateInput } from '@pubkey-program-sandbox/sdk'
import { useAdminFindManyProfile } from '@pubkey-program-sandbox/web-profile-data-access'
import { AdminProfileUiCreateForm } from '@pubkey-program-sandbox/web-profile-ui'
import { toastError, UiBack, UiCard } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'
import { Group, Text } from '@mantine/core'

export default function AdminProfileCreateFeature({ ownerId }: { ownerId: string }) {
  const navigate = useNavigate()
  const { createProfile } = useAdminFindManyProfile({ ownerId })

  async function submit(input: ProfileAdminCreateInput) {
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
    <UiCard
      title={
        <Group>
          <UiBack />
          <Text size="lg" fw={500}>
            Create Profile
          </Text>
        </Group>
      }
    >
      <AdminProfileUiCreateForm submit={submit} />
    </UiCard>
  )
}
