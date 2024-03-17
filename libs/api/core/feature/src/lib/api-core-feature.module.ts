import { Module } from '@nestjs/common'
import { ApiAuthFeatureModule } from '@pubkey-program-sandbox/api-auth-feature'
import { ApiCoreDataAccessModule } from '@pubkey-program-sandbox/api-core-data-access'
import { ApiIdentityFeatureModule } from '@pubkey-program-sandbox/api-identity-feature'
import { ApiUserFeatureModule } from '@pubkey-program-sandbox/api-user-feature'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'
import { ApiSolanaFeatureModule } from '@pubkey-program-sandbox/api-solana-feature'
import { ApiProfileFeatureModule } from '@pubkey-program-sandbox/api-profile-feature'

const imports = [
  // The api-feature generator will add the imports here
  ApiAuthFeatureModule,
  ApiCoreDataAccessModule,
  ApiIdentityFeatureModule,
  ApiUserFeatureModule,
  ApiSolanaFeatureModule,
  ApiProfileFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [...imports],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
