import { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import Badge from '@/components/ui/Badge'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
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
import appConfig from '@/configs/app.config'
import {
    apiDownloadVdo,
    apiGetContentsHomeData,
} from '@/services/ContentService'

type Data = {
    id: number
    is_approved: boolean
    is_active: boolean
    is_transcoded: boolean
    is_premium: boolean
    content_name: string
    content_file_name: string
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

const FileColumn = ({ row }: { row: Data }) => {
    const { textTheme } = useThemeClass()

    const onView = useCallback(() => {
        const newTab = window.open('', '_blank')

        if (newTab) {
            // Show loader in the new tab
            newTab.document.open()
            newTab.document.write('<div>Loading...</div>')
            newTab.document.close()

            // Make the API call
            apiDownloadVdo({ id: row.id })
                .then((response) => {
                    const htmlContent = response.data

                    // Update the new tab content with the API response
                    newTab.document.open()
                    // @ts-ignore
                    newTab.document.write(htmlContent)
                    newTab.document.close()
                })
                .catch((error) => {
                    console.error('Error fetching download link:', error)

                    // Close the new tab in case of an error
                    newTab.close()
                })
        }
    }, [row.id])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            Download
        </span>
    )
}

const DownloadTable = () => {
    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    // @ts-ignore
    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.homeDownloadList.data.tableData
    )
    const loading = useAppSelector(
        (state) => state.homeDownloadList.data.loading
    )

    const data = useAppSelector((state) => state.homeDownloadList.data.dataList)

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
                header: 'Content Name',
                accessorKey: 'content-name',
                cell: (props) => <NameColumn row={props.row.original} />,
            },

            {
                header: 'Content File',
                accessorKey: 'content_file_name',
                cell: (props) => <FileColumn row={props.row.original} />,
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
            columns={columns}
            data={data}
            loading={loading}
            pagingData={{
                total: tableData.total as number,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            onPaginationChange={onPaginationChange}
        />
    )
}

export default DownloadTable
