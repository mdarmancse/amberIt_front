import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, DashboardState } from './dashboardSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

class TSelected {}

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            totaVODViews: (
                state: RootState & { [SLICE_NAME]: { data: DashboardState } }
            ) => TSelected
            data: DashboardState
        }
    }
> = useSelector

export * from './dashboardSlice'
export { useAppDispatch } from '@/store'
export default reducer
