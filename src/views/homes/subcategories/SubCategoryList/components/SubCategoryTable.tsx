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
import Avatar from '../../../../../components/ui/Avatar'
import appConfig from '@/configs/app.config'
import { FiPackage } from 'react-icons/fi'

type Data = {
    category_id: string
    sub_category_name: string
    stb_thumbnail: string
    category_name: string
    created_at: string
    updated_at: string
    sort_order: string
    id: string
    is_active: boolean
}

const CatNameColumn = ({ row }: { row: Data }) => {
    const { textTheme } = useThemeClass()
    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
        >
            {row.category_name}
        </span>
    )
}

const SubNameColumn = ({ row }: { row: Data }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
        >
            {row.sub_category_name}
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
        navigate(`/app/subcategories/sub-category-edit/${row.id}`)
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
const ImageColumn = ({ row }: { row: Data }) => {
    const avatar = row.stb_thumbnail ? (
        <Avatar size={70} src={appConfig.filePrefixGcp + row.stb_thumbnail} />
    ) : (
        <Avatar size={70} icon={<FiPackage />} />
    )

    return <div className="flex items-center">{avatar}</div>
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

const SubCategoryTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.homesSubCategoryList.data.tableData
    )
    const loading = useAppSelector(
        (state) => state.homesSubCategoryList.data.loading
    )

    const data = useAppSelector(
        (state) => state.homesSubCategoryList.data.orderList
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
                header: 'Thumbnail',
                accessorKey: 'stb_thumbnail',
                cell: (props) => {
                    const row = props.row.original
                    return <ImageColumn row={row} />
                },
            },
            {
                header: 'Sub Category Name',
                accessorKey: 'sub_category_name',
                cell: (props) => <SubNameColumn row={props.row.original} />,
            },
            {
                header: 'Category Name',
                accessorKey: 'category_name',
                cell: (props) => <CatNameColumn row={props.row.original} />,
            },
            {
                header: 'Sort Order',
                accessorKey: 'sort_order',
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
                        <span>
                            {dayjs(row.created_at).format(
                                'DD-MMM-YYYY hh:mm A'
                            )}
                        </span>
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

export default SubCategoryTable
