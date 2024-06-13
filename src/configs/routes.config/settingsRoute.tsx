import { lazy } from 'react'
import { APP_PREFIX_PATH, SETTING_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, EDITOR, MANAGER, SUPER_ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

// @ts-ignore
const settingsRoute: Routes = [
    {
        key: 'settings.users',
        menu_id: ["8"],
        purpose: ["read"],
        path: `${SETTING_PREFIX_PATH}/users/user-list`,
        component: lazy(() => import('@/views/settings/users/UserList')),
        authority: [SUPER_ADMIN],
    },
    {
        key: 'settings.usersNew',
        menu_id: ["8"],
        purpose: ["create"],
        path: `${SETTING_PREFIX_PATH}/users/user-new`,
        component: lazy(() => import('@/views/settings/users/UserNew')),
        authority: [SUPER_ADMIN],
        meta: {
            header: 'Create User',
        },
    },


    {
        key: 'settings.userEdit',
        menu_id: ["8"],
        purpose: ["edit"],
        path: `${SETTING_PREFIX_PATH}/users/user-edit/:userId`,
        component: lazy(() => import('@/views/settings/users/UserEdit')),
        authority: [SUPER_ADMIN],
        meta: {
            header: 'Update User',
        },
    },
    {
        key: 'settings.roles',
        menu_id: ["11"],
        purpose: ["read"],
        path: `${SETTING_PREFIX_PATH}/roles/role-list`,
        component: lazy(() => import('@/views/settings/roles/RoleList')),
        authority: [SUPER_ADMIN],
    },
    {
        key: 'settings.rolesNew',
        menu_id: ["11"],
        purpose: ["create"],
        path: `${SETTING_PREFIX_PATH}/roles/role-new`,
        component: lazy(() => import('@/views/settings/roles/RoleNew')),
        authority: [SUPER_ADMIN],
        meta: {
            header: 'Create Role ',
        },
    },
    {
        key: 'settings.rolesEdit',
        menu_id: ["11"],
        purpose: ["edit"],
        path: `${SETTING_PREFIX_PATH}/roles/role-edit/:roleId`,
        component: lazy(() => import('@/views/settings/roles/RoleEdit')),
        authority: [SUPER_ADMIN],
        meta: {
            header: 'Update Role',
        },
    },
    {
        key: 'settings.acl',
        menu_id: ["14"],
        purpose: ["read"],
        path: `${SETTING_PREFIX_PATH}/roles/acl`,
        component: lazy(() => import('@/views/settings/roles/PermissionNew')),
        authority: [SUPER_ADMIN],
        meta: {
            header: 'Access Control List ',
        },
    },

    {
        key: 'settings.version',
        menu_id: ["13"],
        purpose: ["read"],
        path: `${SETTING_PREFIX_PATH}/version/version-list`,
        component: lazy(() => import('@/views/settings/dbVersion/VersionList')),
        authority: [SUPER_ADMIN],
    },

    {
        key: 'menus.menuList',
        menu_id: ["15"],
        purpose: ["read"],
        path: `${SETTING_PREFIX_PATH}/menus/menu-list`,
        component: lazy(() => import('@/views/settings/menus/MenuList')),
        authority: [SUPER_ADMIN],
    },
    {
        key: 'menus.menuEdit',
        menu_id: ["15"],
        purpose: ["edit"],
        path: `${SETTING_PREFIX_PATH}/menus/menu-edit/:menuId`,
        component: lazy(() => import('@/views/settings/menus/MenuEdit')),
        authority: [ SUPER_ADMIN],
        meta: {
            header: 'Update Menu',
        },
    },
    {
        key: 'menus.menuNew',
        menu_id: ["15"],
        purpose: ["create"],
        path: `${SETTING_PREFIX_PATH}/menus/menu-new`,
        component: lazy(() => import('@/views/settings/menus/MenuNew/MenuNew')),
        authority: [SUPER_ADMIN],
        meta: {
            header: 'Create Menu',
        },
    },

    {
        key: 'settings.settings',
        menu_id: ['59'],
        purpose: ['read'],
        path: `${SETTING_PREFIX_PATH}/settings/setting-list`,
        component: lazy(() => import('@/views/settings/settings/SettingList')),
        authority: [SUPER_ADMIN, ADMIN, MANAGER, EDITOR],
    },
    {
        key: 'settings.settingNew',
        menu_id: ['59'],
        purpose: ['create'],
        path: `${SETTING_PREFIX_PATH}/settings/setting-new`,
        component: lazy(() => import('@/views/settings/settings/SettingNew')),
        authority: [SUPER_ADMIN, ADMIN],
        meta: {
            header: 'Create Setting ',
        },
    },
    {
        key: 'settings.settingEdit',
        menu_id: ['59'],
        purpose: ['edit'],
        path: `${SETTING_PREFIX_PATH}/settings/setting-edit/:settingId`,
        component: lazy(() => import('@/views/settings/settings/SettingEdit')),
        authority: [SUPER_ADMIN, ADMIN],
        meta: {
            header: 'Update Setting',
        },
    },
]

export default settingsRoute
