import ReportFilter from './ReportFilter'
import { Button } from '@/components/ui'
import { HiDownload } from 'react-icons/hi'
import { CSVLink } from 'react-csv'
import { useAppSelector } from '../store'

const headers = [
    { label: 'Device Name', key: 'device_name' },
    { label: 'Total Users', key: 'total_users' },
]

const ReportTableTools = () => {
    const data = useAppSelector(
        (state) => state.deviceUsersReportList.data.dataList
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const csData: any = data ?? []
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <ReportFilter />

            <CSVLink
                data={csData}
                headers={headers}
                target="_blank"
                filename="device_type_wise_users.csv"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </CSVLink>

            {/*<ReportTableSearch />*/}
        </div>
    )
}

export default ReportTableTools
