import ApiService from './ApiService'

export async function apiGetLiveContentsData<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/contents/getLiveContents',
        method: 'get',
        params,
    })
}

export async function apiGetContentsHomeData<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/contents/getContentHomeData',
        method: 'get',
        params,
    })
}

export async function apiGetVodContentsData<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/contents/getVodContents',
        method: 'get',
        params,
    })
}
export async function apiGetFeaturedContentsData<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/contents/getFeaturedContents',
        method: 'get',
        params,
    })
}

export async function apiGetDownloadLIstData<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/contents/download-list',
        method: 'get',
        params,
    })
}
export async function apiDownloadVdo<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/contents/download-vod',
        method: 'get',
        params,
    })
}

export async function apiCreateContent<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/contents/store',
        method: 'post',
        data,
    })
}

export async function apiUpdateContent<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/contents/update',
        method: 'patch',
        data,
    })
}

export async function apiDeleteContent<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/contents/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetContentById<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/contents/show',
        method: 'get',
        params,
    })
}
