import Selector from '@/components/Selector';
import { useContext, useState } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const CameraSelector = () => {
    const {
        rndPlayerStore: {
            cameraSelectorList,
            selectedCameraItem,
        },
    } = useContext(RndPlayerContext);

    const [open, setOpen] = useState<boolean>(false);

    const selectorChangeHandler = (arg: string) => {
        console.log(arg);
        setOpen(false);
    };

    return (
        <Selector
            value={selectedCameraItem}
            onChange={selectorChangeHandler}
            options={cameraSelectorList}
            open={open}
            onDropdownVisibleChange={val => setOpen(val)}
        />
    );
};

export default CameraSelector;
