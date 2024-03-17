import { Resolver } from '@nestjs/graphql'
import { ApiProfileService } from '@pubkey-program-sandbox/api-profile-data-access'
import { ApiAuthGraphQLUserGuard, CtxUserId } from '@pubkey-program-sandbox/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  ProfileUserCreateInput,
  ProfileUserFindManyInput,
  Profile,
  ProfilePaging,
  ProfileUserUpdateInput,
} from '@pubkey-program-sandbox/api-profile-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiProfileUserResolver {
  constructor(private readonly service: ApiProfileService) {}

  @Mutation(() => Profile, { nullable: true })
  userCreateProfile(@CtxUserId() ownerId: string, @Args('input') input: ProfileUserCreateInput) {
    return this.service.user.createProfile(ownerId, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteProfile(@CtxUserId() ownerId: string, @Args('profileId') profileId: string) {
    return this.service.user.deleteProfile(ownerId, profileId)
  }

  @Query(() => ProfilePaging)
  userFindManyProfile(@CtxUserId() ownerId: string, @Args('input') input: ProfileUserFindManyInput) {
    return this.service.user.findManyProfile(ownerId, input)
  }

  @Query(() => Profile, { nullable: true })
  userFindOneProfile(@CtxUserId() ownerId: string, @Args('profileId') profileId: string) {
    return this.service.user.findOneProfile(ownerId, profileId)
  }

  @Mutation(() => Profile, { nullable: true })
  userUpdateProfile(
    @CtxUserId() ownerId: string,
    @Args('profileId') profileId: string,
    @Args('input') input: ProfileUserUpdateInput,
  ) {
    return this.service.user.updateProfile(ownerId, profileId, input)
  }
}
