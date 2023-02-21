import screenfull from 'screenfull';

export const fullscreen = async (ele: HTMLDivElement | null) => {
    if (!screenfull.isEnabled || !ele) return false;

    return await screenfull.toggle(ele)
        .then(() => screenfull.isFullscreen)
        .catch(() => false);
};
