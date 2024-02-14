import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import VodContentTable from './components/VodContentTable'
import VodContentTableTools from './components/VodContentTableTools'
import VodDeleteDeleteConfirmation from './components/VodDeleteDeleteConfirmation'

injectReducer('homeVodContentList', reducer)

const VodContent = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">VOD Content</h3>
                <VodContentTableTools />
            </div>
            <VodContentTable />
            <VodDeleteDeleteConfirmation />
        </AdaptableCard>
    )
}

export default VodContent
