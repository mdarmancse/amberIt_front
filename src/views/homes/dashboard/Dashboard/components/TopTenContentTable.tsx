import { useEffect, useCallback, useMemo, useRef, useState } from 'react'

import { getTopTenContent, useAppDispatch, useAppSelector } from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'

import type { ColumnDef } from '@/components/shared/DataTable'
import { Loading } from '@/components/shared'
import { Card, ScrollBar, Table } from '@/components/ui'
import Avatar from '../../../../../components/ui/Avatar'
import appConfig from '@/configs/app.config'
import { FiPackage } from 'react-icons/fi'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import THead from '@/components/ui/Table/THead'
import Tr from '@/components/ui/Table/Tr'
import Th from '@/components/ui/Table/Th'
import TBody from '@/components/ui/Table/TBody'
import Td from '@/components/ui/Table/Td'
import { MAX_DISPLAY_LENGTH } from '@/components/ui/utils/constants'

type Data = {
    id: number
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
        <Avatar size={50} src={appConfig.filePrefixGcp + row.thumb} />
    ) : (
        <Avatar size={50} icon={<FiPackage />} />
    )

    return <div className="flex items-center">{avatar}</div>
}


const NameColumn = ({ row }: { row: Data }) => {
    const { textTheme } = useThemeClass();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    if (!row.title) {
        return null; // If title is not defined, you can choose to render nothing or provide a default value
    }

    const displayTitle = isExpanded ? row.title : `${row.title.slice(0, MAX_DISPLAY_LENGTH)}`;

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <span
            className={`text-xs font-semibold `}
          //  onClick={onView}
        >
            {displayTitle}
            {row.title.length > MAX_DISPLAY_LENGTH && (
                <span
                    className={`cursor-pointer select-none font-semibold  ${textTheme} `}
                    onClick={toggleExpansion}
                >
                    {isExpanded ? ' less' : '...more'}
                </span>
            )}
        </span>
    );
};

const TopTenContentTable = () => {
    const dispatch = useAppDispatch()
    const date = useAppSelector((state) => state.homeDashboard.data.date)

    const fetchData = useCallback(async () => {
        await dispatch(getTopTenContent({ date }))
    }, [dispatch])

    // Fetch data on component mount
    useEffect(() => {
        fetchData()
    }, [dispatch])

    // Retrieve loading state and data from Redux store
    const loading = useAppSelector(
        (state) => state.homeDashboard.data.topTenConloading
    )
    const topTenContent = useAppSelector(
        (state) => state.homeDashboard.data.topTenContent
    )

    // Extract relevant data from the response
    const data = topTenContent?.data?.value || []

    // Define table columns
    const columns = useMemo(
        () => [
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
                //width:1000,
                cell: (props: { row: { original: Data } }) => (
                    <NameColumn row={props.row.original} />
                ),
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

    // Use the useReactTable hook to handle table logic
    const table = useReactTable({
        data,
        columns,
        enableColumnResizing: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <Card className="col-span-1 ">
            <div className="flex items-center justify-between mb-4">
                <h4 className="mb-4 lg:mb-0">Top Ten Content</h4>
            </div>

            {/* Use Loading component to show a loading indicator */}
            <Loading loading={loading}>
                <div className="h-100 overflow-y-auto max-h-[300px] min-h-[300px]">
                    <Table>
                        {/* Render table header */}
                        <THead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <Th
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {/* Check if header is a placeholder */}
                                            {header.isPlaceholder ? null : (
                                                <div>
                                                    {/* Render header content */}
                                                    {/* @ts-ignore */}
                                                    {
                                                        header.column.columnDef
                                                            .header
                                                    }
                                                </div>
                                            )}
                                        </Th>
                                    ))}
                                </Tr>
                            ))}
                        </THead>

                        {/* Render table body */}
                        <TBody>
                            {table
                                .getRowModel()
                                .rows.slice(0, 10)
                                .map((row) => (
                                    <Tr key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <Td key={cell.id}>
                                                {/* Render cell content */}
                                                {/* @ts-ignore */}
                                                {cell.column.columnDef.cell({
                                                    row: {
                                                        original: row.original,
                                                    },
                                                })}
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                        </TBody>
                    </Table>
                </div>
            </Loading>
        </Card>
    )
}

export default TopTenContentTable
