import ApiService from './ApiService'

export async function apiGetSubCategoryData<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/subcategories/get',
        method: 'get',
        params,
    })
}

export async function apiCreateSubCategory<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/subcategories/store',
        method: 'post',
        data,
    })
}

export async function apiGetSubCategoryById<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/subcategories/show',
        method: 'get',
        params,
    })
}

export async function apiUpdateSubCategory<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/subcategories/update',
        method: 'patch',
        data,
    })
}
