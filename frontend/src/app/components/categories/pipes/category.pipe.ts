import { Pipe, PipeTransform } from '@angular/core';
import { CategoryModel } from '../models/category.model';

@Pipe({
  name: 'categoryPipe',
  standalone: true
})
export class CategoryPipe implements PipeTransform {

  // Kategori aramak için filtreleme yapan bir pipe yazdık.
  transform(value: CategoryModel[], search: string): CategoryModel[] {
    if(search == "")
      return value;

    return value.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

}
