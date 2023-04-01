
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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


}

