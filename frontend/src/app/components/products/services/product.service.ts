import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { MessageResponseModel } from '../../../common/models/message.response.model';
import { RequestModel } from '../../../common/models/request.model';
import { PaginationResultModel } from '../../../common/models/pagination-result.model';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _http: GenericHttpService
  ) { }

  // Ürün eklemek için POST API isteği yaptık.
  add(model: FormData, callBack: (res: MessageResponseModel) => void){
    this._http.post<MessageResponseModel>("products/add", model, res => callBack(res));
  }

  // Ürün güncellemek için POST API isteği yaptık.
  update(model: FormData, callBack: (res: MessageResponseModel) => void){
    this._http.post<MessageResponseModel>("products/update", model, res => callBack(res));
  }

  // Ürünleri listelemek için POST API isteği yaptık.
  getAll(model: RequestModel, callBack: (res: PaginationResultModel<ProductModel[]>) => void){
    this._http.post<PaginationResultModel<ProductModel[]>>("products/", model, res => callBack(res));
  }

  // Ürün silmek için POST API isteği yaptık.
  removeById(model: any, callBack: (res: MessageResponseModel) => void){
    this._http.post<MessageResponseModel>("products/removeById", model, res => callBack(res));
  }

  // Ürününü aktiflik durumunu değiştirmek için POST API isteği yaptık.
  changeActiveStatus(model: any, callBack: (res: MessageResponseModel) => void){
    this._http.post<MessageResponseModel>("products/changeActiveStatus", model, res => callBack(res));
  }

  // Ürün getirmek için POST API isteği yaptık.
  getById(model: any, callBack: (res: ProductModel) => void){
    this._http.post<ProductModel>("products/getById", model, res => callBack(res));
  }

  // Ürün resmini silmek için POST API isteği yaptık.
  removeImageProductIdAndIndex(model: any, callBack: (res: ProductModel) => void){
    this._http.post<ProductModel>("products/removeImageProductIdAndIndex", model, res => callBack(res));
  }

}
