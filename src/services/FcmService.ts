import ApiService from './ApiService'

export async function apiGetNotificationData<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/fcm/getNotification',
        method: 'get',
        params,
    })
}

export async function apiCreateNotification<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/fcm/send',
        method: 'post',
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
