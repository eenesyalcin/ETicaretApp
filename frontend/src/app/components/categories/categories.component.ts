import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './services/category.service';
import { CategoryModel } from './models/category.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories: CategoryModel[] = [];

  constructor(
    private _toastr: ToastrService,
    private _category: CategoryService
  ) {}

  ngOnInit(): void {
    // Uygulama açıldığında yüklenmesi için kategorileri getiren metodu ngOnInit içerisinde çağırdık.
    this.getAll();
  }

  // Kategorileri getiren metodu yazdık.
  getAll(){
    this._category.getAll(res => this.categories = res);
  }

  // Kategori eklemek için metod yazdık.
  add(form: NgForm){
    if(form.valid){
      this._category.add(form.controls["name"].value, res => {
        this._toastr.success(res.message);
        let element = document.getElementById("addModalCloseBtn");
        element?.click();
        form.reset();
        this.getAll();
      });
    }
  }

}
