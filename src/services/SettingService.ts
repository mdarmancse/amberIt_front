import ApiService from './ApiService'



export async function apiGetSettingData<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/settings/get',
        method: 'get',
        params,
    })
}

export async function apiCreateSetting<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/settings/store',
        method: 'post',
        data,
    })
}

export async function apiGetSettingById<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/settings/show',
        method: 'get',
        params,
    })
}

export async function apiUpdateSetting<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/settings/update',
        method: 'patch',
        data,
    })
}
