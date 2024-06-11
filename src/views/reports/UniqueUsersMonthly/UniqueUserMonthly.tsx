import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ReportTableTools from './components/ReportTableTools'
import ReportTable from './components/ReportTable'

injectReducer('uniqueUserMonthlyReportList', reducer)

const UniqueUserMonthly = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Unique User (Monthly)</h3>
                <ReportTableTools />
            </div>
            <ReportTable />
        </AdaptableCard>
    )
}

export default UniqueUserMonthly
