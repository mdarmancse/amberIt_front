import { useState, useRef, forwardRef, useEffect } from 'react'
import { HiCheck, HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import {
    setFilterData,
    initialTableData,
    useAppDispatch,
    useAppSelector, updateLoading, getAuditReport
} from '../../store'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { Field, Form, Formik, FormikProps, FieldProps, FormikValues } from 'formik'
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
import { apiGetUserDataAll } from '@/services/UserService'
import Input from '@/components/ui/Input'

type FormModel = {
    start_date: string
    end_date: string
    type: number
    event: string
    log_name: string
    subject_type:string
    causer_id:string
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
    value: number |string
    label: string
    color: string
}
const options: Option[] = [
    { value: 'create', label: 'Create', color: 'bg-indigo-500' },
    { value: 'read', label: 'Read', color: 'bg-emerald-500' },
    { value: 'update', label: 'Update', color: 'bg-yellow-500' },
    { value: 'delete', label: 'Delete', color: 'bg-red-500' },
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

        const handleSubmit = (values: FormikValues) => {
           // alert("hhelo")
            onSubmitComplete?.()
          //  console.log({values})
            dispatch(setFilterData(values))
            //  dispatch(updateLoading(true))
            // dispatch(getAuditReport(filterData))
            //  dispatch(updateLoading(false))
            //dispatch(getContentViewsReport(initialTableData))
        }

        const [users, setUserData] = useState<any>()

        const getUsers = async () => {
            try {
                const response = await apiGetUserDataAll({})
                // @ts-ignore
                setUserData(response.data?.data)
            } catch (error) {
                console.error('Error fetching home data:', error)
            }
        }
        useEffect(() => {
            getUsers()
        }, [])

        // @ts-ignore
        return (
            <Formik
                enableReinitialize
                innerRef={ref}
                // @ts-ignore
                initialValues={filterData}
                onSubmit={(values:FormModel) => {
                    handleSubmit(values)
                }}
            >
                {({ values, touched, errors }) => (

                    <Form>
                        <FormContainer>
                            <FormItem
                                label="Start Date"
                                invalid={
                                    errors.start_date && touched.start_date
                                }
                                errorMessage={errors.start_date}
                            >
                                <Field name="start_date">
                                    {({ field, form }: FieldProps) => (
                                        <DatePicker
                                            field={field}
                                            form={form}
                                            maxDate={MAX_DATE_CALENDER}
                                            value={
                                                field.value
                                                    ? new Date(field.value)
                                                    : null
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
                                label="End Date"
                                invalid={errors.end_date && touched.end_date}
                                errorMessage={errors.end_date}
                            >

                                <Field name="end_date">
                                    {({ field, form }: FieldProps) => (
                                        <DatePicker
                                            field={field}
                                            form={form}
                                            maxDate={MAX_DATE_CALENDER}
                                            value={
                                                field.value
                                                    ? new Date(field.value)
                                                    : null
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
                                label="Event"
                                invalid={errors.event && touched.event}
                                errorMessage={errors.event}
                            >
                                <Field name="event">
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
                                                // console.log('Values',values)
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
                            <FormItem
                                label="By Title"
                                invalid={
                                    errors.log_name && touched.log_name
                                }
                                errorMessage={errors.log_name}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="log_name"
                                    placeholder="Title Name"
                                    component={Input}
                                />
                            </FormItem>
                                <FormItem
                                    label="By User"
                                    invalid={
                                        (errors.causer_id && touched.causer_id) as unknown as boolean
                                    }
                                    errorMessage={errors.causer_id as string}
                                >
                                    <Field name="causer_id">
                                        {({ field, form }: FieldProps) => (
                                            <Select
                                                field={field}
                                                form={form}
                                                options={users}
                                                value={users?.find(
                                                    (a: { value: string | number }) =>
                                                        a.value === values.causer_id
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



                            <FormItem
                                label="By Table"
                                invalid={
                                    errors.subject_type && touched.subject_type
                                }
                                errorMessage={errors.subject_type}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="subject_type"
                                    placeholder="Table Name"
                                    component={Input}
                                />
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
