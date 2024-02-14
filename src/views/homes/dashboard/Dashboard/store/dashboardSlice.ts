import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import {
    apiGetDailyActiveUsers,
    apiGetHighestConUsers,
    apiGetHourlyGraphReport,
    apiGetLiveAudience,
    apiGetMonthlyActiveUsers,
    apiGetTopLiveContent,
    apiGetTopTenContent,
    apiGetTopVodContent,
    apiGetTotalLiveViews,
    apiGetTotalTodayUsers,
    apiGetTotalUsers,
    apiGetTotalVODViews,
} from '@/services/DashboardService'

import dayjs from 'dayjs'

export type DashboardData = {
    data?: any[] | undefined
}

type topTanDataState = {
    data?: any
    id?: number
    CONTENT_ID?: number
    thumb?: string
    content_type?: string
    title?: string
    USERS?: string
    TIME_SPENT_HOURLY?: string
    VIEWS?: string
}
type FilterQueries = {
    date: string
}

type DashboardDataResponse = DashboardData

export type DashboardState = {
    loading: boolean
    totalUsersLoading: boolean
    totalsLoading: boolean
    totaVODViewsloading: boolean
    topLiveConloading: boolean
    topVodConloading: boolean
    totaLiveViewsloading: boolean
    totaHighConloading: boolean
    totaMonthlyUsersloading: boolean
    totaDailyUsersloading: boolean
    totaLiveAudloading: boolean
    topTenConloading: boolean
    hourlyGraphloading: boolean
    date: string
    filterData: FilterQueries
    totalUsers: DashboardData
    totaVODViews: DashboardData
    totaLiveViews: DashboardData
    totaHighConUsers: DashboardData
    totalTodaysLoginUSers: DashboardData
    totaMonthlyUsers: DashboardData
    totaDailyUsers: DashboardData
    totaLiveAudinece: DashboardData
    topLiveContent: DashboardData
    topVodContent: DashboardData
    topTenContent: topTanDataState
    hourlyGraphReport: DashboardData
    data: any;
}

export const SLICE_NAME = 'homeDashboard'

export const getTotalUsers = createAsyncThunk(
    SLICE_NAME + '/getTotalUsers',
    async (data: FilterQueries)  => {
        const response = await apiGetTotalUsers<
            DashboardDataResponse,
            FilterQueries
        >(data)
        return response.data
    }
)
export const getDashboardVodViews = createAsyncThunk(
    SLICE_NAME + '/getDashboardVodViews',
    async (data: FilterQueries) => {
        const response = await apiGetTotalVODViews<
            DashboardDataResponse,
            FilterQueries
        >(data)
        return response.data
    }
)
export const getDashboardLiveViews = createAsyncThunk(
    SLICE_NAME + '/getDashboardLiveViews',
    async (data: FilterQueries) => {
        const response = await apiGetTotalLiveViews<
            DashboardDataResponse,
            FilterQueries
        >(data)
        return response.data
    }
)

export const getDashboardHighConUsers = createAsyncThunk(
    SLICE_NAME + '/getDashboardHighConUsers',
    async (data: FilterQueries) => {
        const response = await apiGetHighestConUsers<
            DashboardDataResponse,
            FilterQueries
        >(data)
        return response.data
    }
)

export const getTodayLoginUsers = createAsyncThunk(
    SLICE_NAME + '/getTodayLoginUsers',
    async (data: FilterQueries) => {
        const response = await apiGetTotalTodayUsers<
            DashboardDataResponse,
            FilterQueries
        >(data)
        return response.data
    }
)
export const getMonthlyActiveUsers = createAsyncThunk(
    SLICE_NAME + '/getMonthlyActiveUsers',
    async (data: FilterQueries) => {
        const response = await apiGetMonthlyActiveUsers<
            DashboardDataResponse,
            FilterQueries
        >(data)

        return response.data
    }
)
export const getDailyActiveUsers = createAsyncThunk(
    SLICE_NAME + '/getDailyActiveUsers',
    async (data: FilterQueries) => {
        const response = await apiGetDailyActiveUsers<
            DashboardDataResponse,
            FilterQueries
        >(data)
        return response.data
    }
)

export const getLiveAudience = createAsyncThunk(
    SLICE_NAME + '/getLiveAudience',
    async (data: FilterQueries) => {
        const response = await apiGetLiveAudience<
            DashboardDataResponse,
            FilterQueries
        >(data)
        return response.data
    }
)

export const getTopTenContent = createAsyncThunk(
    SLICE_NAME + '/getTopTenContent',
    async (data: FilterQueries) => {
        const response = await apiGetTopTenContent<
            DashboardDataResponse,
            FilterQueries
        >(data)
        return response.data
    }
)

