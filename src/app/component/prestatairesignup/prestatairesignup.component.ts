import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-prestatairesignup',
  templateUrl: './prestatairesignup.component.html',
  styleUrls: ['./prestatairesignup.component.css']
})
export class PrestatairesignupComponent {
  isText:boolean= false;
  eyeIcon:string= "fa-eye-slash";
  eyeIconConfirm :string= "fa-eye-slash";
  typeInput :string = "password";
  typeInputConfirm  :string = "password";
  psignUpFrom!:FormGroup;
  data: any;
  submitted = false;
  diplome!:String;
  showPassword = false;
  showConfirmPassword=false; 
  errorMessage = '';
  isSignupFailed=false;
  image!: File;


  constructor(private fb : FormBuilder,private dataServices:DataService,private router:Router,private route:Router){}
  ngOnInit(): void {
    this.psignUpFrom=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[
        Validators.required,
        Validators.email]
      ],
      address:['',Validators.required],
      phone:['',Validators.required],
      password:['',[
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmpassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]], 
      numero_cin:['',Validators.required],
      competence:['',Validators.required],
      role:['prestataire'],
      diplome:"fichier",
      photo: File
    },  {
      validator: this.ConfirmedValidator('password', 'confirmpassword'),

    } );
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
  onFileSelected(event: any) {
 
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = event.target.files[0] 
    }
  }
   
  onSignup(){  
     this.submitted = true;
      if (this.psignUpFrom.invalid) {
        return;
      } 
      if(this.psignUpFrom.valid){ 
           this.dataServices.registerprestataire( this.psignUpFrom.value,this.image).subscribe(res=>{
              this.data=res; 
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
              console.log(this.data)
                this.errorMessage = this.data.msg; 
                this.isSignupFailed = true;   
            }
          },
          err => {
           this.errorMessage = err.error.message; 
           this.isSignupFailed = true;  
           
          }) ; 
      } 
 }
get form(): { [key: string]: AbstractControl; }
{
    return this.psignUpFrom.controls;
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

}