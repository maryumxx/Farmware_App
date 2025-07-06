import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'api.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.page.html',
  styleUrls: ['./questionnaire.page.scss'],
})
export class QuestionnairePage implements AfterViewInit {
  selectedDiseases: Set<string> = new Set(); // Holds the currently selected diseases
  diseases: string[] = [];
  results: string[] = [] ;
  themeToggle: boolean;
  id: any; // Holds the ID from the URL parameter
  urlParamData: any;

  urlDataExist = false;

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private apiService: ApiService,
    private urlParam: ActivatedRoute
  ) {
    this.id = this.urlParam.snapshot.paramMap.get('id');
    this.themeToggle = this.themeService.isDark();
    this.getSymptoms(); // Fetch symptoms on initialization

    this.urlParam.queryParams.subscribe((params) => {
      if (params['base_symptoms']) {
        this.urlDataExist = true;
        this.urlParamData = {
          base_symptoms: params['base_symptoms'],
          user_define_symptoms: params['user_define_symptoms'],
        };
      } else {
        this.urlDataExist = false;
      }
    });
  }

  ngAfterViewInit() {
    this.applyTheme(); // Apply theme after view initialization
  }

  // Method to apply the theme using the service
  applyTheme() {
    this.themeService.toggleTheme(this.themeToggle);
  }

  // Method to go back to the previous page
  BackBtn() {
    history.back();
  }

  // Logic to handle disease selection (multiple selections allowed)
  toggleDiseaseSelection(disease: string): void {
    if (this.selectedDiseases.has(disease)) {
      this.selectedDiseases.delete(disease); // Deselect if already selected
    } else {
      this.selectedDiseases.add(disease); // Add to selected diseases
    }

    // Convert Set to object with 0/1 values
    const diseaseObj: { [key: string]: number } = {};
    this.diseases.forEach((d) => {
      diseaseObj[d] = this.selectedDiseases.has(d) ? 1 : 0;
    });

    // Save to localStorage
    localStorage.setItem('disease', JSON.stringify(diseaseObj));
  }

  getSymptoms() {
    this.apiService
      .getToken()
      .then((e: any) => {
        this.apiService
          .getSymptomsAPI(e.access_token)
          .then(async (res: any) => {
            if (res.response_type == 'success') {
              this.diseases = res.symptoms;
              this.results = [...this.diseases]
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

  //
  async onSubmitData() {
    try {
      this.apiService.showLoading();
      const tokenResponse: any = await this.apiService.getToken();
      const accessToken = tokenResponse.access_token;

      const data: any = {
        cowId: this.id,
        symptoms_base_on_time: this.urlParamData.base_symptoms,
        user_summarized_symptoms: this.urlParamData.user_define_symptoms,
        diseases: JSON.parse(localStorage.getItem('disease') || '[]') as any[],
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

  

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase() || '';
    this.results = this.diseases.filter((d) => d.toLowerCase().includes(query));
  }

  trackDisease(index: number, disease: string): string {
    return disease;
  }
}
