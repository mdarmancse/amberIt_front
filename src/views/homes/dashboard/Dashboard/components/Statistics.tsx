import { useCallback, useEffect, useState } from 'react'
import Loading from '@/components/shared/Loading'
import {
    getDailyActiveUsers,
    getDashboardHighConUsers,
    getDashboardLiveViews,
    getDashboardVodViews,
    getLiveAudience,
    getMonthlyActiveUsers,
    getTodayLoginUsers,
    getTopLiveContent,
    getTopVodContent,
    getTotalUsers, updateStatisticsData,
    useAppSelector
} from '../store'
import { useAppDispatch } from '@/store'
import { HiUserGroup } from 'react-icons/hi'
import Card from '@/components/ui/Card'
import { Avatar } from '@/components/ui'
import dayjs from 'dayjs'
import appConfig from '@/configs/app.config'
import { FiPackage } from 'react-icons/fi'
import { string } from 'yup'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import { MAX_DISPLAY_LENGTH } from '@/components/ui/utils/constants'
import { getLiveAudienceDailyReport } from '@/views/reports/store'

type StatisticCardProps = {
    data?: any
    label: string
    loader: boolean
    value: string
    type: string
    valuePrefix?: string
}
type StatisticCardJsonProps = {
    data?: any
    label: string
    loader: boolean
    value: {
        USAGE_DATE: string
        USAGE_HOUR: string
        TOTAL_USER: string
        thumb: string
        CONTENT_ID: string
        content_type: string
        USERS: string
        TIME_SPENT_HOURLY: string
        VIEWS: string
    }
    type: string
}
interface StatisticsData {
    value: any // Change 'any' to the actual type of your data
}

const StatisticIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'totalUsers':
            return (
                <Avatar
                    size={55}
                    className="bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-100"
                    icon={<HiUserGroup />}
                />
            )
        case 'totalVodViews':
            return (
                <Avatar
                    size={55}
                    className="bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-100"
                    icon={<HiUserGroup />}
                />
            )

        case 'totalLiveViews':
            return (
                <Avatar
                    size={55}
                    className="bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-100"
                    icon={<HiUserGroup />}
                />
            )
        case 'loginUserDaily':
            return (
                <Avatar
                    size={55}
                    className="bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-100"
                    icon={<HiUserGroup />}
                />
            )
        case 'activeUsersDaily':
            return (
                <Avatar
                    size={55}
                    className="bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-100"
                    icon={<HiUserGroup />}
                />
            )
        case 'activeUsersMonthly':
            return (
                <Avatar
                    size={55}
                    className="bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-100"
                    icon={<HiUserGroup />}
                />
            )
        case 'highConUsers':
            return (
                <Avatar
                    size={55}
                    className="bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-100"
                    icon={<HiUserGroup />}
                />
            )
        case 'liveAudience':
            return (
                <Avatar
                    size={55}
                    className="bg-teal-100 text-teal-600 dark:bg-teal-500/20 dark:text-teal-100"
                    icon={<HiUserGroup />}
                />
            )

        default:
            return <div></div>
    }
}
const NameColumn = ({ row }: { row: any }) => {
    const { textTheme } = useThemeClass();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    if (!row?.title) {
        return null; // If title is not defined, you can choose to render nothing or provide a default value
    }

    const displayTitle = isExpanded ? row.title : `${row.title.slice(0, 50)}`;

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <span
            className={`text-xs font-semibold `}
            //  onClick={onView}
        >
            {displayTitle}
            {row.title.length > 50 && (
                <span
                    className={`cursor-pointer select-none font-semibold ${textTheme} `}
                    onClick={toggleExpansion}
                >
                    {isExpanded ? ' less' : '...more'}
                </span>
            )}
        </span>
    );
};

// @ts-ignore
const ImageColumn = ({ row }: { type?: string }) => {
    const avatar = row ? (
        <Avatar size={50} src={appConfig.filePrefixGcp + row} />
    ) : (
        <Avatar size={50} icon={<FiPackage />} />
    )

    return <div className="flex items-center">{avatar}</div>
}

