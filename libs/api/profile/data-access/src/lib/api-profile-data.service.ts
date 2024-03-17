import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { ApiCoreService, PagingInputFields } from '@pubkey-program-sandbox/api-core-data-access'
import { ProfilePaging } from './entity/profile.entity'

@Injectable()
export class ApiProfileDataService {
  constructor(private readonly core: ApiCoreService) {}

  async create(input: Prisma.ProfileUncheckedCreateInput) {
    return this.core.data.profile.create({ data: input })
  }

  async delete(profileId: string) {
    await this.findOne(profileId)
    const deleted = await this.core.data.profile.delete({ where: { id: profileId } })
    return !!deleted
  }

  async findMany({
    limit = 10,
    page = 1,
    ...input
  }: Prisma.ProfileFindManyArgs & PagingInputFields): Promise<ProfilePaging> {
    return this.core.data.profile
      .paginate(input)
      .withPages({ limit, page })
      .then(([data, meta]) => ({ data, meta }))
  }

  async findOne(profileId: string) {
    const found = await this.core.data.profile.findUnique({ where: { id: profileId } })
    if (!found) {
      throw new Error('Profile not found')
    }
    return found
  }

  async update(profileId: string, input: Prisma.ProfileUpdateInput) {
    return this.core.data.profile.update({ where: { id: profileId }, data: input })
  }
}
