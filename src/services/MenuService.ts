import ApiService from './ApiService'

export async function apiGetMenuData<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/sec-menu-items/get/all',
        method: 'get',
        params,
    })
}
export async function apiGetParentMenuData<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: 'sec-menu-items/get/parentMenu',
        method: 'get',
        params,
    })
}

export async function apiGetMenuById<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/sec-menu-items/show',
        method: 'get',
        params,
    })
}

export async function apiCreateMenu<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/sec-menu-items',
        method: 'post',
        data,
    })
}


export async function apiUpdateMenu<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: 'sec-menu-items/update',
        method: 'patch',
        data,
    })
}

