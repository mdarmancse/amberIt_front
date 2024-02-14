import ApiService from './ApiService'

export async function apiGetUserData<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/users/get',
        method: 'get',
        params,
    })
}
export async function apiGetUserDataAll<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/users/get-all',
        method: 'get',
        params,
    })
}

export async function apiCreateUser<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/users/store',
        method: 'post',
        data,
    })
}

export async function apiGetUserById<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/users/show',
        method: 'get',
        params,
    })
}

export async function apiUpdateUser<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/users/update',
        method: 'patch',
        data,
    })
}

export async function apiDeleteNotification<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/fcm/delete',
        method: 'delete',
        data,
    })
}
