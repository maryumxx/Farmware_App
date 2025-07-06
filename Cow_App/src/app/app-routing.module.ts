import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from 'authguard.guard';
import { PageguardGuard } from 'pageguard.guard';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
    canActivate: [AuthguardGuard],
  },
  {
    path: 'add-cow',
    loadChildren: () => import('./add-cow/add-cow.module').then( m => m.AddCowPageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'cow-detail/:id',
    loadChildren: () => import('./cow-detail/cow-detail.module').then( m => m.CowDetailPageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'medical-records/:id',
    loadChildren: () => import('./medical-records/medical-records.module').then( m => m.MedicalRecordsPageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'questionnaire/:id',
    loadChildren: () => import('./questionnaire/questionnaire.module').then( m => m.QuestionnairePageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'result/:id',
    loadChildren: () => import('./result/result.module').then( m => m.ResultPageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'questionnaire2/:id',
    loadChildren: () => import('./questionnaire2/questionnaire2.module').then( m => m.Questionnaire2PageModule),
    canActivate: [PageguardGuard],
  },
  
  {
    path: 'questionnaire-guide',
    loadChildren: () => import('./questionnaire-guide/questionnaire-guide.module').then( m => m.QuestionnaireGuidePageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'update-cow/:id',
    loadChildren: () => import('./update-cow/update-cow.module').then( m => m.UpdateCowPageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    canActivate: [PageguardGuard],
  },
  {
    path: 'medical-records-detail/:id',
    loadChildren: () => import('./medical-records-detail/medical-records-detail.module').then( m => m.MedicalRecordsDetailPageModule),
    canActivate: [PageguardGuard],
  },  {
    path: 'quick-report-generate',
    loadChildren: () => import('./quick-report-generate/quick-report-generate.module').then( m => m.QuickReportGeneratePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
