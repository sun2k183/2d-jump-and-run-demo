/**
 * @class Fps
 */
export class Fps {
    /** Counts the number of processed frames each second */
    private fpsFrameCounterPerSecond: number;
    /** Absolute time of last FPS measurement. Used to update the calculated FPS each second. */
    private fpsFrameTimeLastMeasurement: number;
    /** Absolute time of last update call */
    private fpsLastUpdateTimeAbsolute: number;

    /** Measured and calculated frame per seconds of last measurement */
    private fpsCurrentFpsValue: number;

    /** Stores the maximum allowed FPS value. Can be used to limit the actual frames per second to slow everything down */
    private fpsMaxAllowed: number;

    /**
     * @constructor
     */
    constructor() {
        this.fpsMaxAllowed = 180;
        this.fpsFrameCounterPerSecond = 0;
        this.fpsFrameTimeLastMeasurement = 0;
        this.fpsLastUpdateTimeAbsolute = 0;
        this.fpsCurrentFpsValue = 0;
    }

    /**
     * Starts the measurement and calculation of the fps.
     */
    public start = (startTime: number): void => {
        this.fpsFrameCounterPerSecond = 0;
        this.fpsFrameTimeLastMeasurement = startTime;
        this.fpsCurrentFpsValue = 0;
        this.fpsLastUpdateTimeAbsolute = startTime;
    }

    /**
     * Update function that shall be called each frame.
     * Measures and calculates the timings and fps.
     * @return false if a maximum FPS limit is set and it is not enough time elapsed to handle the next frame,
     *         otherwise true
     */
    public update = (time: number): boolean => {
        /* limit maximum FPS if enabled */
        if (this.fpsMaxAllowed != 0) {
            /* If not enough time has passed for current frame, return immediately without update values below! */
            if (time < this.fpsLastUpdateTimeAbsolute + (1000 / this.fpsMaxAllowed)) {
                return false;
            }
        }

        /* calculate fps */
        if (time > this.fpsFrameTimeLastMeasurement + 1000) {
            this.fpsCurrentFpsValue = this.fpsFrameCounterPerSecond;
            this.fpsFrameCounterPerSecond = 0;
            this.fpsFrameTimeLastMeasurement = time;
        }

        /* update frame counter and store absolute time of this call */
        this.fpsFrameCounterPerSecond++;
        this.fpsLastUpdateTimeAbsolute = time;

        return true;
    }

    public getCurrentFps = (): number => {
        return this.fpsCurrentFpsValue;
    }

    public getMaxAllowedFps = (): number => {
        return this.fpsMaxAllowed;
    }

    public setMaxAllowedFps = (maxAllowedFps: number): void => {
        this.fpsMaxAllowed = maxAllowedFps;
    }
}