export class Player {

    public x: number;
    public y: number;

    private size: number = 32;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public DrawPlayer = (ctx: CanvasRenderingContext2D, time: number): void => {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}