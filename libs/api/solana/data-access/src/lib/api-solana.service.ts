import { Injectable } from '@nestjs/common'
import { ApiSolanaDataUserService } from './api-solana-data-user.service'
import { ApiSolanaDataService } from './api-solana-data.service'

@Injectable()
export class ApiSolanaService {
  constructor(readonly data: ApiSolanaDataService, readonly user: ApiSolanaDataUserService) {}
}
