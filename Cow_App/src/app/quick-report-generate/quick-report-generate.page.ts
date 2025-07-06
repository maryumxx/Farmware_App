import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'api.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-quick-report-generate',
  templateUrl: './quick-report-generate.page.html',
  styleUrls: ['./quick-report-generate.page.scss'],
})
export class QuickReportGeneratePage {
  @ViewChild('cowForm')
  cowForm: NgForm | undefined;
  cowList: any[] = [];
  diseases: string[] = [
    'Less than a day',
    '1-3 days',
    'More than 3 days',
    'I’m not sure',
  ];

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.getCow();
  }

  dataset = {
    cow_select: null,
    base_symptoms: null,
    user_define_symptoms: null
  };

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

  async onSubmit() {
    this.router.navigate(['/questionnaire', this.dataset.cow_select], {
      queryParams: this.dataset,
    });
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
}
