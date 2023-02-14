import { Component, Input, SimpleChanges } from '@angular/core';
import { OnlinePlatformCarousel } from '../../online-platform-classes/online-platform-carousel';
import { OnlinePlatformService } from '../../online-platform.service';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.scss']
})
export class ImageCarouselComponent {

  @Input() imagesSources: string[] = [];
  @Input() itemNumber: number = 1;
  @Input() navigation = true;
  @Input() autoplay = true;
  @Input() loop = true;
  carousel?: OnlinePlatformCarousel;

  itemWidth = 100;

  constructor(public platform: OnlinePlatformService) {
    this.carousel = this.platform.carousel(this.imagesSources, this.itemNumber);

  }

  ngAfterViewInit(): void {
    this.updateCarousel();
    this.initCarousel();

  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateCarousel();
    if (changes.categories) {
      this.initCarousel();
    }

  }

  initCarousel() {
    if (this.itemNumber) {
      this.itemWidth = 100 / this.itemNumber;
    }
    setTimeout(() => {
      this.carousel?.update(this.imagesSources, this.itemNumber);
    }, 0);
  }

  updateCarousel() {
    if (this.carousel) {
      this.carousel.autoplay = this.autoplay;
      this.carousel.loop = this.loop;
    }
  }


}
