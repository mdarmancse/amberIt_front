import ReportFilter from './ReportFilter'
import { Button } from '@/components/ui'
import { HiDownload } from 'react-icons/hi'
import { CSVLink } from 'react-csv'
import { useAppSelector } from '../store'

const headers = [
    { label: 'Year Month', key: 'Year_Month' },
    { label: 'User', key: 'User' },
]
const ReportTableTools = () => {
    const data = useAppSelector(
        (state) => state.uniqueUserMonthlyReportList.data.dataList
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const csData: any = data?.data ?? []

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <ReportFilter />

            <CSVLink
                data={csData}
                headers={headers}
                target="_blank"
                filename="unique-user-monthly.csv"
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
