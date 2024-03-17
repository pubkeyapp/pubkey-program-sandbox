import { Prisma } from '@prisma/client'
import { ProfileUserFindManyInput } from '../dto/profile-user-find-many.input'

export function getProfileWhereUserInput(ownerId: string, input: ProfileUserFindManyInput): Prisma.ProfileWhereInput {
  const where: Prisma.ProfileWhereInput = {
    ownerId: ownerId,
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { username: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
