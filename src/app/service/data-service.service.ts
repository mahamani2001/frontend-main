import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../component/prestataire/job';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
 
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

 
}
