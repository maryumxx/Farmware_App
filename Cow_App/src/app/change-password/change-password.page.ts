import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'api.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  @ViewChild('updatePassword')
  updatePassword: NgForm | undefined;
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
  toggleChange(ev: any) {
    this.themeService.toggleTheme(ev.detail.checked);
  }
  BackBtn(){
    history.back()
  }
  dataset = {
    current_password: '',
    password: '',
    password2: '',
  };

  async onSubmitPassword() {
    await this.apiService.showLoading();
  
    try {
      const token = await this.apiService.getToken() as any;
      const res = await this.apiService.changePasswordAPI(token.access_token, this.dataset);
  
      await this.apiService.removeLoading();
  
      if (res.response_type === 'success') {
        this.apiService.displayToast(
          res.msg,
          'bottom',
          'toast-success',
          'checkmark-circle-sharp',
          'success'
        );
        this.updatePassword?.reset();
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
      await this.apiService.removeLoading();
      this.apiService.displayToast(
        'Something went wrong',
        'bottom',
        'toast-error',
        'warning-outline',
        'danger'
      );
    }
  }
  


  get passwordsMatch(): boolean {
    return (
      this.dataset.password === this.dataset.password2
    );
  }

}
