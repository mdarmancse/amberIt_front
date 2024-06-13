import { useEffect, useCallback, useMemo, useRef } from 'react'
import Badge from '@/components/ui/Badge'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'

import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
    getDatas,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'


type Data = {
    series_name: string
    total_sesson_no: string
    release_language: string
    sorting: string
    created_at: string
    updated_at: string
    is_active: boolean
    id: string
}

const NameColumn = ({ row }: { row: Data }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row.id}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            //   onClick={onView}
        >
            {row.series_name}
        </span>
    )
}

const ActionColumn = ({ row }: { row: Data }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow([row.id]))
    }
    const onEdit = () => {
        navigate(`/app/webSeries/webSeries-edit/${row.id}`)
    }

    // const onView = useCallback(() => {
    //     navigate(`/app/sales/order-details/${row.id}`)
    // }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            {/*<Tooltip title="View">*/}
            {/*    <span*/}
            {/*        className={`cursor-pointer p-2 hover:${textTheme}`}*/}
            {/*        onClick={onView}*/}
            {/*    >*/}
            {/*        <HiOutlineEye />*/}
            {/*    </span>*/}
            {/*</Tooltip>*/}
            <Tooltip title="Edit">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onEdit}
                >
                    <HiOutlinePencil />
                </span>
            </Tooltip>
            {/*<Tooltip title="Delete">*/}
            {/*    <span*/}
            {/*        className="cursor-pointer p-2 hover:text-red-500"*/}
            {/*        onClick={onDelete}*/}
            {/*    >*/}
            {/*        <HiOutlineTrash />*/}
            {/*    </span>*/}
            {/*</Tooltip>*/}
        </div>
    )
}

const statusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    1: {
        label: 'Active',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    0: {
        label: 'Inactive',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
}
const WebSeriesTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.homesWebSeriesList.data.tableData
    )
    const loading = useAppSelector(
        (state) => state.homesWebSeriesList.data.loading
    )

    const data = useAppSelector(
        (state) => state.homesWebSeriesList.data.orderList
    )

    const fetchData = useCallback(() => {
        dispatch(getDatas({ pageIndex, pageSize, sort, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef) {
            tableRef.current?.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<Data>[] = useMemo(
        () => [
            // {
            //     header: 'ID',
            //     accessorKey: 'id',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             // <span>{dayjs.unix(row.created_at).format('DD/MM/YYYY')}</span>
            //             <span>{row.id}</span>
            //         )
            //     },
            // },
            {
                header: 'Name',
                accessorKey: 'series_name',
                cell: (props) => <NameColumn row={props.row.original} />,
            },
            {
                header: 'Total Session',
                accessorKey: 'total_sesson_no',
            },
            {
                header: 'Release Language',
                accessorKey: 'release_language',
            },
            {
                header: 'Sort Order',
                accessorKey: 'sorting',
            },

            {
                header: 'Status',
                accessorKey: 'is_active',
                cell: (props) => {
                    const row = props.row.original
                    const status=Number(row.is_active)

                    return (
                        <div className="flex items-center">
                            <Badge className={statusColor[status].dotClass} />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${statusColor[status].textClass}`}
                            >
                                {statusColor[status].label}
                            </span>
                        </div>
                    )
                },
            },

            {
                header: 'Created Date',
                accessorKey: 'created_at',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <>
                            {dayjs(row.created_at).format(
                                'DD-MMM-YYYY hh:mm A'
                            )}
                        </>
                    )
                },
            },
            {
                header: 'Updated Date',
                accessorKey: 'updated_at',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {dayjs(row.updated_at).format(
                                'DD-MMM-YYYY hh:mm A'
                            )}
                        </span>
                    )
                },
            },
            {
                header: '',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} />,
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

    const onRowSelect = (checked: boolean, row: Data) => {
        if (checked) {
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<Data>[]) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds: string[] = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.id)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <DataTable
            ref={tableRef}
            // selectable
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
            onSort={onSort}
            onCheckBoxChange={onRowSelect}
            onIndeterminateCheckBoxChange={onAllRowSelect}
        />
    )
}

export default WebSeriesTable
