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
    is_tv_series: boolean
    tv_series_id: string
    tv_series_name: string
    season_name: string
    episode_number: string
    episode_identity: string
    overview: string

}

type FieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
    contentHomeData: []
    values: {
        is_tv_series: boolean
        tv_series_id: string
        tv_series_name: string
        season_name: string
        episode_number: string
        episode_identity: string
        overview: string
        [key: string]: unknown
    }
}
const cdnTypes = [{ value: 'Google-Media-CDN', label: 'Google-Media-CDN' }]
const WebSeriesSection = (props: FieldsProps) => {
    const {
        values = {
            tv_series_id: '',
            is_tv_series: '',
        },
        touched,
        errors,
    } = props

    let booleanValue = false
    // @ts-ignore
    if (values?.is_tv_series == 1) {
        booleanValue = true
    }

    const [checked, setChecked] = useState(booleanValue)
    const contentHomeData = props.contentHomeData

    //@ts-ignore
    const { webSeries } = contentHomeData?.data || {}
    return (
        <>
            <div className="col-span-1">
                <FormItem
                    label="Is Web Series?"
                    invalid={
                        (errors.is_tv_series &&
                            touched.is_tv_series) as boolean
                    }
                    errorMessage={errors.is_tv_series}
                >
                    <Field name="is_tv_series">
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
                <h5>Web Series Section</h5>
                <p className="mb-6">
                    Section to config web series section
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                        <FormItem
                            label="Web Series Name"
                            invalid={
                                (errors.tv_series_id && touched.tv_series_id) as boolean
                            }
                            errorMessage={errors.tv_series_id}
                        >
                            <Field name="tv_series_id">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        field={field}
                                        form={form}
                                        options={webSeries}
                                        value={webSeries?.find(
                                            (a: { value: string | number }) =>
                                                a.value === values.tv_series_id
                                        )}
                                        onChange={(option) => {
                                            form.setFieldValue(
                                                field.name,
                                                option?.value
                                            )
                                            form.setFieldValue(
                                                'tv_series_name',
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
                            label="Season Name"
                            invalid={
                                (errors.season_name && touched.season_name) as boolean
                            }
                            errorMessage={errors.season_name}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="season_name"
                                placeholder="Season Name"
                                component={Input}
                            />
                        </FormItem>
                    </div>

                    <div className="col-span-1">
                        <FormItem
                            label="Episode Number"
                            invalid={
                                (errors.episode_number && touched.episode_number) as boolean
                            }
                            errorMessage={errors.episode_number}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="episode_number"
                                placeholder="Episode Number"
                                component={Input}
                            />
                        </FormItem>
                    </div>

                    <div className="col-span-1">
                        <FormItem
                            label="Episode Identity"
                            invalid={
                                (errors.episode_identity &&
                                    touched.episode_identity) as boolean
                            }
                            errorMessage={errors.episode_identity}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="episode_identity"
                                placeholder="Episode Identity"
                                component={Input}
                            />
                        </FormItem>
                    </div>

                    <div className="col-span-1">
                        <FormItem
                            label="Overview"
                            invalid={
                                (errors.overview &&
                                    touched.overview) as boolean
                            }
                            errorMessage={errors.overview}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="overview"
                                placeholder="Overview"
                                component={Input}
                            />
                        </FormItem>
                    </div>
                </div>
            </AdaptableCard>
        </>
    )
}

export default WebSeriesSection
