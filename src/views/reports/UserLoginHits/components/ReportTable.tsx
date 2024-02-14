import { useEffect, useCallback, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import {
    getLoginLogReport,
    setFilterData,
    setTableData,
    updateLoading,
    useAppDispatch,
    useAppSelector,
} from '../../store'

import cloneDeep from 'lodash/cloneDeep'

import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import dayjs from 'dayjs'

type Data = {
    id: number
    sl: number
    USAGE_DATE: string
    USAGE_HOUR: string
    Total_Login: string
    Total_Unique_login: string
    Total_Hits: string
}

const ReportTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.homeReportList.data.tableData
    )

    const { start_date, end_date, type } = useAppSelector(
        (state) => state.homeReportList.data.filterData
    )

    const loading = useAppSelector((state) => state.homeReportList.data.loading)

    const data = useAppSelector((state) => state.homeReportList.data.dataList)

    const fetchData = useCallback(async () => {
        dispatch(updateLoading({ loading: true }))

        await dispatch(
            getLoginLogReport({
                start_date,
                end_date,
                type,
                pageIndex,
                pageSize,
                sort,
                query,
            })
        )
    }, [dispatch, pageIndex, pageSize, sort, start_date, end_date, type])
    useEffect(() => {
        fetchData()
    }, [
        dispatch,
        fetchData,
        pageIndex,
        pageSize,
        sort,
        start_date,
        end_date,
        type,
    ])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [data])

    const tableData = useMemo(
        () => ({
            pageIndex,
            pageSize,
            sort,
            start_date,
            end_date,
            type,
            total,
        }),
        [pageIndex, pageSize, sort, start_date, end_date, type, total]
    )

    const columns: ColumnDef<Data>[] = useMemo(() => {
        const dynamicColumns: ColumnDef<Data>[] = [
            {
                header: '#',
                accessorKey: 'sl',
                cell: (props) => <span>{props.row.original.sl}</span>,
            },
            {
                header: 'Date',
                accessorKey: 'USAGE_DATE',
                cell: (props) => (
                    <span>
                        {dayjs(props.row.original.USAGE_DATE).format(
                            'DD-MMM-YYYY'
                        )}
                    </span>
                ),
            },
            {
                header: 'Total Login',
                accessorKey: 'Total_Login',
                cell: (props) => <span>{props.row.original.Total_Login}</span>,
            },
            {
                header: 'Unique Login',
                accessorKey: 'Total_Unique_login',
                cell: (props) => (
                    <span>{props.row.original.Total_Unique_login}</span>
                ),
            },
            {
                header: 'Total Hits',
                accessorKey: 'Total_Hits',
                cell: (props) => <span>{props.row.original.Total_Hits}</span>,
            },
        ]

        // Conditionally add the 'Hour' column based on the value of type
        if (type === 2) {
            dynamicColumns.splice(2, 0, {
                header: 'Hour',
                accessorKey: 'USAGE_HOUR',
                cell: (props) => <span>{props.row.original.USAGE_HOUR}</span>,
            })
        }

        return dynamicColumns
    }, [type])

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
            // onSort={onSort}
        />
    )
}

export default ReportTable
