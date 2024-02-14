import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import MenuTable from './components/MenuTable'
import MenuTableTools from './components/MenuTableTools'
// import RoleDeleteConfirmation from './components/RoleDeleteConfirmation'

injectReducer('homesMenuList', reducer)

const MenuList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Menus</h3>
                <MenuTableTools />
            </div>
            <MenuTable />
            {/*<RoleDeleteConfirmation />*/}
        </AdaptableCard>
    )
}

export default MenuList
