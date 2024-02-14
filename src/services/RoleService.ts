import ApiService from './ApiService'

export async function apiGetRoleData<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/roles/get',
        method: 'get',
        params,
    })
}

export async function apiGetRoleDataAll<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/roles/get-all',
        method: 'get',
        params,
    })
}

export async function apiCreateRole<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/roles/store',
        method: 'post',
        data,
    })
}

export async function apiGetRoleById<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/roles/show',
        method: 'get',
        params,
    })
}

export async function apiUpdateRole<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/roles/update',
        method: 'patch',
        data,
    })
}

export async function apiGecSecMenuList<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/sec-menu-items',
        method: 'get',
        params,
    })
}

export async function apiSetPermission<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/setPermissions',
        method: 'post',
        data,
    })
}
export async function apiUpdatePermission<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/updatePermissions',
        method: 'put',
        data,
    })
}