import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // check authorization
        console.log(this.userService)

        if (!this.userService.isAuthenticated()) {
            this.router.navigate(['/sign-in']);
            return false;
        }

        // Handle when route claims is empty
        const allowedClaims = route.data.allowedClaims;
        if (!allowedClaims || allowedClaims.length == 0)
            return true;

        // Handle when user claims is empty
        const userClaims = this.userService.getCurrentUserRoles();
        if (!userClaims || userClaims.length == 0) {
            this.router.navigate(['/oops/not-authorized']);
            return false;
        }

        // Finally check if claim is allowed
        let claimFound = allowedClaims.some((claim: any) => {
            return userClaims.findIndex((uclaim: any) => uclaim == claim) >= 0;
        })

        if (!claimFound)
            this.router.navigate(['/oops/not-authorized']);

        return claimFound;
    }
}
