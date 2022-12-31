/* tslint:disable */
declare var Object: any;
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Token, User } from './user.types';


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private token: Token = new Token();
    protected prefix: string = '$gymManagementSystem$';

    constructor(private router: Router) {
        this.token.user = this.load('user');
        this.token.expires = this.load('expires');
        this.token.token = this.load('token');
        this.token.roles = this.load('roles');
    }

    /**
     * This method will update the user information and persist it
     **/
    public setUser(user: any) {
        this.token.user = JSON.stringify(user);
        this.save();
    }

    /**
     * This method will update the user claims and persist it
     **/
    public setClaims(roles?: any) {
        this.token.roles = JSON.stringify(roles);
        this.save();
    }

    /**
     * @method setToken
     * @param {Token} token Token or casted AccessToken instance
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    public setToken(token: Token): void {
        this.token["token"] = token
        this.save();
    }

    /**
     * @method getToken
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials.
     **/
    public getToken(): Token {
        return <Token>this.token;
    }

    /**
     * @method getAccessTokenId
     * @return {string}
     * @description
     * This method will return the actual token string, not the object instance.
     **/
    public getAccessTokenId(): string {
        return this.token.token;
    }

    public isAuthenticated(): string {
        return this.token.token;
    }

    /**
     * @method getCurrentUserId
     * @return {any}
     * @description
     * This method will return the current user id, it can be number or string.
    **/

    public getCurrentUserId(): any {
        return this.token.userId;
    }

    /**
     * @method getCurrentUserData
     * @return {any}
     * @description
     * This method will return the current user instance.
     **/
    public getCurrentUserData(): User {
        return typeof this.token.user === 'string' ? JSON.parse(this.token.user) : this.token.user;
    }

    public getCurrentUserRoles(): any {
        return typeof this.token.roles === 'string' ? JSON.parse(this.token.roles) : this.token.roles;
    }

    public isUserAllowedTo(claim: string): any {

        let userRoles = this.getCurrentUserRoles() || [];

        return userRoles.indexOf(claim) >= 0;
    }

    /**
     * @method save
     * @return {boolean} Whether or not the information was saved
     * @description
     * This method will save in either local storage or cookies the current credentials.
     **/
    public save(): boolean {
        let expires = new Date(this.token.expires);
        this.persist('token', this.token.token, expires);
        this.persist('user', this.token.user, expires);
        this.persist('userId', this.token.userId, expires);
        this.persist('expires', this.token.expires, expires);
        this.persist('roles', this.token.roles, expires);
        return true;
    }

    /**
     * @method load
     * @param {string} prop Property name
     * @return {any} Any information persisted in storage
     * @description
     * This method will load either from local storage or cookies the provided property.
     **/
    protected load(prop: string) {
        return localStorage.getItem(`${this.prefix}${prop}`);
    }

    /**
     * @method clear
     * @return {void}
     * @description
     * This method will clear cookies or the local storage.
     **/
    public clear(): void {
        Object.keys(this.token).forEach((prop: string) => localStorage.removeItem(`${this.prefix}${prop}`));
        this.token = new Token();
        this.token.user = null;
    }

    /**
     * @method persist
     * @return {void}
     * @description
     * This method saves values to storage
     **/
    protected persist(prop: string, value: any, expires?: Date): void {
        try {
            if (value)
                localStorage.setItem(`${this.prefix}${prop}`, typeof value === 'object' ? JSON.stringify(value) : value);
        } catch (err) {
            console.error('Cannot access local/session storage:', err);
        }
    }
}
