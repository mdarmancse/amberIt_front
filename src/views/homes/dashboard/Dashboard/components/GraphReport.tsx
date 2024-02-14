import Card from '@/components/ui/Card'
import Chart from 'react-apexcharts'

import { COLORS } from '@/constants/chart.constant'
import { useAppDispatch } from '@/store'
import { getHourlyGraphReport, useAppSelector } from '../store'
import { useCallback, useEffect } from 'react'
import { Loading } from '@/components/shared'

const GraphReport = () => {
    const dispatch = useAppDispatch()
    const date = useAppSelector((state) => state.homeDashboard.data.date)
    const HourlyGraphReport = useAppSelector(
        (state) => state.homeDashboard.data.hourlyGraphReport
    )
    const hourlyGraphloading = useAppSelector(
        (state) => state.homeDashboard.data.hourlyGraphloading
    )
    let hourlyGraphReport: any
    // eslint-disable-next-line prefer-const
    hourlyGraphReport = HourlyGraphReport?.data

    const fetchData = useCallback(async () => {
        await dispatch(getHourlyGraphReport({ date }))
    }, [dispatch])

    useEffect(() => {
        fetchData()
    }, [dispatch])

    const seriesData = hourlyGraphReport?.value.map(
        (item: { name: any; data: { totalUser: any }[] }) => ({
            name: item.name,
            data: item.data.map((entry: { totalUser: any }) => entry.totalUser),
        })
    )

    const categories = hourlyGraphReport?.value[0].data.map(
        (entry: { hour: any }) => entry.hour
    )

    return (
        <Card className="col-span-1">
            <div className="flex items-center justify-between mb-4">
                <h4 className="mb-4 lg:mb-0">Hourly Utilization</h4>
            </div>
            <Loading loading={hourlyGraphloading}>
                <div className="h-100  max-h-[300px] min-h-[300px]">
                    <Chart
                        options={{
                            dataLabels: {
                                enabled: false,
                            },
                            colors: COLORS,
                            stroke: {
                                width: 1.5,
                                curve: 'smooth',
                            },
                            xaxis: { categories },
                            tooltip: {
                                x: {
                                    format: 'dd/MM/yy HH:mm',
                                },
                            },
                            chart: {
                                toolbar: { show: false },
                            },
                        }}
                        series={seriesData}
                        type="line"
                        height={300}
                    />
                </div>
            </Loading>
        </Card>
    )
}

export default GraphReport
