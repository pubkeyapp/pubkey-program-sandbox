import { ProfileAdminCreateInput, ProfileAdminFindManyInput } from '@pubkey-program-sandbox/sdk'
import { useSdk } from '@pubkey-program-sandbox/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyProfile(props: Partial<ProfileAdminFindManyInput> & { ownerId: string }) {
  const sdk = useSdk()
  const [limit, setLimit] = useState(props?.limit ?? 10)
  const [page, setPage] = useState(props?.page ?? 1)
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: ProfileAdminFindManyInput = { page, limit, search, ownerId: props.ownerId }
  const query = useQuery({
    queryKey: ['admin', 'find-many-profile', input],
    queryFn: () => sdk.adminFindManyProfile({ input }).then((res) => res.data),
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
    createProfile: (input: ProfileAdminCreateInput) =>
      sdk
        .adminCreateProfile({ input: { ...input, ownerId: props.ownerId } })
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
      sdk.adminDeleteProfile({ profileId }).then(() => {
        toastSuccess('Profile deleted')
        return query.refetch()
      }),
  }
}
