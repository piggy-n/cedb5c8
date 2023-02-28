import MP4Box from 'mp4box';
import { removeTip, tip } from '@/components/Tip';
import type { Dispatch } from 'react';
import type { PlayerStoreState } from '@/utils/hooks/data/usePlayerStore';

interface Options {
    uuid: string;
    dispatch: Dispatch<Partial<PlayerStoreState>>;
}

class WsPlayer {
    public mp4BoxFile?: any;
    private ws?: WebSocket;
    private ele?: HTMLVideoElement;
    private url?: string;
    private mime?: string;
    private streaming?: boolean;
    private errorTimes: number;
    private transmissionRate: number;
    private mediaSource?: MediaSource;
    private arrayBuffer: ArrayBuffer[];
    private sourceBuffer?: SourceBuffer;
    private errorTimeout?: NodeJS.Timeout;
    private transmissionRateInterval?: NodeJS.Timeout;
    private loadHandler?: () => void;
    private sourceOpenHandler?: () => void;
    private readonly uuid: string;
    private readonly dispatch: Dispatch<Partial<PlayerStoreState>>;

    constructor(options: Options) {
        this.uuid = options.uuid;
        this.dispatch = options.dispatch;
        this.errorTimes = 0;
        this.transmissionRate = 0;
        this.arrayBuffer = [];
    }

    private bindFunc(obj: this, func: any) {
        return function () {
            func.apply(obj, arguments as any);
        };
    }

    private onMessage(data: any, byteLength: number) {
        this.transmissionRate += byteLength / 1024;

        if (!this.mime) {
            data.fileStart = 0;
            this.mp4BoxFile.appendBuffer(data);
        }

        if (this.mime && !this.streaming) {
            const arrayBuffer = this.arrayBuffer.shift();

            if (arrayBuffer && this.sourceBuffer) {
                try {
                    this.sourceBuffer.appendBuffer(arrayBuffer);
                    this.streaming = true;
                } catch (e) {
                    console.log(e);
                    this.error();
                }
            }
        }

        if (
            this.ele &&
            this.ele.duration - this.ele.currentTime > 0.9
        ) {
            this.ele.currentTime = this.ele.duration - 0.5;
        }

        this.arrayBuffer.push(data);
    }

    private sourceOpen() {
        if (this.mediaSource) {
            try {
                this.mediaSource.duration = 1;
            } catch (e) {
                console.log(e);
                this.error();
            }
        }

        if (this.url) {
            this.ws = new WebSocket(this.url);
            this.ws.binaryType = 'arraybuffer';

            this.ws.onmessage = (e) => {
                this.onMessage(e.data, e.data.byteLength);
            };

            this.ws.onopen = () => {
                this.success();
            };

            this.ws.onerror = () => {
                this.error();
            };
        }
    }

    load() {
        if (this.sourceBuffer?.updating) return;

        if (this.arrayBuffer.length > 0) {
            const arrayBuffer = this.arrayBuffer.shift();

            if (arrayBuffer && this.sourceBuffer) {
                try {
                    this.sourceBuffer.appendBuffer(arrayBuffer);
                } catch (e) {
                    console.log(e);
                    this.error();
                }
            }
        } else {
            this.streaming = false;
        }
    }

    private closeVideo() {
        this.dispatch({
            videoLoadFailedVal: Date.now(),
        });

        this.stop();

        tip({
            msg: '视频加载失败',
            eleId: 'player',
            uuid: this.uuid,
            type: 'error',
        });
    }

    private error() {
        this.dispatch({
            canplay: false,
            videoLoadErrorVal: Date.now(),
        });

        this.errorTimeout && clearTimeout(this.errorTimeout);
        this.errorTimeout = setTimeout(
            () => {
                this.errorTimes++;

                if (this.errorTimes > 3) {
                    return this.closeVideo();
                }

                this.reload();

                tip({
                    msg: `视频加载错误，正在进行第 ${this.errorTimes} 次重连`,
                    eleId: 'player',
                    uuid: this.uuid,
                    type: 'error',
                });
            },
            3500,
        );
    }

