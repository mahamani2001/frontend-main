import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { DataService } from 'src/app/service/data-service.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  constructor(private userService:DataService){}
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      user => {
        this.user = user;
      },
      error => {
        console.log(error);
      }
    );
  }
  isText:boolean= false;
  eyeIcon:string= "fa-eye-slash";
  type:string   = "password";
  user: Profile = {} as Profile;
  
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


