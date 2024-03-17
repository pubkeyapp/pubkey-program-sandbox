import { Injectable, Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { ApiCoreService, CORE_APP_STARTED, ellipsify } from '@pubkey-program-sandbox/api-core-data-access'
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'

@Injectable()
export class ApiSolanaDataService {
  private readonly logger = new Logger(ApiSolanaDataService.name)
  constructor(private readonly core: ApiCoreService) {}

  @OnEvent(CORE_APP_STARTED)
  async onApplicationStarted() {
    const feePayer = this.core.config.solanaFeePayer.publicKey
    const balance = await this.getConnection().getBalance(feePayer)
    this.logger.verbose(`[${ellipsify(feePayer.toString())}] Fee payer balance: ${balance / LAMPORTS_PER_SOL} SOL `)
  }

  getConnection() {
    return new Connection(this.core.config.solanaEndpoint, 'confirmed')
  }
}
