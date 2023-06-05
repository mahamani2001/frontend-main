import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Category } from '../component/prestataire/category';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
baseUrl="http://localhost:8000/api/images"
getAllImages(): Observable<any> {
  return this.http.get(`${this.baseUrl}`);
}
private url = 'http://localhost:8000/api/categorie';
/*updateCategory(id: any ,category: string, image: File): Observable<any> {
  const formData = new FormData();
  formData.append('name', category);
  formData.append('image', image);
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'multipart/form-data');
  return this.http.put(`${this.url}/${id}`, formData, { headers });
}*/
getCategoryById(id: number): Observable<Category> {
  const endpoint = `${this.apiUrl}/categories/${id}`;
  return this.http.get<Category>(endpoint);
}
updateCategory(id: number, formData: FormData): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  };
  return this.http.put<any>(`${this.url}/${id}`, formData, httpOptions)
    .pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
}
}
