import assert from "node:assert/strict";
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: "custom"
});

function emptyInput() {
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

try {
  const { createGame } = await server.ssrLoadModule("/src/game/index.ts");
  const { rooms } = await server.ssrLoadModule("/src/content/rooms.ts");
  const { tuning } = await server.ssrLoadModule("/src/tuning.ts");
  const { createAutoplayInput } = await server.ssrLoadModule("/src/debug/autoplay.ts");

  const game = createGame({ tuning, rooms, seed: 42, god: true });
  const bot = createAutoplayInput(game);
  const visited = new Set();

  for (let frame = 0; frame < 60 * 60; frame++) {
    game.setInput(bot.sample());
    game.step(1 / 60);
    game.state.events.length = 0;
    if (!visited.has(game.state.roomId)) {
      visited.add(game.state.roomId);
      console.log(`${game.state.time.toFixed(2)}s: ${game.state.roomId}`);
    }
    if (game.state.roomId === "belfry") break;
  }

  const position = JSON.stringify(game.state.player.pos);
  assert(visited.has("gallery"), `Autoplay did not reach Gallery; stopped at ${position}`);
  assert(visited.has("belfry"), `Autoplay did not reach Belfry; stopped at ${position}`);
  console.log("PASS: Landing -> Gallery -> Belfry with current room content");

  const branch = createGame({
    tuning,
    rooms,
    seed: 7,
    god: true,
    startRoom: "gallery",
    startPos: { x: 1.7, y: 7.6 }
  });
  branch.setInput(emptyInput());
  branch.start();
  let reachedCache = false;
  for (let frame = 0; frame < 60 * 6; frame++) {
    const input = emptyInput();
    if (branch.state.roomId === "gallery" && branch.state.player.grounded && frame % 40 === 5) {
      input.jump = true;
      input.jumpHeld = true;
    }
    branch.setInput(input);
    branch.step(1 / 60);
    branch.state.events.length = 0;
    if (branch.state.roomId === "cache") {
      reachedCache = true;
      break;
    }
  }
  assert(reachedCache, `Jumping under the hatch did not reach the Cache; at ${JSON.stringify(branch.state.player.pos)}`);
  console.log(`${branch.state.time.toFixed(2)}s: cache (hatch from the Gallery landing)`);

  const back = createAutoplayInput(branch);
  let returned = false;
  for (let frame = 0; frame < 60 * 30; frame++) {
    branch.setInput(back.sample());
    branch.step(1 / 60);
    branch.state.events.length = 0;
    if (branch.state.roomId === "gallery") {
      returned = true;
      break;
    }
  }
  assert(returned, `Bot did not return from the Cache to the Gallery; at ${JSON.stringify(branch.state.player.pos)}`);
  const landing = branch.state.player.pos;
  assert(landing.y > 7 && landing.x < 3.4, `Return landed off the Gallery ledge at ${JSON.stringify(landing)}`);
  console.log(`${branch.state.time.toFixed(2)}s: gallery (floor hatch from the Cache)`);
  console.log("PASS: Gallery <-> Cache hatch in both directions");
} finally {
  await server.close();
}
