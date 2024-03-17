import { Field, InputType } from '@nestjs/graphql'
import { PagingInput } from '@pubkey-program-sandbox/api-core-data-access'

@InputType()
export class UserUserFindManyInput extends PagingInput() {
  @Field({ nullable: true })
  search?: string
}
