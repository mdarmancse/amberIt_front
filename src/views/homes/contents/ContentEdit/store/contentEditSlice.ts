import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { apiGetContentById, apiUpdateContent } from '@/services/ContentService'

type Data = {
    data?: any
    success?: boolean
    id?: string | number
    is_cdn_active?: string | number
    content_name?: string
    content_description?: string
    content_type?: string
    is_active?: string
    is_approved?: string
    is_ad_active?: string
    feature_banner?: string
    mobile_logo?: string
    mobile_thumbnail?: string
    web_logo?: string
    web_thumbnail?: string
    stb_logo?: string
    stb_thumbnail?: string
    content_expire_time?: string
    content_publish_time?: string
    is_premium?: string
    tags?: []
    orientation?: string
    category_id?: string
    category_name?: string
    sub_category_id?: string
    sub_category_name?: string
    is_drm_active?: string
    content_file_name?: string
    duration?: string
    content_aes_128_hls_url?: string
    content_drm_dash_url?: string
    cdnName?: string
    signingType?: string
    expireTimeInHours?: number
    keyName?: string
    mediaUrl?: string
    privateKey?: string
    content_drm_hls_url?: string
    cdn_gmc_conf?: []
}

export type EditState = {
    loading: boolean
    data: Data
}

type GetResponse = Data

export const SLICE_NAME = 'homeContentEdit'

export const getData = createAsyncThunk(
    SLICE_NAME + '/getData',
    async (data: { id: number | string }) => {
        const response = await apiGetContentById<
            GetResponse,
            { id: number | string }
        >(data)

        return response.data
    }
)

export const updateData = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiUpdateContent<T, U>(data)
    return response.data
}

// export const deleteData = async <T, U extends Record<string, unknown>>(
//     data: U
// ) => {
//     const response = await apiDeleteSalesProducts<T, U>(data)
//     return response.data
// }

const initialState: EditState = {
    loading: true,
    data: {},
}

const contentEditSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getData.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(getData.pending, (state) => {
                state.loading = true
            })
    },
})

export default contentEditSlice.reducer
