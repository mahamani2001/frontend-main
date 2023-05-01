import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-password-prestataire',
  templateUrl: './password-prestataire.component.html',
  styleUrls: ['./password-prestataire.component.css']
})
export class PasswordPrestataireComponent {
  resetPasswordForm!: FormGroup;

  constructor(private resetPasswordService: AdminService, private formBuilder: FormBuilder) {
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    const { currentPassword, newPassword, confirmPassword } = this.resetPasswordForm.value;
    this.resetPasswordService.resetPassword(currentPassword, newPassword, confirmPassword)
      .subscribe(
        () => {
          // Reset successful
          console.log('Password reset successful');
          
        },
        (error) => {
          // Reset failed
          console.error(error);
        }
      );
  }
}
