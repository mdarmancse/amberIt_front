import ApiService from './ApiService'

export async function apiGetCategoryDataAll<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/categories/get-all',
        method: 'get',
        params,
    })
}

export async function apiGetCategoryData<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/categories/get',
        method: 'get',
        params,
    })
}

export async function apiCreateCategory<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/categories/store',
        method: 'post',
        data,
    })
}

export async function apiGetCategoryById<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/categories/show',
        method: 'get',
        params,
    })
}

export async function apiUpdateCategory<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/categories/update',
        method: 'patch',
        data,
    })
}
