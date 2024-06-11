import ApiService from './ApiService'

export async function apiGetMovieRequestList<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/movies/request/get',
        method: 'get',
        params,
    })
}


