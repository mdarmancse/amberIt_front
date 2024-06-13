import Button from '@/components/ui/Button'
import {  HiOutlineTrash, HiPlusCircle } from 'react-icons/hi'
import { setDeleteMode, useAppDispatch, useAppSelector } from '../store'
import { Link } from 'react-router-dom'
import ContactTableSearch from '@/views/homes/contacts/ContactList/components/contactTableSearch'

const BatchDeleteButton = () => {
    const dispatch = useAppDispatch()

    const onBatchDelete = () => {
        dispatch(setDeleteMode('batch'))
    }

    return (
        <Button
            variant="solid"
            color="red-600"
            size="sm"
            icon={<HiOutlineTrash />}
            onClick={onBatchDelete}
        >
            Batch Delete
        </Button>
    )
}

const ContactTableTools = () => {
    const selectedRows = useAppSelector(
        (state) => state.homesContactList.data.selectedRows
    )
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {selectedRows.length > 0 && <BatchDeleteButton />}
            {/*<Link download to="/data/order-list.csv" target="_blank">*/}
            {/*    <Button block size="sm" icon={<HiDownload />}>*/}
            {/*        Export*/}
            {/*    </Button>*/}
            {/*</Link>*/}

            {/*<Link*/}
            {/*    className="block lg:inline-block md:mb-0 mb-4"*/}
            {/*    to="/app/interests/interest-new"*/}
            {/*>*/}
            {/*    <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>*/}
            {/*        Add Interest*/}
            {/*    </Button>*/}
            {/*</Link>*/}
            <ContactTableSearch />
        </div>
    )
}

export default ContactTableTools
