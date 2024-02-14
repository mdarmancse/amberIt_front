import NotificationForm, {
    FormModel,
    SetSubmitting,
} from '@/views/homes/fcmNotification/NotificationForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'

import { apiCreateNotification } from '@/services/FcmService'

const NotificationNew = () => {
    const navigate = useNavigate()

    const addData = async (data: FormModel) => {
        const response = await apiCreateNotification<boolean, FormModel>(data)

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
            popNotification('sent')
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
                Notification {keyword} successfully
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/fcm/notification-list')
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
       // navigate(`/app/fcm/notification-new`)
    }

    const handleDiscard = () => {
        navigate('/app/fcm/notification-list')
    }

    return (
        <>
            <NotificationForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default NotificationNew
