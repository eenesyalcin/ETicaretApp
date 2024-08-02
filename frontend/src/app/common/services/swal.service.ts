import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  // Sweetalert2 kütüphanesini generic hale getirdik.
  callSwal(text: string, title: string, btnName: string, callBack: () => void){
    Swal.fire({
      text: text,
      title: title,
      showConfirmButton: true,
      confirmButtonText: btnName,
      confirmButtonColor: "red",
      showCancelButton: true,
      cancelButtonText: "Vazgeç",
      icon: "question"
    }).then(res => {
      if(res.isConfirmed){
        callBack();
      }
    })
  }

}
