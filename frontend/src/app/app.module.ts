import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ResumeListPageComponent } from './resume-list-page/resume-list-page.component';
import { CreateResumeComponent } from './create-resume/create-resume.component';
import { EditResumeComponent } from './edit-resume/edit-resume.component';
import { PreviewResumeComponent } from './preview-resume/preview-resume.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthService } from './auth/auth.service';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ResumeListPageComponent,
    CreateResumeComponent,
    EditResumeComponent,
    PreviewResumeComponent,
    NavBarComponent,
    LoginComponent,
    SignUpComponent,
    UserProfileComponent
  ],
  imports: [
    HttpClientModule,

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
