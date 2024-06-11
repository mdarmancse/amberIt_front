import { useEffect, useCallback } from 'react'

import {
    // eslint-disable-next-line import/named
    getLiveAudienceDailyReport,
    updateLoading,
    useAppDispatch,
    useAppSelector,
} from '../store'

import { Loading } from '@/components/shared'
import { Card } from '@/components/ui'

const ReportTable = () => {
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.liveAudReportList.data.tableData
    )

    const { start_date, end_date } = useAppSelector(
        (state) => state.liveAudReportList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.liveAudReportList.data.loading
    )

    const data = useAppSelector(
        (state) => state.liveAudReportList.data.dataList
    )

    const fetchData = useCallback(async () => {
        dispatch(updateLoading({ loading: true }))

        await dispatch(
            getLiveAudienceDailyReport({
                start_date,
                end_date,
                pageIndex,
                pageSize,
                sort,
                query,
            })
        )
    }, [dispatch, start_date, end_date, pageIndex, pageSize, sort, query])
    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort, start_date, end_date])

    //@ts-ignore
    const tbleData: any = data?.data

    const horizontalCard = (
        <div className="flex flex-col md:flex-row items-center">
            <div className="rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-4">
                <img
                    className="object-cover w-full h-40 md:h-auto md:w-60 md:rounded-t-lg md:rounded-none md:rounded-s-lg"
                    src="/img/avatars/liveAudience.png"
                    alt="Live Audience"
                />
            </div>
            <div>
                <span className=" font-semibold uppercase">Total Views</span>
                <h4 className="font-bold my-3">
                    {tbleData ? tbleData[0].total_live_audience : 0}
                </h4>
            </div>
        </div>
    )
    return (
        <div className="max-w-lg ">
            <Loading loading={loading}>
                <Card
                    clickable
                    className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                    header={horizontalCard}
                    headerClass="p-0"
                    footerBorder={false}
                    headerBorder={false}
                />
            </Loading>
        </div>
    )
}

export default ReportTable
