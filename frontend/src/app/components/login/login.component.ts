import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from './models/login.model';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private _auth: AuthService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  // Giriş yapmak için metod yazdık.
  login(form: NgForm){
    if(form.valid){
      // Giriş işlemi için oluşturduğumuz modele form içerisindeki bilgileri aldık.
      let model = new LoginModel();
      model.email = form.controls["email"].value;
      model.password = form.controls["password"].value;

      // Giriş başarılı olduktan sonra yapılacak işlemleri yazdık.
      this._auth.login(model, res => {
        this._toastr.success("Giriş Başarılı!");
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        this._router.navigateByUrl("/");
      })
    }
  }

}
