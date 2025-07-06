import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'api.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.page.html',
  styleUrls: ['./medical-records.page.scss'],
})
export class MedicalRecordsPage implements OnInit {
  @ViewChild('statusForm')
  statusForm: NgForm | undefined;

  themeToggle: boolean;
  id: any;
  eventList: any[] = [];
  cowStatus: any;
  checkupDate: any = null;

  dataset:any = {
    current_status: '',
  }

  cow: any = {
    age: null,
    breed: null,
    date_of_birth: null,
    gender: null,
    id: null,
    image: null,
    tag_number: null,
  };

  constructor(
    private themeService: ThemeService,
    private apiService: ApiService,
    private route: Router,
    private urlParam: ActivatedRoute
  ) {
    this.themeToggle = this.themeService.isDark();
    this.id = this.urlParam.snapshot.paramMap.get('id');
    this.getSymptomsAllEvent();
    this.getCowStatus()
    this.getCheckupDate();
    this.getCowSingle()
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  ngOnInit() {
    this.themeService.toggleTheme(this.themeToggle);
    // Additional initialization if needed
  }
  BackBtn() {
    history.back();
  }

  NextBtn() {
    this.route.navigate([`/questionnaire2/${this.id}`]);
  }

  // GET ALL EVENTS
  async getSymptomsAllEvent() {
    try {
      const token = (await this.apiService.getToken()) as any;
      const res = await this.apiService.getSymptomsAllEventAPI(
        token.access_token,
        this.id
      );

      if (res.response_type === 'success') {
        this.eventList = res.data
      }
    } catch (err) {
      console.error(err);
    }
  }

  // GET Cow Status
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


  // GEt All CheckUpDAte

  async getCheckupDate() {
    try {
      const tokenResponse: any = await this.apiService.getToken();
      const accessToken = tokenResponse.access_token;

      const res: any = await this.apiService.getSymptomsLastCowResultAPI(
        accessToken,
        this.id
      );

      if (res.response_type === 'success') {
        this.checkupDate = res.data.date;
      }
    } catch (error) {
      console.error(error);
    }
  }
  

  getCowSingle() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getCowSingleAPI(e.access_token, this.id)
          .then(async (res: any) => {
            if (res.response_type == 'success') {
              this.cow = {
                ...res.data,
                date_of_birth: this.apiService.formatDate(
                  res.data.date_of_birth
                ),
              };
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }
}
