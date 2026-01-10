import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './template-form.html',
  styleUrl: './template-form.css',
})
export class TemplateForm {
  studentform = {
    firstName: '',
    password: '',
    email: '',
  };

  submitForm() {
    console.log(this.studentform);
  }
}
