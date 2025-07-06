import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userDetail: any = null;
  totalCow: any = null;
  
  themeToggle: boolean;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.themeToggle = this.themeService.isDark();
    this.getProfile();
    this.getCow()
  }
  ngOnInit() {
    this.themeService.toggleTheme(this.themeToggle);
  }

  BackBtn(){
    history.back()
  }


  getProfile() {
    // this.apiService.showLoading();

    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getProfileAPI(e.access_token)
          .then(async (res: any) => {
            this.apiService.removeLoading();
            if (res.response_type == 'success') {
              this.userDetail = res.data
            }
          })
          .catch(async (err: any) => {
            this.apiService.removeLoading();
            console.log(err);
          });
      })
      .catch((err: any) => {
        this.apiService.removeLoading();
        console.error(err);
      });
      this.apiService.removeLoading();
  }


  
  getCow(query: string = '') {
    // this.apiService.showLoading();

    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getCowList(e.access_token, query)
          .then(async (res: any) => {
            this.apiService.removeLoading();
            if (res.response_type == 'success') {
              this.totalCow = res.total_cows
            }
          })
          .catch(async (err: any) => {
            this.apiService.removeLoading();
            console.log(err);
          });
      })
      .catch((err: any) => {
        this.apiService.removeLoading();
        console.error(err);
      });
      this.apiService.removeLoading();
  }


}