const sum = (a: number, b: number) => {
    return a + b
}
const formattedNumber = (value: number | string) => {
    const numberValue = Number(value) || 0

    const options = {
        notation: 'compact',
        compactDisplay: 'short',
        minimumFractionDigits: numberValue >= 1000 ? 2 : 0,
        maximumFractionDigits: numberValue >= 1000 ? 2 : 0,
    }

    // @ts-ignore
    return new Intl.NumberFormat('en-US', options).format(numberValue)
}
const StatisticJsonDiv = ({ value, loader, label, type }: any) => {
    switch (type) {
        case 'highConUsers':
            // eslint-disable-next-line no-case-declarations
            const hour =
                value?.USAGE_HOUR +
                ':00 - ' +
                sum(Number(value?.USAGE_HOUR), 1) +
                ':00'
            return (
                <>
                    <Loading loading={loader}>
                        <div>
                            <p className="">
                                {dayjs(value?.USAGE_DATE).format(dateFormat)}{' '}
                            </p>
                            <p className="">{hour} </p>
                            <h5 className="font-bold">
                                {formattedNumber(value?.TOTAL_USER)}{' '}
                            </h5>
                        </div>
                    </Loading>
                    <StatisticIcon type={type} />
                </>
            )
        case 'topLiveContent':
            // eslint-disable-next-line no-case-declarations

            return (
                <Loading loading={loader}>
                    <div>
                        <NameColumn row={value} />
                        <h5 className="font-bold">
                            {formattedNumber(value?.VIEWS)}{' '}
                        </h5>
                    </div>
                    {/*@ts-ignore*/}
                    <ImageColumn row={value?.thumb} />
                </Loading>
            )
        case 'topVodContent':
            // eslint-disable-next-line no-case-declarations

            return (
                <Loading loading={loader}>
                    <div>
                        <NameColumn row={value} />
                        <h5 className="font-bold">
                            {formattedNumber(value?.VIEWS)}{' '}
                        </h5>
                    </div>
                    {/*@ts-ignore*/}
                    <ImageColumn row={value?.thumb} />
                </Loading>
            )

        default:
            return <div></div>
    }
}

const StatisticCard = ({
    value,
    loader,
    label,
    valuePrefix,
    type,
}: StatisticCardProps) => {
    return (
        <Card className="">
            <h6 className="font-semibold mb-4 text-sm">{label}</h6>
            <div className="flex justify-between items-center">
                <Loading loading={loader}>
                    <div>
                        <h5 className="font-bold">{formattedNumber(value)}</h5>
                    </div>
                </Loading>
                <StatisticIcon type={type} />
            </div>
        </Card>
    )
}
const dateFormat = 'ddd, MMM D, YYYY';

