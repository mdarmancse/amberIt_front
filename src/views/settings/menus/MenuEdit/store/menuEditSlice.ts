import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { apiGetRoleById, apiUpdateRole } from '@/services/RoleService'
import {
    apiGetCategoryById,
    apiUpdateCategory,
} from '@/services/CategoryService'
import { apiGetMenuById, apiUpdateMenu } from '@/services/MenuService'

type Data = {
    success?: boolean
    data?: []
    id?: string

}

export type EditState = {
    loading: boolean
    data: Data
}

type GetResponse = Data

export const SLICE_NAME = 'homeMenuEdit'

export const getData = createAsyncThunk(
    SLICE_NAME + '/getData',
    async (data: { id: string }) => {
        const response = await apiGetMenuById<GetResponse, { id: string }>(
            data
        )
        return response.data
    }
)

export const updateData = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiUpdateMenu<T, U>(data)
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

const menuEditSlice = createSlice({
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

export default menuEditSlice.reducer
