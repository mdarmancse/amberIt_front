import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import reducer, {
    getData,
    updateData,
    // deleteData,
    useAppSelector,
    useAppDispatch,
} from './store'
import { injectReducer } from '@/store'
import { useLocation, useNavigate } from 'react-router-dom'

import UserForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/settings/users/UserForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('homeUserEdit', reducer)

const UserEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const data = useAppSelector((state) => state.homeUserEdit.data.data)
    const loading = useAppSelector((state) => state.homeUserEdit.data.loading)

    const fetchData = (data: { id: string }) => {
        dispatch(getData(data))
    }

    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const res = await updateData(values)

        setSubmitting(false)
        // @ts-ignore
        if (res?.success) {
            popNotification('updated')
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
                User successfully {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/settings/users/user-list')
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
       // navigate('/settings/users/user-list')
    }
    const handleDiscard = () => {
        navigate('/settings/users/user-list')
    }

    const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
        setDialogOpen(false)
        // const success = await deleteData({ id: data.id })
        //  if (success) {
        //      popNotification('deleted')
        //  }
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
                        <UserForm
                            type="edit"
                            initialData={data?.data}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
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

export default UserEdit
