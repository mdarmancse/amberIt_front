import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuth'
import { useAppSelector } from '@/store'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi'
import { FiActivity } from 'react-icons/fi'
import type { CommonProps } from '@/@types/common'
import { log } from 'util'
import Loading from '@/components/shared/Loading'
import avatar from '../../../public/img/others/welcome.png'

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const _UserDropdown = ({ className }: CommonProps) => {
    const { name, phone, authority, email, id } = useAppSelector(
        (state) => state.auth.user
    )
    // const avatar='';
    const dropdownItemList: DropdownList[] = [
        {
            label: 'Update Profile',
            path: `/settings/users/user-edit/${id}`,
            icon: <HiOutlineUser />,
        },
        // {
        //     label: 'Account Setting',
        //     path: '/app/account/settings/profile',
        //     icon: <HiOutlineCog />,
        // },
        // {
        //     label: 'Activity Log',
        //     path: '/app/account/activity-log',
        //     icon: <FiActivity />,
        // },
    ]
    const { signOut } = useAuth()

    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            <Avatar
                size={32}
                shape="circle"
                src={avatar}
                icon={<HiOutlineUser />}
            />
            <div className="hidden md:block">
                {/*<div className="text-xs capitalize">*/}
                {/*    {authority?.[0] || 'User'}*/}
                {/*</div>*/}
                <div className="font-bold">{name}</div>
            </div>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" src={avatar} />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {name}
                            </div>
                            <div className="text-xs">{email}</div>
                            <div className="text-xs">{phone}</div>
                        </div>
                    </div>
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="mb-1 px-0"
                    >
                        <Link
                            className="flex h-full w-full px-2"
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                    onClick={signOut}
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>Sign Out</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

// @ts-ignore
const UserDropdown = withHeaderItem(_UserDropdown)

// @ts-ignore
export default UserDropdown
