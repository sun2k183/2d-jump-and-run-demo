export class KeyState {
  pressed: boolean = false;
  released: boolean = false;
  holdDown: boolean = false;
}

export const Controls = {
    // Movement
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",

    // WASD
    MoveLeft: "KeyA",
    MoveRight: "KeyD",
    MoveUp: "KeyW",
    MoveDown: "KeyS",

    // Actions
    Jump: "Space",
    Shoot: "ControlLeft",
    Sprint: "ShiftLeft",
    Interact: "KeyE",

    // System
    Pause: "Escape",
    Enter: "Enter",
    Tab: "Tab",

    // Numbers (top row)
    Digit1: "Digit1",
    Digit2: "Digit2",
    Digit3: "Digit3",
    Digit4: "Digit4",
    Digit5: "Digit5",
    Digit6: "Digit6",
    Digit7: "Digit7",
    Digit8: "Digit8",
    Digit9: "Digit9",
    Digit0: "Digit0",

    // Letters (full alphabet)
    KeyA: "KeyA",
    KeyB: "KeyB",
    KeyC: "KeyC",
    KeyD: "KeyD",
    KeyE: "KeyE",
    KeyF: "KeyF",
    KeyG: "KeyG",
    KeyH: "KeyH",
    KeyI: "KeyI",
    KeyJ: "KeyJ",
    KeyK: "KeyK",
    KeyL: "KeyL",
    KeyM: "KeyM",
    KeyN: "KeyN",
    KeyO: "KeyO",
    KeyP: "KeyP",
    KeyQ: "KeyQ",
    KeyR: "KeyR",
    KeyS: "KeyS",
    KeyT: "KeyT",
    KeyU: "KeyU",
    KeyV: "KeyV",
    KeyW: "KeyW",
    KeyX: "KeyX",
    KeyY: "KeyY",
    KeyZ: "KeyZ",

    // Function keys
    F1: "F1",
    F2: "F2",
    F3: "F3",
    F4: "F4",
    F5: "F5",
    F6: "F6",
    F7: "F7",
    F8: "F8",
    F9: "F9",
    F10: "F10",
    F11: "F11",
    F12: "F12",

    // Arrows (redundant but useful for clarity)
    ArrowLeft: "ArrowLeft",
    ArrowRight: "ArrowRight",
    ArrowUp: "ArrowUp",
    ArrowDown: "ArrowDown",

    // Modifiers
    Shift: "ShiftLeft",
    Ctrl: "ControlLeft",
    Alt: "AltLeft",
    Space: "Space",
} as const;

export type ControlKey = typeof Controls[keyof typeof Controls];

export class KeyboardHandler {

    private oldKeyState: Record<string, boolean> = {};
    private newKeyState: Record<string, boolean> = {};

    private keyState: Record<string, KeyState> = {};

    constructor(htmlCvsElem: HTMLCanvasElement, useCanvasForKeyboardEvents: boolean = false) {

        if (useCanvasForKeyboardEvents) {
            htmlCvsElem.focus();
            htmlCvsElem.addEventListener("keydown", this.onkeydown, false);
            htmlCvsElem.addEventListener("keyup", this.onkeyup, false);
        }
        else 
        {
            window.addEventListener("keydown", this.onkeydown, false);
            window.addEventListener("keyup", this.onkeyup, false);
        }
    }

    private onkeydown = (ev:  KeyboardEvent) : void => {
        this.newKeyState[ev.code] = true;
        console.log(ev.key)
    }

    private onkeyup = (ev:  KeyboardEvent) : void => {
        this.newKeyState[ev.code] = false;
    }

    public ProcessKeyBoard = (): void => {
        // iterate over all keys currently known
        for (const key in this.newKeyState) {

            if (!this.keyState[key]) {
                this.keyState[key] = new KeyState();
            }

            this.keyState[key].pressed = false;
            this.keyState[key].released = false;

            if (this.oldKeyState[key] !== this.newKeyState[key]) {
                // state of key has changed
                if (this.newKeyState[key]) {
                    // key changed to down
                    this.keyState[key].pressed = true;
                    this.keyState[key].holdDown = true;
                } else {
                    // key changed to up
                    this.keyState[key].released = true;
                    this.keyState[key].holdDown = false;
                }
            }

            this.oldKeyState[key] = this.newKeyState[key]!;
        }
    }

    public IsKeyHoldDown = (code: ControlKey): boolean => {
        return this.keyState[code]?.holdDown ?? false;
    }

    public IsKeyPressed = (code: ControlKey): boolean => {
        return this.keyState[code]?.pressed ?? false;
    }

    public IsKeyReleased = (code: ControlKey): boolean => {
        return this.keyState[code]?.released ?? false;
    }

    public GetKeyState = (code: ControlKey): Readonly<KeyState> => {
        return this.keyState[code] ?? new KeyState();
    }
}
