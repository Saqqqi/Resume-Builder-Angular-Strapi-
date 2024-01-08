import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:1337';

  constructor(private http: HttpClient) { }

  // Method to get user information
  getUserInfo(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

updateStrapiUserInfo(userId: string, updatedUserData: any): Observable<any> {
  const apiUrl = `http://localhost:1337/api/users/${userId}`;

  // Make a PUT request to update user information in Strapi
  return this.http.put(apiUrl, updatedUserData);
}

}