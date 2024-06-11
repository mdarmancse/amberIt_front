import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'

import ReportTable from './components/ReportTable'
import ReportTableTools from '@/views/reports/UserLoginHits/components/ReportTableTools'

injectReducer('userLoginReportList', reducer)

const UserLoginHits = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">User Login & Hits Report</h3>
                <ReportTableTools />
            </div>
            <ReportTable />
        </AdaptableCard>
    )
}

export default UserLoginHits
