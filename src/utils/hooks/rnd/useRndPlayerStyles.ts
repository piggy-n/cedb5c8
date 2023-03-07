// import type { Props } from 'react-rnd';
// import { useEffect } from 'react';
// import { useMandatoryUpdate } from '@/utils/hooks';
//
// const useRndPlayerStyles = (
//     containerEle: HTMLDivElement | null,
//     rndEleOpts?: Props,
// ) => {
//     const forceUpdate = useMandatoryUpdate();
//     const {
//         minWidth = 480,
//         minHeight = 270,
//         position: {
//             x = 0,
//             y = 0,
//         } = {},
//     } = rndEleOpts || {};
//
//     useEffect(() => {
//
//         if (!containerEle) return forceUpdate();
//         // 找出id开头为"player-"的元素
//         const playerEle = containerEle.querySelector<HTMLDivElement>('[id^="player-"]');
//         console.log('playerEle', playerEle);
//     }, [containerEle]);
//
//     // 监听containerEle元素下的id开头为"player-"的元素的变化
//     useEffect(() => {
//         if (!containerEle) return;
//         const observer = new MutationObserver(() => {
//             console.log('MutationObserver');
//         });
//         observer.observe(containerEle, {
//             childList: true,
//             subtree: true,
//         });
//         return () => {
//             observer.disconnect();
//         };
//     }, [containerEle]);
// };
//
// export default useRndPlayerStyles;
