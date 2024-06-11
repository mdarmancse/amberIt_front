import ReportFilter from './ReportFilter'
import { Button } from '@/components/ui'
import { HiDownload } from 'react-icons/hi'
import { CSVLink } from 'react-csv'
import { useAppSelector } from '../store'

const headers = [
    { label: 'Content ID', key: 'CONTENT_ID' },
    { label: 'Title', key: 'title' },
    { label: 'Content Type', key: 'content_type' },
    { label: 'Users', key: 'USERS' },
    { label: 'Dur(Hr)', key: 'TIME_SPENT_HOURLY' },
    { label: 'Views', key: 'VIEWS' },
]

const ReportTableTools = () => {
    const data = useAppSelector(
        (state) => state.contentViewReportList.data.dataList
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
                filename="content-views.csv"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </CSVLink>
        </div>
    )
}

export default ReportTableTools
