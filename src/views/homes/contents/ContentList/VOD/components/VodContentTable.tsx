import { useEffect, useCallback, useMemo, useRef } from 'react'
import Badge from '@/components/ui/Badge'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { HiOutlinePencil } from 'react-icons/hi'
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
    content_file_name: string
    id: number
    is_approved: boolean
    is_active: boolean
    is_transcoded: boolean
    is_premium: boolean
    content_name: string
    created_at: number
    updated_at: number
    category_name: string
    transcoding_start_time: number
    transcoding_end_time: number
    status: number
}
const transcodedColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    1: {
        label: 'Done',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    0: {
        label: 'Pending',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
}

const vodStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    1: {
        label: 'Upload Success',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    0: {
        label: 'Upload Failed',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}
const premiumColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    1: {
        label: 'Premium',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    0: {
        label: 'Not Premium',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
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
            {row.content_name}
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
        navigate(`/app/contents/content-edit/${row.id}`)
    }

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row.id}`)
    }, [navigate, row])

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

const VodContentTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    // @ts-ignore
    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.homeVodContentList.data.tableData
    )
    const loading = useAppSelector(
        (state) => state.homeVodContentList.data.loading
    )

    const data = useAppSelector(
        (state) => state.homeVodContentList.data.dataList
    )

    const fetchData = useCallback(() => {
        console.log('{ pageIndex, pageSize, sort, query }', {
            pageIndex,
            pageSize,
            sort,
            query,
        })
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
            {
                header: 'ID',
                accessorKey: 'id',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        // <span>{dayjs.unix(row.created_at).format('DD/MM/YYYY')}</span>
                        <span>{row.id}</span>
                    )
                },
            },
            {
                header: 'Content Name',
                accessorKey: 'content-name',
                cell: (props) => <NameColumn row={props.row.original} />,
            },

            {
                header: 'Category Name',
                accessorKey: 'category-name',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        // <span>{dayjs.unix(row.created_at).format('DD/MM/YYYY')}</span>
                        <span>{row.category_name}</span>
                    )
                },
            },
            {
                header: 'Is Premium',
                accessorKey: 'is_premium',
                cell: (props) => {
                    const row = props.row.original
                    const is_premium = Number(row.is_premium)

                    return (
                        <div className="flex items-center">
                            <Badge
                                className={premiumColor[is_premium].dotClass}
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${premiumColor[is_premium].textClass}`}
                            >
                                {premiumColor[is_premium].label}
                            </span>
                        </div>
                    )
                },
            },

            {
                header: 'Is Transcoded',
                accessorKey: 'is-transcoded',
                cell: (props) => {
                    const row = props.row.original
                    // const is_transcoded=Number(row.is_premium)
                    const is_transcoded =
                        Number(row.is_transcoded) == 1 &&
                        row.transcoding_start_time &&
                        row.transcoding_end_time
                            ? 1
                            : 0

                    return (
                        <div className="flex items-center">
                            <Badge
                                className={
                                    transcodedColor[is_transcoded].dotClass
                                }
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${transcodedColor[is_transcoded].textClass}`}
                            >
                                {transcodedColor[is_transcoded].label}
                            </span>
                        </div>
                    )
                },
            },

            {
                header: 'VOD Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    // const is_transcoded=Number(row.is_premium)
                    const success =
                        row.content_file_name
                            ? 1
                            : 0

                    return (
                        <div className="flex items-center">
                            <Badge
                                className={
                                    vodStatusColor[success].dotClass
                                }
                            />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${vodStatusColor[success].textClass}`}
                            >
                                {vodStatusColor[success].label}
                            </span>
                        </div>
                    )
                },
            },

            {
                header: 'Status',
                accessorKey: 'is_active',
                cell: (props) => {
                    const row = props.row.original
                    // const status=Number(row.is_active)
                    const status =
                        Number(row.is_active) && Number(row.is_approved) == 1
                            ? 1
                            : 0

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
            dispatch(removeRowItem(String(row.id)))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<Data>[]) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds: string[] = []
                originalRows.forEach((row) => {
                    selectedIds.push(String(row.id))
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
            //  selectable
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

export default VodContentTable
