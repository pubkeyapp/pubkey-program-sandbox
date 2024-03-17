import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProfileAdminCreateInput {
  @Field()
  account!: string

  @Field()
  username!: string

  @Field()
  ownerId!: string
}
