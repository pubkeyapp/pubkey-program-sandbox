import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-program-sandbox/api-core-data-access'
import { ApiSolanaDataAccessModule } from '@pubkey-program-sandbox/api-solana-data-access'
import { ApiProfileDataAdminService } from './api-profile-data-admin.service'
import { ApiProfileDataProgramService } from './api-profile-data-program.service'
import { ApiProfileDataUserService } from './api-profile-data-user.service'
import { ApiProfileDataService } from './api-profile-data.service'
import { ApiProfileService } from './api-profile.service'

@Module({
  imports: [ApiCoreDataAccessModule, ApiSolanaDataAccessModule],
  providers: [
    ApiProfileService,
    ApiProfileDataService,
    ApiProfileDataAdminService,
    ApiProfileDataProgramService,
    ApiProfileDataUserService,
  ],
  exports: [ApiProfileService],
})
export class ApiProfileDataAccessModule {}
