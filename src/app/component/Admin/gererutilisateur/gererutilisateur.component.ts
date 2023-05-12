import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';
import { Profile } from '../../Client/profile';
import { AdminService } from 'src/app/service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gererutilisateur',
  templateUrl: './gererutilisateur.component.html',
  styleUrls: ['./gererutilisateur.component.css']
})
export class GererutilisateurComponent {
  users: Profile[] = [];
  UserForm!: FormGroup;
  UserId: any = null; 
  data!:any;
  constructor(private authState: AuthStateService, 
     private token: TokenService,
     private router:Router,
     private adminService:AdminService,
     private userService:AdminService,
     private formBuilder: FormBuilder
     ){}
  
  ngOnInit(): void {
    this.getAllUser();
    this.refreshUsers();
}
  getAllUser(){
    this.adminService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error(error);
      }
    );
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
  showForm() {
    Swal.fire({
      title: 'Ajouter Compte',
      html: `
      <div class="form-group">
      
      <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Taper  prénom">
    </div>

    <div class="form-group">
      <label for="lastname"></label>
      <input type="text" class="form-control" id="lastname"  name="lastname" placeholder="Taper  nom">
    </div>
    <div class="form-group">
    <label for="role"></label>
    <input type="text" class="form-control" id="role"  name=role placeholder="Taper role">
  </div>

  <div class="form-group">
  <label for="email"></label>
  <input type="email" class="form-control" id="email" name="email"  placeholder="Taper l'email">
</div>
<div class="form-group">
<label for="password"></label>
<input type="text" class="form-control" id="password" name="password"  placeholder="Taper  password">
</div>

    <div class="form-group">
      <label for="address"></label>
      <input type="text" class="form-control" id="address" name="address"  placeholder="Taper  address">
    </div>

   
    <div class="form-group">
      <label for="phone"></label>
      <input type="text" class="form-control" id="phone" name="phone" placeholder="Taper le  numéro de téléphone" >
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
        const password = (<HTMLInputElement>document.getElementById('password')).value;
        const phone = (<HTMLInputElement>document.getElementById('phone')).value;

        // You can add your own logic for validating the form data here

        return { firstname, lastname, role,address, email,password, phone };
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
    
  
    editform(){
      Swal.fire({
        title: 'edit demande ',
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
    <input type="text" class="form-control" id="role"  name=role placeholder="Taper role">
  </div>

  <div class="form-group">
  <label for="email"></label>
  <input type="email" class="form-control" id="email" name="email"  placeholder="Taper l' email">
</div>
<div class="form-group">
<label for="password"></label>
<input type="text" class="form-control" id="password" name="password"  placeholder="Taper  address">
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
          const password = (<HTMLInputElement>document.getElementById('password')).value;
          const phone = (<HTMLInputElement>document.getElementById('phone')).value;
  
          // You can add your own logic for validating the form data here
  
          return { firstname, lastname, role,address, email,password, phone };
        }
      }).then((result: any) => {
        if (this.UserId,result.value) {
          // Handle form submission
          this.adminService.update(this.UserId, result.value).subscribe(
            (response) => {
              console.log('User created successfully!', response);
              // Show success message
              Swal.fire('Success', 'User created successfully!', 'success');
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
  
}
