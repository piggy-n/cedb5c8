import { useMemo } from 'react';
import type { PlayerMethods } from '@/index.d';

const usePlayerMethods = () => {
    const play = () => {
        console.log('play');
    };

    const pause = () => {
        console.log('pause');
    };

    const reload = () => {
        console.log('reload');
    };

    const setPlayProgress = (progress: number) => {
        console.log(progress);
    };

    const setVideoSrc = (src: string) => {
        console.log(src);
    };

    return useMemo<PlayerMethods>(
        () => ({
            play,
            pause,
            reload,
            setPlayProgress,
            setVideoSrc,
        }),
        []
    );
};

export default usePlayerMethods;
