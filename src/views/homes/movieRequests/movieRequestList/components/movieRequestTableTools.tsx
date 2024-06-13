import Button from '@/components/ui/Button'
import {  HiOutlineTrash, HiPlusCircle } from 'react-icons/hi'
import { setDeleteMode, useAppDispatch, useAppSelector } from '../store'
import { Link } from 'react-router-dom'
import MovieRequestTableSearch from '@/views/homes/movieRequests/movieRequestList/components/movieRequestTableSearch'

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

const MovieRequestTableTools = () => {
    const selectedRows = useAppSelector(
        (state) => state.homesMovieRequestList.data.selectedRows
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
            <MovieRequestTableSearch />
        </div>
    )
}

export default MovieRequestTableTools
