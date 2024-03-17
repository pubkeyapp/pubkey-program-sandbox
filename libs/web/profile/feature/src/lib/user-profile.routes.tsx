import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./user-profile-create.feature'))
const Detail = lazy(() => import('./user-profile-detail.feature'))
const List = lazy(() => import('./user-profile-list.feature'))

export default function UserProfileRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: 'create', element: <Create /> },
    { path: ':profileId/*', element: <Detail /> },
  ])
}
