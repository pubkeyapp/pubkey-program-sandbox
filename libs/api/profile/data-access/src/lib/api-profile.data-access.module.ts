import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-program-sandbox/api-core-data-access'
import { ApiProfileService } from './api-profile.service'
import { ApiProfileDataService } from './api-profile-data.service'
import { ApiProfileDataAdminService } from './api-profile-data-admin.service'
import { ApiProfileDataUserService } from './api-profile-data-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiProfileService, ApiProfileDataService, ApiProfileDataAdminService, ApiProfileDataUserService],
  exports: [ApiProfileService],
})
export class ApiProfileDataAccessModule {}
