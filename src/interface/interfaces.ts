export interface loginInterface {
    email: string
    password: string;
    access_token?: string;
    error?: string;
}
export interface registerinterface {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    message?: boolean;
}