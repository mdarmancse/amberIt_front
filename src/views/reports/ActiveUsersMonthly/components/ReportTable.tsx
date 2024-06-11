import { useEffect, useCallback, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import {
    // eslint-disable-next-line import/named
    getActiveUserMonthlyReport,
    setTableData,
    updateLoading,
    useAppDispatch,
    useAppSelector,
} from '../store'

import cloneDeep from 'lodash/cloneDeep'

import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'

type Data = {
    id: number
    sl: number
    Year_Month: string
    User: string
}

const ReportTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.activeUserMonthlyReportList.data.tableData
    )

    const { start_date, end_date } = useAppSelector(
        (state) => state.activeUserMonthlyReportList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.activeUserMonthlyReportList.data.loading
    )

    const data = useAppSelector(
        (state) => state.activeUserMonthlyReportList.data.dataList
    )

    useEffect(() => {
        // Reset sorting or perform other actions after the data has been fetched and state updated
        if (data && tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [data, tableRef])

    const fetchData = useCallback(async () => {
        dispatch(updateLoading({ loading: true }))
        await dispatch(
            getActiveUserMonthlyReport({
                start_date,
                end_date,
                pageIndex,
                pageSize,
                sort,
                query,
            })
        )
    }, [dispatch, start_date, end_date, pageIndex, pageSize, sort, query])

    useEffect(() => {
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort, start_date, end_date])

    const tableData = useMemo(
        () => ({
            pageIndex,
            pageSize,
            sort,
            start_date,
            end_date,
            total,
        }),
        [pageIndex, pageSize, sort, start_date, end_date, total]
    )

    const columns: ColumnDef<Data>[] = useMemo(
        () => [
            {
                header: '#',
                accessorKey: 'sl',
                cell: (props) => <span>{props.row.original.sl}</span>,
            },
            {
                header: 'Month',
                accessorKey: 'Year_Month',
                cell: (props) => <span>{props.row.original.Year_Month}</span>,
            },
            {
                header: 'Users',
                accessorKey: 'User',
                cell: (props) => <span>{props.row.original.User}</span>,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    //@ts-ignore
    const tbleData: any = data?.data

    return (
        <DataTable
            ref={tableRef}
            columns={columns}
            data={tbleData}
            loading={loading}
            pagingData={{
                total: tableData.total as number,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            //   onSort={onSort}
        />
    )
}

export default ReportTable
