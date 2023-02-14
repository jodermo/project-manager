import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {AnimationService} from '../animation.service';

export const AnimationComponentTypes = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];
export type AnimationComponentType = typeof AnimationComponentTypes[number];

export interface AnimationComponentAnimation {
  duration: number,
  delay: number,
  type: AnimationComponentType,
  style: (CSSStyleDeclaration | any),
  onStart?: (animation: { old: CSSStyleDeclaration | any, new: CSSStyleDeclaration | any }) => void,
  onEnd?: (animation: { old: CSSStyleDeclaration | any, new: CSSStyleDeclaration | any }) => void,
}

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements AfterViewInit, OnChanges {
  @Input() type: string = 'default';
  @Input() animationDuration = 750;
  @Input() animationDelay = 0;
  @Input() animationType: AnimationComponentType = 'linear';
  @Input() initialStyle: CSSStyleDeclaration | any = {
    opacity: 0
  };
  @Input() style: CSSStyleDeclaration | any;
  @Input() animations: AnimationComponentAnimation[] = [];
  @Output() onAnimationChange = new EventEmitter<{ old: CSSStyleDeclaration | any, new: CSSStyleDeclaration | any }>();
  @Output() onAnimationStart = new EventEmitter<{ old: CSSStyleDeclaration | any, new: CSSStyleDeclaration | any }>();
  @Output() onAnimationEnd = new EventEmitter<{ old: CSSStyleDeclaration | any, new: CSSStyleDeclaration | any }>();
  private currentAnimationIndex = 0;
  nativeElementStyle = this.initialStyle;
  nativeElement: HTMLElement;
  animationService: AnimationService = new AnimationService();
  private animationTimeout?: any;
  animationStart?: (animation: { old: CSSStyleDeclaration | any, new: CSSStyleDeclaration | any }) => void;
  animationEnd?: (animation: { old: CSSStyleDeclaration | any, new: CSSStyleDeclaration | any }) => void;
  ready = false;


  constructor(element: ElementRef) {
    this.nativeElement = element.nativeElement;
  }

  ngAfterViewInit(): void {
    if (this.nativeElement && this.initialStyle) {
      this.animationService.updateStyles(this.initialStyle, this.nativeElement.style);
    }
    setTimeout(() => {
      this.ready = true;
      setTimeout(() => {
        this.animationStart = undefined;
        this.animationEnd = undefined;
        this.style = this.style || this.animationService.style;
        this.animationService.setStyle(this.style);
        this.animateComponent(this.animationService.style, true);
      }, 0);
    }, 0)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.style) {
      this.animationService.setStyle(this.style);
      this.animateComponent(this.animationService.style, changes.animations !== undefined);
    }
  }

  ngOnAnimationChange(cssAnimation: { old: CSSStyleDeclaration | any, new: CSSStyleDeclaration | any }) {
   // console.log('ngOnAnimationChange', cssAnimation);
  }

  ngOnAnimationStart(animation: { old: CSSStyleDeclaration | any, new: CSSStyleDeclaration | any }) {
   // console.log('ngOnAnimationStart', animation);
  }

  ngOnAnimationEnd(animation: { old: CSSStyleDeclaration | any, new: CSSStyleDeclaration | any }) {
    // console.log('ngOnAnimationEnd', animation);
  }

  private triggerAnimations() {
    if (this.currentAnimationIndex < this.animations.length) {
      const animation = this.animations[this.currentAnimationIndex];
      this.animationDuration = animation.duration || 0;
      this.animationDelay = animation.delay || 0;
      this.style = animation.style || {};
      this.animationStart = animation.onStart || undefined;
      this.animationEnd = animation.onEnd || undefined;
      this.animateComponent(this.style, true);
      this.currentAnimationIndex++;
    }
  }

  private animateComponent(cssStyles: CSSStyleDeclaration | any, triggerAnimations = false) {
    this.nativeElementStyle = cssStyles;
    console.log('animateComponent', cssStyles, this.nativeElement);
    if (this.nativeElement) {
      this.animationService.updateTransition(this.nativeElement.style, this);
      const changes = this.animationService.updateStyles(this.nativeElementStyle, this.nativeElement.style);
      this.ngOnAnimationChange(changes);
      this.onAnimationChange.emit(changes);
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }
      this.animationTimeout = setTimeout(() => {
        this.ngOnAnimationStart(changes);
        this.onAnimationStart.emit(changes);
        if (this.animationStart) {
          this.animationStart(changes);
        }
        if (this.animationTimeout) {
          clearTimeout(this.animationTimeout);
        }
        this.animationTimeout = setTimeout(() => {
          this.ngOnAnimationEnd(changes);
          this.onAnimationEnd.emit(changes);
          if (this.animationEnd) {
            this.animationEnd(changes);
          }
          if (triggerAnimations) {
            this.triggerAnimations();
          }
        }, this.animationDuration);
      }, this.animationDelay);

    }
  }


}
