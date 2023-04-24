import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offre } from '../interface/offre';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private apiUrl = `http://127.0.0.1:8000/api/offres`;
  constructor(private http: HttpClient) { }
  getOffre(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.apiUrl);
  }

  acceptOffre(idOffre:any): Observable<Offre> {
    const url = `${this.apiUrl}/${idOffre}/accepte`;
    return this.http.put<Offre>(url, {});
  }
}
