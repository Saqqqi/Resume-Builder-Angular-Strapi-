import { Component } from '@angular/core';
import { Education, Experience, Resume, Language, Skill } from '../resume';
import { ResumeService } from '../resume.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-resume',
  templateUrl: './edit-resume.component.html',
  styleUrls: ['./edit-resume.component.css']
})
export class EditResumeComponent {
  ed: { startDate: Date, endDate: Date };
  resume: Resume = new Resume();

  constructor(
    private resumeService: ResumeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.ed = { startDate: new Date(), endDate: new Date() };

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

  ngOnInit() {
    this.route.params.subscribe(params => {
      const resumeId = params['id'];

      if (resumeId) {
        this.resumeService.getResume(resumeId).subscribe(
          (resumeData: any) => {
            const attributes = resumeData?.data?.attributes;

            if (attributes) {
              this.resume.id = resumeId;
              this.resume.personalDetails = attributes?.Profile || {};
              this.resume.languages = attributes?.Language || [];
              this.resume.skills = attributes?.Skill || [];
              this.resume.experiences = attributes?.Experience || [];
              this.resume.educations = attributes?.Education || [];
            } else {
              console.error('Invalid resume data structure:', resumeData);
            }
          },
          (error: any) => {
            console.error('Error fetching resume data:', error);
          }
        );
      }
    });
  }

  saveData() {
    const resumeData = {
      Profile: this.resume.personalDetails,
      Language: this.resume.languages.map(language => ({ id: language.id, name: language.name })),
      Skill: this.resume.skills.map(skill => ({ id: skill.id, name: skill.name })),
      Experience: this.resume.experiences,
      Education: this.resume.educations,
    };

    if (this.resume.id) {
      this.resumeService.updateResume(resumeData, this.resume.id).subscribe(
        (response: any) => {
        },
        (error: any) => {
          console.error('Error updating resume:', error);
        }
      );
    } else {
      console.error('Cannot update resume: ID is undefined');
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
