import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core'
import { PubKeyProfile } from '@pubkey-program-library/anchor'
import { UiAnchor, UiAnchorProps } from '@pubkey-ui/core'
import { ProfileProgramUiAvatar } from './profile-program-ui-avatar'

export function ProfileProgramUiItem({
  anchorProps,
  avatarProps,
  groupProps,
  profile,
  to,
}: {
  anchorProps?: UiAnchorProps
  avatarProps?: Omit<AvatarProps, 'src'>
  groupProps?: GroupProps
  profile?: PubKeyProfile
  to?: string | null
}) {
  if (!profile) return null

  return (
    <UiAnchor to={to ?? undefined} underline="never" {...anchorProps}>
      <Group gap="sm" {...groupProps}>
        <ProfileProgramUiAvatar profile={profile} {...avatarProps} />
        <Stack gap={1}>
          <Text size="lg" fw={500}>
            {profile?.username}
          </Text>
        </Stack>
      </Group>
    </UiAnchor>
  )
}
