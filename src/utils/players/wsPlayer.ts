import type { Dispatch } from 'react';
import type { PlayerStoreState } from '@/utils/hooks/data/usePlayerStore';

interface Options {
    uuid: string;
    dispatch: Dispatch<PlayerStoreState>;
}

class WsPlayer {
    private readonly uuid: string;
    private readonly dispatch: Dispatch<PlayerStoreState>;

    constructor(options: Options) {
        this.uuid = options.uuid;
        this.dispatch = options.dispatch;
    }

    test() {
        console.log(this.uuid);
        this.dispatch({});
    }
}

export default WsPlayer;
