import type { Input } from "./game/types";

export interface InputSource {
  sample(): Input;
}

const LEFT_KEYS = ["KeyA", "ArrowLeft"];
const RIGHT_KEYS = ["KeyD", "ArrowRight"];
const UP_KEYS = ["KeyW", "ArrowUp"];
const DOWN_KEYS = ["KeyS", "ArrowDown"];
const JUMP_KEYS = ["KeyZ", "Space"];
const ATTACK_KEYS = ["KeyX", "KeyJ"];
const DASH_KEYS = ["KeyC", "KeyK", "ShiftLeft", "ShiftRight"];
const CONFIRM_KEYS = ["Enter", "NumpadEnter", "Space", "KeyZ"];
const PAUSE_KEYS = ["Escape"];

const PREVENTED = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Space",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "KeyZ",
  "KeyX",
  "KeyC",
  "KeyJ",
  "KeyK"
]);

export function emptyInput(): Input {
  return {
    moveX: 0,
    moveY: 0,
    jump: false,
    jumpHeld: false,
    attack: false,
    dash: false,
    pause: false,
    confirm: false
  };
}

export function createKeyboardInput(): InputSource {
  const held = new Set<string>();
  const input = emptyInput();

  let jumpEdge = false;
  let attackEdge = false;
  let dashEdge = false;
  let pauseEdge = false;
  let confirmEdge = false;

  function anyHeld(codes: string[]): boolean {
    for (const code of codes) {
      if (held.has(code)) return true;
    }
    return false;
  }

  function matches(code: string, codes: string[]): boolean {
    return codes.indexOf(code) >= 0;
  }

  window.addEventListener("keydown", (event) => {
    if (PREVENTED.has(event.code)) event.preventDefault();
    if (event.repeat) return;
    held.add(event.code);
    if (matches(event.code, JUMP_KEYS)) jumpEdge = true;
    if (matches(event.code, ATTACK_KEYS)) attackEdge = true;
    if (matches(event.code, DASH_KEYS)) dashEdge = true;
    if (matches(event.code, PAUSE_KEYS)) pauseEdge = true;
    if (matches(event.code, CONFIRM_KEYS)) confirmEdge = true;
  });

  window.addEventListener("keyup", (event) => {
    held.delete(event.code);
  });

  window.addEventListener("blur", () => {
    held.clear();
    jumpEdge = false;
    attackEdge = false;
    dashEdge = false;
    pauseEdge = false;
    confirmEdge = false;
  });

  function axis(negative: string[], positive: string[]): number {
    return (anyHeld(positive) ? 1 : 0) - (anyHeld(negative) ? 1 : 0);
  }

  return {
    sample(): Input {
      input.moveX = axis(LEFT_KEYS, RIGHT_KEYS);
      input.moveY = axis(DOWN_KEYS, UP_KEYS);
      input.jumpHeld = anyHeld(JUMP_KEYS);
      input.jump = jumpEdge;
      input.attack = attackEdge;
      input.dash = dashEdge;
      input.pause = pauseEdge;
      input.confirm = confirmEdge;
      jumpEdge = false;
      attackEdge = false;
      dashEdge = false;
      pauseEdge = false;
      confirmEdge = false;
      return input;
    }
  };
}
