import { ProfileUserUpdateInput } from '@pubkey-program-sandbox/sdk'
import { useSdk } from '@pubkey-program-sandbox/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneProfile({ profileId }: { profileId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-profile', profileId],
    queryFn: () => sdk.userFindOneProfile({ profileId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    updateProfile: async (input: ProfileUserUpdateInput) =>
      sdk
        .userUpdateProfile({ profileId, input })
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
