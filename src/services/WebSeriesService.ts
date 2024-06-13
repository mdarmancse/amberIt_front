import ApiService from './ApiService'

export async function apiGetWebSeriesDataAll<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/web-series/get-all',
        method: 'get',
        params,
    })
}

export async function apiGetWebSeriesData<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/web-series/get',
        method: 'get',
        params,
    })
}

export async function apiCreateWebSeries<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/web-series/store',
        method: 'post',
        data,
    })
}

export async function apiGetWebSeriesById<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/web-series/show',
        method: 'get',
        params,
    })
}

export async function apiUpdateWebSeries<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/web-series/update',
        method: 'patch',
        data,
    })
}
