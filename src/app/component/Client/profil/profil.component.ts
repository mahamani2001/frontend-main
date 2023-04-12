import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { DataService } from 'src/app/service/data-service.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})

export class ProfilComponent implements OnInit {
  isText:boolean= false;
  eyeIcon:string= "fa-eye-slash";
  type:string   = "password";
  user: Profile = {} as Profile;
  data: any;
  constructor(private userService:DataService,private token: TokenService){}

  ngOnInit(): void {
  
  this.userService.getUserProfile().subscribe(
     res => { 
        this.data=res;
        this.user=this.data.data;
        this.token.saveUserName(this.user.firstname);
      },
     err => {
      
      alert("Erreur");
     }) 
  }


  
  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye" :this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text" :this.type="password";
    }
    
    passwordVisible = false;
  
    
  
    updateProfile(): void {
      this.userService.updateProfile(this.user).subscribe(
        user => {
          this.user = user;
          console.log('Profile updated successfully');
        },
        error => {
          console.log(error);
        }
      );
    }
  
 
  }


