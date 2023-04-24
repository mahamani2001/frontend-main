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
        title: 'Ceci est votre tableau de bord. Ici, vous pouvez afficher les détails de votre compte, accéder aux demandes et gérer vos messages.',
        showConfirmButton: false,
        timer: 2500
      });
  }
}
