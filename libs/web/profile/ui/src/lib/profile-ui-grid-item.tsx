import { Paper } from '@mantine/core'
import { Profile } from '@pubkey-program-sandbox/sdk'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { ProfileUiItem } from './profile-ui-item'

export function ProfileUiGridItem({ profile, to }: { profile: Profile; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <ProfileUiItem profile={profile} to={to} />
        <UiDebugModal data={profile} />
      </UiGroup>
    </Paper>
  )
}
