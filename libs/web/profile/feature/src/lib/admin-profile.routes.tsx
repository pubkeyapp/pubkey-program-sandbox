import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const Create = lazy(() => import('./admin-profile-create.feature'))
const Detail = lazy(() => import('./admin-profile-detail.feature'))
const List = lazy(() => import('./admin-profile-list.feature'))

export default function AdminProfileRoutes({ ownerId }: { ownerId: string }) {
  return useRoutes([
    { path: '', element: <List ownerId={ownerId} /> },
    { path: 'create', element: <Create ownerId={ownerId} /> },
    { path: ':profileId/*', element: <Detail /> },
  ])
}
