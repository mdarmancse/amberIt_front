import ReportFilter from './ReportFilter'
import { useEffect, useState } from 'react'
import { apiGetUserDataAll } from '@/services/UserService'
import { Button } from '@/components/ui'
import { HiDownload } from 'react-icons/hi'
import { CSVLink } from 'react-csv'
import { useAppSelector } from '../store'

const headers = [
    { label: 'User Name', key: 'user_name' },
    { label: 'Event', key: 'event' },
    { label: 'Log Name', key: 'log_name' },
    { label: 'Description', key: 'description' },
    { label: 'Table Name', key: 'subject_type' },
]

const ReportTableTools = () => {
    const [users, setUserData] = useState<any>()
    const data = useAppSelector((state) => state.auditReportList.data.dataList)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const csData: any = data ?? []

    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/*@ts-ignore*/}
            <ReportFilter/>

            <CSVLink
                data={csData}
                headers={headers}
                target="_blank"
                filename="audit-report.csv"
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
