import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import WebSeriesTableTools from '@/views/homes/webSeries/WebSeriesList/components/WebSeriesTableTools'
import WebSeriesTable from '@/views/homes/webSeries/WebSeriesList/components/WebSeriesTable'

// import RoleDeleteConfirmation from './components/RoleDeleteConfirmation'

injectReducer('homesWebSeriesList', reducer)

const WebSeriesList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">WebSeries</h3>
                <WebSeriesTableTools />
            </div>
            <WebSeriesTable />
            {/*<RoleDeleteConfirmation />*/}
        </AdaptableCard>
    )
}

export default WebSeriesList
