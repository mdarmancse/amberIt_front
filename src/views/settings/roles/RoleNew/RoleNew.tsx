import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import RoleForm, { FormModel, SetSubmitting } from '../RoleForm/RoleForm'
import { apiCreateRole } from '@/services/RoleService'

const RoleNew = () => {
    const navigate = useNavigate()

    const addData = async (data: FormModel) => {
        const response = await apiCreateRole<boolean, FormModel>(data)
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
                Role successfully {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/settings/roles/role-list')
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
    //    navigate(`/settings/roles/role-new`)
    }

    const handleDiscard = () => {
        navigate('/settings/roles/role-list')
    }
    return (
        <>
            <RoleForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default RoleNew
