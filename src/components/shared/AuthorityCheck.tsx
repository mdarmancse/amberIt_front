import useAuthority from '@/utils/hooks/useAuthority'
import type { CommonProps } from '@/@types/common'

interface AuthorityCheckProps extends CommonProps {
    userAuthority: []
    authority: string[]
    menu_id?: string | string[]
    purpose?: string | string[]
}

const AuthorityCheck = (props: AuthorityCheckProps) => {
    const { userAuthority = [], authority = [], menu_id,purpose,children } = props

   // console.log('AuthorityCheck',props)
    const roleMatched = useAuthority(userAuthority, authority,menu_id,purpose)

    return <>{roleMatched ? children : null}</>
}

export default AuthorityCheck
