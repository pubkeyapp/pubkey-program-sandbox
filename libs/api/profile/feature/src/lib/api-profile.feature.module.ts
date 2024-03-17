import { Module } from '@nestjs/common'
import { ApiProfileDataAccessModule } from '@pubkey-program-sandbox/api-profile-data-access'
import { ApiProfileResolver } from './api-profile.resolver'
import { ApiProfileAdminResolver } from './api-profile-admin.resolver'
import { ApiProfileUserResolver } from './api-profile-user.resolver'

@Module({
  imports: [ApiProfileDataAccessModule],
  providers: [ApiProfileResolver, ApiProfileAdminResolver, ApiProfileUserResolver],
})
export class ApiProfileFeatureModule {}
