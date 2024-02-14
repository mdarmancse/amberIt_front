import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { FormContainer, FormItem } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import StickyFooter from '@/components/shared/StickyFooter'
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import Input from '@/components/ui/Input'
import { Card } from '@/components/ui'
import SharedSelector from '@/views/settings/roles/PermissionForm/SharedSelector'
import FormRow from '@/views/settings/roles/PermissionForm/FormRow'
import { apiGecSecMenuList } from '@/services/RoleService'
import { Loading } from '@/components/shared'


// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

type InitialData = {
    id?: string
    role_name?: string
    slug?: string
    permissions?: []
}

export type FormModel = {
    [key: string]: string[]
    role_name:string[]
}

export type SetSubmitting = (isSubmitting: boolean) => void

export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

type PermissionForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

const validationSchema = Yup.object().shape({
    role_name: Yup.string().required('Role Name Required'),
})


const PermissionForm = forwardRef<FormikRef, PermissionForm>((props, ref) => {
    const {
        type,
        initialData = {
            id: '',
            role_name: '',
        },
        onFormSubmit,
        onDiscard,
        onDelete,
    } = props



    const [menuRows, setSecMenuData] = useState<any>()
    const [loader,setLoader ] = useState(true)

    const getSecMenuData = useCallback(async () => {
        const response = await apiGecSecMenuList({})
        // @ts-ignore
        setSecMenuData(response.data?.data)
        setLoader(false)
    }, [setSecMenuData])

    useEffect( () => {

        if (type === 'edit'){
            setSecMenuData(initialData?.permissions)
            setLoader(false)

            //getSecMenuData()

        }else{
            getSecMenuData()
        }
    }, [])



    // @ts-ignore
    return (

        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                }}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                        <Loading loading={loader}>
                         <Form>
                             <FormContainer className="max-w-screen-md mx-auto p-6">
                                 <div className="col-span-2 mb-4">
                                     <FormItem
                                         asterisk
                                         label="Role Name"
                                         invalid={(errors.role_name && touched.role_name) as boolean}
                                     >
                                         <Field
                                             type="text"
                                             size="sm"
                                             autoComplete="off"
                                             name="role_name"
                                             placeholder="Role Name"
                                             component={Input}
                                         />
                                     </FormItem>
                                 </div>



                                 {menuRows?.map((menu: {
                                     menu_id: React.Key | null | undefined;
                                     menu_title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
                                     subMenu: any[]
                                 }) => (

                                     //@ts-ignore
                                     <Card key={menu.menu_id} className="mb-4">

                                         <div
                                             className="p-3 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
                                             <h6 className="text-sm">{menu.menu_title}</h6>
                                             <Field name={menu.menu_id}>
                                                 {({ field, form }: {
                                                     field: FieldInputProps<FormModel>;
                                                     form: FormikProps<FormModel>;
                                                 }) => (
                                                     <SharedSelector
                                                         field={field}
                                                         form={form}
                                                         values={values}
                                                         menu_id={menu.menu_id}
                                                         initialPermissions={initialData.permissions}
                                                         onSelect={(selectedPermissions: any) => {
                                                             form.setFieldValue(field.name, selectedPermissions);
                                                             menu.subMenu.forEach((item) => {
                                                                 form.setFieldValue(item.menu_id, selectedPermissions);
                                                             });
                                                         }}
                                                     />
                                                 )}
                                             </Field>
                                         </div>
                                         {menu.subMenu.map((item) => (
                                             <div key={item.menu_id}
                                                  className="p-3 border-t border-gray-200 dark:border-gray-600 flex items-center">
                                                 <div className="flex-grow">
                                                     <FormRow
                                                         name={item.menu_id}
                                                         label={item.menu_title}
                                                     />
                                                 </div>

                                                 <div className="ml-2">
                                                     <Field name={item.menu_id}>
                                                         {({ field, form }: {
                                                             field: FieldInputProps<FormModel>;
                                                             form: FormikProps<FormModel>;
                                                         }) => (
                                                             <SharedSelector
                                                                 field={field}
                                                                 form={form}
                                                                 values={values}
                                                                 menu_id={item.menu_id}
                                                                 initialPermissions={initialData.permissions}
                                                                 onSelect={(menuId: string, selectedPermissions: any) => {
                                                                     form.setFieldValue(menuId, selectedPermissions);
                                                                 }}
                                                             />
                                                         )}
                                                     </Field>
                                                 </div>
                                             </div>
                                         ))}
                                     </Card>
                                 ))}

                                 <StickyFooter className="-mx-6 px-6 flex items-center justify-between py-3"
                                               stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                     <div className="md:flex items-center">
                                         <Button
                                             size="sm"
                                             variant="solid"
                                             loading={isSubmitting}
                                             icon={<AiOutlineSave />}
                                             type="submit"
                                         >
                                             Save
                                         </Button>
                                     </div>
                                 </StickyFooter>
                             </FormContainer>

                         </Form>
                        </Loading>
                )}

            </Formik>

        </>
    )
})

PermissionForm.displayName = 'PermissionForm'

export default PermissionForm
