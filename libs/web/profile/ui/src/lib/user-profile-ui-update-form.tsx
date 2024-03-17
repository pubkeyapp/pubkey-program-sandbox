import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { ProfileUserUpdateInput, Profile } from '@pubkey-program-sandbox/sdk'
import { UiStack } from '@pubkey-ui/core'

export function UserProfileUiUpdateForm({
  submit,
  profile,
}: {
  submit: (res: ProfileUserUpdateInput) => Promise<boolean>
  profile: Profile
}) {
  const form = useForm<ProfileUserUpdateInput>({
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
