import { Role } from "./Role";

export interface User {
    fullName: string,
    email: string,
    phoneNumber: string,
    roles: Role[],
    password?: string,
    passwordConfirmation?: string
}
