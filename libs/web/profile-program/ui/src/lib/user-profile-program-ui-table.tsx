import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { PubKeyProfile } from '@pubkey-program-library/anchor'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { ProfileProgramUiItem } from './profile-program-ui-item'

export function UserPubKeyProfileUiTable({
  deleteProfile,
  profiles = [],
}: {
  deleteProfile: (profileProgram: PubKeyProfile) => void
  profiles: PubKeyProfile[]
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        columns={[
          {
            accessor: 'name',
            render: (item) => <ProfileProgramUiItem profile={item} to={`./${item.username}`} />,
          },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.username}`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteProfile(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={profiles}
      />
    </ScrollArea>
  )
}
