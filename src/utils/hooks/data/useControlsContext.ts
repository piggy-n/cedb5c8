import { createContext } from 'react';
import { initialState } from '@/utils/hooks/data/useControlsStore';
import type { Dispatch } from 'react';
import type { ControlsStoreState } from '@/utils/hooks/data/useControlsStore';

export interface ControlsContextType {
    controlsStore: ControlsStoreState;
    controlsStoreDispatch: Dispatch<Partial<ControlsStoreState>>;
    changePlayStatusHandler: () => void;
}

export const controlsContextDefaultValue: Partial<ControlsContextType> = {
    controlsStore: initialState,
};

export const ControlsContext = createContext<ControlsContextType>(<ControlsContextType>controlsContextDefaultValue);
