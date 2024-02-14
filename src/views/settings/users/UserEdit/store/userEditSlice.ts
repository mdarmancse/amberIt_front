import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { apiGetUserById, apiUpdateUser } from '@/services/UserService'

type Data = {
    success?: boolean
    data?: any
    id?: string
    phone?: string
    email?: string
    name?: string
    role?: string
    password?: string
    password_confirmation?: string
}

export type EditState = {
    loading: boolean
    data: Data
}

type GetResponse = Data

export const SLICE_NAME = 'homeUserEdit'

export const getData = createAsyncThunk(
    SLICE_NAME + '/getData',
    async (data: { id: string }) => {
        const response = await apiGetUserById<GetResponse, { id: string }>(data)
        return response.data
    }
)
export const updateData = async <T, U extends Record<string, unknown>>(
    data: U
) => {
    const response = await apiUpdateUser<T, U>(data)

    // @ts-ignore
    return response.data
}
//
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

const userEditSlice = createSlice({
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

export default userEditSlice.reducer
