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

  
}
