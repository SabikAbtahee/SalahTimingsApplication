import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[skeletonLoader]',
  standalone: true,
})
export class SkeletonLoaderDirective implements OnInit {
  @Input('skeletonLoader') isLoading: boolean = true;

  private loaderDiv: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.createLoader();
    this.updateLoaderVisibility();
  }

  ngOnChanges() {
    this.updateLoaderVisibility();
  }

  private createLoader() {
    const element = this.el.nativeElement;
    const height = element.offsetHeight || '100px'; // Default height if none
    const width = element.offsetWidth || '100%'; // Default width if none

    // Create loader div
    this.loaderDiv = this.renderer.createElement('div');
    this.renderer.setStyle(this.loaderDiv, 'position', 'absolute');
    this.renderer.setStyle(this.loaderDiv, 'top', '0');
    this.renderer.setStyle(this.loaderDiv, 'left', '0');
    this.renderer.setStyle(this.loaderDiv, 'height', `${height}px`);
    this.renderer.setStyle(this.loaderDiv, 'width', `${width}px`);
    this.renderer.setStyle(this.loaderDiv, 'background', '#e0e0e0');
    this.renderer.setStyle(this.loaderDiv, 'border-radius', '4px');
    this.renderer.setStyle(
      this.loaderDiv,
      'animation',
      'skeleton-loading 1.5s infinite ease-in-out'
    );

    this.renderer.addClass(this.loaderDiv, 'skeleton-loader');

    this.renderer.setStyle(element, 'position', 'relative');
    this.renderer.setStyle(element, 'overflow', 'hidden');
    this.renderer.appendChild(element, this.loaderDiv);
  }

  private updateLoaderVisibility() {
    if (this.isLoading) {
      this.renderer.setStyle(this.loaderDiv, 'display', 'block');
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'hidden');
    } else {
      this.renderer.setStyle(this.loaderDiv, 'display', 'none');
      this.renderer.setStyle(this.el.nativeElement, 'visibility', 'visible');
    }
  }
}
