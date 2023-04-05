import { Component } from '@angular/core';
import { Profile } from '../profile';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-daschboard-client',
  templateUrl: './daschboard-client.component.html',
  styleUrls: ['./daschboard-client.component.css']
})
export class DaschboardClientComponent {
  constructor(private authService: AuthService, private router:Router) { }

  firstname!: string;

  profil=new Profile();
  ngOnInit() {
    
    // Get the user's name from the AuthService
    this.firstname = this.authService.getUsername();
    console.log(this.firstname);
  }
}
