import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import WebSeriesForm , {
    FormModel,
    OnDeleteCallback,
    SetSubmitting,
} from '@/views/homes/webSeries/WebSeriesForm'
import { apiCreateWebSeries } from '@/services/WebSeriesService'


const WebSeriesNew = () => {
    const navigate = useNavigate()

    const addData = async (data: FormModel) => {
        const response = await apiCreateWebSeries<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const res = await addData(values)

        setSubmitting(false)
        // @ts-ignore
        if (res?.success) {
            popNotification('added')
        } else {
            errorNotification(res)
            setSubmitting(false)
        }
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfully ${keyword}`}
                type="success"
                duration={2500}
            >
                WebSeries successfully {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/webSeries/webSeries-list')
    }
    const errorNotification = (res: any) => {
        toast.push(
            <Notification
                title={`${res.data.details}`}
                type="danger"
                duration={2500}
            >
                Please try again
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        //  navigate('/app/categories/category-new')
    }

    const handleDiscard = () => {
        navigate('/app/webSeries/webSeries-list')
    }
    return (
        <>
            <WebSeriesForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default WebSeriesNew
