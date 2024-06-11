import ApiService from './ApiService'

export async function apiGetContactList<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/contacts/get',
        method: 'get',
        params,
    })
}


