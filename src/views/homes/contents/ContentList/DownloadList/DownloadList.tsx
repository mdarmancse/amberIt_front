import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import DownloadTable from '@/views/homes/contents/ContentList/DownloadList/components/DownloadTable'

injectReducer('homeDownloadList', reducer)

const DownloadList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Download List</h3>
            </div>
            <DownloadTable />
        </AdaptableCard>
    )
}

export default DownloadList
