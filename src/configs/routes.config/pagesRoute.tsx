import { lazy } from 'react'
import { PAGES_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, EDITOR, MANAGER, SUPER_ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const pagesRoute: Routes = [
    {
        key: 'pages.welcome',
        path: `${PAGES_PREFIX_PATH}/welcome`,
        component: lazy(() => import('@/views/pages/Welcome')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
    {
        key: 'pages.accessDenied',
        path: '/access-denied',
        component: lazy(() => import('@/views/pages/AccessDenied')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
]

export default pagesRoute
