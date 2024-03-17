import { Profile } from '@pubkey-program-sandbox/sdk'
import { UiInfoItems, UiInfoTable, UiTime } from '@pubkey-ui/core'

export function ProfileUiInfo({ profile }: { profile?: Profile }) {
  if (!profile) return null

  const items: UiInfoItems = [
    ['name', profile.username],
    ['Created At', <UiTime size="xs" c="dimmed" date={new Date(profile.createdAt ?? '0')} />],
    ['Updated At', <UiTime size="xs" c="dimmed" date={new Date(profile.updatedAt ?? '0')} />],
  ]

  return <UiInfoTable items={items} />
}
