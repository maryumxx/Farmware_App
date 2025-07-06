import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'api.service';

@Component({
  selector: 'app-questionnaire2',
  templateUrl: './questionnaire2.page.html',
  styleUrls: ['./questionnaire2.page.scss'],
})
export class Questionnaire2Page implements AfterViewInit {
  selectedDisease: string = '';
  diseases: string[] = [
    'Less than a day',
    '1-3 days',
    'More than 3 days',
    'I’m not sure',
  ];
  id: any;
  themeToggle: boolean;
  user_define_symptoms: string = '';

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private apiService: ApiService,
    private urlParam: ActivatedRoute
  ) {
    this.id = this.urlParam.snapshot.paramMap.get('id');
    this.themeToggle = this.themeService.isDark();
  }

  ngAfterViewInit() {
    this.applyTheme(); // Apply theme after view initialization
  }

  async onSubmitData() {
    try {
      this.apiService.showLoading();
      const tokenResponse: any = await this.apiService.getToken();
      const accessToken = tokenResponse.access_token;
      console.log(this.user_define_symptoms);
      const data: any = {
        cowId: this.id,
        symptoms_base_on_time: this.selectedDisease,
        user_summarized_symptoms: this.user_define_symptoms,
        diseases: JSON.parse(localStorage.getItem('disease') || '[]') as any,
      };

      const response: any = await this.apiService.createPredictDiseaseAPI(
        accessToken,
        data
      );

      console.log(response);

      this.apiService.removeLoading();
      if (response.response_type === 'success') {
        localStorage.removeItem('disease');
        this.router.navigate([`/result`, this.id]);
      }
    } catch (error) {
      this.apiService.removeLoading();
      console.error(error);
    }
  }
  // Method to apply the theme using the service
  applyTheme() {
    this.themeService.toggleTheme(this.themeToggle);
  }
  BackBtn() {
    history.back();
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
}
