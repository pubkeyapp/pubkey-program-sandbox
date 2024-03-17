import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@pubkey-program-sandbox/api-auth-data-access'
import { ApiProfileService, PubKeyIdentityProvider } from '@pubkey-program-sandbox/api-profile-data-access'
import { GraphQLJSON } from 'graphql-scalars'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiProfileProgramResolver {
  constructor(private readonly service: ApiProfileService) {}

  @Query(() => GraphQLJSON, { nullable: true })
  profileGetProgramAccount() {
    return this.service.program.getProgramAccount()
  }
  @Query(() => GraphQLJSON, { nullable: true })
  profileGetPointer(@Args('account') account: string) {
    return this.service.program.getPointer({ account })
  }
  @Query(() => GraphQLJSON, { nullable: true })
  profileGetPointerPda(
    @Args({ name: 'provider', type: () => PubKeyIdentityProvider }) provider: PubKeyIdentityProvider,
    @Args('providerId') providerId: string,
  ) {
    return this.service.program.getPointerPda({ provider, providerId })
  }
  @Query(() => GraphQLJSON, { nullable: true })
  profileGetPointers() {
    return this.service.program.getPointers()
  }
  @Query(() => GraphQLJSON, { nullable: true })
  profileGetProfile(@Args('account') account: string) {
    return this.service.program.getProfile({ account })
  }
  @Query(() => GraphQLJSON, { nullable: true })
  profileGetProfileByUsername(@Args('username') username: string) {
    return this.service.program.getProfileByUsername({ username })
  }
  @Query(() => GraphQLJSON, { nullable: true })
  profileGetProfilePda(@Args('username') username: string) {
    return this.service.program.getProfilePda({ username })
  }
  @Query(() => GraphQLJSON, { nullable: true })
  profileGetProfiles() {
    return this.service.program.getProfiles()
  }
}
