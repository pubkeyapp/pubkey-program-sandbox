import { Injectable } from '@nestjs/common'
import { ApiProfileDataAdminService } from './api-profile-data-admin.service'
import { ApiProfileDataProgramService } from './api-profile-data-program.service'
import { ApiProfileDataUserService } from './api-profile-data-user.service'
import { ApiProfileDataService } from './api-profile-data.service'

@Injectable()
export class ApiProfileService {
  constructor(
    readonly data: ApiProfileDataService,
    readonly admin: ApiProfileDataAdminService,
    readonly program: ApiProfileDataProgramService,
    readonly user: ApiProfileDataUserService,
  ) {}
}
