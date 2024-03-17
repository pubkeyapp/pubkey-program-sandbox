import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { ProfileAdminCreateInput } from '@pubkey-program-sandbox/sdk'
import { UiStack } from '@pubkey-ui/core'

export function AdminProfileUiCreateForm({ submit }: { submit: (res: ProfileAdminCreateInput) => Promise<boolean> }) {
  const form = useForm<ProfileAdminCreateInput>({
    initialValues: {
      account: '',

      username: '',

      ownerId: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput required name="account" label="account" {...form.getInputProps('account')} />

        <TextInput required name="username" label="username" {...form.getInputProps('username')} />

        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
