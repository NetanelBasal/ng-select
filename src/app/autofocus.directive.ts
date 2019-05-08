import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective {
  @Input() set autofocus(_) {
    this.host.nativeElement.focus();
  }

  constructor(private host: ElementRef<HTMLDListElement>) {
  }

}
