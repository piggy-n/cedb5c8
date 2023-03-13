import s from './styles/selector.scss';
import { Select } from 'antd';
import type { FC } from 'react';
import Icon from '@/components/Icon';

type Option = {
    label: string;
    value: string;
    url?: string;
}

interface SelectorProps {
    value?: string[] | string;
    onChange?: (value: string[] | string) => void;
    options?: Option[];
    open?: boolean;
    onDropdownVisibleChange?: (open: boolean) => void;
    mode?: 'multiple' | 'tags';
}

const Selector: FC<SelectorProps> = (
    {
        options = [],
        onChange,
        value,
        open,
        mode,
        onDropdownVisibleChange,
    },
) => {
    return (
        <div className={s.container} id={'ws-selector'}>
            <Select
                value={value}
                size={'small'}
                open={open}
                placeholder={'请选择'}
                mode={mode}
                showArrow
                onChange={onChange}
                suffixIcon={<Icon name={'point'} size={12} />}
                onDropdownVisibleChange={onDropdownVisibleChange}
                getPopupContainer={() => document.getElementById('ws-selector') as HTMLElement}
            >
                {
                    options?.map(item =>
                        <Select.Option key={item.url} value={item.value}>
                            {item.label}
                        </Select.Option>,
                    )
                }
            </Select>
        </div>
    );
};

export default Selector;
