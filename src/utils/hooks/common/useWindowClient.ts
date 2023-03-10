import { useState, useEffect } from 'react';

interface useWindowSizeType {
    clientX: number;
    clientY: number;
}

const useWindowClient = (): useWindowSizeType => {
    const [windowDistance, setWindowDistance] = useState<useWindowSizeType>({
        clientX: 0,
        clientY: 0,
    });

    useEffect(
        () => {
            function handle(e: MouseEvent) {
                setWindowDistance(() => ({
                        clientX: e.clientX,
                        clientY: e.clientY,
                    }),
                );
            }

            addEventListener('mousemove', handle);

            return () => removeEventListener('mousemove', handle);
        },
        [],
    );

    return { ...windowDistance };
};

export default useWindowClient;
