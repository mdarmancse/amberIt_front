import ApiService from './ApiService'

export async function apiGetIosOtpList<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/ios-otp',
        method: 'get',
        params,
    })
}

export async function apiGetNotificationCount() {}

export async function apiGetNotificationList() {}

export async function apiGetSearchResult<T>(data: { query: string }) {}
