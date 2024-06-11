import { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import {
    // eslint-disable-next-line import/named
    getContentViewsReport,
    setTableData,
    updateLoading,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
} from '@/components/shared/DataTable'
import Avatar from '../../../../components/ui/Avatar'
import appConfig from '@/configs/app.config'
import { FiPackage } from 'react-icons/fi'

type Data = {
    id: number
    sl: number
    CONTENT_ID: number
    thumb: string
    content_type: string
    title: string
    USERS: string
    TIME_SPENT_HOURLY: string
    VIEWS: string
}

const ImageColumn = ({ row }: { row: Data }) => {
    const avatar = row.thumb ? (
        <Avatar size={70} src={appConfig.filePrefixGcp + row.thumb} />
    ) : (
        <Avatar size={70} icon={<FiPackage />} />
    )

    return <div className="flex items-center">{avatar}</div>
}
const NameColumn = ({ row }: { row: Data }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        // navigate(`/app/sales/order-details/${row.id}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            {row.title}
        </span>
    )
}

const ReportTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.contentViewReportList.data.tableData
    )

    const { start_date, end_date, type } = useAppSelector(
        (state) => state.contentViewReportList.data.filterData
    )

    const loading = useAppSelector(
        (state) => state.contentViewReportList.data.loading
    )

    const data = useAppSelector(
        (state) => state.contentViewReportList.data.dataList
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
            getContentViewsReport({
                start_date,
                end_date,
                type,
                pageIndex,
                pageSize,
                sort,
                query,
            })
        )
    }, [dispatch, start_date, end_date, type, pageIndex, pageSize, sort, query])

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

    const columns: ColumnDef<Data>[] = useMemo(
        () => [
            {
                header: '#',
                accessorKey: 'sl',
                cell: (props) => <span>{props.row.original.sl}</span>,
            },
            {
                header: 'Thumbnail',
                accessorKey: 'thumb',
                cell: (props: { row: { original: Data } }) => (
                    <ImageColumn row={props.row.original} />
                ),
            },
            {
                header: 'Title',
                accessorKey: 'title',
                cell: (props) => <NameColumn row={props.row.original} />,
            },
            {
                header: 'Content Type',
                accessorKey: 'content_type',
                cell: (props) => <span>{props.row.original.content_type}</span>,
            },
            {
                header: 'Users',
                accessorKey: 'users',
                cell: (props) => <span>{props.row.original.USERS}</span>,
            },
            {
                header: 'Views',
                accessorKey: 'VIEWS',
                cell: (props) => <span>{props.row.original.VIEWS}</span>,
            },
            {
                header: 'Dur(Hr)',
                accessorKey: 'TIME_SPENT_HOURLY',
                cell: (props) => (
                    <span>{props.row.original.TIME_SPENT_HOURLY}</span>
                ),
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
            //onSort={onSort}
        />
    )
}

export default ReportTable
