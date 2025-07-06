import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'api.service';
import * as $ from 'jquery'
import { ThemeService } from '../theme.service';
@Component({
  selector: 'app-update-cow',
  templateUrl: './update-cow.page.html',
  styleUrls: ['./update-cow.page.scss'],
})
export class UpdateCowPage implements OnInit {
  @ViewChild('cowFormUpdate')
  cowForm: NgForm | undefined;
  id: any;
  cow: any = null;
  domain: any = this.apiService.localhost;

  themeToggle: boolean;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private apiService: ApiService,
    private urlParam: ActivatedRoute
  ) {
    this.themeToggle = this.themeService.isDark();
    this.id = this.urlParam.snapshot.paramMap.get('id');
    this.getCowSingle();

  }
  ngOnInit() {
    this.themeService.toggleTheme(this.themeToggle);
  }

  BackBtn() {
    history.back();
  }

  Back() {
    history.back();
  }

  dataset:any = {
    image: null,
    breed: null,
    age: null,
    tag_number: null,
    date_of_birth: null,
    gender: null,
    current_status: null,
    
  };

  cowImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.dataset.image = reader.result as any;
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit() {
    await this.apiService.showLoading();
  
    try {
      const token = await this.apiService.getToken() as any;
      const res = await this.apiService.updateCow(token.access_token, this.dataset, this.id);
  
      await this.apiService.removeLoading();
  
      if (res.reponse_type === 'success') {
        this.apiService.displayToast(
          res.msg,
          'bottom',
          'toast-succes',
          'checkmark-circle-sharp',
          'success'
        );
        $("#cow_image").attr('src', this.domain + res.data.image)
        $("#cow_tag_number").text(this.dataset.tag_number)
        $("#cow_gender").text(this.dataset.gender)
        $("#cow_breed").text(this.dataset.breed)
        $("#cow_date_of_birth").text(this.dataset.date_of_birth)
        $("#cow_age").text(this.dataset.age)

        this.router.navigate([`/cow-detail`, this.id], { state: { updated: true } });
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
  


  getCowSingle() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getCowSingleAPI(e.access_token, this.id)
          .then(async (res: any) => {
            if (res.response_type == 'success') {
              this.dataset.gender = res.data.gender
              this.dataset.breed = res.data.breed
              this.dataset.age = res.data.age
              this.dataset.date_of_birth = res.data.date_of_birth
              this.dataset.tag_number = res.data.tag_number
              this.dataset.current_status = res.data.current_status
              
            }
          })
          .catch(async (err: any) => {
            console.log(err);
          });
      })
      .catch((err: any) => {
        console.error(err);
      });
  }
}