import { Module } from '@nestjs/common'
import { ApiProfileDataAccessModule } from '@pubkey-program-sandbox/api-profile-data-access'
import { ApiProfileAdminResolver } from './api-profile-admin.resolver'
import { ApiProfileProgramResolver } from './api-profile-program.resolver'
import { ApiProfileUserResolver } from './api-profile-user.resolver'
import { ApiProfileResolver } from './api-profile.resolver'

@Module({
  imports: [ApiProfileDataAccessModule],
  providers: [ApiProfileResolver, ApiProfileAdminResolver, ApiProfileProgramResolver, ApiProfileUserResolver],
})
export class ApiProfileFeatureModule {}
