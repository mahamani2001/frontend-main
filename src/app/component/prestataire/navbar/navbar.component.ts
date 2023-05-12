import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{

  username:string="";
 

  constructor(private authState: AuthStateService,
      private token: TokenService,
      private router:Router){}
  ngOnInit(): void {

  }
  logout() {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir vous déconnecter ? 😊',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out'
    }).then((result) => {
      if (result.isConfirmed) {
        this.token.clearStorage();
        this.authState.setAuthState(false);
        this.router.navigate(['/login']);
      }
    });
  }
  
  /*isLoggedIn(): boolean {
    if (!this.token.isLoggedIn()) {
      // Redirect to the login page if the user is not authenticated
      // Example using Angular Router:
      this.router.navigate(['/login']);}
      
    return this.token.isLoggedIn();
  }*/


 
  }

