import { useEffect, useCallback, useMemo, useRef, useState } from 'react'
import Tooltip from '@/components/ui/Tooltip'
import { HiOutlineCheck, HiOutlineCheckCircle, HiOutlinePencil, HiOutlinePlusCircle } from 'react-icons/hi'

import {
    setSelectedRows,
    getDatas,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import {
    CellContext,
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    RowData,
    useReactTable,
} from '@tanstack/react-table'
import { Card, Table } from '@/components/ui'
import { Loading } from '@/components/shared'
import THead from '@/components/ui/Table/THead'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { apiUpdateVersion } from '@/services/DbVersionService'
import { HiOutlineArrowRightCircle } from 'react-icons/all'


type Data = {
    created_at: string
    updated_at: string
    db_version: string
    api_name: string
    id: string
}

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (
            rowIndex: number,
            columnId: string,
            value: unknown,
            dataPlaceHolder?: TData
        ) => void
    }
}

type EditablePerson = {
    db_version: string
    id: string
}

type FormModel = {
    db_version: string
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
            onClick={onView}
        >
            {row.api_name}
        </span>
    )
}


const UpdateColumn = (data: any) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const requestBody = {
        id: data.data.id,
        db_version: data.data.value,
    };

    const updateData = async (requestData: FormModel) => {
        try {
            setLoading(true);
            const response = await apiUpdateVersion<boolean, FormModel>(requestData);
            setSuccess(true);
            return response.data;
        } catch (error) {
            console.error('Update failed', error);
            setSuccess(false);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const onUpdate = async () => {
        try {
            await updateData(requestBody);
        } catch (error) {
            // Handle error (e.g., show a notification)
        }
    };

    return (
        <div className="flex justify-end text-xs">
            <Button
                size="xs"
                shape="circle"
                variant="solid"
                icon={success?<HiOutlineCheck />:<HiOutlineArrowRightCircle/>}
                onClick={onUpdate}
                loading={loading}

            />
        </div>
    );
};

const EditableCell = ({
    getValue,
    row: { index,original },
    table,
}: CellContext<EditablePerson, unknown>) => {
    const initialValue = getValue()

    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
        table.options.meta?.updateData(index, original.id, value)
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    let id=original.id;
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
                className="border-transparent bg-transparent hover:border-gray-300 focus:bg-white w-28 p-2"
                size="sm"
                type="number"
                value={value as number}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
            />
            <UpdateColumn data={{ id, value }} />
        </div>
    );

}
const defaultColumn: Partial<ColumnDef<EditablePerson>> = {
    cell: EditableCell,
}

function useSkipper() {
    const shouldSkipRef = useRef(true)

    const shouldSkip = shouldSkipRef.current

    // Wrap a function with this to skip a pagination reset temporarily

    const skip = useCallback(() => {
        shouldSkipRef.current = false
    }, [])

    useEffect(() => {
        shouldSkipRef.current = true
    })

    return [shouldSkip, skip]
}
const VersionTable = () => {
    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.settingVersionList.data.tableData
    )
    const loading = useAppSelector(
        (state) => state.settingVersionList.data.loading
    )

    const versionData = useAppSelector(
        (state) => state.settingVersionList.data.orderList
    )

    const fetchData = useCallback(() => {
        dispatch(getDatas({ pageIndex, pageSize, sort, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    const columns = useMemo(
        () => [
            {
                header: 'ID',
                accessorKey: 'id',
                cell: (props: { row: { original: any } }) => {
                    const row = props.row.original
                    return (
                        // <span>{dayjs.unix(row.created_at).format('DD/MM/YYYY')}</span>
                        <span>{row.id}</span>
                    )
                },
            },
            {
                header: 'Api Name',
                accessorKey: 'api_name',
                cell: (props: { row: { original: any } }) => (
                    <NameColumn row={props.row.original} />
                ),
            },
            {
                header: 'DB Version',
                accessorKey: 'db_version',
            },
            {
                header: 'API Version',
                accessorKey: 'api_version',
                cell: (props: { row: { original: any } }) => {
                    const row = props.row.original
                    return (
                        <span>{row.api_version}</span>
                    )
                },
            },
            {
                header: 'Updated Date',
                accessorKey: 'updated_at',
                cell: (props: { row: { original: any } }) => {
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
            // {
            //     header: '',
            //     id: 'action',
            //     cell: (props: { row: { original: any } }) => (
            //         <UpdateColumn row={props.row.original} />
            //     ),
            // },
        ],
        []
    )

    const data = versionData?.data || []

    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

   // const [data, setData] = useState(() => data10)

    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        autoResetPageIndex: autoResetPageIndex as boolean,
        // Provide our updateData function to our table meta

    })
    return (
        <>
            {/* Use Loading component to show a loading indicator */}
            <Loading loading={loading}>
                <div className="h-100 overflow-y-auto">
                    <>
                        <Table>
                            <THead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <Tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <Th
                                                    key={header.id}
                                                    colSpan={header.colSpan}
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,

                                                        header.getContext()
                                                    )}
                                                </Th>
                                            )
                                        })}
                                    </Tr>
                                ))}
                            </THead>

                            <TBody>
                                {table.getRowModel().rows.map((row) => {
                                    return (
                                        <Tr key={row.id}>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => {
                                                    return (
                                                        <Td key={cell.id}>
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,

                                                                cell.getContext()
                                                            )}
                                                        </Td>
                                                    )
                                                })}
                                        </Tr>
                                    )
                                })}
                            </TBody>
                        </Table>
                    </>
                </div>
            </Loading>
        </>
    )
}

export default VersionTable
