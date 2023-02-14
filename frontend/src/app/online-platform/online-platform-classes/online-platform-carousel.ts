import { OnlinePlatformService } from '../online-platform.service';

export class OnlinePlatformCarouselLayout {
  itemWidth = 120;
  itemGap = 16;
}

export class OnlinePlatformCarousel {


  loop = false;
  animations = true;
  duration = 8000;
  animationSpeed = 750;

  prevSlide = false;
  nextSlide = false;

  isAnimating = false;
  idle = false;

  private animationTimeout?: any;
  private timeout?: any;

  constructor(public data: any, public length = 2, public layout: OnlinePlatformCarouselLayout = new OnlinePlatformCarouselLayout(), public autoplay = false, public index = 0) {
    this.update();
    this.animationLoop();
  }

  setIndex(index = this.index) {
    this.animationLoop();
    this.index = index;
    return this;
  }

  setAutoplay(autoplay = this.autoplay) {
    this.animationLoop();
    this.autoplay = autoplay;
    return this;
  }

  setLoop(loop = this.loop) {
    this.animationLoop();
    this.loop = loop;
    return this;
  }

  setAnimations(animations = this.animations) {
    this.animations = animations;
    return this;
  }

  setDuration(duration = this.duration) {
    this.duration = duration;
    return this;
  }

  setAnimationSpeed(animationSpeed = this.animationSpeed) {
    this.animationSpeed = animationSpeed;
    return this;
  }

  prev() {
    this.triggerAnimation();
    if (this.index > 0) {
      this.index -= this.length;
      if (this.index < 0) {
        if (this.loop) {
          this.index = this.data.length - 1;
        } else {
          this.index = 0;
        }
      }
    } else if (this.loop) {
      this.index = this.data.length - 1;
    }
  }

  next() {
    this.triggerAnimation();
    if (this.index < this.data.length) {
      this.index += this.length;
      if (this.index >= this.data.length) {
        if (this.loop) {
          this.index = 0;
        } else {
          this.index = this.data.length - 1;
        }
      }
    } else if (this.loop) {
      this.index = 0;
    }
  }


  update(data = this.data, length = this.length) {
    this.data = data;
    this.length = length;


  }

  private triggerAnimation() {
    this.animationLoop();
    if (this.animations) {
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }
      this.isAnimating = true;
      setTimeout(() => {
        this.isAnimating = false;
      });
    } else {
      this.isAnimating = false;
    }
  }

  checkSwipe(e: any, platform: OnlinePlatformService) {

    const time = Date.now() - (platform.mouse.startTime ? platform.mouse.startTime : Date.now());
    platform.mouse.onCarousel = true;
    if (platform.mouse.down && platform.mouse.move && time < platform.swipes.maxTime && time > platform.swipes.minTime) {
      if (platform.mouse.x > platform.mouse.startX + platform.swipes.minDistance) {
        platform.mouse.startX = platform.mouse.x;
        platform.mouse.move = false;
        platform.mouse.down = false;
        this.prev();
      } else if (platform.mouse.x < platform.mouse.startX - platform.swipes.minDistance) {
        platform.mouse.startX = platform.mouse.x;
        platform.mouse.move = false;
        platform.mouse.down = false;
        this.next();
      }
    }
  }


  leave(e: any, platform: OnlinePlatformService) {
    platform.mouse.onCarousel = false;
  }

  animationLoop() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(() => {
      this.triggerAutoplayAnimation();
      this.animationLoop();
    }, this.duration)
  }

  triggerAutoplayAnimation() {
    if (this.autoplay && !this.idle) {
      if (this.index < this.data.length - 1) {
        this.index++;
      } else {
        this.index = 0;
      }
    }
  }
}
