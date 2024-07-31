import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  // "NgxSpinnerModule", "app.config.ts" dosyası ile birlikte ayrıyeten burada da çağırılmalıdır.
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  
}
