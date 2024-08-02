import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css'
})
export class BlankComponent {

  @Input() title: string = "";
  @Input() sectionTitle: string = "";

}
