import { lazy } from 'react'
export const AdminProfileFeature = lazy(() => import('./lib/admin-profile.routes'))

export const UserProfileFeature = lazy(() => import('./lib/user-profile.routes'))
