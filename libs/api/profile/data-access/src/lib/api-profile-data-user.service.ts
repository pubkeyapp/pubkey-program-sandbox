import { Injectable } from '@nestjs/common'
import { ProfileUserCreateInput } from './dto/profile-user-create.input'
import { ProfileUserFindManyInput } from './dto/profile-user-find-many.input'
import { ProfileUserUpdateInput } from './dto/profile-user-update.input'
import { ProfilePaging } from './entity/profile.entity'
import { getProfileWhereUserInput } from './helpers/get-profile-where-user.input'
import { ApiProfileDataService } from './api-profile-data.service'

@Injectable()
export class ApiProfileDataUserService {
  constructor(private readonly data: ApiProfileDataService) {}

  async createProfile(ownerId: string, input: ProfileUserCreateInput) {
    return this.data.create({ ...input, ownerId })
  }

  async deleteProfile(ownerId: string, profileId: string) {
    const found = await this.data.findOne(profileId)
    if (found.ownerId !== ownerId) {
      throw new Error('You are not authorized to delete this Profile')
    }
    return this.data.delete(profileId)
  }

  async findManyProfile(ownerId: string, input: ProfileUserFindManyInput): Promise<ProfilePaging> {
    return this.data.findMany({
      orderBy: { createdAt: 'desc' },
      where: getProfileWhereUserInput(ownerId, input),
      limit: input.limit,
      page: input.page,
    })
  }

  async findOneProfile(ownerId: string, profileId: string) {
    const found = await this.data.findOne(profileId)
    if (found.ownerId !== ownerId) {
      throw new Error('You are not authorized to view this Profile')
    }
    return found
  }

  async updateProfile(ownerId: string, profileId: string, input: ProfileUserUpdateInput) {
    const found = await this.data.findOne(profileId)
    if (found.ownerId !== ownerId) {
      throw new Error('You are not authorized to update this Profile')
    }
    return this.data.update(profileId, input)
  }
}
