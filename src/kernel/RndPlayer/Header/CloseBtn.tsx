import Icon from '@/components/Icon';

const CloseBtn = () => {
    const clickHandler = () => {
        console.log(1);
    };

    return (
        <Icon name={'close-2'} title={'关闭'} onClick={clickHandler} />
    );
};

export default CloseBtn;
