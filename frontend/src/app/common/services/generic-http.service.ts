 import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  api: string = "http://localhost:5000/api";

  constructor(
    private _http: HttpClient,
    private _toastr: ToastrService,       // Toastr service'ini çağırdık.
    private _spinner: NgxSpinnerService   // NgxSpinner service'ini çağırdık.
  ) { }

  // Generic GET isteği yazdık.
  get<T>(api: string, callBack: (res: T) => void){
    this._spinner.show();       // API isteği yapılırken spinner gösterilecek.
    this._http.get<T>(`${this.api}/${api}`).subscribe({
      next: (res: T) => {
        callBack(res);
        this._spinner.hide();   // API isteği sona erdikten sonra spinner gizlenecek.
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        // Hata mesajlarını ekrana yazdırmak için Toastr kütüphanesini kullandık.
        this._toastr.error(err.error.message);
        this._spinner.hide();   // API isteğinde hata oluşursa spinner gizlenecek.
      }
    });
  }

  // Generic POST isteği yazdık.
  post<T>(api: string, model: T, callBack: (res: T) => void){
    this._spinner.show();       // API isteği yapılırken spinner gösterilecek.
    this._http.post<T>(`${this.api}/${api}`, model, {}).subscribe({
      next: (res: T) => {
        callBack(res);
        this._spinner.hide();   // API isteği sona erdikten sonra spinner gizlenecek.
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        // Hata mesajlarını ekrana yazdırmak için Toastr kütüphanesini kullandık.
        this._toastr.error(err.error.message);
        this._spinner.hide();   // API isteğinde hata oluşursa spinner gizlenecek.
      }
    });
  }

}
