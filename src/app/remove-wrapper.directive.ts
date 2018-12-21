import { Directive, ElementRef } from '@angular/core';

@Directive({
   selector: '[remove-wrapper]'
})
export class RemoveWrapperDirective {
   constructor(private el: ElementRef) {
      debugger;
       const parentElement = el.nativeElement.parentElement;
       const element = el.nativeElement;
       parentElement.removeChild(element);
       parentElement.parentNode.insertBefore(element, parentElement.nextSibling);
       parentElement.parentNode.removeChild(parentElement);
   }
}