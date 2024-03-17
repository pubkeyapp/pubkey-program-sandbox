import { Button, Group } from '@mantine/core'
import { UiPageLimit, UiSearchField } from '@pubkey-program-sandbox/web-core-ui'
import { useAdminFindManyProfile } from '@pubkey-program-sandbox/web-profile-data-access'
import { AdminProfileUiTable } from '@pubkey-program-sandbox/web-profile-ui'
import { UiDebugModal, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import { Link } from 'react-router-dom'

export default function AdminProfileListFeature({ ownerId }: { ownerId: string }) {
  const { deleteProfile, items, pagination, query, setSearch } = useAdminFindManyProfile({
    limit: 10,
    ownerId,
  })

  return (
    <UiStack>
      <Group>
        <UiSearchField placeholder="Search profile" setSearch={setSearch} />
        <UiPageLimit limit={pagination.limit} setLimit={pagination.setLimit} setPage={pagination.setPage} />

        <UiDebugModal data={items} />
        <Button component={Link} to="create">
          Create
        </Button>
      </Group>

      {query.isLoading ? (
        <UiLoader />
      ) : items?.length ? (
        <AdminProfileUiTable
          deleteProfile={(profile) => {
            if (!window.confirm('Are you sure?')) return
            return deleteProfile(profile.id)
          }}
          profiles={items}
          page={pagination.page}
          totalRecords={pagination.total}
          recordsPerPage={pagination.limit}
          onPageChange={(page) => void pagination.setPage(page)}
        />
      ) : (
        <UiInfo message="No profiles found" />
      )}
    </UiStack>
  )
}
