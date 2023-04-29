import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { TokenService } from 'src/app/shared/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gererutilisateur',
  templateUrl: './gererutilisateur.component.html',
  styleUrls: ['./gererutilisateur.component.css']
})
export class GererutilisateurComponent {

  constructor(private authState: AuthStateService,  private token: TokenService,private router:Router){}
  ngOnInit(): void {
    
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
      
      <input type="text" class="form-control" id="nom" name="nom" placeholder="Taper ton prénom">
    </div>

    <div class="form-group">
      <label for="prenom"></label>
      <input type="text" class="form-control" id="prenom"  placeholder="Taper ton nom">
    </div>

    <div class="form-group">
      <label for="address"></label>
      <input type="text" class="form-control" id="address" name="address"  placeholder="Taper ton address">
    </div>

    <div class="form-group">
      <label for="email"></label>
      <input type="email" class="form-control" id="email" name="email"  placeholder="Taper ton email">
    </div>

    <div class="form-group">
      <label for="password"></label>
      <input type="password" class="form-control" id="password" name="password" placeholder="Taper ton mot de passe" >
    </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Enregistrer',
      cancelButtonText: 'Annuler',
      preConfirm: () => {
        const nom = (<HTMLInputElement>document.getElementById('nom')).value;
        const prenom = (<HTMLInputElement>document.getElementById('prenom')).value;
        const address = (<HTMLInputElement>document.getElementById('address')).value;
        const email = (<HTMLInputElement>document.getElementById('email')).value;
        const password = (<HTMLInputElement>document.getElementById('password')).value;

        // You can add your own logic for validating the form data here

        return { nom, prenom, address, email, password };
      }
    }).then((result: any) => {
      if (result.value) {
        // Handle form submission
        console.log(result.value);
      }
    });
  }
}
