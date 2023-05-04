import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../component/prestataire/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

 
  addCategorie(name: string, profileImage: File) : Observable<any>{
    var formData: any = new FormData();
    formData.append('name', name);
    formData.append('image', profileImage);
     return this.http.post<Category>(`${this.apiUrl}/categories`,  formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
  createCategory(category: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', category);
    formData.append('image', image);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(`${this.apiUrl}/categories`, formData, {
      headers: headers
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  
  getCategoryName(categoryId: number): Observable<string> {
    const url = `${this.apiUrl}/categories/${categoryId}`;
    return this.http.get<string>(url);
  }
  deleteCategory(categorie: Category): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/categories/${categorie.id}`);
}
  
}
