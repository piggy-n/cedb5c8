import Selector from '@/components/Selector';
import { useContext, useState } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const StreamSelector = () => {
    const {
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            mode,
            streamSelectorList,
            selectedStreamList,
        },
    } = useContext(RndPlayerContext);
    const [open, setOpen] = useState<boolean>(false);

    const selectorChangeHandler = (val: string[]) => {
        setOpen(false);
        if (val.length === 0) return;

        const list = mode === 'sg'
            ? val.filter(item => !selectedStreamList.includes(item))
            : val.filter((item, index) => index !== 1);

        rndPlayerStoreDispatch({
            selectedStreamList: mode === 'sg'
                ? list
                : (val.length > 2 ? list : val),
        });
    };

    if (streamSelectorList.length === 0) return null;
    return (
        <div>
            <Selector
                mode={'multiple'}
                value={selectedStreamList.filter(item => item !== '')}
                onChange={selectorChangeHandler}
                options={streamSelectorList}
                open={open}
                onDropdownVisibleChange={val => setOpen(val)}
            />
        </div>
    );
};

export default StreamSelector;
