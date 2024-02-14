import authRoute from './authRoute'
import pagesRoute from './pagesRoute'
import homesRoute from './homesRoute'
import settingsRoute from './settingsRoute'
import reportsRoute from './reportsRoute'

import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    ...homesRoute,
    ...settingsRoute,
    ...pagesRoute,
    ...reportsRoute,
]
