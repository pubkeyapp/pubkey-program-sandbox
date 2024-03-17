import { ProfileUserCreateInput, ProfileUserFindManyInput } from '@pubkey-program-sandbox/sdk'
import { useSdk } from '@pubkey-program-sandbox/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useUserFindManyProfile(props: Partial<ProfileUserFindManyInput> = {}) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ProfileUserFindManyInput = { page, limit, search }
  const query = useQuery({
    queryKey: ['user', 'find-many-profile', input],
    queryFn: () => sdk.userFindManyProfile({ input }).then((res) => res.data),
  })
  const total = query.data?.paging?.meta?.totalCount ?? 0
  const items = query.data?.paging.data ?? []

  return {
    items,
    query,
    pagination: {
      page,
      setPage,
      limit,
      setLimit,
      total,
    },
    setSearch,
    createProfile: (input: ProfileUserCreateInput) =>
      sdk
        .userCreateProfile({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`Profile created`)
          } else {
            toastError(`Profile not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteProfile: (profileId: string) =>
      sdk.userDeleteProfile({ profileId }).then(() => {
        toastSuccess('Profile deleted')
        return query.refetch()
      }),
  }
}
