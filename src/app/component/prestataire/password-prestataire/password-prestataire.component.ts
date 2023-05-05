import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { DataService } from 'src/app/service/data-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-prestataire',
  templateUrl: './password-prestataire.component.html',
  styleUrls: ['./password-prestataire.component.css']
})
export class PasswordPrestataireComponent  implements OnInit{
  resetPasswordForm!: FormGroup;
  passwordForm!: FormGroup;
  password!: string;
  constructor(private resetPasswordService: AdminService, 
    private formBuilder: FormBuilder,
    private passwordService:DataService
    ) {
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required]
    });

    this.passwordService.getPassword().subscribe(
      data => {
        this.password = data.data.password; // Assuming the password is returned in the 'password' field of the JSON response
      },
      error => {
        console.log(error);
      }
    );
  }
  
  onSubmit() {
    const { currentPassword, newPassword, confirmPassword } = this.resetPasswordForm.value;
    this.resetPasswordService.resetPassword(currentPassword, newPassword, confirmPassword)
      .subscribe(
        () => {
          // Reset successful
          console.log('Password reset successful');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Password reset successful',
            showConfirmButton: false,
            timer: 1500
          });
        },
        err => {
          console.error('Confirm mot de passe ne correspond pas', err);
    
          // Show error alert
          Swal.fire({
            icon: 'error',
            title: 'Confirm mot de passe ne correspond pas  a votre nouveau mot de passe ',
         
          });
        }

     
      );
  }
}
