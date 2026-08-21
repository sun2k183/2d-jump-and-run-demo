/******************************************************************************************************************************************
 *
 * Filename    : graphics-engine-main.ts
 * Classes     : GraphicsLoop
 * Description : Graphics loop base class to draw on a canvas
 *
 * www.sunshine2k.de | www.bastian-molkenthin.de
 *
 * This file is licensed under MIT licence. For further details, see http://www.sunshine2k.de/license.html.
 *
 *****************************************************************************************************************************************/

import { Fps } from "./graphics-engine-fps.js";

function mykeydown(ev:  KeyboardEvent) {
    console.log(ev.key)
}



/**
 * @class GraphicsLoop
 */
export abstract class GraphicsLoop {
    /** HTML main canvas element */
    protected canvasMain: HTMLCanvasElement;
    /** HTML double-buffered canvas element */
    private canvasDoubleBuffer: HTMLCanvasElement | undefined;

    /** main canvas rendering object */
    private ctxMain: CanvasRenderingContext2D;
    /** double-buffered canvas rendering object */
    private ctxDoubleBuffer: CanvasRenderingContext2D | undefined

    /** flag to store if double-buffering is used */
    private useDoubleBuffering: boolean;

    private ctxUser: CanvasRenderingContext2D

    private animationFrameId: number;
    private loopRunning: boolean;
    private stopLoopRequested: boolean;
    private eraseBackground: boolean;

    /** absolute time of previous frame */
    private lastFrameTimeAbsolute: number;
    private fps: Fps;

    /** flag to store if the FPS value shall be drawn into the right corner of the canvas */
    public FpsDrawFpsValue: boolean;
    public FpsFillStyle: string | CanvasGradient | CanvasPattern;

    private backgroundColor: string | undefined;

    private canvasInitialWidth : number;
    private canvasInitialHeight : number;
    private canvasSwitchToNativeResolutionFullScreen : boolean = false;
    private fullScreenChangeEventListenerAdded : boolean = false;

    constructor(htmlCvsElem: HTMLCanvasElement, useDoubleBuffer: boolean = true) {
        this.canvasMain = htmlCvsElem;
        this.ctxMain = this.canvasMain.getContext("2d")!;
        this.useDoubleBuffering = useDoubleBuffer;
        this.lastFrameTimeAbsolute = 0;
        this.animationFrameId = 0;

        this.canvasInitialWidth = this.canvasMain.width;
        this.canvasInitialHeight = this.canvasMain.height;

        if (this.useDoubleBuffering) {
            this.canvasDoubleBuffer = document.createElement('canvas');
            this.canvasDoubleBuffer.width = this.canvasMain.width;
            this.canvasDoubleBuffer.height = this.canvasMain.height;
            this.ctxDoubleBuffer = this.canvasDoubleBuffer.getContext("2d")!;
            this.ctxUser = this.ctxDoubleBuffer;
        }
        else {
            this.ctxUser = this.ctxMain;
        }

        this.fps = new Fps();
        this.FpsDrawFpsValue = false;
        this.FpsFillStyle = '#000000';

        this.loopRunning = false;
        this.stopLoopRequested = false;
        this.eraseBackground = true;
    }

    protected abstract update(time: number): void;

    protected abstract draw(ctx: CanvasRenderingContext2D, time: number): void;

    public startMainLoop = (): void => {
        if (!this.loopRunning) {
            window.requestAnimationFrame((time: number) => {
                this.fps.start(time);

                this.lastFrameTimeAbsolute = time;
                this.loopRunning = true;
                this.animationFrameId = window.requestAnimationFrame(this.mainLoop);
            });
        }
    }

    public stopMainLoop = (): void => {
        if (this.loopRunning) {
            this.stopLoopRequested = true;
        }
    }

