import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import LiveChannelTable from './components/LiveChannelTable'
import LiveChannelTableTools from './components/LiveChannelTableTools'
import LiveChannelDeleteConfirmation from './components/LiveChannelDeleteConfirmation'

injectReducer('homeLiveChannelList', reducer)

const LiveChannelList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Live Channel List</h3>
                <LiveChannelTableTools />
            </div>
            <LiveChannelTable />
            <LiveChannelDeleteConfirmation />
        </AdaptableCard>
    )
}

export default LiveChannelList
