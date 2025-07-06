import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from 'api.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('fullForm')
  fullForm: NgForm | undefined;
  themeToggle: boolean;

  constructor(
    private themeService: ThemeService,
    private apiService: ApiService,
    private route: Router,
  ) {
    this.themeToggle = this.themeService.isDark();
  }

  ngOnInit() {
    this.themeService.toggleTheme(this.themeToggle);
    // Additional initialization if needed
  }

  dataset = {
    username: '',
    email: '',
    password: '',
  };

  onSubmitFullForm(form: NgForm) {
    this.apiService.showLoading();

    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.apiService
    .signup(this.dataset)
      .then(async (res: any) => {
        this.apiService.removeLoading();

        if (res.reponse_type == 'success') {
          this.route.navigate(['/login']);
        }
      })
      .catch(async (err: any) => {
        this.apiService.removeLoading();
        console.log(err);
      });
  }
}
