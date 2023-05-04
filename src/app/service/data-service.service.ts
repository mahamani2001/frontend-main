import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Job } from '../component/prestataire/job';
import { Profile } from '../component/Client/profile';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private baseUrl = 'http://localhost:8000/api';
  private token!: string | null;
  private username!: string | null;


  constructor(private http:HttpClient) { }
  
  getData(): Observable<any> {
    const token = this.getToken();
    
    return this.http.get(`${this.baseUrl}/data`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
  register(data:any){ 
       return this.http.post( 'http://127.0.0.1:8000/api/register',data);
    
  }
  registerprestataire(data:any){
  
    return this.http.post( 'http://127.0.0.1:8000/api/jobbers',data);
    
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

//
getAlljobs(): Observable<Job[]> {
  return this.http.get<Job[]>(`${this.baseUrl}/job`);
}

getJobById(id: number): Observable<Job> {
  return this.http.get<Job>(`${this.baseUrl}/job/${id}`);
}
createjob(job: Job): Observable<Job> {
  return this.http.post<Job>(`${this.baseUrl}/job`, job);
}


updatejob(job: Job): Observable<Job> {
  return this.http.put<Job>(`${this.baseUrl}/job/${job.id}`, job);
}

deletejob(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/job/${id}`);
}
getServices(): Observable<any> {
  return this.http.get(`http://127.0.0.1:8000/api/jobs`);
}
//



getUserProfile(): Observable<Profile> {
  return this.http.get<Profile>(`http://127.0.0.1:8000/api/profile`);
}

getPrestataire(id:number): Observable<Profile> {
  return this.http.get<Profile>(`http://127.0.0.1:8000/api/prestataires/${id}`);
}

getJobsByPrestatire(id:number)  {
  return this.http.get(`http://127.0.0.1:8000/api/job/${id}`);
}

uploadPhoto(formData: FormData): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/upload-photo`, formData);
}



updateProfile(user: Profile): Observable<Profile> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  return this.http.put<Profile>(`${this.baseUrl}/profile-update`, user, httpOptions);
}
}
