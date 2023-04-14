import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobRequestService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}
  
  getJobRequest(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.baseUrl}/job-request`);
  }

  respondToJobRequest(id: number, response: string, prix?: number): Observable<any> {
    const data = { response: response, prix: prix } as { response: string, prix?: number };
    return this.http.post(`${this.baseUrl}/requests/${id}/offers`, data);
  }
  getProviderRequests(): Observable<any[]> {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token});
    return this.http.get<any[]>(`${this.baseUrl}/providerRequest`,{headers: headers});
  }

  getJobberRequest(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/RequestJobber`);
  }

  
}
