import { Component, signal } from '@angular/core';
import { FormData } from "./form/form-data/form-data";
import { Allcom } from "./all-com/allcom/allcom";

@Component({
  selector: 'app-root',
  imports: [FormData, Allcom],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('libraries');
}
