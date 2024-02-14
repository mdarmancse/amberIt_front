import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import CategoryForm, {
    FormModel,
    SetSubmitting,
} from '@/views/homes/categories/CategoryForm/CategoryForm'
import { apiCreateMenu } from '@/services/MenuService'
import MenuForm from '@/views/settings/menus/MenuForm'


const MenuNew = () => {
    const navigate = useNavigate()

    const addData = async (data: FormModel) => {
        const response = await apiCreateMenu<boolean, FormModel>(data)
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
                Menu successfully {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/settings/menus/menu-list')
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
        navigate('/settings/menus/menu-list')
    }

    const handleDiscard = () => {
        navigate('/settings/menus/menu-list')
    }
    return (
        <>
            <MenuForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default MenuNew
