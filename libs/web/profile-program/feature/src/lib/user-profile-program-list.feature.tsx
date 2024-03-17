import { Button, Group } from '@mantine/core'
import { useProfileGetProfiles } from '@pubkey-program-sandbox/web-profile-program-data-access'
import { ProfileProgramUiGrid } from '@pubkey-program-sandbox/web-profile-program-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'
import { ProfileProgramCardsFeature } from './program/profile-program-cards-feature'

export default function UserProfileProgramListFeature() {
  const query = useProfileGetProfiles()

  return (
    <UiPage
      title="Profiles"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={query.data} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <ProfileProgramCardsFeature />
      {query.isLoading ? (
        <UiLoader />
      ) : query.data?.length ? (
        <ProfileProgramUiGrid profiles={query.data} />
      ) : (
        <UiInfo message="No profilePrograms found" />
      )}
    </UiPage>
  )
}
