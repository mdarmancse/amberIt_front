import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import { Checkbox } from '@/components/ui'
import React, { useEffect, useState } from 'react'
import { apiGetParentMenuData } from '@/services/MenuService'
import { Loading, RichTextEditor } from '@/components/shared'
import Select from '@/components/ui/Select'

type FormFieldsName = {
    id: string | number
    device_type:  number
    terms_and_conditions:  string
    privacy_notice:  string
    faq:  string
    is_active: number
}

type FieldsProps = {
    values: {
        id: string | number
        device_type:  number
        terms_and_conditions:  string
        privacy_notice:  string
        faq:  string
        is_active: number
        [key: string]: unknown
    }
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
}

const deviceType = [
    { label: 'Web', value: 1 },
    { label: 'Android', value: 2 },
    { label: 'IOS', value: 3 },
    { label: 'TV', value: 4 },
]


const SettingFields = (props: FieldsProps) => {
    const { values, type, touched, errors } = props



    return (
        <AdaptableCard divider isLastChild className="mb-4">

                <p className="mb-6">Section to config the settings</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

                    <div className="col-span-1">
                        <FormItem
                            asterisk
                            label="Device Type"
                            invalid={
                                (errors.device_type && touched.device_type) as boolean
                            }
                            errorMessage={errors.device_type}
                        >
                            <Field name="device_type">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        isClearable
                                        field={field}
                                        form={form}
                                        options={deviceType}
                                        value={deviceType.filter(
                                            (type) =>
                                                type.value ===
                                                values.device_type
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
                    <div className="col-span-2">
                        <FormItem
                            label="Terms & Conditions"
                            labelClass="!justify-start"
                            invalid={(errors.terms_and_conditions && touched.terms_and_conditions) as boolean}
                            errorMessage={errors.terms_and_conditions}
                        >
                            <Field name="terms_and_conditions">
                                {({ field, form }: FieldProps) => (
                                    <RichTextEditor
                                        value={field.value}
                                        onChange={(val) =>
                                            form.setFieldValue(field.name, val)
                                        }
                                    />
                                )}
                            </Field>
                        </FormItem>
                    </div>



                    <div className="col-span-2">
                        <FormItem
                            label="Privacy Policy"
                            labelClass="!justify-start"
                            invalid={(errors.privacy_notice && touched.privacy_notice) as boolean}
                            errorMessage={errors.privacy_notice}
                        >
                            <Field name="privacy_notice">
                                {({ field, form }: FieldProps) => (
                                    <RichTextEditor
                                        value={field.value}
                                        onChange={(val) =>
                                            form.setFieldValue(field.name, val)
                                        }
                                    />
                                )}
                            </Field>
                        </FormItem>
                    </div>

                    <div className="col-span-2">
                        <FormItem
                            label="Faq"
                            labelClass="!justify-start"
                            invalid={(errors.faq && touched.faq) as boolean}
                            errorMessage={errors.faq}
                        >
                            <Field name="faq">
                                {({ field, form }: FieldProps) => (
                                    <RichTextEditor
                                        value={field.value}
                                        onChange={(val) =>
                                            form.setFieldValue(field.name, val)
                                        }
                                    />
                                )}
                            </Field>
                        </FormItem>
                    </div>


                </div>

        </AdaptableCard>
    )
}

export default SettingFields
