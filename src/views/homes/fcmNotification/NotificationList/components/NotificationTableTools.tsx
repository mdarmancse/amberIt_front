import Button from '@/components/ui/Button'
import {
    HiBell,
    HiDownload,
    HiOutlineTrash,
    HiPlusCircle,
} from 'react-icons/hi'
import NotificationTableSearch from './NotificationTableSearch'
import { setDeleteMode, useAppDispatch, useAppSelector } from '../store'
import { Link } from 'react-router-dom'

const BatchDeleteButton = () => {
    const dispatch = useAppDispatch()
    const onBatchDelete = () => {
        dispatch(setDeleteMode('batch'))
    }
    return (
        <Button
            variant="solid"
            color="red-600"
            size="sm"
            icon={<HiOutlineTrash />}
            onClick={onBatchDelete}
        >
            Batch Delete
        </Button>
    )
}

const NotificationTableTools = () => {
    const selectedRows = useAppSelector(
        (state) => state.homeNotificationList.data.selectedRows
    )
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {selectedRows.length > 0 && <BatchDeleteButton />}
            {/*<Link download to="/data/order-list.csv" target="_blank">*/}
            {/*    <Button block size="sm" icon={<HiDownload />}>*/}
            {/*        Export*/}
            {/*    </Button>*/}
            {/*</Link>*/}

            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/app/fcm/notification-new"
            >
                <Button block variant="solid" size="sm" icon={<HiBell />}>
                    Send Notification
                </Button>
            </Link>
            <NotificationTableSearch />
        </div>
    )
}

export default NotificationTableTools
