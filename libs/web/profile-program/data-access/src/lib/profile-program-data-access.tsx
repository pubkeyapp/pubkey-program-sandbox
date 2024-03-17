import { PubKeyIdentityProvider } from '@pubkey-program-sandbox/sdk'
import { useSdk } from '@pubkey-program-sandbox/web-core-data-access'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useProfileGetProgramAccount() {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['useProfileGetProgramAccount'],
    queryFn: () => sdk.profileGetProgramAccount().then((res) => res.data.item),
  })
}
export function useProfileGetPointer() {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (account: string) => sdk.profileGetPointer({ account }),
  })
}
export function useProfileGetPointerPda() {
  const sdk = useSdk()

  return useMutation({
    mutationFn: ({ provider, providerId }: { provider: PubKeyIdentityProvider; providerId: string }) =>
      sdk.profileGetPointerPda({ provider, providerId }),
  })
}
export function useProfileGetPointers() {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['useProfileGetPointers'],
    queryFn: () => sdk.profileGetPointers().then((res) => res.data.items),
  })
}
export function useProfileGetProfile() {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (account: string) => sdk.profileGetProfile({ account }),
  })
}
export function useProfileGetProfileByUsernameQ() {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (username: string) => sdk.profileGetProfileByUsername({ username }),
  })
}

export function useProfileGetProfileByUsername({ username }: { username: string }) {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['useProfileGetProfileByUsername'],
    queryFn: () => sdk.profileGetProfileByUsername({ username }).then((res) => res.data.item),
    retry: false,
  })
}

export function useProfileGetProfilePda() {
  const sdk = useSdk()

  return useMutation({
    mutationFn: (username: string) => sdk.profileGetProfilePda({ username }),
  })
}
export function useProfileGetProfiles() {
  const sdk = useSdk()

  return useQuery({
    queryKey: ['useProfileGetProfiles'],
    queryFn: () => sdk.profileGetProfiles().then((res) => res.data.items),
  })
}
