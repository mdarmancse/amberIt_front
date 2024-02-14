import ReportFilter from './ReportFilter'

const ReportTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <ReportFilter />

            {/*<Link download to="/data/order-list.csv" target="_blank">*/}
            {/*    <Button block size="sm" icon={<HiDownload />}>*/}
            {/*        Export*/}
            {/*    </Button>*/}
            {/*</Link>*/}

            {/*<ReportTableSearch />*/}
        </div>
    )
}

export default ReportTableTools
