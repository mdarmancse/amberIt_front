import { useEffect, useCallback, useMemo, useRef } from 'react'
import DataTable from '@/components/shared/DataTable'
import {
    getAuditReport,
    setFilterData,
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
import dayjs from 'dayjs'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'

import Tooltip from '@/components/ui/Tooltip'
import { HiOutlineEye, HiOutlinePencil } from 'react-icons/hi'

type Data = {
    id: number
    sl: number
    causer_id: number | string
    user_name: string
    log_name: string
    description: string
    subject_type: string
    event: string
    created_at: string
}
const ActionColumn = ({ row }: { row: Data }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/reports/audit-report/${row.id}`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
        </div>
    )
}

const ReportTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.auditReportList.data.tableData
    )

    const { start_date, end_date, event, subject_type, log_name, causer_id } =
        useAppSelector((state) => state.auditReportList.data.filterData)

    const loading = useAppSelector(
        (state) => state.auditReportList.data.loading
    )

    const data = useAppSelector((state) => state.auditReportList.data.dataList)

    const fetchData = useCallback(async () => {
        dispatch(updateLoading({ loading: true }))

        await dispatch(
            getAuditReport({
                start_date,
                end_date,
                event,
                subject_type,
                log_name,
                causer_id,
                pageIndex,
                pageSize,
                sort,
                query,
            })
        )
    }, [
        dispatch,
        pageIndex,
        pageSize,
        sort,
        start_date,
        end_date,
        event,
        subject_type,
        log_name,
        causer_id,
    ])
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
        event,
        subject_type,
        log_name,
        causer_id,
    ])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSorting()
        }
    }, [data,tableRef])

    const tableData = useMemo(
        () => ({
            pageIndex,
            pageSize,
            sort,
            start_date,
            end_date,
            event,
            subject_type,
            log_name,
            causer_id,
            total,
        }),
        [
            pageIndex,
            pageSize,
            sort,
            start_date,
            end_date,
            event,
            subject_type,
            log_name,
            causer_id,
            total,
        ]
    )

    const columns: ColumnDef<Data>[] = useMemo(() => {
        const dynamicColumns: ColumnDef<Data>[] = [
            {
                header: 'Log ID',
                accessorKey: 'id',
                cell: (props) => <span>{props.row.original.id}</span>,
            },
            {
                header: 'User Name',
                accessorKey: 'user_name',
                cell: (props) => <span>{props.row.original.user_name}</span>,
            },
            {
                header: 'Date',
                accessorKey: 'created_at',
                cell: (props) => (
                    <span>
                        {dayjs(props.row.original.created_at).format(
                            'DD-MMM-YYYY hh:mm A'
                        )}
                    </span>
                ),
            },

            {
                header: 'Title',
                accessorKey: 'log_name',
                cell: (props) => <span>{props.row.original.log_name}</span>,
            },
            {
                header: 'Description',
                accessorKey: 'description',
                cell: (props) => <span>{props.row.original.description}</span>,
            },
            {
                header: 'Table Name',
                accessorKey: 'subject_type',
                cell: (props) => <span>{props.row.original.subject_type}</span>,
            },
            {
                header: 'Event',
                accessorKey: 'event',
                cell: (props) => <span>{props.row.original.event}</span>,
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ]

        return dynamicColumns
    }, [])

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

    const onSort = (sort:OnSortParam ) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <DataTable
            ref={tableRef}
            columns={columns}
            data={data}
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
