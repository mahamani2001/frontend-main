import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data-service.service'; 

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
  constructor(private fb : FormBuilder,private dataServices:DataService){}
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
             });
    }

}
