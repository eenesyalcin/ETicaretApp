import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../common/services/generic-http.service';
import { LoginResponseModel } from '../models/login-response.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    // Yazdığımız generic HTTP service'i çağırdık.
    private _http: GenericHttpService
  ) { }

  // İçerisinde POST API isteği yapan bir login metodu yazdık.
  login(model: LoginModel, callBack: (res: LoginResponseModel) => void){
    this._http.post<LoginResponseModel>("auth/login", model, res => callBack(res));
  }

  // İçerisinde POST API isteği yapan bir register metodu yazdık.
  register(model: RegisterModel, callBack: (res: LoginResponseModel) => void){
    this._http.post<LoginResponseModel>("auth/register", model, res => callBack(res));
  }

}
