import { SimpleGrid } from '@mantine/core'
import { PubKeyProfile } from '@pubkey-program-library/anchor'
import { UiStack } from '@pubkey-ui/core'
import { ProfileProgramUiGridItem } from './profile-program-ui-grid-item'

export function ProfileProgramUiGrid({ profiles = [] }: { profiles: PubKeyProfile[] }) {
  return (
    <UiStack>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {profiles.map((profile) => (
          <ProfileProgramUiGridItem key={profile.username} to={profile.username} profile={profile} />
        ))}
      </SimpleGrid>
    </UiStack>
  )
}
