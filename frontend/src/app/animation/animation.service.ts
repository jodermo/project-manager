import { AnimationComponent } from './animation/animation.component';

export class AnimationService {

  style: CSSStyleDeclaration | any = {
    opacity: 1
  };

  constructor() {
  }

  updateTransition(css: CSSStyleDeclaration, animationComponent: AnimationComponent) {
    css.transition = 'All ' + (animationComponent.animationDuration / 1000).toFixed(2) + 's ' + animationComponent.animationType || 'linear';
    css.transitionDelay = (animationComponent.animationDelay / 1000).toFixed(2) + 's';
  }

  updateStyles(cssStyle: CSSStyleDeclaration | any, css: CSSStyleDeclaration) {

    const result = {
      old: {} as any,
      new: {} as any
    }
    if (css) {
      if (cssStyle && typeof cssStyle === 'object') {
        for (const attribute in (cssStyle as any)) {
          if ((css as any)[attribute] !== (cssStyle as any)[attribute]) {
            result.old[attribute] = (css as any)[attribute];
            (css as any)[attribute] = (cssStyle as any)[attribute];
            result.new[attribute] = (css as any)[attribute];
          }
        }
      }
    }
    return result
  }

  setStyle(cssStyle = this.style) {
    this.style = cssStyle;
  }

}
