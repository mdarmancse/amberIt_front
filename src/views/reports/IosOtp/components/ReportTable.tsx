import { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import {
    getIosOtpList,
    setFilterData,
    setTableData,
    updateLoading,
    useAppDispatch,
    useAppSelector,
} from '../../store'

import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import { Card } from '@/components/ui'
import dayjs from 'dayjs'

type Data = {
    id: number
    msisdn: string
    otp: string
    otp_expire_time: string
}

const ReportTable = () => {
    const dispatch = useAppDispatch()

    const loading = useAppSelector((state) => state.homeReportList.data.loading)

    const data = useAppSelector((state) => state.homeReportList.data.dataList)

    const fetchData = useCallback(async () => {
        dispatch(updateLoading({ loading: true }))

        await dispatch(getIosOtpList({}))
    }, [dispatch])

    // useEffect(() => {
    //     fetchData()
    // }, [
    //     dispatch
    // ])
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData()
            setTime(new Date())
        }, 20000)

        return () => clearInterval(interval)
    }, [dispatch])

    return (
        <>
            <div>
                <Card>
                    <h3 className="mb-4">IOS OTP</h3>
                    {/*@ts-ignore*/}
                    <h5 className="mb-4 text-red-700">OTP: {data?.otp} </h5>
                    {/*@ts-ignore*/}
                    <p className="mb-4">MSISDN: {data?.msisdn} </p>
                    {/*@ts-ignore*/}
                    <p className="mb-4">
                        EXPIRY TIME:{' '}
                        <span>
                            {' '}
                            {dayjs(data?.otp_expire_time).format(
                                'DD-MMM-YYYY hh:mm A'
                            )}
                        </span>
                    </p>
                    {/*<p>The current time is: {time.toLocaleTimeString()}</p>*/}
                </Card>
            </div>
        </>
    )
}

export default ReportTable