    private success() {
        this.dispatch({
            canplay: true,
            videoCanplayVal: Date.now(),
        });

        this.transmissionRateInterval && clearInterval(this.transmissionRateInterval);
        this.transmissionRateInterval = setInterval(
            () => {
                this.dispatch({
                    transmissionRate: this.transmissionRate,
                });
                this.transmissionRate = 0;
            },
            1000,
        );

        if (this.errorTimes) {
            this.errorTimes = 0;
            this.errorTimeout && clearTimeout(this.errorTimeout);
            this.errorTimeout = undefined;

            tip({
                msg: '视频重连成功',
                eleId: 'player',
                uuid: this.uuid,
                type: 'success',
            });
        }
    }

    private registerEvents() {
        this.mp4BoxFile.onReady = (info: { mime: string | undefined; }) => {
            if (
                info.mime &&
                this.mediaSource &&
                MediaSource.isTypeSupported(info.mime)
            ) {
                this.mime = info.mime;
                this.sourceBuffer = this.mediaSource.addSourceBuffer(info.mime);

                if (this.sourceBuffer && this.loadHandler) {
                    this.sourceBuffer.mode = 'sequence';
                    this.sourceBuffer.addEventListener('updateend', this.loadHandler);
                }

                this.dispatch({
                    mime: this.mime.includes('hvc1') ? 'H.265' : 'H.264',
                });
            }
        };
    }

    public start(url: string) {
        if (!url) return this.stop();
        if (this.ele && this.sourceOpenHandler) {
            this.dispatch({
                mime: '',
                loading: true,
                canplay: false,
                videoCanplayVal: 0,
                videoLoadErrorVal: 0,
                videoLoadFailedVal: 0,
            });

            this.url = url;
            this.mediaSource = new MediaSource();
            this.mediaSource.addEventListener('sourceopen', this.sourceOpenHandler);
            this.ele.src = URL.createObjectURL(this.mediaSource);
            this.mp4BoxFile = MP4Box.createFile();
            this.registerEvents();
        }
    }

    public stop() {
        this.dispatch({
            mime: '',
            loading: false,
            canplay: false,
        });

        removeTip({
            uuid: this.uuid,
            eleId: 'player',
        });

        this.pause();

        if (this.errorTimes) {
            this.errorTimes = 0;
        }

        if (this.errorTimeout) {
            clearTimeout(this.errorTimeout);
            this.errorTimeout = undefined;
        }

        if (this.mp4BoxFile) {
            this.mp4BoxFile.stop();
            this.mp4BoxFile = undefined;
        }

        if (this.sourceBuffer) {
            this.sourceBuffer.removeEventListener('updateend', this.loadHandler!);
            this.mediaSource?.removeSourceBuffer(this.sourceBuffer);
            this.sourceBuffer = undefined;
        }

        if (this.mediaSource) {
            this.mediaSource.removeEventListener('sourceopen', this.sourceOpenHandler!);
            this.mediaSource = undefined;
        }

        this.mime = undefined;
        this.streaming = false;
        this.arrayBuffer = [];
    }

    public play() {
        this.sourceOpen();
        this.ele?.play();
    }

    public pause() {
        this.ele?.pause();

        if (this.ws) {
            this.ws.close();
            this.ws.onopen = null;
            this.ws.onmessage = null;
            this.ws.onerror = null;
            this.ws = undefined;
        }

        if (this.transmissionRateInterval) {
            clearInterval(this.transmissionRateInterval);
        }

        this.dispatch({
            transmissionRate: 0,
        });
    }

    public reload() {
        this.pause();
        this.play();
    }

    public init(ele: HTMLVideoElement) {
        this.ele = ele;
        this.loadHandler = this.bindFunc(this, this.load);
        this.sourceOpenHandler = this.bindFunc(this, this.sourceOpen);
    }

    public destroy() {
        this.stop();
        this.ele = undefined;
        this.url = undefined;
        this.loadHandler = undefined;
        this.sourceOpenHandler = undefined;
    }
}

export default WsPlayer;
