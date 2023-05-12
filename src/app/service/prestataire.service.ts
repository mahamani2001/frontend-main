import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../component/Client/profile';

@Injectable({
  providedIn: 'root'
})
export class PrestataireService  {
  private apiUrl = 'http://localhost:8000/api';
  constructor(private http:HttpClient) { }
  getAllPrestataires(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/jobber`);
  }
  getPrestataireInfo(id: number) {
    return this.http.get(`${this.apiUrl}/prestataires/${id}`);
  }
  getServices(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/jobs`);
  }
  private baseUrl = 'http://127.0.0.1:8000/api/prestataires';

  getPrestatairesWithinDistance(lat: number, lng: number, distance: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/nearby?lat=${lat}&lng=${lng}&distance=${distance}`);
  }
  
  private url="http://127.0.0.1:8000/api/recommande";
  getProviders(): Observable<any[]> {
    const url = `${this.url}`;
    return this.http.get<any[]>(url);
  }
  private  urlapi = ' http://127.0.0.1:8000/prestatai/';
  getHighlyRatedPrestataires(minRecommendations: number, minRating: number): Observable<any> {
    const params = { minRecommendations: minRecommendations.toString(), minRating: minRating.toString() };
    return this.http.get<any>(`${this.urlapi}`, { params });
  }
  }
  
  

