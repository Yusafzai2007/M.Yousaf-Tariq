import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-form-data',
  imports: [],
  templateUrl: './form-data.html',
  styleUrl: './form-data.css',
})
export class FormData implements OnInit, OnDestroy, AfterViewInit {
@Input() glitchColors: string[] = ["#2b4539", "#61dca3", "#61b3dc"];
  @Input() glitchSpeed: number = 50;
  @Input() centerVignette: boolean = false;
  @Input() outerVignette: boolean = true;
  @Input() smooth: boolean = true;
  @Input() characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';
  @Input() opacity: number = 0.08;

  @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private animationId: number | null = null;
  private letters: Array<{
    char: string;
    color: string;
    targetColor: string;
    colorProgress: number;
  }> = [];

  private grid = { columns: 0, rows: 0 };
  private context: CanvasRenderingContext2D | null = null;
  private lastGlitchTime: number = Date.now();

  private lettersAndSymbols: string[] = [];
  private readonly fontSize: number = 17;
  private readonly charWidth: number = 10;
  private readonly charHeight: number = 20;

  private resizeTimeout: any;

  constructor() {}

  ngOnInit(): void {
    this.lettersAndSymbols = Array.from(this.characters);
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.startAnimation();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }

    this.resizeTimeout = setTimeout(() => {
      this.stopAnimation();
      this.resizeCanvas();
      this.startAnimation();
    }, 100);
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.context = canvas.getContext('2d');
    this.resizeCanvas();
  }

  private getRandomChar(): string {
    return this.lettersAndSymbols[Math.floor(Math.random() * this.lettersAndSymbols.length)];
  }

  private getRandomColor(): string {
    return this.glitchColors[Math.floor(Math.random() * this.glitchColors.length)];
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  private interpolateColor(
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ): string {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  }

  private calculateGrid(width: number, height: number): { columns: number; rows: number } {
    const columns = Math.ceil(width / this.charWidth);
    const rows = Math.ceil(height / this.charHeight);
    return { columns, rows };
  }

  private initializeLetters(columns: number, rows: number): void {
    this.grid = { columns, rows };
    const totalLetters = columns * rows;
    this.letters = Array.from({ length: totalLetters }, () => ({
      char: this.getRandomChar(),
      color: this.getRandomColor(),
      targetColor: this.getRandomColor(),
      colorProgress: 1,
    }));
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const parent = canvas.parentElement;

    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (this.context) {
      this.context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = this.calculateGrid(rect.width, rect.height);
    this.initializeLetters(columns, rows);
    this.drawLetters();
  }

  private drawLetters(): void {
    if (!this.context || this.letters.length === 0) return;

    const ctx = this.context;
    const { width, height } = this.canvasRef.nativeElement.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
ctx.font = `bold ${this.fontSize + 1}px monospace`;
    ctx.textBaseline = 'top';
ctx.shadowColor = "rgba(0, 255, 156, 0.9)";
    ctx.shadowBlur = 4;

    this.letters.forEach((letter, index) => {
      const x = (index % this.grid.columns) * this.charWidth;
      const y = Math.floor(index / this.grid.columns) * this.charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  }

  private updateLetters(): void {
    if (!this.letters || this.letters.length === 0) return;

    const updateCount = Math.max(1, Math.floor(this.letters.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * this.letters.length);
      if (!this.letters[index]) continue;

      this.letters[index].char = this.getRandomChar();
      this.letters[index].targetColor = this.getRandomColor();

      if (!this.smooth) {
        this.letters[index].color = this.letters[index].targetColor;
        this.letters[index].colorProgress = 1;
      } else {
        this.letters[index].colorProgress = 0;
      }
    }
  }

  private handleSmoothTransitions(): void {
    let needsRedraw = false;

    this.letters.forEach((letter) => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = this.hexToRgb(letter.color);
        const endRgb = this.hexToRgb(letter.targetColor);

        if (startRgb && endRgb) {
          letter.color = this.interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      this.drawLetters();
    }
  }

  private animate = (): void => {
    const now = Date.now();
    if (now - this.lastGlitchTime >= this.glitchSpeed) {
      this.updateLetters();
      this.drawLetters();
      this.lastGlitchTime = now;
    }

    if (this.smooth) {
      this.handleSmoothTransitions();
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  private startAnimation(): void {
    this.animationId = requestAnimationFrame(this.animate);
  }

  private stopAnimation(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
