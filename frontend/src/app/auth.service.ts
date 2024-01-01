import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly USER_KEY = 'user';
  private apiUrl = 'http://localhost:1337';

  constructor(private router: Router, private http: HttpClient) { }
  getProfileImagePath(): string {
    // Add logic to retrieve the profile image path from the user data
    // For now, just returning a placeholder path
    return 'path/to/profile-icon.png';
  }
  // authService.login method
  login(email: string, password: string): Promise<boolean> {
    const userData = { identifier: email, password };
    return this.http.post(`${this.apiUrl}/api/auth/local`, userData)
      .toPromise()
      .then((response: any) => {
        const isAuthenticated = response?.jwt !== undefined;
        if (isAuthenticated) {
          const { email, username } = response.user;
          const slug = response.user.slug;
          console.log('Slug before saving resume data:', slug);
          localStorage.setItem(this.USER_KEY, JSON.stringify({ email, username, slug }));
          console.log('Login successful ======>>>>>>>', username);

        }
        return isAuthenticated;
      })
      .catch(this.handleError);
  }

  getResumesByUserSlug(userSlug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumes?userSlug=${userSlug}`);
  }


  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }

  getUser(): any {
    const userString = localStorage.getItem(this.USER_KEY);
    return userString ? JSON.parse(userString) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }


  signUp(firstName: string, lastName: string, email: string, password: string): void {
    const uniqueId = this.generateUniqueId();
    const slug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${uniqueId}`;
    const username = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`; // Adjust as needed
    const userData = { first_name: firstName, last_name: lastName, username, email, password, user_type: '1', slug };

    this.http.post(`${this.apiUrl}/api/auth/local/register`, userData).subscribe(
      (response: any) => {
        console.log('Signup successful:', response);
        console.log('Unique Slug:', slug);
        this.router.navigate(['/login']);
      },
      this.handleError
    );
  }

  private generateUniqueId(): string {
    const timestamp = new Date().getTime();
    const randomId = Math.floor(Math.random() * 1000);
    return `${randomId}`;
  }




  private handleError(error: any): boolean {
    if (error.error && error.error.message) console.error('Error:', error.error.message);
    else if (error instanceof HttpErrorResponse) console.error('HTTP Error Response:', error);
    else console.error('Unexpected error:', error);
    return false;
  }



}
