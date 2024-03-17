import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./user-profile-program-create.feature'))
const Detail = lazy(() => import('./user-profile-program-detail.feature'))
const List = lazy(() => import('./user-profile-program-list.feature'))

export default function UserProfileProgramRoutes() {
  return useRoutes([
    { path: '', element: <List /> },
    { path: 'create', element: <Create /> },
    { path: ':username/*', element: <Detail /> },
  ])
}
