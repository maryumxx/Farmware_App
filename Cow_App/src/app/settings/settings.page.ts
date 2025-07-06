import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  userDetail: any = null;
  themeToggle: boolean;

  constructor(
      private themeService: ThemeService,
      private router: Router,
      private apiService: ApiService
    ) {
    this.themeToggle = this.themeService.isDark();
    this.getProfile();

  }
  
  
  ngOnInit() {
    this.themeService.toggleTheme(this.themeToggle);
    // Additional initialization if needed
  }
  toggleChange(ev: any) {
    this.themeService.toggleTheme(ev.detail.checked);
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


}
