import reducer from './store'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import MovieRequestTable from './components/movieRequestTable'
import MovieRequestTableTools from './components/movieRequestTableTools'
// import RoleDeleteConfirmation from './components/RoleDeleteConfirmation'

injectReducer('homesMovieRequestList', reducer)

const MovieRequestList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Movie Request</h3>
                <MovieRequestTableTools />
            </div>
            <MovieRequestTable />
            {/*<RoleDeleteConfirmation />*/}
        </AdaptableCard>
    )
}

export default MovieRequestList
