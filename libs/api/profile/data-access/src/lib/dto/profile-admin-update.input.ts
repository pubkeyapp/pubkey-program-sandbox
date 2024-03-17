import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProfileAdminUpdateInput {
  @Field({ nullable: true })
  account?: string

  @Field({ nullable: true })
  username?: string
}
