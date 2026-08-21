// NOT:
// import { add } from "./utils/math";
// import { add } from "./utils/math.ts";
// Correct:
// import { add } from "./utils/math.js";
// import { canvasdemo } from "./canvas-anim.js";  

import { JumpRunDemo } from "./game/jump-and-run-demo.js";
import { KeyboardHandler } from "./graphics-engine/graphics-engine-keyboard.js";


window.addEventListener("load", () => {
    const cvs: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('cvs');
    const myApp = new JumpRunDemo(cvs);
    myApp.FpsDrawFpsValue = true;
    myApp.FpsFillStyle = "#FFFFFF";
    myApp.setBackground("#87b7ff")
    //myApp.enableBackgroundErase(true);
    myApp.startMainLoop();

    new KeyboardHandler(cvs, true);

    const fullScreenButton = document.getElementById('fullscreen-button')!;
    fullScreenButton.addEventListener("click", () => {
        myApp.setFullScreen(true);
    });
});