import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


import { apiGetWebSeriesById, apiUpdateWebSeries } from '@/services/WebSeriesService'

type Data = {
    success?: boolean
    data?: []
    id?: string
    name?: string
    productCode?: string
    img?: string
    imgList?: {
        id: string
        name: string
        img: string
    }[]
    category?: string
    price?: number
    stock?: number
    status?: number
    costPerItem?: number
    bulkDiscountPrice?: number
    description?: string
    taxRate?: 6
    tags?: string[]
    brand?: string
    vendor?: string
}

export type EditState = {
    loading: boolean
    data: Data
}

type GetResponse = Data

export const SLICE_NAME = 'homeWebSeriesEdit'

export const getData = createAsyncThunk(
    SLICE_NAME + '/getData',
    async (data: { id: string }) => {
        const response = await apiGetWebSeriesById<GetResponse, { id: string }>(
            data
        )
        return response.data
    }
)

export const updateData = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiUpdateWebSeries<T, U>(data)
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

const webSeriesEditSlice = createSlice({
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

export default webSeriesEditSlice.reducer
