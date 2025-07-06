import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'api.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-add-cow',
  templateUrl: './add-cow.page.html',
  styleUrls: ['./add-cow.page.scss'],
})
export class AddCowPage implements OnInit {
  @ViewChild('cowForm')
  cowForm: NgForm | undefined;

  themeToggle: boolean;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.themeToggle = this.themeService.isDark();
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

  dataset = {
    image: null,
    breed: null,
    age: null,
    tag_number: null,
    date_of_birth: null,
    gender: null,
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
      const token: any = await this.apiService.getToken();
      const res: any = await this.apiService.createCow(token.access_token, this.dataset);
  
      this.apiService.removeLoading();
  
      if (res.reponse_type === 'success') {
        this.apiService.displayToast(
          res.msg,
          'bottom',
          'toast-succes',
          'checkmark-circle-sharp',
          'success'
        );
        this.router.navigate(['/home']);
      } else {
        this.apiService.displayToast(
          res.msg,
          'bottom',
          'toast-error',
          'warning-outline',
          'danger'
        );
      }
    } catch (err) {
      console.error(err);
      this.apiService.removeLoading();
    }
  }
  
}
