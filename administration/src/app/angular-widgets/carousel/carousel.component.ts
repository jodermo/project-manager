import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';


export class CarouselItem {
  constructor(public data?: any) {
  }
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit, OnChanges {

  @ViewChild('carouselContainer', {static: false}) carouselContainerRef?: ElementRef;
  @ViewChild('itemWrapper', {static: false}) itemWrapperRef?: ElementRef;

  @Input() data?: any[];
  @Input() items?: CarouselItem[];
  @Input() currentItem?: CarouselItem;
  @Input() autoSelect = false

  @Output() onNext = new EventEmitter<CarouselItem>();
  @Output() onPrev = new EventEmitter<CarouselItem>();
  @Output() onClick = new EventEmitter<CarouselItem>();


  ready = false;
  showLeftControl = false;
  showRightControl = false;

  wrapperWidth = 0;
  sliderWidth = 0;


  ngAfterViewInit() {
    this.initCarousel();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initCarousel();
  }

  getSize(){
    const index = this.currentIndex();
    this.wrapperWidth = this.carouselContainerRef?.nativeElement.clientWidth || 0;
    this.sliderWidth = this.itemWrapperRef?.nativeElement.clientWidth || 0;
    this.showLeftControl = (this.sliderWidth >  this.wrapperWidth) && index > 0;
    this.showRightControl = (this.sliderWidth >  this.wrapperWidth) &&  this.items ? (index  < this.items.length - 1) : false;
    console.log('getSize', this.wrapperWidth, this.sliderWidth);
  }
  initCarousel() {
    if (this.data) {
      this.items = [];
      for (const data of this.data) {
        this.items.push(new CarouselItem(data));
      }
    }
    if (!this.currentItem && this.items?.length) {
      this.currentItem = this.items[0];
    }
    this.getSize();
    this.ready = true;
    console.log('initCarousel', this);
  }

  nextItem() {
    if (this.items) {
      const index = this.currentIndex();
      if (index + 1 > this.items.length - 1) {
        this.selectItem(this.items[0]);
      } else {
        this.selectItem(this.items[index + 1]);
      }
    }
  }

  prevItem() {
    if (this.items) {
      const index = this.currentIndex();
      if (index - 1 < 0) {
        this.selectItem(this.items[this.items.length - 1]);
      } else {
        this.selectItem(this.items[index - 1]);
      }
    }
  }

  currentIndex() {
    if (this.currentItem && this.items) {
      for (let index = 0; index < this.items.length; index++) {
        if (this.currentItem === this.items[index]) {
          return index;
        }
      }
    }
    return 0;
  }

  selectItem(item: CarouselItem) {
    this.currentItem = item;
    console.log('selectItem', this.currentItem, this.items, this.currentIndex());
  }

  clickItem(item: CarouselItem) {
    if (this.autoSelect) {
      this.selectItem(item);
    }
    if (item.data?.onClick) {
      item.data.onClick();
    }
    this.onClick.emit(item);
  }

  offsetLeft() {
    this.getSize();
    if (this.items) {
      return ((this.currentIndex() / this.items.length) * 100).toFixed(3);
    }
    return 0;
  }
}
