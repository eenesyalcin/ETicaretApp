import { Component } from '@angular/core';
import { SharedModule } from '../../common/shared/shared.module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // Kayıt yapmak için metod şablonunu oluşturduk.
  register(form: NgForm){

  }

}
