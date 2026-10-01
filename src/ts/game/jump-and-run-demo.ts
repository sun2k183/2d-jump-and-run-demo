
import { GraphicsLoop, Fps, KeyboardHandler } from "../graphics-engine/main-interface.js";
import { GameWorld } from "../game/world.js";
import { Player } from "../game/player.js";

export class JumpRunDemo extends GraphicsLoop {

    private keyboardHandler : KeyboardHandler;
    private gameWorld : GameWorld;
    private player : Player; 

    private cameraX : number = 0;
    private cameraY : number = 0;

    constructor(htmlCvsElem: HTMLCanvasElement) {
        super(htmlCvsElem);

        this.keyboardHandler = new KeyboardHandler(htmlCvsElem, true);

        this.gameWorld = new GameWorld();
        this.player = new Player(100, 100);
    }

    protected update = (time: number): void => {

        this.keyboardHandler.ProcessKeyBoard();

        if (this.keyboardHandler.IsKeyHoldDown("ArrowRight")) {
            this.player.x += 5;
        }
        if (this.keyboardHandler.IsKeyHoldDown("ArrowLeft")) {
            this.player.x -= 5;
        }
        if (this.keyboardHandler.IsKeyHoldDown("ArrowUp")) {
            this.player.y -= 5;
        }
        if (this.keyboardHandler.IsKeyHoldDown("ArrowDown")) {
            this.player.y += 5;
        }
    }


    protected draw = (ctx: CanvasRenderingContext2D, time: number): void => {
        //ctx.clearRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());

        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(20, 30, 20, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'red';
        ctx.fillRect(30, 30, 100, 100);

        this.gameWorld.DrawWorld(ctx, time);
        this.player.DrawPlayer(ctx, time);

        // debug code
        ctx.fillStyle = 'white';
        ctx.font = '16px sans-serif';
        ctx.fillText(`Player position: (${this.player.x}, ${this.player.y})`, 10, 20);
       
     
    }
}