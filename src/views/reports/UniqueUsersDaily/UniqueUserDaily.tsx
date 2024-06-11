import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ReportTableTools from './components/ReportTableTools'
import ReportTable from './components/ReportTable'

injectReducer('uniqueUserDailyReportList', reducer)

const UniqueUserDaily = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Unique User (Daily)</h3>
                <ReportTableTools />
            </div>
            <ReportTable />
        </AdaptableCard>
    )
}

export default UniqueUserDaily
