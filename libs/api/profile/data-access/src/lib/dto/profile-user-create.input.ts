import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProfileUserCreateInput {
  @Field()
  account!: string

  @Field()
  username!: string
}
