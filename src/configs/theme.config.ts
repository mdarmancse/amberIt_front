import { THEME_ENUM } from '@/constants/theme.constant'
import {
    Direction,
    Mode,
    ColorLevel,
    NavMode,
    ControlSize,
    LayoutType,
} from '@/@types/theme'

export type ThemeConfig = {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    panelExpand: boolean
    navMode: NavMode
    controlSize: ControlSize
    cardBordered: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
    }
}

/**
 * Since some configurations need to be match with specific themes,
 * we recommend to use the configuration that generated from demo.
 */
export const themeConfig: ThemeConfig = {
    themeColor: 'red',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_LIGHT,
    primaryColorLevel: 900,
    cardBordered: true,
    panelExpand: true,
    controlSize: 'md',
    navMode: THEME_ENUM.NAV_MODE_THEMED,
    layout: {
        type: THEME_ENUM.LAYOUT_TYPE_MODERN,
        sideNavCollapse: true,
    },
}
// export const themeConfig: ThemeConfig = {
//     themeColor: "red",
//     direction: "ltr",
//     mode: "light",
//     primaryColorLevel: 900,
//     cardBordered: true,
//     panelExpand: false,
//     controlSize: "md",
//     navMode: THEME_ENUM.NAV_MODE_THEMED,
//     layout: {
//     type: "modern",
//         sideNavCollapse: false
// }
// }
