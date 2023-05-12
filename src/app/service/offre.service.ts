import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Offre } from '../interface/offre';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private apiUrl = `http://127.0.0.1:8000/api/offres`;
  constructor(private http: HttpClient) { }

  getOffresByDemandes(idDemande:any): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.apiUrl}/${idDemande}`);
  }
  acceptOffre(idOffre:any): Observable<Offre> {
    const url = `${this.apiUrl}/${idOffre}/accepte`;
    return this.http.put<Offre>(url, {});
  }
  refuseOffre(idOffre:any): Observable<Offre> {
    const url = `${this.apiUrl}/${idOffre}/refuse`;
    return this.http.put<Offre>(url, {});
  }
  
  
}