const StatisticCardJson = ({
    value,
    loader,
    label,
    type,
}: StatisticCardJsonProps) => {
    return (
        <Card className="">
            <h6 className="font-semibold mb-4 text-sm">{label}</h6>
            <div className="flex justify-between items-center">
                <StatisticJsonDiv
                    type={type}
                    value={value}
                    label={label}
                    loader={loader}
                />
            </div>
        </Card>
    )
}
const Statistics = () => {
    const dispatch = useAppDispatch()
    const date = useAppSelector((state) => state.homeDashboard.data.date)
    const {
        totalUsersLoading,
        totalUsers,
        totaVODViews,
        totalTodaysLoginUSers,
        totaMonthlyUsers,
        totaDailyUsers,
        totaLiveAudinece,
        totaVODViewsloading,
        totaMonthlyUsersloading,
        totalsLoading,
        totaDailyUsersloading,
        totaLiveAudloading,
        totaLiveViews,
        totaLiveViewsloading,
        totaHighConUsers,
        totaHighConloading,
        topLiveContent,
        topVodContent,
        topLiveConloading,
        topVodConloading,
    } = useAppSelector((state) => state.homeDashboard.data)

    const fetchData = useCallback(async () => {
        try {
            //dispatch(updateLoading({totaVODViewsloading:true}))
            // await Promise.all([
            //      dispatch(getTotalUsers({ date })),
            //      dispatch(getDashboardVodViews({ date })),
            //      dispatch(getDashboardLiveViews({ date })),
            //      dispatch(getTodayLoginUsers({ date })),
            //      dispatch(getMonthlyActiveUsers({ date })),
            //      dispatch(getDailyActiveUsers({ date })),
            //      dispatch(getDashboardHighConUsers({ date })),
            //      dispatch(getLiveAudience({ date })),
            //      dispatch(getTopVodContent({ date })),
            //      dispatch(getTopLiveContent({ date }))
            // ])

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
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }, [date, dispatch])

    // const CACHE_EXPIRY_TIME = 2 * 60 * 1000; // 30 minutes in milliseconds
    //
    // const fetchData = useCallback(async () => {
    //     try {
    //         const cachedData = JSON.parse(localStorage.getItem('cachedData') as string) || {};
    //         console.log("cachedData", cachedData);
    //
    //         // localStorage.removeItem('cachedData')
    //         // localStorage.removeItem('cachedTimestamp')
    //
    //         const cachedTimestamp = localStorage.getItem('cachedTimestamp');
    //
    //         if (cachedTimestamp) {
    //             const currentTime = new Date().getTime();
    //             const timeDifference = currentTime - parseInt(cachedTimestamp, 10);
    //             console.log("currentTime", currentTime);
    //             console.log("CACHE_EXPIRY_TIME", CACHE_EXPIRY_TIME);
    //             console.log("timeDifference", timeDifference);
    //             console.log("cachedTimestamp", cachedTimestamp);
    //             if (timeDifference < CACHE_EXPIRY_TIME) {
    //                 console.log("cachedData", cachedData);
    //
    //                 const totalUsersPayload = cachedData.totalUsers ?? (await dispatch(getTotalUsers({ date }))).payload;
    //                 const totaVODViewsPayload = cachedData.totaVODViews ?? (await dispatch(getDashboardVodViews({ date }))).payload;
    //                 const totalTodaysLoginPayload = cachedData.totalTodaysLoginUSers ?? (await dispatch(getTodayLoginUsers({ date }))).payload;
    //                 const totaMonthlyUsersPayload = cachedData.totaMonthlyUsers ?? (await dispatch(getMonthlyActiveUsers({ date }))).payload;
    //                 const totaDailyUsersPayload = cachedData.totaDailyUsers ?? (await dispatch(getDailyActiveUsers({ date }))).payload;
    //                 const totaLiveAudinecePayload = cachedData.totaLiveAudinece ?? (await dispatch(getLiveAudience({ date }))).payload;
    //                 const totaLiveViewsPayload = cachedData.totaLiveViews ?? (await dispatch(getLiveAudienceDailyReport({ date }))).payload;
    //                 const totaHighConUsersPayload = cachedData.totaHighConUsers ?? (await dispatch(getDashboardHighConUsers({ date }))).payload;
    //                 const topLiveContentPayload = cachedData.topLiveContent ?? (await dispatch(getTopLiveContent({ date }))).payload;
    //                 const topVodContentPayload = cachedData.topVodContent ?? (await dispatch(getTopVodContent({ date }))).payload;
    //
    //                 dispatch(updateStatisticsData({
    //                     totalUsers: totalUsersPayload,
    //                     totalUsersLoading: false,
    //                     totaVODViews: totaVODViewsPayload,
    //                     totaVODViewsloading: false,
    //                     totalTodaysLoginUSers: totalTodaysLoginPayload,
    //                     totalsLoading: false,
    //                     totaMonthlyUsers: totaMonthlyUsersPayload,
    //                     totaMonthlyUsersloading: false,
    //                     totaDailyUsers: totaDailyUsersPayload,
    //                     totaDailyUsersloading: false,
    //                     totaLiveAudinece: totaLiveAudinecePayload,
    //                     totaLiveAudloading: false,
    //                     totaLiveViews: totaLiveViewsPayload,
    //                     totaLiveViewsloading: false ,
    //                     totaHighConUsers: totaHighConUsersPayload,
    //                     totaHighConloading: false ,
    //                     topLiveContent: topLiveContentPayload,
    //                     topLiveConloading: false,
    //                     topVodContent: topVodContentPayload,
    //                     topVodConloading: false,
    //                 }));
    //
    //                 // Update localStorage immediately after fetching each piece of data
    //                 const updatedCachedData = {
    //                     ...cachedData,
    //                     totalUsers: totalUsersPayload,
    //                     totaVODViews: totaVODViewsPayload,
    //                     totalTodaysLoginUSers: totalTodaysLoginPayload,
    //                     totaMonthlyUsers: totaMonthlyUsersPayload,
    //                     totaDailyUsers: totaDailyUsersPayload,
    //                     totaLiveAudinece: totaLiveAudinecePayload,
    //                     totaLiveViews: totaLiveViewsPayload,
    //                     totaHighConUsers: totaHighConUsersPayload,
    //                     topLiveContent: topLiveContentPayload,
    //                     topVodContent: topVodContentPayload,
    //
    //                 };
    //
    //                 localStorage.setItem('cachedData', JSON.stringify(updatedCachedData));
    //
    //                 return;
    //             }
    //         }
    //
    //         const apiList = [
    //             { key: 'totalUsers', action: getTotalUsers },
    //             { key: 'totaVODViews', action: getDashboardVodViews },
    //             { key: 'totalTodaysLoginUSers', action: getTodayLoginUsers },
    //             { key: 'totaMonthlyUsers', action: getMonthlyActiveUsers },
    //             { key: 'totaDailyUsers', action: getDailyActiveUsers },
    //             { key: 'totaLiveAudinece', action: getLiveAudience },
    //             { key: 'totaLiveViews', action: getDashboardLiveViews },
    //             { key: 'totaHighConUsers', action: getDashboardHighConUsers },
    //             { key: 'topVodContent', action: getTopVodContent },
    //             { key: 'topLiveContent', action: getTopLiveContent },
    //
    //             // Add other APIs to the list as needed
    //         ];
    //         localStorage.setItem('cachedTimestamp', new Date().getTime().toString());
    //
    //         for (const api of apiList) {
    //             if (!cachedData[api.key]) {
    //                 const apiAction = dispatch(api.action({ date }));
    //                 const apiActionPayload = (await apiAction).payload;
    //
    //                 cachedData[api.key] = apiActionPayload;
    //                 localStorage.setItem('cachedData', JSON.stringify(cachedData));
    //             }
    //         }
    //
    //         // Update the timestamp in storage to mark the latest fetch time
    //
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // }, [date, dispatch]);
    useEffect(() => {
        fetchData()
    }, [dispatch])

    const totalUser: StatisticsData['value'] = totalUsers?.data
    const totalVOd: StatisticsData['value'] = totaVODViews?.data
    const topVodCon: StatisticsData['value'] = topVodContent?.data
    const topLiveCon: StatisticsData['value'] = topLiveContent?.data
    const totalLive: StatisticsData['value'] = totaLiveViews?.data
    const totalHcUsers: StatisticsData['value'] = totaHighConUsers?.data
    const totalTodayLoginUsers: StatisticsData['value'] =
        totalTodaysLoginUSers?.data
    const totalMonthlyActiveUsers: StatisticsData['value'] =
        totaMonthlyUsers?.data
    const totalDailyActiveUsers: StatisticsData['value'] = totaDailyUsers?.data
    const totalLiveAudience: StatisticsData['value'] = totaLiveAudinece?.data

    const dau: any = totalDailyActiveUsers?.value
    const mau: any = totalMonthlyActiveUsers?.value


    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <StatisticCard
                label="Total Users"
                loader={totalUsersLoading}
                value={totalUser?.value}
                type="totalUsers"
            />
            <StatisticCard
                label="VOD Views"
                loader={totaVODViewsloading}
                value={totalVOd?.value}
                type="totalVodViews"
            />

            <StatisticCard
                label="Channel Views"
                loader={totaLiveViewsloading}
                value={totalLive?.value}
                type="totalLiveViews"
            />

            <StatisticCard
                label="Login Users"
                loader={totalsLoading}
                value={totalTodayLoginUsers?.value}
                type="loginUserDaily"
            />
            <StatisticCard
                label="MAU"
                loader={totaMonthlyUsersloading}
                value={mau ? mau.User : 0}
                type="activeUsersDaily"
            />
            <StatisticCard
                label="DAU"
                loader={totaDailyUsersloading}
                value={dau ? dau.User : 0}
                type="activeUsersMonthly"
            />
            <StatisticCardJson
                label="Highest Concurrency Users"
                loader={totaHighConloading}
                value={totalHcUsers?.value}
                type="highConUsers"
            />
            <StatisticCard
                label="Live Audience"
                loader={totaLiveAudloading}
                value={totalLiveAudience?.value}
                type="liveAudience"
            />
            <StatisticCardJson
                label="Top VOD Content"
                loader={topVodConloading}
                value={topVodCon?.value}
                type="topVodContent"
            />

            <StatisticCardJson
                label="Top Live Content"
                loader={topLiveConloading}
                value={topLiveCon?.value}
                type="topLiveContent"
            />
        </div>
    )
}


export default Statistics
