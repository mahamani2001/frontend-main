import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TokenService {

  private issuer = {
    login: 'http://127.0.0.1:8000/api/login',
    register: 'http://127.0.0.1:8000/api/register',
  };

  constructor() {}

  saveToken(token: any) {
    localStorage.setItem('auth_token', token);
  }
  saveId(id: any) {
    localStorage.setItem('id_user', id);
  }
  saveUserName(userName:any){
    localStorage.setItem('username', userName);
  } 
  getUsername(): string {
    return localStorage.getItem('username') ?? '';
  }
  getUserId(): string {
    return localStorage.getItem('id_user')??'';
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  clearStorage(){
   return localStorage.clear();
  }
  setRole(role:string){
    localStorage.setItem('role', role);
  }
  isClient():boolean {
    return localStorage.getItem('role') =="client" ? true : false;
  }
  //*Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) { 
      // I add this by maha -- to force token without checking 
      return true;
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
 
  }
  
}