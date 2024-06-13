import { cloneElement } from 'react'
import Logo from '@/components/template/Logo'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import type { ReactNode, ReactElement } from 'react'

interface CoverProps extends CommonProps {
    content?: ReactNode
}

const Cover = ({ children, content, ...rest }: CoverProps) => {
    return (
        <div className="grid lg:grid-cols-12 h-full rounded shadow-rose-400 ">

            <div
                className="col-span-6  bg-no-repeat  bg-cover xl:min-w-[450px] px-8 flex-col justify-between bg-white dark:bg-gray-800 hidden lg:flex shadow-2xl  "
                style={{
                    backgroundImage: `url('/img/others/auth-cover-bg.png')`,
                }}>

            </div>

            <div className="col-span-6 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
                <div className="xl:min-w-[450px] px-8">
                    <Logo mode="dark" />
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as ReactElement, { ...rest })
                        : null}

                </div>
                <span className="text-grey mt-10">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                      </span>
            </div>
        </div>
    )
}

export default Cover
