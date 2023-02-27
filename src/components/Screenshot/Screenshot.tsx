import s from './styles/screenshot.scss';
import Draggable from 'react-draggable';
import ziv3 from '@/utils/methods/common/zxImageViewer';
import Icon from '@/components/Icon';
import { useEffect, useRef, useState } from 'react';
import { removeScreenshot } from '@/utils/methods/common/screenshot';
import type { FC, MouseEventHandler } from 'react';

interface ScreenshotProps {
    videoEle: HTMLVideoElement | null;
    canvasEle: HTMLCanvasElement;
    eleId: string;
    uuid: string;
}

const Screenshot: FC<ScreenshotProps> = (opts) => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [imageBase64, setImageBase64] = useState<string>('');
    const screenshotDivRef = useRef<HTMLDivElement>(null);

    const imageClickHandler: MouseEventHandler = (e) => {
        e.stopPropagation();
        const imageArr: string[] = [];

        imageArr.push(imageBase64);

        ziv3.update(imageArr);
        ziv3.view(0);
    };

    useEffect(
        () => {
            const screenshotDiv = screenshotDivRef.current;
            const { canvasEle } = opts;

            if (screenshotDiv && canvasEle) {
                screenshotDiv.innerHTML = '';
                screenshotDiv.appendChild(canvasEle);
            }

            if (canvasEle) {
                setImageBase64(canvasEle.toDataURL('image/png', 1));
            }
        },
        [
            screenshotDivRef.current,
            opts.canvasEle,
        ],
    );

    return (
        <Draggable bounds={'parent'} disabled={disabled}>
            <div className={s.container}>
                <div className={s.close}>
                    <Icon name={'close-1'} onClick={() => removeScreenshot({ ...opts })} />
                </div>
                <div
                    ref={screenshotDivRef}
                    className={s.image}
                    onClick={imageClickHandler}
                    onMouseEnter={() => setDisabled(true)}
                    onMouseLeave={() => setDisabled(false)}
                />
            </div>
        </Draggable>
    );
};

export default Screenshot;
