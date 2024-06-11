import React, { Dispatch, SetStateAction, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Upload from '@/components/ui/Upload'

import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui'
import { Field, FieldInputProps, FieldProps, FormikProps } from 'formik'

import axios from 'axios'

import appConfig from '@/configs/app.config'
import { AiOutlineFrown } from 'react-icons/ai'
import { HiPhoto } from 'react-icons/hi2'

const url = appConfig.apiPrefix + '/upload-image-gcp'

type Image = {
    stb_thumbnail: string
}

type FormModel = {
    imgList: Image[]
    stb_thumbnail: string
    [key: string]: unknown
}
type ImagesProps = {
    values: FormModel
    setSubmitDisabled: Dispatch<SetStateAction<boolean>>
}
const SubCategoryImage = (props: ImagesProps) => {
    const { values } = props

    const [fileStatus, setFileStatus] = useState<{ [key: string]: string }>({})

    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)

    const [fileErrors, setFileErrors] = useState<{
        [key: string]: string | null
    }>({})
    const [fileUploadInProgress, setFileUploadInProgress] = useState<{
        [key: string]: boolean
    }>({})
    const [avatarImg, setAvatarImg] = useState<{ [key: string]: string }>({})

    const onFileUpload = async (
        form: FormikProps<FormModel>,
        field: FieldInputProps<FormModel>,
        files: File[],
        destination: string
    ) => {
        const file = files[0]
        if (file) {
            try {
                setFileUploadInProgress({ [field.name]: true })

                const formData = new FormData()
                formData.append('image', file)
                formData.append('destination', destination)

                const response = await axios.post(url, formData)

                setFileStatus({ ...fileStatus, [file.name]: 'Uploaded' })

                form.setFieldValue(field.name, response.data.url)
                setAvatarImg({
                    ...avatarImg,
                    [field.name]: URL.createObjectURL(file),
                })
                setUploadSuccess(true)
            } catch (error: any) {
                // Upload error
                setFileStatus({
                    ...fileStatus,
                    [file.name]: 'Uploaded with errors',
                })
                setFileErrors({
                    ...fileErrors,
                    [field.name]: error.message.toString(),
                })
            } finally {
                setFileUploadInProgress({ [field.name]: false })
            }
        }
    }
    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }
            }
        }

        return valid
    }

    const fieldObjects = [{ label: 'Thumbnail', field: 'stb_thumbnail' }]

    return (
        <AdaptableCard className="mb-4">
            <h5>Subcategory Thumbnail</h5>
            <p className=" mb-6 text-red-600 dark:text-white">
                Support: JPEG, JPG, PNG | Max size: 2MB
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {fieldObjects.map((fieldObj, index) => (
                    <div key={index} className="mb-4">
                        <FormItem>
                            <Field name={fieldObj.field}>
                                {({ field, form }: FieldProps) => {
                                    const avatarProps = field.value
                                        ? {
                                              src:
                                                  appConfig.filePrefixGcp +
                                                  field.value,
                                          }
                                        : {}

                                    return (
                                        <Upload
                                            className="cursor-pointer"
                                            showList={false}
                                            uploadLimit={1}
                                            beforeUpload={beforeUpload}
                                            onChange={(files) =>
                                                onFileUpload(
                                                    form,
                                                    field,
                                                    files,
                                                    field.name
                                                )
                                            }
                                        >
                                            {fileUploadInProgress[
                                                field.name
                                            ] && (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="animate-spin rounded-full border-t-4 border-rose-500 border-solid h-8 w-8"></div>
                                                </div>
                                            )}
                                            <Avatar
                                                size={200}
                                                src={avatarImg[field.name]}
                                                icon={
                                                    fileErrors[field.name] ? (
                                                        <AiOutlineFrown />
                                                    ) : (
                                                        <HiPhoto />
                                                    )
                                                }
                                                className={
                                                    fileUploadInProgress[
                                                        field.name
                                                    ]
                                                        ? 'opacity-50'
                                                        : ''
                                                }
                                                {...avatarProps}
                                            />
                                            {fileErrors[field.name] && (
                                                <p className="text-red-500">
                                                    {fileErrors[field.name]}
                                                </p>
                                            )}
                                        </Upload>
                                    )
                                }}
                            </Field>
                        </FormItem>
                    </div>
                ))}
            </div>
        </AdaptableCard>
    )
}

export default SubCategoryImage
