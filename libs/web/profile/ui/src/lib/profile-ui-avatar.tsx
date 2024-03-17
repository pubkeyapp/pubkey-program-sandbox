import { Profile } from '@pubkey-program-sandbox/sdk'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type ProfileUiAvatarProps = UiAvatarProps & {
  profile?: Profile
}

export function ProfileUiAvatar({ profile, ...props }: ProfileUiAvatarProps) {
  return <UiAvatar url={undefined} name={profile?.username} {...props} />
}
