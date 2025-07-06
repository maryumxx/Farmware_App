import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'api.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-cow-detail',
  templateUrl: './cow-detail.page.html',
  styleUrls: ['./cow-detail.page.scss'],
})
export class CowDetailPage implements OnInit, AfterViewInit {
  cow: any = {
    age: null,
    breed: null,
    date_of_birth: null,
    gender: null,
    id: null,
    image: null,
    tag_number: null,
  };
  domain: any = this.apiService.localhost;
  id: any;
  themeToggle: boolean;

  constructor(
    private apiService: ApiService,
    private themeService: ThemeService,
    private router: Router,
    private urlParam: ActivatedRoute
  ) {
    this.id = this.urlParam.snapshot.paramMap.get('id');
    this.themeToggle = this.themeService.isDark();
    localStorage.removeItem('disease');
  }

  ngOnInit() {
    // Initialize theme
    this.themeService.toggleTheme(this.themeToggle);
    this.getCowSingle(); // Fetch the cow data
  }

  ngAfterViewInit() {
    // Check for navigation state on this page
    const navigation = this.router.getCurrentNavigation() as any;
    if (navigation?.extras?.state?.updated) {
      // Call your function to refresh the cow details
      this.getCowSingle();
    }
  }

  // Function to fetch cow details from API
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

  BackBtn() {
    history.back();
  }
}
