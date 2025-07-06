import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('userLogin')
  userLogin: NgForm | undefined;
  themeToggle: boolean;

  constructor(
    private themeService: ThemeService,
    private apiService: ApiService,
    private route: Router
  ) {
    this.themeToggle = this.themeService.isDark();
  }

  ngOnInit() {
    this.themeService.toggleTheme(this.themeToggle);
    // Additional initialization if needed
  }

  dataset = {
    username: '',
    password: '',
  };

  onSubmit(form: NgForm) {
    this.apiService.showLoading();

    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }

    this.apiService
      .login({ ...this.dataset })
      .then(async (res: any) => {
        this.apiService.removeLoading();
        if (res.success.msg == 'Login Success') {
          this.route.navigate([`/home`]);
        } else {
          return;
        }
      })
      .catch(async (err: any) => {
        this.apiService.removeLoading();
        return;
      });
    this.apiService.removeLoading();
  }
}
