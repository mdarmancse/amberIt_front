import ReportFilter from './ReportFilter'
import { useEffect, useState } from 'react'
import { apiGetUserDataAll } from '@/services/UserService'

const ReportTableTools = () => {

    const [users, setUserData] = useState<any>()

    const getUsers = async () => {
        try {
            const response = await apiGetUserDataAll({})
            // @ts-ignore
            setUserData(response.data?.data)
        } catch (error) {
            console.error('Error fetching home data:', error)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/*@ts-ignore*/}
            <ReportFilter users={users}/>

            {/*<Link download to="/data/order-list.csv" target="_blank">*/}
            {/*    <Button block size="sm" icon={<HiDownload />}>*/}
            {/*        Export*/}
            {/*    </Button>*/}
            {/*</Link>*/}

            {/*<ReportTableSearch />*/}
        </div>
    )
}

export default ReportTableTools
