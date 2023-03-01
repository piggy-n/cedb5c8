import c from 'classnames';
import s from './styles/tip.scss';
import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useTipStore } from '@/utils/hooks';
import type { FC } from 'react';

interface TipProps {
    msg: string;
    eleId: string;
    uuid: string;
    type?: 'success' | 'error' | 'warning' | 'info';
}

const Tip: FC<TipProps> = (
    {
        msg,
        eleId,
        uuid,
        type = 'info',
    },
) => {
    const { tipTimeoutKeyObj } = useTipStore(s => s);

    const removeHandler = () => {
        tipTimeoutKeyObj[uuid] && clearTimeout(tipTimeoutKeyObj[uuid]);
        if (document.querySelector(`#tip-${uuid}`)) {
            document
                .querySelector(`#${eleId}-${uuid}`)!
                .removeChild(document.querySelector(`#tip-${uuid}`)!);
        }
    };

    useEffect(
        () => {
            // 手动remove元素不触发umount，存储timeoutKey以便手动清除timeout
            tipTimeoutKeyObj[uuid] && clearTimeout(tipTimeoutKeyObj[uuid]);

            useTipStore.setState({
                tipTimeoutKeyObj: {
                    ...tipTimeoutKeyObj,
                    [uuid]: setTimeout(
                        () => removeHandler(),
                        3000,
                    ),
                },
            });
        },
        [],
    );

    return (
        <div className={c(s.container, s[type])}>
            {msg}
        </div>
    );
};

export const createTip = (option: TipProps) => {
    const { eleId, uuid } = option;
    const tip = document.querySelector(`#tip-${uuid}`);

    if (!tip) {
        const container = document.createElement('div');
        const tipWrapperEle = document.querySelector(`#${eleId}-${uuid}`);
        container.id = `tip-${uuid}`;

        if (tipWrapperEle) {
            tipWrapperEle.appendChild(container);
            const root = createRoot(container);
            root.render(<Tip {...option} />);
        }
    }
};

export const removeTip = (option: { uuid: string; eleId: string; }) => {
    const { eleId, uuid } = option;
    const tip = document.querySelector(`#tip-${uuid}`);

    if (tip) {
        const tipWrapperEle = document.querySelector(`#${eleId}-${uuid}`);

        if (tipWrapperEle) {
            tipWrapperEle.removeChild(tip);
        }
    }
};

export const tip = (option: TipProps) => {
    const { eleId, uuid } = option;
    removeTip({ eleId, uuid });
    createTip(option);
};
