import { lazy } from 'react'
import { REPORT_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, EDITOR, MANAGER, SUPER_ADMIN } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const reportsRoute: Routes = [
    {
        key: 'reports.contentViewsDateWise',
        menu_id: ["18"],
        purpose: ["read"],
        path: `${REPORT_PREFIX_PATH}/content-views`,
        component: lazy(() => import('@/views/reports/ContentViews')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },

    {
        key: 'reports.usersLoginHits',
        menu_id: ["19"],
        purpose: ["read"],
        path: `${REPORT_PREFIX_PATH}/login-log`,
        component: lazy(() => import('@/views/reports/UserLoginHits')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
    {
        key: 'reports.conCurrentUser',
        menu_id: ["20"],
        purpose: ["read"],
        path: `${REPORT_PREFIX_PATH}/con-current-user`,
        component: lazy(() => import('@/views/reports/ConCurrentUser')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
    {
        key: 'reports.uniqueUserMonthly',
        menu_id: ["21"],
        purpose: ["read"],
        path: `${REPORT_PREFIX_PATH}/unique-user-monthly`,
        component: lazy(() => import('@/views/reports/UniqueUsersMonthly')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
    {
        key: 'reports.uniqueUserDaily',
        menu_id: ["22"],
        purpose: ["read"],
        path: `${REPORT_PREFIX_PATH}/unique-user-daily`,
        component: lazy(() => import('@/views/reports/UniqueUsersDaily')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },

    {
        key: 'reports.liveAudience',
        menu_id: ["23"],
        purpose: ["read"],
        path: `${REPORT_PREFIX_PATH}/live-audience-daily`,
        component: lazy(() => import('@/views/reports/LiveAudienceDaily')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },

    {
        key: 'reports.paymentReport',
        menu_id: ["24"],
        purpose: ["read"],
        path: `${REPORT_PREFIX_PATH}/payment-report`,
        component: lazy(() => import('@/views/reports/PaymentReport')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
    {
        key: 'reports.auditReport',
        menu_id: ["31"],
        purpose: ["read"],
        path: `${REPORT_PREFIX_PATH}/audit-report`,
        component: lazy(() => import('@/views/reports/AuditReport')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },
    {
        key: 'reports.auditReport',
        menu_id: ["31"],
        purpose: ["read"],
        path: `${REPORT_PREFIX_PATH}/audit-report/:id`,
        component: lazy(() => import('@/views/reports/AuditReport/AuditReportShow/ReportView')),
        authority: [SUPER_ADMIN,ADMIN,MANAGER,EDITOR],
    },

]

export default reportsRoute
