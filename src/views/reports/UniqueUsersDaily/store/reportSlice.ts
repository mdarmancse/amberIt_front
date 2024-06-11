import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'

import type { TableQueries } from '@/@types/common'
import {
    apiGetUniqueUserDailyReport
} from '@/services/ReportService'
import dayjs from 'dayjs'

type Data = {
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    start_date:  dayjs(new Date()).format(
        'YYYY-MM-DD'
    ),
    end_date:dayjs(new Date()).format(
        'YYYY-MM-DD'
    ),
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

export const SLICE_NAME = 'uniqueUserDailyReportList'

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

// @ts-ignore
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
        end_date: dayjs(new Date()).format(
            'YYYY-MM-DD'
        ),

        sort: {
            order: '',
            key: '',
        },
    },
    filterData: {
        start_date: dayjs(new Date()).format(
            'YYYY-MM-DD'
        ),
        end_date: dayjs(new Date()).format(
            'YYYY-MM-DD'
        ),
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
             //   filterData: initialState.filterData,
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
            .addCase(getUniqueUserDailyReport.fulfilled, (state, action) => {
                state.dataList = action.payload.data
                // @ts-ignore
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getUniqueUserDailyReport.pending, (state) => {
                state.loading = true
            })
    },
})

export const { updateLoading, setTableData, setFilterData } =
    reportSlice.actions

export default reportSlice.reducer
