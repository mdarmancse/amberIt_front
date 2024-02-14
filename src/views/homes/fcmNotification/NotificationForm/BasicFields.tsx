import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'

import {
    Field,
    FormikErrors,
    FormikTouched,
    FieldProps,
    FormikProps,
    FieldInputProps,
    useFormikContext,
} from 'formik'
import { boolean } from 'yup'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import React from 'react'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    title: string
    notificationtext: string
    content_id: string
}

type FieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        title: string
        content_id: string
        notificationtext: string
        [key: string]: unknown
    }
}
const contents = [
    { label: 'LIVE 1', value: '15' },
    { label: 'LIVE 2', value: '261' },
    { label: 'LIVE 3', value: '597' },
]

const vodContents = [
    { label: 'VOD 1', value: '15' },
    { label: 'VOD 2', value: '261' },
    { label: 'VOD 3', value: '597' },
    { label: 'VOD 3', value: '597' },
    { label: 'VOD 3', value: '597' },
    { label: 'VOD 3', value: '597' },
    { label: 'VOD 3', value: '597' },
    { label: 'VOD 3', value: '597' },
    { label: 'VOD 3', value: '597' },
    { label: 'VOD 3', value: '597' },

    //more than 5OOO
]

const BasicFields = (props: FieldsProps) => {
    const { values = { content_id: '' }, touched, errors } = props

    // const { vodValues, setFieldValue } = useFormikContext();
    //
    // // Use memoization to prevent unnecessary re-renders
    // const getOptions = React.useMemo(() => {
    //     return vodContents.map((item) => ({
    //         label: item.label,
    //         value: item.value,
    //     }));
    // }, [vodContents])
    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Information</h5>
            <p className="mb-6">Section to send the push notification</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                    <FormItem
                        label="Title"
                        invalid={(errors.title && touched.title) as boolean}
                        errorMessage={errors.title}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="title"
                            placeholder="Title"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-2">
                    <FormItem
                        label="Description"
                        invalid={
                            (errors.notificationtext &&
                                touched.notificationtext) as boolean
                        }
                        errorMessage={errors.notificationtext}
                    >
                        <Field
                            type="text"
                            textArea={true}
                            autoComplete="off"
                            name="notificationtext"
                            placeholder="Description"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Channel"
                        invalid={
                            (errors.content_id && touched.content_id) as boolean
                        }
                        errorMessage={errors.content_id}
                    >
                        <Field name="content_id">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={contents}
                                    value={contents.filter(
                                        (content_id) =>
                                            content_id.value ===
                                            values.content_id
                                    )}
                                    onChange={(option) =>
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
                {/*<div className="col-span-1">*/}
                {/*    <FormItem*/}
                {/*        label="VOD"*/}
                {/*        invalid={*/}
                {/*            (errors.content_id && touched.content_id) as boolean*/}
                {/*        }*/}
                {/*        errorMessage={errors.content_id}*/}
                {/*    >*/}
                {/*        <Field name="content_id">*/}
                {/*            {({ field, form }: FieldProps) => (*/}
                {/*                <Select*/}
                {/*                    field={field}*/}
                {/*                    form={form}*/}
                {/*                    options={vodContents}*/}
                {/*                    value={vodContents.filter(*/}
                {/*                        (content_id) =>*/}
                {/*                            content_id.value ===*/}
                {/*                            values.content_id*/}
                {/*                    )}*/}
                {/*                    onChange={(option) =>*/}
                {/*                        form.setFieldValue(*/}
                {/*                            field.name,*/}
                {/*                            option?.value*/}
                {/*                        )*/}
                {/*                    }*/}
                {/*                />*/}
                {/*            )}*/}
                {/*        </Field>*/}
                {/*    </FormItem>*/}
                {/*</div>*/}
            </div>
        </AdaptableCard>
    )
}

export default BasicFields
