import React from 'react'

interface FormDesriptionProps extends React.ComponentPropsWithoutRef<'div'> {
    title: string
    selector: React.FC<any>
}

const FormDesription = ({
    title,
    selector: Selector,
    ...rest
}: FormDesriptionProps) => {
    return (
        <div
            className="grid md:grid-cols-3 gap-4 py-8 border-b border-gray-200 dark:border-gray-600 items-center"
            {...rest}
        >
            <div className="font-semibold">
                <h5 className="mr-4">{title}</h5>
            </div>
            <div className="col-span-2">
                <Selector
                    field={{ name: 'selectedValues' }}
                    form={{
                        setFieldValue: (name: any, value: any) =>
                            console.log(name, value),
                    }}
                    values={{}}
                    name="selectedValues"
                />
            </div>
        </div>
    )
}

export default FormDesription
