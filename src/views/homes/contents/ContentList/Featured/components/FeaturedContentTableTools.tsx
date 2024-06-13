import Button from '@/components/ui/Button'
import { HiDownload, HiOutlineTrash, HiPlusCircle } from 'react-icons/hi'
import FeaturedContentTableSearch from './FeaturedContentTableSearch'
import { setDeleteMode, useAppDispatch, useAppSelector } from '../store'
import { Link } from 'react-router-dom'
import FeaturedTableSearch from '@/views/homes/contents/ContentList/Featured/components/FeaturedTableSearch'

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

const FeaturedContentTableTools = () => {
    const selectedRows = useAppSelector(
        (state) => state.homeFeaContentList.data.selectedRows
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
                to="/app/contents/content-new"
            >
                <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                    Add Content
                </Button>
            </Link>
            <FeaturedTableSearch />
        </div>
    )
}

export default FeaturedContentTableTools
