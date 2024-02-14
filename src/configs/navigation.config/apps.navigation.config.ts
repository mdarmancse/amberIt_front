import { APP_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, EDITOR, MANAGER, SUPER_ADMIN } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const appsNavigationConfig: NavigationTree[] = [
    {
        key: 'apps',
        path: '',
        title: 'APPS',
        translateKey: 'nav.apps',
        icon: 'apps',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
        subMenu: [
            {
                key: 'apps.sales',
                path: '',
                title: 'Sales',
                translateKey: 'nav.appsSales.sales',
                icon: 'sales',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, SUPER_ADMIN],
                subMenu: [
                    {
                        key: 'appsSales.dashboard',
                        path: `${APP_PREFIX_PATH}/sales/dashboard`,
                        title: 'Dashboard',
                        translateKey: 'nav.appsSales.dashboard',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, SUPER_ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'appsSales.productList',
                        path: `${APP_PREFIX_PATH}/sales/product-list`,
                        title: 'Product List',
                        translateKey: 'nav.appsSales.productList',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, SUPER_ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'appsSales.productEdit',
                        path: `${APP_PREFIX_PATH}/sales/product-edit/12`,
                        title: 'Product Edit',
                        translateKey: 'nav.appsSales.productEdit',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, SUPER_ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'appsSales.productNew',
                        path: `${APP_PREFIX_PATH}/sales/product-new`,
                        title: 'New Product',
                        translateKey: 'nav.appsSales.productNew',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, SUPER_ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'appsSales.orderList',
                        path: `${APP_PREFIX_PATH}/sales/order-list`,
                        title: 'Order List',
                        translateKey: 'nav.appsSales.orderList',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, SUPER_ADMIN],
                        subMenu: [],
                    },
                    {
                        key: 'appsSales.orderDetails',
                        path: `${APP_PREFIX_PATH}/sales/order-details/95954`,
                        title: 'Order Details',
                        translateKey: 'nav.appsSales.orderDetails',
                        icon: '',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, SUPER_ADMIN],
                        subMenu: [],
                    },
                ],
            },
        ],
    },
]

export default appsNavigationConfig
