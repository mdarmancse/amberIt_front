import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { useEffect, useState } from 'react'
import { apiGetContentsHomeData } from '@/services/ContentService'
import { Tooltip } from '@/components/ui/Tooltip'
import Badge from '@/components/ui/Badge'
import { HiOutlineInformationCircle } from 'react-icons/hi'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    tags: Options
    category_name: string
    category_id: number
    id: number
    sub_category_id: number
    orientation: string
}

type FieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
    values: {
        id: number
        tags: Options
        category_id: number
        sub_category_id: number
        orientation: number
        [key: string]: unknown
    }
}

const CategoryFields = (props: FieldsProps) => {
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

    // Destructure the values from contentHomeData if it exists
    const { categories, subCategories, tags, orientations } =
        contentHomeData?.data || {}

    const {
        values = {
            category_id: '',
            sub_category_id: '',
            orientation: '',
            tags: [],
        },
        touched,
        errors,
    } = props


    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Categories,Tags & Orientation</h5>
            <p className="mb-6">
                Section to config the categories tags & orientation
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        asterisk
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
                        label="Sub Category"
                        invalid={
                            (errors.sub_category_id &&
                                touched.sub_category_id) as boolean
                        }
                        errorMessage={errors.sub_category_id}
                    >
                        <Field name="sub_category_id">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={subCategories}
                                    value={subCategories?.find(
                                        (a: { value: string | number }) =>
                                            a.value === values.category_id
                                    )}
                                    onChange={(option) => {
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                        form.setFieldValue(
                                            'sub_category_name',
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
                        label="Content Tags"
                        invalid={
                            (errors.tags && touched.tags) as unknown as boolean
                        }
                        errorMessage={errors.tags as string}
                    >
                        <Field name="tags">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    isMulti
                                    componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={tags}
                                    value={values.tags}
                                    onChange={(option) =>
                                        form.setFieldValue(field.name, option)
                                    }
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label=""
                        invalid={(errors.orientation && touched.orientation) as boolean}
                        errorMessage={errors.orientation}
                    >
                        <div className="flex items-center"> {/* Added a container to hold label and Tooltip */}
                            <label className="form-label mb-2 mr-2 ">Orientation</label>
                            <Tooltip
                                title={
                                    <div>
                                        Horizontal <strong className="text-yellow-400">16:9 </strong> <br/>
                                        Vertical <strong className="text-yellow-400">4:3</strong>
                                    </div>
                                }
                            >
                                <HiOutlineInformationCircle className="mb-2 mr-4"/>

                            </Tooltip>
                        </div>
                        <Field name="orientation">
                            {({ field, form }: FieldProps) => {
                                const selectedOrientation = orientations?.find(
                                    (a: { value: string | number }) => a.value === values.orientation
                                );

                                return (
                                    <Select
                                        field={field}
                                        form={form}
                                        options={orientations}
                                        value={selectedOrientation || orientations?.[2]}
                                        onChange={(option) => {
                                            form.setFieldValue(field.name, option?.value);
                                        }}
                                    />
                                );
                            }}
                        </Field>
                    </FormItem>
                </div>

            </div>
        </AdaptableCard>
    )
}

export default CategoryFields
