export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status?: string;
}


export interface AccessTokenInterface {
    token: string;
    expires: string;
    userId: string;
    user: any;
    roles: any;
}

export class Token implements AccessTokenInterface {
    token: any = null;
    expires: any = null;
    userId: any = null;
    user: any = null;
    roles: any = null;
    constructor(data?: AccessTokenInterface) {
        Object.assign(this, data);
    }
}

