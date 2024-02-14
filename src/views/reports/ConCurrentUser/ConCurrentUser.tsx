import reducer from '../store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'

import ReportTable from './components/ReportTable'
import ReportTableTools from './components/ReportTableTools'

injectReducer('homeReportList', reducer)

const ConCurrentUser = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Con Current User Report</h3>
                <ReportTableTools />
            </div>
            <ReportTable />
        </AdaptableCard>
    )
}

export default ConCurrentUser
