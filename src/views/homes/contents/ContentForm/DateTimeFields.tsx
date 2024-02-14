import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker'
import dayjs from 'dayjs'
import { DatePicker } from '@/components/ui'
import {
    FROM_TODAY_DATE_CALENDER,
    MIN_DATE_CALENDER,
} from '@/components/ui/utils/constants'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    content_expire_time: string
    content_publish_time: string
}

type FieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        content_expire_time: string
        content_publish_time: string
        roles: Options
        [key: string]: unknown
    }
}

const DateTimeFields = (props: FieldsProps) => {
    const { touched, errors } = props

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Date Time</h5>
            <p className="mb-6">Section to adjust publish time</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/*<div className="col-span-1">*/}
                {/*    <FormItem*/}
                {/*        label="Expire Time"*/}
                {/*        invalid={*/}
                {/*            errors.content_expire_time &&*/}
                {/*            touched.content_expire_time*/}
                {/*        }*/}
                {/*        errorMessage={errors.content_expire_time}*/}
                {/*    >*/}
                {/*        <Field name="content_expire_time">*/}
                {/*            {({ field, form }: FieldProps) => (*/}
                {/*                <DateTimepicker*/}
                {/*                    field={field}*/}
                {/*                    form={form}*/}
                {/*                    value={*/}
                {/*                        field.value*/}
                {/*                            ? new Date(field.value)*/}
                {/*                            : null*/}
                {/*                    }*/}
                {/*                    placeholder="Pick date & time"*/}
                {/*                    onChange={(date) => {*/}
                {/*                        form.setFieldValue(*/}
                {/*                            field.name,*/}
                {/*                            date instanceof Date*/}
                {/*                                ? dayjs(date).format(*/}
                {/*                                      'YYYY-MM-DD HH:mm:ss'*/}
                {/*                                  )*/}
                {/*                                : null*/}
                {/*                        )*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            )}*/}
                {/*        </Field>*/}
                {/*    </FormItem>*/}
                {/*</div>*/}
                <div className="col-span-1">
                    <FormItem
                        label="Publish Time"
                        invalid={
                            errors.content_publish_time &&
                            touched.content_publish_time
                        }
                        errorMessage={errors.content_publish_time}
                    >
                        <Field name="content_publish_time">
                            {({ field, form }: FieldProps) => (
                                <DateTimepicker
                                    field={field}
                                    form={form}
                                    minDate={FROM_TODAY_DATE_CALENDER}
                                    value={
                                        field.value
                                            ? new Date(field.value)
                                            : null
                                    }
                                    placeholder="Pick date & time"
                                    onChange={(date) => {
                                        form.setFieldValue(
                                            field.name,
                                            date instanceof Date
                                                ? dayjs(date).format(
                                                      'YYYY-MM-DD HH:mm:ss'
                                                  )
                                                : null
                                        )
                                    }}
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default DateTimeFields
