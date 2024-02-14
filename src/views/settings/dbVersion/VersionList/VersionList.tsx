import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import VersionTable from './components/VersionTable'

injectReducer('settingVersionList', reducer)

const VersionList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">DB Version</h3>
            </div>
            <VersionTable />
            {/*<RoleDeleteConfirmation />*/}
        </AdaptableCard>
    )
}

export default VersionList
