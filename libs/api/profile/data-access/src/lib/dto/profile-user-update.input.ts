import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProfileUserUpdateInput {
  @Field({ nullable: true })
  account?: string

  @Field({ nullable: true })
  username?: string
}
