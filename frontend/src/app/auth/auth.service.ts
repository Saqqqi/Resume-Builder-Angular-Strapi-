import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {



  // Key to store user data in localStorage
  private readonly USER_KEY = 'user';
  private apiUrl = 'http://localhost:1337';

  constructor(private router: Router, private http: HttpClient) { }




  login(email: string, password: string): Promise<boolean> {
    const userData = { identifier: email, password };
    return this.http.post(`${this.apiUrl}/api/auth/local`, userData)
      .toPromise()
      .then((response: any) => {
        const isAuthenticated = response?.jwt !== undefined;
        if (isAuthenticated) {
          const { email, username ,id  } = response.user;
         
          
          localStorage.setItem(this.USER_KEY, JSON.stringify({ email, username ,id }));
          console.log('Login successful ======>>>>>>>', username);
    
          console.log('Login successful ======>>>>>>>', id);

        }
        return isAuthenticated;
      })
      .catch(this.handleError);
  }
  


  // Method for user logout
  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }




  // Method to retrieve user data from localStorage
  getUser(): any {
    const userString = localStorage.getItem(this.USER_KEY);
    return userString ? JSON.parse(userString) : null;
  }



  // Method to check if a user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }


  updateUser(updatedUserData: any): void {
    const currentUserData = this.getUser();
    const updatedUser = { ...currentUserData, ...updatedUserData };
    localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
  }


  // Method for user signup
  signUp(firstName: string, lastName: string, email: string, password: string, id: string): void {
    const username = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
    const userData = { first_name: firstName, last_name: lastName, username, email, password, user_type: '1', id };

    this.http.post(`${this.apiUrl}/api/auth/local/register`, userData).subscribe(
      (response: any) => {
        console.log('Signup successful:', response);
        console.log('Unique idddd:', id);
        this.router.navigate(['/login']);
      },
      this.handleError
    );
  }
  // Private method to handle errors during HTTP requests
  private handleError(error: any): boolean {
    if (error.error && error.error.message) console.error('Error:', error.error.message);
    else if (error instanceof HttpErrorResponse) console.error('HTTP Error Response:', error);
    else console.error('Unexpected error:', error);
    return false;
  }



}
