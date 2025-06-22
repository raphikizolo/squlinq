import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainView } from './main-view/main.view';
import { COMMON_MODULES } from './app.config';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MainView, FlexLayoutModule],
  standalone: true
})
export class AppComponent 
{
  title = 'squlinq';
}
