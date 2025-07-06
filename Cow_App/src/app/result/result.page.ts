import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {
  @ViewChild('statusForm')
  statusForm: NgForm | undefined;
  themeToggle: boolean;
  vaccineEvent: any = null;
  id: any;
  cowStatus: any;
  symptomNames: any = null;
  markdownText: any;

  dataset:any = {
    current_status: '',
  }

  ngOnInit() {}

  BackBtn() {
    history.back();
  }

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private apiService: ApiService,
    private urlParam: ActivatedRoute
  ) {
    localStorage.removeItem('disease');
    this.id = this.urlParam.snapshot.paramMap.get('id');
    this.themeToggle = this.themeService.isDark();
    this.getResult();
    this.getCowStatus();
  }

  ngAfterViewInit() {
    this.applyTheme(); // Apply theme after view initialization
  }

  // Method to apply the theme using the service
  applyTheme() {
    this.themeService.toggleTheme(this.themeToggle);
  }
  
  async getResult() {
    try {
      const tokenResponse: any = await this.apiService.getToken();
      const accessToken = tokenResponse.access_token;

      const res: any = await this.apiService.getSymptomsLastCowResultAPI(
        accessToken,
        this.id
      );

      if (res.response_type === 'success') {
        this.vaccineEvent = res.data;
        this.markdownText = res.data.definition;
        this.symptomNames = res.data.symptoms_name.map(
          (symptomObj: any) => this.apiService.capitalizeUnderscore(Object.keys(symptomObj)[0])
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getCowStatus() {
    try {
      const tokenResponse: any = await this.apiService.getToken();
      const accessToken = tokenResponse.access_token;

      const res: any = await this.apiService.getCowStatusAPI(
        accessToken,
        this.id
      );

      if (res.response_type === 'success') {
        this.cowStatus = res.data;
      }
    } catch (error) {
      console.error(error);
    }
  }


  // Status Updated Form
  async onSubmit () {
    await this.apiService.showLoading();
  
    try {
      const token = await this.apiService.getToken() as any;
      const res = await this.apiService.CowUpdateStatusAPI(token.access_token, this.dataset, this.id);
  
      await this.apiService.removeLoading();
  
      if (res.response_type === 'success') {
        this.getCowStatus()
        this.apiService.displayToast(
          res.msg,
          'bottom',
          'toast-success',
          'checkmark-circle-sharp',
          'success'
        );
      }
    } catch (err) {
      await this.apiService.removeLoading();
      console.error(err);
      this.apiService.displayToast(
        'Something went wrong',
        'bottom',
        'toast-error',
        'alert-circle',
        'danger'
      );
    }
  }
}
