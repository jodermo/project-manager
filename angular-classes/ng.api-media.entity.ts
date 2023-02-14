import { NgApiEntity } from './ng.api.entity';

type NgApiMediaType = 'video' | 'audio' | 'video-review';

(window as any).videos = {
    playing: [],
    paused: []
};

export class NgApiMediaEntity extends NgApiEntity {

    public src: string = '';
    public autoplay = true;
    public duration = 0;

    public loading = false;
    public ready = false;
    public visible = false;
    public muted = false;
    public paused = false;
    public currentTime = 0;
    public currentTimePercent = 0;
    public parentElement?: HTMLElement;

    private media?: HTMLMediaElement;

    constructor(httpClient: any, headers: any, public mediaType: NgApiMediaType, staticData?: any) {
        super(httpClient, headers, staticData);
        this.ignoreKeys([
            'loading',
            'ready',
            'muted',
            'paused',
            'currentTime',
            'currentTimePercent',
            'parentElement',
            'media'
        ]);
    }

    appendTo(parentElement?: any, startDelay = 0) {
        if (this.media) {
            this.setMediaHtmlElement(parentElement, startDelay);
        } else {
            this.load(parentElement, () => {
                this.setMediaHtmlElement(parentElement, startDelay);
            });
        }
    }

    show() {
        if (!this.visible) {
            this.visible = true;
            if (this.media) {
                this.media.style.display = 'block';
            }
        }
    }

    hide() {
        if (this.visible) {
            this.visible = false;
            if (this.media) {
                this.media.style.display = 'none';
            }
            this.pause();
        }
    }

    private setMediaHtmlElement(htmlElement?: HTMLMediaElement, startDelay = 0) {
        if (htmlElement) {
            this.load(htmlElement);
        }
    }

    private load(htmlElement: HTMLMediaElement, onLoaded?: any) {
        if (this.src && htmlElement) {
            this.loading = true;
            if (this.media !== htmlElement) {
                this.media = htmlElement;
            }
            this.media.oncanplay = () => {
                if (onLoaded) {
                    onLoaded(this.media);
                }
                if (this.media && this.autoplay) {
                    this.play();
                }
                setTimeout(() => {
                    this.loading = false;
                }, 0);
                this.do('load');
            };
            this.media.onplay = () => {
                this.setVideoPlaying();
            };
            this.media.onpause = () => {
                this.setVideoPaused();
            };
            this.media.ontimeupdate = () => {
                this.loading = false;
                this.updateMedia();
                this.do('time-update');
            };
            this.media.onerror = () => {
                this.error(this.media?.error);
            };
            this.media.src = this.src;
            // this.media.src = decodeURI(this.src);
            this.media.load();
            if (this.media && this.autoplay) {
                this.play();
            }
        }
    }


    play() {
        if (this.media && this.visible) {
            if (this.media.paused) {
                setTimeout(() => {
                    this.media?.play();
                    this.do('play');
                    this.updateMedia();
                }, 0);
            }
        }
    }

    pause() {
        if (this.media) {
            if (!this.media.paused) {
                setTimeout(() => {
                    this.media?.pause();
                    this.do('pause');
                    this.updateMedia();
                }, 0);
            }
        }
    }

    stop() {
        if (this.media) {
            this.setTime(0);
            this.do('stop');
            this.pause();
        }
    }

    replay() {
        if (this.media) {
            this.stop();
            this.do('replay');
            this.play();
        }
    }

    togglePlay() {
        if (this.media) {
            if (this.media.paused) {
                this.play();
            } else {
                this.pause();
            }
            this.do('toggle-play');
        }
    }

    mute() {
        if (this.media) {
            this.media.muted = true;
            this.updateMedia();
            this.do('mute');
        }
    }

    unmute() {
        if (this.media) {
            this.media.muted = false;
            this.updateMedia();
            this.do('unmute');
        }
    }

    toggleMute() {
        if (this.media) {
            this.media.muted = !this.media.muted;
            this.updateMedia();
            this.do('toggle-mute');
        }
    }

    setTime(currentTime = this.currentTime) {
        if (this.media && this.media.currentTime !== currentTime) {
            this.media.currentTime = currentTime;
            this.updateMedia();
            this.do('set-time');
        }
    }

    setTimePercent(currentTimePercent = this.currentTimePercent) {
        if (this.media) {
            const paused = this.media.paused;
            if (!paused) {
                this.media.pause();
            }
            this.media.currentTime = Math.floor((this.media.duration / 100) * currentTimePercent);
            if (!paused) {
                this.media.play();
            }
            this.updateMedia();
            this.do('set-time-percent');
        }
    }

    updateMedia() {
        if (this.media) {
            this.paused = this.media.paused;
            this.muted = this.media.muted;
            this.currentTime = this.media.currentTime;
            this.currentTimePercent = (this.media.currentTime / this.media.duration) * 100;
            this.duration = this.media.duration;
            this.ready = true;
            this.do('update-media');
        } else {
            this.paused = false;
            this.currentTime = 0;
            this.ready = false;
        }
        if (!this.visible && this.media && !this.media.paused) {
            this.pause();
        }
    }

    private setVideoPlaying() {
        if (!(window as any).videos.playing.find((playingVideo: any) => playingVideo === this)) {
            (window as any).videos.playing.push(this);
        }
        for (let i = 0; i < (window as any).videos.paused.length; i++) {
            const video = (window as any).videos.paused[i];
            if (video.id === this.id) {
                (window as any).videos.paused.splice(i, 1);
                return;
            }
        }
    }

    private setVideoPaused() {
        if (!(window as any).videos.paused.find((playingVideo: any) => playingVideo === this)) {
            (window as any).videos.paused.push(this);
        }
        for (let i = 0; i < (window as any).videos.playing.length; i++) {
            const video = (window as any).videos.playing[i];
            if (video.id === this.id) {
                (window as any).videos.playing.splice(i, 1);
                video.pause();
                return;
            }
        }
    }
}
