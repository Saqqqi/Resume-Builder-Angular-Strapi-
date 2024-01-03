import { Component } from '@angular/core';
import { Education, Experience, Resume, Language, Skill } from '../resume';
import { ResumeService } from '../resume.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-resume',
  templateUrl: './edit-resume.component.html',
  styleUrls: ['./edit-resume.component.css']
})
export class EditResumeComponent {
  ed: { startDate: Date, endDate: Date };

  resume: Resume = new Resume();
  language: any;
  resumesSubject: any;
  constructor(

    private resumeService: ResumeService,
    private router: Router,
    private route: ActivatedRoute,) {
    console.log('EditResumeComponent constructor called');
    this.ed = { startDate: new Date(), endDate: new Date() };
    this.resumesSubject = new BehaviorSubject<any[]>([]);
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }
    if (!this.resume.languages || this.resume.languages.length === 0) {
      this.resume.languages = [];
      this.resume.languages.push(new Language());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }

  }





  ngOnInit() {

    this.route.params.subscribe(params => {
      const resumeId = params['id'];

      if (resumeId) {

        this.resumeService.getResume(resumeId).subscribe(
          (resumeData: any) => {
            const attributes = resumeData?.data?.attributes;
            const ownerId = attributes.owner
            if (attributes) {
              this.resume.id = resumeId;
              this.resume.personalDetails = attributes?.Profile || {};


              this.resume.languages = attributes?.Language || [];


              this.resume.skills = attributes?.Skill || [];


              this.resume.experiences = attributes?.Experience || [];


              this.resume.educations = attributes?.Education || []
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

    console.log('Resume data before request:', resumeData);

    // Assuming your ResumeService has an updateResume method
    if (this.resume.id) {
      this.resumeService.updateResume(resumeData, this.resume.id).subscribe(
        (response: any) => {
          // Your logic here
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


  getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.resume));

    return {
      content: 'This is a sample PDF'
    };
  }

  fileChanged(e: { target: { files: any[]; }; }) {
    const file = e.target.files[0];
    this.getBase64(file);
  }

  getBase64(file: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  addSkill() {
    this.resume.skills.push(new Skill());
  }
  addLanguage() {
    this.resume.languages.push(new Language());
  }
}

