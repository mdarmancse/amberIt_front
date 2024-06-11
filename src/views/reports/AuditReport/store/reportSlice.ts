import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'

import type { TableQueries } from '@/@types/common'
import { apiGetAuditReport } from '@/services/ReportService'
import dayjs from 'dayjs'

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
    start_date:  dayjs(new Date()).format(
        'YYYY-MM-DD'
    ),
    end_date:  dayjs(new Date()).format(
        'YYYY-MM-DD'
    ),
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
    start_date: string | number
    end_date: string | number
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

export const SLICE_NAME = 'auditReportList'

export const getAuditReport = createAsyncThunk(
    SLICE_NAME + '/getAuditReport',
    async (data: TableQueries) => {
        const response = await apiGetAuditReport<GetResponse, TableQueries>(
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
        start_date: dayjs(new Date()).format(
            'YYYY-MM-DD'
        ),
        end_date:  dayjs(new Date()).format(
            'YYYY-MM-DD'
        ),
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
        start_date: dayjs(new Date()).format(
            'YYYY-MM-DD'
        ),
        end_date:  dayjs(new Date()).format(
            'YYYY-MM-DD'
        ),
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
              //  filterData: initialState.filterData,
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
            .addCase(getAuditReport.fulfilled, (state, action) => {
                state.dataList = action.payload.data
                // @ts-ignore
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getAuditReport.pending, (state) => {
                state.loading = true
            })
    },
})

export const { updateLoading, setTableData, setFilterData } =
    reportSlice.actions

export default reportSlice.reducer
