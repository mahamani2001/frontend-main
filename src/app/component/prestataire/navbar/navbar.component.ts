import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Job } from '../job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{

   

  constructor(private authService: AuthService,private router:Router) { 
  
  }
  ngOnInit(): void {
   
  }
  isLoggedIn(): boolean {
    if (!this.authService.isLoggedIn()) {
      // Redirect to the login page if the user is not authenticated
      // Example using Angular Router:
      this.router.navigate(['/login']);}
      
    return this.authService.isLoggedIn();
  }

  getUsername(): string {
    return this.authService.getUsername();
  }

  logout(): void {
    this.authService.logout();
  }
  }

