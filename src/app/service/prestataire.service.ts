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
    return this.http.get<Profile[]>(`${this.apiUrl}/prestataire`);
  }


}
