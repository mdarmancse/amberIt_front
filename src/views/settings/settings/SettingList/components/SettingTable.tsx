import { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineDesktopComputer, HiOutlinePencil } from 'react-icons/hi'
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
import Badge from '@/components/ui/Badge'
import { HiOutlineTv } from 'react-icons/hi2'
import { Avatar } from '@/components/ui'
import { FaAndroid, FaApple } from 'react-icons/fa'

type Data = {
    id: string | number
    device_type:  number
    is_active: number
    created_at: string
    updated_at: string
}


const StatusColor: Record<
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
const DeviceType: Record<
    number,
    {
        label: string
        textClass: string
        icon: any
    }
> = {
    1: {
        label: 'Web',
        textClass: 'text-blue-500',
        icon: <HiOutlineDesktopComputer/>,

    },
    2: {
        label: 'Android',
        textClass: 'text-green-500',
        icon: <FaAndroid/>,

    },
    3: {
        label: 'IOS',
        textClass: 'text-pink-500',
        icon: <FaApple/>,

    },
    4: {
        label: 'TV',
        textClass: 'text-rose-500',
        icon: <HiOutlineTv/>,
    },
}

const ActionColumn = ({ row }: { row: Data }) => {
    const dispatch = useAppDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()


    const onEdit = () => {
        navigate(`/settings/settings/setting-edit/${row.id}`)
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

const SettingTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.homesSettingList.data.tableData
    )
    const loading = useAppSelector((state) => state.homesSettingList.data.loading)

    const data = useAppSelector((state) => state.homesSettingList.data.orderList)

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

            {
                header: 'Thumbnail',
                accessorKey: 'thumbnail',
                cell: (props) => {
                    const row = props.row.original
                    // const is_transcoded=Number(row.is_premium)
                    const device_type = row.device_type

                    return (
                        <Avatar
                            size={55}
                            className={`bg-white ${DeviceType[device_type].textClass}`}
                            icon={ DeviceType[device_type].icon}
                        />
                    )
                },
            },
            {
                header: 'Device Type',
                accessorKey: 'device_type',
                cell: (props) => {
                    const row = props.row.original
                    // const is_transcoded=Number(row.is_premium)
                    const device_type = row.device_type

                    return (
                        <div className="flex items-center">

                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${DeviceType[device_type].textClass}`}
                            >
                                {DeviceType[device_type].label}
                            </span>
                        </div>
                    )
                },
            },

            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    // const is_transcoded=Number(row.is_premium)
                    const success = row.is_active

                    return (
                        <div className="flex items-center">
                            <Badge className={StatusColor[success].dotClass} />
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${StatusColor[success].textClass}`}
                            >
                                {StatusColor[success].label}
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
        />
    )
}

export default SettingTable
