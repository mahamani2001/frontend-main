import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-categorie-update',
  templateUrl: './categorie-update.component.html',
  styleUrls: ['./categorie-update.component.css']
})
export class CategorieUpdateComponent implements OnInit{
  updateCategoryForm!: FormGroup;
  category: any;
  imagePreview!: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.updateCategoryForm = this.fb.group({
      name: [null, Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    const categoryId = +this.route.snapshot.paramMap.get('id')!;
    // fetch category data from API
    // and set form values
  }

  onImageSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput?.files?.length) {
      return;
    }
    const file = fileInput.files[0];
    this.updateCategoryForm.patchValue({ image: file });
    this.updateCategoryForm.get('image')?.updateValueAndValidity();
  
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  

  onSubmit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    const formData = new FormData();
    formData.append('name', this.updateCategoryForm.value.name);
    formData.append('image', this.updateCategoryForm.value.image);
    this.categoryService.updateCategory(id, formData).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/categories']);
      },
      error => {
        console.error(error);
      }
    );
  }
}
