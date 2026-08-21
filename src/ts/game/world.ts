export class GameWorld {

    readonly WORLD_DATA : string[] = [
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "x..................................................................................................x",
        "x..................................................................................................x",
        "x.............................................xx...................................................x",
        "x.....................................xxxx.........................................................x",
        "x...............xxx................xxxx............................................................x",
        "x...............................xxxx...............................................................x",
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx......xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "x..................................................................................................x",
        "x..................................................................................................x",
        "x..................................................................................................x",
        "x..................................................................................................x",
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    ];

    readonly TILE_SIZE: number = 32;
    readonly WORLD_TILE_WIDTH: number = this.WORLD_DATA[0]?.length ?? 0;
    readonly WORLD_TILE_HEIGHT: number = this.WORLD_DATA.length;

    constructor() {

    }

    public DrawWorld = (ctx: CanvasRenderingContext2D, time: number): void => {
        for (let y = 0; y < this.WORLD_TILE_HEIGHT; y++) {
            for (let x = 0; x < this.WORLD_TILE_WIDTH; x++) {
                const str = this.WORLD_DATA[y];
                const tileChar = str?.[x];
                if (tileChar === 'x') {
                    ctx.fillStyle = 'green';
                }
                if (tileChar === '.') {
                    ctx.fillStyle = 'lightblue';
                }

                ctx.fillRect(x * this.TILE_SIZE, y * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE);
            }
        }
    }
}
