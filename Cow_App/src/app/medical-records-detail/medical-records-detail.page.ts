import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-medical-records-detail',
  templateUrl: './medical-records-detail.page.html',
  styleUrls: ['./medical-records-detail.page.scss'],
})
export class MedicalRecordsDetailPage implements OnInit {
  @ViewChild('statusForm')
  statusForm: NgForm | undefined;
  themeToggle: boolean;
  vaccineEvent: any = null;
  id: any;
  cowStatus: any;
  symptomNames: any = null;
  markdownText: any;

  dataset: any = {
    current_status: '',
  };

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

      const res: any = await this.apiService.getSymptomsSpecificCowAPI(
        accessToken,
        this.id
      );

      if (res.response_type === 'success') {
        this.vaccineEvent = res.data;
        this.markdownText = res.data.definition;
        this.symptomNames = res.data.symptoms_name.map(
          (symptomObj: any) => this.apiService.capitalizeUnderscore((Object.keys(symptomObj)[0]))
        );
        this.getCowStatus(res.data.cow);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getCowStatus(id: any) {
    try {
      const tokenResponse: any = await this.apiService.getToken();
      const accessToken = tokenResponse.access_token;

      const res: any = await this.apiService.getCowStatusAPI(
        accessToken,
        id
      );

      if (res.response_type === 'success') {
        this.cowStatus = res.data;
      }
    } catch (error) {
      console.error(error);
    }
  }
}
