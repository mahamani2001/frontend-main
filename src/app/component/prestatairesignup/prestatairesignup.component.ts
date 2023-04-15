import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb : FormBuilder,private dataServices:DataService){}
  ngOnInit(): void {
    this.psignUpFrom=this.fb.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      password:['',Validators.required],
      confirmpassword:['',Validators.required],
      numero_cin:['',Validators.required],
      competence:['',Validators.required],
      role:['prestataire'],
      photo:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      diplome:"fichier"
    })
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

