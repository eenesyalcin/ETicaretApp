import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appValid]',
  standalone: true
})
export class ValidDirective {

  // Gelen elementin validation kurallarına uyup uymadığını denetleyecek kodları yazdık.
  @Input() appValid: boolean = false;

  constructor(
    private _el: ElementRef<any>
  ) { }

  @HostListener("keyup") keyup(){
    if(this.appValid){
      this._el.nativeElement.className = "form-control is-valid";
    }else{
      this._el.nativeElement.className = "form-control is-invalid";
    }
  }

}
