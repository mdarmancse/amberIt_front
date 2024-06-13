import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'

import type { TableQueries } from '@/@types/common'

import { apiGetWebSeriesData } from '@/services/WebSeriesService'

type Data = {
    id: string
    date: number
    customer: string
    status: number
    paymentMehod: string
    paymentIdendifier: string
    totalAmount: number
}

type Datas = Data[]

type GetResponse = {
    data: Datas
    total: number
}

export type ListState = {
    loading: boolean
    orderList: Datas
    tableData: TableQueries
    deleteMode: 'single' | 'batch' | ''
    selectedRows: string[]
    selectedRow: string
}

export const SLICE_NAME = 'homesWebSeriesList'

export const getDatas = createAsyncThunk(
    SLICE_NAME + '/getDatas',
    async (data: TableQueries) => {
        const response = await apiGetWebSeriesData<GetResponse, TableQueries>(
            data
        )
        return response.data
    }
)

// export const deleteDatas = async (data: { id: string | string[] }) => {
//     const response = await apiDeleteSalesOrders<
//         boolean,
//         { id: string | string[] }
//     >(data)
//     return response.data
// }

const initialState: ListState = {
    loading: false,
    orderList: [],
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

const webSeriesListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
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
                state.orderList = action.payload.data
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getDatas.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setOrderList,
    setTableData,
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    setDeleteMode,
} = webSeriesListSlice.actions

export default webSeriesListSlice.reducer
