import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { DataService } from 'src/app/service/data-service.service';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  username:string="";

  constructor(private authState: AuthStateService,  private token: TokenService,private router:Router){}
  ngOnInit(): void {
    this.username= this.token.getUsername();
    // hide message after 1.5 seconds
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'This is your dashboard. Here, you can view your account details, access services, check your availability, and manage your messages.',
      showConfirmButton: false,
      timer: 1500
    });
  }
  logout(){
    this.token.removeToken();
    this.authState.setAuthState(true);
    this.router.navigate(['/login']);

  }
  
}
