import ApiService from './ApiService'

export async function apiGetContentViewsReport<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/reports/content-views',
        method: 'get',
        params,
    })
}
export async function apiGetLoginLogReport<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/reports/login-log',
        method: 'get',
        params,
    })
}

export async function apiGetConCurrentUserReport<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/reports/con-current-user',
        method: 'get',
        params,
    })
}

export async function apiGetUniqueUserMonthlyReport<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/reports/unique-user-monthly',
        method: 'get',
        params,
    })
}
export async function apiGetUniqueUserDailyReport<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/reports/unique-user-daily',
        method: 'get',
        params,
    })
}

export async function apiLiveAudienceDailyReport<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/reports/live-audience-daily',
        method: 'get',
        params,
    })
}

export async function apiGetPaymentReport<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/reports/payment-report',
        method: 'get',
        params,
    })
}

export async function apiGetAuditReport<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/reports/audit-report',
        method: 'get',
        params,
    })
}

export async function apiGetAuditReportById<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/reports/audit-report/show',
        method: 'get',
        params,
    })
}