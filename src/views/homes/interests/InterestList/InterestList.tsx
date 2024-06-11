import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import InterestTable from './components/InterestTable'
import InterestTableTools from './components/InterestTableTools'
// import RoleDeleteConfirmation from './components/RoleDeleteConfirmation'

injectReducer('homesInterestList', reducer)

const InterestList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Interests</h3>
                <InterestTableTools />
            </div>
            <InterestTable />
            {/*<RoleDeleteConfirmation />*/}
        </AdaptableCard>
    )
}

export default InterestList
