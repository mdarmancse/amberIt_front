import { useState, useRef, forwardRef } from 'react'
import { HiCheck, HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import {
    getContentViewsReport,
    setFilterData,
    initialTableData,
    useAppDispatch,
    useAppSelector,
} from './../../store'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik'
import type { MouseEvent } from 'react'
import dayjs from 'dayjs'
import { Badge, DatePicker } from '@/components/ui'

import {
    components,
    ControlProps,
    OptionProps,
    SingleValue,
} from 'react-select'
import Select from '@/components/ui/Select'
import { MAX_DATE_CALENDER } from '@/components/ui/utils/constants'

type FormModel = {
    start_date: string
    end_date: string
    type: number
}
const { Control } = components
type FilterFormProps = {
    onSubmitComplete?: () => void
}

type DrawerFooterProps = {
    onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}
type Option = {
    value: number
    label: string
    color: string
}
const options: Option[] = [
    { value: 1, label: 'Daily', color: 'bg-indigo-500' },
    { value: 2, label: 'Hourly', color: 'bg-emerald-500' },
]

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<Option>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 cursor-pointer ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <Badge innerClass={data.color} />
                <span>{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({ children, ...props }: ControlProps<Option>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Badge
                    className="ltr:ml-4 rtl:mr-4"
                    innerClass={selected.color}
                />
            )}
            {children}
        </Control>
    )
}

const FilterForm = forwardRef<FormikProps<FormModel>, FilterFormProps>(
    ({ onSubmitComplete }, ref) => {
        const dispatch = useAppDispatch()

        const filterData = useAppSelector(
            (state) => state.homeReportList.data.filterData
        )

        console.log('filterdata', filterData)

        const { type } = useAppSelector(
            (state) => state.homeReportList.data.filterData
        )
        console.log('type', type)

        const handleSubmit = (values: FormModel) => {
            onSubmitComplete?.()
            dispatch(setFilterData(values))
            //dispatch(getContentViewsReport(initialTableData))
        }
        const onStatusFilterChange = (selected: SingleValue<Option>) => {
            onSubmitComplete?.()
            dispatch(setFilterData({ type: selected?.value }))
        }

        return (
            <Formik
                enableReinitialize
                innerRef={ref}
                initialValues={filterData}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
            >
                {({ values, touched, errors }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                invalid={
                                    errors.start_date && touched.start_date
                                }
                                errorMessage={errors.start_date}
                            >
                                <h6 className="mb-4">Start Date</h6>
                                <Field name="start_date">
                                    {({ field, form }: FieldProps) => (
                                        <DatePicker
                                            field={field}
                                            form={form}
                                            maxDate={MAX_DATE_CALENDER}
                                            value={
                                                field.value
                                                    ? new Date(field.value)
                                                    : new Date()
                                            }
                                            placeholder="Start Date"
                                            onChange={(date) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    date instanceof Date
                                                        ? dayjs(date).format(
                                                              'YYYY-MM-DD'
                                                          )
                                                        : null
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem
                                invalid={errors.end_date && touched.end_date}
                                errorMessage={errors.end_date}
                            >
                                <h6 className="mb-4">End Date</h6>
                                <Field name="end_date">
                                    {({ field, form }: FieldProps) => (
                                        <DatePicker
                                            field={field}
                                            form={form}
                                            maxDate={MAX_DATE_CALENDER}
                                            value={
                                                field.value
                                                    ? new Date(field.value)
                                                    : new Date()
                                            }
                                            placeholder="End Date"
                                            onChange={(date) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    date instanceof Date
                                                        ? dayjs(date).format(
                                                              'YYYY-MM-DD'
                                                          )
                                                        : null
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem
                                invalid={errors.end_date && touched.end_date}
                                errorMessage={errors.end_date}
                            >
                                <h6 className="mb-4">Type</h6>
                                <Field name="type">
                                    {({ field, form }: FieldProps) => (
                                        <Select
                                            field={field}
                                            form={form}
                                            size="sm"
                                            className="mb-4 min-w-[130px]"
                                            options={options}
                                            value={options?.find(
                                                (a: {
                                                    value: string | number
                                                }) => a.value === values.type
                                            )}
                                            components={{
                                                Option: CustomSelectOption,
                                                Control: CustomControl,
                                            }}
                                            onChange={(option) => {
                                                // @ts-ignore
                                                form.setFieldValue(
                                                    field.name,
                                                    // @ts-ignore
                                                    option?.value
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        )
    }
)

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Query
            </Button>
        </div>
    )
}

const ReportFilter = () => {
    const formikRef = useRef<FormikProps<FormModel>>(null)

    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <>
            <Button
                variant="solid"
                size="sm"
                className="block md:inline-block ltr:md:ml-2 rtl:md:mr-2 md:mb-0 mb-4"
                icon={<HiOutlineFilter />}
                onClick={() => openDrawer()}
            >
                Filter
            </Button>
            <Drawer
                title="Filter"
                isOpen={isOpen}
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} />
            </Drawer>
        </>
    )
}

FilterForm.displayName = 'FilterForm'

export default ReportFilter
