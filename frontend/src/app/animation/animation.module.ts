import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationComponent } from './animation/animation.component';
import { AnimationService } from './animation.service';
import { AnimatedTextComponent } from './animation/animated-text/animated-text.component';
import { AnimatedImageComponent } from './animation/animated-image/animated-image.component';
import { AnimatedBoxComponent } from './animation/animated-box/animated-box.component';

@NgModule({
  declarations: [
    AnimationComponent,
    AnimatedTextComponent,
    AnimatedImageComponent,
    AnimatedBoxComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AnimationService
  ],
    exports: [
        AnimationComponent,
        AnimatedTextComponent,
        AnimatedImageComponent,
        AnimatedBoxComponent,
    ]
})
export class AnimationModule { }
