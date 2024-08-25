import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[LineTitle]',
  standalone: true

})
export class LineTitleDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  ngAfterViewInit() {
    const parent = this.renderer.createElement('div');
    this.renderer.setStyle(parent, 'display', 'flex');
    this.renderer.setStyle(parent, 'align-items', 'center');
    this.renderer.setStyle(parent, 'justify-content', 'center');
    this.renderer.setStyle(parent, 'margin', '20px 0');

    const lineBefore = this.createLine();
    const lineAfter = this.createLine();

    // Insert lines and title inside the parent
    this.renderer.insertBefore(this.el.nativeElement.parentNode, parent, this.el.nativeElement);
    this.renderer.appendChild(parent, lineBefore);
    this.renderer.appendChild(parent, this.el.nativeElement);
    this.renderer.appendChild(parent, lineAfter);
  }

  private createLine(): HTMLElement {
    const line = this.renderer.createElement('div');
    this.renderer.setStyle(line, 'flex', '1');
    this.renderer.setStyle(line, 'height', '1px');
    this.renderer.setStyle(line, 'background-color', '#78c2ad');
    this.renderer.setStyle(line, 'margin', '0 10px');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return line;
  }
}
