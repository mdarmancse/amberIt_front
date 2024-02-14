import appsNavigationConfig from './apps.navigation.config'
import authNavigationConfig from './auth.navigation.config'
import pagesNavigationConfig from './pages.navigation.config'
import homesNavigationConfig from './homes.navigation.config'
import settingsNavigationConfig from './settings.navigation.config'
import type { NavigationTree } from '@/@types/navigation'
import reportNavigationConfig from '@/configs/navigation.config/report.navigation.config'

const navigationConfig: NavigationTree[] = [
    ...homesNavigationConfig,
     ...settingsNavigationConfig,
     ...reportNavigationConfig,
     // ...appsNavigationConfig,
     // ...authNavigationConfig,
     // ...pagesNavigationConfig,
]

export default navigationConfig
