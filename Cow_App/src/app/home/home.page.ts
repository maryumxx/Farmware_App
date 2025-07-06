import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userDetail: any = null;
  cowList: any[] = [];
  query: any = '';

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private apiService: ApiService
  ) {
    // Initial fetch with an empty query
    this.apiService.removeLoading();
    this.getCow();
    this.getProfile()
  }

  getCow(query: string = '') {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getCowList(e.access_token, query)
          .then((res: any) => {
            if (res.response_type == 'success') {
              this.cowList = res.data;
            }
          })
          .catch((err: any) => {
            console.error(err);
          });
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  handleRefresh(event: CustomEvent) {
    this.getCow();
    (event.target as HTMLIonRefresherElement).complete();
  }

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';

    // Call getCow again with the search query
    this.getCow(query);
  }


  getProfile() {
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
