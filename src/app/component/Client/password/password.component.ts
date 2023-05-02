import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  resetPasswordForm: FormGroup;

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
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Password reset successful',
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error) => {
          // Reset failed
          console.error(error);
        }
      );
  }
}
