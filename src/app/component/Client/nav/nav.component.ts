import { Component } from '@angular/core';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  userName: string = '';
  userLoggedIn: boolean =false;


  constructor(private tokenService: TokenService) {     
  }
  ngOnInit(): void {
    this.userLoggedIn=this.isLoggedIn();
    console.log("----->>> Home page islogged in ? "+this.userLoggedIn);
    if(this.userLoggedIn){
      this.userLoggedIn=true;
     this.userName=this.tokenService.getUsername();
    }
    
    
  }
  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn(); 
  }
}
