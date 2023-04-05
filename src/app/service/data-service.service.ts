import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Job } from '../component/prestataire/job';
import { AuthService } from './auth.service';
import { Profile } from '../component/Client/profile';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  getData(): Observable<any> {
    const token = this.authService.getToken();
    
    return this.http.get(`${this.baseUrl}/data`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
 
  register(data:any){
//const headers = new HttpHeaders({ 'content-type': 'application/json','Access-Control-Allow-Headers':'content-type' });
//{ headers: headers }
   return this.http.post( 'http://127.0.0.1:8000/api/register',data);

}
login(data:any){
  return this.http.post( 'http://127.0.0.1:8000/api/login',data);
}
//

private baseUrl = 'http://127.0.0.1:8000/api';
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
//



respondToJobRequest(id: number, response: string, prix: number): Observable<any> {
  const url = `http://localhost:8000/api/requests/${id}/offers`;
  const body = { response, prix };
  console.log(`Sending HTTP request with response: ${response}, prix: ${prix}`);
  return this.http.post(url, body);
}

getUserProfile(): Observable<Profile> {
  return this.http.get<Profile>(`http://127.0.0.1:8000/api/profile`);
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
