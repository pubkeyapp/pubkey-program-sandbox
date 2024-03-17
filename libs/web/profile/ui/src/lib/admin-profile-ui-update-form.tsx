import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { ProfileAdminUpdateInput, Profile } from '@pubkey-program-sandbox/sdk'
import { UiStack } from '@pubkey-ui/core'

export function AdminProfileUiUpdateForm({
  submit,
  profile,
}: {
  submit: (res: ProfileAdminUpdateInput) => Promise<boolean>
  profile: Profile
}) {
  const form = useForm<ProfileAdminUpdateInput>({
    initialValues: {
      account: profile.account ?? '',

      username: profile.username ?? '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput name="account" label="account" {...form.getInputProps('account')} />

        <TextInput name="username" label="username" {...form.getInputProps('username')} />

        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
