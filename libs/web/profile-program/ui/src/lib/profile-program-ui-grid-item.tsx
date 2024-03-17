import { Paper } from '@mantine/core'
import { PubKeyProfile } from '@pubkey-program-library/anchor'
import { UiDebugModal, UiGroup } from '@pubkey-ui/core'
import { ProfileProgramUiItem } from './profile-program-ui-item'

export function ProfileProgramUiGridItem({ profile, to }: { profile: PubKeyProfile; to?: string }) {
  return (
    <Paper withBorder p="md">
      <UiGroup>
        <ProfileProgramUiItem profile={profile} to={to} />
        <UiDebugModal data={profile} />
      </UiGroup>
    </Paper>
  )
}
