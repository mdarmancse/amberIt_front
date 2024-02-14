import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import SubCategoryTable from './components/SubCategoryTable'
import SubCategoryTableTools from './components/SubCategoryTableTools'
// import RoleDeleteConfirmation from './components/RoleDeleteConfirmation'

injectReducer('homesSubCategoryList', reducer)

const SubCategoryList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Sub Categories</h3>
                <SubCategoryTableTools />
            </div>
            <SubCategoryTable />
            {/*<RoleDeleteConfirmation />*/}
        </AdaptableCard>
    )
}

export default SubCategoryList
