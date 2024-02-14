import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { Checkbox } from '@/components/ui'
import { ChangeEvent } from 'react'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    content_aes_128_hls_url: string
    is_drm_active: string
    content_drm_dash_url: string
    content_drm_hls_url: string
}

type FieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        content_type: string
        roles: Options
        [key: string]: unknown
    }
}

// const [checkboxList, setCheckboxList] = useState<(string | number)[]>(['Selection A'])
//
// const onCheckboxChange = (options: (string | number)[], e: SyntheticEvent) => {
//     console.log('Checkbox change', options, e)
//     setCheckboxList(options)
// }
const ContentDetailsFields = (props: FieldsProps) => {
    const {
        values = { content_type: '', contentTag: [] },
        touched,
        errors,
    } = props
    const onCheck = (value: boolean, e: ChangeEvent<HTMLInputElement>) => {
        console.log(value, e)
    }
    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Content Details</h5>
            <p className="mb-6">Section to config the contents details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Content AES 128 HLS URL (Optional)"
                        invalid={
                            (errors.content_aes_128_hls_url &&
                                touched.content_aes_128_hls_url) as boolean
                        }
                        errorMessage={errors.content_aes_128_hls_url}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="content_aes_128_hls_url"
                            placeholder="Content AES 128 HLS URL"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Content DRM Dash URL (Optional)"
                        invalid={
                            (errors.content_drm_dash_url &&
                                touched.content_drm_dash_url) as boolean
                        }
                        errorMessage={errors.content_drm_dash_url}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="content_drm_dash_url"
                            placeholder="Content DRM Dash URL"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Content DRM HLS URL (Optional)"
                        invalid={
                            (errors.content_drm_hls_url &&
                                touched.content_drm_hls_url) as boolean
                        }
                        errorMessage={errors.content_drm_hls_url}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="content_drm_hls_url"
                            placeholder="Content DRM HLS URL"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem label="DRM Activity (Optional)">
                        <Field
                            className="mb-0"
                            name="is_drm_active"
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
                                    Is DRM Active
                                </Checkbox>
                            )}
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default ContentDetailsFields
