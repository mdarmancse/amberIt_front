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

// @ts-ignore
import ContentForm, {
    FormModel,
    SetSubmitting,
    OnDeleteCallback,
} from '@/views/homes/contents/ContentForm'
import isEmpty from 'lodash/isEmpty'
import { GroupBase, OptionsOrGroups } from 'react-select'

injectReducer('homeContentEdit', reducer)

const ContentEdit = () => {
    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const data = useAppSelector((state) => state.homeContentEdit.data.data)
    const loading = useAppSelector(
        (state) => state.homeContentEdit.data.loading
    )

    const fetchData = (data: { id: number | string }) => {
        // @ts-ignore
        dispatch(getData(data))
    }

    // console.log('EDITDATA',data)

    let editData: OptionsOrGroups<any, GroupBase<any>> | undefined

    // editData=data?.data;

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
                Content successfully {keyword}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/contents/vod-list')
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
        //navigate(`/app/contents/content-edit/${data.id}`)
    }

    const handleDiscard = () => {
        navigate('/app/contents/vod-list')
    }

    // const handleDelete = async (setDialogOpen: OnDeleteCallback) => {
    //     setDialogOpen(false)
    //     const success = await deleteData({ id: data.id })
    //     if (success) {
    //         popNotification('deleted')
    //     }
    // }

    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    // @ts-ignore
    return (
        <>
            <Loading loading={loading}>
                {data?.success && (
                    <>
                        <ContentForm
                            type="edit"
                            initialData={data?.data}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            // onDelete={handleDelete}
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

export default ContentEdit
