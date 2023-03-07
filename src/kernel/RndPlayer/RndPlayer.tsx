import c from 'classnames';
import s from './styles/rndPlayer.scss';
import { Rnd } from 'react-rnd';
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

    return (
        <RndPlayerContext.Provider value={{
            rndPlayerStore: store,
            rndPlayerStoreDispatch: dispatch,
            rndEleOpts,
            rndPlayerContainerEleOpts,
        }}>
            <Rnd
                bounds={'parent'}
                maxWidth={innerWidth}
                maxHeight={innerHeight}
                lockAspectRatio
                enableResizing={{
                    right: true,
                    bottom: true,
                    bottomRight: true,
                }}
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
