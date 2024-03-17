import { Button, Group, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { UiStack } from '@pubkey-ui/core'

export function UserProfileProgramUiFindProfileForm({
  submit,
}: {
  submit: (res: { username: string }) => Promise<boolean>
}) {
  const form = useForm<{ username: string }>({
    initialValues: {
      username: '',
    },
  })

  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <UiStack>
        <TextInput required name="username" label="Username" {...form.getInputProps('username')} />

        <Group justify="right">
          <Button type="submit">Search</Button>
        </Group>
      </UiStack>
    </form>
  )
}
