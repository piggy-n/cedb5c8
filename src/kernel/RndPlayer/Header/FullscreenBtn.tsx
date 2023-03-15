import Icon from '@/components/Icon';

const FullscreenBtn = () => {
    const clickHandler = () => {
        console.log(1);
    };

    return (
        <Icon
            name={'fullscreen-1'}
            title={'全屏'}
            onClick={clickHandler}
        />
    );
};

export default FullscreenBtn;
