import { create } from 'zustand';

interface StateProps {
    tipTimeoutKeyObj: Record<string, NodeJS.Timeout>;
}

const useTipStore = create<StateProps>(() => ({
    tipTimeoutKeyObj: {},
}));

export default useTipStore;
