import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { CategoryModel } from '../models/category.model';
import { MessageResponseModel } from '../../../common/models/message.response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http: GenericHttpService
  ) { }

  // Kategorileri listeletmek için GET API isteği yaptık.
  getAll(callBack: (res: CategoryModel[]) => void){
    this._http.get<CategoryModel[]>("categories", res => callBack(res));
  }

  // Kategori eklemek için POST API isteği yaptık.
  add(name: string, callBack: (res: MessageResponseModel) => void){
    let model = {name: name};
    this._http.post<MessageResponseModel>("categories/add", model, res => callBack(res));
  }

  // Kategori güncellemek için POST API isteği yaptık.
  update(model: CategoryModel, callBack: (res: MessageResponseModel) => void){
    this._http.post<MessageResponseModel>("categories/update", model, res => callBack(res));
  }

  // Kategori silmek için POST API isteği yaptık.
  removeById(_id: string, callBack: (res: MessageResponseModel) => void){
    let model = {_id: _id};
    this._http.post<MessageResponseModel>("categories/removeById", model, res => callBack(res));
  }

}
