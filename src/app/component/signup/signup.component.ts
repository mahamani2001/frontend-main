import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DataService } from 'src/app/service/data-service.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type:string   = "password";
  isText:boolean= false;
  eyeIcon:string= "fa-eye-slash";
  signUpFrom!:FormGroup;
  data:any;
  constructor(private fb : FormBuilder,private dataServices:DataService,private route:Router){}
  ngOnInit(): void {
    this.signUpFrom=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required],
      address:['',Validators.required],
      phone:['',Validators.required],
      role:['client']

    })
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye" :this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text" :this.type="password";
    }
    public error:any=[];

    onSignup(){
      console.log(this.signUpFrom);
      this.dataServices.register(this.signUpFrom.value).subscribe(res=>{
        this.data=res;
        console.log(res);
        // SweetAlert success message
        Swal.fire({
          icon: 'success',
          title: 'Welcome to our platform!',
          text: 'You have successfully registered.',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Go to homepage'
        }).then((result) => {
          if (result.isConfirmed) {
           // this.route.navigate(['/home']);
          }
        });
      });
    }
    

}
