import { Resolver } from '@nestjs/graphql'
import { ApiSolanaService } from '@pubkey-program-sandbox/api-solana-data-access'

@Resolver()
export class ApiSolanaResolver {
  constructor(private readonly service: ApiSolanaService) {}
}
