export type AppConfig = {
    apiPrefix: string
    filePrefix: string
    filePrefixGcp: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

// const appConfig: AppConfig = {
//     apiPrefix: 'https://api-cms.tsports.com/api',
//     filePrefix: 'https://api-cms.tsports.com/storage/',
//     filePrefixGcp: 'https://image.tsports.com/',
//     authenticatedEntryPath: '/app/dashboard',
//     unAuthenticatedEntryPath: '/sign-in',
//     tourPath: '/app/account/kyc-form',
//     locale: 'en',
//     enableMock: false,
// }

// const appConfig: AppConfig = {
//     apiPrefix: 'https://stag-api-cms.tsports.com/api',
//     filePrefix: 'https://stag-api-cms.tsports.com/storage/',
//     filePrefixGcp: 'https://image.tsports.com/',
//     authenticatedEntryPath: '/app/dashboard',
//     unAuthenticatedEntryPath: '/sign-in',
//     tourPath: '/app/account/kyc-form',
//     locale: 'en',
//     enableMock: false,
// }
//
const appConfig: AppConfig = {
    apiPrefix: 'http://127.0.0.1:8000/api',
    filePrefix: 'http://127.0.0.1:8000/storage/',
    filePrefixGcp: 'https://image.tsports.com/',
    authenticatedEntryPath: '/app/dashboard',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/app/account/kyc-form',
    locale: 'en',
    enableMock: false,
}
export default appConfig
