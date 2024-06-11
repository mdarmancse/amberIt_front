import { useEffect, useCallback } from 'react'

import {
    // eslint-disable-next-line import/named
    getLPaymentReport,
    updateLoading,
    useAppDispatch,
    useAppSelector,
} from '../store'

import { Loading } from '@/components/shared'
import { Card } from '@/components/ui'
import { NumericFormat } from 'react-number-format'
import { HiOutlineInformationCircle } from 'react-icons/hi'

const ReportTable = () => {
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.paymentReportList.data.tableData
    )

    const { start_date, end_date } = useAppSelector(
        (state) => state.paymentReportList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.paymentReportList.data.loading
    )

    const data = useAppSelector(
        (state) => state.paymentReportList.data.dataList
    )

    const fetchData = useCallback(() => {
        dispatch(updateLoading({ loading: true }))

        dispatch(
            getLPaymentReport({
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
                <div className="flex flex-wrap -mx-4">
                    {data && Array.isArray(data) && data.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 p-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {data.map((item, index) => (
                                <Card
                                    key={index}
                                    className="bg-white p-4 rounded-lg shadow-md"
                                >
                                    <h6 className="font-semibold mb-4 text-sm whitespace-nowrap">
                                        {item.title}
                                    </h6>
                                    <div className="flex flex-col h-full">
                                        <div className="flex justify-between items-center mb-2">
                                            <div>
                                                <NumericFormat
                                                    thousandSeparator
                                                    displayType="text"
                                                    value={item.value}
                                                />
                                                {item.usage_hour && (
                                                    <div>
                                                        {(() => {
                                                            const hour =
                                                                item?.usage_hour +
                                                                ':00 - ' +
                                                                sum(
                                                                    Number(
                                                                        item?.usage_hour
                                                                    ),
                                                                    1
                                                                ) +
                                                                ':00'

                                                            return (
                                                                <span className="text-xs whitespace-nowrap">
                                                                    ({hour})
                                                                </span>
                                                            )
                                                        })()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {item.note && (
                                            <div className="flex items-center mt-4 mb-0">
                                                <hr />
                                                <div className="flex items-center">
                                                    <HiOutlineInformationCircle className="cursor-pointer mr-2" />
                                                    <span className="text-xs whitespace-nowrap">
                                                        {item.note}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                    {!data ||
                        (Array.isArray(data) && data.length === 0 && (
                            <p className="text-center w-full my-8 text-gray-500">
                                No data available.
                            </p>
                        ))}
                </div>
            </Loading>
        </div>
    )
}

export default ReportTable
