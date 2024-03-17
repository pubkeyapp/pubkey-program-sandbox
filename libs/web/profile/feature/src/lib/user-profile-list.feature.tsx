import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-program-sandbox/web-core-ui'
import { useUserFindManyProfile } from '@pubkey-program-sandbox/web-profile-data-access'
import { ProfileUiGrid } from '@pubkey-program-sandbox/web-profile-ui'
import { UiBack, UiDebugModal, UiInfo, UiLoader, UiPage } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export default function UserProfileListFeature() {
  const { items, pagination, query, setSearch } = useUserFindManyProfile({
    limit: 12,
  })

  return (
    <UiPage
      title="Profiles"
      leftAction={<UiBack />}
      rightAction={
        <Group>
          <UiDebugModal data={items} />
          <Button component={Link} to="create">
            Create
          </Button>
        </Group>
      }
    >
      <Group>
        <UiSearchField placeholder="Search profile" setSearch={setSearch} />
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <ProfileUiGrid
          profiles={items}
          page={pagination.page}
          totalRecords={pagination.total}
          onPageChange={pagination.setPage}
          limit={pagination.limit}
          setLimit={pagination.setLimit}
          setPage={pagination.setPage}
        />
      ) : (
        <UiInfo message="No profiles found" />
      )}
    </UiPage>
  )
}
