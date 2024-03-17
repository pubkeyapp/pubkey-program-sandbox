import { Injectable } from '@nestjs/common'
import { ApiProfileDataService } from './api-profile-data.service'
import { ApiProfileDataAdminService } from './api-profile-data-admin.service'
import { ApiProfileDataUserService } from './api-profile-data-user.service'

@Injectable()
export class ApiProfileService {
  constructor(
    readonly data: ApiProfileDataService,
    readonly admin: ApiProfileDataAdminService,
    readonly user: ApiProfileDataUserService,
  ) {}
}
