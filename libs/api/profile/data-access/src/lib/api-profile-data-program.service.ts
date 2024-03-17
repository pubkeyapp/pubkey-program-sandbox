import { Injectable } from '@nestjs/common'
import { PubKeyIdentityProvider } from '@pubkey-program-library/anchor'
import { getAnchorKeypairProvider, PubKeyProfileSdk } from '@pubkey-program-library/sdk'
import { ApiCoreService } from '@pubkey-program-sandbox/api-core-data-access'
import { ApiSolanaService } from '@pubkey-program-sandbox/api-solana-data-access'
import { PublicKey } from '@solana/web3.js'
import { ApiProfileDataService } from './api-profile-data.service'

@Injectable()
export class ApiProfileDataProgramService {
  sdk: PubKeyProfileSdk = new PubKeyProfileSdk({
    connection: this.solana.data.getConnection(),
    provider: getAnchorKeypairProvider({
      connection: this.solana.data.getConnection(),
      keypair: this.core.config.solanaFeePayer,
    }),
  })
  constructor(
    private readonly core: ApiCoreService,
    private readonly data: ApiProfileDataService,
    private readonly solana: ApiSolanaService,
  ) {}

  async getProgramAccount() {
    return this.sdk.getProgramAccount()
  }

  async getPointer({ account }: { account: string }) {
    return this.sdk.getPointer({ account: new PublicKey(account) })
  }

  async getPointerPda({ provider, providerId }: { provider: PubKeyIdentityProvider; providerId: string }) {
    return this.sdk.getPointerPda({ provider, providerId })
  }

  async getPointers() {
    return this.sdk.getPointers()
  }

  async getProfile({ account }: { account: string }) {
    return this.sdk.getProfile({ account: new PublicKey(account) })
  }

  async getProfileByUsername({ username }: { username: string }) {
    try {
      return this.sdk.getProfileByUsername({ username })
    } catch (error) {
      return null
    }
  }

  async getProfilePda({ username }: { username: string }) {
    return this.sdk.getProfilePda({ username })
  }

  async getProfiles() {
    return this.sdk.getProfiles()
  }
}
