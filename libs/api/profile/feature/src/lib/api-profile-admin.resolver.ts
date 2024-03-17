import { Resolver } from '@nestjs/graphql'
import { ApiProfileService } from '@pubkey-program-sandbox/api-profile-data-access'
import { ApiAuthGraphQLAdminGuard } from '@pubkey-program-sandbox/api-auth-data-access'
import { Mutation, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import {
  ProfileAdminCreateInput,
  ProfileAdminFindManyInput,
  Profile,
  ProfilePaging,
  ProfileAdminUpdateInput,
} from '@pubkey-program-sandbox/api-profile-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLAdminGuard)
export class ApiProfileAdminResolver {
  constructor(private readonly service: ApiProfileService) {}

  @Mutation(() => Profile, { nullable: true })
  adminCreateProfile(@Args('input') input: ProfileAdminCreateInput) {
    return this.service.admin.createProfile(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteProfile(@Args('profileId') profileId: string) {
    return this.service.admin.deleteProfile(profileId)
  }

  @Query(() => ProfilePaging)
  adminFindManyProfile(@Args('input') input: ProfileAdminFindManyInput) {
    return this.service.admin.findManyProfile(input)
  }

  @Query(() => Profile, { nullable: true })
  adminFindOneProfile(@Args('profileId') profileId: string) {
    return this.service.admin.findOneProfile(profileId)
  }

  @Mutation(() => Profile, { nullable: true })
  adminUpdateProfile(@Args('profileId') profileId: string, @Args('input') input: ProfileAdminUpdateInput) {
    return this.service.admin.updateProfile(profileId, input)
  }
}
