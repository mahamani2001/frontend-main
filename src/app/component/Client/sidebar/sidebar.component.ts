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
  logout(){
    this.token.removeToken();
    this.authState.setAuthState(true);
    this.router.navigate(['/login']);

  }
  
}
