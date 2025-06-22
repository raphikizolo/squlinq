import { Directive, ElementRef, Input, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core'
import { max, Subject, Subscription } from 'rxjs'

@Directive({
    selector: '[heightUpdater]',
    standalone: true
})
export class HeightUpdaterDirective implements AfterViewInit, OnDestroy 
{
    @Input('heightUpdater') 
    appAutoMaxHeight!: [Subject<number>, string]

    private sub!: Subscription

    private maxHeight = 0
    
    private resizeObserver: ResizeObserver

    constructor(private el: ElementRef, private renderer: Renderer2) 
    {
        this.resizeObserver = new ResizeObserver(entries => this.onSizeChange(entries[0]))
    }
    
    
    private onSizeChange(e: ResizeObserverEntry): void 
    {
        const height = this.el.nativeElement.offsetHeight
        this.maxHeight = height;
        this.appAutoMaxHeight[0].next(height)
        this.sub = this.appAutoMaxHeight[0].subscribe((newHeight) => 
        {
            if(newHeight > this.maxHeight)
            {
                this.maxHeight = newHeight
                this.renderer.setStyle(this.el.nativeElement, 'height', `${newHeight}px`)
            }
        })
    }

    ngAfterViewInit() 
    {
        this.resizeObserver.observe(this.el.nativeElement)
        
    }

    

    

    ngOnDestroy() 
    {
        this.sub?.unsubscribe()
    }
}
