import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-program-sandbox/api-core-data-access'
import { ApiSolanaDataUserService } from './api-solana-data-user.service'
import { ApiSolanaDataService } from './api-solana-data.service'
import { ApiSolanaService } from './api-solana.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiSolanaService, ApiSolanaDataService, ApiSolanaDataUserService],
  exports: [ApiSolanaService],
})
export class ApiSolanaDataAccessModule {}
