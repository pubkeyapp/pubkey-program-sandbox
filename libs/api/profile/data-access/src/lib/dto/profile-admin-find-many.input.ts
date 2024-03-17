import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-program-sandbox/api-core-data-access'

@InputType()
export class ProfileAdminFindManyInput extends PagingInput() {
  @Field()
  ownerId!: string

  @Field({ nullable: true })
  search?: string
}
