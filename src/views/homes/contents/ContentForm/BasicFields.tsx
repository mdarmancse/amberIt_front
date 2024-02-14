import AdaptableCard from '@/components/shared/AdaptableCard'
import { FormItem } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import CreatableSelect from 'react-select/creatable'
import {
    Field,
    FormikErrors,
    FormikTouched,
    FieldProps,
    FormikProps,
    FieldInputProps,
} from 'formik'
import React, {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    SyntheticEvent,
    useCallback,
    useState,
} from 'react'
import { Checkbox, Progress } from '@/components/ui'
import Upload from '@/components/ui/Upload'
import { SingleValue } from 'react-select'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import axios, { CancelToken } from 'axios'
import { boolean, string } from 'yup'
import { AiOutlineFrown, FaTimes } from 'react-icons/all'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import Avatar from '../../../../components/ui/Avatar'
import appConfig from '@/configs/app.config'
import { color } from 'framer-motion'

const url = appConfig.apiPrefix + '/upload-video-gcp'

type Options = {
    label: string
    value: string
}[]

type FormFieldsName = {
    content_name: string
    content_description: string
    content_file_name: string
    duration: string
    is_active: boolean
    is_premium: string
    content_tags: string
    content_type: string
}

type FieldsProps = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
    setSubmitDisabled: Dispatch<SetStateAction<boolean>>

    values: {
        is_premium: string
        is_active: boolean
        content_name: string
        content_type: string
        content_file_name: string
        duration: string
        roles: Options
        [key: string]: unknown
    }
}
const contentTypes = [
    { label: 'VOD', value: 'VOD' },
    { label: 'Live', value: 'LIVE' },
    // { label: 'FeaturedOld', value: 'featured' },
]

