import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data-service.service';
import { TokenService } from 'src/app/shared/token.service';
import { Profile } from '../../Client/profile';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isText:boolean= false;
  eyeIcon:string= "fa-eye-slash";
  type:string   = "password";
  user: Profile = {} as Profile;
  data: any;
  showUpdateSuccessModal = false;
  showMessage = false;
  messageContent!: string;
  username!:string;
  @Input() visible: boolean=false;

  constructor(private userService:DataService,private token: TokenService){}

  ngOnInit(): void {
 
    this.userService.getUserProfile().subscribe(
      res => { 
         this.data=res;
         this.user=this.data.data;
         this.token.saveUserName(this.user.firstname)
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

  updateProfile(): void {
    this.userService.updateProfile(this.user).subscribe(
      user => {
        this.user = user;
        console.log('Profil mis à jour avec succès');
        this.showMessage = true;
        // hide message after 1.5 seconds
        this.refreshUsers();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Profil mis à jour avec succès',
          showConfirmButton: false,
          timer: 1500
        });
      }
      
    );
    
  }   
  refreshUsers(){
    this.userService.getUserProfile().subscribe(
      user => {
          this.user = user;
      },
      error => {
          console.log(error);
      }
  ); 
    }
}
