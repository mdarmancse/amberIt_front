import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { apiGetContentsHomeData } from '@/services/ContentService'
import { Tooltip } from '@/components/ui/Tooltip'
import Badge from '@/components/ui/Badge'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { boolean } from 'yup'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    tags: Options
    keywords: string
    genre: Options
    category_name: string
    category_id: number
    id: number
    subcategory_id: number
    subcategory_name: string
    orientation: string
}

type FieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
    contentHomeData: []
    values: {
        tags: Options
        keywords: Options
        genre: Options
        category_name: string
        category_id: number
        id: number
        subcategory_id: number
        subcategory_name: string
        orientation: string
        [key: string]: unknown
    }
}

const CategoryFields = (props: FieldsProps) => {

    const contentHomeData = props.contentHomeData


    //@ts-ignore
    const { categories, subCategories, interests, orientations } = contentHomeData?.data || {}

    const {
        values = {
            category_id: '',
            subcategory_id: '',
            orientation: '',
            keywords: [],
            genre: [],
        },
        touched,
        errors,
    } = props


    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Categories,Genre & Keywords</h5>
            <p className="mb-6">
                Section to config the categories genre & keywords
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
                            (errors.subcategory_id &&
                                touched.subcategory_id) as boolean
                        }
                        errorMessage={errors.subcategory_id}
                    >
                        <Field name="subcategory_id">
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
                                            'subcategory_name',
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
                        label="Genre"
                        invalid={
                            (errors.genre && touched.genre) as unknown as boolean
                        }
                        errorMessage={errors.genre as string}
                    >
                        <Field name="genre">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    isMulti
                                    // componentAs={CreatableSelect}
                                    field={field}
                                    form={form}
                                    options={interests}
                                    value={values.genre}
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
                        label="Keywords"
                        invalid={
                            (errors.keywords &&
                                touched.keywords) as boolean
                        }
                        errorMessage={errors.keywords}
                    >
                        <Field
                            type="text"
                            textArea={true}
                            autoComplete="off"
                            name="keywords"
                            placeholder="Keywords"
                            component={Input}
                        />
                    </FormItem>
                </div>

                {/*<div className="col-span-1">*/}
                {/*    <FormItem*/}
                {/*        label=""*/}
                {/*        invalid={(errors.orientation && touched.orientation) as boolean}*/}
                {/*        errorMessage={errors.orientation}*/}
                {/*    >*/}
                {/*        <div className="flex items-center"> /!* Added a container to hold label and Tooltip *!/*/}
                {/*            <label className="form-label mb-2 mr-2 ">Orientation</label>*/}
                {/*            <Tooltip*/}
                {/*                title={*/}
                {/*                    <div>*/}
                {/*                        Horizontal <strong className="text-yellow-400">16:9 </strong> <br/>*/}
                {/*                        Vertical <strong className="text-yellow-400">4:3</strong>*/}
                {/*                    </div>*/}
                {/*                }*/}
                {/*            >*/}
                {/*                <HiOutlineInformationCircle className="mb-2 mr-4"/>*/}

                {/*            </Tooltip>*/}
                {/*        </div>*/}
                {/*        <Field name="orientation">*/}
                {/*            {({ field, form }: FieldProps) => {*/}
                {/*                const selectedOrientation = orientations?.find(*/}
                {/*                    (a: { value: string | number }) => a.value === values.orientation*/}
                {/*                );*/}

                {/*                return (*/}
                {/*                    <Select*/}
                {/*                        field={field}*/}
                {/*                        form={form}*/}
                {/*                        options={orientations}*/}
                {/*                        value={selectedOrientation || orientations?.[2]}*/}
                {/*                        onChange={(option) => {*/}
                {/*                            form.setFieldValue(field.name, option?.value);*/}
                {/*                        }}*/}
                {/*                    />*/}
                {/*                );*/}
                {/*            }}*/}
                {/*        </Field>*/}
                {/*    </FormItem>*/}
                {/*</div>*/}

            </div>
        </AdaptableCard>
    )
}

export default CategoryFields
