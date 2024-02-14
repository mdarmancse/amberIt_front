import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import UserTableTools from '../UserList/components/UserTableTools'
import UserTable from '../UserList/components/UserTable'
import UserDeleteConfirmation from '../UserList/components/UserDeleteConfirmation'

injectReducer('homeUserList', reducer)

const UserList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Users</h3>
                <UserTableTools />
            </div>
            <UserTable />
            <UserDeleteConfirmation />
        </AdaptableCard>
    )
}

export default UserList
