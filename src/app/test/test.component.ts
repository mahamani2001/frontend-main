import { Component } from '@angular/core';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  name = '';
  image: File | null = null;

  constructor(private categoryService: CategoryService) {}

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
