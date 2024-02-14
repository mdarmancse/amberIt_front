import { ReactNode, CSSProperties } from 'react'

export interface CommonProps {
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type TableQueries = {
    total?: number
    pageIndex?: number
    pageSize?: number
    query?: string
    start_date?: string
    end_date?: string
    date?: string
    type?: number | string
    event?: string
    log_name?: string
    subject_type?:string
    causer_id?:string |number
    sort?: {
        order: 'asc' | 'desc' | ''
        key: string | number
    }
}
// export type TableQueries = {
//
// }
