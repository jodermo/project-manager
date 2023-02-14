export const CanvasImageDefaultWidth = 640;
export const CanvasImageDefaultHeight = 480;


export class CanvasImage {
  canvas = <HTMLCanvasElement><unknown>document.createElement('canvas');
  ctx = this.canvas.getContext('2d');
  image?: HTMLImageElement;

  constructor(public imageSrc?: string, public width = CanvasImageDefaultWidth, public height = CanvasImageDefaultHeight) {
    this.init()
  }

  private init() {
    this.update();
  }

  private updateCanvasSize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  public update() {
    this.updateCanvasSize();
    this.drawImage();
  }

  public drawImage() {
    if (this.image && this.ctx) {
      const hRatio = this.width / this.image.width;
      const vRatio = this.height / this.image.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerX = (this.width - this.image.width * ratio) / 2;
      const centerY = (this.height - this.image.height * ratio) / 2;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height,
        centerX, centerY, this.image.width * ratio, this.image.height * ratio);
    } else if (!this.image && this.imageSrc) {
      this.image = <HTMLImageElement><unknown>document.createElement('img');
      this.image.onload = () => {
        this.drawImage();
      };
      this.image.src = this.imageSrc;
      this.drawImage();
    }
  }
}


export const CanvasMarkerDefaultWidth = 48;
export const CanvasMarkerDefaultHeight = 64;
export const CanvasMarkerDefaultBackgroundColor = '#ffd800';
export const CanvasMarkerDefaultCircleColor = '#ffffff';
export const CanvasMarkerDefaultImageSrc = '/assets/images/marker/dragon.png';

export class CanvasMarker extends CanvasImage {

  constructor(public imageSrc = CanvasMarkerDefaultImageSrc, public backgroundColor = CanvasMarkerDefaultBackgroundColor, public width = CanvasMarkerDefaultWidth, public height = CanvasMarkerDefaultHeight) {
    super(imageSrc, width, height);
  }

  public drawImage() {
    if (this.image && this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawBackground();
      this.drawCircle();
      this.drawMarkerImage();
    } else if (!this.image && this.imageSrc) {
      this.image = <HTMLImageElement><unknown>document.createElement('img');
      this.image.onload = () => {
        this.drawImage();
      };
      this.image.src = this.imageSrc;
      this.drawImage();
    }
  }

  private drawBackground() {
    if (this.image && this.ctx) {
      this.ctx.fillStyle = this.backgroundColor;
      this.ctx.beginPath();
      this.ctx.arc(this.width / 2, this.width / 2, this.width / 2, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.width / 2);
      this.ctx.bezierCurveTo(0, this.width / 2, this.width / 2, 0, this.width, this.width / 2);
      this.ctx.bezierCurveTo(this.width, this.width / 2, this.width, (this.width / 2) + (this.height * .25), this.width / 2, this.height);
      this.ctx.bezierCurveTo(this.width / 2, this.height, 0, (this.width / 2) + (this.height * .25), 0, this.width / 2);
      this.ctx.fill();
    }
  }
  private drawCircle() {
    if (this.image && this.ctx) {
      this.ctx.fillStyle = CanvasMarkerDefaultCircleColor;
      const radius = this.width * 0.75 / 2;
      this.ctx.beginPath();
      this.ctx.arc(this.width / 2, this.width / 2, radius, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
  private drawMarkerImage() {
    if (this.image && this.ctx) {
      const width = this.width * 0.75;
      const height = width;
      const hRatio = width / this.image.width;
      const vRatio = height / this.image.height;
      const ratio = Math.min(hRatio, vRatio);
      const centerX = (this.width - this.image.width * ratio) / 2;
      const centerY = centerX;
      this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height,
        centerX, centerY, this.image.width * ratio, this.image.height * ratio);
    }
  }
}
