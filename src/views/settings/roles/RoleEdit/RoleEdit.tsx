import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getData,
    updateData,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import PermissionForm, {
    FormModel,
    OnDeleteCallback,
    SetSubmitting,
} from '@/views/settings/roles/PermissionForm'

injectReducer('homeRoleEdit', reducer)

const RoleEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const data = useAppSelector((state) => state.homeRoleEdit.data.data)
    const loading = useAppSelector((state) => state.homeRoleEdit.data.loading)

    const fetchData = (data: { id: string }) => {
        dispatch(getData(data))
    }


    const handleFormSubmit = async(
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {



        const transformedData = {
            //@ts-ignore
            id: values.id,
            role_name: values.role_name,
            menu_permissions: Object.entries(values).map(([menu_id, per]) => ({
                menu_id: parseInt(menu_id),
                read: Array.isArray(per) && per.includes('read'),
                create: Array.isArray(per) && per.includes('create'),
                edit: Array.isArray(per) && per.includes('edit'),
                delete: Array.isArray(per) && per.includes('delete'),
            })),
        };





        setSubmitting(true)
        const res = await updateData(transformedData)

        setSubmitting(false)
        // @ts-ignore
        if (res?.success) {
            popNotification('updated')
        } else {
            errorNotification(res)
            setSubmitting(false)
        }


        setSubmitting(false);
    };

    const handleDiscard = () => {
        navigate('/settings/roles/role-list')
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
        // navigate(`/settings/roles/role-new`)
    }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {data?.success && (
                    <>
                        {/*<RoleForm*/}
                        {/*    type="edit"*/}
                        {/*    // @ts-ignore*/}
                        {/*    initialData={data?.data}*/}
                        {/*    onFormSubmit={handleFormSubmit}*/}
                        {/*    onDiscard={handleDiscard}*/}
                        {/*    //   onDelete={handleDelete}*/}
                        {/*/>*/}

                        <PermissionForm
                            type="edit"
                            // @ts-ignore
                            initialData={data?.data}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            //   onDelete={handleDelete}
                        />
                    </>
                )}
            </Loading>
            {!loading && !data?.success && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No Data found!"
                    />
                    <h3 className="mt-8">No Data found!</h3>
                </div>
            )}
        </>
    )
}

export default RoleEdit
