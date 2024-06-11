import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'

import ReportTable from './components/ReportTable'
import ReportTableTools from '@/views/reports/AuditReport/components/ReportTableTools'

injectReducer('auditReportList', reducer)

const AuditReport = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Audit Report</h3>
                <ReportTableTools />
            </div>
            <ReportTable />
        </AdaptableCard>
    )
}

export default AuditReport
