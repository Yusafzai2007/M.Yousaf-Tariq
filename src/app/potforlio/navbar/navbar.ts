import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  isOpen = false;
  activeSection = 'home';
  
  // Sections configuration
  sections = [
    { id: 'home', name: 'Home', offset: 0 },
    { id: 'projects', name: 'Projects', offset: 100 },
    { id: 'skills', name: 'Skills', offset: 100 },
    { id: 'journey', name: 'Journey', offset: 100 },
    { id: 'Experience', name: 'Experience', offset: 100 },
    { id: 'contact', name: 'Contact', offset: 100 }
  ];

  private isBrowser: boolean;
  private scrollListener: any;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Initial check
      setTimeout(() => this.checkActiveSection(), 100);
      
      // Listen to scroll events
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.onScroll.bind(this));
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    if (this.isBrowser) {
      this.checkActiveSection();
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }

  // Scroll to section smoothly
  scrollToSection(sectionId: string) {
    if (this.isBrowser) {
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -80; // Adjust for navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
        
        this.activeSection = sectionId;
      }
    }
  }

  // Check which section is currently in view
  checkActiveSection() {
    if (!this.isBrowser) return;

    const scrollPosition = window.scrollY + 100; // Offset for navbar

    // Find current active section
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(this.sections[i].id);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          this.activeSection = this.sections[i].id;
          break;
        }
      }
    }
  }

  // Get CSS class for desktop navigation
  getNavClass(sectionId: string): string {
    const isActive = this.activeSection === sectionId;
    if (isActive) {
      return 'px-5 py-2 text-sm font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-xl cursor-pointer';
    }
    return 'px-4 py-2 text-sm text-gray-400 hover:text-emerald-300 cursor-pointer';
  }

  // Get CSS class for mobile navigation
  getMobileNavClass(sectionId: string): string {
    const isActive = this.activeSection === sectionId;
    if (isActive) {
      return 'px-6 py-3 text-emerald-400 cursor-pointer';
    }
    return 'px-6 py-3 text-gray-300 hover:text-emerald-300 cursor-pointer';
  }
}