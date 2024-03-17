import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphQLUserGuard } from '@pubkey-program-sandbox/api-auth-data-access'
import { ApiSolanaService } from '@pubkey-program-sandbox/api-solana-data-access'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiSolanaUserResolver {
  constructor(private readonly service: ApiSolanaService) {}

  @Query(() => String)
  userSolanaGetBalance(@Args('account') account: string) {
    return this.service.user.getBalance(account)
  }
}
