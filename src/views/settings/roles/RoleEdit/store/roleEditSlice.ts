import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { apiGetRoleById, apiSetPermission, apiUpdatePermission, apiUpdateRole } from '@/services/RoleService'

type Data = {
    success?: boolean
    data?: []

}

export type EditState = {
    loading: boolean
    data: Data
}

type GetResponse = Data

export const SLICE_NAME = 'homeRoleEdit'

export const getData = createAsyncThunk(
    SLICE_NAME + '/getData',
    async (data: { id: string }) => {
        const response = await apiGetRoleById<GetResponse, { id: string }>(data)
        return response.data
    }
)

export const updateData = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiUpdatePermission<T, U>(data)
    return response.data
}

const initialState: EditState = {
    loading: true,
    data: {},
}

const roleEditSlice = createSlice({
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

export default roleEditSlice.reducer
