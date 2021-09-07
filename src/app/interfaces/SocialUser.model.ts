export interface SocialUser{
    id: string,
    name: string,
    email: string,
    photoUrl: string,
    firstName: string,
    lastName: string,
    response: {
        token_type: string,
        access_token: string,
        scope: string,
        login_hint: string,
        expires_in: number,
        id_token: string,
        session_state: {
            extraQueryParams: {
                authuser: string
            }
        },
        first_issued_at: number,
        expires_at: number,
        idpId: string
    },
    authToken: string,
    idToken: string,
    provider: string
}