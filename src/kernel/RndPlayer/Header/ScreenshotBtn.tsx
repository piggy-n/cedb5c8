import Icon from '@/components/Icon';

const ScreenshotBtn = () => {

    const screenshotHandler = () => {
        console.log('screenshotHandler');
    };

    return (
        <Icon name={'screenshot-2'} title={'截图'} onClick={screenshotHandler} />
    );
};

export default ScreenshotBtn;
