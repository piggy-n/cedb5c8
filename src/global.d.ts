declare module '*.css' {
    const styles: { readonly [key: string]: string };
    export default styles;
}

declare module '*.scss' {
    const styles: { readonly [key: string]: string };
    export default styles;
}

declare module 'mp4box' {
    export default class Mp4box {
        constructor();

        public setSegmentOptions(options: any): void;

        public onReady(callback: (info: any) => void): void;

        public onSegment(callback: (segment: any) => void): void;

        public appendBuffer(buffer: ArrayBuffer): void;

        public flush(): void;

        public reset(): void;

        public setExtractionOptions(options: any): void;
    }
}
