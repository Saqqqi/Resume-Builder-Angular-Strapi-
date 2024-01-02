import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
 
  private apiUrl = 'http://localhost:1337/api';
  private resumesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public resumes$: Observable<any[]> = this.resumesSubject.asObservable();

  constructor(private http: HttpClient,
    private authservice:AuthService) { }

  private updateResumes(resumes: any[]) {
    this.resumesSubject.next(resumes);
  }

  getAllResumes(): Observable<any> {
    const apiUrlWithPopulate = `${this.apiUrl}/resumes?populate=*&filters[owners][$in]=${this.authservice.getUser().id}`;
    return this.http.get(apiUrlWithPopulate).pipe(
      tap((response: any) => {
        console.log('Fetched All Resumes:', response);
        const resumeData = response.data.attributes;
        this.updateResumes([resumeData]);
      }),
      catchError((error) => {
        console.error('Error fetching all resumes:', error);
        throw error;
      })
    );
  }

  saveResume(resumeData: any, resumeId?: string): Observable<any> {
    const url = resumeId ? `${this.apiUrl}/resumes/${resumeId}` : `${this.apiUrl}/resumes?populate=*`;

    return this.http.post(url, { data: resumeData }).pipe(
      tap((response: any) => {
        console.log('Save Resume Response:', response);
        const updatedResumes = [...this.resumesSubject.value, response.data];
        this.updateResumes(updatedResumes);
      })
    );
  }

  updateResume(resumeData: any, resumeId: string): Observable<any> {
    const url = `${this.apiUrl}/resumes/${resumeId}?populate=*`;

    return this.http.put(url, { data: resumeData }).pipe(
      tap((response: any) => {
        console.log('Update Resume Response:', response);
        const updatedResumes = this.resumesSubject.value.map(resume => (resume.id === resumeId) ? response.data : resume);
        this.updateResumes(updatedResumes);
      })
    );
  }

  deleteResume(resumeId: string): Observable<any> {
    const url = `${this.apiUrl}/resumes/${resumeId}`;

    return this.http.delete(url).pipe(
      tap(() => {
        console.log('Delete Resume Response:', resumeId);
        this.resumes$.subscribe((resumes: any) => {
          const updatedResumes = (Array.isArray(resumes?.data) ? resumes.data : []).filter((resume: { id: string; }) => resume?.id !== resumeId);
          this.resumesSubject.next(updatedResumes);
        });
      }),
      catchError((error) => {
        console.error('Error deleting resume:', error);
        throw error;
      })
    );
  }

  getResumesByUserSlug(userSlug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumes?populate=*&userSlug=${userSlug}`);
  }
  getResumesByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumes?populate=*&userId=${userId}`);
  }
  
  getResume(resumeId: any): Observable<any> {
    const url = `${this.apiUrl}/resumes/${resumeId}?populate=*`;
    return this.http.get(url).pipe(
      tap((response: any) => {
        console.log('Fetched Resume:', response);
      }),
      catchError((error) => {
        console.error('Error fetching resume:', error);
        throw error;
      })
    );
  }

  getResumeById(id: string): Observable<any> {
    const url = `${this.apiUrl}/resumes/${id}?populate=*`;
    return this.http.get(url);
  }}
