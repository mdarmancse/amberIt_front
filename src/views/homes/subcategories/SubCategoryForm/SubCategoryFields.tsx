import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import { Checkbox } from '@/components/ui'
import React, { useEffect, useState } from 'react'
import { apiGetContentsHomeData } from '@/services/ContentService'
import { apiGetCategoryDataAll } from '@/services/CategoryService'
import Select from '@/components/ui/Select'
import { OptionsOrGroups, GroupBase } from 'react-select'

type FormFieldsName = {
    sub_category_name: string
    category_id: string
    sort_order: number
    is_active: boolean
}

type FieldsProps = {
    values: {
        id: string
        category_id: string
        sub_category_name: string
        categories: []
        is_active: boolean
        sort_order: number
        [key: string]: unknown
    }
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
}

const SubCategoryFields = (props: FieldsProps) => {
    const { values, type, touched, errors } = props
    const [categories, setCategoryData] = useState<any>()


    const getcategoryData = async () => {
        try {
            const response = await apiGetCategoryDataAll({})
            // @ts-ignore
            setCategoryData(response.data?.data)
        } catch (error) {
            console.error('Error fetching home data:', error)
        }
    }
    //let categories: OptionsOrGroups<any, GroupBase<any>> | undefined;

    useEffect(() => {
        if (type === 'edit') {
            //@ts-ignore
            setCategoryData(values?.categories)
        } else {
            getcategoryData()
            // categories =
            //    categoriesData?.data || {}
        }
    }, [])

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <p className="mb-6">Section to config the sub categories</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Category"
                        invalid={
                            (errors.category_id &&
                                touched.category_id) as boolean
                        }
                        errorMessage={errors.category_id}
                    >
                        <Field name="category_id">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={categories}
                                    value={categories?.find(
                                        (a: { value: string | number }) =>
                                            a.value === values.category_id
                                    )}
                                    onChange={(option) => {
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                        form.setFieldValue(
                                            'category_name',
                                            option?.label
                                        )
                                    }}
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Sub Category Name"
                        invalid={
                            (errors.sub_category_name &&
                                touched.sub_category_name) as boolean
                        }
                        errorMessage={errors.sub_category_name}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="sub_category_name"
                            placeholder="Sub Category Name"
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
                    <FormItem label="Status">
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

export default SubCategoryFields
