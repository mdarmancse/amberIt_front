import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, FormikErrors, FormikTouched } from 'formik'

type FormFieldsName = {
    name: string
    slug: string
}

type FieldsProps = {
    values: {
        id: string
        name: string
        slug: string
        [key: string]: unknown
    }
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    type: string
}

const RoleFields = (props: FieldsProps) => {
    const { values, type, touched, errors } = props

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <p className="mb-6">Section to config the role and permission</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <FormItem
                        label="Role Name"
                        invalid={(errors.name && touched.name) as boolean}
                        errorMessage={errors.name}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="name"
                            placeholder="Role Name"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        label="Slug"
                        invalid={(errors.slug && touched.slug) as boolean}
                        errorMessage={errors.slug}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="slug"
                            placeholder="Slug"
                            component={Input}
                        />
                    </FormItem>
                </div>
            </div>
        </AdaptableCard>
    )
}

export default RoleFields
