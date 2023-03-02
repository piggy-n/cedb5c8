import { render } from 'react-dom';
import Screenshot from '@/components/Screenshot';

interface Options {
    videoEle: HTMLVideoElement | null;
    canvasEle?: HTMLCanvasElement;
    eleId: string;
    uuid: string;
}

const capture = (video: HTMLVideoElement) => {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    const w = video.videoWidth;
    const h = video.videoHeight;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    ctx!.drawImage(video, 0, 0, w, h);

    return canvas;
};

const removeScreenshot = (opts: Options) => {
    const { eleId, uuid } = opts;
    const containerEle = document.querySelector(`#${eleId}-${uuid}`);
    const screenshotEle = document.querySelector(`#screenshot-${uuid}`);

    if (containerEle && screenshotEle) {
        containerEle.removeChild(screenshotEle);
    }
};

const createScreenshot = (opts: Options) => {
    const { videoEle, uuid, eleId } = opts;
    if (!videoEle) return;

    const containerEle = document.querySelector(`#${eleId}-${uuid}`);
    const screenshotEle = document.querySelector(`#screenshot-${uuid}`);

    if (screenshotEle) {
        removeScreenshot(opts);
    }

    const screenshotDiv = document.createElement('div');
    screenshotDiv.id = `screenshot-${uuid}`;

    if (containerEle) {
        containerEle.appendChild(screenshotDiv);
    }

    const canvas = capture(videoEle);
    render(<Screenshot {...opts} canvasEle={canvas} />, screenshotDiv);
};

export { createScreenshot, removeScreenshot };
