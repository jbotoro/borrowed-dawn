import type { Tuning } from "../tuning";

export interface Vec2 {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export type Phase = "title" | "playing" | "paused" | "dead" | "victory";
export type Facing = 1 | -1;
export type AttackDir = "side" | "up" | "down";
export type AttackPhase = "none" | "windup" | "active" | "recovery";

export interface Input {
  moveX: number;
  moveY: number;
  jump: boolean;
  jumpHeld: boolean;
  attack: boolean;
  dash: boolean;
  pause: boolean;
  confirm: boolean;
}

export interface PlayerState {
  pos: Vec2;
  prev: Vec2;
  vel: Vec2;
  facing: Facing;
  grounded: boolean;
  coyoteUntil: number;
  jumpBufferedUntil: number;
  jumpCutApplied: boolean;
  health: number;
  invulnerableUntil: number;
  hurtUntil: number;
  dashUntil: number;
  dashReadyAt: number;
  dashDir: Facing;
  airDashesUsed: number;
  attackPhase: AttackPhase;
  attackUntil: number;
  attackDir: AttackDir;
  attackHitIds: number[];
  longwick: boolean;
}

export type EnemyKind = "guard" | "stomper" | "lamplighter";
export type EnemyState = "patrol" | "telegraph" | "attack" | "recover" | "hurt" | "dead";

export interface Enemy {
  id: number;
  kind: EnemyKind;
  pos: Vec2;
  prev: Vec2;
  vel: Vec2;
  facing: Facing;
  grounded: boolean;
  health: number;
  state: EnemyState;
  stateUntil: number;
  patrolMinX: number;
  patrolMaxX: number;
  alive: boolean;
  flash: number;
  swoop: number;
}

export type BossState =
  | "dormant"
  | "idle"
  | "sweepTelegraph"
  | "sweepActive"
  | "sweepRecover"
  | "stompTelegraph"
  | "stompRise"
  | "stompSlam"
  | "stompRecover"
  | "crack"
  | "dead";

export interface Boss {
  id: number;
  pos: Vec2;
  prev: Vec2;
  facing: Facing;
  health: number;
  maxHealth: number;
  phase: 1 | 2;
  state: BossState;
  stateStart: number;
  stateUntil: number;
  nextAttack: "sweep" | "stomp";
  lastAttack: "sweep" | "stomp" | null;
  repeatedLastAttack: boolean;
  arenaMinX: number;
  arenaMaxX: number;
  alive: boolean;
  flash: number;
}

export type HazardKind = "wave" | "ember";

export interface Hazard {
  kind: HazardKind;
  pos: Vec2;
  prev: Vec2;
  vel: Vec2;
  w: number;
  h: number;
  until: number;
  damage: number;
  alive: boolean;
}

export type PickupKind = "longwick" | "dawnCore" | "emberFlask";

export interface Pickup {
  id: string;
  kind: PickupKind;
  pos: Vec2;
  collected: boolean;
}

export interface EnemyPlacement {
  id: number;
  kind: EnemyKind;
  x: number;
  y: number;
  patrolMinX: number;
  patrolMaxX: number;
  facing: Facing;
}

export interface Door {
  rect: Rect;
  to: string;
  entry: Vec2;
  entryFacing: Facing;
}

export type GateCondition = "bossApproach" | "bossDefeated";

export interface Gate {
  id: string;
  rect: Rect;
  openWhen: GateCondition;
}

export interface Breakable {
  id: string;
  rect: Rect;
  health: number;
}

export interface PickupPlacement {
  id: string;
  kind: PickupKind;
  x: number;
  y: number;
}

export type DecorKind =
  | "block"
  | "pillar"
  | "chain"
  | "cylinder"
  | "bell"
  | "glow"
  | "rim"
  | "furnace"
  | "embers"
  | "shaft"
  | "boiler"
  | "grate"
  | "stair"
  | "gallery"
  | "beam"
  | "bench"
  | "crate"
  | "rack"
  | "winch"
  | "yoke"
  | "arch"
  | "wall"
  | "rubble"
  | "lamp"
  | "pipe"
  | "veil"
  | "jar"
  | "lens"
  | "sunlight";

export interface Decor {
  kind: DecorKind;
  rect: Rect;
  z: number;
  color?: number;
  intensity?: number;
}

export interface RoomAmbience {
  fogColor: number;
  fogNear: number;
  fogFar: number;
  hemiSky: number;
  hemiGround: number;
  hemiIntensity: number;
  keyColor: number;
  keyIntensity: number;
  fillColor: number;
  fillIntensity: number;
  emberDensity: number;
}

export interface BossArena {
  x: number;
  y: number;
  arenaMinX: number;
  arenaMaxX: number;
}

export interface Room {
  id: string;
  name: string;
  bounds: Rect;
  solids: Rect[];
  doors: Door[];
  enemies: EnemyPlacement[];
  pickups: PickupPlacement[];
  gates: Gate[];
  breakables: Breakable[];
  checkpoint?: Vec2;
  bossArena?: BossArena;
  decor: Decor[];
  waypoints: Vec2[];
  ambience?: RoomAmbience;
  music?: string;
}

export interface Progress {
  checkpointRoom: string;
  checkpoint: Vec2;
  collected: string[];
  opened: string[];
  broken: string[];
  bossDefeated: boolean;
  deaths: number;
  maxHealthBonus: number;
}

export type GameEventKind =
  | "start"
  | "jump"
  | "land"
  | "attackSwing"
  | "attackHit"
  | "dash"
  | "hurt"
  | "death"
  | "respawn"
  | "enemyHurt"
  | "enemyDeath"
  | "pickup"
  | "gateOpen"
  | "breakableBroken"
  | "checkpoint"
  | "roomEnter"
  | "bossTelegraph"
  | "bossAttack"
  | "bossHurt"
  | "bossPhase"
  | "bossDeath"
  | "victory"
  | "pause"
  | "resume";

export interface GameEvent {
  kind: GameEventKind;
  x: number;
  y: number;
}

export interface Transition {
  to: string;
  entry: Vec2;
  entryFacing: Facing;
}

export interface GameState {
  phase: Phase;
  time: number;
  tick: number;
  seed: number;
  roomId: string;
  player: PlayerState;
  enemies: Enemy[];
  boss: Boss | null;
  hazards: Hazard[];
  pickups: Pickup[];
  progress: Progress;
  events: GameEvent[];
  transition: Transition | null;
  deathAt: number;
  victoryAt: number;
  god: boolean;
}

export interface GameDeps {
  tuning: Tuning;
  seed: number;
  rooms: Room[];
  startRoom?: string;
  startPos?: Vec2;
  god?: boolean;
}

export interface Game {
  readonly state: GameState;
  setInput(input: Input): void;
  step(dt: number): void;
  start(): void;
  respawn(): void;
  returnToTitle(): void;
  pause(): void;
  resume(): void;
  currentRoom(): Room;
}
