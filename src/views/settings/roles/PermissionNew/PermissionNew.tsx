import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import {  apiSetPermission } from '@/services/RoleService'
import PermissionForm , { FormModel, SetSubmitting }from '../PermissionForm/PermissionForm'

const PermissionNew = () => {
    const navigate = useNavigate()
    //   console.log('secMenuData',menuRows.data)
    const handleFormSubmit = async(
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {

        const transformedData = {
            //@ts-ignore
            role_name: values.role_name ,
            menu_permissions: Object.entries(values).map(([menu_id, permissions]) => ({
                menu_id: parseInt(menu_id),
                read: permissions.includes('read'),
                create: permissions.includes('create'),
                edit: permissions.includes('edit'),
                delete: permissions.includes('delete'),
            })),
        };


        setSubmitting(true)
        const res = await addData(transformedData)

        setSubmitting(false)
        // @ts-ignore
        if (res?.success) {
            popNotification('added')
        } else {
            errorNotification(res)
            setSubmitting(false)
        }


        setSubmitting(false);
    };

    const addData = async (data: {
        role_name: string[];
        menu_permissions: { read: boolean; edit: boolean; create: boolean; delete: boolean; menu_id: number }[]
    }) => {
        const response = await apiSetPermission(data)
        return response.data
    }

    const popNotification = (keyword: string) => {
        toast.push(
            <Notification
                title={`Successfully ${keyword}`}
                type="success"
                duration={2500}
            >
                Permission successfully {keyword}
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
     //   navigate(`/settings/roles/acl`)
    }

    const handleDiscard = () => {
        navigate('/settings/roles/role-list')
    }
    return (
        <>
            <PermissionForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default PermissionNew
