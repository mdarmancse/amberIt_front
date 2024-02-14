import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'

import type { TableQueries } from '@/@types/common'
import {
    apiGetContentViewsReport,
    apiGetLoginLogReport,
    apiGetConCurrentUserReport,
    apiGetUniqueUserMonthlyReport,
    apiGetUniqueUserDailyReport,
    apiLiveAudienceDailyReport, apiGetPaymentReport, apiGetAuditReport
} from '@/services/ReportService'
// eslint-disable-next-line import/named
import { apiGetIosOtpList } from '@/services/CommonService'

type Data = {
    usage_hour:string
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
    subject_type:'',
    causer_id:'',
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
    subject_type:string
    causer_id:string
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

export const SLICE_NAME = 'homeReportList'
export const getIosOtpList = createAsyncThunk(
    SLICE_NAME + '/getIosOtpList',
    async (data: TableQueries) => {
        const response = await apiGetIosOtpList<GetResponse, TableQueries>(data)

        return response.data
    }
)

export const getContentViewsReport = createAsyncThunk(
    SLICE_NAME + '/getContentViewsReport',
    async (data: TableQueries) => {
        const response = await apiGetContentViewsReport<
            GetResponse,
            TableQueries
        >(data)
        return response.data
    }
)

export const getLoginLogReport = createAsyncThunk(
    SLICE_NAME + '/getLoginLogReport',
    async (data: TableQueries) => {
        const response = await apiGetLoginLogReport<GetResponse, TableQueries>(
            data
        )
        return response.data
    }
)
export const getConCurrentUserReport = createAsyncThunk(
    SLICE_NAME + '/getConCurrentUserReport',
    async (data: TableQueries) => {
        const response = await apiGetConCurrentUserReport<
            GetResponse,
            TableQueries
        >(data)
        return response.data
    }
)

export const getUniqueUserMonthlyReport = createAsyncThunk(
    SLICE_NAME + '/getUniqueUserMonthlyReport',
    async (data: TableQueries) => {
        const response = await apiGetUniqueUserMonthlyReport<
            GetResponse,
            TableQueries
        >(data)
        return response.data
    }
)
export const getUniqueUserDailyReport = createAsyncThunk(
    SLICE_NAME + '/getUniqueUserMonthlyReport',
    async (data: TableQueries) => {
        const response = await apiGetUniqueUserDailyReport<
            GetResponse,
            TableQueries
        >(data)
        return response.data
    }
)
export const getLiveAudienceDailyReport = createAsyncThunk(
    SLICE_NAME + '/getLiveAudienceDailyReport',
    async (data: TableQueries) => {
        const response = await apiLiveAudienceDailyReport<
            GetResponse,
            TableQueries
        >(data)
        return response.data
    }
)

export const getLPaymentReport = createAsyncThunk(
    SLICE_NAME + '/getPaymentReport',
    async (data: TableQueries) => {
        const response = await apiGetPaymentReport<
            GetResponse,
            TableQueries
        >(data)
        return response.data
    }
)
export const getAuditReport = createAsyncThunk(
    SLICE_NAME + '/getAuditReport',
    async (data: TableQueries) => {
        const response = await apiGetAuditReport<
            GetResponse,
            TableQueries
        >(data)
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
        subject_type:'',
        causer_id:'',
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
        subject_type:'',
        causer_id:'',
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
            .addMatcher(
                (action) =>
                    action.type.endsWith('/fulfilled') ||
                    action.type.endsWith('/pending'),
                (state, action) => {
                    state.loading = action.type.endsWith('/pending')
                    if (action.type.endsWith('/fulfilled')) {
                        state.dataList = action.payload.data
                        state.tableData.total = action.payload.total
                    }
                }
            )
            .addDefaultCase((state) => state)
    },
})

export const { updateLoading, setTableData, setFilterData } =
    reportSlice.actions

export default reportSlice.reducer
