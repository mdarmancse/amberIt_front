import { Dispatch, forwardRef, SetStateAction, useEffect, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import BasicFields from './BasicFields'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import ContentImages from '@/views/homes/contents/ContentForm/ContentImages'
import DateTimeFields from '@/views/homes/contents/ContentForm/DateTimeFields'
import ContentDetailsFields from '@/views/homes/contents/ContentForm/ContentDetailsFields'
import CategoryFields from '@/views/homes/contents/ContentForm/CategoryFields'
import CdnSection from '@/views/homes/contents/ContentForm/CdnSection'
import WebSeriesSection from '@/views/homes/contents/ContentForm/WebSeriesSection'
import { apiGetContentsHomeData } from '@/services/ContentService'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    tags?: string[]
    genre?: string[]
    mediaUrl?: string
}

export type FormModel = Omit<InitialData, 'genre'> & {
    tags: { label: string; value: string }[] | string[]
    genre: { label: string; value: string }[] | string[]
}


export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type ContentForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    content_name: Yup.string().required('Content Name Required'),
    content_description: Yup.string().required('Content Description Required'),
    category_id: Yup.string().required('Category ID Required'),
    content_type: Yup.string().required('Content Type Required'),
    content_identity: Yup.string().required('Content Identity Required'),
})

const DeleteProductButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete product"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Are you sure you want to delete this content? All record
                    related to this content will be deleted as well. This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ContentForm = forwardRef<FormikRef, ContentForm>((props, ref) => {
    const [isSubmitDisabled, setSubmitDisabled] = useState(false)
    const [contentHomeData, setContentHomeData] = useState<any>()

    const getContentHomeData = async () => {
        try {
            const response = await apiGetContentsHomeData({})
            setContentHomeData(response.data)
        } catch (error) {
            console.error('Error fetching home data:', error)
        }
    }

    useEffect(() => {
        getContentHomeData()
    }, [])

    const {
        type,
        initialData = {
            content_name: '',
            content_description: '',
            content_identity: '',
            content_type: 'VOD',
            is_active: '',
            is_adult: '',
            is_premium: '',
            category_id: '',
            category_name: '',
            subcategory_id: '',
            subcategory_name: '',
            keywords: '',
            genre: [],
            tags: [],
            home_page_link: '',
            language: '',
            size: '',
            actors: '',
            file_location: '',
            last_air_date: '',
            quality: '',
            rating: '',
            release_year: '',
            release_date: '',
            is_trailer_available: '',
            trailer_uri:'',
            is_tv_series:'',
            tv_series_id:'',
            tv_series_name:'',
            season_name:'',
            episode_number:'',
            episode_identity:'',
            overview:'',
            poster:'',
            backdrops_poster:'',

        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props

    const tagsString: any = initialData?.genre

    const tagsArray =
        typeof tagsString === 'string'
            ? tagsString.split(' | ').map((value: string) => ({
                  label: value,
                  value: null,
              }))
            : []

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                    tags: tagsArray,
                    genre: tagsArray,
                }}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData =cloneDeep(values)

                    // formData.tags = formData.tags.map((tag) => {
                    //     if (typeof tag !== 'string') {
                    //         return tag.value
                    //     }
                    //     return tag
                    // })
                    if (type === 'new') {
                        // if (formData.imgList && formData.imgList.length > 0) {
                        //     formData.img = formData.imgList[0].img
                        // }
                    }
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2 ">
                                    <BasicFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        setSubmitDisabled={setSubmitDisabled}
                                    />

                                    {/*<DateTimeFields*/}
                                    {/*    touched={touched}*/}
                                    {/*    errors={errors}*/}
                                    {/*    values={values}*/}
                                    {/*/>*/}
                                    <CategoryFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        contentHomeData={contentHomeData}
                                        type={type}
                                    />
                                    <ContentDetailsFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                    <WebSeriesSection
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        contentHomeData={contentHomeData}
                                        type={type}
                                    />
                                    {/*<CdnSection*/}
                                    {/*    touched={touched}*/}
                                    {/*    errors={errors}*/}
                                    {/*    values={values}*/}
                                    {/*    type={type}*/}
                                    {/*/>*/}

                                </div>

                                <div className="lg:col-span-1 grid row-span-3">
                                    <ContentImages
                                        values={values}
                                        setSubmitDisabled={setSubmitDisabled}
                                    />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                {/*<div>*/}
                                {/*    {type === 'edit' && (*/}
                                {/*        <DeleteProductButton*/}
                                {/*            onDelete={onDelete as OnDelete}*/}
                                {/*        />*/}
                                {/*    )}*/}
                                {/*</div>*/}
                                <div className="md:flex items-center">
                                    <Button
                                        size="sm"
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        onClick={() => onDiscard?.()}
                                    >
                                        Discard
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                        disabled={isSubmitDisabled}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ContentForm.displayName = 'ContentForm'

export default ContentForm
