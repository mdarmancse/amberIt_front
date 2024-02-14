import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import { Checkbox } from '@/components/ui'
import React from 'react'

type FormFieldsName = {
    category_name: string
    sort_order: number
}

type FieldsProps = {
    values: {
        id: string
        category_name: string
        sort_order: number
        [key: string]: unknown
    }
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
}

const CategoryFields = (props: FieldsProps) => {
    const { values, type, touched, errors } = props

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <p className="mb-6">Section to config the categories</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Category Name"
                        invalid={
                            (errors.category_name &&
                                touched.category_name) as boolean
                        }
                        errorMessage={errors.category_name}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="category_name"
                            placeholder="Category Name"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Sort Order"
                        invalid={
                            (errors.sort_order && touched.sort_order) as boolean
                        }
                        errorMessage={errors.sort_order}
                    >
                        <Field
                            type="number"
                            autoComplete="off"
                            name="sort_order"
                            placeholder="Sort Order"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem label="">
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

export default CategoryFields
