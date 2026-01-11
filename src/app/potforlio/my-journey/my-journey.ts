import { Component, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-journey',
  imports: [CommonModule],
  templateUrl: './my-journey.html',
  styleUrl: './my-journey.css',
})
export class MyJourney implements AfterViewInit {
  animatedItems: boolean[] = [];
  
  constructor(private el: ElementRef) {
    // Initialize animation states
    this.animatedItems = Array(4).fill(false);
  }

  ngAfterViewInit() {
    // Initial check on load
    setTimeout(() => {
      this.checkScroll();
    }, 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    const items = this.el.nativeElement.querySelectorAll('.timeline-item');
    const windowHeight = window.innerHeight;
    const triggerBottom = windowHeight * 0.8; // Trigger when 80% visible

    items.forEach((item: HTMLElement, index: number) => {
      const rect = item.getBoundingClientRect();
      if (rect.top <= triggerBottom) {
        this.animatedItems[index] = true;
      }
    });
  }
}