import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // initialize the form with a category name and picture control
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      picture: [null]
    });
  }

  onAddCategory() {
    Swal.fire({
      title: 'Add Category',
      html: `
        <form>
          <div class="form-group">
                 <br>
            <input type="text" class="form-control" id="categoryName" formControlName="categoryName"  placeholder="Choisir un nom pour categorie" required>
          </div>
          <div class="form-group">
             <br>
            <input type="file" class="form-control" id="picture" formControlName="picture" placeholder="Ajouter image de categorie ">
          </div>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add',
      focusConfirm: false,
      preConfirm: () => {
        // validate the form
        if (!this.categoryForm.valid) {
          Swal.showValidationMessage('Please fill in all required fields');
          return false;
        }
        // return the form values as an object
        return this.categoryForm.getRawValue();
      }
    }).then((result) => {
      // handle the form submission
      if (result.isConfirmed) {
        const category = result.value;
        // send the category object to your API or process it as needed
        console.log(category);
      }
    });
  }

}
