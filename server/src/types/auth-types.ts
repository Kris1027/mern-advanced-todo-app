export interface ISignupRequestBody {
    username: string;
    fullName: string;
    email: string;
    password: string;
}

export interface ILoginRequestBody {
    username: string;
    password: string;
}
