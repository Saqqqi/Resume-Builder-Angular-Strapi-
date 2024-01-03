import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiUrl = 'http://localhost:1337/api';

  // BehaviorSubject to manage the resumes data
  private resumesSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public resumes$: Observable<any[]> = this.resumesSubject.asObservable();

  constructor(private http: HttpClient,
    private authservice: AuthService) { }





  // Private method to update resumes data in BehaviorSubject
  private updateResumes(resumes: any[]) {
    this.resumesSubject.next(resumes);
  }


  // Method to get all resumes for the logged-in user
 // Method to get all resumes for the logged-in user
// Method to get all resumes for the logged-in user
getAllResumes(): Observable<any> {
  const userId = this.authservice.getUser()?.id;
  const apiUrlWithPopulate = `${this.apiUrl}/resumes?populate=*&filters[owner]=${userId}`;
  
  console.log('API URL with Populate:', apiUrlWithPopulate);

  return this.http.get(apiUrlWithPopulate).pipe(
    tap((resumeList: any) => {
      console.log('Received Resumes:', resumeList);
    })
  );
}




  // Method to save a new resume or update an existing one
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

  // Method to update an existing resume
  updateResume(resumeData: any, resumeId: string): Observable<any> {
    const url = `${this.apiUrl}/resumes/${resumeId}?populate=*`;

    return this.http.put(url, { data: resumeData }).pipe(
      tap((response: any) => {
        console.log('Update Resume Response:', response);
        this.updateResumes(response.data);
      })
    );
  }


  // Method to delete a resume
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


  // Method to get details of a specific resume
// Method to get details of a specific resume
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

}
