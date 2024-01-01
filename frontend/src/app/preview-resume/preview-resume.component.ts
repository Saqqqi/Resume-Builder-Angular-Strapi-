import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../resume.service'; 
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
  downloadResumeAsImage() {
    // Assuming you have a method in your resume service that generates an image URL
    this.resumeService.generateResumeImageUrl(this.resumeDetails).subscribe(
      (imageUrl: string) => {
        // Create a link element
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'resume_image.png'; // You can set the desired filename
    
        // Append the link to the document and trigger the click event to start the download
        document.body.appendChild(link);
        link.click();
    
        // Remove the link from the document
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error generating resume image URL:', error);
      }
    );
  }
  
}
