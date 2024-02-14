import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import { Field, FormikErrors, FormikTouched, FieldProps } from 'formik'
import { useEffect, useState } from 'react'
import { apiGetRoleDataAll } from '@/services/RoleService'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    phone: string
    email: string
    name: string
    role: string
    roles: []
    password: string
    password_confirmation: string
}

type FieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    values: {
        role: number
        roles: []
        [key: string]: unknown
    }
    type: string
}

// const roles = [
//     { label: 'Admin', value: '1' },
//     { label: 'Manager', value: '2' },
//     { label: 'Editor', value: '3' },
// ]

const UserFields = (props: FieldsProps) => {
    const { values = { role: '' }, touched, errors, type } = props
    const [roles, setRoleData] = useState<any>()

    const getRoles = async () => {
        try {
            const response = await apiGetRoleDataAll({})
            // @ts-ignore
            setRoleData(response.data?.data)
        } catch (error) {
            console.error('Error fetching home data:', error)
        }
    }
    useEffect(() => {
        if (type === 'edit') {
            //@ts-ignore
            setRoleData(values?.roles)
        } else {
            getRoles()
        }
    }, [])

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <p className="mb-6">Section to config the user attribute</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        asterisk
                        label="Name"
                        invalid={(errors.name && touched.name) as boolean}
                        errorMessage={errors.name}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="name"
                            placeholder="Name"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        asterisk
                        label="Email"
                        invalid={(errors.email && touched.email) as boolean}
                        errorMessage={errors.email}
                    >
                        <Field
                            type="email"
                            autoComplete="off"
                            name="email"
                            placeholder="Name"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Phone"
                        invalid={(errors.phone && touched.phone) as boolean}
                        errorMessage={errors.phone}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="phone"
                            placeholder="Phone"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Roles"
                        invalid={
                            (errors.role && touched.role) as unknown as boolean
                        }
                        errorMessage={errors.role as string}
                    >
                        <Field name="role">
                            {({ field, form }: FieldProps) => (
                                <Select
                                    field={field}
                                    form={form}
                                    options={roles}
                                    value={roles?.find(
                                        (a: { value: string | number }) =>
                                            a.value === values.role
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
                        label="Password"
                        invalid={
                            (errors.password && touched.password) as boolean
                        }
                        errorMessage={errors.password}
                    >
                        <Field
                            type="password"
                            autoComplete="off"
                            name="password"
                            placeholder="Password"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        label="Confirm Password"
                        invalid={
                            (errors.password && touched.password) as boolean
                        }
                        errorMessage={errors.password}
                    >
                        <Field
                            type="password"
                            autoComplete="off"
                            name="password_confirmation"
                            placeholder="Confirm Password"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default UserFields
