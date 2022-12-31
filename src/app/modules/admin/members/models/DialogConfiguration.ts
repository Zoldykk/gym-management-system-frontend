import { Member } from "./Member";

export interface DialogConfiguration {
    mode: string,
    title: string,
    btnText: string,
    member?: Member
}
