import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { DataService } from 'src/app/service/data-service.service';
import { Router } from '@angular/router'; 
import { TokenService } from 'src/app/shared/token.service';
import { AuthStateService } from 'src/app/shared/auth-state.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  submitted = false;
  isText:boolean= false;
  eyeIcon:string= "fa-eye";
  typeInput :string = "password";
  loginForm!:FormGroup;
  data: any;
  errorMessage = '';
  isLoginFailed = false; 
  showPassword = false;

constructor(private fb:FormBuilder,
  private dataServices:DataService  ,
  private router:Router,
  private token: TokenService,
  private authState: AuthStateService ){
}
ngOnInit():void {
  this.loginForm = this.fb.group(
    { 
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ], 
    } 
  );
}
get form(): { [key: string]: AbstractControl; }
{
  return this.loginForm.controls;
}

hideShowPass(){
  this.showPassword = !this.showPassword;
  if(this.showPassword) {
    this.eyeIcon="fa-eye-slash";
    this.typeInput ="text"
  } 
  else{
    this.eyeIcon="fa-eye";
    this.typeInput ="password"
  } 
}

submitlogin(){
  this.submitted = true;
  if (this.loginForm.invalid) {
    return;
  }
  // in case everything fine email & pwd format are OK --> call API
  console.log(JSON.stringify(this.loginForm.value, null, 2));
  
  return this.dataServices.login(this.loginForm.value)
     .subscribe(
      res => {
        
       this.data=res;
       if(this.data.success==true) {
         let role = this.data.role; 
         this.isLoginFailed = false; 
         // here we will save the token on the local storage
         this.token.saveToken(this.data.token);
         this.token.saveId(this.data.user.id);
         this.token.setRole(role);
         this.token.saveUserName(this.data.user.firstname);
         // we will set state 
         this.authState.setAuthState(true);
         
         if(role == "client"){
          // dashboardClient
           this.router.navigate(['/dashboardClient']);
           // redirecte to client dashboard
         } else if(role =="admin"){
           this.router.navigate(['/gererutilisateur']);
           // redirecte to admin dashboard
         }
         else if(role=="prestataire"){
          console.log("---->>> go to prestatire ");
          this.router.navigate(['/post']);
             // redirecte to prestataire dashboard
         }
       }   
       else {
        this.errorMessage = this.data.msg; 
        this.isLoginFailed = true;  
        this.submitted = false; 
       }
     },
     err => {
      this.errorMessage = err.error.message; 
      this.isLoginFailed = true;  
      alert("Erreur");
     }) 
  
    }
   
  
}