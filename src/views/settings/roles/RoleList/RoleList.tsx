import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import RoleTable from './components/RoleTable'
import RoleTableTools from './components/RoleTableTools'
// import RoleDeleteConfirmation from './components/RoleDeleteConfirmation'

injectReducer('settingRoleList', reducer)

const RoleList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Roles</h3>
                <RoleTableTools />
            </div>
            <RoleTable />
            {/*<RoleDeleteConfirmation />*/}
        </AdaptableCard>
    )
}

export default RoleList