    private mainLoop = (time: number): void => {
        let deltaFrameTime: number;

        deltaFrameTime = time - this.lastFrameTimeAbsolute;

        if (this.fps.update(time) === false) {
            requestAnimationFrame(this.mainLoop);
            return;
        }

        /* call update function */
        this.update(deltaFrameTime);

        /* prepare canvas and background, call draw function */
        if (this.eraseBackground) {
            if (this.backgroundColor) {
                let fillStyleBackup = this.ctxUser.fillStyle;
                this.ctxUser.fillStyle = this.backgroundColor;
                this.ctxUser.fillRect(0, 0, this.canvasMain.width, this.canvasMain.height);
                this.ctxUser.fillStyle = fillStyleBackup;
            }
            else {
                this.ctxUser.clearRect(0, 0, this.canvasMain.width, this.canvasMain.height);
            }
        }
        this.draw(this.ctxUser, deltaFrameTime);

        if (this.useDoubleBuffering) {
            this.ctxMain.drawImage(this.canvasDoubleBuffer!, 0, 0);
        }

        /* draw FPS value if enabled */
        if (this.FpsDrawFpsValue) {
            this.drawFPS();
        }

        /* save absolute time of this frame */
        this.lastFrameTimeAbsolute = time;

        /* prepare next loop and pause */
        if (this.stopLoopRequested) {
            window.cancelAnimationFrame(this.animationFrameId);
            this.stopLoopRequested = false;
            this.loopRunning = false;
        }
        else {
            this.animationFrameId = window.requestAnimationFrame(this.mainLoop);
        }
    }

    private drawFPS = (): void => {
        this.ctxMain.save();

        this.ctxMain.font = '10px Arial';
        this.ctxMain.fillStyle = this.FpsFillStyle;
        this.ctxMain.fillText("FPS: " + this.fps.getCurrentFps(), this.canvasMain.width - 60, 20);

        this.ctxMain.restore();
    }

    public getCurrentFps = (): number => {
        return this.fps.getCurrentFps();
    }

    public setMaxAllowedFps = (fps: number): void => {
        this.fps.setMaxAllowedFps(fps);
    }

    public setBackground = (color: string): void => {
        this.backgroundColor = color;
    }

    public getCanvasWidth = (): number => {
        return this.canvasMain.width;
    }

    public getCanvasHeight = (): number => {
        return this.canvasMain.height;
    }

    public enableBackgroundErase = (b: boolean): void => {
        this.eraseBackground = b;
    }

    public setFullScreen = (switchToNativeResolution: boolean): void => {

        this.canvasSwitchToNativeResolutionFullScreen = switchToNativeResolution;

        if (!this.fullScreenChangeEventListenerAdded) {
            window.addEventListener("fullscreenchange", this.resizeCanvasAfterFullScreenChange);
            this.fullScreenChangeEventListenerAdded = true;
        }

        if (this.canvasMain.requestFullscreen) {
            this.canvasMain.requestFullscreen();
        } else {
            (this.canvasMain as any).webkitRequestFullScreen?.();
        }
    }

    public resizeCanvasAfterFullScreenChange = () : void => {
        if (!this.canvasSwitchToNativeResolutionFullScreen) return;

        const dpr = window.devicePixelRatio || 1;

        const width = document.fullscreenElement ? window.innerWidth : this.canvasInitialWidth;
        const height = document.fullscreenElement ? window.innerHeight : this.canvasInitialHeight

        this.updateCanvasDimension(width * dpr, height * dpr)
        // Set actual pixel size (important!)
        // this.canvasMain.width = Math.floor(width * dpr);
        // this.canvasMain.height = Math.floor(height * dpr);

        // // Set CSS size (what user sees)
        // this.canvasMain.style.width = width + "px";
        // this.canvasMain.style.height = height + "px";

        this.ctxMain.setTransform(dpr, 0, 0, dpr, 0, 0); // scale drawing
        if (this.useDoubleBuffering) {
            this.ctxDoubleBuffer!.setTransform(dpr, 0, 0, dpr, 0, 0); // scale drawing
            this.ctxUser = this.ctxDoubleBuffer!;
        } else {
            this.ctxUser = this.ctxMain;
        }
    }


    protected updateCanvasDimension = (newWidth: number, newHeight: number): void => {
        this.canvasMain.width = newWidth;
        this.canvasMain.height = newHeight;
        this.canvasDoubleBuffer!.width = this.canvasMain.width;
        this.canvasDoubleBuffer!.height = this.canvasMain.height;
    }
}



