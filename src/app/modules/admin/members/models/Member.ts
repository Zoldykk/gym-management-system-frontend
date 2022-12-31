import { Plan } from "../../plans/models/Plan";

export interface Member {
    fullName: string,
    age: number,
    email: string,
    phoneNumber: string,
    plan: Plan,
    profilePicture?: any,
}
