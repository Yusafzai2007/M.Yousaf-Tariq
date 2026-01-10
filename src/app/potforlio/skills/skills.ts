

import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TechNode {
  name: string;
  proficiency: string;
  experience: string;
  category: string;
  connections: string[];
  left: string;
  top: string;
  gradient: string;
  textColor: string;
  shadow: string;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule,FormsModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class SkillsComponent implements OnInit {
  // Category styling
  categoryStyles: { [key: string]: string } = {
    frontend: 'bg-sky-500/15 border-sky-400/50 text-sky-300',
    backend: 'bg-emerald-500/15 border-emerald-400/50 text-emerald-300',
    database: 'bg-orange-500/15 border-orange-400/50 text-orange-300',
    devops: 'bg-purple-500/15 border-purple-400/50 text-purple-300',
    deployment: 'bg-slate-500/15 border-slate-400/50 text-slate-300',
    tooling: 'bg-rose-500/15 border-rose-400/50 text-rose-300',
    language: 'bg-amber-500/15 border-amber-400/50 text-amber-300',
    auth: 'bg-indigo-500/15 border-indigo-400/50 text-indigo-300',
    design: 'bg-purple-500/15 border-purple-400/50 text-purple-300',
    angular: 'bg-red-500/15 border-red-400/50 text-red-300'
  };

  // Category mapping for filter
  categoryMapping: { [key: string]: string[] } = {
    frontend: ['frontend', 'design'],
    backend: ['backend', 'database', 'devops', 'auth', 'deployment', 'tooling', 'language'],
    design: ['design']
  };



  getCardPosition(): { left: number, top: number } {
  if (!this.hoveredNode || this.isMobile) {
    return { left: 0, top: 0 };
  }

  // Calculate position based on node position
  const nodeElement = document.querySelector(`[data-category="${this.hoveredNode.category}"]`);
  if (!nodeElement) {
    return { left: 100, top: 100 };
  }

  const rect = nodeElement.getBoundingClientRect();
  const cardWidth = 288; // w-72 = 288px
  const cardHeight = 300; // Approximate height

  let left = rect.right + 20;
  let top = rect.top - cardHeight / 2 + rect.height / 2;

  // Check edges
  if (left + cardWidth > window.innerWidth) {
    left = rect.left - cardWidth - 20;
  }
  if (top + cardHeight > window.innerHeight) {
    top = window.innerHeight - cardHeight - 20;
  }
  if (top < 20) {
    top = 20;
  }

  return { left, top };
}

  // Tech nodes data
  techNodes: TechNode[] = [
    {
      name: 'PostgreSQL',
      proficiency: '92%',
      experience: '3 years',
      category: 'database',
      connections: ['SQL', 'Docker', 'Next.js'],
      left: '30%',
      top: '15%',
      gradient: 'from-sky-500 to-sky-700',
      textColor: 'text-white',
      shadow: 'shadow-sky-500/40'
    },
    {
      name: 'SQL',
      proficiency: '95%',
      experience: '4 years',
      category: 'database',
      connections: ['PostgreSQL', 'MongoDB'],
      left: '65%',
      top: '15%',
      gradient: 'from-amber-400 to-orange-500',
      textColor: 'text-slate-950',
      shadow: 'shadow-orange-400/40'
    },
    {
      name: 'Docker',
      proficiency: '88%',
      experience: '2 years',
      category: 'devops',
      connections: ['PostgreSQL', 'Node.js'],
      left: '35%',
      top: '25%',
      gradient: 'from-sky-400 to-sky-600',
      textColor: 'text-white',
      shadow: 'shadow-sky-400/40'
    },
    {
      name: 'MongoDB',
      proficiency: '90%',
      experience: '3 years',
      category: 'database',
      connections: ['Node.js', 'REST APIs'],
      left: '55%',
      top: '25%',
      gradient: 'from-emerald-500 to-emerald-600',
      textColor: 'text-white',
      shadow: 'shadow-emerald-500/40'
    },
    {
      name: 'Node.js',
      proficiency: '93%',
      experience: '3 years',
      category: 'backend',
      connections: ['Express', 'MongoDB', 'REST APIs'],
      left: '65%',
      top: '30%',
      gradient: 'from-emerald-500 to-emerald-700',
      textColor: 'text-white',
      shadow: 'shadow-emerald-500/40'
    },
    {
      name: 'JWT',
      proficiency: '86%',
      experience: '2 years',
      category: 'auth',
      connections: ['Node.js', 'Express'],
      left: '78%',
      top: '27%',
      gradient: 'from-slate-800 to-black',
      textColor: 'text-white',
      shadow: 'shadow-slate-900/60'
    },
    {
      name: 'Postman',
      proficiency: '90%',
      experience: '3 years',
      category: 'tooling',
      connections: ['REST APIs', 'Node.js'],
      left: '35%',
      top: '35%',
      gradient: 'from-orange-500 to-orange-600',
      textColor: 'text-white',
      shadow: 'shadow-orange-500/40'
    },
    {
      name: 'Next.js',
      proficiency: '94%',
      experience: '3 years',
      category: 'frontend',
      connections: ['React', 'TypeScript', 'Vercel'],
      left: '50%',
      top: '35%',
      gradient: 'from-slate-900 to-black',
      textColor: 'text-white',
      shadow: 'shadow-black/70'
    },
    {
      name: 'Material UI',
      proficiency: '85%',
      experience: '2 years',
      category: 'frontend',
      connections: ['React', 'Next.js'],
      left: '32%',
      top: '45%',
      gradient: 'from-sky-500 to-sky-700',
      textColor: 'text-white',
      shadow: 'shadow-sky-500/40'
    },
    {
      name: 'Redux Toolkit',
      proficiency: '89%',
      experience: '2 years',
      category: 'frontend',
      connections: ['React', 'TypeScript'],
      left: '58%',
      top: '40%',
      gradient: 'from-cyan-400 to-cyan-600',
      textColor: 'text-white',
      shadow: 'shadow-cyan-400/40'
    },
    {
      name: 'Express',
      proficiency: '91%',
      experience: '3 years',
      category: 'backend',
      connections: ['Node.js', 'REST APIs', 'JWT'],
      left: '78%',
      top: '37%',
      gradient: 'from-slate-800 to-black',
      textColor: 'text-white',
      shadow: 'shadow-black/60'
    },
    {
      name: 'Tailwind CSS',
      proficiency: '95%',
      experience: '3 years',
      category: 'frontend',
      connections: ['React', 'Next.js', 'ShadCN UI'],
      left: '38%',
      top: '55%',
      gradient: 'from-cyan-400 to-cyan-600',
      textColor: 'text-white',
      shadow: 'shadow-cyan-400/40'
    },
    {
      name: 'JavaScript',
      proficiency: '97%',
      experience: '4 years',
      category: 'language',
      connections: ['React', 'Node.js', 'TypeScript'],
      left: '55%',
      top: '48%',
      gradient: 'from-amber-300 to-amber-500',
      textColor: 'text-slate-900',
      shadow: 'shadow-amber-300/50'
    },
    {
      name: 'REST APIs',
      proficiency: '94%',
      experience: '3 years',
      category: 'backend',
      connections: ['Node.js', 'Express', 'Postman'],
      left: '64%',
      top: '48%',
      gradient: 'from-emerald-500 to-emerald-700',
      textColor: 'text-white',
      shadow: 'shadow-emerald-500/40'
    },
    {
      name: 'TypeScript',
      proficiency: '92%',
      experience: '3 years',
      category: 'language',
      connections: ['React', 'Next.js', 'Node.js'],
      left: '72%',
      top: '58%',
      gradient: 'from-blue-500 to-blue-700',
      textColor: 'text-white',
      shadow: 'shadow-blue-500/40'
    },
    {
      name: 'Framer Motion',
      proficiency: '88%',
      experience: '2 years',
      category: 'design',
      connections: ['React', 'Next.js'],
      left: '78%',
      top: '60%',
      gradient: 'from-blue-600 to-blue-800',
      textColor: 'text-white',
      shadow: 'shadow-blue-700/50'
    },
    {
      name: 'Git',
      proficiency: '93%',
      experience: '4 years',
      category: 'tooling',
      connections: ['GitHub', 'VS Code'],
      left: '48%',
      top: '58%',
      gradient: 'from-rose-500 to-rose-700',
      textColor: 'text-white',
      shadow: 'shadow-rose-500/40'
    },
    {
      name: 'React',
      proficiency: '96%',
      experience: '4 years',
      category: 'frontend',
      connections: ['Next.js', 'Tailwind CSS', 'TypeScript'],
      left: '58%',
      top: '60%',
      gradient: 'from-cyan-400 to-cyan-600',
      textColor: 'text-white',
      shadow: 'shadow-cyan-400/40'
    },
    {
      name: 'ShadCN UI',
      proficiency: '87%',
      experience: '1.5 years',
      category: 'design',
      connections: ['React', 'Tailwind CSS'],
      left: '64%',
      top: '65%',
      gradient: 'from-cyan-500 to-cyan-700',
      textColor: 'text-white',
      shadow: 'shadow-cyan-500/40'
    },
    {
      name: 'React 3 fiber',
      proficiency: '80%',
      experience: '1 year',
      category: 'design',
      connections: ['three.js', 'React'],
      left: '36%',
      top: '70%',
      gradient: 'from-cyan-500 to-cyan-700',
      textColor: 'text-white',
      shadow: 'shadow-cyan-500/40'
    },
    {
      name: 'Vercel',
      proficiency: '93%',
      experience: '3 years',
      category: 'deployment',
      connections: ['Next.js', 'React'],
      left: '55%',
      top: '72%',
      gradient: 'from-slate-900 to-black',
      textColor: 'text-white',
      shadow: 'shadow-black/70'
    },
    {
      name: 'VS Code',
      proficiency: '98%',
      experience: '4 years',
      category: 'tooling',
      connections: ['Git', 'GitHub'],
      left: '62%',
      top: '72%',
      gradient: 'from-blue-500 to-blue-700',
      textColor: 'text-white',
      shadow: 'shadow-blue-600/50'
    },
    {
      name: 'React Query',
      proficiency: '88%',
      experience: '2 years',
      category: 'frontend',
      connections: ['React', 'Next.js'],
      left: '72%',
      top: '75%',
      gradient: 'from-rose-500 to-rose-700',
      textColor: 'text-white',
      shadow: 'shadow-rose-500/40'
    },
    {
      name: 'GitHub',
      proficiency: '94%',
      experience: '4 years',
      category: 'tooling',
      connections: ['Git', 'VS Code'],
      left: '38%',
      top: '78%',
      gradient: 'from-slate-700 to-slate-900',
      textColor: 'text-white',
      shadow: 'shadow-slate-700/50'
    },
    {
      name: 'Angular',
      proficiency: '85%',
      experience: '2 years',
      category: 'angular',
      connections: ['TypeScript', 'RxJS', 'Material UI'],
      left: '48%',
      top: '85%',
      gradient: 'from-red-500 to-red-700',
      textColor: 'text-white',
      shadow: 'shadow-red-500/40'
    },
    {
      name: 'AngularJS',
      proficiency: '75%',
      experience: '1.5 years',
      category: 'angular',
      connections: ['JavaScript', 'jQuery'],
      left: '65%',
      top: '85%',
      gradient: 'from-red-600 to-red-800',
      textColor: 'text-white',
      shadow: 'shadow-red-600/40'
    }
  ];

  // Current state
  filteredNodes: TechNode[] = [];
  activeFilter: string = 'all';
  hoveredNode: TechNode | null = null;
  isMobile: boolean = false;
  showMobileCard: boolean = false;
  mobileSelectedNode: TechNode | null = null;

  ngOnInit() {
    this.filteredNodes = [...this.techNodes];
    this.checkMobile();
    this.applyAnimations();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMobile();
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  applyAnimations() {
    // Spring animation will be applied via CSS classes
  }

  filterNodes(filterType: string) {
    this.activeFilter = filterType;
    
    if (filterType === 'all') {
      this.filteredNodes = [...this.techNodes];
    } else {
      const categoriesToShow = this.categoryMapping[filterType];
      this.filteredNodes = this.techNodes.filter(node => 
        categoriesToShow.includes(node.category)
      );
    }
  }

  onNodeHover(node: TechNode, event?: MouseEvent) {
    if (this.isMobile) return;
    
    this.hoveredNode = node;
    this.showMobileCard = false;
    this.mobileSelectedNode = null;
  }

  onNodeLeave() {
    if (this.isMobile) return;
    this.hoveredNode = null;
  }

  onNodeClick(node: TechNode) {
    if (!this.isMobile) return;
    
    if (this.mobileSelectedNode === node && this.showMobileCard) {
      this.closeMobileCard();
    } else {
      this.mobileSelectedNode = node;
      this.showMobileCard = true;
    }
  }

  closeMobileCard() {
    this.showMobileCard = false;
    this.mobileSelectedNode = null;
  }

  getCategoryStyle(category: string): string {
    return this.categoryStyles[category] || 'bg-slate-500/15 border-slate-400/50 text-slate-300';
  }
}