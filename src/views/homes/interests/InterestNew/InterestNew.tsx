import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import InterestForm, {
    FormModel,
    SetSubmitting,
} from '@/views/homes/interests/InterestForm/InterestForm'
import { apiCreateInterest } from '@/services/InterestService'


const InterestNew = () => {
    const navigate = useNavigate()

    const addData = async (data: FormModel) => {
        const response = await apiCreateInterest<boolean, FormModel>(data)
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
                Interest successfully {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/interests/interest-list')
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
        navigate('/app/interests/interest-list')
    }
    return (
        <>
            <InterestForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default InterestNew
