import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Import AuthService

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

// resume-list-page.component.ts
private fetchResumeData() {
  const user = this.authService.getUser();
  if (user && user.owners) {
    this.resumeService.getResumesByUserId(user.id).subscribe(
      (resumes: any) => {
        this.resumes = (resumes?.data || []).filter((resume: any) => resume.attributes.owners === user.owners);
        console.log('Fetched resume data for user:', this.resumes);
      },
      (error: any) => console.error('Error fetching resume data:', error)
    );
  } else {
    console.error('No user found or user has no valid slug.');
  }
}

private subscribeToResumeChanges() {
  this.resumeService.resumes$.subscribe((resumes: any) => {
    if (Array.isArray(resumes?.data)) {
      this.resumes = resumes.data;
      console.log('Resumes$ Data:', this.resumes);
    }
  });
}




logResumeId(username: string) {
  const selectedResume = this.resumes.find((resume: any) => resume.attributes.username === username);
  if (selectedResume) {
    console.log(`Edit button clicked for resume with username: ${username}`);
    console.log('Resume Data:', selectedResume);
    // Fetch additional user data
    this.fetchAdditionalUserData(username);
    this.router.navigate(['/edit-resume', username], { state: { resume: selectedResume } });
  } else {
    console.error(`Resume with username ${username} not found.`);
  }
}
  fetchAdditionalUserData(username: string) {
    throw new Error('Method not implemented.');
  }

deleteResume(resumeId: string) {
  if (confirm('Are you sure you want to delete this resume?')) {
    this.resumeService.deleteResume(resumeId).subscribe(
      () => console.log(`Resume with ID ${resumeId} deleted successfully from both Angular and Strapi.`),
      (error: any) => console.error(`Error deleting resume with ID ${resumeId}:`, error)
    );
  }
}


  // Add this method to filter resumes based on the logged-in user's slug


  
  
  
  
}  
