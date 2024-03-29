import { Field, ObjectType, registerEnumType } from '@nestjs/graphql'
import { PubKeyIdentityProvider } from '@pubkey-program-library/anchor'
import { PagingResponse } from '@pubkey-program-sandbox/api-core-data-access'

import { User } from '@pubkey-program-sandbox/api-user-data-access'

@ObjectType()
export class Profile {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date

  @Field()
  account!: string

  @Field()
  username!: string

  @Field()
  ownerId!: string
  @Field(() => User, { nullable: true })
  owner?: User
}

@ObjectType()
export class ProfilePaging extends PagingResponse<Profile>(Profile) {}

export { PubKeyIdentityProvider }
registerEnumType(PubKeyIdentityProvider, { name: 'PubKeyIdentityProvider' })
