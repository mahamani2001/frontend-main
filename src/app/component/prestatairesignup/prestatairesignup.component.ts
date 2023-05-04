import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  submitted = false;
  diplome!:String;

  constructor(private fb : FormBuilder,private dataServices:DataService,private router:Router){}
  ngOnInit(): void {
    this.psignUpFrom=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      address:['',Validators.required],
      phone:['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required],
      numero_cin:['',Validators.required],
      competence:['',Validators.required],
      role:['prestataire'],
      diplome:"fichier",
      photo: null
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.psignUpFrom.patchValue({ photo: file });
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText ? this.eyeIcon="fa-eye" :this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text" :this.type="password";
    }
    
    onSignup(){
      if(this.psignUpFrom.valid){
           console.log(this.psignUpFrom);
            this.dataServices.registerprestataire(this.psignUpFrom.value).subscribe(res=>{
              this.data=res;
              
              console.log(res);
          
            });
          }
        
 }
get form(): { [key: string]: AbstractControl; }
{
    return this.psignUpFrom.controls;
}
    
}

