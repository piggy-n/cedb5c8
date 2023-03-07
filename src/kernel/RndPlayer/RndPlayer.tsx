import c from 'classnames';
import s from './styles/rndPlayer.scss';
import { useRef } from 'react';
import { useRndPlayerStore } from '@/utils/hooks';
import { Rnd } from 'react-rnd';
import type { FC } from 'react';
import type { RndPlayerProps } from '@/index.d';
import Header from '@/kernel/RndPlayer/Header';
// import useRndPlayerStyles from '@/utils/hooks/rnd/useRndPlayerStyles';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';
import Content from '@/kernel/RndPlayer/Content/Content';

const RndPlayer: FC<RndPlayerProps> = (
    {
        rndEleOpts,
        rndPlayerContainerEleOpts,
    },
) => {
    const [store, dispatch] = useRndPlayerStore();
    const rndPlayerContainerEleRef = useRef<HTMLDivElement>(null);

    // useRndPlayerStyles(rndPlayerContainerEleRef.current, rndEleOpts);

    return (
        <RndPlayerContext.Provider value={{
            rndPlayerStore: store,
            rndPlayerStoreDispatch: dispatch,
            rndPlayerContainerEle: rndPlayerContainerEleRef.current,
        }}>
            <Rnd
                bounds={'parent'}
                maxWidth={innerWidth}
                maxHeight={innerHeight}
                lockAspectRatio
                {...rndEleOpts}
                position={store.position}
                minWidth={store.minWidth}
                minHeight={store.minHeight}
                className={c(s.rnd_container, rndEleOpts?.className)}
                onDragStop={(e, data) => {
                    dispatch({ position: data });
                    rndEleOpts?.onDragStop?.(e, data);
                }}
            >
                <div
                    ref={rndPlayerContainerEleRef}
                    {...rndPlayerContainerEleOpts}
                    className={c(s.player_container, rndPlayerContainerEleOpts?.className)}
                    style={{
                        ...rndPlayerContainerEleOpts?.style,
                        minWidth: store.minWidth,
                        minHeight: store.minHeight,
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
