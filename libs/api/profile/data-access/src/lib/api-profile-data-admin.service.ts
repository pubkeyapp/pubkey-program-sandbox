import { Injectable } from '@nestjs/common'
import { ProfileAdminCreateInput } from './dto/profile-admin-create.input'
import { ProfileAdminFindManyInput } from './dto/profile-admin-find-many.input'
import { ProfileAdminUpdateInput } from './dto/profile-admin-update.input'
import { ProfilePaging } from './entity/profile.entity'
import { getProfileWhereAdminInput } from './helpers/get-profile-where-admin.input'
import { ApiProfileDataService } from './api-profile-data.service'

@Injectable()
export class ApiProfileDataAdminService {
  constructor(private readonly data: ApiProfileDataService) {}

  async createProfile(input: ProfileAdminCreateInput) {
    return this.data.create(input)
  }

  async deleteProfile(profileId: string) {
    return this.data.delete(profileId)
  }

  async findManyProfile(input: ProfileAdminFindManyInput): Promise<ProfilePaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getProfileWhereAdminInput(input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneProfile(profileId: string) {
    return this.data.findOne(profileId)
  }

  async updateProfile(profileId: string, input: ProfileAdminUpdateInput) {
    return this.data.update(profileId, input)
  }
}
