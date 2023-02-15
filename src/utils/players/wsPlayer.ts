import type { Dispatch } from 'react';
import type { PlayerStoreState } from '@/utils/hooks/data/usePlayerStore';

interface Options {
    dispatch: Dispatch<PlayerStoreState>;
}

class WsPlayer {
    private readonly dispatch: Dispatch<PlayerStoreState>;

    constructor(options: Options) {
        this.dispatch = options.dispatch;
    }
}

export default WsPlayer;
