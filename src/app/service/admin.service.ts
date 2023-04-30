import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../component/Client/profile';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = ' http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/alluser`);
  }
  deleteUser(user: Profile): Observable<any> {
    return this.http.delete<any>(`http://127.0.0.1:8000/api/users/${user.id}`);
}
createUser(user: Profile): Observable<any> {
  const url = `${this.apiUrl}/users`;
  return this.http.post(url, user);
}
private resetPasswordUrl = 'http://127.0.0.1:8000/api/reset-password';



  resetPassword(currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    const body = { currentPassword, newPassword, confirmPassword };
    return this.http.post<any>(this.resetPasswordUrl, body);
  }
 
}
