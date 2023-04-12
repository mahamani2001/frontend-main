
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../interface/request';
//import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RequestJobService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(
    private http: HttpClient,
    //private authService: AuthService
  ) { }

  createRequestJob(requestJob: Request): Observable<Request> {
 //   requestJob.user_id = this.authService.getUserId(); // set the user_id using the injected AuthService
    return this.http.post<Request>(`${this.apiUrl}/job-requests`, Request);
  }

  getRequestJobs(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/job-requests`);
  }
  postRequestsToProvider(provider_id: number, user_id: number): Observable<any> {
    const url = 'http://localhost:8000/api/post-requests-to-provider';
    const body = { provider_id: provider_id, user_id: user_id };
    return this.http.post(url, body);
  }
  getJobRequest(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.apiUrl}/job-request`);
  }

  respondToJobRequest(id: number, response: string, prix?: number): Observable<any> {
    const data = { response: response, prix: prix } as { response: string, prix?: number };
    return this.http.post(`${this.apiUrl}/requests/${id}/offers`, data);
  }
  getProviderRequests(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
    return this.http.get<any[]>(`${this.apiUrl}/providerRequest`,{headers: headers});
  }
  
}

