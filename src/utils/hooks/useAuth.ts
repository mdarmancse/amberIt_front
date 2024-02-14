import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { LoaderFunction, useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'
import { useState } from 'react'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useAppSelector((state) => state.auth.session)

    const signIn = async (values: {
        password: string
        rememberMe: boolean
        email: string
    }): Promise<{ success: boolean; message: string } | undefined> => {
        try {
            const resp = await apiSignIn(values)

            if (resp.data?.success) {
                const { token } = resp.data?.data

                dispatch(signInSuccess(token))

                console.log(resp)
                if (resp.data?.data.user) {
                    dispatch(
                        setUser(
                            resp.data.data.user || {
                                avatar: '',
                                email: 'Anonymous',
                                authority: ['USER'],
                                // email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    success: true,
                    message: resp.data?.data.user.name,
                }
            } else {
                return {
                    success: false,
                    message: resp?.data?.data.details,
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                success: false,
                message: errors?.response?.data?.details || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                const { token } = resp.data?.data
                dispatch(signInSuccess(token))
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                avatar: '',
                userName: '',
                email: '',
                authority: [],
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const [loading, setLoading] = useState(false)

    const signOut = async () => {
        try {
            setLoading(true) // Show loader
            await apiSignOut()

            // Handle sign out
            handleSignOut()
        } catch (error) {
            // Handle errors if any
            console.error('Error during sign out:', error)
        } finally {
            setLoading(false) // Hide loader regardless of success or failure
        }
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
        loading,
    }
}

export default useAuth
