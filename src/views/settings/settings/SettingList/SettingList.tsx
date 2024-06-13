import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import SettingTable from './components/SettingTable'
import SettingTableTools from './components/SettingTableTools'
// import RoleDeleteConfirmation from './components/RoleDeleteConfirmation'

injectReducer('homesSettingList', reducer)

const SettingList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Settings</h3>
                <SettingTableTools />
            </div>
            <SettingTable />
            {/*<RoleDeleteConfirmation />*/}
        </AdaptableCard>
    )
}

export default SettingList
