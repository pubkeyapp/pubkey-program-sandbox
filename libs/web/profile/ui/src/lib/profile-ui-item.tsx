import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { Profile } from '@pubkey-program-sandbox/sdk'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { ProfileUiAvatar } from './profile-ui-avatar'

export function ProfileUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  profile,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  profile?: Profile
  to?: string | null
}) {
  if (!profile) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <ProfileUiAvatar profile={profile} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {profile?.username}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
