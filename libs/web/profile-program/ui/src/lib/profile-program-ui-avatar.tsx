import { PubKeyProfile } from '@pubkey-program-library/anchor'
import { UiAvatar, UiAvatarProps } from '@pubkey-ui/core'

export type ProfileProgramUiAvatarProps = UiAvatarProps & {
  profile?: PubKeyProfile
}

export function ProfileProgramUiAvatar({ profile, ...props }: ProfileProgramUiAvatarProps) {
  return <UiAvatar url={profile?.avatarUrl} name={profile?.username} {...props} />
}
