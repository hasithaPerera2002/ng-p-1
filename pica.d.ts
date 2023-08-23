declare module 'pica';
export default function pica(options?: any): PicaInstance;
export interface PicaInstance {
    resize(image: HTMLImageElement | HTMLCanvasElement, targetCanvas: HTMLCanvasElement, options?: any): Promise<HTMLCanvasElement>;
    // Add other methods or properties you intend to use
}
