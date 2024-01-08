import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../auth/resume.service'; 
@Component({
  selector: 'app-preview-resume',
  templateUrl: './preview-resume.component.html',
  styleUrls: ['./preview-resume.component.css']
})
export class PreviewResumeComponent {
  esumeId: string | undefined;
  resumeDetails: any;

  constructor(private route: ActivatedRoute, private resumeService: ResumeService) {}

  ngOnInit() {
   
    this.esumeId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('Resume ID:', this.esumeId);

   
    this.resumeService.getResume(this.esumeId).subscribe(
      (response: any) => {
        this.resumeDetails = response.data.attributes;
        console.log('Preview Resume Details:', this.resumeDetails);
      },
      
      (error) => {
        console.error('Error fetching resume details:', error);
      }
    );
  }

  
}
