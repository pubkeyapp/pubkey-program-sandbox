import { Text } from '@mantine/core'
import {
  useProfileGetPointer,
  useProfileGetProfileByUsername,
} from '@pubkey-program-sandbox/web-profile-program-data-access'
import {
  ProfileProgramUiItem,
  UserProfileProgramUiFindProfileForm,
} from '@pubkey-program-sandbox/web-profile-program-ui'
import { UiAlert, UiCard, UiDebug, UiInfo, UiLoader, UiStack } from '@pubkey-ui/core'
import React, { useEffect, useState } from 'react'
import { ProfileGetProgramAccount } from './profile-get-program-account'

export function ProfileProgramCardsFeature() {
  return (
    <UiStack>
      <ProfileGetProgramAccount />
      <UiCard title="Profiles">
        <UiStack>
          <UiInfo message="This is a feature" />
          <ProfileGetProfileByUsername />
        </UiStack>
      </UiCard>
    </UiStack>
  )
}

function ProfileGetProfileByUsername() {
  const mutation = useProfileGetPointer()
  const [username, setUsername] = useState<string | undefined>(undefined)
  return mutation.isPending ? (
    <UiLoader />
  ) : (
    <UiStack>
      <UserProfileProgramUiFindProfileForm
        submit={async (data) => {
          setUsername(data.username)
          return true
        }}
      />
      {username ? (
        <FindByUsername username={username} />
      ) : (
        <div>
          <Text>Enter a username to get started</Text>
        </div>
      )}
      <UiDebug data={mutation.data} open />
    </UiStack>
  )
}

function FindByUsername({ username }: { username: string }) {
  const query = useProfileGetProfileByUsername({ username })

  useEffect(() => {
    query.refetch()
  }, [username])
  return query.isPending ? (
    <UiLoader />
  ) : query.data ? (
    <ProfileProgramUiItem profile={query.data} />
  ) : (
    <UiAlert message={`Profile not found for ${username}`} />
  )
}
