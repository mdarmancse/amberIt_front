import { useMemo } from 'react'
import isEmpty from 'lodash/isEmpty'

function useAuthority(
    userAuthority: any[] = [],
    authority: string[] = [],
    menu_id?: string | string[],
    purpose?: string | string[],
    emptyCheck = false
) {



    // const roleMatched = useMemo(() => {
    //     return authority.some((role) => userAuthority.includes(role))
    // }, [authority, userAuthority])

    const authorityMatched = useMemo(() => {
        let matchingAuthority;
        if (userAuthority[0]['menu_id']){
            if (menu_id && purpose) {
                if (typeof purpose !== 'string') {
                    matchingAuthority = userAuthority.some((auth) =>
                        menu_id?.includes(auth?.menu_id.toString()) &&
                        purpose?.some(p => auth[p] == 1)
                    )
                }
                return matchingAuthority;
            }
        }

        return true;
    }, [userAuthority, menu_id, purpose]);



    // console.log("authorityMatched", { authorityMatched, menu_id,purpose})
    if (
        isEmpty(authority) ||
        isEmpty(userAuthority) ||
        typeof authority === 'undefined'
    ) {
        return !emptyCheck;
    }

    return authorityMatched;
}

export default useAuthority
