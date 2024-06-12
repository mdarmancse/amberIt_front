import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { Checkbox } from '@/components/ui'
import { ChangeEvent, useState } from 'react'
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker'
import { FROM_TODAY_DATE_CALENDER } from '@/components/ui/utils/constants'
import dayjs from 'dayjs'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    home_page_link: string
    language: string
    size: string
    quality: string
    rating: string
    actors: string
    file_location: string
    last_air_date: string
    release_year: string
    release_date: string
    is_trailer_available: string
    trailer_uri: string
}

type FieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        home_page_link: string
        language: string
        size: string
        quality: string
        rating: string
        actors: string
        file_location: string
        last_air_date: string
        release_year: string
        release_date: string
        is_trailer_available: boolean
        trailer_uri: string
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
    let booleanValue = false
    // @ts-ignore
    if (values?.is_trailer_available == 1) {
        booleanValue = true
    }
    const [checked, setChecked] = useState(booleanValue)

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Content Details</h5>
            <p className="mb-6">Section to config the contents details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Home Page Link"
                        invalid={
                            (errors.home_page_link &&
                                touched.home_page_link) as boolean
                        }
                        errorMessage={errors.home_page_link}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="home_page_link"
                            placeholder="Home Page Link"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Language"
                        invalid={
                            (errors.language &&
                                touched.language) as boolean
                        }
                        errorMessage={errors.language}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="language"
                            placeholder="Language"
                            component={Input}
                        />
                    </FormItem>
                </div>
                {/*<div className="col-span-1">*/}
                {/*    <FormItem*/}
                {/*        label="Size"*/}
                {/*        invalid={*/}
                {/*            (errors.size &&*/}
                {/*                touched.size) as boolean*/}
                {/*        }*/}
                {/*        errorMessage={errors.size}*/}
                {/*    >*/}
                {/*        <Field*/}
                {/*            type="text"*/}
                {/*            autoComplete="off"*/}
                {/*            name="size"*/}
                {/*            placeholder="Size"*/}
                {/*            component={Input}*/}
                {/*        />*/}
                {/*    </FormItem>*/}
                {/*</div>*/}
                <div className="col-span-1">
                    <FormItem
                        label="Actors"
                        invalid={
                            (errors.actors &&
                                touched.actors) as boolean
                        }
                        errorMessage={errors.actors}
                    >
                        <Field
                            type="text"
                            textArea={true}
                            autoComplete="off"
                            name="actors"
                            placeholder="Actors"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="File Location"
                        invalid={
                            (errors.file_location &&
                                touched.file_location) as boolean
                        }
                        errorMessage={errors.file_location}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="file_location"
                            placeholder="File Location"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Quality"
                        invalid={
                            (errors.quality &&
                                touched.quality) as boolean
                        }
                        errorMessage={errors.quality}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="quality"
                            placeholder="Quality"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Release Year"
                        invalid={
                            (errors.release_year &&
                                touched.release_year) as boolean
                        }
                        errorMessage={errors.release_year}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="release_year"
                            placeholder="Release Year"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Release Date"
                        invalid={
                            (errors.release_date &&
                                touched.release_date) as boolean
                        }
                        errorMessage={errors.release_date}
                    >
                        <Field name="release_date">
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
                <div className="col-span-1">
                    <FormItem
                        label="Rating"
                        invalid={
                            (errors.rating &&
                                touched.rating) as boolean
                        }
                        errorMessage={errors.rating}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="rating"
                            placeholder="Rating"
                            component={Input}
                        />
                    </FormItem>
                </div>


                <div className="col-span-1">
                    <FormItem label="Is Trailer Available">
                        <Field
                            className="mb-0"
                            name="is_trailer_available"
                            render={({ field, form }: FieldProps) => (
                                <Checkbox
                                    {...field}
                                    // @ts-ignore
                                    checked={checked}
                                    onChange={(isChecked) => {
                                        form.setFieldValue(field.name, !isChecked)
                                        setChecked(!isChecked)
                                    }}
                                >
                                    Is Trailer Available
                                </Checkbox>
                            )}
                        />
                    </FormItem>
                </div>

                {checked && (
                    <div className="col-span-1">
                        <FormItem
                            label="Trailer URL"
                            invalid={
                                (errors.trailer_uri &&
                                    touched.trailer_uri) as boolean
                            }
                            errorMessage={errors.trailer_uri}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="trailer_uri"
                                placeholder="Trailer URL"
                                component={Input}
                            />
                        </FormItem>
                    </div>
                )}
            </div>
        </AdaptableCard>
    )
}

export default ContentDetailsFields
