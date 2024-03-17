import { Prisma } from '@prisma/client'
import { ProfileAdminFindManyInput } from '../dto/profile-admin-find-many.input'

export function getProfileWhereAdminInput(input: ProfileAdminFindManyInput): Prisma.ProfileWhereInput {
  const where: Prisma.ProfileWhereInput = {
    ownerId: input.ownerId,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { username: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
