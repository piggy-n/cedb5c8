import flvjs from 'flv.js';
import { removeTip, tip } from '@/components/Tip';
import type { Dispatch } from 'react';
import type { PlayerStoreState } from '@/utils/hooks/data/usePlayerStore';

interface Options {
    uuid: string;
    dispatch: Dispatch<PlayerStoreState>;
}

class flvPlayer {
    private readonly uuid: string;
    private readonly dispatch: Dispatch<PlayerStoreState>;
    private player?: flvjs.Player;
    private ele?: HTMLVideoElement;
    private errorTimes: number;
    private errorTimeout?: NodeJS.Timeout;
    private errorHandler?: () => void;
    private successHandler?: () => void;

    constructor(options: Options) {
        this.uuid = options.uuid;
        this.dispatch = options.dispatch;
        this.errorTimes = 0;
    }

    private bindFunc(obj: this, func: any) {
        return function () {
            func.apply(obj, arguments as any);
        };
    }

    private closeVideo() {
        this.stop();
        tip({
            msg: '视频加载失败',
            eleId: 'player',
            uuid: this.uuid,
            type: 'error',
        });

        this.dispatch({});
    }

    private error() {
        if (this.errorTimes <= 3) {
            this.errorTimeout && clearTimeout(this.errorTimeout);
            this.errorTimeout = setTimeout(
                () => {
                    this.errorTimes++;

                    if (this.errorTimes > 3) {
                        return this.closeVideo();
                    }

                    tip({
                        msg: `视频加载错误，正在进行第 ${this.errorTimes} 次重连`,
                        eleId: 'player',
                        uuid: this.uuid,
                        type: 'error',
                    });

                    this.reload();
                },
                3500
            );
        }
    }

    private success() {
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

        this.dispatch({
            mime: 'H.264',
        });
    }

    public play() {
        if (this.player) {
            this.player.play();
        }
    }

    public pause() {
        if (this.player) {
            this.player.pause();
        }
    }

    public reload() {
        if (this.player) {
            this.player.unload();
            this.player.load();
            this.player.play();
        }
    }

    public start(url: string) {
        if (
            flvjs.isSupported() &&
            this.ele &&
            this.errorHandler &&
            this.successHandler
        ) {
            this.player = flvjs.createPlayer(
                {
                    url,
                    type: 'mp4',
                    isLive: false,
                    hasVideo: true,
                    hasAudio: false,
                },
            );

            this.player.attachMediaElement(this.ele);
            this.player.load();
            this.ele.addEventListener('error', this.errorHandler);
            this.ele.addEventListener('canplay', this.successHandler);
        }
    }

    public stop() {
        removeTip({
            uuid: this.uuid,
            eleId: 'player'
        });

        if (this.player) {
            this.player.unload();
            this.player.detachMediaElement();
            this.player.destroy();
            this.player = undefined;
        }

        if (
            this.ele &&
            this.errorHandler &&
            this.successHandler
        ) {
            this.ele.removeEventListener('error', this.errorHandler);
            this.ele.removeEventListener('canplay', this.successHandler);
        }

        if (this.errorTimes) {
            this.errorTimes = 0;
        }

        if (this.errorTimeout) {
            clearTimeout(this.errorTimeout);
            this.errorTimeout = undefined;
        }
    }

    public init(ele: HTMLVideoElement) {
        this.ele = ele;
        this.errorHandler = this.bindFunc(this, this.error);
        this.successHandler = this.bindFunc(this, this.success);
    }

    public destroy() {
        this.stop();
        this.ele = undefined;
        this.errorHandler = undefined;
        this.successHandler = undefined;
    }
}

export default flvPlayer;
