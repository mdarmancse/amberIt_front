import ApiService from './ApiService'

export async function apiGetInterestDataAll<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/interest/get-all',
        method: 'get',
        params,
    })
}

export async function apiGetInterestData<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/interest/get',
        method: 'get',
        params,
    })
}

export async function apiCreateInterest<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/interest/store',
        method: 'post',
        data,
    })
}

export async function apiGetInterestById<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/interest/show',
        method: 'get',
        params,
    })
}

export async function apiUpdateInterest<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/interest/update',
        method: 'patch',
        data,
    })
}
