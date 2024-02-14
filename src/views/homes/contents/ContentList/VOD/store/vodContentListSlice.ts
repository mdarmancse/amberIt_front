import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'

import type { TableQueries } from '@/@types/common'
import {
    apiDeleteContent,
    apiGetVodContentsData,
} from '@/services/ContentService'

type Data = {
    is_approved: boolean
    is_active: boolean
    is_transcoded: boolean
    is_premium: boolean
    id: number
    content_name: string
    created_at: number
    updated_at: number
    category_name: string
    transcoding_start_time: number
    transcoding_end_time: number
    status: number
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

export const SLICE_NAME = 'homeVodContentList'

export const getDatas = createAsyncThunk(
    SLICE_NAME + '/getDatas',
    async (data: TableQueries) => {
        const response = await apiGetVodContentsData<GetResponse, TableQueries>(
            data
        )

        console.log('response Data', response.data)
        return response.data
    }
)

export const deleteDatas = async (data: { id: string | string[] }) => {
    const response = await apiDeleteContent<boolean, { id: string | string[] }>(
        data
    )
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

const vodContentListSlice = createSlice({
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
} = vodContentListSlice.actions

export default vodContentListSlice.reducer
