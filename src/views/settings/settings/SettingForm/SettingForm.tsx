import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import StickyFooter from '@/components/shared/StickyFooter'
import { Form, Formik, FormikProps } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

import SettingFields from '@/views/settings/settings/SettingForm/SettingFields'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    id?: string | number
    device_type?:  number
    terms_and_conditions?:  string
    privacy_notice?:  string
    faq?:  string
    is_active?: number
}

export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type SettingForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    //  menu_id: Yup.string().required('Menu ID Required'),
    device_type: Yup.string().required('Device Type Required'),
})

const SettingForm = forwardRef<FormikRef, SettingForm>((props, ref) => {
    const {
        type,
        initialData = {
            id: '',
            device_type:  '',
            terms_and_conditions:  '',
            privacy_notice:  '',
            faq:  '',
            is_active: ''
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props
    const [isSubmitDisabled, setSubmitDisabled] = useState(false)

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                }}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-4">
                                    <SettingFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        type={type}
                                    />
                                </div>
                            </div>

                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
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
                                        disabled={isSubmitDisabled}
                                        type="submit"
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

SettingForm.displayName = 'SettingForm'

export default SettingForm
