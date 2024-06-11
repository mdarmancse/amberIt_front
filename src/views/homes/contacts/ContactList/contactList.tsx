import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import ConatctTable from './components/conatctTable'
import ContactTableTools from './components/contactTableTools'
// import RoleDeleteConfirmation from './components/RoleDeleteConfirmation'

injectReducer('homesContactList', reducer)

const ContactList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Contact List</h3>
                <ContactTableTools />
            </div>
            <ConatctTable />
            {/*<RoleDeleteConfirmation />*/}
        </AdaptableCard>
    )
}

export default ContactList
