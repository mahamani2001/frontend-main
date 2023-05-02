import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  userName: string = '';
  userLoggedIn: boolean =false;
 


  constructor(private tokenService: TokenService,private router:Router) {     
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
  navigateDashboard():void{
      this.tokenService.isClient() ?      
        this.router.navigate(['/dashboardClient/']) : 
        this.router.navigate(['/post/']);  
        
        this.tokenService.isClient() ?      
        this.router.navigate(['/dashboardClient/']) : 
        this.router.navigate(['/dashboard']);
      
     
  }
}