import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-gererutilisateur',
  templateUrl: './gererutilisateur.component.html',
  styleUrls: ['./gererutilisateur.component.css']
})
export class GererutilisateurComponent {

  constructor(private authState: AuthStateService,  private token: TokenService,private router:Router){}
  ngOnInit(): void {
    
  }
  logout(){
    console.log("--->> Logout ");
   // this.token.removeToken();
    this.token.clearStorage();
    this.authState.setAuthState(false);
    this.router.navigate(['/login']);

  }
}
