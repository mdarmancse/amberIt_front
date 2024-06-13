import Button from '@/components/ui/Button'
import { HiDownload, HiOutlineTrash, HiPlusCircle } from 'react-icons/hi'
import SettingTableSearch from './SettingTableSearch'
import { setDeleteMode, useAppDispatch, useAppSelector } from '../store'
import { Link } from 'react-router-dom'

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

const SettingTableTools = () => {
    const selectedRows = useAppSelector(
        (state) => state.homesSettingList.data.selectedRows
    )
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {selectedRows.length > 0 && <BatchDeleteButton />}
            {/*<Link download to="/data/order-list.csv" target="_blank">*/}
            {/*    <Button block size="sm" icon={<HiDownload />}>*/}
            {/*        Export*/}
            {/*    </Button>*/}
            {/*</Link>*/}

            <Link
                className="block lg:inline-block md:mb-0 mb-4"
                to="/settings/settings/setting-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Setting
                </Button>
            </Link>
            {/*<SubCategoryTableSearch />*/}
        </div>
    )
}

export default SettingTableTools
