import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { PubKeyProfile } from '@pubkey-program-library/anchor'
import { UiStack } from '@pubkey-ui/core'

export function UserProfileProgramUiUpdateForm({
  submit,
  profile,
}: {
  submit: (res: { avatarUrl: string }) => Promise<boolean>
  profile: PubKeyProfile
}) {
  const form = useForm<{ avatarUrl: string }>({
    initialValues: {
      avatarUrl: profile.avatarUrl ?? '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput name="avatarUrl" label="Avatar URL" {...form.getInputProps('avatarUrl')} />

        <Group justify="right">
          <Button type="submit">Save</Button>
        </Group>
      </UiStack>
    </form>
  )
}
