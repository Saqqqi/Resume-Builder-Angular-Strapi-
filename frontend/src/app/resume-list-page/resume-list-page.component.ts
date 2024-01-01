import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscribeToResumeChanges();
    this.fetchResumeData();
  }

  private fetchResumeData() {
    const user = this.authService.getUser();

    if (!user || !user.slug) {
      console.error('No user found or user has no valid slug.');
      return;
    }

    this.resumeService.getResumesByUserSlug(user.slug).subscribe(
      (resumes: any) => {
        this.resumes = (resumes?.data || []).filter((resume: any) => resume.attributes.slug === user.slug);
        console.log(`Fetched resume data for user: ${user.slug}`, this.resumes);

      },
      (error: any) => console.error('Error fetching resume data:', error)
    );
  }

  private subscribeToResumeChanges() {
    this.resumeService.resumes$.subscribe((resumes: any) => {
      if (Array.isArray(resumes?.data)) {
        this.resumes = resumes.data;
        console.log('Resumes$ Data:', this.resumes);
      }
    });
  }

  logResumeId(resumeId: string) {
    const selectedResume = this.resumes.find((resume: { id: string }) => resume.id === resumeId);

    if (selectedResume) {
      console.log(`Edit button clicked for resume with ID: ${resumeId}`);
      console.log('Resume Data:', selectedResume);
      this.router.navigate(['/edit-resume', resumeId], { state: { resume: selectedResume } });
    } else {
      console.error(`Resume with ID ${resumeId} not found.`);
    }
  }

  deleteResume(resumeId: string) {
    if (confirm('Are you sure you want to delete this resume?')) {
      this.resumeService.deleteResume(resumeId).subscribe(
        () => console.log(`Resume with ID ${resumeId} deleted successfully from both Angular and Strapi.`),
        (error: any) => console.error(`Error deleting resume with ID ${resumeId}:`, error)
      );
    }
  }
}
