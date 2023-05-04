import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data-service.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

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
  demandeService(){
    if(this.isLoggedIn()) this.router.navigate(['/besoin']); 
    else  this.router.navigate(['/login']);
  }
  
}
