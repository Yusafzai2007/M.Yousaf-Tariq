import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, PLATFORM_ID } from '@angular/core';
import { NgxTypewriterComponent } from '@omnedia/ngx-typewriter';
import { NgxNumberTickerComponent } from '@omnedia/ngx-number-ticker';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgxTypewriterComponent, NgxNumberTickerComponent],
  templateUrl: './main.html',
  styleUrl: './main.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Main {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  downloadCV() {
    // صرف browser میں چلائیں
    if (isPlatformBrowser(this.platformId)) {
      try {
        const cvPath = '/assets/cv/M-Yousaf-Tariq-Full stack development.pdf';
        const fileName = 'M-Yousaf-Tariq-Full-Stack-Developer.pdf';
        
        // Fetch API استعمال کر کے download کریں
        fetch(cvPath)
          .then(response => response.blob())
          .then(blob => {
            // Create a blob URL
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          })
          .catch(error => {
            console.error('CV download failed:', error);
            // Fallback: direct link open
            window.open(cvPath, '_blank');
          });
      } catch (error) {
        console.error('Error downloading CV:', error);
      }
    }
  }
}