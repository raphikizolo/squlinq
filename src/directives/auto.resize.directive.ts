import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[auto-resize]',
    standalone: false
 })
export class AutoResizeDirective 
{
    
    constructor(private el: ElementRef, private renderer: Renderer2) 
    {

    }

    ngAfterViewInit() 
    {
        this.resize();
    }

    @HostListener('input')
    @HostListener('ngModelChange')
    onChange() 
    {
        this.resize();
    }

    private resize() 
    {
        const element = this.el.nativeElement;

        // Temporarily set width/height to 'auto' to measure content
        this.renderer.setStyle(element, 'width', 'auto');
        this.renderer.setStyle(element, 'height', 'auto');

        // Resize to scroll size
        const newWidth = element.scrollWidth + 2 + 'px';
        const newHeight = element.scrollHeight + 2 + 'px';

        this.renderer.setStyle(element, 'width', newWidth);
        this.renderer.setStyle(element, 'height', newHeight);
    }
}