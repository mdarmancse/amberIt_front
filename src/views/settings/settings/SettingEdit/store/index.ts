import { combineReducers } from '@reduxjs/toolkit'
import reducers, { SLICE_NAME, EditState } from './settingEditSlice'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    data: reducers,
})

export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [SLICE_NAME]: {
            data: EditState
        }
    }
> = useSelector

export * from './settingEditSlice'
export { useAppDispatch } from '@/store'
export default reducer
