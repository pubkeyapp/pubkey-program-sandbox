import {
  Profile,
  ProfileAdminCreateInput,
  ProfileAdminFindManyInput,
  ProfileAdminUpdateInput,
} from '@pubkey-program-sandbox/sdk'
import { getAliceCookie, getBobCookie, sdk, uniqueId } from '../support'

describe('api-profile-feature', () => {
  describe('api-profile-admin-resolver', () => {
    const profileName = uniqueId('acme-profile')
    let profileId: string
    let cookie: string

    beforeAll(async () => {
      cookie = await getAliceCookie()
      const created = await sdk.adminCreateProfile(
        { input: { username: profileName, account: profileName, ownerId: 'alice' } },
        { cookie },
      )
      profileId = created.data.created.id
    })

    describe('authorized', () => {
      beforeAll(async () => {
        cookie = await getAliceCookie()
      })

      it('should create a profile', async () => {
        const input: ProfileAdminCreateInput = {
          ownerId: 'alice',
          account: uniqueId('profile'),
          username: uniqueId('profile'),
        }

        const res = await sdk.adminCreateProfile({ input }, { cookie })

        const item: Profile = res.data.created
        expect(item.username).toBe(input.username)
        expect(item.id).toBeDefined()
        expect(item.createdAt).toBeDefined()
        expect(item.updatedAt).toBeDefined()
      })

      it('should update a profile', async () => {
        const createInput: ProfileAdminCreateInput = {
          ownerId: 'alice',
          account: uniqueId('profile'),
          username: uniqueId('profile'),
        }
        const createdRes = await sdk.adminCreateProfile({ input: createInput }, { cookie })
        const profileId = createdRes.data.created.id
        const input: ProfileAdminUpdateInput = {
          account: uniqueId('profile'),
          username: uniqueId('profile'),
        }

        const res = await sdk.adminUpdateProfile({ profileId, input }, { cookie })

        const item: Profile = res.data.updated
        expect(item.username).toBe(input.username)
      })

      it('should find a list of profiles (find all)', async () => {
        const createInput: ProfileAdminCreateInput = {
          ownerId: 'alice',
          account: uniqueId('profile'),
          username: uniqueId('profile'),
        }
        const createdRes = await sdk.adminCreateProfile({ input: createInput }, { cookie })
        const profileId = createdRes.data.created.id

        const input: ProfileAdminFindManyInput = {
          ownerId: 'alice',
        }

        const res = await sdk.adminFindManyProfile({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBeGreaterThan(1)
        expect(res.data.paging.data.length).toBeGreaterThan(1)
        // First item should be the one we created above
        expect(res.data.paging.data.map((i) => i.id)).toContain(profileId)
      })

      it('should find a list of profiles (find new one)', async () => {
        const createInput: ProfileAdminCreateInput = {
          ownerId: 'alice',
          account: uniqueId('profile'),
          username: uniqueId('profile'),
        }
        const createdRes = await sdk.adminCreateProfile({ input: createInput }, { cookie })
        const profileId = createdRes.data.created.id

        const input: ProfileAdminFindManyInput = {
          ownerId: 'alice',
          search: profileId,
        }

        const res = await sdk.adminFindManyProfile({ input }, { cookie })

        expect(res.data.paging.meta.totalCount).toBe(1)
        expect(res.data.paging.data.length).toBe(1)
        expect(res.data.paging.data[0].id).toBe(profileId)
      })

      it('should find a profile by id', async () => {
        const createInput: ProfileAdminCreateInput = {
          ownerId: 'alice',
          account: uniqueId('profile'),
          username: uniqueId('profile'),
        }
        const createdRes = await sdk.adminCreateProfile({ input: createInput }, { cookie })
        const profileId = createdRes.data.created.id

        const res = await sdk.adminFindOneProfile({ profileId }, { cookie })

        expect(res.data.item.id).toBe(profileId)
      })

      it('should delete a profile', async () => {
        const createInput: ProfileAdminCreateInput = {
          ownerId: 'alice',
          account: uniqueId('profile'),
          username: uniqueId('profile'),
        }
        const createdRes = await sdk.adminCreateProfile({ input: createInput }, { cookie })
        const profileId = createdRes.data.created.id

        const res = await sdk.adminDeleteProfile({ profileId }, { cookie })

        expect(res.data.deleted).toBe(true)

        const findRes = await sdk.adminFindManyProfile({ input: { ownerId: 'alice', search: profileId } }, { cookie })
        expect(findRes.data.paging.meta.totalCount).toBe(0)
        expect(findRes.data.paging.data.length).toBe(0)
      })
    })

    describe('unauthorized', () => {
      let cookie: string
      beforeAll(async () => {
        cookie = await getBobCookie()
      })

      it('should not create a profile', async () => {
        expect.assertions(1)
        const input: ProfileAdminCreateInput = {
          ownerId: 'alice',
          account: uniqueId('profile'),
          username: uniqueId('profile'),
        }

        try {
          await sdk.adminCreateProfile({ input }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not update a profile', async () => {
        expect.assertions(1)
        try {
          await sdk.adminUpdateProfile({ profileId, input: {} }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a list of profiles (find all)', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindManyProfile({ input: { ownerId: 'alice' } }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not find a profile by id', async () => {
        expect.assertions(1)
        try {
          await sdk.adminFindOneProfile({ profileId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })

      it('should not delete a profile', async () => {
        expect.assertions(1)
        try {
          await sdk.adminDeleteProfile({ profileId }, { cookie })
        } catch (e) {
          expect(e.message).toBe('Unauthorized: User is not Admin')
        }
      })
    })
  })
})
