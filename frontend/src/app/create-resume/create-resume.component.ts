import { Component } from '@angular/core';
import { Resume, Education, Experience, Language, Skill } from '../resume';
import { ResumeService } from '../auth/resume.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-create-resume',
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.css']
})

export class CreateResumeComponent {
  resume: Resume = new Resume();

  constructor(
    private resumeService: ResumeService,
    private router: Router,
    private authService: AuthService
  ) {
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [new Experience()];
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [new Education()];
    }
    if (!this.resume.languages || this.resume.languages.length === 0) {
      this.resume.languages = [new Language()];
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [new Skill()];
    }
  }

  saveData() {
    const user = this.authService.getUser();

    if (user && user.id) {
      const resumeData = {
        owner: user.id,
        Profile: { ...this.resume.personalDetails },
        Language: this.resume.languages.map(language => ({ name: language.name })),
        Skill: this.resume.skills.map(skill => ({ name: skill.name })),
        Experience: this.resume.experiences,
        Education: this.resume.educations,
      };
      console.log('User information:', user);
      console.log('Resume data before request:', resumeData);
      this.resumeService.saveResume(resumeData, this.resume.id).subscribe(
        (response: any) => {
          console.log('Resume data saved successfully:', response);
        },
        (error: any) => {
          console.error('Error saving resume data:', error);
        }
      );
    } else {
      console.error('No user found or user has no valid id. Cannot save resume data.');
    }
  }

  addExperience() {
    this.resume.experiences.push(new Experience());
  }

  addEducation() {
    this.resume.educations.push(new Education());
  }

  resetForm() {
    this.resume = new Resume();
    localStorage.removeItem('resumeData');
  }

  addSkill() {
    this.resume.skills.push(new Skill());
  }

  addLanguage() {
    this.resume.languages.push(new Language());
  }
}
