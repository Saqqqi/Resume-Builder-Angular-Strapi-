
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth/auth.guard';
import { CreateResumeComponent } from './create-resume/create-resume.component';
import { EditResumeComponent } from './edit-resume/edit-resume.component';
import { PreviewResumeComponent } from './preview-resume/preview-resume.component';
import { ResumeListPageComponent } from './resume-list-page/resume-list-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent }
    ]
  },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resume-list', component: ResumeListPageComponent, canActivate: [AuthGuard] },
  { path: 'create-resume', component: CreateResumeComponent, canActivate: [AuthGuard] },
  { path: 'edit-resume', component: EditResumeComponent, canActivate: [AuthGuard] },
  { path: 'edit-resume/:id', component: EditResumeComponent, canActivate: [AuthGuard] },
  { path: 'preview-resume', component: PreviewResumeComponent, canActivate: [AuthGuard] },
  { path: 'preview-resume/:id', component: PreviewResumeComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }