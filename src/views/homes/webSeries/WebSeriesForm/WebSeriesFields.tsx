import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import { Checkbox } from '@/components/ui'
import React from 'react'

type FormFieldsName = {
    series_name: string
    total_sesson_no: string
    release_language: string
    sorting: string
    created_at: string
    updated_at: string
    is_active: boolean

}

type FieldsProps = {
    values: {
        id: string
        series_name: string
        total_sesson_no: string
        release_language: string
        sorting: string
        created_at: string
        updated_at: string
        is_active: boolean
        [key: string]: unknown
    }
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
}

const WebSeriesFields = (props: FieldsProps) => {
    const { values, type, touched, errors } = props

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <p className="mb-6">Section to config the web series</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Series Name"
                        invalid={
                            (errors.series_name &&
                                touched.series_name) as boolean
                        }
                        errorMessage={errors.series_name}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="series_name"
                            placeholder="Series Name"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Total Session"
                        invalid={
                            (errors.total_sesson_no &&
                                touched.total_sesson_no) as boolean
                        }
                        errorMessage={errors.total_sesson_no}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="total_sesson_no"
                            placeholder="Total Session"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Release Language"
                        invalid={
                            (errors.release_language &&
                                touched.release_language) as boolean
                        }
                        errorMessage={errors.release_language}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="release_language"
                            placeholder="Release Language"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Sort Order"
                        invalid={
                            (errors.sorting &&
                                touched.sorting) as boolean
                        }
                        errorMessage={errors.sorting}
                    >
                        <Field
                            type="number"
                            autoComplete="off"
                            name="sorting"
                            placeholder="Sort Order"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-2">
                    <FormItem label="Is Active?">
                        <Field
                            className="mb-0"
                            name="is_active"
                            render={({ field, form }: FieldProps) => (
                                <Checkbox
                                    {...field}
                                    checked={field.value === 1}
                                    onChange={() =>
                                        form.setFieldValue(
                                            field.name,
                                            field.value === 1 ? 0 : 1
                                        )
                                    }
                                >
                                    Is Active
                                </Checkbox>
                            )}
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default WebSeriesFields
