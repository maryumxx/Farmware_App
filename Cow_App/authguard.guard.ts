import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardGuard implements CanActivate {
  constructor(private api_service: ApiService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var status = true;

    this.api_service
      .getToken()
      .then((res: any) => {
        if ((res.access_token, res.refrash_token)) {
          this.api_service
            .AccessTokenvalid(res.access_token, res.refrash_token)
            .then((resp) => {

              if (resp.success === 'You are authenticated!') {
                status = false;
                this.router.navigate(['/home'])
              } else {
                this.api_service
                  .RefrashTokenvalid(res.refrash_token)
                  .then((ref) => {
                    
                    if (ref.reponse_type === 'success') {
                      status = false;
                      this.router.navigate(['/home'])
                    } else {
                      status = true;
                    }
                  })
                  .catch((e) => {
                    status = true;
                  });
              }
            })
            .catch((e) => {
              this.api_service
                .RefrashTokenvalid(res.refrash_token)
                .then((ref) => {
                  if (ref.reponse_type === 'success') {
                    status = false;
                    this.router.navigate(['/home'])
                  } else {
                    status = true;
                  }
                })
                .catch((e) => {
                  status = true;
                });
            });
        } else {
          status = true;
        }
      })
      .catch((err: any) => {
        status = true;
      });

    return status;
  }
}
