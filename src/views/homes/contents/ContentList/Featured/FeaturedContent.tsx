import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import FeaturedContentTable from './components/FeaturedContentTable'
import FeaturedContentTableTools from './components/FeaturedContentTableTools'
import FeaturedContentDeleteConfirmation from './components/FeaturedContentDeleteConfirmation'

injectReducer('homeFeaContentList', reducer)

const FeaturedContent = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Featured Content</h3>
                {/*<FeaturedContentTableTools />*/}
            </div>
            <FeaturedContentTable />
            <FeaturedContentDeleteConfirmation />
        </AdaptableCard>
    )
}

export default FeaturedContent
