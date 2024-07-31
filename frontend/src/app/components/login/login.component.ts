import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Spinner kütüphanesini denemek için kod yazdık.
  constructor(
    private _toastr: ToastrService,
    private _spinner: NgxSpinnerService
  ) {
    this._spinner.show();
    setTimeout(() => {
      this._spinner.hide();
    },5000)
  }

  // Giriş yapmak için metod yazdık ve denedik.
  login(form: NgForm){
    if(form.valid){
      console.log(form.value);
    }
  }

}
