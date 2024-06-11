import { lazy } from 'react'
import {
    APP_PREFIX_PATH,
    SETTING_PREFIX_PATH,
} from '@/constants/route.constant'
import { ADMIN, EDITOR, MANAGER, SUPER_ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'


const homesRoute: Routes = [
    {
        key: 'home.dashboard',
        menu_id: ["1"],
        purpose: ["read"],
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: lazy(
            () => import('@/views/homes/dashboard/Dashboard/Dashboard')
        ),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },


    {
        key: 'contents.liveChannel',
        menu_id: ["2"],
        purpose: ["read"],
        path: `${APP_PREFIX_PATH}/contents/live-channel-list`,
        component: lazy(
            () => import('@/views/homes/contents/ContentList/LIveChannel')
        ),
        authority: [SUPER_ADMIN],
    },
    {
        key: 'menus.liveChannelEdit',
        menu_id: ["2"],
        purpose: ["edit"],
        path: `${APP_PREFIX_PATH}/contents/content-edit/:id`,
        component: lazy(
            () => import('@/views/homes/contents/ContentEdit/ContentEdit')
        ),
        authority: [SUPER_ADMIN,ADMIN],
        meta: {
            header: 'Update Content',
        },
    },
    {
        key: 'menus.liveChannelNew',
        menu_id: ["2"],
        purpose: ["create"],
        path: `${APP_PREFIX_PATH}/contents/content-new`,
        component: lazy(() => import('@/views/homes/contents/ContentNew')),
        authority: [SUPER_ADMIN,ADMIN],
        meta: {
            header: 'Create Content',
        },
    },
    {
        key: 'categories.categories',
        menu_id: ["25"],
        purpose: ["read"],
        path: `${APP_PREFIX_PATH}/categories/category-list`,
        component: lazy(() => import('@/views/homes/categories/CatgeoryList')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
    {
        key: 'categories.categoryNew',
        menu_id: ["25"],
        purpose: ["create"],
        path: `${APP_PREFIX_PATH}/categories/category-new`,
        component: lazy(() => import('@/views/homes/categories/CategoryNew')),
        authority: [SUPER_ADMIN,ADMIN],
        meta: {
            header: 'Create Category ',
        },
    },
    {
        key: 'categories.categoryEdit',
        menu_id: ["25"],
        purpose: ["edit"],
        path: `${APP_PREFIX_PATH}/categories/category-edit/:categoryId`,
        component: lazy(() => import('@/views/homes/categories/CatgeoryEdit')),
        authority: [SUPER_ADMIN,ADMIN],
        meta: {
            header: 'Update Category',
        },
    },

    {
        key: 'subcategories.subcategories',
        menu_id: ["26"],
        purpose: ["read"],
        path: `${APP_PREFIX_PATH}/subcategories/sub-category-list`,
        component: lazy(
            () => import('@/views/homes/subcategories/SubCategoryList')
        ),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
    {
        key: 'subcategories.subcategoryNew',
        menu_id: ["26"],
        purpose: ["create"],
        path: `${APP_PREFIX_PATH}/subcategories/sub-category-new`,
        component: lazy(
            () => import('@/views/homes/subcategories/SubCategoryNew')
        ),
        authority: [SUPER_ADMIN],
        meta: {
            header: 'Create Sub Category ',
        },
    },
    {
        key: 'subcategories.subcategoryEdit',
        menu_id: ["26"],
        purpose: ["edit"],
        path: `${APP_PREFIX_PATH}/subcategories/sub-category-edit/:subCategoryId`,
        component: lazy(
            () => import('@/views/homes/subcategories/SubCategoryEdit')
        ),
        authority: [SUPER_ADMIN],
        meta: {
            header: 'Update Sub Category',
        },
    },
    {
        key: 'contents.vod',
        menu_id: ["3"],
        purpose: ["read"],
        path: `${APP_PREFIX_PATH}/contents/vod-list`,
        component: lazy(() => import('@/views/homes/contents/ContentList/VOD')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },

    {
        key: 'contents.downloadList',
        menu_id: ["3"],
        purpose: ["read"],
        path: `${APP_PREFIX_PATH}/contents/download-list`,
        component: lazy(
            () =>
                import(
                    '@/views/homes/contents/ContentList/DownloadList/DownloadList'
                )
        ),
        authority: [SUPER_ADMIN],
    },
    {
        key: 'menus.vodEdit',
        menu_id: ["3"],
        purpose: ["edit"],
        path: `${APP_PREFIX_PATH}/contents/vod-edit/:id`,
        component: lazy(
            () => import('@/views/homes/contents/ContentEdit/ContentEdit')
        ),
        authority: [SUPER_ADMIN,ADMIN,MANAGER],
        meta: {
            header: 'Update Content',
        },
    },

    {
        key: 'contents.featured',
        menu_id: ["3"],
        purpose: ["read"],
        path: `${APP_PREFIX_PATH}/contents/featured-list`,
        component: lazy(() => import('@/views/homes/contents/ContentList/Featured/FeaturedContent')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },

    {
        key: 'fcm.fcm',
        menu_id: ["5"],
        purpose: ["read"],
        path: `${APP_PREFIX_PATH}/fcm/notification-list`,
        component: lazy(
            () => import('@/views/homes/fcmNotification/NotificationList')
        ),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },

    {
        key: 'fcm.fcm-create',
        menu_id: ["5"],
        purpose: ["create"],
        path: `${APP_PREFIX_PATH}/fcm/notification-new`,
        component: lazy(
            () => import('@/views/homes/fcmNotification/NotificationNew')
        ),
        authority: [SUPER_ADMIN,ADMIN,MANAGER],
        meta: {
            header: 'Create Notification',
        },
    },

    {
        key: 'interest.interest',
        menu_id: ["32"],
        purpose: ["read"],
        path: `${APP_PREFIX_PATH}/interests/interest-list`,
        component: lazy(() => import('@/views/homes/interests/InterestList')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
    {
        key: 'interest.interestNew',
        menu_id: ["32"],
        purpose: ["create"],
        path: `${APP_PREFIX_PATH}/interests/interest-new`,
        component: lazy(() => import('@/views/homes/interests/InterestNew/InterestNew')),
        authority: [SUPER_ADMIN,ADMIN],
        meta: {
            header: 'Create Interest ',
        },
    },
    {
        key: 'interest.interestEdit',
        menu_id: ["32"],
        purpose: ["edit"],
        path: `${APP_PREFIX_PATH}/interests/interest-edit/:interestId`,
        component: lazy(() => import('@/views/homes/interests/InterestEdit')),
        authority: [SUPER_ADMIN,ADMIN],
        meta: {
            header: 'Update Interest',
        },
    },


    {
        key: 'movie-request.movie-request',
        menu_id: ["56"],
        purpose: ["read"],
        path: `${APP_PREFIX_PATH}/movie-request/movie-request-list`,
        component: lazy(() => import('@/views/homes/movieRequests/movieRequestList')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
    {
        key: 'contact.contact',
        menu_id: ["57"],
        purpose: ["read"],
        path: `${APP_PREFIX_PATH}/contacts/contact-list`,
        component: lazy(() => import('@/views/homes/contacts/ContactList')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
]

export default homesRoute
