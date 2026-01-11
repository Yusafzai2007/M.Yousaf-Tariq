import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent implements OnInit, OnDestroy {
  // Modal state
  isModalOpen = false;
  selectedProject: any = null;
  currentImageIndex = 0;

  // Platform ID for SSR
  private isBrowser: boolean;

  // Keyboard event handler for modal
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.isBrowser || !this.isModalOpen) return;

    switch (event.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextImage();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.prevImage();
        break;
    }
  }

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // Projects data
  projects = [
    {
      id: 1,
      title: 'YouthHIV Awareness Platform',
      description:
        'Creating Awareness Among Young Minds About Oral Health, Confidence, and Wellbeing',
      liveDemo: 'https://youth-hiv-awareness.vercel.app/index.html',
      github: 'https://github.com/Yusafzai2007',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      images: [
        '/assets/firstImg/5.png',
        '/assets/firstImg/2.png',
        '/assets/firstImg/3.png',
        '/assets/firstImg/4.png',
        '/assets/firstImg/5.png',
        '/assets/firstImg/6.png',
        '/assets/firstImg/7.png',
        '/assets/firstImg/8.png',
        '/assets/firstImg/9.png',
        '/assets/firstImg/10.png',
        '/assets/firstImg/11.png',
      ],
      imageCount: 11,
    },
      {
      id: 6,
      title: 'Potforlio Website',
      description:
        'A modern portfolio website built with React, showcasing 3D animations and smooth transitions using Framer Motion and styled with Tailwind CSS.',
      liveDemo: 'https://pokemon-project-sigma-opal.vercel.app/',
      github: 'https://github.com/Yusafzai2007',
      tags: ['JavaScript', 'Tailwind', 'CSS', 'HTML'],
      images: [
        '/assets/pot/1.webp',
        '/assets/pot/2.webp',
        '/assets/pot/3.webp',
        '/assets/pot/4.webp',
        '/assets/pot/5.webp',
        '/assets/pot/6.webp',
        '/assets/pot/7.webp',
        '/assets/pot/8.webp',
        '/assets/pot/9.webp',
       
      ],
      imageCount: 8,
    },
    {
      id: 2,
      title: 'Tourism Management',
      description:
        'Connecting Young Explorers to Breathtaking Destinations and Unforgettable Experiences',
      liveDemo: 'https://github.com/Yusafzai2007',
      github: 'https://github.com/Yusafzai2007',
      tags: ['React', 'API', 'Tailwind'],
      images: [
        '/assets/tourism/7.jpeg',
        '/assets/tourism/2.jpeg',
        '/assets/tourism/3.jpeg',
        '/assets/tourism/4.jpeg',
        '/assets/tourism/5.jpeg',
        '/assets/tourism/6.jpeg',
        '/assets/tourism/7.jpeg',
        '/assets/tourism/8.jpeg',
        '/assets/tourism/9.jpeg',
        '/assets/tourism/10.jpeg',
        '/assets/tourism/11.jpeg',
        '/assets/tourism/12.jpeg',
        '/assets/tourism/13.jpeg',
        '/assets/tourism/14.jpeg',
        '/assets/tourism/15.jpeg',
        '/assets/tourism/16.jpeg',
        '/assets/tourism/17.jpeg',
        '/assets/tourism/18.jpeg',
        '/assets/tourism/19.jpeg',
      ],
      imageCount: 20,
    },
    {
      id: 4,
      title: 'Softpro Potforlio',
      description:
        'Showcasing Innovative Solutions and Cutting-Edge Projects for the Digital World.',
      liveDemo: '#',
      github: '#',
      tags: ['JavaScript', 'Tailwind', 'CSS', 'HTML'],
      images: [
        '/assets/softpro/1.png',
        '/assets/softpro/2.png',
        '/assets/softpro/3.png',
        '/assets/softpro/4.png',
        '/assets/softpro/6.png',
      ],
      imageCount: 8,
    },
    {
      id: 5,
      title: 'Movie Frontend',
      description:
        'A movie frontend application built with React that integrates with an external movie database API to fetch and display movie information, styled with Tailwind CSS and utilizing react-router-dom for seamless navigation.',
      liveDemo: 'https://react-movies-project-dusky.vercel.app/',
      github: 'https://github.com/Yusafzai2007',
      tags: ['JavaScript', 'Tailwind', 'CSS', 'HTML'],
      images: [
        '/assets/movie/1.webp',
        '/assets/softpro/2.png',
        '/assets/softpro/3.png',
        '/assets/softpro/4.png',
        '/assets/softpro/6.png',
      ],
      imageCount: 8,
    },
  
  ];

  ngOnInit() {
    // SSR-safe initialization
  }

  ngOnDestroy() {
    // Cleanup on component destroy
    if (this.isBrowser && this.isModalOpen) {
      document.body.style.overflow = 'auto';
    }
  }

  // Open modal with project
  openModal(project: any, event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }

    this.selectedProject = project;
    this.currentImageIndex = 0;
    this.isModalOpen = true;

    // Only run in browser
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  // Close modal
  closeModal() {
    this.isModalOpen = false;
    this.selectedProject = null;

    // Only run in browser
    if (this.isBrowser) {
      document.body.style.overflow = 'auto';
    }
  }

  // Next image
  nextImage() {
    if (this.selectedProject && this.selectedProject.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.selectedProject.images.length;
    }
  }

  // Previous image
  prevImage() {
    if (this.selectedProject && this.selectedProject.images.length > 0) {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.selectedProject.images.length) %
        this.selectedProject.images.length;
    }
  }

  // Navigate to specific image
  goToImage(index: number) {
    if (this.selectedProject && index >= 0 && index < this.selectedProject.images.length) {
      this.currentImageIndex = index;
    }
  }

  // Get current image URL (safe for SSR)
  getCurrentImageUrl(): string {
    if (
      this.selectedProject &&
      this.selectedProject.images &&
      this.selectedProject.images[this.currentImageIndex]
    ) {
      return this.selectedProject.images[this.currentImageIndex];
    }
    return '';
  }

  // Prevent modal close when clicking inside modal content
  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }
}
