import c from 'classnames';
import s from './styles/rndPlayer.scss';
import { Rnd } from 'react-rnd';
import { useRef } from 'react';
import { useRndPlayerStore } from '@/utils/hooks';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import Header from '@/kernel/RndPlayer/Header';
import Content from '@/kernel/RndPlayer/Content/Content';
import type { FC } from 'react';
import type { RndPlayerProps } from '@/index.d';

const RndPlayer: FC<RndPlayerProps> = (
    {
        rndEleOpts,
        rndPlayerContainerEleOpts,
    },
) => {
    const [store, dispatch] = useRndPlayerStore();
    const rndEleRef = useRef<any>();

    return (
        <RndPlayerContext.Provider value={{
            rndEle: rndEleRef.current,
            rndPlayerStore: store,
            rndPlayerStoreDispatch: dispatch,
            rndEleOpts,
            rndPlayerContainerEleOpts,
        }}>
            <Rnd
                ref={rndEleRef}
                bounds={'parent'}
                maxWidth={innerWidth}
                maxHeight={innerHeight}
                {...rndEleOpts}
                lockAspectRatio
                position={store.position}
                minWidth={store.rndMinWidth}
                minHeight={store.rndMinHeight}
                disableDragging={store.disableDragging}
                enableResizing={{
                    right: true,
                    bottom: true,
                    bottomRight: true,
                }}
                className={c(s.rnd_container, rndEleOpts?.className)}
                onDragStop={(e, data) => {
                    dispatch({ position: data });
                    rndEleOpts?.onDragStop?.(e, data);
                }}
                onResizeStop={(
                    e,
                    dir,
                    elementRef,
                    delta,
                    position,
                ) => {
                    dispatch({
                        rndWidth: Number(elementRef.style.width.replace(/\D/g, '')),
                        rndHeight: Number(elementRef.style.height.replace(/\D/g, '')),
                    });
                    rndEleOpts?.onResizeStop?.(e, dir, elementRef, delta, position);
                }}
            >
                <div
                    {...rndPlayerContainerEleOpts}
                    className={c(s.player_container, rndPlayerContainerEleOpts?.className)}
                    style={{
                        ...rndPlayerContainerEleOpts?.style,
                        minWidth: store.rndMinWidth,
                        minHeight: store.rndMinHeight,
                    }}
                    onMouseLeave={(e) => {
                        dispatch({ disableDragging: true });
                        rndPlayerContainerEleOpts?.onMouseLeave?.(e);
                    }}
                >
                    <Header />
                    <Content />
                </div>
            </Rnd>
        </RndPlayerContext.Provider>
    );
};

export default RndPlayer;
