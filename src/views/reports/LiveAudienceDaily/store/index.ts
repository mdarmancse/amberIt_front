import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, ListState } from './reportSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'
import { CombinedState } from 'redux'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: ListState
        }
    }
> = useSelector

export * from './reportSlice'
export { useAppDispatch } from '@/store'
export default reducer
