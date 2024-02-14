import ApiService from './ApiService'

export async function apiGetTotalVODViews<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/dashboard/vod-views',
        method: 'get',
        params,
    })
}

export async function apiGetTotalLiveViews<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/dashboard/live-views',
        method: 'get',
        params,
    })
}

export async function apiGetTotalTodayUsers<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/dashboard/today-login-users',
        method: 'get',
        params,
    })
}
export async function apiGetMonthlyActiveUsers<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/dashboard/monthly-active-users',
        method: 'get',
        params,
    })
}

export async function apiGetDailyActiveUsers<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/dashboard/daily-active-users',
        method: 'get',
        params,
    })
}

export async function apiGetLiveAudience<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/dashboard/live-audience',
        method: 'get',
        params,
    })
}

export async function apiGetTopTenContent<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/dashboard/top-ten-content',
        method: 'get',
        params,
    })
}

export async function apiGetHourlyGraphReport<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/dashboard/hourly-graph-report',
        method: 'get',
        params,
    })
}

export async function apiGetHighestConUsers<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/dashboard/highest-con-users',
        method: 'get',
        params,
    })
}
// Import necessary modules or types

export async function apiGetTotalUsers<T, U extends Record<string, unknown>>(
    params: U
) {
    // Make a network request using ApiService.fetchData
    return ApiService.fetchData<T>({
        url: '/dashboard/total-users',
        method: 'get',
        params,
    });
}


export async function apiGetTopVodContent<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/dashboard/top-vod-content',
        method: 'get',
        params,
    })
}

export async function apiGetTopLiveContent<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/dashboard/top-live-content',
        method: 'get',
        params,
    })
}
