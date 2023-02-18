import flvjs from 'flv.js';
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

    private error() {
        this.dispatch({});
        console.log(this.uuid);
    }

    private static success() {
        console.log('success');
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
            this.player.on(flvjs.Events.ERROR, this.errorHandler);
            this.ele.addEventListener('canplay', this.successHandler);
        }
    }

    public stop() {
        if (this.player) {
            this.player.off(flvjs.Events.ERROR, this.errorHandler!);
            this.player.unload();
            this.player.detachMediaElement();
            this.player.destroy();
            this.player = undefined;
        }

        if (this.ele) {
            this.ele.removeEventListener('canplay', this.successHandler!);
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
        this.successHandler = this.bindFunc(this, flvPlayer.success);
    }

    public destroy() {
        this.stop();
        this.ele = undefined;
        this.errorHandler = undefined;
        this.successHandler = undefined;
    }
}

export default flvPlayer;
