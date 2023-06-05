import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { DataService } from 'src/app/service/data-service.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ["./signup.component.css"]

})
export class SignupComponent implements OnInit {
 
  isText:boolean= false;
  eyeIcon:string= "fa-eye-slash";
  eyeIconConfirm :string= "fa-eye-slash";
  typeInput :string = "password";
  typeInputConfirm  :string = "password";
  signUpFrom!:FormGroup;
  data:any;
  showPassword = false;
  showConfirmPassword=false;
  submitted = false;
  errorMessage = '';
  isSignupFailed=false;

  constructor(private fb : FormBuilder,private dataServices:DataService,private route:Router){}
  ngOnInit(): void {
    this.signUpFrom=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[
        Validators.required,
        Validators.email]
      ],
      password:['',[
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmpassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]], 
      address:['',Validators.required],
      phone:['',Validators.required],
      role:['client']
    }, 
    {
      validator: this.ConfirmedValidator('password', 'confirmpassword'),

    } 
)
  }
  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors["confirmedValidator"]
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


get form(): { [key: string]: AbstractControl; }
{
  return this.signUpFrom.controls;
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
  hideShowPassConfirm(){
    this.showConfirmPassword = !this.showConfirmPassword;
    if(this.showConfirmPassword) {
      this.eyeIconConfirm="fa-eye";
      this.typeInputConfirm ="text"
    } 
    else{
      this.eyeIcon="fa-eye-slash";
      this.typeInput ="password"
    } 
  }
  onSignup(){
    this.submitted = true;
    if (this.signUpFrom.invalid) {
      return;
    }

    console.log(JSON.stringify(this.signUpFrom.value));
    this.dataServices.register(this.signUpFrom.value).subscribe(res=>{
        this.data=res;
        console.log(res);
        // SweetAlert success message
        if(this.data.success==true)  {
          this.isSignupFailed = false; 
          Swal.fire({
          icon: 'success',
          title: 'Welcome to our platform!',
          text: 'You have successfully registered.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Go to homepage'
        }).then((result) => {
          if (result.isConfirmed) {
             this.route.navigate(['/login']);
          }
        });
      }
      else { 
          this.errorMessage = this.data.msg; 
          this.isSignupFailed = true;   
      }
       },
      err => {
       this.errorMessage = err.error.message; 
       this.isSignupFailed = true;  
       
      })   
    }
    

}
