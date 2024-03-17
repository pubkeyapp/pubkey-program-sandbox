import { Module } from '@nestjs/common'
import { ApiSolanaDataAccessModule } from '@pubkey-program-sandbox/api-solana-data-access'
import { ApiSolanaUserResolver } from './api-solana-user.resolver'
import { ApiSolanaResolver } from './api-solana.resolver'

@Module({
  imports: [ApiSolanaDataAccessModule],
  providers: [ApiSolanaResolver, ApiSolanaUserResolver],
})
export class ApiSolanaFeatureModule {}
