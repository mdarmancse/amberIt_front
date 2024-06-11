import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import { apiGetUniqueUserMonthlyReport } from '@/services/ReportService'
import { TableQueries } from '@/@types/common'

type Data = {
    usage_hour?: string
    note?: string
    value?: number
    title?: string
    id?: string
    date?: number
    customer?: string
    status?: number
    paymentMehod?: string
    paymentIdendifier?: string
    totalAmount?: number
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
export type FilterQueries = {
    start_date: string
    end_date: string
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

export const SLICE_NAME = 'uniqueUserMonthlyReportList'

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

const initialState: ListState = {
    loading: false,
    dataList: [],
    tableData: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        start_date: '',
        end_date: '',

        sort: {
            order: '',
            key: '',
        },
    },
    filterData: {
        start_date: '',
        end_date: '',
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
