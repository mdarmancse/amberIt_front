import {
    APP_PREFIX_PATH,
    SETTING_PREFIX_PATH,
} from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, EDITOR, MANAGER, SUPER_ADMIN } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const settingsNavigationConfig: NavigationTree[] = [
    {
        key: 'settings',
        path: '',
        title: 'Settings',
        menu_id: ["8","11","13","14","15","59"],
        purpose:["create","read","edit","delete"],
        translateKey: 'nav.settings',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [SUPER_ADMIN],
        subMenu: [
            {
                key: 'settings.users',
                path: '',
                menu_id: ["8"],
                purpose: ["read"],
                title: 'Users',
                translateKey: 'nav.appsSettings.users',
                icon: 'users',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [SUPER_ADMIN],
                subMenu: [
                    {
                        key: 'settings.users',
                        menu_id: ["8"],
                        purpose: ["read"],
                        path: `${SETTING_PREFIX_PATH}/users/user-list`,
                        title: 'Users',
                        translateKey: 'nav.users.user-list',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [SUPER_ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'users.user-create',
                        menu_id: ["8"],
                        purpose: ["create"],
                        path: `${SETTING_PREFIX_PATH}/users/user-new`,
                        title: 'Create User',
                        translateKey: 'nav.users.user-create',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [SUPER_ADMIN],
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'settings.roles',
                path: `${SETTING_PREFIX_PATH}/roles/role-list`,
                menu_id: ["11"],
                purpose: ["read"],
                title: 'Roles',
                translateKey: 'nav.appsSettings.roles',
                icon: 'roles',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [SUPER_ADMIN],
                subMenu: [
                    {
                        key: 'settings.roles',
                        menu_id: ["11"],
                        purpose: ["read"],
                        path: `${SETTING_PREFIX_PATH}/roles/role-list`,
                        title: 'Roles',
                        translateKey: 'nav.roles.role-list',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [SUPER_ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'roles.role-create',
                        menu_id: ["11"],
                        purpose: ["create"],
                        path: `${SETTING_PREFIX_PATH}/roles/role-new`,
                        title: 'Create Role',
                        translateKey: 'nav.roles.role-create',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [SUPER_ADMIN],
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'settings.version',
                menu_id: ["13"],
                purpose: ["create"],
                path: `${SETTING_PREFIX_PATH}/version/version-list`,
                title: 'Roles',
                translateKey: 'nav.appsSettings.dbVersion',
                icon: 'dbVersion',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [SUPER_ADMIN],
                subMenu: [],
            },
            {
                key: 'settings.acl',
                menu_id: ["14"],
                purpose: ["create"],
                path: `${SETTING_PREFIX_PATH}/roles/acl`,
                title: 'Access Control Set',
                translateKey: 'nav.appsSettings.acl',
                icon: 'acl',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [SUPER_ADMIN],
                subMenu: [],
            },
            {
                key: 'settings.settings',
                path: ``,
                menu_id: ['59'],
                purpose: ['read'],
                title: 'Settings',
                translateKey: 'nav.appsSettings.settings',
                icon: 'settings',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [SUPER_ADMIN],
                subMenu: [
                    {
                        key: 'settings.settings',
                        menu_id: ['59'],
                        purpose: ['read'],
                        path: `${SETTING_PREFIX_PATH}/settings/setting-list`,
                        title: 'Settings',
                        translateKey: 'nav.settings_a.setting-list',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [SUPER_ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'settings.setting-create',
                        menu_id: ['59'],
                        purpose: ['create'],
                        path: `${SETTING_PREFIX_PATH}/settings/setting-new`,
                        title: 'Create Setting',
                        translateKey: 'nav.settings_a.setting-create',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [SUPER_ADMIN],
                        subMenu: [],
                    },
                ],
            },

            {
                key: 'settings.menus',
                path: ``,
                menu_id: ["15"],
                purpose: ["read"],
                title: 'Menus',
                translateKey: 'nav.appsSettings.menus',
                icon: 'menu',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [SUPER_ADMIN],
                subMenu: [
                    {
                        key: 'settings.menus',
                        menu_id: ["15"],
                        purpose: ["read"],
                        path: `${SETTING_PREFIX_PATH}/menus/menu-list`,
                        title: 'Menus',
                        translateKey: 'nav.menus.menu-list',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [SUPER_ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'menus.menu-create',
                        menu_id: ["15"],
                        purpose: ["create"],
                        path: `${SETTING_PREFIX_PATH}/menus/menu-new`,
                        title: 'Create Menu',
                        translateKey: 'nav.menus.menu-create',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [SUPER_ADMIN],
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default settingsNavigationConfig
