import reducer from '../store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ReportTable from '@/views/reports/IosOtp/components/ReportTable'

injectReducer('homeReportList', reducer)

const IosOtp = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4"></div>
            <ReportTable />
        </AdaptableCard>
    )
}

export default IosOtp
