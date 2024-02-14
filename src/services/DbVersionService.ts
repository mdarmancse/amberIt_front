import ApiService from './ApiService'

export async function apiGetVersionData<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/version/get',
        method: 'get',
        params,
    })
}

export async function apiCreateVersion<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/version/store',
        method: 'post',
        data,
    })
}

export async function apiGetVersionById<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/version/show',
        method: 'get',
        params,
    })
}

export async function apiUpdateVersion<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/version/update',
        method: 'patch',
        data,
    })
}
