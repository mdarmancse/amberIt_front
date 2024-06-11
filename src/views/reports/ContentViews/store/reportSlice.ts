import {
    createSlice,
    createAsyncThunk,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'

import type { TableQueries } from '@/@types/common'
import { apiGetContentViewsReport } from '@/services/ReportService'

// eslint-disable-next-line import/named

type Data = {}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    start_date: '',
    end_date: '',
    type: '',
    sort: {
        order: '',
        key: '',
    },
}
type FilterQueries = {
    start_date: string
    end_date: string
    type: number | string

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

export const SLICE_NAME = 'contentViewReportList'

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
        sort: {
            order: '',
            key: '',
        },
    },
    filterData: {
        start_date: '',
        end_date: '',
        type: 1,

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
            .addCase(getContentViewsReport.fulfilled, (state, action) => {
                state.dataList = action.payload.data
                // @ts-ignore
                state.tableData.total = action.payload.total
                state.loading = false
            })
            .addCase(getContentViewsReport.pending, (state) => {
                state.loading = true
            })
    },
})

export const { updateLoading, setTableData, setFilterData } =
    reportSlice.actions

export default reportSlice.reducer
