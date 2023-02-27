import c from 'classnames';
import s from './styles/icon.scss';
import '@/utils/methods/common/importAll';
import type { CSSProperties, FC, SVGAttributes } from 'react';

interface IconProps extends SVGAttributes<SVGElement> {
    name: string;
    size?: number;
    title?: string;
    useEleStyles?: CSSProperties;
}

const Icon: FC<IconProps> = (
    {
        className,
        name,
        size,
        style,
        title,
        useEleStyles,
        ...rest
    },
) => {
    return (
        <svg
            className={c(s.container, className)}
            style={{
                width: size && `${size}px`,
                height: size && `${size}px`,
                ...style,
            }}
            {...rest}
        >
            {
                title &&
                <title>{title}</title>
            }
            <use
                xlinkHref={`#ws-${name}`}
                style={useEleStyles}
            />
        </svg>
    );
};

export default Icon;
