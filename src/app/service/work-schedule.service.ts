import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkScheduleService {

  //private readonly WORK_SCHEDULE_KEY = 'workSchedule';



 /* saveWorkSchedule(workHours: string, daysOff: string) {
    const workSchedule = { workHours, daysOff };
    localStorage.setItem(this.WORK_SCHEDULE_KEY, JSON.stringify(workSchedule));
  }

  getWorkSchedule() {
    const workScheduleJson = localStorage.getItem(this.WORK_SCHEDULE_KEY);
    return workScheduleJson ? JSON.parse(workScheduleJson) : null;
  }*/
  private baseUrl = 'http://localhost:8000/api/disponibilites';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
