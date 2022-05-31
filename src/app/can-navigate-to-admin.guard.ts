import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./shared/authentication.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToAdminGuard implements CanActivate {

  constructor(private authService: AuthenticationService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
  }

  canActivate( next: ActivatedRouteSnapshot,
               state: RouterStateSnapshot ):
    Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.toastr.warning( "Sie müssen Sich einloggen, um ein Angebot zu erstellen oder zu bearbeiten!" );
      this.router.navigate(["../"], { relativeTo: this.route });
      return false;
    }
  }
}
