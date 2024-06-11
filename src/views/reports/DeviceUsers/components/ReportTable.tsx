import { useEffect, useCallback } from 'react'

import {
    // eslint-disable-next-line import/named
    getDeviceUsersReport,
    updateLoading,
    useAppDispatch,
    useAppSelector,
} from '../store'

import { Loading } from '@/components/shared'
import { NumericFormat } from 'react-number-format'
import { CgWebsite } from 'react-icons/cg'
import { FaApple, FaAndroid } from 'react-icons/fa'
import { Avatar } from '@/components/ui'
import { HiOutlineDesktopComputer, HiUserGroup } from 'react-icons/hi'
import { string } from 'yup'
import Card from '@/components/ui/Card'

const StatisticIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'Android':
            return (
                <Avatar
                    size={55}
                    className="bg-green-100 text-rose-600 dark:bg-green-500/20 dark:text-green-100"
                    icon={<FaAndroid />}
                />
            )
        case 'IOS':
            return (
                <Avatar
                    size={55}
                    className="bg-green-100 text-rose-600 dark:bg-green-500/20 dark:text-green-100"
                    icon={<FaApple />}
                />
            )

        case 'Web':
            return (
                <Avatar
                    size={55}
                    className="bg-green-100 text-rose-600 dark:bg-green-500/20 dark:text-green-100"
                    icon={<HiOutlineDesktopComputer />}
                />
            )

        default:
            return <div></div>
    }
}

const ReportTable = () => {
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.deviceUsersReportList.data.tableData
    )

    const { start_date, end_date } = useAppSelector(
        (state) => state.deviceUsersReportList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.deviceUsersReportList.data.loading
    )

    const data = useAppSelector(
        (state) => state.deviceUsersReportList.data.dataList
    )

    const fetchData = useCallback(() => {
        dispatch(updateLoading({ loading: true }))

        dispatch(
            getDeviceUsersReport({
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

    const sum = (a: number, b: number) => {
        return a + b
    }
    return (
        <div className="max-w-4xl mx-auto">
            <Loading loading={loading}>
                <div className="-mx-4">
                    {data && Array.isArray(data) && data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4">
                            {data.map((item, index) => (
                                <Card className="" key={index}>
                                    <h6 className="font-semibold mb-4 text-sm">
                                        {item.device_name}
                                    </h6>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h5 className="font-bold">
                                                <NumericFormat
                                                    thousandSeparator
                                                    displayType="text"
                                                    value={item.total_users}
                                                />
                                            </h5>
                                        </div>

                                        <StatisticIcon
                                            type={item.device_name}
                                        />
                                    </div>
                                </Card>

                                // </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center w-full my-8 text-gray-500">
                            No data available.
                        </p>
                    )}
                </div>
            </Loading>
        </div>
    )
}

export default ReportTable
