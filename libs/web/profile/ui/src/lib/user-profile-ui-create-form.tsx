import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { ProfileUserCreateInput } from '@pubkey-program-sandbox/sdk'
import { UiStack } from '@pubkey-ui/core'

export function UserProfileUiCreateForm({ submit }: { submit: (res: ProfileUserCreateInput) => Promise<boolean> }) {
  const form = useForm<ProfileUserCreateInput>({
    initialValues: {
      account: '',

      username: '',
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
