import { Resolver } from '@nestjs/graphql'
import { ApiProfileService } from '@pubkey-program-sandbox/api-profile-data-access'
import { Profile } from '@pubkey-program-sandbox/api-profile-data-access'

@Resolver(() => Profile)
export class ApiProfileResolver {
  constructor(private readonly service: ApiProfileService) {}
}
