import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Category } from '../../prestataire/category';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {
  categoryForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      picture: [null, Validators.required]
    });
  }
  
  ngOnInit() {}

  onPictureSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.categoryForm.patchValue({
        picture: file
      });
    }
  }

  onAddCategory() {
    const categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      picture: [null, Validators.required]
    });
  
    Swal.fire({
      title: 'Add Category',
      html: `
      <form [formGroup]="categoryForm">
        <div class="form-group">
          <br>
          <input type="text" class="form-control" id="name" formControlName="name" placeholder="Choisir un nom pour categorie" required>
        </div>
        <div class="form-group">
          <br>
          <input type="file" class="form-control" id="picture"  formControlName="picture"  (change)="onPictureSelected($event)" accept="image/*" required>
        </div>
      </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add',
      focusConfirm: false,
      preConfirm: () => {
        // get the form values
        const formValues = this.categoryForm.getRawValue();
  
        // check if the name field is not empty
        if (!formValues.name) {
          Swal.showValidationMessage('Please enter a category name');
          return false;
        }
  
        // check if the form is valid and the picture field has a value
        if (!this.categoryForm.valid || !formValues.picture) {
          Swal.showValidationMessage('Please fill in all required fields');
          return false;
        }
  
        // return the form values as an object
        return formValues;
      }
    }).then((result) => {
      // handle the form submission
      if (result.isConfirmed) {
        const category = result.value;
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('picture', category.picture);
  
        // make the HTTP POST request to your API
        this.http.post('http://127.0.0.1:8000/api/categories', formData)
          .subscribe(
            (response) => {
              console.log(response);
              Swal.fire('Success', 'Category created successfully', 'success');
            },
            (error) => {
              console.error(error);
              Swal.fire('Error', 'Category creation failed', 'error');
            }
          );
      }
    });
  }  
}
