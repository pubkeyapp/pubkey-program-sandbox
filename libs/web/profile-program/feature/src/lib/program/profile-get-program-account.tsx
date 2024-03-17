import { Group } from '@mantine/core'
import { useProfileGetProgramAccount } from '@pubkey-program-sandbox/web-profile-program-data-access'
import { UiCard, UiCardTitle, UiDebugModal, UiInfoTable, UiLoader, UiStack } from '@pubkey-ui/core'
import React from 'react'

export function ProfileGetProgramAccount() {
  const query = useProfileGetProgramAccount()
  const item = query.data?.value

  return (
    <UiCard
      title={
        <Group>
          <UiCardTitle>Program Account</UiCardTitle>
          <UiDebugModal data={item} />
        </Group>
      }
    >
      {query.isLoading ? (
        <UiLoader />
      ) : (
        <UiStack>
          <UiInfoTable
            items={[
              ['Owner', item.owner],
              ['Lamports', item.lamports],
              ['Executable', item.executable ? 'Yes' : 'No'],
              ['Type', item.data?.parsed?.type],
              ['Program Data', item.data?.parsed?.info?.programData],
              ['Program', item.data?.program],
            ]}
          />
        </UiStack>
      )}
    </UiCard>
  )
}
