import {
    getDailyActiveUsers,
    getDashboardHighConUsers,
    getDashboardLiveViews,
    getDashboardVodViews,
    getHourlyGraphReport,
    getLiveAudience,
    getMonthlyActiveUsers,
    getTodayLoginUsers,
    getTopLiveContent,
    getTopTenContent,
    getTopVodContent,
    getTotalUsers,
    setDate,
    updateLoading,
    useAppDispatch,
    useAppSelector,
} from '../store'
import DatePicker from '@/components/ui/DatePicker'
import Button from '@/components/ui/Button'
import dayjs from 'dayjs'
import { HiOutlineFilter } from 'react-icons/hi'

import debounce from 'lodash/debounce'

// eslint-disable-next-line import/named
import {
    DATE_FORMAT,
    MAX_DATE_CALENDER,
    MIN_DATE_CALENDER,
} from '@/components/ui/utils/constants'

const DashboardHeader = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector((state) => state.homeDashboard.data.loading)
    const date = useAppSelector((state) => state.homeDashboard.data.date)

    const FilterDate = date ? dayjs.unix(Number(date)).toDate() : new Date()

    const debouncedHandleDateChange = debounce((newDate: Date | null) => {
        dispatch(setDate(dayjs(newDate).format('YYYY-MM-DD')))
        // Trigger the API requests here if needed
        // onFilter();
    }, 500) // Adjust the debounce delay as needed

    const handleDateChange = (newDate: Date | null) => {
        debouncedHandleDateChange(newDate)
    }

    const onFilter = async () => {
        try {
            dispatch(
                updateLoading({
                    loading: true,
                    totalUsersLoading: true,
                    totaVODViewsloading: true,
                    totalsLoading: true,
                    topLiveConloading: true,
                    totaLiveViewsloading: true,
                    topVodConloading: true,
                    totaHighConloading: true,
                    totaMonthlyUsersloading: true,
                    totaDailyUsersloading: true,
                    totaLiveAudloading: true,
                    topTenConloading: true,
                    hourlyGraphloading: true,
                })
            )

            await dispatch(getTotalUsers({ date }))
            await dispatch(getDashboardVodViews({ date }))
            await dispatch(getDashboardLiveViews({ date }))
            await dispatch(getTodayLoginUsers({ date }))
            await dispatch(getMonthlyActiveUsers({ date }))
            await dispatch(getDailyActiveUsers({ date }))
            await dispatch(getDashboardHighConUsers({ date }))
            await dispatch(getLiveAudience({ date }))
            await dispatch(getTopVodContent({ date }))
            await dispatch(getTopLiveContent({ date }))
            await dispatch(getHourlyGraphReport({ date }))
            await dispatch(getTopTenContent({ date }))

            dispatch(
                updateLoading({
                    loading: false,
                    totalUsersLoading: false,
                    totaVODViewsloading: false,
                    totalsLoading: false,
                    topLiveConloading: false,
                    totaLiveViewsloading: false,
                    topVodConloading: false,
                    totaHighConloading: false,
                    totaMonthlyUsersloading: false,
                    totaDailyUsersloading: false,
                    totaLiveAudloading: false,
                    topTenConloading: false,
                    hourlyGraphloading: false,
                })
            )
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    return (
        <div className="lg:flex items-center justify-between mb-4 gap-3">
            <div className="mb-4 lg:mb-0">
                <h3>Dashboard</h3>
                <p></p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <DatePicker
                    size="sm"
                    inputFormat={DATE_FORMAT}
                    defaultValue={FilterDate}
                    disabled={loading}
                    minDate={MIN_DATE_CALENDER}
                    maxDate={MAX_DATE_CALENDER}
                    onChange={handleDateChange}
                />
                <Button
                    variant="solid"
                    size="sm"
                    icon={<HiOutlineFilter />}
                    disabled={loading}
                    onClick={onFilter}
                >
                    {loading ? 'Filtering...' : 'Filter'}
                </Button>
            </div>
        </div>
    )
}

export default DashboardHeader
