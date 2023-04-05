import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Profile } from '../component/Client/profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8000/api/auth';
  private token!: string | null;
  private username!: string | null;




  constructor(private http: HttpClient) {
   }

  
   login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<Profile>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.token = response.access_token;
          this.username = response.username;
          localStorage.setItem('token', this.token);
          localStorage.setItem('username', this.username);
        })
      );
  }

  logout(): void {
    this.token = null;
    this.username = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  getToken(): string {
    return this.token ?? localStorage.getItem('token') ?? '';
    
  }
  
  getUsername(): string {
    return this.username ??localStorage.getItem('firstname')??'';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
