import reducer from './store'
import { injectReducer } from '@/store'
import DashboardHeader from './components/DashboardHeader'
import Statistics from './components/Statistics'
import GraphReport from '@/views/homes/dashboard/Dashboard/components/GraphReport'
import TopTenContentTable from '@/views/homes/dashboard/Dashboard/components/TopTenContentTable'
import { ScrollBar } from '@/components/ui'

injectReducer('homeDashboard', reducer)

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-4 h-full">
            <DashboardHeader />
            <Statistics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="h-100 ">
                    <GraphReport />
                </div>
                <div className="h-100 ">
                    <TopTenContentTable />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
