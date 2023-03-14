import Selector from '@/components/Selector';
import { useContext, useState } from 'react';
import { RndPlayerContext } from '@/utils/hooks/data/useRndPlayerContext';

const StreamSelector = () => {
    const {
        rndPlayerStoreDispatch,
        rndPlayerStore: {
            mode,
            players,
            streamSelectorList,
            selectedStreamList,
        },
    } = useContext(RndPlayerContext);

    const [open, setOpen] = useState<boolean>(false);

    const changeHandler = (val: string[]) => {
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

    const selectHandler = (val: string) => {
        const copyPlayers = [...players];
        const mainPlayer = copyPlayers.find(player => player.isMainPlayer);
        const subPlayer = copyPlayers.find(player => !player.isMainPlayer);

        if (mainPlayer && (mode === 'sg' || !mainPlayer.url)) {
            mainPlayer.url = val;
            return rndPlayerStoreDispatch({
                players: copyPlayers,
            });
        }

        if (subPlayer && !subPlayer.url) {
            subPlayer.url = val;
            return rndPlayerStoreDispatch({
                players: copyPlayers,
            });
        }
    };

    const deselectHandler = (val: string) => {
        const copyPlayers = [...players];
        const player = copyPlayers.find(item => item.url === val);
        const playersUrlListLength = players
            .map(item => item.url)
            .filter(item => item).length;

        if (!player || mode === 'sg' || playersUrlListLength <= 1) return;

        const { isMainPlayer } = player;
        if (isMainPlayer) {
            const subPlayer = copyPlayers.find(item => !item.isMainPlayer);
            if (subPlayer) {
                player.isMainPlayer = false;
                subPlayer.isMainPlayer = true;
            }
        }
        player.url = '';
        rndPlayerStoreDispatch({
            players: copyPlayers,
        });
    };

    if (streamSelectorList.length === 0) return null;
    return (
        <Selector
            mode={'multiple'}
            value={selectedStreamList.filter(item => item !== '')}
            onChange={changeHandler}
            onSelect={selectHandler}
            onDeselect={deselectHandler}
            options={streamSelectorList}
            open={open}
            onDropdownVisibleChange={val => setOpen(val)}
        />
    );
};

export default StreamSelector;
