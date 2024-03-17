import { ProfileAdminUpdateInput } from '@pubkey-program-sandbox/sdk'
import { useSdk } from '@pubkey-program-sandbox/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useAdminFindOneProfile({ profileId }: { profileId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['admin', 'find-one-profile', profileId],
    queryFn: () => sdk.adminFindOneProfile({ profileId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateProfile: async (input: ProfileAdminUpdateInput) =>
      sdk
        .adminUpdateProfile({ profileId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Profile updated')
            await query.refetch()
            return true
          }
          toastError('Profile not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
