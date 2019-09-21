import { Injectable, Injector } from '@angular/core';

import { Category } from './categorie.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<Category> {

  constructor(protected injector: Injector) {
    super('api/categories', injector, Category.fromJson);
  }
}
