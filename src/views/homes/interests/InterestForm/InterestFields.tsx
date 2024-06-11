import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import { Checkbox } from '@/components/ui'
import React from 'react'

type FormFieldsName = {
    interest_name: string

}

type FieldsProps = {
    values: {
        id: string
        interest_name: string
        [key: string]: unknown
    }
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
}

const InterestFields = (props: FieldsProps) => {
    const { values, type, touched, errors } = props

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <p className="mb-6">Section to config the interest</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Interest Name"
                        invalid={
                            (errors.interest_name &&
                                touched.interest_name) as boolean
                        }
                        errorMessage={errors.interest_name}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="interest_name"
                            placeholder="Interest Name"
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

export default InterestFields
