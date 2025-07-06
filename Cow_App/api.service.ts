import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';
import { Platform } from '@ionic/angular';
import { ToastController, LoadingController } from '@ionic/angular';
import {
  Router,
  NavigationStart,
  Event as NavigationEvent,
} from '@angular/router';
import * as $ from 'jquery';
// import { Storage } from '@ionic/storage-angular';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public frontEndDomain = 'http://localhost:8100';
  public domain = 'http://http://159.65.40.62';
  localhost: string = 'http://http://159.65.40.62';

  previousUrl: string = '';
  plt: string;
  web_get_restricted = 0;
  web_post_restricted = 0;
  web_put_restricted = 0;
  web_delete_restricted = 0;

  android_get_restricted = 0;
  android_post_restricted = 0;
  android_put_restricted = 0;
  android_delete_restricted = 0;

  ios_get_restricted = 0;
  ios_post_restricted = 0;
  ios_put_restricted = 0;
  ios_delete_restricted = 0;

  success_model_is_open = false;

  constructor(
    private platform: Platform,
    public toastController: ToastController,
    private router: Router,
    // private storage: Storage,
    private _location: Location,
    private loadingCtrl: LoadingController
  ) {
    this.plt = this.platform.is('mobileweb')
      ? 'web'
      : this.platform.is('ios')
      ? 'ios'
      : 'android';
    this.localhost = 'http://159.65.40.62';
  }

  private loading: HTMLIonLoadingElement | null = null;

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await this.loading.present();
  }

  async removeLoading() {
    if (this.loading) {
      await this.loadingCtrl.dismiss();
      this.loading = null;
    }
  }

  async signup(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/signup/`, options)
        .then(async (response) => {
          const data = await response.json();

          if (data.reponse_type == 'success') {
            var access_token = data.token.access;
            var refrash_token = data.token.refresh;
            this.saveTokens(access_token, refrash_token);

            resolve(data);
          } else {
            this.displayToast(
              data.msg,
              'bottom',
              'toast-error',
              'warning-outline',
              'danger'
            );
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async login(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/login/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.success) {
            var access_token = data.success.token.access;
            var refrash_token = data.success.token.refresh;
            this.saveTokens(access_token, refrash_token);

            resolve(data);
          } else {
            this.displayToast(
              data.errors.non_field_errors[0],
              'bottom',
              'toast-error',
              'warning-outline',
              'danger'
            );
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async checkUserId(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/check-uid/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async otpType(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/send-otp/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async TwoFvOtp(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/2fv-otp/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            var access_token = data.token.access;
            var refrash_token = data.token.refresh;
            this.saveTokens(access_token, refrash_token);
            this.tempRemoveTokens();
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async VerifyOtp(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/check-otp/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async resetPasswordAPI(credentials: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = credentials;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/reset-password/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async AccessTokenvalid(access_token: any, refrash_token: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

      fetch(`${this.localhost}/Tokenvalidcheck/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.success == 'You are authenticated!') {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async RefrashTokenvalid(refrash_token: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const data = { RefrashToken: refrash_token };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/refrashToken/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            this.saveTokens(data.token.access, data.token.refresh);
          }
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async ForgetPassword(data: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/forgot-password/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch(async (e) => {
          this.displayToast(
            e,
            'bottom',
            'toast-error',
            'warning-outline',
            'danger'
          );
        });
    });
  }

  async getProfileAPI(access_token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/profile/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async profileUpdate(access_token: string, data: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/update-profile/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  async changePasswordAPI(access_token: string, data: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/changepassword/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  // token handel
  async saveTokens(access: string, refresh: string): Promise<void> {
    await SecureStoragePlugin.set({ key: 'access_token', value: access });
    await SecureStoragePlugin.set({ key: 'refresh_token', value: refresh });
  }

  async getToken(): Promise<Object> {
    const access_token = await SecureStoragePlugin.get({ key: 'access_token' });
    const refrash_token = await SecureStoragePlugin.get({
      key: 'refresh_token',
    });

    return {
      access_token: access_token.value,
      refrash_token: refrash_token.value,
    };
  }

  async removeTokens(): Promise<void> {
    await SecureStoragePlugin.remove({ key: 'access_token' });
    await SecureStoragePlugin.remove({ key: 'refrash_token' });
    // this.displayToast("Account Logout" , 'bottom' , 'toast-success' , 'checkmark-circle-sharp' , 'success')
    this.router.navigate(['/login']);
  }

  // Temp Token
  async tempSaveTokens(access: string, refresh: string): Promise<void> {
    await SecureStoragePlugin.set({ key: 'temp_access_token', value: access });
    await SecureStoragePlugin.set({
      key: 'temp_refresh_token',
      value: refresh,
    });
  }

  async tempGetToken(): Promise<Object> {
    const access_token = await SecureStoragePlugin.get({
      key: 'temp_access_token',
    });
    const refrash_token = await SecureStoragePlugin.get({
      key: 'temp_refresh_token',
    });

    return {
      temp_access_token: access_token.value,
      temp_refresh_token: refrash_token.value,
    };
  }

  async tempRemoveTokens(): Promise<void> {
    await SecureStoragePlugin.remove({ key: 'temp_access_token' });
    await SecureStoragePlugin.remove({ key: 'temp_refresh_token' });
  }

  displayToast(msg: any, pos: any, tclass: any, type: any, color: any) {
    // Stop multiple toasts
    try {
      this.toastController
        .dismiss()
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          console.log('Closed');
        });
    } catch (e) {}

    this.toastController
      .create({
        message: msg,
        position: pos,
        duration: 3000,
        cssClass: tclass,
        color: color,
        buttons: [
          {
            side: 'start',
            icon: type,
            handler: () => {
              console.log('');
            },
          },
          {
            side: 'end',
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('');
            },
          },
        ],
      })
      .then((toast) => {
        toast.present();
      });
  }

  // Cow Adding Service API
  async createCow(access_token: string, data: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/cow-create/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  // Get All Cow Service API
  async getCowList(access_token: string, query: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/cow-list/?search=${query}`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  // Get Single Cow Service API
  async getCowSingleAPI(access_token: string, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/cow-detail/${id}`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  // Cow Adding Service API
  async updateCow(access_token: string, data: any, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/cow-update/${id}/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.reponse_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  // Event Adding Service API
  async createEvent(access_token: string, data: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/event-create/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  // Event Adding Service API
  async getEventAPI(access_token: string, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/event-list/?cow_id=${id}`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  // Get  Cow Symptoms Service API
  async getSymptomsAPI(access_token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-symptoms/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  // Create Predict Disease With Reason API
  async createPredictDiseaseAPI(access_token: string, data: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/predict-disease/`, options)
        .then(async (response) => {
          const data = await response.json();
          console.log(data)
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }


  // Get All Vaccine Disease with Specific Cow Service API
   async getSymptomsAllEventAPI(access_token: string, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-symptoms-all-event/${id}/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }


  // Get All Vaccine Disease with Specific Cow Service API
  async getSymptomsLastCowResultAPI(access_token: string, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-symptoms-last-cow-result/${Number(id)}/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }


  async getSymptomsSpecificCowAPI(access_token: string, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-symptoms-specific-cow/${Number(id)}/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }


  async getCowStatusAPI(access_token: string, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      };
      fetch(`${this.localhost}/get-cow-status/${id}/`, options)
        .then(async (response) => {
          const data = await response.json();
          resolve(data);
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }


  async CowUpdateStatusAPI(access_token: string, data: any, id: any): Promise<any> {
    return new Promise<any>((resolve) => {
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      fetch(`${this.localhost}/get-cow-update-status/${id}/`, options)
        .then(async (response) => {
          const data = await response.json();
          if (data.response_type == 'success') {
            resolve(data);
          } else {
            resolve(data);
          }
        })
        .catch((e) => {
          resolve(e);
        });
    });
  }

  formatDate = (date: any) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  capitalizeUnderscore(value: string): string {
    if (!value) return '';
    return value
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1)); // Capitalize each word
  }

  reverseCapitalizeUnderscore(value: string): string {
    if (!value) return '';
    return value
      .toLowerCase()       // Convert all to lowercase
      .replace(/\s+/g, '_'); // Replace spaces with underscores
  }
}
