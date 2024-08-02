import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from './services/category.service';
import { CategoryModel } from './models/category.model';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../common/services/swal.service';
import { CategoryPipe } from './pipes/category.pipe';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SharedModule, CategoryPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categories: CategoryModel[] = [];
  updateCategory: CategoryModel = new CategoryModel();
  search: string = "";

  constructor(
    private _toastr: ToastrService,
    private _category: CategoryService,
    private _swal: SwalService
  ) {}

  ngOnInit(): void {
    // Uygulama açıldığında yüklenmesi için kategorileri getiren metodu ngOnInit içerisinde çağırdık.
    this.getAll();
  }

  // Kategorileri getiren metodu yazdık.
  getAll(){
    this._category.getAll(res => this.categories = res);
  }

  // Güncellemek istediğimiz kategorinin bilgilerini güncelleme formuna getirmek için metod yazdık.
  get(model: CategoryModel){
    this.updateCategory = {...model};
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

  // Kategori güncellemek için metod yazdık.
  update(form: NgForm){
    if(form.valid){
      this._category.update(this.updateCategory, res =>{
        this._toastr.warning(res.message);
        this.getAll();
        let element = document.getElementById("updateModalCloseBtn");
        element?.click();
      });
    }
  }

  // Kategori silmek için metod yazdık.
  removeById(model: CategoryModel){
    this._swal.callSwal(`${model.name} kategorisini silmek istiyor musunuz?`, "", "Sil", () => {
      this._category.removeById(model._id, res => {
        this._toastr.success(res.message);
        this.getAll();
      })
    });
  }

}
