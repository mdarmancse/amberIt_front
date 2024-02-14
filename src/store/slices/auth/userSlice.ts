import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    id?: string
    phone?: string
    name?: string
    avatar?: string
    userName?: string
    email?: string
    authority?: string[]
    permissions?: []
}

const initialState: UserState = {
    avatar: '',
    userName: '',
    email: '',
    id: '',
    phone: '',
    name: '',
    authority: [],
    permissions: [],
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            // state.authority = action.payload?.authority
            state.authority = action.payload?.permissions
            state.avatar = action.payload?.avatar
            state.email = action.payload?.email
            state.name = action.payload?.name
            state.phone = action.payload?.phone
            state.id = action.payload?.id
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
