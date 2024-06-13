import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import SettingForm, {
    FormModel,
    SetSubmitting,
} from '@/views/settings/settings/SettingForm'
import { apiCreateMenu } from '@/services/MenuService'
import { apiCreateSetting } from '@/services/SettingService'


const SettingNew = () => {
    const navigate = useNavigate()

    const addData = async (data: FormModel) => {
        const response = await apiCreateSetting<boolean, FormModel>(data)
        return response.data
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        // console.log(values)
        // return
        setSubmitting(true)
        const res = await addData(values)

        setSubmitting(false)
        // @ts-ignore
        if (res?.success) {
            popNotification('created')
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
                Setting successfully {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/settings/settings/setting-list')
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
     //   navigate('/settings/settings/setting-list')
    }

    const handleDiscard = () => {
        navigate('/settings/settings/setting-list')
    }
    return (
        <>
            <SettingForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default SettingNew
