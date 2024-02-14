import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, FieldProps, FormikErrors, FormikTouched } from 'formik'
import { Checkbox } from '@/components/ui'
import React, { useEffect, useState } from 'react'
import { apiGetCategoryDataAll } from '@/services/CategoryService'
import { apiGetParentMenuData } from '@/services/MenuService'
import Select from '@/components/ui/Select'
import { Loading } from '@/components/shared'

type FormFieldsName = {
    menu_title: string
    menu_id: number | string
    parent_menu: number | string

}

type FieldsProps = {
    values: {
        menu_id: string
        menu_title: string
        parent_menu: number
        [key: string]: unknown
    }
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
}

const MenuFields = (props: FieldsProps) => {
    const { values, type, touched, errors } = props
    const [parentMenus, setParentMenuData] = useState<any>()
    const [loader,setLoader ] = useState(true)

    const getParentMenuData = async () => {
        try {
            const response = await apiGetParentMenuData({})
            // @ts-ignore
            setParentMenuData(response.data?.data)
            // @ts-ignore

            setLoader(false)
        } catch (error) {
            console.error('Error fetching home data:', error)
        }
    }


    useEffect(() => {
        getParentMenuData()
    }, [])

    return (


        <AdaptableCard divider isLastChild className="mb-4">
            <Loading loading={loader}>
            <p className="mb-6">Section to config the menus</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        asterisk
                        label="Menu Title"
                        invalid={
                            (errors.menu_title && touched.menu_title) as boolean
                        }
                        errorMessage={errors.menu_title}
                    >

                        <Field
                            type="text"
                            autoComplete="off"
                            name="menu_title"
                            placeholder="Menu Title"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem

                        label="Parent Menu"
                        invalid={
                            (errors.parent_menu &&
                                touched.parent_menu) as boolean
                        }
                        errorMessage={errors.parent_menu}
                    >
                        <Field name="parent_menu">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={parentMenus}
                                    value={parentMenus?.find(
                                        (a: { value: string | number }) =>
                                            a.value === values.parent_menu
                                    )}
                                    onChange={(option) => {
                                        form.setFieldValue(
                                            field.name,
                                            option?.value
                                        )
                                        form.setFieldValue(
                                            'module',
                                            option?.label
                                        )
                                    }}
                                />
                            )}
                        </Field>
                    </FormItem>
                </div>

                {/*<div className="col-span-1">*/}
                {/*    <FormItem label="">*/}
                {/*        <Field*/}
                {/*            className="mb-0"*/}
                {/*            name="is_active"*/}
                {/*            render={({ field, form }: FieldProps) => (*/}
                {/*                <Checkbox*/}
                {/*                    {...field}*/}
                {/*                    checked={field.value === 1}*/}
                {/*                    onChange={() =>*/}
                {/*                        form.setFieldValue(*/}
                {/*                            field.name,*/}
                {/*                            field.value === 1 ? 0 : 1*/}
                {/*                        )*/}
                {/*                    }*/}
                {/*                >*/}
                {/*                    Is Active*/}
                {/*                </Checkbox>*/}
                {/*            )}*/}
                {/*        />*/}
                {/*    </FormItem>*/}
                {/*</div>*/}
            </div>
            </Loading>
        </AdaptableCard>

    )
}

export default MenuFields
