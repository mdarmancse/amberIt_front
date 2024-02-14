import {
    HiOutlineTrendingUp,
    HiOutlineShieldCheck,
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlinePaperAirplane,
    HiOutlineChartPie,
    HiOutlineUserAdd,
    HiOutlineKey,
    HiOutlineDocumentText,
    HiOutlineLockClosed,
    HiOutlineViewGridAdd,
    HiHome,
    HiMenu,
    HiOutlineChartSquareBar,
    HiOutlineUserGroup,
    HiOutlineMinusSm,
    HiOutlineViewGrid,
    HiOutlineUsers,
    HiOutlineLogin,
    HiOutlineTicket,
    HiOutlineViewBoards,
    HiOutlineEye,
    HiOutlineDatabase, HiOutlineDocumentReport
} from 'react-icons/hi'
import {
    HiOutlineBars3,
    HiOutlineBellAlert,
    HiOutlineListBullet
} from 'react-icons/all'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiHome />,
    menu: <HiMenu />,
    dashboard: <HiOutlineChartSquareBar />,
    apps: <HiOutlineViewGridAdd />,
    sales: <HiOutlineTrendingUp />,
    common: <HiOutlineColorSwatch />,
    dataDisplay: <HiOutlineDesktopComputer />,
    forms: <HiOutlineDocumentText />,
    navigation: <HiOutlinePaperAirplane />,
    graph: <HiOutlineChartPie />,
    authentication: <HiOutlineLockClosed />,
    signIn: <HiOutlineShieldCheck />,
    signUp: <HiOutlineUserAdd />,
    forgotPassword: <HiOutlineLockClosed />,
    resetPassword: <HiOutlineKey />,
    content: <HiOutlineViewGridAdd />,
    users: <HiOutlineUserGroup />,
    roles: <HiOutlineShieldCheck />,
    rolesPermission: <HiOutlineLockClosed />,
    notification: <HiOutlineBellAlert />,
    reports: <HiOutlineMinusSm />,
    contentViews: <HiOutlineViewGrid />,
    conCurrent: <HiOutlineUsers />,
    userLoginLog: <HiOutlineLogin />,
    uniqueUserMonthly: <HiOutlineListBullet />,
    uniqueUserDaily: <HiOutlineViewBoards />,
    liveAudience: <HiOutlineEye />,
    categories: <HiOutlineColorSwatch />,
    dbVersion: <HiOutlineDatabase />,
    acl: <HiOutlineLockClosed />,
    paymentReport: <HiOutlineTicket />,
    auditReport: <HiOutlineDocumentReport />,
}

export default navigationIcon
