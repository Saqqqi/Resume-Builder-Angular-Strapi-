import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:1337';

  constructor(private http: HttpClient) { }

updateStrapiUserInfo(userId: string, updatedUserData: any): Observable<any> {
  const apiUrl = `http://localhost:1337/api/users/${userId}`;

  return this.http.put(apiUrl, updatedUserData);
}
deleteAccount(userId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/api/users/${userId}`);
}
}