import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'

import type { TableQueries } from '@/@types/common'
import { apiGetPaymentReport } from '@/services/ReportService'

// eslint-disable-next-line import/named

type Data = {
    usage_hour: string
    note: string
    value: number
    title: string
    id: string
    date: number
    customer: string
    status: number
    paymentMehod: string
    paymentIdendifier: string
    totalAmount: number
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    start_date: '',
    end_date: '',
    type: '',
    event: '',
    log_name: '',
    subject_type: '',
    causer_id: '',
    sort: {
        order: '',
        key: '',
    },
}
type FilterQueries = {
    start_date: string
    end_date: string
    type: number | string
    event: string
    log_name: string
    subject_type: string
    causer_id: string
}
type Datas = Data[]

type GetResponse = {
    data: Datas
    total: number
}

export type ListState = {
    loading: boolean
    dataList: Datas
    tableData: TableQueries
    filterData: FilterQueries
    selectedRows: string[]
    selectedRow: string
}

export const SLICE_NAME = 'paymentReportList'

export const getLPaymentReport = createAsyncThunk(
    SLICE_NAME + '/getPaymentReport',
    async (data: TableQueries) => {
        const response = await apiGetPaymentReport<GetResponse, TableQueries>(
            data
        )
        return response.data
    }
)

const initialState: ListState = {
    loading: false,
    dataList: [],
    tableData: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        start_date: '',
        end_date: '',
        type: '',
        event: '',
        log_name: '',
        subject_type: '',
        causer_id: '',
        sort: {
            order: '',
            key: '',
        },
    },
    filterData: {
        start_date: '',
        end_date: '',
        type: 1,
        event: '',
        log_name: '',
        subject_type: '',
        causer_id: '',
    },
    selectedRows: [],
    selectedRow: '',
}
const reportSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateLoading: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        setdataList: (state, action) => {
            state.dataList = action.payload
        },
        // setTableData: (state, action) => {
        //     state.tableData = action.payload
        // },
        setTableData: (state, action: PayloadAction<any>) => {
            state = {
                ...state,
                tableData: action.payload,
                dataList: initialState.dataList,
                filterData: initialState.filterData,
            }
            return state
        },
        setFilterData: (state, action: PayloadAction<any>) => {
            state = { ...state, filterData: action.payload }
            return state
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLPaymentReport.fulfilled, (state, action) => {
                state.dataList = action.payload.data
                // @ts-ignore
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getLPaymentReport.pending, (state) => {
                state.loading = true
            })
    },
})

export const { updateLoading, setTableData, setFilterData } =
    reportSlice.actions

export default reportSlice.reducer
