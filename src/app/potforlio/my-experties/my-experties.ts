import { Component, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-experties',
  imports: [CommonModule],
  templateUrl: './my-experties.html',
  styleUrls: ['./my-experties.css']
})
export class MyExperties implements AfterViewInit {
  animatedItems: boolean[] = [];
  currentSlide = 0;
  totalSlides = 6; // آپ کے 6 boxes ہیں
  itemsPerView = 3; // Desktop پر 3 boxes دکھائیں گے
  isAnimating = false;

  constructor(private el: ElementRef) {
    this.animatedItems = Array(6).fill(false);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkScroll();
      this.updateItemsPerView(); // Initial call
    }, 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateItemsPerView();
  }

  checkScroll() {
    const items = this.el.nativeElement.querySelectorAll('.skill-item');
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.8;

    items.forEach((item: HTMLElement, index: number) => {
      const rect = item.getBoundingClientRect();
      if (rect.top <= triggerBottom && rect.bottom >= 0) {
        if (!this.animatedItems[index]) {
          setTimeout(() => {
            this.animatedItems[index] = true;
          }, index * 100);
        }
      }
    });
  }

  updateItemsPerView() {
    if (window.innerWidth < 640) {
      this.itemsPerView = 1;
    } else if (window.innerWidth < 1024) {
      this.itemsPerView = 2;
    } else {
      this.itemsPerView = 3;
    }
  }

  nextSlide() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const maxSlide = this.totalSlides - this.itemsPerView;
    
    if (this.currentSlide < maxSlide) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Loop back to start
    }
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  prevSlide() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const maxSlide = this.totalSlides - this.itemsPerView;
    
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = maxSlide; // Loop to end
    }
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  goToSlide(index: number) {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.currentSlide = index;
    
    setTimeout(() => {
      this.isAnimating = false;
    }, 500);
  }

  // Indicators کیلئے
  get pageIndicators(): number[] {
    const indicators = [];
    for (let i = 0; i <= this.totalSlides - this.itemsPerView; i++) {
      indicators.push(i);
    }
    return indicators;
  }
}