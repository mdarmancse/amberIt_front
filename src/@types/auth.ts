export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    success: boolean
    user: any
    data: any
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
