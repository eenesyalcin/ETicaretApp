import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Toastr kütüphanesini denemek için kod yazdık.
  constructor(
    private _toastr: ToastrService
  ) {
    this._toastr.success("DENEME MESAJI");
  }

  // Giriş yapmak için metod yazdık ve denedik.
  login(form: NgForm){
    if(form.valid){
      console.log(form.value);
    }
  }

}
