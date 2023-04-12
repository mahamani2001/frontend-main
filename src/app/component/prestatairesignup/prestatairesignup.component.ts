import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data-service.service';


@Component({
  selector: 'app-prestatairesignup',
  templateUrl: './prestatairesignup.component.html',
  styleUrls: ['./prestatairesignup.component.css']
})
export class PrestatairesignupComponent {


  type:string   = "password";
  isText:boolean= false;
  eyeIcon:string= "fa-eye-slash";
  psignUpFrom!:FormGroup;
  data: any;
  constructor(private fb : FormBuilder,private dataServices:DataService){}
  ngOnInit(): void {
    this.psignUpFrom=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email: ['', Validators.required],
      address:['',Validators.required],
      phone: ['', Validators.required],
      numeroCIN: ['', Validators.required],
      competence: ['', Validators.required],
      role: ['prestataire'],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]

    })
   
  
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye" :this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text" :this.type="password";
    }
    
    onSignup(){
      if(this.psignUpFrom.valid){
            this.dataServices.registerprestataire(this.psignUpFrom.value).subscribe(res=>{
              this.data=res;
              console.log(res);
           
            });
          }
        
 }
    
}

