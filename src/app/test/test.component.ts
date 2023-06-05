import { Component } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Category } from '../component/prestataire/category';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  name = '';
  image: File | null = null;
  categories: Category[]=[];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
     this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
   
  }

  onSubmit() {
    if (this.image) {
      const category = { name: this.name };
      this.categoryService.createCategory(category.name, this.image).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  onFileSelected(event: any) {
    this.image = event.target.files[0];
  }
}