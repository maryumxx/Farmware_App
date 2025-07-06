import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PageguardGuard implements CanActivate {
  constructor (private api_service:ApiService ,   private router : Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var status = true

    this.api_service.getToken().then((res:any) => {  
      if (res.access_token,  res.refrash_token){

        this.api_service.AccessTokenvalid(res.access_token,  res.refrash_token).then((resp) => {

         
          
          if (resp.success === 'You are authenticated!'){
            if (resp.verification == "Unverified"){
              status = false;
              this.router.navigate(['/sendotp/'+resp.uid+'/signup'])
            }else {
               status = true;
            }
          }

          else{
            this.api_service.RefrashTokenvalid(res.refrash_token).then((ref) => {
              if (ref.reponse_type === 'success'){
                if (ref.verification == "Unverified"){
                  status = false;
                  this.router.navigate(['/sendotp/'+resp.uid+'/signup'])
                }else {
                  status = true;
                }
              }else{
                this.api_service.removeLoading()
                status = false;
                this.router.navigate(['/login'])
              }
            }).catch((e) => {
              this.api_service.removeLoading()
              status = false;
              this.router.navigate(['/login'])
            })


          }
        }).catch((e) => {

          this.api_service.RefrashTokenvalid(res.refrash_token).then((ref) => {
            if (ref.reponse_type === 'success'){
              if (ref.verification == "Unverified"){
                status = false;
                this.router.navigate(['/sendotp/'+ref.uid+'/signup'])
              }else {
                status = true;
              }
            }else{
              this.api_service.removeLoading()
              status = false;
              this.router.navigate(['/login'])
            }
          }).catch((e) => {
            this.api_service.removeLoading()
            status = false;
            this.router.navigate(['/login'])
          })
          
        })

      }else{
        
        this.api_service.removeLoading()
        status = false;
        this.router.navigate(['/login'])
      }
    }).catch((err:any) => {
      this.api_service.removeLoading()
      this.router.navigate(['/login'])
      status = false;
    })

    return status;
    // return true;


  }
  
}
