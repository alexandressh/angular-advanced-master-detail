import { Component, OnInit } from '@angular/core';

import { Category } from './../shared/categorie.model';
import { CategoryService } from './../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => console.error('Erro ao carregar lista', error)
    );
  }

  deleteCategory(category) {
    this.categoryService.delete(category).subscribe(
      () => this.categories = this.categories.filter(el => el !== category),
      (err) => console.error(err)
    )
  }

}
