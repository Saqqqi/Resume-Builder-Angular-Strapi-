import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../auth/resume.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service'; // Import AuthService

@Component({
  selector: 'app-resume-list-page',
  templateUrl: './resume-list-page.component.html',
  styleUrls: ['./resume-list-page.component.css']
})
export class ResumeListPageComponent implements OnInit {
  resumes: any;

  constructor(
    private resumeService: ResumeService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    this.subscribeToResumeChanges();
    this.fetchResumeData();

  }

  private fetchResumeData() {
    this.resumeService.getAllResumes().subscribe(
      (resumes: any) => {
        // Ensure the response is an array
        this.resumes = Array.isArray(resumes?.data) ? resumes.data : [];
      },
      (error: any) => {
        // Handle error
      }
    );
  }
  
  private subscribeToResumeChanges() {
    this.resumeService.resumes$.subscribe((resumes: any) => {
      // Update resumes with an array (resumes.data)
      this.resumes = Array.isArray(resumes?.data) ? resumes.data : [];
    });
  }
  
  logResumeId(resumeId: string) {
    const selectedResume = this.resumes.find((resume: { id: string }) => resume.id === resumeId);
    if (selectedResume) {
      // console.log(`Edit button clicked for resume with ID: ${resumeId}`);
      console.log('Resume Data:', selectedResume);
      this.router.navigate(['/edit-resume', resumeId], { state: { resume: selectedResume } });
    } else {
      // console.error(`Resume with ID ${resumeId} not found.`);
    }
  }

  deleteResume(resumeId: string) {
    if (confirm('Are you sure you want to delete this resume?')) {
      this.resumeService.deleteResume(resumeId).subscribe(
        () => {
          console.log(`Resume with ID ${resumeId} deleted successfully from both Angular and Strapi.`);
        },
        (error: any) => {
          console.error(`Error deleting resume with ID ${resumeId}:`, error);
        }
      );
    }
  }

  // Add this method to filter resumes based on the logged-in user's slug

  
  
  
}  
