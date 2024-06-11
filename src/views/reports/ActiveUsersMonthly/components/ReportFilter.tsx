import { useState, useRef, forwardRef } from 'react'
import { HiOutlineFilter } from 'react-icons/hi'
import {
    FilterQueries,
    setFilterData,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik'
import type { MouseEvent } from 'react'
import dayjs from 'dayjs'
import { DatePicker } from '@/components/ui'
import { MAX_DATE_CALENDER } from '@/components/ui/utils/constants'

type FormModel = {
    start_date: string
    end_date: string
}

type FilterFormProps = {
    onSubmitComplete?: () => void
}

type DrawerFooterProps = {
    onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

const FilterForm = forwardRef<FormikProps<FormModel>, FilterFormProps>(
    ({ onSubmitComplete }, ref) => {
        const dispatch = useAppDispatch()

        const filterData = useAppSelector(
            (state) => state.activeUserMonthlyReportList.data.filterData
        )

        const handleSubmit = (values: FormModel) => {
            onSubmitComplete?.()
            // dispatch(setTableData({
            //     pageIndex:1,
            //     pageSize:10,
            // }))
            dispatch(setFilterData(values))
            //   dispatch(getUniqueUserMonthlyReport(values))
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
                <Form>
                    <FormContainer>
                        <FormItem>
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

                        <FormItem>
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
                    </FormContainer>
                </Form>
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
