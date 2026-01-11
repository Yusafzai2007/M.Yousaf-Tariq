import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  // EmailJS configuration
  private readonly emailJsServiceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS Service ID
  private readonly emailJsTemplateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS Template ID
  private readonly emailJsPublicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS Public Key

  // onSubmit() {
  //   // Reset messages
  //   this.successMessage = '';
  //   this.errorMessage = '';
    
  //   // Validate form
  //   if (!this.formData.name || !this.formData.email || !this.formData.message) {
  //     this.errorMessage = 'Please fill in all fields';
  //     return;
  //   }

  //   // Email validation
  //   const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   if (!emailPattern.test(this.formData.email)) {
  //     this.errorMessage = 'Please enter a valid email address';
  //     return;
  //   }

  //   this.isSubmitting = true;

  //   // Prepare email data
  //   const templateParams = {
  //     from_name: this.formData.name,
  //     from_email: this.formData.email,
  //     message: this.formData.message,
  //     to_email: 'yusafzai2007@gmail.com'
  //   };

  //   // Send email using EmailJS
  //   // emailjs.send(
  //   //   this.emailJsServiceId,
  //   //   this.emailJsTemplateId,
  //   //   templateParams,
  //   //   this.emailJsPublicKey
  //   // )
  //   // .then((response) => {
  //   //   console.log('Email sent successfully!', response.status, response.text);
  //   //   this.successMessage = 'Message sent successfully! I\'ll get back to you soon.';
      
  //   //   // Reset form
  //   //   this.formData = {
  //   //     name: '',
  //   //     email: '',
  //   //     message: ''
  //   //   };
  //   // })
  //   .catch((error) => {
  //     console.error('Error sending email:', error);
  //     this.errorMessage = 'Failed to send message. Please try again or email me directly at yusafzai2007@gmail.com';
      
  //     // Fallback: Open email client with pre-filled data
  //     this.sendViaMailClient();
  //   })
  //   .finally(() => {
  //     this.isSubmitting = false;
  //   });
  // }

  // Alternative method: Open email client as fallback
  private sendViaMailClient() {
    const subject = `Message from ${this.formData.name}`;
    const body = `Name: ${this.formData.name}%0D%0AEmail: ${this.formData.email}%0D%0A%0D%0AMessage:%0D%0A${this.formData.message}`;
    
    window.location.href = `mailto:yusafzai2007@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}