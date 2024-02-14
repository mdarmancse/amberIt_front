import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import React, { useEffect, useState } from 'react'
import { apiGetContentsHomeData } from '@/services/ContentService'
import { boolean } from 'yup'
import { Switcher } from '@/components/ui'

type FormFieldsName = {
    is_cdn_active: boolean
    cdnName: string
    mediaUrl: string
    signingType: string
    keyName: string
    privateKey: string
    expireTimeInHours: number
}

type FieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
    values: {
        is_cdn_active: boolean
        cdnName: string
        mediaUrl: string
        signingType: string
        keyName: string
        privateKey: string
        expireTimeInHours: number
        [key: string]: unknown
    }
}
const cdnTypes = [{ value: 'Google-Media-CDN', label: 'Google-Media-CDN' }]
const CdnSection = (props: FieldsProps) => {
    const {
        values = {
            cdnName: '',
            is_cdn_active: '',
        },
        touched,
        errors,
    } = props

    let booleanValue = false
    // @ts-ignore
    if (values?.is_cdn_active == 1) {
        booleanValue = true
    }

    const [checked, setChecked] = useState(booleanValue)

    return (
        <>
            <div className="col-span-1">
                <FormItem
                    label="Third Party CDN"
                    invalid={
                        (errors.is_cdn_active &&
                            touched.is_cdn_active) as boolean
                    }
                    errorMessage={errors.is_cdn_active}
                >
                    <Field name="is_cdn_active">
                        {({ field, form }: FieldProps) => (
                            <Switcher
                                // @ts-ignore
                                checked={checked}
                                onChange={(isChecked) => {
                                    form.setFieldValue(field.name, !isChecked)
                                    setChecked(!isChecked)
                                }}
                            />
                        )}
                    </Field>
                </FormItem>
            </div>

            <AdaptableCard
                divider
                isLastChild
                className={`mb-4 ${checked ? 'videoSection' : 'hidden'}`}
            >
                <h5>Third Party CDN Section</h5>
                <p className="mb-6">
                    Section to config third party cdn section
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <FormItem
                            label="CDN Type"
                            invalid={
                                (errors.cdnName && touched.cdnName) as boolean
                            }
                            errorMessage={errors.cdnName}
                        >
                            <Field name="cdnName">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        field={field}
                                        form={form}
                                        options={cdnTypes}
                                        value={cdnTypes?.find(
                                            (a: { value: string | number }) =>
                                                a.value === values.cdnName
                                        )}
                                        onChange={(option) => {
                                            form.setFieldValue(
                                                field.name,
                                                option?.value
                                            )
                                        }}
                                    />
                                )}
                            </Field>
                        </FormItem>
                    </div>

                    <div className="col-span-1">
                        <FormItem
                            label="Base URL"
                            invalid={
                                (errors.mediaUrl && touched.mediaUrl) as boolean
                            }
                            errorMessage={errors.mediaUrl}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="mediaUrl"
                                placeholder="Base URL"
                                component={Input}
                            />
                        </FormItem>
                    </div>

                    <div className="col-span-1">
                        <FormItem
                            label="Key Name"
                            invalid={
                                (errors.keyName && touched.keyName) as boolean
                            }
                            errorMessage={errors.keyName}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="keyName"
                                placeholder="Key Name"
                                component={Input}
                            />
                        </FormItem>
                    </div>

                    <div className="col-span-1">
                        <FormItem
                            label="Private Key"
                            invalid={
                                (errors.privateKey &&
                                    touched.privateKey) as boolean
                            }
                            errorMessage={errors.privateKey}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="privateKey"
                                placeholder="Private Key"
                                component={Input}
                            />
                        </FormItem>
                    </div>

                    <div className="col-span-1">
                        <FormItem
                            label="Key Expire (Hr)"
                            invalid={
                                (errors.expireTimeInHours &&
                                    touched.expireTimeInHours) as boolean
                            }
                            errorMessage={errors.expireTimeInHours}
                        >
                            <Field
                                type="number"
                                autoComplete="off"
                                name="expireTimeInHours"
                                placeholder="Key Expire (Hr)"
                                component={Input}
                            />
                        </FormItem>
                    </div>
                </div>
            </AdaptableCard>
        </>
    )
}

export default CdnSection
