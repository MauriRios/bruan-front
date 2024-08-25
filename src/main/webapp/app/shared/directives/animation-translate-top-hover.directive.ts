/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';


@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[translateTopHover]',
  standalone: true
})
export class AnimationTranslateTopHoverDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', '0 2px 4px rgba(0, 0, 0, 0.1)');
    this.renderer.setStyle(this.elementRef.nativeElement, 'transform', 'translateY(-2px)');
    this.renderer.setStyle(this.elementRef.nativeElement, 'transition', 'transform 0.3s');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'box-shadow');
    this.renderer.removeStyle(this.elementRef.nativeElement, 'transform');
  }

}
