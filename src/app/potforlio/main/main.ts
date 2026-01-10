import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
    import { NgxNumberTickerComponent } from '@omnedia/ngx-number-ticker';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgxTypewriterComponent,NgxNumberTickerComponent],
  templateUrl: './main.html',
  styleUrl: './main.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA], // <-- allow web components

})
export class Main {}
