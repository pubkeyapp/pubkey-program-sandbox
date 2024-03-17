import { PubKeyProfile } from '@pubkey-program-library/anchor'
import { UiInfoItems, UiInfoTable } from '@pubkey-ui/core'

export function ProfileProgramUiInfo({ profile }: { profile?: PubKeyProfile }) {
  if (!profile) return null

  const items: UiInfoItems = [
    ['Username', profile.username],
    ['Public Key', profile.publicKey.toString()],
    ['Avatar URL', profile.avatarUrl],
    ['Fee Payer', profile.feePayer?.toString()],
  ]

  return <UiInfoTable items={items} />
}
