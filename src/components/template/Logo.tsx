import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}

const LOGO_SRC_PATH = '/img/logo/'

const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        imgClass,
        style,
        logoWidth = '55%',
    } = props

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Add any additional styling for the container here
    }

    return (
        <div
            className={classNames('logo-container', className)}
            style={containerStyle}
        >
            <img
                className={imgClass}
                src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
                alt={`${APP_NAME} logo`}
                style={{
                    width: logoWidth,
                    // Add any additional styling for the logo here
                }}
            />
        </div>
    )
}

export default Logo
