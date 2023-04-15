import { Component } from '@angular/core';
import { Profile } from '../profile'; 
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-daschboard-client',
  templateUrl: './daschboard-client.component.html',
  styleUrls: ['./daschboard-client.component.css']
})
export class DaschboardClientComponent {
  constructor(private dataService: DataService, private router:Router) { }

  firstname!: string;

  profil=new Profile();
  ngOnInit() {
    // Get the user's name from the AuthService
    this.firstname = this.dataService.getUsername();
    console.log(this.firstname);
      // hide message after 1.5 seconds
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'This is your dashboard. Here, you can view your account details, access services, check your availability, and manage your messages.',
        showConfirmButton: false,
        timer: 2500
      });
  }
}
