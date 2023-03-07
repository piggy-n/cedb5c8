import { useEffect, useRef } from 'react';
import { isFunction } from 'ahooks/es/utils';

const DEFAULT_OPTIONS: MutationObserverInit = {
    attributes: true,
    childList: true,
    subtree: true,
};

const useMutationObserver = (
    targetEle: HTMLElement | null,
    callback: () => void,
    options?: MutationObserverInit,
) => {
    const _window = window as any;
    const MutationObserver =
        _window.MutationObserver ||
        _window.WebKitMutationObserver ||
        _window.MozMutationObserver;
    const observerRef = useRef<MutationObserver>();

    useEffect(
        () => {
            if (!targetEle || !isFunction(callback)) return;
            const observer = new MutationObserver(callback);
            observer.observe(targetEle, options || DEFAULT_OPTIONS);
            observerRef.current = observer;

            return () => {
                observerRef.current?.disconnect();
                observerRef.current?.takeRecords();
                observerRef.current = undefined;
            };
        },
        [targetEle, callback, options],
    );
};

export default useMutationObserver;
