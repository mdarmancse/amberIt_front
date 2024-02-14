import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'

import {
    apiDeleteNotification,
    apiGetNotificationData,
} from '@/services/FcmService'
import { TableQueries } from '@/@types/common'

type Data = {
    id: number
    notification_title: string
    notification_text: string
    thumbnail: string
    created_at: number
    updated_at: number
    category_name: string
}

type Datas = Data[]

type GetResponse = {
    success: boolean
    data: Datas
    total: number
    message: string
}

export type ListState = {
    loading: boolean
    dataList: Datas
    tableData: TableQueries
    deleteMode: 'single' | 'batch' | ''
    selectedRows: string[]
    selectedRow: string
}

export const SLICE_NAME = 'homeNotificationList'

export const getDatas = createAsyncThunk(
    SLICE_NAME + '/getDatas',
    async (data: TableQueries) => {
        const response = await apiGetNotificationData<
            GetResponse,
            TableQueries
        >(data)

        console.log('response Data', response.data)
        return response.data
    }
)

export const deleteDatas = async (data: { id: string | string[] }) => {
    const response = await apiDeleteNotification<
        boolean,
        { id: string | string[] }
    >(data)
    return response.data
}

const initialState: ListState = {
    loading: false,
    dataList: [],
    tableData: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            order: '',
            key: '',
        },
    },
    selectedRows: [],
    selectedRow: '',
    deleteMode: '',
}

const notifcationListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setdataList: (state, action) => {
            state.dataList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        addRowItem: (state, { payload }) => {
            const currentState = current(state)
            if (!currentState.selectedRows.includes(payload)) {
                state.selectedRows = [...currentState.selectedRows, ...payload]
            }
        },
        removeRowItem: (state, { payload }: PayloadAction<string>) => {
            const currentState = current(state)
            if (currentState.selectedRows.includes(payload)) {
                state.selectedRows = currentState.selectedRows.filter(
                    (id) => id !== payload
                )
            }
        },
        setDeleteMode: (state, action) => {
            state.deleteMode = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDatas.fulfilled, (state, action) => {
                state.dataList = action.payload.data
                // @ts-ignore
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getDatas.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setdataList,
    setTableData,
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    setDeleteMode,
} = notifcationListSlice.actions

export default notifcationListSlice.reducer
