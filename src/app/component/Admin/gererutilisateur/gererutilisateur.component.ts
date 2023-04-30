import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';
import { Profile } from '../../Client/profile';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-gererutilisateur',
  templateUrl: './gererutilisateur.component.html',
  styleUrls: ['./gererutilisateur.component.css']
})
export class GererutilisateurComponent {
  users: Profile[] = [];
  constructor(private authState: AuthStateService,  private token: TokenService,private router:Router,private adminService:AdminService,private userService:AdminService){}
  
  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error(error);
      }
    );
    this.refreshUsers();
  }
  logout(){
    console.log("--->> Logout ");
   // this.token.removeToken();
    this.token.clearStorage();
    this.authState.setAuthState(false);
    this.router.navigate(['/login']);

  }
  showForm() {
    Swal.fire({
      title: 'Ajouter Compte',
      html: `
      <div class="form-group">
      
      <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Taper  préfirstname">
    </div>

    <div class="form-group">
      <label for="lastname"></label>
      <input type="text" class="form-control" id="lastname"  name="lastname" placeholder="Taper  firstname">
    </div>
    <div class="form-group">
    <label for="role"></label>
    <input type="text" class="form-control" id="role"  placeholder="Taper role">
  </div>

  <div class="form-group">
  <label for="email"></label>
  <input type="email" class="form-control" id="email" name="email"  placeholder="Taper l' email">
</div>

    <div class="form-group">
      <label for="address"></label>
      <input type="text" class="form-control" id="address" name="address"  placeholder="Taper  address">
    </div>

   

    <div class="form-group">
      <label for="phone"></label>
      <input type="text" class="form-control" id="phone" name="phone" placeholder="Taper numéro de téléphone" >
    </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Enregistrer',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const firstname = (<HTMLInputElement>document.getElementById('firstname')).value;
        const lastname = (<HTMLInputElement>document.getElementById('lastname')).value;
        const role = (<HTMLInputElement>document.getElementById('role')).value;
        const address = (<HTMLInputElement>document.getElementById('address')).value;
        const email = (<HTMLInputElement>document.getElementById('email')).value;
        const phone = (<HTMLInputElement>document.getElementById('phone')).value;

        // You can add your own logic for validating the form data here

        return { firstname, lastname, role,address, email, phone };
      }
    }).then((result: any) => {
      if (result.value) {
        // Handle form submission
        this.adminService.createUser(result.value).subscribe(
          (response) => {
            console.log('User created successfully!', response);
            // Show success message
            Swal.fire('Success', 'User created successfully!', 'success');
            this.refreshUsers();
          },
          (error) => {
            console.error('Error creating user', error);
            // Show error message
            Swal.fire('Error', 'Failed to create user', 'error');

          }
        );
      }
    });
  }

  
  refreshUsers(){
    this.userService.getAllUsers().subscribe(
      users => {
          this.users = users;
      },
      error => {
          console.log(error);
      }
  );

  }
    onDeleteUser(user:Profile) {
        this.userService.deleteUser(user).subscribe(
            response => {
                console.log(response.message);
                // Refresh the user list, if necessary
                 this.refreshUsers(); // Refresh the user list
            },
            error => {
                console.log(error);
            }
        );
    }
}
