import { Injectable, Logger } from '@nestjs/common'
import { PublicKey } from '@solana/web3.js'
import { ApiSolanaDataService } from './api-solana-data.service'

@Injectable()
export class ApiSolanaDataUserService {
  private readonly logger = new Logger(ApiSolanaDataUserService.name)
  constructor(private readonly data: ApiSolanaDataService) {}

  async getBalance(account: string) {
    return this.data.getConnection().getBalance(new PublicKey(account))
  }
}
