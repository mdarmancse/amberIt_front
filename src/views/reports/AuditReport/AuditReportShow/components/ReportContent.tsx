import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Loading from '@/components/shared/Loading'
import { useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { HiLocationMarker, HiPhone } from 'react-icons/hi'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useAppSelector } from '@/store'
import dayjs from 'dayjs'
import { apiGetAuditReportById } from '@/services/ReportService'
 import JsonView from 'react18-json-view'
// @ts-ignore
import ReactJsonViewCompare from 'react-json-view-compare';
import 'react18-json-view/src/style.css';
import { capitalize } from 'lodash'
type DataType = {
    id: string
    user_name: string
    log_name: string
    description: string
    subject_type: string
    subject_id: string
    causer_id: string
    event: string
    created_at: number
    properties: []

}


const ReportContent = () => {
    const { textTheme } = useThemeClass()

    const location = useLocation()

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Partial<DataType>>({})


    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = async () => {
        const id = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        if (id) {
            setLoading(true)
            const response = await apiGetAuditReportById({ id })

            if (response) {
                setLoading(false)
                // @ts-ignore
                setData(response.data?.data)



            }
        }
    }


    return (
        <Loading loading={loading}>
            {!isEmpty(data) && (
                <>
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
                            <div>
                                <address className="not-italic">
                                    <div>
                                        <h5 className="text-xl font-semibold">
                                            {capitalize(data.subject_type)} #{data.subject_id}
                                        </h5>
                                        <p>Title: {data.log_name}</p>
                                        <p>Description: {data.description}</p>
                                        <p>Event: {capitalize(data?.event)}</p>
                                    </div>
                                </address>
                            </div>
                            <div>
                                <address className="not-italic">
                                    <h4 className="text-lg font-semibold">Log #{data?.id}</h4>
                                    <p>
                                        Date: {dayjs(data.created_at).format('dddd, DD MMMM, YYYY hh:mm A')}
                                    </p>
                                    <h6 className="text-lg font-semibold">{data.user_name} #{data.causer_id}</h6>
                                    {/*@ts-ignore*/}
                                    <p>IP Address: {data.ip_address}</p>
                                </address>

                            </div>
                        </div>

                        {/* Render Properties */}
                        {/*@ts-ignore*/}
                        {/* Render Properties */}
                        {/*@ts-ignore*/}
                        {data.event === 'update' || data.event === 'create' ? (
                            <div className="border rounded-lg p-4">
                                <h3 className="text-lg font-semibold mb-2">Changes</h3>
                                <hr className="mb-4" />
                                {/*@ts-ignore*/}
                                <ReactJsonViewCompare oldData={data.old_data??[]} newData={data.new_data??[]} />
                            </div>
                        ) : (
                            <div className="border rounded-lg p-4">
                                <h6 className="text-lg font-semibold">Changes show only for update & craeate event</h6>
                            </div>
                        )}

                        <div className="print:hidden mt-6 flex items-center justify-between">

                            <Button variant="solid" onClick={() => window.print()}>
                                Print
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </Loading>
    )
}

export default ReportContent
