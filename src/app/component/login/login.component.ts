import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { DataService } from 'src/app/service/data-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  type:string   = "password";
  isText:boolean= false;
  eyeIcon:string= "fa-eye-slash";
  loginForm!:FormGroup;
  data: any;
  token:any;
constructor(private fb:FormBuilder,private dataServices:DataService  ,private router:Router ){

}
ngOnInit():void{
this.loginForm=this.fb.group({
  email:['',Validators.required],
  password:['',Validators.required]
})
}
hideShowPass(){
this.isText=!this.isText;
this.isText ? this.eyeIcon="fa-eye" :this.eyeIcon="fa-eye-slash"
this.isText ? this.type="text" :this.type="password";
}
public error:any=[];
submitlogin(){

  
     console.log(this.loginForm.value);
     return  this.dataServices.login(this.loginForm.value).subscribe(res=>{
          this.data=res;
          if(this.data.success==true){
            let role = this.data.role;
            console.log(role);
            if(role=="client"){
              this.router.navigate(['/dashboardClient']);
              // redirecte to client dashboard
            } else if(role =="admin"){
              this.router.navigate(['/dashboard']);
              // redirecte to admin dashboard
            }
            else if(role=="prestataire"){
              this.router.navigate(['/dashboardprestataire']);
                // redirecte to prestataire dashboard
            }
          }
         else {
          console.log("---error");
         }
       
        });
}
}

