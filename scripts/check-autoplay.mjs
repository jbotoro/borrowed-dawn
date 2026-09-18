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

  const finale = createGame({ tuning, rooms, seed: 5, god: true, startRoom: "belfry" });
  finale.setInput(emptyInput());
  finale.start();
  finale.state.progress.bossDefeated = true;
  finale.respawn();
  finale.state.events.length = 0;

  const walker = createAutoplayInput(finale);
  const finaleVisited = new Set([finale.state.roomId]);
  console.log(`${finale.state.time.toFixed(2)}s: belfry (boss down, reserve door open)`);

  let won = false;
  for (let frame = 0; frame < 60 * 120; frame++) {
    finale.setInput(walker.sample());
    finale.step(1 / 60);
    finale.state.events.length = 0;
    if (!finaleVisited.has(finale.state.roomId)) {
      finaleVisited.add(finale.state.roomId);
      console.log(`${finale.state.time.toFixed(2)}s: ${finale.state.roomId}`);
    }
    if (finale.state.phase === "victory") {
      won = true;
      break;
    }
  }

  const finalePos = JSON.stringify(finale.state.player.pos);
  assert(finaleVisited.has("reserve"), `Finale route did not reach the Reserve; stopped at ${finalePos}`);
  assert(finaleVisited.has("lenshall"), `Finale route did not reach the Lens Hall; stopped at ${finalePos}`);
  assert(won, `Finale route did not reach the Dawn Core; stopped at ${finalePos}`);
  console.log(`${finale.state.time.toFixed(2)}s: victory (Dawn Core)`);
  console.log("PASS: Belfry -> Reserve -> Lens Hall -> victory with the boss down");
} finally {
  await server.close();
}
