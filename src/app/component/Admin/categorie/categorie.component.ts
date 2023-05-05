import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Category } from '../../prestataire/category';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})

export class CategorieComponent implements OnInit{

  preview: string | undefined;
   percentDone: any = 0;
  users = [];
  categoryForm!: FormGroup;
  category: Category[] = [];
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpClient,
    private categService:CategoryService
   ) {
    // Reactive Form
    this.categoryForm = this.fb.group({
      name: [''],
      image: [null]
    })
  }
  ngOnInit() {
    this.getCategory();   
    this.refreshCategory();
    console.log(typeof this.category);
 }
    getCategory(){
      this.categService.getCategories().subscribe(
       (response) => {
        this.category = response;
        console.log(typeof this.category);

      })
    
    }
    refreshCategory(){
      this.categService.getCategories().subscribe(
        category => {
            this.category = category;
        },
        error => {
            console.log(error);
        }
    );
  
    }
    deleteCategory(){

    }
  // Image Preview
  uploadFile(event:any) {
   // const file = (event.target as HTMLInputElement).files[0];
    const file = event.target.files[0];
    this.categoryForm.patchValue({
      image: file
    });
    this.categoryForm.get('image')?.updateValueAndValidity()
    console.log(this.categoryForm.get('image'))
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
 
  async onAddCategory() { 
    const { value: file}= await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'accept': 'image/*',
        'aria-label': 'Upload your profile picture'
      }
    })
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {

        /*  Swal.fire({
          title: 'Your uploaded picture',
          imageUrl: e.target.result,
          imagelt: 'The uploaded picture'
        });*/
      }
      reader.readAsDataURL(file)

       this.categService.addCategorie("name",file ).subscribe(
          (response) => {
            console.log(response);
            Swal.fire('Success', 'Category created successfully', 'success');
            this.refreshCategory(); 
          },
          (error) => {
            console.error(error);
            Swal.fire('Error', 'Category creation failed', 'error');
          }
        ); 
    }
     
  }
  onDeleteCategory(categorie:Category) {
    this.categService.deleteCategory(categorie).subscribe(
        response => {
            console.log();
            // Refresh the user list, if necessary
             this.refreshCategory(); // Refresh the user list
        },
     
    );
}
}

/*
export class CategorieComponent implements OnInit{
   
  constructor(private http: HttpClient) { }

  ngOnInit() {}

  get f(){
    return this.myForm.controls;
  }
  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  } 

  submit(){
    const formData = new FormData();
    console.log(formData);
    formData.append('file',""+ this.myForm.get('fileSource')?.value);
     console.log(formData);
    this.http.post('http://127.0.0.1:8000/api/categories', formData)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }



  categoryForm!: FormGroup;
  

  /*constructor(private http: HttpClient, private fb: FormBuilder) {
   /* this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required, Validators.maxLength(255)]],
      picture: [null, Validators.required],
      fileSource: ['', [Validators.required]],

    });
  }*/
  


  /*onPictureSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.categoryForm.patchValue({
        fileSource: file
      //  picture: file
      });
    }
  } 
  onAddCategory() {
    
  
    Swal.fire({
      title: 'Add Category',
      html: `
      <form [formGroup]="categoryForm" enctype="multipart/form-data">
        <div class="form-group">
          <br>
          <input type="text" class="form-control"  formControlName="categoryName"
           placeholder="Choisir un nom pour categorie" required>
        </div>
        <div class="form-group">
          <br>
          <input type="file" class="form-control"  formControlName="picture"  
          (change)="onPictureSelected($event)" accept="image/*" required>
        </div>
      </form>
      `, 

 
      showCancelButton: true,
      confirmButtonText: 'Add',
      focusConfirm: false,
     /* preConfirm: () => {
        // get the form values
        const formValues = this.categoryForm.getRawValue();
  
        // check if the name field is not empty
      /*  if (!formValues.categoryName) {
          Swal.showValidationMessage('Please enter a category name');
          return false;
        }
  
        // check if the form is valid and the picture field has a value
        if (!this.categoryForm.valid || !formValues.picture) {
          Swal.showValidationMessage('Please fill in all required fields');
          return false;
        }  
       
      //  return formValues;
      }  
    }).then((result) => {
      console.log("sdsdfsdf"+result);
      // handle the form submission
      if (result.isConfirmed) {
        const category = result.value;
        const formData = new FormData();
        formData.append('name', category.name);
        console.log(":---- Image "+category.name);
        formData.append('file', this.categoryForm.get('fileSource')?.value);
        console.log(":---- Image ");
        console.log(this.categoryForm.get('fileSource')?.value);
       // make the HTTP POST request to your API
       /* this.http.post('http://127.0.0.1:8000/api/categories', formData)
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
}*/