const BasicFields = (props: FieldsProps) => {
    const [fileStatus, setFileStatus] = useState<{ [key: string]: string }>({})
    const [uploadError, setUploadError] = useState<string | null>(null)
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false)
    const [uploading, setUploading] = useState<boolean>(false)

    const {
        values = { content_type: '', contentTag: [] },
        touched,
        errors,
    } = props
    const [selectedContentType, setSelectedContentType] = useState('VOD')
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)
    const { setSubmitDisabled } = props

    let cancelUpload: any
    let isUploadCancelled = false
    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor(seconds % 60);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
    const handleUpload = async (
        form: FormikProps<any>,
        field: FieldInputProps<any>,
        files: File[]
    ) => {
        const videoFile = files[0]
        let cancelUpload // Variable to hold the cancel token
        setUploading(false)
        setUploadProgress(0)
        setUploadSuccess(false)
        setFileStatus({})
        setUploadError('')
        setSubmitDisabled(false)
        try {
            setUploading(true)
            setSubmitDisabled(true)

            const apiUrl = appConfig.apiPrefix + '/getSignedUrl'

            if (videoFile) {
                // Create a cancel token for the upload requests
                const source = axios.CancelToken.source()
                cancelUpload = source.cancel

                const apiResponse = await axios.post(
                    apiUrl,
                    {
                        object: videoFile.name,
                    },
                    {
                        cancelToken: source.token,
                    }
                )

                const signedUrl = apiResponse.data.data.signedURL
                const fileName = apiResponse.data.data.fileName

                const response = await axios.put(signedUrl, videoFile, {
                    headers: {
                        'Content-Type': 'application/octet-stream',
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            // @ts-ignore
                            (progressEvent.loaded * 100) / progressEvent.total
                        )
                        // Update the progress here and use it to update your Progress component
                        setUploadProgress(percentCompleted)
                    },
                    cancelToken: source.token, // Attach the same cancel token to the PUT request
                })

                if (response.status === 200) {
                    const videoElement = document.createElement('video');
                    videoElement.src = URL.createObjectURL(videoFile);

                    videoElement.addEventListener('loadedmetadata', () => {
                        const duration = videoElement.duration;
                        const formattedDuration = formatDuration(duration);
                        form.setFieldValue('duration', formattedDuration)
                    });
                    setFileStatus({ [videoFile.name]: 'Uploaded' })
                    form.setFieldValue(field.name, fileName)

                    setUploadSuccess(true)
                } else {
                    setFileStatus({
                        [videoFile.name]:
                            'An error occurred while uploading the file. Server response',
                    })
                    setUploadError(
                        'An error occurred while uploading the file. Server response'
                    )
                }
            }
        } catch (error) {
            // Handle the error, including cancellation-specific logic
            if (axios.isCancel(error)) {
                console.log('Upload cancelled')
            } else {
                setFileStatus({
                    [videoFile.name]:
                        'An error occurred while uploading the file.',
                })
                // @ts-ignore
                setUploadError(error.message.toString())
            }
        } finally {
            setUploading(false)
            setSubmitDisabled(false)
        }
    }

    const handleRemoveVideo = () => {
        // Trigger cancellation by calling the cancel function from the cancel token
        if (cancelUpload) {
            cancelUpload('Upload cancelled by user')
        }

        // Additional logic to clean up or reset state as needed
        setUploading(false)
        setUploadProgress(0)
        setUploadSuccess(false)
        setFileStatus({})
        setUploadError('')
        setSubmitDisabled(false)
    }

    const handleContentTypeChange = (
        option: SingleValue<{ label: string; value: string }>
    ) => {
        // @ts-ignore
        setSelectedContentType(option?.value)
    }

    // const handleRemoveVideo = () => {
    //     isUploadCancelled = true;
    //
    //     setUploading(false);
    //     setUploadProgress(0);
    //     setUploadSuccess(false);
    //     setFileStatus({});
    //     setUploadError('');
    //     setSubmitDisabled(false);
    //
    //     // Additional logic if needed, such as clearing any uploaded file data in the form
    //   //   form.setFieldValue(field.name, ''); // Reset uploaded file in the form field
    // };

    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true

        const allowedFileType = ['video/mp4', 'video/mov']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'Please upload a .mp4 or .mov file!'
                }
            }
        }

        return valid
    }

    return (
        <AdaptableCard divider isLastChild className="mb-4">
            <h5>Basic Information</h5>
            <p className="mb-6">Section to config the contents attribute</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">

                    <FormItem
                        asterisk
                        label="Content Name"
                        invalid={
                            (errors.content_name &&
                                touched.content_name) as boolean
                        }
                        errorMessage={errors.content_name}
                    >
                        <Field
                            type="text"
                            autoComplete="off"
                            name="content_name"
                            placeholder="Content Name"
                            component={Input}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem
                        asterisk
                        label="Description"
                        invalid={
                            (errors.content_description &&
                                touched.content_description) as boolean
                        }
                        errorMessage={errors.content_description}
                    >
                        <Field
                            type="text"
                            textArea={true}
                            autoComplete="off"
                            name="content_description"
                            placeholder="Description"
                            component={Input}
                        />
                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem
                        asterisk
                        label="Content Type"
                        invalid={
                            (errors.content_type &&
                                touched.content_type) as boolean
                        }
                        errorMessage={errors.content_type}
                    >
                        <Field name="content_type">
                            {({ field, form }: FieldProps) => {
                                const selectedOption = contentTypes.find(
                                    (a) => a.value === values.content_type
                                );

                                return (
                                    <Select
                                        placeholder="Please Select"
                                        field={field}
                                        form={form}
                                        value={selectedOption || contentTypes[0]} // Set the value with a fallback
                                        options={contentTypes}
                                        onChange={(option) => {
                                            handleContentTypeChange(option);
                                            form.setFieldValue(field.name, option?.value);
                                        }}
                                       // onBlur={form.handleBlur(field.name)}
                                    />
                                );
                            }}
                        </Field>

                    </FormItem>
                </div>

                <div className="col-span-1">
                    <FormItem label="Status">
                        <Field
                            className="mb-0"
                            name="is_active"
                            render={({ field, form }: FieldProps) => (
                                <Checkbox
                                    {...field}
                                    checked={field.value === 1}
                                    onChange={() =>
                                        form.setFieldValue(
                                            field.name,
                                            field.value === 1 ? 0 : 1
                                        )
                                    }
                                >
                                    Is Active
                                </Checkbox>
                            )}
                        />
                    </FormItem>
                </div>
                <div className="col-span-1">
                    <FormItem label="Is Premium">
                        <Field
                            className="mb-0"
                            name="is_premium"
                            render={({ field, form }: FieldProps) => (
                                <Checkbox
                                    {...field}
                                    checked={field.value === 1}
                                    onChange={() =>
                                        form.setFieldValue(
                                            field.name,
                                            field.value === 1 ? 0 : 1
                                        )
                                    }
                                >
                                    Is Premium
                                </Checkbox>
                            )}
                        />
                    </FormItem>
                </div>

                <div
                    className={`col-span-2 ${
                        selectedContentType !== 'VOD'
                            ? 'hidden'
                            : 'videoSection'
                    }`}
                >
                    <FormItem label="Video">
                        <Field name="content_file_name">
                            {({ field, form }: FieldProps) => (
                                <Upload
                                    draggable
                                    uploadLimit={1}
                                    beforeUpload={beforeUpload}
                                    onChange={(files) =>
                                        handleUpload(form, field, files)
                                    }
                                >
                                    <div className="my-16 text-center">
                                        {uploading && (
                                            <div className="mt-4 ">
                                                <div className="text-center">
                                                    <p className="text-lg font-semibold mb-2 text-gray-600 ">
                                                        Uploading...
                                                    </p>

                                                    <Progress
                                                        variant="circle"
                                                        percent={uploadProgress}
                                                        gapDegree={0}
                                                        gapPosition="bottom"
                                                    />
                                                </div>

                                                {/*<button*/}
                                                {/*    className=" absolute mt-2 hover:text-red-700 transition duration-300"*/}
                                                {/*    onClick={handleRemoveVideo}*/}
                                                {/*>*/}
                                                {/*    <FaTimes />*/}
                                                {/*</button>*/}
                                            </div>
                                        )}
                                        {!uploadError &&
                                            !uploadSuccess &&
                                            !uploading && (
                                                <div className="mt-2">
                                                    <p className="font-semibold text-gray-800 dark:text-white">
                                                        Drop your video here, or{' '}
                                                        <span className="text-blue-500 cursor-pointer">
                                                            browse
                                                        </span>
                                                    </p>
                                                    <p className="mt-1 opacity-60 dark:text-white">
                                                        Support: mp4, mov
                                                    </p>
                                                </div>
                                            )}
                                        {uploadError && !uploadSuccess && (
                                            <div className="mt-4">
                                                {/* Display error information */}
                                                <p className="text-red-500 mt-2">
                                                    {uploadError}
                                                </p>
                                                <p className="text-red-500 mt-2 font-semibold">
                                                    Try again
                                                </p>
                                                <button
                                                    type="button"
                                                    className="text-red-500 mt-2 hover:text-red-700 transition duration-300"
                                                    //onClick={()=>handleRemoveVideo(form, field) }
                                                >
                                                    <Avatar
                                                        size={200}
                                                        icon={
                                                            <AiOutlineFrown />
                                                        }
                                                        className={
                                                            uploading
                                                                ? 'opacity-50 mx-auto'
                                                                : 'mx-auto'
                                                        }
                                                    />
                                                    {/*<AiOutlineCloseCircle size={20} />*/}
                                                </button>
                                            </div>
                                        )}
                                        {uploadSuccess && (
                                            <div className="mt-4">
                                                {/* Display success information */}
                                                <Avatar
                                                    size={200}
                                                    icon={
                                                        <HiOutlineCheckCircle />
                                                    }
                                                    className="mx-auto "
                                                />
                                                <p className="mt-2">
                                                    Successfully Uploaded
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </Upload>
                            )}
                        </Field>
                    </FormItem>
                    {/*<ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />*/}
                </div>
            </div>
        </AdaptableCard>
    )
}

export default BasicFields
