import reducer from '../store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import NotificationTable from '@/views/homes/fcmNotification/NotificationList/components/NotificationTable'
import NotificationTableTools from '@/views/homes/fcmNotification/NotificationList/components/NotificationTableTools'
import NotificationDeleteConfirmation from '@/views/homes/fcmNotification/NotificationList/components/NotificationDeleteConfirmation'

injectReducer('homeNotificationList', reducer)

const NotificationList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Notification List</h3>
                <NotificationTableTools />
            </div>
            <NotificationTable />
            <NotificationDeleteConfirmation />
        </AdaptableCard>
    )
}

export default NotificationList