export const getHourlyGraphReport = createAsyncThunk(
    SLICE_NAME + '/getHourlyGraphReport',
    async (data: FilterQueries) => {
        const response = await apiGetHourlyGraphReport<
            DashboardDataResponse,
            FilterQueries
        >(data)
        return response.data
    }
)
export const getTopVodContent = createAsyncThunk(
    SLICE_NAME + '/getTopVodContent',
    async (data: FilterQueries) => {
        const response = await apiGetTopVodContent<
            DashboardDataResponse,
            FilterQueries
        >(data)
        return response.data
    }
)
export const getTopLiveContent = createAsyncThunk(
    SLICE_NAME + '/getTopLiveContent',
    async (data: FilterQueries) => {
        const response = await apiGetTopLiveContent<
            DashboardDataResponse,
            FilterQueries
        >(data)
        return response.data
    }
)
const initialState: DashboardState = {
    loading: false,
    totalUsersLoading: true,
    totaLiveAudloading: true,
    topTenConloading: true,
    topLiveConloading: true,
    topVodConloading: true,
    hourlyGraphloading: true,
    totaVODViewsloading: true,
    totaLiveViewsloading: true,
    totaHighConloading: true,
    totaMonthlyUsersloading: true,
    totaDailyUsersloading: true,
    totalsLoading: true,
    totalUsers: {},
    totaVODViews: {},
    totaLiveViews: {},
    totaHighConUsers: {},
    totalTodaysLoginUSers: {},
    totaMonthlyUsers: {},
    totaDailyUsers: {},
    totaLiveAudinece: {},
    topTenContent: {},
    topLiveContent: {},
    topVodContent: {},
    hourlyGraphReport: {},
    date: '',
    filterData: {
        date: '',
    },
    data:{}
}

const dashboardSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        updateLoading: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        setFilterData: (state, action: PayloadAction<any>) => {
            state = { ...state, filterData: action.payload }
            return state
        },
        setDate: (state, action: PayloadAction<any>) => {
            state = { ...state, date: action.payload }
            return state
        },
        updateStatisticsData: (state, action) => {
           return  { ...state, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTotalUsers.pending, (state) => {
                state.totalUsersLoading = true
                state.totaVODViewsloading = true
                state.totaMonthlyUsersloading = true
                state.totaDailyUsersloading = true
                state.totalsLoading = true
                state.totaLiveAudloading = true
                state.hourlyGraphloading = true
                state.topTenConloading = true
                state.totaLiveAudloading = true
                state.totaHighConloading = true
                state.topVodConloading = true
                state.topLiveConloading = true
            })
            .addCase(getTotalUsers.fulfilled, (state, action) => {
                state.totalUsers = action.payload
                state.totalUsersLoading = false
            })
            .addCase(getDashboardVodViews.pending, (state) => {
                state.totaVODViewsloading = true
            })
            .addCase(getDashboardVodViews.fulfilled, (state, action) => {
                state.totaVODViews = action.payload
                state.totaVODViewsloading = false
            })
            .addCase(getTodayLoginUsers.pending, (state) => {
                state.totalsLoading = true
            })
            .addCase(getTodayLoginUsers.fulfilled, (state, action) => {
                state.totalTodaysLoginUSers = action.payload
                state.totalsLoading = false
            })
            .addCase(getMonthlyActiveUsers.pending, (state) => {
                state.totaMonthlyUsersloading = true
            })
            .addCase(getMonthlyActiveUsers.fulfilled, (state, action) => {
                state.totaMonthlyUsers = action.payload
                state.totaMonthlyUsersloading = false
            })

            .addCase(getDailyActiveUsers.pending, (state) => {
                state.totaDailyUsersloading = true
            })
            .addCase(getDailyActiveUsers.fulfilled, (state, action) => {
                state.totaDailyUsers = action.payload
                state.totaDailyUsersloading = false
            })

            .addCase(getLiveAudience.pending, (state) => {
                state.totaLiveAudloading = true
            })
            .addCase(getLiveAudience.fulfilled, (state, action) => {
                state.totaLiveAudinece = action.payload
                state.totaLiveAudloading = false
            })

            .addCase(getDashboardLiveViews.pending, (state) => {
                state.totaLiveViewsloading = true
            })
            .addCase(getDashboardLiveViews.fulfilled, (state, action) => {
                state.totaLiveViews = action.payload
                state.totaLiveViewsloading = false
            })

            .addCase(getDashboardHighConUsers.pending, (state) => {
                state.totaHighConloading = true
            })
            .addCase(getDashboardHighConUsers.fulfilled, (state, action) => {
                state.totaHighConUsers = action.payload
                state.totaHighConloading = false
            })
            .addCase(getTopTenContent.pending, (state) => {
                state.topTenConloading = true
            })
            .addCase(getTopTenContent.fulfilled, (state, action) => {
                state.topTenContent = action.payload
                state.topTenConloading = false
            })
            .addCase(getHourlyGraphReport.pending, (state) => {
                state.hourlyGraphloading = true
            })
            .addCase(getHourlyGraphReport.fulfilled, (state, action) => {
                state.hourlyGraphReport = action.payload
                state.hourlyGraphloading = false
            })

            .addCase(getTopVodContent.pending, (state) => {
                state.topVodConloading = true
            })
            .addCase(getTopVodContent.fulfilled, (state, action) => {
                state.topVodContent = action.payload
                state.topVodConloading = false
            })

            .addCase(getTopLiveContent.pending, (state) => {
                state.topLiveConloading = true
            })
            .addCase(getTopLiveContent.fulfilled, (state, action) => {
                state.topLiveContent = action.payload
                state.topLiveConloading = false
            })
    },
})

export const {updateStatisticsData, setDate, updateLoading } = dashboardSlice.actions // export the action creator

export default dashboardSlice.reducer
