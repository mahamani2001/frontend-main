import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-prestataire',
  templateUrl: './password-prestataire.component.html',
  styleUrls: ['./password-prestataire.component.css']
})
export class PasswordPrestataireComponent  implements OnInit{
  resetPasswordForm!: FormGroup;

  constructor(private resetPasswordService: AdminService, private formBuilder: FormBuilder) {
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {}
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
