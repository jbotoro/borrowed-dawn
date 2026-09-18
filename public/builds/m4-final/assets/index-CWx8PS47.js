var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l={player:{walkSpeed:8,accel:70,decel:90,airControl:.7,gravity:42,jumpVelocity:14.5,jumpCutMultiplier:.45,maxFallSpeed:24,coyoteMs:100,jumpBufferMs:120,width:.6,height:1.2,maxHealth:5,hitInvulnerableMs:800,hurtKnockbackX:7,hurtKnockbackY:6,hurtStunMs:180},dash:{distance:4.5,durationMs:150,cooldownMs:500,invulnerableMs:150,airDashes:1},attack:{reach:1.6,longwickReach:2.4,height:1,windupMs:60,activeMs:90,recoveryMs:160,damage:1,knockback:6,recoil:2.5},guard:{width:.8,height:1,health:3,patrolSpeed:2,sightRange:5,sightHeight:2,telegraphMs:350,lungeSpeed:12,lungeMs:220,recoveryMs:500,hurtMs:150,damage:1},stomper:{width:.9,height:.8,health:2,sightRange:7,hopVelocityX:5,hopVelocityY:10,hopIntervalMs:1200,telegraphMs:320,waveSpeed:8,waveWidth:.8,waveHeight:.6,waveLifeMs:900,hurtMs:150,damage:1},lamplighter:{width:.8,height:.9,health:2,hoverHeight:3.2,patrolSpeed:1.6,bobAmp:.25,bobSpeed:1.8,sightRange:6,sightDepth:5,chaseSpeed:2.8,swoopDepth:1.8,swoopSpeed:4,emberLeadFactor:.6,emberSideSpeed:3,dropIntervalMs:1100,dropTelegraphMs:400,emberFallSpeed:7,emberWidth:.5,emberHeight:.5,emberLifeMs:1500,hurtMs:150,damage:1},sentry:{width:.9,height:1.1,health:3,sightRange:9,sightHeight:1.5,chargeMs:900,beamMs:320,beamLength:9,beamHeight:.45,recoverMs:1400,cooldownMs:2200,hurtMs:150,damage:1},boss:{width:3,height:3,health:24,phase2At:.5,idleMs:700,sweepTelegraphMs:600,sweepActiveMs:250,sweepRecoveryMs:900,sweepReach:3.5,sweepHeightRatio:.6,sweepDamage:1,stompTelegraphMs:500,stompRiseMs:350,stompRiseRatio:.5,stompSlamMs:150,stompRecoveryMs:1100,stompWaveSpeed:9,stompWaveWidth:1,stompWaveHeight:.8,stompWaveLifeMs:1200,stompDamage:1,crackMs:1500,phase2RecoveryMs:1400,attackRepeatChance:.35,telegraphScaleMin:.8,telegraphScaleMax:1.25,phase2TelegraphScale:.85},world:{hazardCapacity:16,checkpointWidth:1,checkpointHeight:1.5,pickupWidth:.7,pickupHeight:.7,flaskHealthBonus:1},camera:{fovDeg:45,distance:15,lookAheadX:2.5,lookAheadY:1,followLerp:.1,roomPad:2.6,shakeDecay:.85},feel:{shakeOnHit:.3,shakeOnKill:.15,shakeOnBossSlam:.5,flashDecayPerSec:6,jumpSquash:.85,landSquash:.75,squashRecoverPerSec:8,dashStretch:1.3,deathDelayMs:900,victoryHoldMs:2600,victoryWarmth:.55,victoryLightBoost:1.5,victoryFurnaceBoost:2,dawnWarmth:.45,dawnLightBoost:1.35,dawnEmberBoost:1.8,dawnDoorGlow:1.25,bossIntroMs:3200,bannerMs:2400,roomLabelMs:3200,transitionFadeMs:320,titlePulseMs:2200,blinkPeriodMs:90,blinkEmissive:.18,playerEmissive:.9,telegraphEmissive:.9,bloomStrength:.7,bloomRadius:.4,bloomThreshold:.82,fogNear:12,fogFar:60,hemiIntensity:1.15,keyIntensity:1.9,fillIntensity:.5,solidDepth:2,rimHeight:.14,rimOverhang:.05,gateDepth:1.2,breakableDepth:1.7,backPlaneZ:-20,backPlaneSize:240,chainSegmentHeight:.34,chainRadius:.1,decorGlowSize:1.2,decorGlowIntensity:1.4,decorGlowOpacity:.4,decorLightCap:12,playerLightIntensity:1.1,playerLightDistance:5,playerCoatEmissive:0,lanternHaloRadius:.9,lanternHaloOpacity:.16,lanternPoolWidth:2.2,lanternPoolOpacity:.12,lanternBeamLength:1.4,lanternBeamOpacity:.08,actorPlateDepth:.06,actorPlateStep:.035,actorPinRadius:.028,needleRestDeg:-46,needleBackDeg:124,needleFrontDeg:-52,needleRestLengthRatio:.6,needleActiveStretch:1.28,legSwingDeg:24,legSwingSpeed:9,courierLeanRunDeg:9,courierLeanAirDeg:6,courierLeanAttackDeg:13,courierHemSwingDeg:19,courierHemFollowPerSec:11,courierHemFlareAir:.22,courierArmSwingDeg:30,courierKneeBendDeg:30,courierBootLift:.05,courierRunBobAmp:.028,courierBreathAmount:.022,courierBreathSpeed:1.4,courierLanternSwingDeg:26,courierLanternFollowPerSec:9,courierJumpAnticipateMs:70,courierJumpCrouch:.78,courierApexStretch:1.1,courierHurtRecoilDeg:28,courierDeathCrumpleMs:650,courierGutterMs:520,courierAttackTwistDeg:20,enemyLeanDeg:14,enemyDeathFadeMs:220,enemyRecoilDistance:.16,guardSlumpDeg:12,guardVisorRestShade:.5,stomperSquash:.72,stomperSquashRecoverPerSec:9,bossFurnaceEmissive:.5,bossFurnaceLightScale:1.6,bossFurnaceLightRange:3,bossShellLift:.28,bossShellTiltDeg:16,bossArmSwingDeg:120,bellArmRestDeg:-80,bellChainLinks:30,bellChainSpacing:.2,bellBreathSpeed:.85,bellBreathAmount:.4,bellRockDeg:6,bellRockSpeed:7,bellCompress:.84,bellHeatEmissive:.5,bellMouthFlare:.85,bellArmSwayDeg:7,bellArmSwaySpeed:1.3,bossFurnaceShimmer:.5,bossFurnaceGlowRadius:1.4,fireWaveFlicker:11,fireWaveSparks:6,fireWaveHeightScale:1.6,farFieldDarken:.55,farGradientTop:.35,wallLift:.012,jarGlow:1.2,jarLightIntensity:1.6,jarLightDistance:6,jarPulseSpeed:.9,lensOpacity:.35,sunlightOpacity:.28,sunlightLightIntensity:3,paleKeyLift:.28,conduitGlow:.9,conduitFlowSpeed:1.4,conduitLightIntensity:.8,conduitLightDistance:4,passageInteriorDepth:1.6,passageFrameLift:.06,fxArcFrames:3,fxArcSpanDeg:104,fxArcInnerRatio:.84,fxArcOpacity:.26,fxBurstSpikes:7,fxBurstRadius:.34,fxBurstLifeMs:170,fxBurstGrow:1.3,fxChevronCount:5,fxChevronSize:.26,fxChevronLifeMs:240,fxChevronSpacing:.44,fxDustCount:5,fxDustSize:.3,fxDustLifeMs:340,fxDustRise:.7,fxRidgeCrest:.08,fxLiftCount:5,fxLiftRise:1.1,fxLiftLifeMs:620,fxLiftSize:.18,fxMarkOpacity:.85,telegraphEdgeFraction:0,veilRevealRadius:3,veilFadePerSec:2.5,veilRestOpacity:1,pickupHaloRadius:.45,pickupBobAmp:.12,pickupBobSpeed:2.2,pickupLightIntensity:1.6,pickupLightDistance:5,checkpointFlameHeight:.7,ambienceLerpPerSec:2.5,ambienceGain:1.8,flickerAmount:.12,flickerSpeed:11,chainSwayDeg:4,chainSwaySpeed:.8,edgeOutline:.03,passageSpillOpacity:.5,passageSpillLength:4.4,passageLightIntensity:1.8,passageLightDistance:7,lampHaloRadius:.9,lampHaloOpacity:.16,dawnSpillCap:1.1,lampLightIntensity:2.6,lampLightDistance:7.5,courseSpacing:.85,balusterSpacing:1.1,railHeight:1.05,stairStringer:.3,furnacePulseSpeed:1.6,furnacePulseAmount:.28,furnaceLightIntensity:2.2,furnaceLightDistance:14,emberDensity:.4,emberPerArea:.5,emberMax:220,emberRiseSpeed:.9,emberSwayAmp:.35,emberSwaySpeed:.7,emberSize:.11,emberOpacity:.85,shaftOpacity:.16,boilerRivets:6,grateBarCount:7,grateGlowOpacity:.5,grainAmount:.08,dofAperture:.012,dofMaxBlur:.006,shaftStrength:.35,shaftDecay:.94,shaftSamples:24,inkThickness:1,inkThreshold:.2,inkOpacity:.85,textureGrain:.35,textureScale:1,textureContrast:1.8,textureNormalizer:.82,shaftLength:.32,shaftGain:3.2,shaftThreshold:.08,shaftDirX:.22,dofGain:4,inkThresholdScale:.02,fxQuality:1,vignetteStrength:.55,vignetteSoftness:.45,outlineThickness:.045,toonBands:3},audio:{master:.85,music:.5,sfx:.8,duckOnDeath:.3,duckMs:1600,crossfadeMs:1600,bossIntensity:1.6,fightPulseGain:.5,fightTollBars:1,fightTempoScale:1.15,lookaheadSec:.45,muteRampMs:60,pauseDuck:.5}};function u(e,t,n){return e<t?t:e>n?n:e}function d(){let e=new URLSearchParams(location.search),t=e.get(`autoplay`)===`1`,n=e.get(`screenshot`)===`1`,r=e.get(`god`)===`1`,i=e.get(`seed`),a=i===null?NaN:Number.parseInt(i,10),o=Number.isFinite(a)?a>>>0:Date.now()>>>0||1,s=e.get(`fast`),c=s===null?NaN:Number.parseFloat(s),l=Number.isFinite(c)?u(c,.1,16):1,d=e.get(`room`),f=d!==null&&d.length>0?d:null,p=e.get(`start`)===`demo`?`demo`:null;return Object.freeze({autoplay:t,seed:o,screenshot:n,fast:l,room:f,start:p,god:r})}var f=d();function p(e){let t=[];for(let n=0;n<e;n+=1)t.push({kind:`wave`,pos:{x:0,y:0},prev:{x:0,y:0},vel:{x:0,y:0},w:0,h:0,until:0,damage:0,alive:!1});return t}function m(e){for(let t of e)t.alive=!1}function h(e,t,n,r,i,a,o,s,c,l){for(let u of e)if(!u.alive)return u.kind=t,u.pos.x=n,u.pos.y=r,u.prev.x=n,u.prev.y=r,u.vel.x=o,u.vel.y=s,u.w=i,u.h=a,u.until=c,u.damage=l,u.alive=!0,u;return null}function g(e,t){let n=e.pos.x-e.w*.5,r=e.pos.x+e.w*.5;for(let i of t){if(r<=i.x||n>=i.x+i.w)continue;let t=i.y+i.h,a=e.prev.y>=t&&e.pos.y<=t,o=e.pos.y<t&&e.pos.y+e.h>i.y;if(a||o)return!0}return!1}function _(e,t,n,r,i){for(let a of e){if(!a.alive)continue;if(a.prev.x=a.pos.x,a.prev.y=a.pos.y,a.kind===`beam`){r>=a.until&&(a.alive=!1);continue}if(a.pos.x+=a.vel.x*i,a.pos.y+=a.vel.y*i,a.kind===`ember`&&a.vel.y<0&&g(a,n)){a.alive=!1;continue}if(r>=a.until){a.alive=!1;continue}let e=a.w*.5;(a.pos.x+e<t.x||a.pos.x-e>t.x+t.w||a.pos.y+a.h<t.y||a.pos.y>t.y+t.h)&&(a.alive=!1)}}function v(e){return e<0?0:e>1?1:e}function y(e,t){let n=e.bossArena;return n?{id:-1,pos:{x:n.x,y:n.y},prev:{x:n.x,y:n.y},facing:-1,health:t.boss.health,maxHealth:t.boss.health,phase:1,state:`dormant`,stateStart:0,stateUntil:0,nextAttack:`sweep`,lastAttack:null,repeatedLastAttack:!1,arenaMinX:n.arenaMinX,arenaMaxX:n.arenaMaxX,alive:!0,flash:0}:null}function b(e,t,n){let r=y(e,t);return r?(r.health=0,r.alive=!1,r.state=`dead`,r.stateStart=n,r.stateUntil=n,r):null}function x(e,t,n){return n.x=e.pos.x-t.boss.width*.5,n.y=e.pos.y,n.w=t.boss.width,n.h=t.boss.height,n}function S(e){return e.state===`sweepActive`||e.state===`stompSlam`}function C(e,t){return e.state===`sweepActive`?t.boss.sweepDamage:t.boss.stompDamage}function w(e,t,n){if(e.state!==`sweepActive`)return null;let r=t.boss;return n.w=r.sweepReach,n.h=r.height*r.sweepHeightRatio,n.x=e.facing>0?e.pos.x+r.width*.5:e.pos.x-r.width*.5-r.sweepReach,n.y=e.pos.y,n}function T(e,t,n,r){e.state=t,e.stateStart=n,e.stateUntil=n+r/1e3}function E(e,t,n){T(e,`idle`,t,n.boss.idleMs),e.nextAttack=`sweep`}function D(e,t,n,r,i){return!e.alive||e.state===`dead`?!1:(e.state===`dormant`&&E(e,n,r),e.health-=t,e.flash=1,i.push({kind:`bossHurt`,x:e.pos.x,y:e.pos.y}),e.health<=0&&(e.health=0,e.alive=!1,T(e,`dead`,n,0),i.push({kind:`bossDeath`,x:e.pos.x,y:e.pos.y}),!0))}function O(e,t){e.repeatedLastAttack=e.lastAttack===t,e.lastAttack=t}function k(e,t,n){let r=n.range(t.boss.telegraphScaleMin,t.boss.telegraphScaleMax);return e.phase===2?r*t.boss.phase2TelegraphScale:r}function A(e,t,n,r,i){O(e,`sweep`),T(e,`sweepTelegraph`,t,n.boss.sweepTelegraphMs*k(e,n,r)),i.push({kind:`bossTelegraph`,x:e.pos.x,y:e.pos.y})}function j(e,t,n,r,i){O(e,`stomp`),T(e,`stompTelegraph`,t,n.boss.stompTelegraphMs*k(e,n,r)),i.push({kind:`bossTelegraph`,x:e.pos.x,y:e.pos.y})}function M(e,t,n,r){T(e,`idle`,t,n.boss.idleMs),e.nextAttack=r}function N(e){return e===`sweep`?`stomp`:`sweep`}function P(e,t,n){let r=e.lastAttack;return r===null?`sweep`:!e.repeatedLastAttack&&n.next()<t.boss.attackRepeatChance?r:N(r)}function F(e){return e.lastAttack===`sweep`&&e.repeatedLastAttack?`stomp`:`sweep`}function I(e,t,n,r,i,a,o,s,c){let l=o.boss;if(e.prev.x=e.pos.x,e.prev.y=e.pos.y,e.flash>0&&(e.flash=Math.max(0,e.flash-o.feel.flashDecayPerSec*a)),e.state===`dead`)return;let u=n.bossArena?n.bossArena.y:e.pos.y;if(e.state===`dormant`){t.pos.x>=e.arenaMinX&&t.pos.x<=e.arenaMaxX&&E(e,i,o);return}if(e.phase===1&&e.health<=l.phase2At*e.maxHealth){e.phase=2,T(e,`crack`,i,l.crackMs),e.pos.y=u,c.push({kind:`bossPhase`,x:e.pos.x,y:e.pos.y});return}let d=t.pos.x<e.pos.x?-1:1;if(e.state===`crack`){i>=e.stateUntil&&M(e,i,o,F(e));return}if(e.state===`idle`){e.facing=d,i>=e.stateUntil&&(e.nextAttack===`sweep`?A(e,i,o,s,c):j(e,i,o,s,c));return}if(e.state===`sweepTelegraph`){e.facing=d,i>=e.stateUntil&&(T(e,`sweepActive`,i,l.sweepActiveMs),c.push({kind:`bossAttack`,x:e.pos.x,y:e.pos.y}));return}if(e.state===`sweepActive`){i>=e.stateUntil&&T(e,`sweepRecover`,i,l.sweepRecoveryMs);return}if(e.state===`sweepRecover`){i>=e.stateUntil&&(e.phase===2?(e.nextAttack=`stomp`,j(e,i,o,s,c)):M(e,i,o,P(e,o,s)));return}if(e.state===`stompTelegraph`){e.facing=d,i>=e.stateUntil&&T(e,`stompRise`,i,l.stompRiseMs);return}let f=l.height*l.stompRiseRatio;if(e.state===`stompRise`){let t=Math.max(1e-6,l.stompRiseMs/1e3);e.pos.y=u+f*v(1-(e.stateUntil-i)/t),i>=e.stateUntil&&(e.pos.y=u+f,T(e,`stompSlam`,i,l.stompSlamMs));return}if(e.state===`stompSlam`){let t=Math.max(1e-6,l.stompSlamMs/1e3);if(e.pos.y=u+f*(1-v(1-(e.stateUntil-i)/t)),i>=e.stateUntil){e.pos.y=u,T(e,`stompRecover`,i,e.phase===2?l.phase2RecoveryMs:l.stompRecoveryMs);let t=i+l.stompWaveLifeMs/1e3;h(r,`wave`,e.pos.x,u,l.stompWaveWidth,l.stompWaveHeight,l.stompWaveSpeed,0,t,l.stompDamage),h(r,`wave`,e.pos.x,u,l.stompWaveWidth,l.stompWaveHeight,-l.stompWaveSpeed,0,t,l.stompDamage),c.push({kind:`bossAttack`,x:e.pos.x,y:e.pos.y})}return}e.state===`stompRecover`&&i>=e.stateUntil&&M(e,i,o,P(e,o,s))}function L(){return{grounded:!1,hitCeiling:!1,hitWall:0}}function ee(e,t,n,r){return r.x=e.x-t*.5,r.y=e.y,r.w=t,r.h=n,r}function R(e,t){return e.x<t.x+t.w&&e.x+e.w>t.x&&e.y<t.y+t.h&&e.y+e.h>t.y}var te={x:0,y:0,w:0,h:0},z=1e-4;function B(e,t){return Math.min(e.x+e.w,t.x+t.w)-Math.max(e.x,t.x)}function V(e,t){return Math.min(e.y+e.h,t.y+t.h)-Math.max(e.y,t.y)}function ne(e,t,n,r,i,a,o){let s=t.x*a;if(s===0)return;e.x+=s;let c=s>0?1:-1,l=!1;for(let t of i)ee(e,n,r,te),!(B(te,t)<=0||V(te,t)<=z)&&(e.x=c>0?t.x-n*.5:t.x+t.w+n*.5,l=!0);l&&(t.x=0,o.hitWall=c>0?1:-1)}function H(e,t,n,r,i,a,o){let s=t.y*a;if(s===0)return;e.y+=s;let c=s>0?1:-1,l=!1;for(let t of i)ee(e,n,r,te),!(V(te,t)<=0||B(te,t)<=z)&&(e.y=c>0?t.y-r:t.y+t.h,l=!0);l&&(t.y=0,c>0?o.hitCeiling=!0:o.grounded=!0)}function re(e,t,n,r,i,a,o){o.grounded=!1,o.hitCeiling=!1,o.hitWall=0;let s=Math.max(.001,Math.min(n,r)*.5),c=Math.max(Math.abs(t.x*a),Math.abs(t.y*a)),l=1;c>s&&(l=Math.ceil(c/s));let u=a/l;for(let a=0;a<l;a+=1)ne(e,t,n,r,i,u,o),H(e,t,n,r,i,u,o);return o}var ie=L();function ae(e,t){return e===`guard`?t.guard:e===`stomper`?t.stomper:e===`sentry`?t.sentry:t.lamplighter}function oe(e,t,n=0){let r=[];for(let i of e.enemies){let e=i.kind===`lamplighter`,a=i.y+t.lamplighter.hoverHeight,o=e?a+Math.sin(n*t.lamplighter.bobSpeed)*t.lamplighter.bobAmp:i.y;r.push({id:i.id,kind:i.kind,pos:{x:i.x,y:o},prev:{x:i.x,y:o},vel:{x:0,y:e?a:0},facing:i.facing,grounded:!1,health:ae(i.kind,t).health,state:`patrol`,stateUntil:e?n+t.lamplighter.dropIntervalMs/1e3:0,hurtFrom:`patrol`,hurtRemain:0,patrolMinX:i.patrolMinX,patrolMaxX:i.patrolMaxX,alive:!0,flash:0,swoop:0})}return r}function se(e,t,n,r,i,a){let o=a.lamplighter,s=e.pos.y-t.pos.y,c=Math.abs(t.pos.x-e.pos.x)<=o.sightRange&&s>=-o.height&&s<=o.sightDepth;if(c&&(e.facing=t.pos.x<e.pos.x?-1:1),e.state===`hurt`)r>=e.stateUntil&&(e.state=`patrol`,e.stateUntil=r+o.dropIntervalMs/1e3);else if(e.state===`patrol`){if(c&&r>=e.stateUntil)e.state=`telegraph`,e.stateUntil=r+o.dropTelegraphMs/1e3,e.vel.x=0;else if(c){let n=Math.max(e.patrolMinX,Math.min(e.patrolMaxX,t.pos.x))-e.pos.x,r=o.chaseSpeed*i;e.vel.x=Math.abs(n)<=r?n/i:(n<0?-1:1)*o.chaseSpeed}else e.pos.x<=e.patrolMinX?e.facing=1:e.pos.x>=e.patrolMaxX&&(e.facing=-1),e.vel.x=e.facing*o.patrolSpeed}else if(e.state===`telegraph`){if(e.vel.x=0,r>=e.stateUntil){e.state=`attack`,e.stateUntil=r+i;let a=Math.max(e.pos.y-t.pos.y,0)/o.emberFallSpeed,s=t.pos.x+t.vel.x*o.emberLeadFactor-e.pos.x,c=a>0?s/a:0;h(n,`ember`,e.pos.x,e.pos.y,o.emberWidth,o.emberHeight,Math.max(-o.emberSideSpeed,Math.min(o.emberSideSpeed,c)),-o.emberFallSpeed,r+o.emberLifeMs/1e3,o.damage)}}else e.state===`attack`?(e.vel.x=0,r>=e.stateUntil&&(e.state=`recover`,e.stateUntil=r+o.dropIntervalMs/1e3)):e.state===`recover`&&(e.vel.x=0,r>=e.stateUntil&&(e.state=`patrol`));e.pos.x+=e.vel.x*i,e.pos.x<e.patrolMinX?e.pos.x=e.patrolMinX:e.pos.x>e.patrolMaxX&&(e.pos.x=e.patrolMaxX);let l=o.swoopSpeed*i;e.state===`telegraph`?e.swoop=Math.min(o.swoopDepth,e.swoop+l):e.state!==`attack`&&(e.swoop=Math.max(0,e.swoop-l));let u=e.vel.y;e.pos.y=Math.max(u-o.swoopDepth,u-e.swoop+Math.sin(r*o.bobSpeed)*o.bobAmp),e.grounded=!1}function ce(e,t,n,r,i,a){if(!e.alive||e.state===`dead`)return!1;e.health-=t,e.flash=1;let o=e.pos.x<n?-1:1;return e.vel.x=e.kind===`sentry`?0:o*i.attack.knockback,a.push({kind:`enemyHurt`,x:e.pos.x,y:e.pos.y}),e.health<=0?(e.health=0,e.alive=!1,e.state=`dead`,e.stateUntil=r,e.vel.x=0,e.vel.y=0,a.push({kind:`enemyDeath`,x:e.pos.x,y:e.pos.y}),!0):(e.state!==`hurt`&&(e.hurtFrom=e.state,e.hurtRemain=Math.max(0,e.stateUntil-r)),e.state=`hurt`,e.stateUntil=r+ae(e.kind,i).hurtMs/1e3,!1)}function le(e,t,n,r){return Math.abs(t.pos.x-e.pos.x)<=n&&Math.abs(t.pos.y-e.pos.y)<=r}function ue(e,t,n,r){let i=r.guard;if(e.state===`hurt`){n>=e.stateUntil&&(e.state=`patrol`);return}if(e.state===`patrol`){e.pos.x<=e.patrolMinX?e.facing=1:e.pos.x>=e.patrolMaxX&&(e.facing=-1),e.vel.x=e.facing*i.patrolSpeed,le(e,t,i.sightRange,i.sightHeight)&&(e.facing=t.pos.x<e.pos.x?-1:1,e.state=`telegraph`,e.stateUntil=n+i.telegraphMs/1e3,e.vel.x=0);return}if(e.state===`telegraph`){e.vel.x=0,n>=e.stateUntil&&(e.state=`attack`,e.stateUntil=n+i.lungeMs/1e3);return}if(e.state===`attack`){e.vel.x=e.facing*i.lungeSpeed,n>=e.stateUntil&&(e.state=`recover`,e.stateUntil=n+i.recoveryMs/1e3,e.vel.x=0);return}e.state===`recover`&&(e.vel.x=0,n>=e.stateUntil&&(e.state=`patrol`))}function de(e,t,n,r,i){let a=i.stomper,o=Math.max(0,a.hopIntervalMs-a.telegraphMs);if(e.state===`hurt`){r>=e.stateUntil&&(e.state=`patrol`,e.stateUntil=r+o/1e3);return}if(e.state===`telegraph`){e.vel.x=0,r>=e.stateUntil&&(e.vel.x=e.facing*a.hopVelocityX,e.vel.y=a.hopVelocityY,e.state=`attack`,e.stateUntil=r,e.grounded=!1);return}if(e.state===`attack`){if(e.grounded){e.state=`recover`,e.stateUntil=r+o/1e3,e.vel.x=0;let t=e.pos.y,i=r+a.waveLifeMs/1e3;h(n,`wave`,e.pos.x,t,a.waveWidth,a.waveHeight,a.waveSpeed,0,i,a.damage),h(n,`wave`,e.pos.x,t,a.waveWidth,a.waveHeight,-a.waveSpeed,0,i,a.damage)}return}if(e.state===`recover`){e.vel.x=0,r>=e.stateUntil&&(e.state=`patrol`);return}e.vel.x=0,!(!e.grounded||r<e.stateUntil)&&le(e,t,a.sightRange,a.sightRange)&&(e.facing=t.pos.x<e.pos.x?-1:1,e.state=`telegraph`,e.stateUntil=r+a.telegraphMs/1e3)}function fe(e,t,n){let r=n.sentry,i=e.pos.y+r.height*.5;return Math.abs(t.pos.x-e.pos.x)<=r.sightRange&&Math.abs(t.pos.y-i)<=r.sightHeight}function pe(e,t,n,r,i){let a=i.sentry,o=n+a.beamHeight,s=a.beamLength;for(let i of r)if(!(i.y>=o||i.y+i.h<=n)){if(e===1){if(i.x+i.w<=t)continue;let e=Math.max(0,i.x-t);e<s&&(s=e)}else{if(i.x>=t)continue;let e=Math.max(0,t-(i.x+i.w));e<s&&(s=e)}}return s}function me(e,t,n,r,i){let a=i.sentry,o=e.pos.x+e.facing*a.width*.5,s=e.pos.y+a.height*.5,c=pe(e.facing,o,s,t,i);c<=0||h(n,`beam`,o+e.facing*c*.5,s,c,a.beamHeight,0,0,r+a.beamMs/1e3,a.damage)}function U(e,t,n,r,i,a){let o=a.sentry;e.vel.x=0;let s=fe(e,t,a);if(e.state===`hurt`){s&&(e.facing=t.pos.x<e.pos.x?-1:1),i>=e.stateUntil&&(e.hurtFrom===`telegraph`||e.hurtFrom===`attack`?(e.state=`recover`,e.stateUntil=i+o.recoverMs/1e3):e.hurtFrom===`recover`?(e.state=`recover`,e.stateUntil=i+e.hurtRemain):(e.state=`patrol`,e.stateUntil=i+e.hurtRemain));return}if(e.state===`patrol`){if(!s)return;e.facing=t.pos.x<e.pos.x?-1:1,i>=e.stateUntil&&(e.state=`telegraph`,e.stateUntil=i+o.chargeMs/1e3);return}if(e.state===`telegraph`){i>=e.stateUntil&&(e.state=`attack`,e.stateUntil=i+o.beamMs/1e3,me(e,n,r,i,a));return}if(e.state===`attack`){i>=e.stateUntil&&(e.state=`recover`,e.stateUntil=i+o.recoverMs/1e3);return}e.state===`recover`&&i>=e.stateUntil&&(e.state=`patrol`,e.stateUntil=i+o.cooldownMs/1e3)}function he(e,t,n,r,i,a,o){let s=o.player.gravity,c=o.player.maxFallSpeed,l=o.feel.flashDecayPerSec*a;for(let u of e){if(u.flash>0&&(u.flash=Math.max(0,u.flash-l)),!u.alive)continue;if(u.prev.x=u.pos.x,u.prev.y=u.pos.y,u.kind===`lamplighter`){se(u,t,r,i,a,o);continue}u.kind===`guard`?ue(u,t,i,o):u.kind===`sentry`?U(u,t,n,r,i,o):de(u,t,r,i,o),u.vel.y-=s*a,u.vel.y<-c&&(u.vel.y=-c);let e=ae(u.kind,o);if(re(u.pos,u.vel,e.width,e.height,n,a,ie),u.grounded=ie.grounded,u.kind===`guard`){let e=Math.max(u.patrolMinX,Math.min(u.patrolMaxX,u.pos.x));e!==u.pos.x&&(u.pos.x=e,u.state===`attack`&&(u.state=`recover`,u.stateUntil=i+o.guard.recoveryMs/1e3,u.vel.x=0))}}}var ge=L();function _e(e,t,n,r){e.push({kind:t,x:n,y:r})}function W(){return{pos:{x:0,y:0},prev:{x:0,y:0},vel:{x:0,y:0},facing:1,grounded:!1,coyoteUntil:0,jumpBufferedUntil:0,jumpCutApplied:!0,health:1,invulnerableUntil:0,hurtUntil:0,dashUntil:0,dashReadyAt:0,dashDir:1,airDashesUsed:0,attackPhase:`none`,attackUntil:0,attackDir:`side`,attackHitIds:[],longwick:!1}}function G(e,t,n,r,i){e.pos.x=t.x,e.pos.y=t.y,e.prev.x=t.x,e.prev.y=t.y,e.vel.x=0,e.vel.y=0,e.facing=n,e.grounded=!1,e.coyoteUntil=0,e.jumpBufferedUntil=0,e.jumpCutApplied=!0,e.health=r.player.maxHealth+i,e.invulnerableUntil=0,e.hurtUntil=0,e.dashUntil=0,e.dashReadyAt=0,e.dashDir=n,e.airDashesUsed=0,e.attackPhase=`none`,e.attackUntil=0,e.attackDir=`side`,e.attackHitIds.length=0}function K(e,t,n){e.pos.x=t.x,e.pos.y=t.y,e.prev.x=t.x,e.prev.y=t.y,e.vel.x=0,e.vel.y=0,e.facing=n,e.grounded=!1,e.coyoteUntil=0,e.jumpBufferedUntil=0,e.jumpCutApplied=!0,e.hurtUntil=0,e.dashUntil=0,e.dashReadyAt=0,e.dashDir=n,e.airDashesUsed=0,e.attackPhase=`none`,e.attackUntil=0,e.attackDir=`side`,e.attackHitIds.length=0}function ve(e,t){return e.longwick?t.attack.longwickReach:t.attack.reach}function ye(e,t,n){return e.attackPhase===`active`?be(e,e.attackDir,t,n):null}function be(e,t,n,r){let i=ve(e,n),a=n.player,o=n.attack.height;return t===`up`?(r.w=o,r.h=i,r.x=e.pos.x-o*.5,r.y=e.pos.y+a.height,r):t===`down`?(r.w=o,r.h=i,r.x=e.pos.x-o*.5,r.y=e.pos.y-i,r):(r.w=i,r.h=o,r.x=e.facing>0?e.pos.x+a.width*.5:e.pos.x-a.width*.5-i,r.y=e.pos.y+a.height*.5-o*.5,r)}function xe(e,t){e.attackDir===`side`&&(e.vel.x=-e.facing*t.attack.recoil)}function Se(e,t,n,r,i,a,o=!1){if(r<e.invulnerableUntil||e.health<=0)return!1;let s=i.player;o||(e.health-=n),e.invulnerableUntil=r+s.hitInvulnerableMs/1e3,e.hurtUntil=r+s.hurtStunMs/1e3;let c=e.pos.x<t?-1:1;return e.vel.x=c*s.hurtKnockbackX,e.vel.y=s.hurtKnockbackY,e.dashUntil=0,e.jumpCutApplied=!0,e.attackPhase=`none`,e.attackUntil=0,_e(a,`hurt`,e.pos.x,e.pos.y),e.health<=0&&(e.health=0,_e(a,`death`,e.pos.x,e.pos.y),!0)}function Ce(e,t,n,r,i,a,o){let s=a.player,c=a.dash,l=a.attack;e.prev.x=e.pos.x,e.prev.y=e.pos.y,e.attackPhase!==`none`&&r>=e.attackUntil&&(e.attackPhase===`windup`?(e.attackPhase=`active`,e.attackUntil=r+l.activeMs/1e3):e.attackPhase===`active`?(e.attackPhase=`recovery`,e.attackUntil=r+l.recoveryMs/1e3):(e.attackPhase=`none`,e.attackUntil=0));let u=r<e.hurtUntil,d=r-i<e.dashUntil;if(t.dash&&!u&&r>=e.dashUntil&&r>=e.dashReadyAt&&(e.grounded||e.airDashesUsed<c.airDashes)){e.dashUntil=r+c.durationMs/1e3,e.dashReadyAt=r+c.cooldownMs/1e3,e.dashDir=e.facing;let t=e.dashUntil+c.invulnerableMs/1e3;t>e.invulnerableUntil&&(e.invulnerableUntil=t),e.grounded||(e.airDashesUsed+=1),_e(o,`dash`,e.pos.x,e.pos.y)}let f=r<e.dashUntil;if(!f&&d){let t=s.walkSpeed;e.vel.x>t?e.vel.x=t:e.vel.x<-t&&(e.vel.x=-t)}if(t.attack&&e.attackPhase===`none`&&!f&&!u){let n=`side`;t.moveY>.5?n=`up`:t.moveY<-.5&&!e.grounded&&(n=`down`),e.attackDir=n,e.attackPhase=`windup`,e.attackUntil=r+l.windupMs/1e3,e.attackHitIds.length=0,_e(o,`attackSwing`,e.pos.x,e.pos.y)}let p=0;!u&&!f&&(p=t.moveX>1?1:t.moveX<-1?-1:t.moveX),p!==0&&!f&&e.attackPhase!==`active`&&(e.facing=p>0?1:-1),e.grounded&&(e.coyoteUntil=r+s.coyoteMs/1e3,e.airDashesUsed=0),t.jump&&(e.jumpBufferedUntil=r+s.jumpBufferMs/1e3);let m=!1;if(!f&&!u&&r<e.jumpBufferedUntil&&(e.grounded||r<e.coyoteUntil)&&(e.vel.y=s.jumpVelocity,e.jumpBufferedUntil=0,e.coyoteUntil=0,e.jumpCutApplied=!1,e.grounded=!1,m=!0,_e(o,`jump`,e.pos.x,e.pos.y)),!m&&!t.jumpHeld&&!e.jumpCutApplied&&e.vel.y>0&&(e.vel.y*=s.jumpCutMultiplier,e.jumpCutApplied=!0),f){let t=e.dashUntil-r,n=t<i?t:i,a=c.distance/(c.durationMs/1e3);e.vel.x=e.dashDir*a*(n/i),e.vel.y=0}else if(!u){let t=p*s.walkSpeed,n=p===0?s.decel:s.accel;e.grounded||(n*=s.airControl);let r=n*i;e.vel.x<t?e.vel.x=Math.min(t,e.vel.x+r):e.vel.x>t&&(e.vel.x=Math.max(t,e.vel.x-r))}f||(e.vel.y-=s.gravity*i,e.vel.y<-s.maxFallSpeed&&(e.vel.y=-s.maxFallSpeed));let h=e.grounded;re(e.pos,e.vel,s.width,s.height,n,i,ge),e.grounded=ge.grounded,e.grounded&&!h&&(e.airDashesUsed=0,e.jumpCutApplied=!0,_e(o,`land`,e.pos.x,e.pos.y))}var we={x:0,y:0,w:0,h:0},q={x:0,y:0,w:0,h:0},Te={x:0,y:0,w:0,h:0};function Ee(e){return-2-e}function De(e,t,n,r,i,a){let o=e.player,s=ye(o,i,we);if(s){for(let t of e.enemies){if(!t.alive||o.attackHitIds.includes(t.id))continue;let e=ae(t.kind,i);if(ee(t.pos,e.width,e.height,q),!R(s,q))continue;let n=o.attackHitIds.length===0;o.attackHitIds.push(t.id),a.push({kind:`attackHit`,x:t.pos.x,y:t.pos.y+e.height*.5}),ce(t,i.attack.damage,o.pos.x,r,i,a),n&&xe(o,i)}let c=e.boss;if(c&&c.alive&&!o.attackHitIds.includes(c.id)&&(x(c,i,q),R(s,q))){let e=o.attackHitIds.length===0;o.attackHitIds.push(c.id),a.push({kind:`attackHit`,x:c.pos.x,y:c.pos.y+i.boss.height*.5}),D(c,i.attack.damage,r,i,a),e&&xe(o,i)}for(let r=0;r<t.breakables.length;r+=1){let c=t.breakables[r];if(!c)continue;let l=Ee(r);if(e.progress.broken.includes(c.id)||o.attackHitIds.includes(l)||!R(s,c.rect))continue;let u=o.attackHitIds.length===0;o.attackHitIds.push(l);let d=c.rect.x+c.rect.w*.5,f=c.rect.y+c.rect.h*.5,p=n.get(c.id),m=(p===void 0?c.health:p)-i.attack.damage;n.set(c.id,m),a.push({kind:`attackHit`,x:d,y:f}),m<=0&&(e.progress.broken.push(c.id),a.push({kind:`breakableBroken`,x:d,y:f})),u&&xe(o,i)}}if(o.health<=0)return;ee(o.pos,i.player.width,i.player.height,q);for(let t of e.enemies){if(!t.alive||t.state===`hurt`||t.kind===`lamplighter`||t.kind===`sentry`)continue;let n=ae(t.kind,i);ee(t.pos,n.width,n.height,Te),R(q,Te)&&Se(o,t.pos.x,n.damage,r,i,a,e.god)}for(let t of e.hazards)t.alive&&(ee(t.pos,t.w,t.h,Te),R(q,Te)&&Se(o,t.pos.x,t.damage,r,i,a,e.god));let c=e.boss;if(c&&c.alive){let t=w(c,i,Te);t&&R(q,t)&&Se(o,c.pos.x,i.boss.sweepDamage,r,i,a,e.god),S(c)&&(x(c,i,Te),R(q,Te)&&Se(o,c.pos.x,C(c,i),r,i,a,e.god))}}function Oe(e,t){return{checkpointRoom:e,checkpoint:{x:t.x,y:t.y},collected:[],opened:[],broken:[],bossDefeated:!1,deaths:0,maxHealthBonus:0}}function ke(e,t){e.deathAt=t,e.phase=`dead`,e.transition=null}function Ae(e,t){return e.time>=e.deathAt+t.feel.deathDelayMs/1e3}function je(e){let t={seed:e>>>0,next(){t.seed=t.seed+1831565813>>>0;let e=t.seed;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296},range(e,n){return e+(n-e)*t.next()}};return t}var Me={x:0,y:0,w:0,h:0},Ne={x:0,y:0,w:0,h:0};function Pe(e,t){for(let n of e)if(n.id===t)return n}function Fe(e,t,n){n.length=0;for(let t of e.solids)n.push(t);for(let r of e.breakables)t.broken.includes(r.id)||n.push(r.rect);for(let r of e.gates)t.opened.includes(r.id)||n.push(r.rect);return n}function Ie(e,t){let n=[];for(let r of e.pickups)t.collected.includes(r.id)||(r.kind!==`dawnCore`||t.bossDefeated)&&n.push({id:r.id,kind:r.kind,pos:{x:r.x,y:r.y},collected:!1});return n}function Le(e,t,n){return n.w=t.world.checkpointWidth,n.h=t.world.checkpointHeight,n.x=e.x-n.w*.5,n.y=e.y,n}function Re(e,t,n){return n.w=t.world.pickupWidth,n.h=t.world.pickupHeight,n.x=e.x-n.w*.5,n.y=e.y-n.h*.5,n}function ze(e,t,n){return ee(e.player.pos,t.player.width,t.player.height,n)}function Be(e,t,n){if(!e.transition){ze(e,n,Me);for(let n of t.doors)if(R(Me,n.rect)){e.transition={to:n.to,entry:{x:n.entry.x,y:n.entry.y},entryFacing:n.entryFacing};return}}}function Ve(e,t,n,r){let i=[];for(let a of e)for(let e of a.gates)e.openWhen===n&&(!t.opened.includes(e.id)||i.includes(e.id))&&(i.includes(e.id)||i.push(e.id),t.opened.includes(e.id)||t.opened.push(e.id),r.push({kind:`gateOpen`,x:e.rect.x+e.rect.w*.5,y:e.rect.y}))}function He(e,t,n){if(e.pickups.length!==0){ze(e,t,Me);for(let r of e.pickups)r.collected||(Re(r.pos,t,Ne),R(Me,Ne)&&(r.collected=!0,e.progress.collected.includes(r.id)||e.progress.collected.push(r.id),n.push({kind:`pickup`,x:r.pos.x,y:r.pos.y}),r.kind===`longwick`?e.player.longwick=!0:r.kind===`emberFlask`?(e.progress.maxHealthBonus+=t.world.flaskHealthBonus,e.player.health=t.player.maxHealth+e.progress.maxHealthBonus):r.kind===`dawnCore`&&(n.push({kind:`victory`,x:r.pos.x,y:r.pos.y}),e.phase=`victory`,e.victoryAt=e.time)))}}function Ue(e,t,n,r,i){let a=t.checkpoint;return!a||(ze(e,n,Me),Le(a,n,Ne),!R(Me,Ne))?!1:(e.progress.checkpointRoom=t.id,e.progress.checkpoint.x=a.x,e.progress.checkpoint.y=a.y,e.player.health=n.player.maxHealth+e.progress.maxHealthBonus,r||i.push({kind:`checkpoint`,x:a.x,y:a.y}),!0)}function We(e=1/60,t=8){let n={stepSeconds:e,maxStepsPerFrame:t,accumulator:0,advance(r,i){Number.isFinite(r)&&r>0&&(n.accumulator+=r);let a=0;for(;n.accumulator>=e&&a<t;)n.accumulator-=e,a+=1,i(e);return n.accumulator>=e&&(n.accumulator%=e),n.accumulator/e},reset(){n.accumulator=0}};return n}var Ge={id:``,name:``,bounds:{x:0,y:0,w:0,h:0},solids:[],doors:[],enemies:[],pickups:[],gates:[],breakables:[],decor:[],waypoints:[]};function Ke(e){if(e.checkpoint)return{x:e.checkpoint.x,y:e.checkpoint.y};let t=e.waypoints[0];return t?{x:t.x,y:t.y}:{x:e.bounds.x+e.bounds.w*.5,y:e.bounds.y}}function qe(e){let t=e.tuning,n=je(e.seed),r=e.rooms,i=r[0]??Ge,a=Pe(r,e.startRoom??i.id)??i,o=e.startPos?{x:e.startPos.x,y:e.startPos.y}:Ke(a),s=W(),c=p(t.world.hazardCapacity),l=[],u=new Map,d=a,f=!1,h={moveX:0,moveY:0,jump:!1,jumpHeld:!1,attack:!1,dash:!1,pause:!1,confirm:!1},g={phase:`title`,time:0,tick:0,seed:e.seed,roomId:a.id,player:s,enemies:[],boss:null,hazards:c,pickups:[],progress:Oe(a.id,o),events:[],transition:null,deathAt:0,victoryAt:0,god:e.god??!1};function v(e,n,i,a){let o=Pe(r,e);o&&(d=o),g.roomId=d.id,K(s,n,i),a&&(s.health=t.player.maxHealth+g.progress.maxHealthBonus);let l=d.bossArena!==void 0;g.enemies=l&&g.progress.bossDefeated?[]:oe(d,t,g.time),g.boss=g.progress.bossDefeated?b(d,t,g.time):y(d,t),g.pickups=Ie(d,g.progress),m(c),g.transition=null,f=!1,g.events.push({kind:`roomEnter`,x:n.x,y:n.y}),l&&(Ve(r,g.progress,`bossApproach`,g.events),g.progress.bossDefeated&&Ve(r,g.progress,`bossDefeated`,g.events))}function x(){n.seed=e.seed>>>0}function S(){x(),g.phase=`playing`,g.time=0,g.tick=0,g.deathAt=0,g.victoryAt=0,g.transition=null,u.clear(),g.progress=Oe(a.id,o),G(s,o,1,t,g.progress.maxHealthBonus),s.longwick=!1,v(a.id,o,1,!0),g.progress.checkpointRoom=d.id,g.progress.checkpoint.x=o.x,g.progress.checkpoint.y=o.y,f=!0,g.events.push({kind:`start`,x:o.x,y:o.y})}function C(){x(),g.phase=`title`,g.time=0,g.tick=0,g.deathAt=0,g.victoryAt=0,g.transition=null,u.clear(),g.progress=Oe(a.id,o),G(s,o,1,t,g.progress.maxHealthBonus),s.longwick=!1,v(a.id,o,1,!0),g.progress.checkpointRoom=d.id,g.progress.checkpoint.x=o.x,g.progress.checkpoint.y=o.y,f=!0}function w(){g.progress.deaths+=1;let e=g.progress.checkpoint;v(g.progress.checkpointRoom,e,1,!0),f=!0,g.phase=`playing`,g.deathAt=0,g.events.push({kind:`respawn`,x:e.x,y:e.y})}function T(){g.phase===`playing`&&(g.phase=`paused`,g.events.push({kind:`pause`,x:s.pos.x,y:s.pos.y}))}function E(){g.phase===`paused`&&(g.phase=`playing`,g.events.push({kind:`resume`,x:s.pos.x,y:s.pos.y}))}function D(e){if(g.phase===`title`){h.confirm&&S();return}if(g.phase===`paused`){h.pause&&E();return}if(g.phase===`victory`){g.time+=e,h.confirm&&g.time-g.victoryAt>=t.feel.victoryHoldMs/1e3&&C();return}if(g.phase===`dead`){g.time+=e,(h.confirm||Ae(g,t))&&w();return}if(h.pause){T();return}let i=g.time;if(g.transition){let e=g.transition;v(e.to,e.entry,e.entryFacing,!1)}if(Fe(d,g.progress,l),Ce(s,h,l,i,e,t,g.events),he(g.enemies,s,l,c,i,e,t),g.boss&&I(g.boss,s,d,c,i,e,t,n,g.events),_(c,d.bounds,l,i,e),De(g,d,u,i,t,g.events),g.boss&&!g.boss.alive&&!g.progress.bossDefeated&&(g.progress.bossDefeated=!0,Ve(r,g.progress,`bossDefeated`,g.events),g.pickups=Ie(d,g.progress)),s.health<=0){g.time+=e,g.tick+=1,ke(g,g.time);return}He(g,t,g.events),f=Ue(g,d,t,f,g.events),Be(g,d,t),g.time+=e,g.tick+=1}return{state:g,setInput(e){h.moveX=e.moveX,h.moveY=e.moveY,h.jump=e.jump,h.jumpHeld=e.jumpHeld,h.attack=e.attack,h.dash=e.dash,h.pause=e.pause,h.confirm=e.confirm},step:D,start:S,respawn:w,returnToTitle:C,pause:T,resume:E,currentRoom(){return d}}}var Je=`BORROWED DAWN`,Ye=`Steal the sunrise from the machines that hoard it.`,Xe=`ARROWS or WASD move  Z/SPACE jump  X/J attack  C/SHIFT dash  ESC pause`,Ze=`ENTER to begin`,Qe=`paused`,$e=`ESC to resume`,et=`ember rekindled`,tt=`the ember gutters`,nt=`The bell falls silent. The furnace stays warm.`,rt=`ENTER to return to the landing`,it=`THE BELLKEEPER - No light leaves the reserve.`,at=`THE BELLKEEPER`,ot=`Longwick`,st=`the shortcut grinds open`,ct=`the wick cache opens`,lt={longwick:`Longwick: your needle reaches further`,dawnCore:`Dawn Core: the shrine relights`,emberFlask:`Ember Flask: one more ember to burn`},ut={landing:`Cinder Landing`,gallery:`Chain Gallery`,cache:`Wick Cache`,belfry:`Belfry`,vault:`Ember Vault`,reserve:`The Reserve`,lenshall:`The Lens Hall`,sunwell:`The Sunwell`};function dt(e){return ut[e]??e}var ft=461069,pt=1383204,mt=8161172,ht=15262421,gt=16758344,_t=5924984,vt=14674418,yt=16773852,bt={fogColor:ft,fogNear:13,fogFar:34,hemiSky:mt,hemiGround:ft,hemiIntensity:.55,keyColor:ht,keyIntensity:.62,fillColor:mt,fillIntensity:.12,emberDensity:.25},xt={fogColor:ft,fogNear:11,fogFar:28,hemiSky:mt,hemiGround:ft,hemiIntensity:.42,keyColor:ht,keyIntensity:.7,fillColor:mt,fillIntensity:.08,emberDensity:.4},St={fogColor:ft,fogNear:8,fogFar:22,hemiSky:mt,hemiGround:pt,hemiIntensity:.5,keyColor:ht,keyIntensity:.55,fillColor:gt,fillIntensity:.14,emberDensity:.35},Ct={fogColor:ft,fogNear:11,fogFar:26,hemiSky:mt,hemiGround:pt,hemiIntensity:.58,keyColor:ht,keyIntensity:.66,fillColor:gt,fillIntensity:.26,emberDensity:.55,shaftDirX:-.22},wt={fogColor:_t,fogNear:8,fogFar:22,hemiSky:mt,hemiGround:pt,hemiIntensity:.6,keyColor:vt,keyIntensity:.55,fillColor:gt,fillIntensity:.16,emberDensity:.12},Tt={fogColor:_t,fogNear:9,fogFar:26,hemiSky:mt,hemiGround:pt,hemiIntensity:.64,keyColor:vt,keyIntensity:.6,fillColor:vt,fillIntensity:.16,emberDensity:.1},Et={fogColor:ft,fogNear:6,fogFar:17,hemiSky:mt,hemiGround:ft,hemiIntensity:.28,keyColor:vt,keyIntensity:.42,fillColor:gt,fillIntensity:.04,emberDensity:.3,shaftDirX:.26},Dt={fogColor:ft,fogNear:12,fogFar:36,hemiSky:mt,hemiGround:ft,hemiIntensity:.4,keyColor:ht,keyIntensity:.6,fillColor:gt,fillIntensity:.12,emberDensity:.9},Ot={id:`landing`,name:ut.landing,bounds:{x:0,y:0,w:34,h:16},solids:[{x:-2,y:-2,w:38,h:2},{x:-2,y:0,w:2,h:18},{x:34,y:0,w:2,h:18},{x:-2,y:16,w:38,h:2},{x:5.2,y:.4,w:2.4,h:.16},{x:11.2,y:0,w:1.35,h:1.2},{x:11.9,y:1.2,w:1.2,h:1.05},{x:15.4,y:0,w:4.4,h:.9},{x:21.4,y:1.3,w:1,h:.28},{x:22.5,y:2.1,w:1,h:.28},{x:23.6,y:2.9,w:1,h:.28},{x:24.7,y:3.7,w:1,h:.28},{x:25.8,y:4.5,w:1,h:.28},{x:27,y:4.9,w:7,h:.5}],doors:[{rect:{x:33.6,y:5.4,w:1.2,h:2.8},to:`gallery`,entry:{x:2.9,y:0},entryFacing:1},{rect:{x:33.6,y:0,w:1.2,h:3.4},to:`belfry`,entry:{x:3,y:0},entryFacing:1},{rect:{x:-.6,y:0,w:1.2,h:2.8},to:`sunwell`,entry:{x:9.6,y:0},entryFacing:-1}],enemies:[],pickups:[],gates:[{id:`belfry-shortcut`,rect:{x:32.4,y:0,w:1,h:3.4},openWhen:`bossApproach`},{id:`sunwell-shutter`,rect:{x:.6,y:0,w:1,h:2.8},openWhen:`bossDefeated`}],breakables:[],checkpoint:{x:2.5,y:0},ambience:bt,music:`cinder`,decor:[{kind:`glow`,rect:{x:17.7,y:4.4,w:7,h:7},z:-14.5,color:gt,intensity:.3},{kind:`block`,rect:{x:12.4,y:0,w:3.2,h:19},z:-13},{kind:`block`,rect:{x:27,y:0,w:3.2,h:19},z:-13},{kind:`block`,rect:{x:15.6,y:0,w:11.4,h:3.4},z:-13},{kind:`block`,rect:{x:15.6,y:13.2,w:11.4,h:5.8},z:-13},{kind:`bell`,rect:{x:17.3,y:4.6,w:7.8,h:7.6},z:-12},{kind:`chain`,rect:{x:20.95,y:12.2,w:.5,h:1.2},z:-12},{kind:`block`,rect:{x:-3,y:0,w:13,h:10.5},z:-13},{kind:`block`,rect:{x:30.2,y:0,w:12,h:19},z:-13},{kind:`chain`,rect:{x:8.2,y:8,w:.3,h:11},z:-8},{kind:`chain`,rect:{x:32.6,y:6,w:.3,h:13},z:-8},{kind:`embers`,rect:{x:20,y:0,w:14,h:9},z:-5,intensity:.5},{kind:`wall`,rect:{x:0,y:0,w:34,h:3.1},z:-4.2},{kind:`pillar`,rect:{x:3.9,y:0,w:1,h:9},z:-3.4},{kind:`pillar`,rect:{x:13.3,y:0,w:1,h:9},z:-3.4},{kind:`arch`,rect:{x:5.3,y:3.1,w:7.6,h:6.4},z:-3.6},{kind:`arch`,rect:{x:15.4,y:3.1,w:5.4,h:5.4},z:-3.6},{kind:`pillar`,rect:{x:21.2,y:0,w:1,h:9},z:-3.4},{kind:`boiler`,rect:{x:7.6,y:0,w:2.4,h:1.5},z:-2.2},{kind:`shutter`,rect:{x:.6,y:0,w:1,h:2.8},z:-1.2,color:gt,intensity:.6},{kind:`lamp`,rect:{x:0,y:0,w:3.1,h:3.7},z:-.9},{kind:`bench`,rect:{x:5.2,y:0,w:2.4,h:.55},z:0},{kind:`crate`,rect:{x:11.2,y:0,w:2,h:2.25},z:0},{kind:`beam`,rect:{x:15.4,y:0,w:4.4,h:16},z:0,intensity:1},{kind:`stair`,rect:{x:21.2,y:0,w:5.8,h:4.8},z:0},{kind:`gallery`,rect:{x:27,y:0,w:7,h:5.4},z:0},{kind:`rubble`,rect:{x:28.2,y:0,w:3.4,h:1.5},z:-1.6}],waypoints:[{x:2.5,y:0},{x:9,y:0},{x:14,y:0},{x:20.5,y:0},{x:21.9,y:1.58},{x:23,y:2.38},{x:24.1,y:3.18},{x:25.2,y:3.98},{x:26.3,y:4.78},{x:28.5,y:5.4},{x:33.2,y:5.4}]},kt={id:`gallery`,name:ut.gallery,bounds:{x:0,y:0,w:40,h:16},solids:[{x:-2,y:-.6,w:44,h:.6},{x:-2,y:0,w:2,h:18},{x:40,y:0,w:2,h:18},{x:-2,y:16,w:44,h:2},{x:5.4,y:.44,w:.95,h:.28},{x:6.45,y:1.16,w:.95,h:.28},{x:7.5,y:1.88,w:4,h:.28},{x:11.6,y:2.6,w:.95,h:.28},{x:12.65,y:3.32,w:.95,h:.28},{x:13.6,y:3,w:13.9,h:.6},{x:27.5,y:2.42,w:.9,h:.28},{x:28.5,y:1.52,w:.9,h:.28},{x:29.5,y:.62,w:.9,h:.28},{x:7.6,y:3.8,w:1.3,h:.4},{x:6.22,y:4.65,w:1.38,h:.4},{x:4.84,y:5.5,w:1.38,h:.4},{x:3.44,y:6.35,w:1.4,h:.4},{x:2.06,y:7.2,w:1.38,h:.4},{x:0,y:6.6,w:2.06,h:1},{x:0,y:9.6,w:3.4,h:1.2},{x:15,y:4.9,w:1.6,h:.3},{x:17.8,y:6.4,w:3.8,h:.45},{x:24,y:7.7,w:2.2,h:.35},{x:27.8,y:8.65,w:3.4,h:.35},{x:33.4,y:9.15,w:6.6,h:.6}],doors:[{rect:{x:-.6,y:0,w:1.2,h:2.6},to:`landing`,entry:{x:31.2,y:5.4},entryFacing:-1},{rect:{x:.9,y:9,w:1.6,h:.6},to:`cache`,entry:{x:3.4,y:0},entryFacing:1},{rect:{x:39.4,y:0,w:1.2,h:2.8},to:`belfry`,entry:{x:1.7,y:6.4},entryFacing:1},{rect:{x:39.4,y:9.75,w:1.2,h:2.55},to:`vault`,entry:{x:1.6,y:0},entryFacing:1}],enemies:[{id:1,kind:`guard`,x:25,y:3.6,patrolMinX:23,patrolMaxX:27,facing:-1},{id:2,kind:`stomper`,x:34,y:0,patrolMinX:31,patrolMaxX:38,facing:-1},{id:4,kind:`lamplighter`,x:17.6,y:6.9,patrolMinX:15.2,patrolMaxX:21,facing:-1}],pickups:[],gates:[],breakables:[],ambience:xt,music:`cinder`,decor:[{kind:`glow`,rect:{x:28.6,y:-7.5,w:3.8,h:3.8},z:-13.3,color:gt,intensity:.4},{kind:`arch`,rect:{x:4,y:-9,w:6.6,h:9},z:-13,intensity:1},{kind:`arch`,rect:{x:15,y:-9,w:6.6,h:9},z:-13,intensity:1},{kind:`arch`,rect:{x:26,y:-9,w:6.6,h:9},z:-13,intensity:1},{kind:`block`,rect:{x:-3,y:-9,w:6,h:9},z:-13.2},{kind:`block`,rect:{x:11.6,y:-9,w:2.4,h:9},z:-13.2},{kind:`block`,rect:{x:22.6,y:-9,w:2.4,h:9},z:-13.2},{kind:`block`,rect:{x:33.6,y:-9,w:9,h:9},z:-13.2},{kind:`pillar`,rect:{x:6,y:0,w:1.6,h:19},z:-12.5},{kind:`pillar`,rect:{x:24,y:0,w:1.6,h:19},z:-12.5},{kind:`block`,rect:{x:34,y:0,w:9,h:19},z:-13},{kind:`bell`,rect:{x:35.4,y:3,w:8,h:8},z:-12},{kind:`chain`,rect:{x:9.4,y:6.5,w:.3,h:9.5},z:-8},{kind:`chain`,rect:{x:32.4,y:3.6,w:.3,h:12.4},z:-8},{kind:`pillar`,rect:{x:12.5,y:0,w:1.1,h:12},z:-3.4},{kind:`pillar`,rect:{x:31.4,y:0,w:1.1,h:12},z:-3.4},{kind:`pillar`,rect:{x:36,y:0,w:1.1,h:10.5},z:-3.2},{kind:`winch`,rect:{x:17.1,y:4.6,w:5.2,h:10.6},z:-2.8},{kind:`chain`,rect:{x:22.9,y:5.4,w:.3,h:10.6},z:-2.8},{kind:`pipe`,rect:{x:32.6,y:4.6,w:3.4,h:.3},z:-2.6,intensity:1},{kind:`boiler`,rect:{x:33,y:0,w:2.6,h:1.5},z:-2.4},{kind:`rack`,rect:{x:30.9,y:1,w:2.2,h:2.2},z:-2.2},{kind:`furnace`,rect:{x:36,y:.6,w:1.4,h:2.4},z:-2.2,intensity:.6},{kind:`glow`,rect:{x:28.4,y:.4,w:5.2,h:5.2},z:-3.4,color:gt,intensity:.4},{kind:`embers`,rect:{x:28,y:0,w:12,h:10},z:-2.2,intensity:.8},{kind:`pillar`,rect:{x:1.7,y:0,w:.7,h:6.6},z:-2},{kind:`pillar`,rect:{x:7.05,y:2.16,w:.5,h:1.5},z:-2},{kind:`embers`,rect:{x:4,y:0,w:22,h:12},z:-2.4,intensity:.15},{kind:`rubble`,rect:{x:18.6,y:0,w:3.2,h:1.2},z:-1.6},{kind:`glow`,rect:{x:38.2,y:9.9,w:3.2,h:3.2},z:-1.2,color:gt,intensity:.2},{kind:`embers`,rect:{x:39.4,y:0,w:2.4,h:5},z:-.3,intensity:1},{kind:`lamp`,rect:{x:7.3,y:2.16,w:1.2,h:1.4},z:-.9},{kind:`wall`,rect:{x:0,y:6.6,w:2.06,h:1},z:0},{kind:`wall`,rect:{x:0,y:9.6,w:3.4,h:1.2},z:0,intensity:1},{kind:`stair`,rect:{x:2.06,y:3.75,w:6.84,h:3.9},z:0},{kind:`stair`,rect:{x:5.4,y:0,w:8.2,h:3.6},z:0},{kind:`gallery`,rect:{x:13.6,y:0,w:13.9,h:3.6},z:0},{kind:`stair`,rect:{x:27.5,y:0,w:2.9,h:3.6},z:0},{kind:`chain`,rect:{x:15.15,y:5.2,w:.3,h:10.6},z:-.9},{kind:`chain`,rect:{x:16.15,y:5.2,w:.3,h:10.6},z:-.9},{kind:`beam`,rect:{x:15,y:4.9,w:1.6,h:1.2},z:0},{kind:`chain`,rect:{x:17.95,y:6.85,w:.3,h:8.95},z:-.9},{kind:`chain`,rect:{x:21.15,y:6.85,w:.3,h:8.95},z:-.9},{kind:`beam`,rect:{x:17.8,y:6.4,w:3.8,h:1.2},z:0},{kind:`chain`,rect:{x:24.15,y:8.05,w:.3,h:7.75},z:-.9},{kind:`chain`,rect:{x:25.75,y:8.05,w:.3,h:7.75},z:-.9},{kind:`beam`,rect:{x:24,y:7.7,w:2.2,h:1.2},z:0},{kind:`chain`,rect:{x:27.95,y:9,w:.3,h:6.8},z:-.9},{kind:`chain`,rect:{x:30.75,y:9,w:.3,h:6.8},z:-.9},{kind:`beam`,rect:{x:27.8,y:8.65,w:3.4,h:1.2},z:0},{kind:`gallery`,rect:{x:33.4,y:0,w:6.6,h:9.75},z:0},{kind:`veil`,rect:{x:40,y:9.75,w:8,h:3.45},z:0}],waypoints:[{x:3,y:0},{x:5.9,y:.72},{x:6.95,y:1.44},{x:10.5,y:2.16},{x:12.1,y:2.88},{x:13.2,y:3.6},{x:18.5,y:3.6},{x:25.5,y:3.6},{x:27.9,y:2.7},{x:28.9,y:1.8},{x:29.9,y:.9},{x:33.5,y:0},{x:38.6,y:0}]},At={id:`cache`,name:ut.cache,bounds:{x:0,y:0,w:24,h:12},solids:[{x:-2,y:-2,w:28,h:2},{x:-2,y:0,w:2,h:14},{x:24,y:0,w:2,h:14},{x:-2,y:12,w:28,h:2},{x:13.5,y:0,w:2.5,h:.8}],doors:[{rect:{x:1,y:0,w:1.6,h:.5},to:`gallery`,entry:{x:1.7,y:7.6},entryFacing:1}],enemies:[{id:3,kind:`guard`,x:10,y:0,patrolMinX:7,patrolMaxX:13,facing:1}],pickups:[{id:`longwick`,kind:`longwick`,x:20.5,y:1}],gates:[],breakables:[{id:`cache-wall`,rect:{x:17,y:0,w:1.2,h:4},health:3}],ambience:St,music:`cinder`,decor:[{kind:`wall`,rect:{x:0,y:0,w:24,h:12},z:-4.2},{kind:`pillar`,rect:{x:6.6,y:0,w:1,h:12},z:-3.4},{kind:`pillar`,rect:{x:16.2,y:0,w:1,h:12},z:-3.6},{kind:`arch`,rect:{x:7.6,y:0,w:8.6,h:7.4},z:-3.5},{kind:`chain`,rect:{x:4.4,y:6,w:.3,h:6},z:-2.4},{kind:`rack`,rect:{x:3.6,y:.9,w:3,h:2.6},z:-1.6},{kind:`rack`,rect:{x:8,y:.9,w:3.2,h:2.6},z:-1.6},{kind:`beam`,rect:{x:11.6,y:3.2,w:4.4,h:.3},z:-1.5},{kind:`crate`,rect:{x:12,y:3.5,w:1.1,h:1},z:-1.5},{kind:`crate`,rect:{x:13.4,y:3.5,w:.9,h:.8},z:-1.5},{kind:`beam`,rect:{x:11.6,y:5.4,w:4.4,h:.3},z:-1.5},{kind:`crate`,rect:{x:14.2,y:5.7,w:1,h:.9},z:-1.5},{kind:`pipe`,rect:{x:0,y:4.6,w:3.2,h:.3},z:-2.4,intensity:1},{kind:`rack`,rect:{x:19.2,y:.6,w:2.8,h:2.6},z:-1.3},{kind:`lamp`,rect:{x:24,y:0,w:-3.3,h:3.6},z:-.9},{kind:`embers`,rect:{x:2,y:0,w:20,h:6},z:-1.8,intensity:.3},{kind:`bench`,rect:{x:13.5,y:0,w:2.5,h:.8},z:0}],waypoints:[{x:3.4,y:0},{x:9,y:0},{x:14.8,y:.8},{x:16.2,y:0},{x:20.5,y:0}]},jt={id:`belfry`,name:ut.belfry,bounds:{x:0,y:0,w:36,h:18},solids:[{x:-2,y:-2,w:40,h:2},{x:-2,y:0,w:2,h:20},{x:36,y:0,w:2,h:20},{x:-2,y:18,w:40,h:2},{x:0,y:5.9,w:2.8,h:.5},{x:2.7,y:5.32,w:.9,h:.28},{x:3.75,y:4.52,w:.9,h:.28},{x:4.8,y:3.72,w:.9,h:.28},{x:5.85,y:2.92,w:.9,h:.28},{x:6.9,y:2.12,w:.9,h:.28},{x:7.95,y:1.32,w:.9,h:.28}],doors:[{rect:{x:-.6,y:0,w:1.2,h:3.4},to:`landing`,entry:{x:31.6,y:0},entryFacing:-1},{rect:{x:-.6,y:6.4,w:1.2,h:2.8},to:`gallery`,entry:{x:37,y:0},entryFacing:-1},{rect:{x:35.4,y:0,w:1.2,h:3.4},to:`reserve`,entry:{x:2.4,y:0},entryFacing:1}],enemies:[],pickups:[],gates:[{id:`belfry-shortcut`,rect:{x:1.2,y:0,w:1,h:3.4},openWhen:`bossApproach`},{id:`reserve-door`,rect:{x:34.2,y:0,w:1,h:3.4},openWhen:`bossDefeated`}],breakables:[],bossArena:{x:21,y:0,arenaMinX:9.5,arenaMaxX:32.5},ambience:Dt,music:`bellkeeper`,decor:[{kind:`block`,rect:{x:-3,y:0,w:15,h:3},z:-13},{kind:`block`,rect:{x:30,y:0,w:12,h:3},z:-13},{kind:`block`,rect:{x:12,y:0,w:2.2,h:19},z:-13},{kind:`block`,rect:{x:27.8,y:0,w:2.2,h:19},z:-13},{kind:`block`,rect:{x:12,y:14.8,w:18,h:4.2},z:-13},{kind:`block`,rect:{x:-3,y:0,w:6,h:12.5},z:-13},{kind:`block`,rect:{x:33.6,y:0,w:8,h:19},z:-13},{kind:`glow`,rect:{x:18.2,y:6.6,w:5.6,h:5.6},z:-14,color:gt,intensity:.16},{kind:`chain`,rect:{x:14.7,y:9,w:.3,h:10},z:-8},{kind:`chain`,rect:{x:27,y:9,w:.3,h:10},z:-8},{kind:`bell`,rect:{x:15.4,y:8.2,w:11.2,h:8.2},z:-6.6},{kind:`yoke`,rect:{x:15.6,y:16.4,w:10.8,h:1.8},z:-6.6},{kind:`pillar`,rect:{x:9.4,y:0,w:1.4,h:16},z:-5},{kind:`pillar`,rect:{x:31.2,y:0,w:1.4,h:16},z:-5},{kind:`wall`,rect:{x:0,y:0,w:36,h:3},z:-4.2},{kind:`embers`,rect:{x:2,y:0,w:32,h:16},z:-2.6,intensity:1},{kind:`pipe`,rect:{x:9.9,y:6.65,w:1.6,h:.3},z:-2.6},{kind:`pipe`,rect:{x:11.2,y:4.3,w:.3,h:2.5},z:-2.6},{kind:`pipe`,rect:{x:30.5,y:6.65,w:1.6,h:.3},z:-2.6},{kind:`pipe`,rect:{x:30.5,y:4.3,w:.3,h:2.5},z:-2.6},{kind:`furnace`,rect:{x:10.4,y:1,w:1.8,h:3.4},z:-2.4,intensity:.8},{kind:`furnace`,rect:{x:29.8,y:1,w:1.8,h:3.4},z:-2.4,intensity:.8},{kind:`boiler`,rect:{x:31.7,y:0,w:2.2,h:1.4},z:-2.4},{kind:`pipe`,rect:{x:33.9,y:3.2,w:2.1,h:.3},z:-2.6},{kind:`grate`,rect:{x:11,y:0,w:6,h:.35},z:0,intensity:.7},{kind:`grate`,rect:{x:18,y:0,w:6,h:.35},z:0,intensity:.7},{kind:`grate`,rect:{x:25,y:0,w:6,h:.35},z:0,intensity:.7},{kind:`gallery`,rect:{x:0,y:0,w:2.8,h:6.4},z:0},{kind:`stair`,rect:{x:2.6,y:0,w:6.4,h:5.7},z:0}],waypoints:[{x:1.7,y:6.4},{x:3.15,y:5.6},{x:4.2,y:4.8},{x:5.25,y:4},{x:6.3,y:3.2},{x:7.35,y:2.4},{x:8.4,y:1.6},{x:11,y:0},{x:13,y:0},{x:19,y:0},{x:26,y:0}]},Mt={id:`vault`,name:ut.vault,bounds:{x:0,y:0,w:14,h:8},solids:[{x:-2,y:-2,w:18,h:2},{x:-2,y:0,w:2,h:10},{x:14,y:0,w:2,h:10},{x:-2,y:8,w:18,h:2},{x:6.2,y:0,w:1.8,h:.9}],doors:[{rect:{x:-.6,y:0,w:1.2,h:2.55},to:`gallery`,entry:{x:38.4,y:9.75},entryFacing:-1}],enemies:[],pickups:[{id:`ember-flask`,kind:`emberFlask`,x:7.1,y:1}],gates:[],breakables:[],ambience:Ct,music:`cinder`,decor:[{kind:`block`,rect:{x:-3,y:0,w:20,h:2.6},z:-13},{kind:`wall`,rect:{x:0,y:0,w:14,h:8},z:-4.2},{kind:`pillar`,rect:{x:2.8,y:0,w:1,h:8},z:-3.4},{kind:`pillar`,rect:{x:10.2,y:0,w:1,h:8},z:-3.4},{kind:`arch`,rect:{x:3.9,y:0,w:6.2,h:5.6},z:-3.6,intensity:1},{kind:`chain`,rect:{x:4.6,y:4.6,w:.3,h:3.4},z:-2.4},{kind:`pipe`,rect:{x:0,y:5.2,w:3,h:.3},z:-2.4,intensity:1},{kind:`boiler`,rect:{x:1.3,y:0,w:2.2,h:1.3},z:-2.2},{kind:`furnace`,rect:{x:12.9,y:.6,w:1,h:1.8},z:-2.2,intensity:.4},{kind:`rack`,rect:{x:10,y:.9,w:2.4,h:2.6},z:-1.5},{kind:`embers`,rect:{x:2,y:0,w:11,h:6},z:-1.8,intensity:.6},{kind:`lamp`,rect:{x:14,y:0,w:-3,h:4.2},z:-.9},{kind:`crate`,rect:{x:6.2,y:0,w:1.8,h:.9},z:0}],waypoints:[{x:1.6,y:0},{x:5,y:0},{x:7.1,y:.9}]},Nt={id:`reserve`,name:ut.reserve,bounds:{x:0,y:0,w:30,h:14},solids:[{x:-2,y:-2,w:34,h:2},{x:-2,y:0,w:2,h:16},{x:30,y:0,w:2,h:16},{x:-2,y:14,w:34,h:2},{x:10.4,y:.9,w:1,h:.28},{x:11.5,y:1.7,w:1,h:.28},{x:12.6,y:2.5,w:1,h:.28},{x:13.7,y:3.3,w:1,h:.28},{x:14.8,y:4.1,w:1,h:.28},{x:15.8,y:4.1,w:7.8,h:.6},{x:23.7,y:3.9,w:.9,h:.28},{x:24.6,y:3.1,w:.9,h:.28},{x:25.5,y:2.3,w:.9,h:.28},{x:26.4,y:1.5,w:.9,h:.28}],doors:[{rect:{x:-.6,y:0,w:1.2,h:3},to:`belfry`,entry:{x:33.4,y:0},entryFacing:-1},{rect:{x:29.4,y:0,w:1.2,h:3},to:`lenshall`,entry:{x:2,y:0},entryFacing:1}],enemies:[],pickups:[],gates:[],breakables:[],ambience:wt,music:`reserve`,decor:[{kind:`block`,rect:{x:-3,y:0,w:36,h:3.2},z:-13},{kind:`block`,rect:{x:-3,y:0,w:4,h:16},z:-13},{kind:`block`,rect:{x:28.4,y:0,w:6,h:16},z:-13},{kind:`glow`,rect:{x:26.4,y:.4,w:5.2,h:5.2},z:-12,color:vt,intensity:.3},{kind:`wall`,rect:{x:0,y:0,w:30,h:14},z:-4.2,intensity:1},{kind:`pillar`,rect:{x:4,y:0,w:1,h:14},z:-3.4},{kind:`pillar`,rect:{x:13.4,y:0,w:1,h:14},z:-3.4},{kind:`pillar`,rect:{x:23.8,y:0,w:1,h:14},z:-3.4},{kind:`arch`,rect:{x:5,y:0,w:8.4,h:7.2},z:-3.6,intensity:1},{kind:`arch`,rect:{x:14.4,y:0,w:9.4,h:7.2},z:-3.6,intensity:1},{kind:`pipe`,rect:{x:0,y:8.6,w:23.4,h:.3},z:-2.6,intensity:1},{kind:`pipe`,rect:{x:16.6,y:7.2,w:.3,h:1.5},z:-2.6},{kind:`pipe`,rect:{x:19.5,y:7.2,w:.3,h:1.5},z:-2.6},{kind:`pipe`,rect:{x:22.5,y:7.2,w:.3,h:1.5},z:-2.6},{kind:`pipe`,rect:{x:0,y:3.4,w:2.4,h:.3},z:-2.4,intensity:1},{kind:`pipe`,rect:{x:2.3,y:2.7,w:.3,h:.8},z:-2.4},{kind:`pipe`,rect:{x:6.3,y:2.7,w:.3,h:.8},z:-2.4},{kind:`pipe`,rect:{x:2.3,y:3.4,w:4.3,h:.3},z:-2.4},{kind:`rack`,rect:{x:2,y:0,w:2.6,h:2.7},z:-1.6},{kind:`rack`,rect:{x:5.6,y:0,w:2.6,h:2.7},z:-1.6},{kind:`jar`,rect:{x:2.5,y:.3,w:.5,h:.7},z:-1.4,color:gt,intensity:.7},{kind:`jar`,rect:{x:6.1,y:.3,w:.5,h:.7},z:-1.4,color:gt,intensity:.7},{kind:`lens`,rect:{x:8,y:0,w:2.2,h:3},z:-1.5,color:vt,intensity:.8},{kind:`conduit`,rect:{x:2.4,y:2.9,w:5.9,h:.22},z:-1.45,color:gt,intensity:.75},{kind:`conduit`,rect:{x:2.6,y:1.05,w:.2,h:1.85},z:-1.45,color:gt,intensity:.65},{kind:`conduit`,rect:{x:6.2,y:1.05,w:.2,h:1.85},z:-1.45,color:gt,intensity:.65},{kind:`gallery`,rect:{x:15.8,y:0,w:7.8,h:4.7},z:0},{kind:`stair`,rect:{x:10.4,y:0,w:5.4,h:4.7},z:0},{kind:`stair`,rect:{x:23.6,y:0,w:3.7,h:4.7},z:0},{kind:`rack`,rect:{x:16.1,y:4.7,w:2.4,h:2.5},z:-1.6},{kind:`rack`,rect:{x:19,y:4.7,w:2.4,h:2.5},z:-1.6},{kind:`jar`,rect:{x:16.5,y:5,w:.5,h:.7},z:-1.4,color:gt,intensity:1},{kind:`jar`,rect:{x:17.6,y:5,w:.5,h:.7},z:-1.4,color:gt,intensity:.9},{kind:`jar`,rect:{x:16.5,y:6.1,w:.5,h:.7},z:-1.4,color:gt,intensity:.8},{kind:`jar`,rect:{x:19.4,y:5,w:.5,h:.7},z:-1.4,color:gt,intensity:1},{kind:`jar`,rect:{x:20.5,y:5,w:.5,h:.7},z:-1.4,color:gt,intensity:.9},{kind:`jar`,rect:{x:19.4,y:6.1,w:.5,h:.7},z:-1.4,color:gt,intensity:.8},{kind:`lens`,rect:{x:21.9,y:4.7,w:1.6,h:2.4},z:-1.5,color:vt,intensity:.8},{kind:`conduit`,rect:{x:16.3,y:7.3,w:5.9,h:.22},z:-1.45,color:gt,intensity:.8},{kind:`conduit`,rect:{x:15.9,y:3.66,w:7.6,h:.22},z:-1.45,color:gt,intensity:.55},{kind:`rack`,rect:{x:27.4,y:0,w:2.2,h:2.5},z:-1.6},{kind:`jar`,rect:{x:27.8,y:.3,w:.5,h:.7},z:-1.4,color:gt,intensity:.8},{kind:`jar`,rect:{x:28.9,y:.3,w:.5,h:.7},z:-1.4,color:gt,intensity:.7},{kind:`embers`,rect:{x:2,y:0,w:26,h:9},z:-1.8,intensity:.2},{kind:`lamp`,rect:{x:5,y:0,w:3,h:4.1},z:-.9}],waypoints:[{x:2.4,y:0},{x:6,y:0},{x:9.4,y:0},{x:10.9,y:1.18},{x:12,y:1.98},{x:13.1,y:2.78},{x:14.2,y:3.58},{x:15.3,y:4.38},{x:18.5,y:4.7},{x:22.6,y:4.7},{x:24.1,y:4.18},{x:25,y:3.38},{x:25.9,y:2.58},{x:26.8,y:1.78},{x:29,y:0}]},Pt={id:`sunwell`,name:ut.sunwell,bounds:{x:0,y:0,w:12,h:8},solids:[{x:-2,y:-2,w:16,h:2},{x:-2,y:0,w:2,h:10},{x:12,y:0,w:2,h:10},{x:-2,y:8,w:16,h:2},{x:6.6,y:.4,w:2.2,h:.16},{x:2.4,y:0,w:1.4,h:.9}],doors:[{rect:{x:11.4,y:0,w:1.2,h:2.8},to:`landing`,entry:{x:2.4,y:0},entryFacing:1}],enemies:[],pickups:[{id:`flask-2`,kind:`emberFlask`,x:3,y:1}],gates:[],breakables:[],ambience:Et,music:`dawn`,decor:[{kind:`block`,rect:{x:-3,y:0,w:18,h:2.6},z:-13},{kind:`wall`,rect:{x:0,y:0,w:12,h:8},z:-4.2},{kind:`block`,rect:{x:0,y:5.2,w:1.4,h:2.8},z:-3.9},{kind:`block`,rect:{x:4.3,y:5.2,w:1.7,h:2.8},z:-3.9},{kind:`pillar`,rect:{x:.5,y:0,w:.9,h:8},z:-3.4},{kind:`pillar`,rect:{x:4.5,y:0,w:.9,h:8},z:-3.4},{kind:`arch`,rect:{x:6,y:0,w:3.6,h:5.4},z:-3.6},{kind:`glow`,rect:{x:1.3,y:4.9,w:3.2,h:3.2},z:-3,color:yt,intensity:.32},{kind:`sunlight`,rect:{x:1.5,y:0,w:2.8,h:8},z:-2.4,color:yt,intensity:1},{kind:`rubble`,rect:{x:.9,y:0,w:3.6,h:.8},z:-1.6},{kind:`embers`,rect:{x:1.5,y:0,w:2.8,h:7.4},z:-1.2,intensity:.8},{kind:`wall`,rect:{x:2.4,y:0,w:1.4,h:.9},z:0},{kind:`bench`,rect:{x:6.6,y:0,w:2.2,h:.56},z:0}],waypoints:[{x:9.6,y:0},{x:7.7,y:.56},{x:5.4,y:0},{x:3,y:.9}]},Ft=[Ot,kt,At,jt,Mt,Nt,{id:`lenshall`,name:ut.lenshall,bounds:{x:0,y:0,w:28,h:14},solids:[{x:-2,y:-2,w:32,h:2},{x:-2,y:0,w:2,h:16},{x:28,y:0,w:2,h:16},{x:-2,y:14,w:32,h:2},{x:6.2,y:.12,w:1,h:.28},{x:7.2,y:.52,w:1,h:.28},{x:8.2,y:.92,w:1,h:.28},{x:9.2,y:0,w:5.8,h:1.2},{x:15,y:1.68,w:1,h:.28},{x:16,y:2.44,w:1,h:.28},{x:17,y:3.2,w:1,h:.28},{x:18,y:3.96,w:1,h:.28},{x:19,y:4.72,w:1,h:.28},{x:20,y:4.4,w:8,h:.6},{x:25.6,y:5,w:1.8,h:.9}],doors:[{rect:{x:-.6,y:0,w:1.2,h:3},to:`reserve`,entry:{x:28.4,y:0},entryFacing:-1}],enemies:[{id:5,kind:`sentry`,x:13.4,y:1.2,patrolMinX:13.4,patrolMaxX:13.4,facing:-1},{id:6,kind:`sentry`,x:24.4,y:5,patrolMinX:24.4,patrolMaxX:24.4,facing:-1}],pickups:[{id:`dawn-core`,kind:`dawnCore`,x:26.5,y:6.3}],gates:[],breakables:[],ambience:Tt,music:`reserve`,decor:[{kind:`block`,rect:{x:-3,y:0,w:34,h:3.2},z:-13},{kind:`block`,rect:{x:-3,y:0,w:4,h:16},z:-13},{kind:`block`,rect:{x:26.4,y:0,w:6,h:16},z:-13},{kind:`wall`,rect:{x:0,y:0,w:28,h:14},z:-4.2,intensity:1},{kind:`pillar`,rect:{x:3.2,y:0,w:1,h:14},z:-3.4},{kind:`pillar`,rect:{x:14.6,y:0,w:1,h:14},z:-3.4},{kind:`pillar`,rect:{x:26.6,y:0,w:1,h:14},z:-3.4},{kind:`arch`,rect:{x:4.2,y:0,w:10.4,h:7.4},z:-3.6,intensity:1},{kind:`arch`,rect:{x:15.6,y:0,w:11,h:8.4},z:-3.6,intensity:1},{kind:`glow`,rect:{x:24.2,y:4.4,w:5.6,h:5.6},z:-3,color:gt,intensity:.4},{kind:`pipe`,rect:{x:0,y:9.4,w:26.6,h:.3},z:-2.6,intensity:1},{kind:`pipe`,rect:{x:6,y:7.9,w:.3,h:1.5},z:-2.6},{kind:`pipe`,rect:{x:12,y:7.9,w:.3,h:1.5},z:-2.6},{kind:`pipe`,rect:{x:18,y:7.9,w:.3,h:1.5},z:-2.6},{kind:`pipe`,rect:{x:24,y:7.9,w:.3,h:1.5},z:-2.6},{kind:`pipe`,rect:{x:0,y:3.6,w:2.6,h:.3},z:-2.4,intensity:1},{kind:`rack`,rect:{x:.9,y:0,w:2.4,h:2.6},z:-1.6},{kind:`jar`,rect:{x:1.3,y:.3,w:.5,h:.7},z:-1.4,color:gt,intensity:1},{kind:`jar`,rect:{x:2.4,y:.3,w:.5,h:.7},z:-1.4,color:gt,intensity:.9},{kind:`jar`,rect:{x:1.3,y:1.4,w:.5,h:.7},z:-1.4,color:gt,intensity:.8},{kind:`rack`,rect:{x:9.5,y:1.2,w:2.2,h:2.5},z:-1.6},{kind:`jar`,rect:{x:9.9,y:1.5,w:.5,h:.7},z:-1.4,color:gt,intensity:1},{kind:`jar`,rect:{x:10.9,y:1.5,w:.5,h:.7},z:-1.4,color:gt,intensity:.85},{kind:`jar`,rect:{x:9.9,y:2.6,w:.5,h:.7},z:-1.4,color:gt,intensity:.7},{kind:`rack`,rect:{x:24.6,y:0,w:2.4,h:2.6},z:-1.6},{kind:`jar`,rect:{x:25,y:.3,w:.5,h:.7},z:-1.4,color:gt,intensity:.9},{kind:`jar`,rect:{x:26.1,y:.3,w:.5,h:.7},z:-1.4,color:gt,intensity:.8},{kind:`jar`,rect:{x:25,y:1.4,w:.5,h:.7},z:-1.4,color:gt,intensity:.7},{kind:`lens`,rect:{x:4.4,y:0,w:2,h:2.975},z:-1.5,color:vt,intensity:.9},{kind:`lens`,rect:{x:11.5,y:1.2,w:1,h:1.275},z:-1.5,color:vt,intensity:.8},{kind:`lens`,rect:{x:21.2,y:0,w:2.3,h:6.925},z:-1.5,color:vt,intensity:1},{kind:`lens`,rect:{x:20.1,y:5,w:1,h:1.275},z:-1.5,color:vt,intensity:.8},{kind:`conduit`,rect:{x:1.3,y:2.78,w:3.5,h:.22},z:-1.45,color:gt,intensity:.8},{kind:`conduit`,rect:{x:1.5,y:2.1,w:.2,h:.72},z:-1.45,color:gt,intensity:.65},{kind:`conduit`,rect:{x:9.9,y:3.84,w:2.7,h:.22},z:-1.45,color:gt,intensity:.75},{kind:`conduit`,rect:{x:11.9,y:2.45,w:.2,h:1.42},z:-1.45,color:gt,intensity:.6},{kind:`conduit`,rect:{x:20.2,y:4.02,w:7.2,h:.22},z:-1.45,color:gt,intensity:.55},{kind:`embers`,rect:{x:2,y:0,w:24,h:10},z:-1.8,intensity:.15},{kind:`lamp`,rect:{x:4.2,y:0,w:3,h:4.1},z:-.9},{kind:`stair`,rect:{x:6.2,y:0,w:3,h:1.2},z:0},{kind:`wall`,rect:{x:9.2,y:0,w:5.8,h:1.2},z:0},{kind:`stair`,rect:{x:15,y:0,w:5,h:5},z:0},{kind:`gallery`,rect:{x:20,y:0,w:8,h:5},z:0},{kind:`crate`,rect:{x:25.6,y:5,w:1.8,h:.9},z:0}],waypoints:[{x:2,y:0},{x:5,y:0},{x:6.7,y:.4},{x:7.7,y:.8},{x:8.7,y:1.2},{x:11,y:1.2},{x:14.4,y:1.2},{x:15.5,y:1.96},{x:16.5,y:2.72},{x:17.5,y:3.48},{x:18.5,y:4.24},{x:19.5,y:5},{x:22.5,y:5},{x:25,y:5},{x:26.5,y:5.9}]},Pt],It={room:`gallery`,pos:{x:5.5,y:0}};function Lt(e){return Ft.find(t=>t.id===e)}var Rt=[`KeyA`,`ArrowLeft`],zt=[`KeyD`,`ArrowRight`],Bt=[`KeyW`,`ArrowUp`],Vt=[`KeyS`,`ArrowDown`],Ht=[`KeyZ`,`Space`],Ut=[`KeyX`,`KeyJ`],Wt=[`KeyC`,`KeyK`,`ShiftLeft`,`ShiftRight`],Gt=[`Enter`,`NumpadEnter`,`Space`,`KeyZ`],Kt=[`Escape`],qt=new Set([`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`,`Space`,`KeyW`,`KeyA`,`KeyS`,`KeyD`,`KeyZ`,`KeyX`,`KeyC`,`KeyJ`,`KeyK`]);function Jt(){return{moveX:0,moveY:0,jump:!1,jumpHeld:!1,attack:!1,dash:!1,pause:!1,confirm:!1}}function Yt(){let e=new Set,t=Jt(),n=!1,r=!1,i=!1,a=!1,o=!1;function s(t){for(let n of t)if(e.has(n))return!0;return!1}function c(e,t){return t.indexOf(e)>=0}window.addEventListener(`keydown`,t=>{qt.has(t.code)&&t.preventDefault(),!t.repeat&&(e.add(t.code),c(t.code,Ht)&&(n=!0),c(t.code,Ut)&&(r=!0),c(t.code,Wt)&&(i=!0),c(t.code,Kt)&&(a=!0),c(t.code,Gt)&&(o=!0))}),window.addEventListener(`keyup`,t=>{e.delete(t.code)}),window.addEventListener(`blur`,()=>{e.clear(),n=!1,r=!1,i=!1,a=!1,o=!1});function l(e,t){return+!!s(t)-!!s(e)}return{sample(){return t.moveX=l(Rt,zt),t.moveY=l(Vt,Bt),t.jumpHeld=s(Ht),t.jump=n,t.attack=r,t.dash=i,t.pause=a,t.confirm=o,n=!1,r=!1,i=!1,a=!1,o=!1,t}}}var Xt=1500,Zt=450,Qt=.9,$t=1.6,en=.5,tn=.6,nn=1.8,rn=.2,an=3,on=.8,sn=3,cn=2,ln=2.5,un=.4,dn={landing:`gallery`,gallery:`belfry`,cache:`gallery`,belfry:`reserve`,reserve:`lenshall`},fn=[`sweepTelegraph`,`sweepActive`,`stompTelegraph`,`stompRise`,`stompSlam`];function pn(e,t){let n=e.bossArena!==void 0&&!t.progress.bossDefeated?e.id:dn[e.id];for(let t of e.doors)if(t.to===n)return{x:t.rect.x+t.rect.w/2,y:t.rect.y};return e.waypoints[e.waypoints.length-1]??{x:e.bounds.x+e.bounds.w/2,y:e.bounds.y}}function mn(e,t,n){for(let r of e.solids){let e=r.y+r.h;if(!(t<r.x||t>r.x+r.w)&&Math.abs(e-n)<=.25)return!0}return!1}function hn(e,t,n){for(let r of e.solids){let e=r.y+r.h;if(Math.abs(e-t.y)>.25||t.x<r.x-.2||t.x>r.x+r.w+.2)continue;let i=r.x+r.w;return n>i?{edge:i,away:1}:n<r.x||n-r.x<=i-n?{edge:r.x,away:-1}:{edge:i,away:1}}return null}function gn(){let e=l.player;return e.jumpVelocity*e.jumpVelocity/(2*e.gravity)}function _n(e){let t=l.player,n=t.jumpVelocity*t.jumpVelocity-2*t.gravity*e,r=n<=0?t.jumpVelocity/t.gravity:(t.jumpVelocity-Math.sqrt(n))/t.gravity;return t.walkSpeed*r+t.width/2+.25}function vn(e,t,n){let r=e.player;for(let i of t.breakables){if(e.progress.broken.includes(i.id))continue;let t=i.rect.x+i.rect.w/2-r.pos.x;if(!(t*r.facing<-.2)&&!(Math.abs(t)>n+i.rect.w)&&!(r.pos.y>i.rect.y+i.rect.h))return!0}return!1}function yn(e,t){let n=e.player;for(let r of e.enemies){if(!r.alive)continue;let e=r.pos.x-n.pos.x;if(!(e*n.facing<-.2)&&!(Math.abs(e)>t+.4)&&!(Math.abs(r.pos.y-n.pos.y)>1.6))return!0}let r=e.boss;if(r!==null&&r.alive&&r.state!==`dormant`){let e=r.pos.x-n.pos.x;if(e*n.facing>=-.2&&Math.abs(e)<=t+l.boss.width/2)return!0}return!1}function bn(e){let t=Jt(),n=0,r=!1,i=``,a=0,o=0,s=0,c=!1,u=-1,d=0,f=0;function p(){return t.moveX=0,t.moveY=0,t.jump=!1,t.jumpHeld=!1,t.attack=!1,t.dash=!1,t.pause=!1,t.confirm=!1,t}return{sample(){let m=e.state;if(p(),m.phase!==`dead`&&(r=!1),m.phase===`title`)return t.confirm=!0,t;if(m.phase===`dead`)return r||(r=!0,n=performance.now()),performance.now()-n>=Xt&&(t.confirm=!0),t;if(m.phase!==`playing`)return t;let h=e.currentRoom(),g=m.player;h.id!==i&&(i=h.id,a=0,o=0,s=0,c=!1,u=-1,d=g.pos.x,f=m.time);let _=h.waypoints;for(;a<_.length;){let e=_[a];if(e===void 0)break;let t=g.pos.x-e.x;if(Math.abs(g.pos.y-e.y)<=$t&&Math.abs(t)<=Qt){a++;continue}let n=_[a+1];if(n===void 0||!g.grounded||g.pos.y<e.y-.5)break;let r=n.x-e.x;if(r>0&&t>Qt)a++;else if(r<0&&t<-.9)a++;else break}let v=gn()*.9;for(;a>0&&g.grounded;){let e=_[a];if(e===void 0||e.y-g.pos.y<=v)break;a--}let y=a<_.length?_[a]:pn(h,m),b=y.x-g.pos.x,x=y.y-g.pos.y,S=Math.abs(b),C=b>=0?1:-1;S>.25&&(t.moveX=C);let w=m.time>=g.dashReadyAt,T=!1;for(let e of m.enemies){if(!e.alive||e.state!==`telegraph`)continue;let n=e.pos.x-g.pos.x;if(!(Math.abs(n)>sn)&&!(Math.abs(e.pos.y-g.pos.y)>2)){w&&(t.moveX=n>=0?-1:1,t.dash=!0),T=!0;break}}let E=m.boss;if(!T&&E!==null&&E.alive&&fn.indexOf(E.state)>=0){let e=E.pos.x-g.pos.x;Math.abs(e)<l.boss.sweepReach+2&&(w&&(t.moveX=e>=0?-1:1,t.dash=!0),T=!0)}if(!T){for(let e of m.hazards)if(e.alive&&!(Math.abs(e.pos.x-g.pos.x)>cn)&&!(Math.abs(e.pos.y-g.pos.y)>2)){g.grounded&&(t.jump=!0,o=m.time+Zt/1e3),T=!0;break}}if(!T){let e=g.longwick?l.attack.longwickReach:l.attack.reach;(yn(m,e)||vn(m,h,e))&&(t.attack=!0)}let D=mn(h,g.pos.x+C*.8,g.pos.y);if(!T&&x>en&&g.grounded){let e=hn(h,y,g.pos.x),n=_n(x);if(e===null)c=!1,S<=n+tn&&(t.jump=!0,o=m.time+Zt/1e3);else{let r=(g.pos.x-e.edge)*e.away,i=-e.away;r<n?c=!0:r>n+nn&&(c=!1),c?t.moveX=e.away:r<=n+tn&&g.vel.x*i>=l.player.walkSpeed*.85?(t.jump=!0,o=m.time+Zt/1e3):t.moveX=i}}else c=!1;return!T&&!c&&!t.jump&&g.grounded&&!D&&S>1&&(t.jump=!0,o=m.time+Zt/1e3,S>an&&Math.abs(x)<=on&&(s=C)),!T&&!t.dash&&s!==0&&!g.grounded&&w&&g.vel.y<=0&&(t.moveX=s,t.dash=!0,s=0),!T&&!t.dash&&!t.jump&&g.grounded&&D&&w&&S>an&&Math.abs(x)<=on&&(t.moveX=C,t.dash=!0),g.grounded&&!t.jump&&(s=0),g.grounded&&t.moveX!==0&&Math.abs(g.vel.x)<.5?u<0&&(u=m.time):u=-1,!T&&!t.jump&&u>=0&&m.time-u>rn&&(t.jump=!0,o=m.time+Zt/1e3,u=-1),Math.abs(g.pos.x-d)>un?(d=g.pos.x,f=m.time):m.time-f>ln&&(f=m.time,g.grounded&&!c&&(t.jump=!0,o=m.time+Zt/1e3)),m.time<o&&(t.jumpHeld=!0),t.jump&&(t.jumpHeld=!0),t}}}var xn=1e3,Sn=1001,Cn=1002,wn=1003,Tn=1004,En=1005,Dn=1006,On=1007,kn=1008,An=1009,jn=1010,Mn=1011,Nn=1012,Pn=1013,Fn=1014,In=1015,Ln=1016,Rn=1017,zn=1018,Bn=1020,Vn=35902,Hn=35899,Un=1021,Wn=1022,Gn=1023,Kn=1026,qn=1027,Jn=1028,Yn=1029,Xn=1030,Zn=1031,Qn=1033,$n=33776,er=33777,tr=33778,nr=33779,rr=35840,ir=35841,ar=35842,or=35843,sr=36196,cr=37492,lr=37496,ur=37488,dr=37489,fr=37490,pr=37491,mr=37808,hr=37809,gr=37810,_r=37811,vr=37812,yr=37813,br=37814,xr=37815,Sr=37816,Cr=37817,wr=37818,Tr=37819,Er=37820,Dr=37821,Or=36492,kr=36494,Ar=36495,jr=36283,Mr=36284,Nr=36285,Pr=36286,Fr=2300,Ir=2301,Lr=2302,Rr=2303,zr=2400,Br=2401,Vr=2402,Hr=3200,Ur=`srgb`,Wr=`srgb-linear`,Gr=`linear`,Kr=`srgb`,qr=7680,Jr=35044,Yr=35048,Xr=2e3;function Zr(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Qr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function $r(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function ei(){let e=$r(`canvas`);return e.style.display=`block`,e}var ti={};function ni(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function ri(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function ii(...e){e=ri(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function ai(...e){e=ri(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function oi(...e){let t=e.join(` `);t in ti||(ti[t]=!0,ii(...e))}function si(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var ci={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},li=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},ui=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),di=1234567,fi=Math.PI/180,pi=180/Math.PI;function mi(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(ui[e&255]+ui[e>>8&255]+ui[e>>16&255]+ui[e>>24&255]+`-`+ui[t&255]+ui[t>>8&255]+`-`+ui[t>>16&15|64]+ui[t>>24&255]+`-`+ui[n&63|128]+ui[n>>8&255]+`-`+ui[n>>16&255]+ui[n>>24&255]+ui[r&255]+ui[r>>8&255]+ui[r>>16&255]+ui[r>>24&255]).toLowerCase()}function hi(e,t,n){return Math.max(t,Math.min(n,e))}function gi(e,t){return(e%t+t)%t}function _i(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function vi(e,t,n){return e===t?0:(n-e)/(t-e)}function yi(e,t,n){return(1-n)*e+n*t}function bi(e,t,n,r){return yi(e,t,1-Math.exp(-n*r))}function xi(e,t=1){return t-Math.abs(gi(e,t*2)-t)}function Si(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Ci(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function wi(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Ti(e,t){return e+Math.random()*(t-e)}function Ei(e){return e*(.5-Math.random())}function Di(e){e!==void 0&&(di=e);let t=di+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Oi(e){return e*fi}function ki(e){return e*pi}function Ai(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function ji(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Mi(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Ni(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:ii(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Pi(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Fi(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Ii={DEG2RAD:fi,RAD2DEG:pi,generateUUID:mi,clamp:hi,euclideanModulo:gi,mapLinear:_i,inverseLerp:vi,lerp:yi,damp:bi,pingpong:xi,smoothstep:Si,smootherstep:Ci,randInt:wi,randFloat:Ti,randFloatSpread:Ei,seededRandom:Di,degToRad:Oi,radToDeg:ki,isPowerOfTwo:Ai,ceilPowerOfTwo:ji,floorPowerOfTwo:Mi,setQuaternionFromProperEuler:Ni,normalize:Fi,denormalize:Pi},J=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=hi(this.x,e.x,t.x),this.y=hi(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=hi(this.x,e,t),this.y=hi(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(hi(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(hi(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Li=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:ii(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(hi(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Y=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zi.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zi.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=hi(this.x,e.x,t.x),this.y=hi(this.y,e.y,t.y),this.z=hi(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=hi(this.x,e,t),this.y=hi(this.y,e,t),this.z=hi(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(hi(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ri.copy(this).projectOnVector(e),this.sub(Ri)}reflect(e){return this.sub(Ri.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(hi(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ri=new Y,zi=new Li,Bi=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return oi(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Vi.makeScale(e,t)),this}rotate(e){return oi(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Vi.makeRotation(-e)),this}translate(e,t){return oi(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Vi.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Vi=new Bi,Hi=new Bi().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ui=new Bi().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wi(){let e={enabled:!0,workingColorSpace:Wr,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Ki(e.r),e.g=Ki(e.g),e.b=Ki(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=qi(e.r),e.g=qi(e.g),e.b=qi(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Gr:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return oi(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return oi(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Wr]:{primaries:t,whitePoint:r,transfer:Gr,toXYZ:Hi,fromXYZ:Ui,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ur},outputColorSpaceConfig:{drawingBufferColorSpace:Ur}},[Ur]:{primaries:t,whitePoint:r,transfer:Kr,toXYZ:Hi,fromXYZ:Ui,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ur}}}),e}var Gi=Wi();function Ki(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function qi(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Ji,Yi=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ji===void 0&&(Ji=$r(`canvas`)),Ji.width=e.width,Ji.height=e.height;let t=Ji.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ji}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=$r(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Ki(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Ki(t[e]/255)*255):t[e]=Ki(t[e]);return{data:t,width:e.width,height:e.height}}return ii(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Xi=0,Zi=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Xi++}),this.uuid=mi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Qi(r[t].image)):e.push(Qi(r[t]))}else e=Qi(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Qi(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Yi.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(ii(`Texture: Unable to serialize Texture.`),{})}var $i=0,ea=new Y,ta=class e extends li{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Sn,i=Sn,a=Dn,o=kn,s=Gn,c=An,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$i++}),this.uuid=mi(),this.name=``,this.source=new Zi(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new J(0,0),this.repeat=new J(1,1),this.center=new J(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bi,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ea).x}get height(){return this.source.getSize(ea).y}get depth(){return this.source.getSize(ea).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){ii(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){ii(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xn:e.x-=Math.floor(e.x);break;case Sn:e.x=e.x<0?0:1;break;case Cn:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case xn:e.y-=Math.floor(e.y);break;case Sn:e.y=e.y<0?0:1;break;case Cn:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ta.DEFAULT_IMAGE=null,ta.DEFAULT_MAPPING=300,ta.DEFAULT_ANISOTROPY=1;var na=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=hi(this.x,e.x,t.x),this.y=hi(this.y,e.y,t.y),this.z=hi(this.z,e.z,t.z),this.w=hi(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=hi(this.x,e,t),this.y=hi(this.y,e,t),this.z=hi(this.z,e,t),this.w=hi(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(hi(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ra=class extends li{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new na(0,0,e,t),this.scissorTest=!1,this.viewport=new na(0,0,e,t),this.textures=[];let r=new ta({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Dn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Zi(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},ia=class extends ra{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},aa=class extends ta{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},oa=class extends ta{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},sa=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/ca.setFromMatrixColumn(e,0).length(),i=1/ca.setFromMatrixColumn(e,1).length(),a=1/ca.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ua,e,da)}lookAt(e,t,n){let r=this.elements;return ma.subVectors(e,t),ma.lengthSq()===0&&(ma.z=1),ma.normalize(),fa.crossVectors(n,ma),fa.lengthSq()===0&&(Math.abs(n.z)===1?ma.x+=1e-4:ma.z+=1e-4,ma.normalize(),fa.crossVectors(n,ma)),fa.normalize(),pa.crossVectors(ma,fa),r[0]=fa.x,r[4]=pa.x,r[8]=ma.x,r[1]=fa.y,r[5]=pa.y,r[9]=ma.y,r[2]=fa.z,r[6]=pa.z,r[10]=ma.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],M=r[14],N=r[3],P=r[7],F=r[11],I=r[15];return i[0]=a*x+o*T+s*k+c*N,i[4]=a*S+o*E+s*A+c*P,i[8]=a*C+o*D+s*j+c*F,i[12]=a*w+o*O+s*M+c*I,i[1]=l*x+u*T+d*k+f*N,i[5]=l*S+u*E+d*A+f*P,i[9]=l*C+u*D+d*j+f*F,i[13]=l*w+u*O+d*M+f*I,i[2]=p*x+m*T+h*k+g*N,i[6]=p*S+m*E+h*A+g*P,i[10]=p*C+m*D+h*j+g*F,i[14]=p*w+m*O+h*M+g*I,i[3]=_*x+v*T+y*k+b*N,i[7]=_*S+v*E+y*A+b*P,i[11]=_*C+v*D+y*j+b*F,i[15]=_*w+v*O+y*M+b*I,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=ca.set(r[0],r[1],r[2]).length(),o=ca.set(r[4],r[5],r[6]).length(),s=ca.set(r[8],r[9],r[10]).length();i<0&&(a=-a),la.copy(this);let c=1/a,l=1/o,u=1/s;return la.elements[0]*=c,la.elements[1]*=c,la.elements[2]*=c,la.elements[4]*=l,la.elements[5]*=l,la.elements[6]*=l,la.elements[8]*=u,la.elements[9]*=u,la.elements[10]*=u,t.setFromRotationMatrix(la),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Xr,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Xr,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},ca=new Y,la=new sa,ua=new Y(0,0,0),da=new Y(1,1,1),fa=new Y,pa=new Y,ma=new Y,ha=new sa,ga=new Li,_a=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(hi(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-hi(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(hi(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-hi(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(hi(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-hi(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:ii(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ha.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ha,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ga.setFromEuler(this),this.setFromQuaternion(ga,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_a.DEFAULT_ORDER=`XYZ`;var va=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},ya=0,ba=new Y,xa=new Li,Sa=new sa,Ca=new Y,wa=new Y,Ta=new Y,Ea=new Li,Da=new Y(1,0,0),Oa=new Y(0,1,0),ka=new Y(0,0,1),Aa={type:`added`},ja={type:`removed`},Ma={type:`childadded`,child:null},Na={type:`childremoved`,child:null},X=class e extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ya++}),this.uuid=mi(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new Y,n=new _a,r=new Li,i=new Y(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new sa},normalMatrix:{value:new Bi}}),this.matrix=new sa,this.matrixWorld=new sa,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new va,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xa.setFromAxisAngle(e,t),this.quaternion.multiply(xa),this}rotateOnWorldAxis(e,t){return xa.setFromAxisAngle(e,t),this.quaternion.premultiply(xa),this}rotateX(e){return this.rotateOnAxis(Da,e)}rotateY(e){return this.rotateOnAxis(Oa,e)}rotateZ(e){return this.rotateOnAxis(ka,e)}translateOnAxis(e,t){return ba.copy(e).applyQuaternion(this.quaternion),this.position.add(ba.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Da,e)}translateY(e){return this.translateOnAxis(Oa,e)}translateZ(e){return this.translateOnAxis(ka,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Sa.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ca.copy(e):Ca.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),wa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Sa.lookAt(wa,Ca,this.up):Sa.lookAt(Ca,wa,this.up),this.quaternion.setFromRotationMatrix(Sa),r&&(Sa.extractRotation(r.matrixWorld),xa.setFromRotationMatrix(Sa),this.quaternion.premultiply(xa.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(ai(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Aa),Ma.child=e,this.dispatchEvent(Ma),Ma.child=null):ai(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ja),Na.child=e,this.dispatchEvent(Na),Na.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Sa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Sa.multiply(e.parent.matrixWorld)),e.applyMatrix4(Sa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Aa),Ma.child=e,this.dispatchEvent(Ma),Ma.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wa,e,Ta),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wa,Ea,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};X.DEFAULT_UP=new Y(0,1,0),X.DEFAULT_MATRIX_AUTO_UPDATE=!0,X.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Pa=class extends X{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Fa={type:`move`},Ia=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Fa)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Pa;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},La={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ra={h:0,s:0,l:0},za={h:0,s:0,l:0};function Ba(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Z=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ur){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Gi.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Gi.workingColorSpace){return this.r=e,this.g=t,this.b=n,Gi.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Gi.workingColorSpace){if(e=gi(e,1),t=hi(t,0,1),n=hi(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ba(i,r,e+1/3),this.g=Ba(i,r,e),this.b=Ba(i,r,e-1/3)}return Gi.colorSpaceToWorking(this,r),this}setStyle(e,t=Ur){function n(t){t!==void 0&&parseFloat(t)<1&&ii(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:ii(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);ii(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ur){let n=La[e.toLowerCase()];return n===void 0?ii(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ki(e.r),this.g=Ki(e.g),this.b=Ki(e.b),this}copyLinearToSRGB(e){return this.r=qi(e.r),this.g=qi(e.g),this.b=qi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ur){return Gi.workingToColorSpace(Va.copy(this),e),Math.round(hi(Va.r*255,0,255))*65536+Math.round(hi(Va.g*255,0,255))*256+Math.round(hi(Va.b*255,0,255))}getHexString(e=Ur){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Gi.workingColorSpace){Gi.workingToColorSpace(Va.copy(this),t);let n=Va.r,r=Va.g,i=Va.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Gi.workingColorSpace){return Gi.workingToColorSpace(Va.copy(this),t),e.r=Va.r,e.g=Va.g,e.b=Va.b,e}getStyle(e=Ur){Gi.workingToColorSpace(Va.copy(this),e);let t=Va.r,n=Va.g,r=Va.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Ra),this.setHSL(Ra.h+e,Ra.s+t,Ra.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ra),e.getHSL(za);let n=yi(Ra.h,za.h,t),r=yi(Ra.s,za.s,t),i=yi(Ra.l,za.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Va=new Z;Z.NAMES=La;var Ha=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new Z(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ua=class extends X{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _a,this.environmentIntensity=1,this.environmentRotation=new _a,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Wa=new Y,Ga=new Y,Ka=new Y,qa=new Y,Ja=new Y,Ya=new Y,Xa=new Y,Za=new Y,Qa=new Y,$a=new Y,eo=new na,to=new na,no=new na,ro=class e{constructor(e=new Y,t=new Y,n=new Y){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Wa.subVectors(e,t),r.cross(Wa);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Wa.subVectors(r,t),Ga.subVectors(n,t),Ka.subVectors(e,t);let a=Wa.dot(Wa),o=Wa.dot(Ga),s=Wa.dot(Ka),c=Ga.dot(Ga),l=Ga.dot(Ka),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,qa)!==null&&qa.x>=0&&qa.y>=0&&qa.x+qa.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,qa)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,qa.x),s.addScaledVector(a,qa.y),s.addScaledVector(o,qa.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return eo.setScalar(0),to.setScalar(0),no.setScalar(0),eo.fromBufferAttribute(e,t),to.fromBufferAttribute(e,n),no.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(eo,i.x),a.addScaledVector(to,i.y),a.addScaledVector(no,i.z),a}static isFrontFacing(e,t,n,r){return Wa.subVectors(n,t),Ga.subVectors(e,t),Wa.cross(Ga).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wa.subVectors(this.c,this.b),Ga.subVectors(this.a,this.b),Wa.cross(Ga).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Ja.subVectors(r,n),Ya.subVectors(i,n),Za.subVectors(e,n);let s=Ja.dot(Za),c=Ya.dot(Za);if(s<=0&&c<=0)return t.copy(n);Qa.subVectors(e,r);let l=Ja.dot(Qa),u=Ya.dot(Qa);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Ja,a);$a.subVectors(e,i);let f=Ja.dot($a),p=Ya.dot($a);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ya,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Xa.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Xa,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Ja,a).addScaledVector(Ya,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},io=class{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(oo.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(oo.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=oo.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,oo):oo.fromBufferAttribute(r,t),oo.applyMatrix4(e.matrixWorld),this.expandByPoint(oo);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),so.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),so.copy(e.boundingBox)),so.applyMatrix4(e.matrixWorld),this.union(so)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,oo),oo.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ho),go.subVectors(this.max,ho),co.subVectors(e.a,ho),lo.subVectors(e.b,ho),uo.subVectors(e.c,ho),fo.subVectors(lo,co),po.subVectors(uo,lo),mo.subVectors(co,uo);let t=[0,-fo.z,fo.y,0,-po.z,po.y,0,-mo.z,mo.y,fo.z,0,-fo.x,po.z,0,-po.x,mo.z,0,-mo.x,-fo.y,fo.x,0,-po.y,po.x,0,-mo.y,mo.x,0];return!yo(t,co,lo,uo,go)||(t=[1,0,0,0,1,0,0,0,1],!yo(t,co,lo,uo,go))?!1:(_o.crossVectors(fo,po),t=[_o.x,_o.y,_o.z],yo(t,co,lo,uo,go))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oo).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oo).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ao[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ao[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ao[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ao[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ao[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ao[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ao[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ao[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ao),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ao=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],oo=new Y,so=new io,co=new Y,lo=new Y,uo=new Y,fo=new Y,po=new Y,mo=new Y,ho=new Y,go=new Y,_o=new Y,vo=new Y;function yo(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){vo.fromArray(e,a);let o=i.x*Math.abs(vo.x)+i.y*Math.abs(vo.y)+i.z*Math.abs(vo.z),s=t.dot(vo),c=n.dot(vo),l=r.dot(vo);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var bo=new Y,xo=new J,So=0,Co=class extends li{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:So++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Jr,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xo.fromBufferAttribute(this,t),xo.applyMatrix3(e),this.setXY(t,xo.x,xo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bo.fromBufferAttribute(this,t),bo.applyMatrix3(e),this.setXYZ(t,bo.x,bo.y,bo.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bo.fromBufferAttribute(this,t),bo.applyMatrix4(e),this.setXYZ(t,bo.x,bo.y,bo.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bo.fromBufferAttribute(this,t),bo.applyNormalMatrix(e),this.setXYZ(t,bo.x,bo.y,bo.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bo.fromBufferAttribute(this,t),bo.transformDirection(e),this.setXYZ(t,bo.x,bo.y,bo.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Fi(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Fi(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Fi(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Fi(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Fi(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Fi(t,this.array),n=Fi(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Fi(t,this.array),n=Fi(n,this.array),r=Fi(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Fi(t,this.array),n=Fi(n,this.array),r=Fi(r,this.array),i=Fi(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},wo=class extends Co{constructor(e,t,n){super(new Uint16Array(e),t,n)}},To=class extends Co{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Eo=class extends Co{constructor(e,t,n){super(new Float32Array(e),t,n)}},Do=new io,Oo=new Y,ko=new Y,Ao=class{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Do.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Oo.subVectors(e,this.center);let t=Oo.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Oo,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ko.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Oo.copy(e.center).add(ko)),this.expandByPoint(Oo.copy(e.center).sub(ko))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},jo=0,Mo=new sa,No=new X,Po=new Y,Fo=new io,Io=new io,Lo=new Y,Ro=class e extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jo++}),this.uuid=mi(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Zr(e)?To:wo)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Bi().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Mo.makeRotationFromQuaternion(e),this.applyMatrix4(Mo),this}rotateX(e){return Mo.makeRotationX(e),this.applyMatrix4(Mo),this}rotateY(e){return Mo.makeRotationY(e),this.applyMatrix4(Mo),this}rotateZ(e){return Mo.makeRotationZ(e),this.applyMatrix4(Mo),this}translate(e,t,n){return Mo.makeTranslation(e,t,n),this.applyMatrix4(Mo),this}scale(e,t,n){return Mo.makeScale(e,t,n),this.applyMatrix4(Mo),this}lookAt(e){return No.lookAt(e),No.updateMatrix(),this.applyMatrix4(No.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Po).negate(),this.translate(Po.x,Po.y,Po.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Eo(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&ii(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new io);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ai(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Fo.setFromBufferAttribute(n),this.morphTargetsRelative?(Lo.addVectors(this.boundingBox.min,Fo.min),this.boundingBox.expandByPoint(Lo),Lo.addVectors(this.boundingBox.max,Fo.max),this.boundingBox.expandByPoint(Lo)):(this.boundingBox.expandByPoint(Fo.min),this.boundingBox.expandByPoint(Fo.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ai(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ao);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ai(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new Y,1/0);return}if(e){let n=this.boundingSphere.center;if(Fo.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Io.setFromBufferAttribute(n),this.morphTargetsRelative?(Lo.addVectors(Fo.min,Io.min),Fo.expandByPoint(Lo),Lo.addVectors(Fo.max,Io.max),Fo.expandByPoint(Lo)):(Fo.expandByPoint(Io.min),Fo.expandByPoint(Io.max))}Fo.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Lo.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Lo));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Lo.fromBufferAttribute(a,t),o&&(Po.fromBufferAttribute(e,t),Lo.add(Po)),r=Math.max(r,n.distanceToSquared(Lo))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ai(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ai(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Co(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new Y,s[e]=new Y;let c=new Y,l=new Y,u=new Y,d=new J,f=new J,p=new J,m=new Y,h=new Y;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new Y,y=new Y,b=new Y,x=new Y;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Co(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new Y,i=new Y,a=new Y,o=new Y,s=new Y,c=new Y,l=new Y,u=new Y;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Lo.fromBufferAttribute(e,t),Lo.normalize(),e.setXYZ(t,Lo.x,Lo.y,Lo.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Co(a,r,i)}if(this.index===null)return ii(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},zo=new Y,Bo=new Y,Vo=new Bi,Ho=class{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=zo.subVectors(n,t).cross(Bo.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(zo),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Vo.getNormalMatrix(e),r=this.coplanarPoint(zo).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Uo=0,Wo=class extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Uo++}),this.uuid=mi(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Z(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qr,this.stencilZFail=qr,this.stencilZPass=qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){ii(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){ii(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Z().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Ho().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new J().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new J().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Go=new Y,Ko=new Y,qo=new Y,Jo=new Y,Yo=class{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Go)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Go.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Go.copy(this.origin).addScaledVector(this.direction,t),Go.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ko.copy(e).add(t).multiplyScalar(.5),qo.copy(t).sub(e).normalize(),Jo.copy(this.origin).sub(Ko);let i=e.distanceTo(t)*.5,a=-this.direction.dot(qo),o=Jo.dot(this.direction),s=-Jo.dot(qo),c=Jo.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Ko).addScaledVector(qo,d),f}intersectSphere(e,t){if(e.radius<0)return null;Go.subVectors(e.center,this.origin);let n=Go.dot(this.direction),r=Go.dot(Go)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Go)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,M,N;if(y>=b&&y>=x?(w=s,D=u,A=p,N=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,M=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,M=_)):b>=x?(w=c,D=d,A=m,N=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,M=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,M=v)):(w=l,D=f,A=h,N=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,M=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,M=g)),w===0)return null;let P=S/w,F=C/w,I=1/w,L=T-P*D,ee=E-F*D,R=O-P*A,te=k-F*A,z=j-P*N,B=M-F*N,V=z*te-B*R,ne=L*B-ee*z,H=R*ee-te*L;if(r){if(V<0||ne<0||H<0)return null}else if((V<0||ne<0||H<0)&&(V>0||ne>0||H>0))return null;let re=V+ne+H;if(re===0)return null;let ie=I*(V*D+ne*A+H*N);return(re>0?ie<0:ie>0)?null:this.at(ie/re,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Xo=class extends Wo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Z(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _a,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Zo=new sa,Qo=new Yo,$o=new Ao,es=new Y,ts=new Y,ns=new Y,rs=new Y,is=new Y,as=new Y,os=new Y,ss=new Y,Q=class extends X{constructor(e=new Ro,t=new Xo){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){as.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(is.fromBufferAttribute(s,e),a?as.addScaledVector(is,r):as.addScaledVector(is.sub(t),r))}t.add(as)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),$o.copy(n.boundingSphere),$o.applyMatrix4(i),Qo.copy(e.ray).recast(e.near),!($o.containsPoint(Qo.origin)===!1&&(Qo.intersectSphere($o,es)===null||Qo.origin.distanceToSquared(es)>(e.far-e.near)**2))&&(Zo.copy(i).invert(),Qo.copy(e.ray).applyMatrix4(Zo),(n.boundingBox===null||Qo.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Qo)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ls(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ls(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ls(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ls(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function cs(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ss.copy(s),ss.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ss);return l<n.near||l>n.far?null:{distance:l,point:ss.clone(),object:e}}function ls(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ts),e.getVertexPosition(c,ns),e.getVertexPosition(l,rs);let u=cs(e,t,n,r,ts,ns,rs,os);if(u){let e=new Y;ro.getBarycoord(os,ts,ns,rs,e),i&&(u.uv=ro.getInterpolatedAttribute(i,s,c,l,e,new J)),a&&(u.uv1=ro.getInterpolatedAttribute(a,s,c,l,e,new J)),o&&(u.normal=ro.getInterpolatedAttribute(o,s,c,l,e,new Y),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new Y,materialIndex:0};ro.getNormal(ts,ns,rs,t.normal),u.face=t,u.barycoord=e}return u}var us=class extends ta{constructor(e=null,t=1,n=1,r,i,a,o,s,c=wn,l=wn,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ds=new Ao,fs=new J(.5,.5),ps=new Y,ms=class{constructor(e=new Ho,t=new Ho,n=new Ho,r=new Ho,i=new Ho,a=new Ho){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Xr,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(e){return ds.center.set(0,0,0),ds.radius=.7071067811865476+fs.distanceTo(e.center),ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ps.x=r.normal.x>0?e.max.x:e.min.x,ps.y=r.normal.y>0?e.max.y:e.min.y,ps.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ps)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},hs=class extends Wo{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new Z(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},gs=new sa,_s=new Yo,vs=new Ao,ys=new Y,bs=class extends X{constructor(e=new Ro,t=new hs){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),vs.copy(n.boundingSphere),vs.applyMatrix4(r),vs.radius+=i,e.ray.intersectsSphere(vs)===!1)return;gs.copy(r).invert(),_s.copy(e.ray).applyMatrix4(gs);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ys.fromBufferAttribute(l,n),xs(ys,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ys.fromBufferAttribute(l,a),xs(ys,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function xs(e,t,n,r,i,a,o){let s=_s.distanceSqToPoint(e);if(s<n){let n=new Y;_s.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ss=class extends ta{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Cs=class extends ta{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ws=class extends ta{constructor(e,t,n=Fn,r,i,a,o=wn,s=wn,c,l=Kn,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Zi(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ts=class extends ws{constructor(e,t=Fn,n=301,r,i,a=wn,o=wn,s,c=Kn){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Es=class extends ta{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ds=class e extends Ro{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Eo(c,3)),this.setAttribute(`normal`,new Eo(l,3)),this.setAttribute(`uv`,new Eo(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new Y;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Os=class e extends Ro{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new Y,l=new J;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Eo(a,3)),this.setAttribute(`normal`,new Eo(o,3)),this.setAttribute(`uv`,new Eo(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},ks=class e extends Ro{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Eo(u,3)),this.setAttribute(`normal`,new Eo(d,3)),this.setAttribute(`uv`,new Eo(f,2));function _(){let a=new Y,_=new Y,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new J,m=new Y,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},As=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ii(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new J:new Y);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new Y,r=[],i=[],a=[],o=new Y,s=new sa;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new Y)}i[0]=new Y,a[0]=new Y;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(hi(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(hi(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},js=class extends As{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new J){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Ms=class extends js{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Ns(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Ps=new Y,Fs=new Y,Is=new Ns,Ls=new Ns,Rs=new Ns,zs=class extends As{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new Y){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Fs.subVectors(r[0],r[1]).add(r[0]),c=Fs);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Ps.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Ps),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Is.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Ls.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Rs.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Is.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Ls.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Rs.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Is.calc(s),Ls.calc(s),Rs.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new Y().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Bs(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Vs(e,t){let n=1-e;return n*n*t}function Hs(e,t){return 2*(1-e)*e*t}function Us(e,t){return e*e*t}function Ws(e,t,n,r){return Vs(e,t)+Hs(e,n)+Us(e,r)}function Gs(e,t){let n=1-e;return n*n*n*t}function Ks(e,t){let n=1-e;return 3*n*n*e*t}function qs(e,t){return 3*(1-e)*e*e*t}function Js(e,t){return e*e*e*t}function Ys(e,t,n,r,i){return Gs(e,t)+Ks(e,n)+qs(e,r)+Js(e,i)}var Xs=class extends As{constructor(e=new J,t=new J,n=new J,r=new J){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new J){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ys(e,r.x,i.x,a.x,o.x),Ys(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Zs=class extends As{constructor(e=new Y,t=new Y,n=new Y,r=new Y){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new Y){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ys(e,r.x,i.x,a.x,o.x),Ys(e,r.y,i.y,a.y,o.y),Ys(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Qs=class extends As{constructor(e=new J,t=new J){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new J){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new J){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$s=class extends As{constructor(e=new Y,t=new Y){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new Y){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Y){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ec=class extends As{constructor(e=new J,t=new J,n=new J){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new J){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Ws(e,r.x,i.x,a.x),Ws(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},tc=class extends As{constructor(e=new Y,t=new Y,n=new Y){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Y){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Ws(e,r.x,i.x,a.x),Ws(e,r.y,i.y,a.y),Ws(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},nc=class extends As{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new J){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Bs(o,s.x,c.x,l.x,u.x),Bs(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new J().fromArray(n))}return this}},rc=Object.freeze({__proto__:null,ArcCurve:Ms,CatmullRomCurve3:zs,CubicBezierCurve:Xs,CubicBezierCurve3:Zs,EllipseCurve:js,LineCurve:Qs,LineCurve3:$s,QuadraticBezierCurve:ec,QuadraticBezierCurve3:tc,SplineCurve:nc}),ic=class extends As{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new rc[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new rc[n.type]().fromJSON(n))}return this}},ac=class extends ic{constructor(e){super(),this.type=`Path`,this.currentPoint=new J,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Qs(this.currentPoint.clone(),new J(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new ec(this.currentPoint.clone(),new J(e,t),new J(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new Xs(this.currentPoint.clone(),new J(e,t),new J(n,r),new J(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new nc([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new js(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},oc=class extends ac{constructor(e){super(e),this.uuid=mi(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new ac().fromJSON(n))}return this}};function sc(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=cc(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=hc(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return uc(a,o,n,s,c,l,0),o}function cc(e,t,n,r,i){let a;if(i===zc(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=Ic(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=Ic(i/r|0,e[i],e[i+1],a);return a&&Oc(a,a.next)&&(Lc(a),a=a.next),a}function lc(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Oc(n,n.next)||Dc(n.prev,n,n.next)===0)){if(Lc(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function uc(e,t,n,r,i,a,o){if(!e)return;!o&&a&&bc(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?fc(e,r,i,a):dc(e)){t.push(c.i,e.i,l.i),Lc(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=pc(lc(e),t),uc(e,t,n,r,i,a,2)):o===2&&mc(e,t,n,r,i,a):uc(lc(e),t,n,r,i,a,1);break}}}function dc(e){let t=e.prev,n=e,r=e.next;if(Dc(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&Tc(i,s,a,c,o,l,m.x,m.y)&&Dc(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function fc(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Dc(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=Sc(p,m,t,n,r),v=Sc(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Tc(s,u,c,d,l,f,y.x,y.y)&&Dc(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Tc(s,u,c,d,l,f,b.x,b.y)&&Dc(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&Tc(s,u,c,d,l,f,y.x,y.y)&&Dc(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&Tc(s,u,c,d,l,f,b.x,b.y)&&Dc(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function pc(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Oc(r,i)&&kc(r,n,n.next,i)&&Nc(r,i)&&Nc(i,r)&&(t.push(r.i,n.i,i.i),Lc(n),Lc(n.next),n=e=i),n=n.next}while(n!==e);return lc(n)}function mc(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Ec(o,e)){let s=Fc(o,e);o=lc(o,o.next),s=lc(s,s.next),uc(o,t,n,r,i,a,0),uc(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function hc(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=cc(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Cc(o))}i.sort(gc);for(let e=0;e<i.length;e++)n=_c(i[e],n);return n}function gc(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function _c(e,t){let n=vc(e,t);if(!n)return t;let r=Fc(n,e);return lc(r,r.next),lc(n,n.next)}function vc(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Oc(e,n))return n;do{if(Oc(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&wc(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Nc(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&yc(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function yc(e,t){return Dc(e.prev,e,t.prev)<0&&Dc(t.next,e,e.next)<0}function bc(e,t,n,r){let i=e;do i.z===0&&(i.z=Sc(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,xc(i)}function xc(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Sc(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Cc(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function wc(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function Tc(e,t,n,r,i,a,o,s){return(e!==o||t!==s)&&wc(e,t,n,r,i,a,o,s)}function Ec(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Mc(e,t)&&(Nc(e,t)&&Nc(t,e)&&Pc(e,t)&&(Dc(e.prev,e,t.prev)||Dc(e,t.prev,t))||Oc(e,t)&&Dc(e.prev,e,e.next)>0&&Dc(t.prev,t,t.next)>0)}function Dc(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Oc(e,t){return e.x===t.x&&e.y===t.y}function kc(e,t,n,r){let i=jc(Dc(e,t,n)),a=jc(Dc(e,t,r)),o=jc(Dc(n,r,e)),s=jc(Dc(n,r,t));return!!(i!==a&&o!==s||i===0&&Ac(e,n,t)||a===0&&Ac(e,r,t)||o===0&&Ac(n,e,r)||s===0&&Ac(n,t,r))}function Ac(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function jc(e){return e>0?1:e<0?-1:0}function Mc(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&kc(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Nc(e,t){return Dc(e.prev,e,e.next)<0?Dc(e,t,e.next)>=0&&Dc(e,e.prev,t)>=0:Dc(e,t,e.prev)<0||Dc(e,e.next,t)<0}function Pc(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Fc(e,t){let n=Rc(e.i,e.x,e.y),r=Rc(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function Ic(e,t,n,r){let i=Rc(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function Lc(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Rc(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function zc(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Bc=class{static triangulate(e,t,n=2){return sc(e,t,n)}},Vc=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Hc(e),Uc(n,e);let a=e.length;t.forEach(Hc);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,Uc(n,t[e]);let o=Bc.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Hc(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Uc(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Wc=class e extends Ro{constructor(e=new oc([new J(.5,.5),new J(-.5,.5),new J(-.5,-.5),new J(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new Eo(r,3)),this.setAttribute(`uv`,new Eo(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0||t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?Gc:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new Y,b=new Y,x=new Y}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!Vc.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];Vc.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(s<=10000000000000001e-36*c*c){e.splice(r,1),n--;continue}t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||ai(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let k=C.length;function A(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new J(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new J(r/a,i/a)}let j=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),j[e]=A(D[e],D[n],D[r]);let M=[],N,P=j.concat();for(let e=0,t=E;e<t;e++){let t=w[e];N=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),N[e]=A(t[e],t[r],t[i]);M.push(N),P=P.concat(N)}let F;if(p===0)F=Vc.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],j[t],a);z(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];N=M[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],N[e],a);z(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}F=Vc.triangulateShape(e,t)}let I=F.length,L=d+f;for(let e=0;e<k;e++){let t=l?O(C[e],P[e],L):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),z(x.x,x.y,x.z)):z(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<k;t++){let n=l?O(C[t],P[t],L):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),z(x.x,x.y,x.z)):z(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],j[e],r);z(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];N=M[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],N[e],r);_?z(i.x,i.y+g[s-1].y,g[s-1].x+n):z(i.x,i.y,c+n)}}}ee(),R();function ee(){let e=r.length/3;if(l){let e=0,t=k*e;for(let e=0;e<I;e++){let n=F[e];B(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=k*e;for(let e=0;e<I;e++){let n=F[e];B(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<I;e++){let t=F[e];B(t[2],t[1],t[0])}for(let e=0;e<I;e++){let t=F[e];B(t[0]+k*s,t[1]+k*s,t[2]+k*s)}}n.addGroup(e,r.length/3-e,0)}function R(){let e=r.length/3,t=0;te(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];te(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function te(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=k*e,a=k*(e+1);V(t+r+n,t+i+n,t+i+a,t+r+a)}}}function z(e,t,n){a.push(e),a.push(t),a.push(n)}function B(e,t,i){ne(e),ne(t),ne(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);H(o[0]),H(o[1]),H(o[2])}function V(e,t,i,a){ne(e),ne(t),ne(a),ne(t),ne(i),ne(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);H(s[0]),H(s[1]),H(s[3]),H(s[1]),H(s[2]),H(s[3])}function ne(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function H(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Kc(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new rc[i.type]().fromJSON(i)),new e(r,t.options)}},Gc={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new J(a,o),new J(s,c),new J(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new J(o,1-c),new J(l,1-d),new J(f,1-m),new J(h,1-_)]:[new J(s,1-c),new J(u,1-d),new J(p,1-m),new J(g,1-_)]}};function Kc(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var qc=class e extends Ro{constructor(e=[new J(0,-.5),new J(.5,0),new J(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=hi(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new Y,d=new J,f=new Y,p=new Y,m=new Y,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new Eo(a,3)),this.setAttribute(`uv`,new Eo(o,2)),this.setAttribute(`normal`,new Eo(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},Jc=class e extends Ro{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Eo(p,3)),this.setAttribute(`normal`,new Eo(m,3)),this.setAttribute(`uv`,new Eo(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Yc=class e extends Ro{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new Y,p=new J;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Eo(s,3)),this.setAttribute(`normal`,new Eo(c,3)),this.setAttribute(`uv`,new Eo(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Xc=class e extends Ro{constructor(e=new oc([new J(0,.5),new J(-.5,-.5),new J(.5,-.5)]),t=12){super(),this.type=`ShapeGeometry`,this.parameters={shapes:e,curveSegments:t};let n=[],r=[],i=[],a=[],o=0,s=0;if(Array.isArray(e)===!1)c(e);else for(let t=0;t<e.length;t++)c(e[t]),this.addGroup(o,s,t),o+=s,s=0;this.setIndex(n),this.setAttribute(`position`,new Eo(r,3)),this.setAttribute(`normal`,new Eo(i,3)),this.setAttribute(`uv`,new Eo(a,2));function c(e){let o=r.length/3,c=e.extractPoints(t),l=c.shape,u=c.holes;Vc.isClockWise(l)===!1&&(l=l.reverse());for(let e=0,t=u.length;e<t;e++){let t=u[e];Vc.isClockWise(t)===!0&&(u[e]=t.reverse())}let d=Vc.triangulateShape(l,u);for(let e=0,t=u.length;e<t;e++){let t=u[e];l=l.concat(t)}for(let e=0,t=l.length;e<t;e++){let t=l[e];r.push(t.x,t.y,0),i.push(0,0,1),a.push(t.x,t.y)}for(let e=0,t=d.length;e<t;e++){let t=d[e],r=t[0]+o,i=t[1]+o,a=t[2]+o;n.push(r,i,a),s+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Zc(t,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}return new e(r,t.curveSegments)}};function Zc(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,r=e.length;n<r;n++){let r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}var Qc=class e extends Ro{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new Y,d=new Y,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Eo(p,3)),this.setAttribute(`normal`,new Eo(m,3)),this.setAttribute(`uv`,new Eo(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},$c=class e extends Ro{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new Y,f=new Y,p=new Y;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Eo(c,3)),this.setAttribute(`normal`,new Eo(l,3)),this.setAttribute(`uv`,new Eo(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function el(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(nl(i))i.isRenderTargetTexture?(ii(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(nl(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function tl(e){let t={};for(let n=0;n<e.length;n++){let r=el(e[n]);for(let e in r)t[e]=r[e]}return t}function nl(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function rl(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function il(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Gi.workingColorSpace}var al={clone:el,merge:tl},ol=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sl=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,cl=class extends Wo{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ol,this.fragmentShader=sl,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=el(e.uniforms),this.uniformsGroups=rl(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Z().setHex(r.value);break;case`v2`:this.uniforms[n].value=new J().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new Y().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new na().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Bi().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new sa().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ll=class extends cl{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ul=class extends Wo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Z(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Z(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _a,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},dl=class extends Wo{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:``},this.type=`MeshToonMaterial`,this.color=new Z(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Z(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new J(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},fl=class extends Wo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Hr,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},pl=class extends Wo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ml(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function hl(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var gl=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},_l=class extends gl{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:zr,endingEnd:zr}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Br:i=e,o=2*t-n;break;case Vr:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Br:a=e,s=2*n-t;break;case Vr:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},vl=class extends gl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},yl=class extends gl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},bl=class extends gl{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Cl(n,t,g,y,r);i[p]=xl(x,o,_,b,m)}return i}};function xl(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Sl(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Cl(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=xl(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Sl(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var wl=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=ml(t,this.TimeBufferType),this.values=ml(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ml(e.times,Array),values:ml(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),hl(e.settings)&&(n.settings={inTangents:ml(e.settings.inTangents,Array),outTangents:ml(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new yl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new vl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new _l(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new bl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Fr:t=this.InterpolantFactoryMethodDiscrete;break;case Ir:t=this.InterpolantFactoryMethodLinear;break;case Lr:t=this.InterpolantFactoryMethodSmooth;break;case Rr:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return ii(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fr;case this.InterpolantFactoryMethodLinear:return Ir;case this.InterpolantFactoryMethodSmooth:return Lr;case this.InterpolantFactoryMethodBezier:return Rr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;hl(this.settings)&&(Tl(this.settings.inTangents,e),Tl(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(ai(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(ai(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){ai(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){ai(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Qr(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){ai(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Lr,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,hl(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Tl(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}wl.prototype.ValueTypeName=``,wl.prototype.TimeBufferType=Float32Array,wl.prototype.ValueBufferType=Float32Array,wl.prototype.DefaultInterpolation=Ir;var El=class extends wl{constructor(e,t,n){super(e,t,n)}};El.prototype.ValueTypeName=`bool`,El.prototype.ValueBufferType=Array,El.prototype.DefaultInterpolation=Fr,El.prototype.InterpolantFactoryMethodLinear=void 0,El.prototype.InterpolantFactoryMethodSmooth=void 0;var Dl=class extends wl{constructor(e,t,n,r){super(e,t,n,r)}};Dl.prototype.ValueTypeName=`color`;var Ol=class extends wl{constructor(e,t,n,r){super(e,t,n,r)}};Ol.prototype.ValueTypeName=`number`;var kl=class extends gl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Li.slerpFlat(i,0,a,c-o,a,c,s);return i}},Al=class extends wl{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new kl(this.times,this.values,this.getValueSize(),e)}};Al.prototype.ValueTypeName=`quaternion`,Al.prototype.InterpolantFactoryMethodSmooth=void 0;var jl=class extends wl{constructor(e,t,n){super(e,t,n)}};jl.prototype.ValueTypeName=`string`,jl.prototype.ValueBufferType=Array,jl.prototype.DefaultInterpolation=Fr,jl.prototype.InterpolantFactoryMethodLinear=void 0,jl.prototype.InterpolantFactoryMethodSmooth=void 0;var Ml=class extends wl{constructor(e,t,n,r){super(e,t,n,r)}};Ml.prototype.ValueTypeName=`vector`;var Nl=class extends X{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Z(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Pl=class extends Nl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(X.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Z(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Fl=new sa,Il=new Y,Ll=new Y,Rl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new J(512,512),this.mapType=An,this.map=null,this.mapPass=null,this.matrix=new sa,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ms,this._frameExtents=new J(1,1),this._viewportCount=1,this._viewports=[new na(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Il.setFromMatrixPosition(e.matrixWorld),t.position.copy(Il),Ll.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ll),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){Fl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Fl,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,s=r?r.x/i.x:0,c=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+s,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Fl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},zl=new Y,Bl=new Li,Vl=new Y,Hl=class extends X{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new sa,this.projectionMatrix=new sa,this.projectionMatrixInverse=new sa,this.coordinateSystem=Xr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(zl,Bl,Vl),Vl.x===1&&Vl.y===1&&Vl.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zl,Bl,Vl.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(zl,Bl,Vl),Vl.x===1&&Vl.y===1&&Vl.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(zl,Bl,Vl.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ul=new Y,Wl=new J,Gl=new J,Kl=class extends Hl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=pi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(fi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pi*2*Math.atan(Math.tan(fi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ul.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ul.x,Ul.y).multiplyScalar(-e/Ul.z),Ul.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ul.x,Ul.y).multiplyScalar(-e/Ul.z)}getViewSize(e,t){return this.getViewBounds(e,Wl,Gl),t.subVectors(Gl,Wl)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(fi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ql=class extends Rl{constructor(){super(new Kl(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=pi*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Jl=class extends Nl{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(X.DEFAULT_UP),this.updateMatrix(),this.target=new X,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new ql}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Yl=class extends Rl{constructor(){super(new Kl(90,1,.5,500)),this.isPointLightShadow=!0}},Xl=class extends Nl{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Yl}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Zl=class extends Hl{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ql=class extends Rl{constructor(){super(new Zl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},$l=class extends Nl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(X.DEFAULT_UP),this.updateMatrix(),this.target=new X,this.shadow=new Ql}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},eu=-90,tu=1,nu=class extends X{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Kl(eu,tu,e,t);r.layers=this.layers,this.add(r);let i=new Kl(eu,tu,e,t);i.layers=this.layers,this.add(i);let a=new Kl(eu,tu,e,t);a.layers=this.layers,this.add(a);let o=new Kl(eu,tu,e,t);o.layers=this.layers,this.add(o);let s=new Kl(eu,tu,e,t);s.layers=this.layers,this.add(s);let c=new Kl(eu,tu,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ru=class extends Kl{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},iu=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=au.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function au(){this._document.hidden===!1&&this.reset()}var ou=`\\[\\]\\.:\\/`,su=RegExp(`[\\[\\]\\.:\\/]`,`g`),cu=`[^\\[\\]\\.:\\/]`,lu=`[^`+ou.replace(`\\.`,``)+`]`,uu=`((?:WC+[\\/:])*)`.replace(`WC`,cu),du=`(WCOD+)?`.replace(`WCOD`,lu),fu=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,cu),pu=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,cu),mu=RegExp(`^`+uu+du+fu+pu+`$`),hu=[`material`,`materials`,`bones`,`map`],gu=class{constructor(e,t,n){let r=n||_u.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},_u=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(su,``)}static parseTrackName(e){let t=mu.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);hu.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){ii(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){ai(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){ai(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){ai(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){ai(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){ai(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){ai(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){ai(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;ai(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){ai(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){ai(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_u.Composite=gu,_u.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},_u.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},_u.prototype.GetterByBindingType=[_u.prototype._getValue_direct,_u.prototype._getValue_array,_u.prototype._getValue_arrayElement,_u.prototype._getValue_toArray],_u.prototype.SetterByBindingTypeAndVersioning=[[_u.prototype._setValue_direct,_u.prototype._setValue_direct_setNeedsUpdate,_u.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_u.prototype._setValue_array,_u.prototype._setValue_array_setNeedsUpdate,_u.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_u.prototype._setValue_arrayElement,_u.prototype._setValue_arrayElement_setNeedsUpdate,_u.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_u.prototype._setValue_fromArray,_u.prototype._setValue_fromArray_setNeedsUpdate,_u.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function vu(e,t,n,r){let i=yu(r);switch(n){case Un:return e*t;case Jn:return e*t/i.components*i.byteLength;case Yn:return e*t/i.components*i.byteLength;case Xn:return e*t*2/i.components*i.byteLength;case Zn:return e*t*2/i.components*i.byteLength;case Wn:return e*t*3/i.components*i.byteLength;case Gn:return e*t*4/i.components*i.byteLength;case Qn:return e*t*4/i.components*i.byteLength;case $n:case er:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case tr:case nr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ir:case or:return Math.max(e,16)*Math.max(t,8)/4;case rr:case ar:return Math.max(e,8)*Math.max(t,8)/2;case sr:case cr:case ur:case dr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case lr:case fr:case pr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case mr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case hr:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case gr:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case _r:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case vr:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case yr:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case br:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case xr:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Sr:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Cr:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case wr:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Tr:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Er:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Dr:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Or:case kr:case Ar:return Math.ceil(e/4)*Math.ceil(t/4)*16;case jr:case Mr:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Nr:case Pr:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function yu(e){switch(e){case An:case jn:return{byteLength:1,components:1};case Nn:case Mn:case Ln:return{byteLength:2,components:1};case Rn:case zn:return{byteLength:2,components:4};case Fn:case Pn:case In:return{byteLength:4,components:1};case Vn:case Hn:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?ii(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function bu(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function xu(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Su={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},$={common:{diffuse:{value:new Z(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bi},alphaMap:{value:null},alphaMapTransform:{value:new Bi},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bi}},envmap:{envMap:{value:null},envMapRotation:{value:new Bi},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bi}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bi}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bi},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bi},normalScale:{value:new J(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bi},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bi}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bi}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bi}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Z(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new Z(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bi},alphaTest:{value:0},uvTransform:{value:new Bi}},sprite:{diffuse:{value:new Z(16777215)},opacity:{value:1},center:{value:new J(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bi},alphaMap:{value:null},alphaMapTransform:{value:new Bi},alphaTest:{value:0}}},Cu={basic:{uniforms:tl([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Su.meshbasic_vert,fragmentShader:Su.meshbasic_frag},lambert:{uniforms:tl([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Z(0)},envMapIntensity:{value:1}}]),vertexShader:Su.meshlambert_vert,fragmentShader:Su.meshlambert_frag},phong:{uniforms:tl([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Z(0)},specular:{value:new Z(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Su.meshphong_vert,fragmentShader:Su.meshphong_frag},standard:{uniforms:tl([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new Z(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Su.meshphysical_vert,fragmentShader:Su.meshphysical_frag},toon:{uniforms:tl([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new Z(0)}}]),vertexShader:Su.meshtoon_vert,fragmentShader:Su.meshtoon_frag},matcap:{uniforms:tl([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Su.meshmatcap_vert,fragmentShader:Su.meshmatcap_frag},points:{uniforms:tl([$.points,$.fog]),vertexShader:Su.points_vert,fragmentShader:Su.points_frag},dashed:{uniforms:tl([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Su.linedashed_vert,fragmentShader:Su.linedashed_frag},depth:{uniforms:tl([$.common,$.displacementmap]),vertexShader:Su.depth_vert,fragmentShader:Su.depth_frag},normal:{uniforms:tl([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Su.meshnormal_vert,fragmentShader:Su.meshnormal_frag},sprite:{uniforms:tl([$.sprite,$.fog]),vertexShader:Su.sprite_vert,fragmentShader:Su.sprite_frag},background:{uniforms:{uvTransform:{value:new Bi},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Su.background_vert,fragmentShader:Su.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bi}},vertexShader:Su.backgroundCube_vert,fragmentShader:Su.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Su.cube_vert,fragmentShader:Su.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Su.equirect_vert,fragmentShader:Su.equirect_frag},distance:{uniforms:tl([$.common,$.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Su.distance_vert,fragmentShader:Su.distance_frag},shadow:{uniforms:tl([$.lights,$.fog,{color:{value:new Z(0)},opacity:{value:1}}]),vertexShader:Su.shadow_vert,fragmentShader:Su.shadow_frag}};Cu.physical={uniforms:tl([Cu.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bi},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bi},clearcoatNormalScale:{value:new J(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bi},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bi},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bi},sheen:{value:0},sheenColor:{value:new Z(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bi},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bi},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bi},transmissionSamplerSize:{value:new J},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bi},attenuationDistance:{value:0},attenuationColor:{value:new Z(0)},specularColor:{value:new Z(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bi},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bi},anisotropyVector:{value:new J},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bi}}]),vertexShader:Su.meshphysical_vert,fragmentShader:Su.meshphysical_frag};var wu={r:0,b:0,g:0},Tu=new sa,Eu=new Bi;Eu.set(-1,0,0,0,1,0,0,0,1);function Du(e,t,n,r,i,a){let o=new Z(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Q(new Ds(1,1,1),new cl({name:`BackgroundCubeMaterial`,uniforms:el(Cu.backgroundCube.uniforms),vertexShader:Cu.backgroundCube.vertexShader,fragmentShader:Cu.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Tu.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Eu),l.material.toneMapped=Gi.getTransfer(i.colorSpace)!==Kr,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Q(new Jc(2,2),new cl({name:`BackgroundMaterial`,uniforms:el(Cu.background.uniforms),vertexShader:Cu.background.vertexShader,fragmentShader:Cu.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Gi.getTransfer(i.colorSpace)!==Kr,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(wu,il(e)),n.buffers.color.setClear(wu.r,wu.g,wu.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Ou(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function ku(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Au(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(ii(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&ii(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function ju(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Ho,s=new Bi,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Mu=4,Nu=6,Pu=20,Fu=256,Iu=new Zl,Lu=new Z,Ru=null,zu=0,Bu=0,Vu=!1,Hu=new Y,Uu=new Y,Wu=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Hu}=i;Ru=this._renderer.getRenderTarget(),zu=this._renderer.getActiveCubeFace(),Bu=this._renderer.getActiveMipmapLevel(),Vu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ru,zu,Bu),this._renderer.xr.enabled=Vu,e.scissorTest=!1,qu(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ru=this._renderer.getRenderTarget(),zu=this._renderer.getActiveCubeFace(),Bu=this._renderer.getActiveMipmapLevel(),Vu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dn,minFilter:Dn,generateMipmaps:!1,type:Ln,format:Gn,colorSpace:Wr,depthBuffer:!1},r=Ku(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ku(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Gu(r)),this._blurMaterial=Yu(r,e,t),this._ggxMaterial=Ju(r,e,t)}return r}_compileMaterial(e){let t=new Q(new Ro,e);this._renderer.compile(t,Iu)}_sceneToCubeUV(e,t,n,r,i){let a=new Kl(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Lu),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Q(new Ds,new Xo({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Lu),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;qu(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xu());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;qu(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Iu)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Mu?n-d+Mu:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,qu(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Iu),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,qu(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Iu)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];qu(t,3*l*(r>this._lodMax-Mu?r-this._lodMax+Mu:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Iu)}};function Gu(e){let t=[],n=[],r=e,i=e-Mu+1+Nu;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Uu.set(1,r,n):e===1?Uu.set(-n,1,-r):e===2?Uu.set(-n,r,1):e===3?Uu.set(-1,r,-n):e===4?Uu.set(-n,-1,r):Uu.set(n,r,-1),Uu.toArray(l,(e*6+t)*3)}}let u=new Ro;u.setAttribute(`position`,new Co(c,3)),u.setAttribute(`outputDirection`,new Co(l,3)),n.push(new Q(u,null)),r>Mu&&r--}return{lodMeshes:n,sizeLods:t}}function Ku(e,t,n){let r=new ia(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function qu(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ju(e,t,n){return new cl({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Fu,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Qu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Yu(e,t,n){return new cl({name:`SphericalGaussianBlur`,defines:{SAMPLES:Pu,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Qu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Xu(){return new cl({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Zu(){return new cl({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Qu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var $u=class extends ia{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ss(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ds(5,5,5),i=new cl({name:`CubemapFromEquirect`,uniforms:el(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Q(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Dn),new nu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function ed(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new $u(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Wu(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Wu(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function td(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&oi(`WebGLRenderer: `+e+` extension not supported.`),t}}}function nd(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?To:wo)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function rd(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function id(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:ai(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function ad(e,t,n){let r=new WeakMap,i=new na;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new aa(h,p,m,u);g.type=In,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new J(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function od(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var sd={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function cd(e,t,n,r,i,a){let o=new ia(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Ro;l.setAttribute(`position`,new Eo([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Eo([0,2,0,0,2,0],2));let u=new ll({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Q(l,u),f=new Zl(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new ia(t,n,{type:Ln,depthBuffer:!1,stencilBuffer:!1}),c=new ia(t,n,{type:Ln,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},Gi.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=sd[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var ld=new ta,ud=new ws(1,1),dd=new aa,fd=new oa,pd=new Ss,md=[],hd=[],gd=new Float32Array(16),_d=new Float32Array(9),vd=new Float32Array(4);function yd(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=md[i];if(a===void 0&&(a=new Float32Array(i),md[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function bd(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function xd(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Sd(e,t){let n=hd[t];n===void 0&&(n=new Int32Array(t),hd[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Cd(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function wd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(bd(n,t))return;e.uniform2fv(this.addr,t),xd(n,t)}}function Td(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(bd(n,t))return;e.uniform3fv(this.addr,t),xd(n,t)}}function Ed(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(bd(n,t))return;e.uniform4fv(this.addr,t),xd(n,t)}}function Dd(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(bd(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),xd(n,t)}else{if(bd(n,r))return;vd.set(r),e.uniformMatrix2fv(this.addr,!1,vd),xd(n,r)}}function Od(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(bd(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),xd(n,t)}else{if(bd(n,r))return;_d.set(r),e.uniformMatrix3fv(this.addr,!1,_d),xd(n,r)}}function kd(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(bd(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),xd(n,t)}else{if(bd(n,r))return;gd.set(r),e.uniformMatrix4fv(this.addr,!1,gd),xd(n,r)}}function Ad(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function jd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(bd(n,t))return;e.uniform2iv(this.addr,t),xd(n,t)}}function Md(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(bd(n,t))return;e.uniform3iv(this.addr,t),xd(n,t)}}function Nd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(bd(n,t))return;e.uniform4iv(this.addr,t),xd(n,t)}}function Pd(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Fd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(bd(n,t))return;e.uniform2uiv(this.addr,t),xd(n,t)}}function Id(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(bd(n,t))return;e.uniform3uiv(this.addr,t),xd(n,t)}}function Ld(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(bd(n,t))return;e.uniform4uiv(this.addr,t),xd(n,t)}}function Rd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(ud.compareFunction=n.isReversedDepthBuffer()?518:515,a=ud):a=ld,n.setTexture2D(t||a,i)}function zd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||fd,i)}function Bd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||pd,i)}function Vd(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||dd,i)}function Hd(e){switch(e){case 5126:return Cd;case 35664:return wd;case 35665:return Td;case 35666:return Ed;case 35674:return Dd;case 35675:return Od;case 35676:return kd;case 5124:case 35670:return Ad;case 35667:case 35671:return jd;case 35668:case 35672:return Md;case 35669:case 35673:return Nd;case 5125:return Pd;case 36294:return Fd;case 36295:return Id;case 36296:return Ld;case 35678:case 36198:case 36298:case 36306:case 35682:return Rd;case 35679:case 36299:case 36307:return zd;case 35680:case 36300:case 36308:case 36293:return Bd;case 36289:case 36303:case 36311:case 36292:return Vd}}function Ud(e,t){e.uniform1fv(this.addr,t)}function Wd(e,t){let n=yd(t,this.size,2);e.uniform2fv(this.addr,n)}function Gd(e,t){let n=yd(t,this.size,3);e.uniform3fv(this.addr,n)}function Kd(e,t){let n=yd(t,this.size,4);e.uniform4fv(this.addr,n)}function qd(e,t){let n=yd(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Jd(e,t){let n=yd(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Yd(e,t){let n=yd(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Xd(e,t){e.uniform1iv(this.addr,t)}function Zd(e,t){e.uniform2iv(this.addr,t)}function Qd(e,t){e.uniform3iv(this.addr,t)}function $d(e,t){e.uniform4iv(this.addr,t)}function ef(e,t){e.uniform1uiv(this.addr,t)}function tf(e,t){e.uniform2uiv(this.addr,t)}function nf(e,t){e.uniform3uiv(this.addr,t)}function rf(e,t){e.uniform4uiv(this.addr,t)}function af(e,t,n){let r=this.cache,i=t.length,a=Sd(n,i);bd(r,a)||(e.uniform1iv(this.addr,a),xd(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ud:ld;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function of(e,t,n){let r=this.cache,i=t.length,a=Sd(n,i);bd(r,a)||(e.uniform1iv(this.addr,a),xd(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||fd,a[e])}function sf(e,t,n){let r=this.cache,i=t.length,a=Sd(n,i);bd(r,a)||(e.uniform1iv(this.addr,a),xd(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||pd,a[e])}function cf(e,t,n){let r=this.cache,i=t.length,a=Sd(n,i);bd(r,a)||(e.uniform1iv(this.addr,a),xd(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||dd,a[e])}function lf(e){switch(e){case 5126:return Ud;case 35664:return Wd;case 35665:return Gd;case 35666:return Kd;case 35674:return qd;case 35675:return Jd;case 35676:return Yd;case 5124:case 35670:return Xd;case 35667:case 35671:return Zd;case 35668:case 35672:return Qd;case 35669:case 35673:return $d;case 5125:return ef;case 36294:return tf;case 36295:return nf;case 36296:return rf;case 35678:case 36198:case 36298:case 36306:case 35682:return af;case 35679:case 36299:case 36307:return of;case 35680:case 36300:case 36308:case 36293:return sf;case 36289:case 36303:case 36311:case 36292:return cf}}var uf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Hd(t.type)}},df=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=lf(t.type)}},ff=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},pf=/(\w+)(\])?(\[|\.)?/g;function mf(e,t){e.seq.push(t),e.map[t.id]=t}function hf(e,t,n){let r=e.name,i=r.length;for(pf.lastIndex=0;;){let a=pf.exec(r),o=pf.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){mf(n,l===void 0?new uf(s,e,t):new df(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new ff(s),mf(n,e)),n=e}}}var gf=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);hf(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function _f(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var vf=37297,yf=0;function bf(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var xf=new Bi;function Sf(e){Gi._getMatrix(xf,Gi.workingColorSpace,e);let t=`mat3( ${xf.elements.map(e=>e.toFixed(4))} )`;switch(Gi.getTransfer(e)){case Gr:return[t,`LinearTransferOETF`];case Kr:return[t,`sRGBTransferOETF`];default:return ii(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Cf(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+bf(e.getShaderSource(t),r)}return i}function wf(e,t){let n=Sf(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Tf={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Ef(e,t){let n=Tf[t];return n===void 0?(ii(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Df=new Y;function Of(){return Gi.getLuminanceCoefficients(Df),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Df.x.toFixed(4)}, ${Df.y.toFixed(4)}, ${Df.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function kf(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Mf).join(`
`)}function Af(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function jf(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Mf(e){return e!==``}function Nf(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Pf(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ff=/^[ \t]*#include +<([\w\d./]+)>/gm;function If(e){return e.replace(Ff,Rf)}var Lf=new Map;function Rf(e,t){let n=Su[t];if(n===void 0){let e=Lf.get(t);if(e!==void 0)n=Su[e],ii(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return If(n)}var zf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bf(e){return e.replace(zf,Vf)}function Vf(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Hf(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Uf={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Wf(e){return Uf[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Gf={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Kf(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Gf[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var qf={302:`ENVMAP_MODE_REFRACTION`};function Jf(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:qf[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Yf={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Xf(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Yf[e.combine]||`ENVMAP_BLENDING_NONE`}function Zf(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Qf(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Wf(n),l=Kf(n),u=Jf(n),d=Xf(n),f=Zf(n),p=kf(n),m=Af(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Mf).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Mf).join(`
`),_.length>0&&(_+=`
`)):(g=[Hf(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Mf).join(`
`),_=[Hf(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Su.tonemapping_pars_fragment,n.toneMapping===0?``:Ef(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Su.colorspace_pars_fragment,wf(`linearToOutputTexel`,n.outputColorSpace),Of(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Mf).join(`
`)),o=If(o),o=Nf(o,n),o=Pf(o,n),s=If(s),s=Nf(s,n),s=Pf(s,n),o=Bf(o),s=Bf(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=_f(i,i.VERTEX_SHADER,y),S=_f(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Cf(i,x,`vertex`),n=Cf(i,S,`fragment`);ai(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):ii(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new gf(i,h),T=jf(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,vf)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=yf++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var $f=0,ep=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new tp(e),t.set(e,n)),n}},tp=class{constructor(e){this.id=$f++,this.code=e,this.usedTimes=0}};function np(e){return e===1030||e===37490||e===36285}function rp(e,t,n,r,i,a){let o=new va,s=new ep,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&ii(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Cu[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=h.isInstancedMesh===!0,P=h.isBatchedMesh===!0,F=!!i.map,I=!!i.matcap,L=!!x,ee=!!i.aoMap,R=!!i.lightMap,te=!!i.bumpMap&&i.wireframe===!1,z=!!i.normalMap,B=!!i.displacementMap,V=!!i.emissiveMap,ne=!!i.metalnessMap,H=!!i.roughnessMap,re=i.anisotropy>0,ie=i.clearcoat>0,ae=i.dispersion>0,oe=i.retroreflectivity>0,se=i.iridescence>0,ce=i.sheen>0,le=i.transmission>0,ue=re&&!!i.anisotropyMap,de=ie&&!!i.clearcoatMap,fe=ie&&!!i.clearcoatNormalMap,pe=ie&&!!i.clearcoatRoughnessMap,me=se&&!!i.iridescenceMap,U=se&&!!i.iridescenceThicknessMap,he=ce&&!!i.sheenColorMap,ge=ce&&!!i.sheenRoughnessMap,_e=!!i.specularMap,W=!!i.specularColorMap,G=!!i.specularIntensityMap,K=le&&!!i.transmissionMap,ve=le&&!!i.thicknessMap,ye=!!i.gradientMap,be=!!i.alphaMap,xe=i.alphaTest>0,Se=!!i.alphaHash,Ce=!!i.extensions,we=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(we=e.toneMapping);let q={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&h._colorsTexture!==null,instancing:N,instancingColor:N&&h.instanceColor!==null,instancingMorph:N&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Gi.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:F,matcap:I,envMap:L,envMapMode:L&&x.mapping,envMapCubeUVHeight:S,aoMap:ee,lightMap:R,bumpMap:te,normalMap:z,displacementMap:B,emissiveMap:V,normalMapObjectSpace:z&&i.normalMapType===1,normalMapTangentSpace:z&&i.normalMapType===0,packedNormalMap:z&&i.normalMapType===0&&np(i.normalMap.format),metalnessMap:ne,roughnessMap:H,anisotropy:re,anisotropyMap:ue,clearcoat:ie,clearcoatMap:de,clearcoatNormalMap:fe,clearcoatRoughnessMap:pe,dispersion:ae,retroreflection:oe,iridescence:se,iridescenceMap:me,iridescenceThicknessMap:U,sheen:ce,sheenColorMap:he,sheenRoughnessMap:ge,specularMap:_e,specularColorMap:W,specularIntensityMap:G,transmission:le,transmissionMap:K,thicknessMap:ve,gradientMap:ye,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:be,alphaTest:xe,alphaHash:Se,combine:i.combine,mapUv:F&&m(i.map.channel),aoMapUv:ee&&m(i.aoMap.channel),lightMapUv:R&&m(i.lightMap.channel),bumpMapUv:te&&m(i.bumpMap.channel),normalMapUv:z&&m(i.normalMap.channel),displacementMapUv:B&&m(i.displacementMap.channel),emissiveMapUv:V&&m(i.emissiveMap.channel),metalnessMapUv:ne&&m(i.metalnessMap.channel),roughnessMapUv:H&&m(i.roughnessMap.channel),anisotropyMapUv:ue&&m(i.anisotropyMap.channel),clearcoatMapUv:de&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:fe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:U&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:he&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:ge&&m(i.sheenRoughnessMap.channel),specularMapUv:_e&&m(i.specularMap.channel),specularColorMapUv:W&&m(i.specularColorMap.channel),specularIntensityMapUv:G&&m(i.specularIntensityMap.channel),transmissionMapUv:K&&m(i.transmissionMap.channel),thicknessMapUv:ve&&m(i.thicknessMap.channel),alphaMapUv:be&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(z||re),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(F||be),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&z===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:we,decodeVideoTexture:F&&i.map.isVideoTexture===!0&&Gi.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:V&&i.emissiveMap.isVideoTexture===!0&&Gi.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ce&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ce&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return q.vertexUv1s=c.has(1),q.vertexUv2s=c.has(2),q.vertexUv3s=c.has(3),c.clear(),q}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Cu[t];n=al.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Qf(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function ip(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function ap(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function op(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function sp(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||ap),r.length>1&&r.sort(t||op),i.length>1&&i.sort(t||op)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function cp(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new sp,e.set(t,[i])):n>=r.length?(i=new sp,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function lp(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new Y,color:new Z};break;case`SpotLight`:n={position:new Y,direction:new Y,color:new Z,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new Y,color:new Z,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new Y,skyColor:new Z,groundColor:new Z};break;case`RectAreaLight`:n={color:new Z,position:new Y,halfWidth:new Y,halfHeight:new Y}}return e[t.id]=n,n}}}function up(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new J,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var dp=0;function fp(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function pp(e){let t=new lp,n=up(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new Y);let i=new Y,a=new sa,o=new sa;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(fp);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=dp++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function mp(e){let t=new pp(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function hp(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new mp(e),t.set(n,[a])):r>=i.length?(a=new mp(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var gp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_p=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,vp=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],yp=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],bp=new sa,xp=new Y,Sp=new Y;function Cp(e,t,n){let r=new ms,i=new J,a=new J,o=new na,s=new fl,c=new pl,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new cl({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new J},radius:{value:4}},vertexShader:gp,fragmentShader:_p}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ro;m.setAttribute(`position`,new Co(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Q(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(ii(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){ii(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){ii(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new ia(i.x,i.y,{format:Xn,type:Ln,minFilter:Dn,magFilter:Dn,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new ws(i.x,i.y,In),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Kn,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=wn,d.map.depthTexture.magFilter=wn}else l.isPointLight?(d.map=new $u(i.x),d.map.depthTexture=new Ts(i.x,Fn)):(d.map=new ia(i.x,i.y),d.map.depthTexture=new ws(i.x,i.y,Fn)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Kn,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Dn,d.map.depthTexture.magFilter=Dn):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=wn,d.map.depthTexture.magFilter=wn);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),xp.setFromMatrixPosition(l.matrixWorld),e.position.copy(xp),Sp.copy(e.position),Sp.add(vp[t]),e.up.copy(yp[t]),e.lookAt(Sp),e.updateMatrixWorld(),n.makeTranslation(-xp.x,-xp.y,-xp.z),bp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(bp,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new ia(i.x,i.y,{format:Xn,type:Ln}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function wp(e,t){function n(){let t=!1,n=new na,r=null,i=new na(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ne(e.DEPTH_TEST):H(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ci[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ne(e.STENCIL_TEST):H(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Z(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,L={},ee=e.getParameter(e.SCISSOR_BOX),R=e.getParameter(e.VIEWPORT),te=new na().fromArray(ee),z=new na().fromArray(R);function B(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let V={};V[e.TEXTURE_2D]=B(e.TEXTURE_2D,e.TEXTURE_2D,1),V[e.TEXTURE_CUBE_MAP]=B(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[e.TEXTURE_2D_ARRAY]=B(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),V[e.TEXTURE_3D]=B(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ne(e.DEPTH_TEST),o.setFunc(3),ue(!1),de(1),ne(e.CULL_FACE),ce(0);function ne(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function H(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function re(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ie(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ae(t){return h!==t&&(e.useProgram(t),h=t,!0)}let oe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};oe[103]=e.MIN,oe[104]=e.MAX;let se={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ce(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(H(e.BLEND),g=!1);return}if(g===!1&&(ne(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:ai(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:ai(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:ai(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:ai(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(oe[n],oe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(se[r],se[i],se[o],se[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function le(t,n){t.side===2?H(e.CULL_FACE):ne(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ue(r),t.blending===1&&t.transparent===!1?ce(0):ce(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),pe(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ne(e.SAMPLE_ALPHA_TO_COVERAGE):H(e.SAMPLE_ALPHA_TO_COVERAGE)}function ue(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function de(t){t===0?H(e.CULL_FACE):(ne(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function fe(t){t!==k&&(N&&e.lineWidth(t),k=t)}function pe(t,n,r){t?(ne(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):H(e.POLYGON_OFFSET_FILL)}function me(t){t?ne(e.SCISSOR_TEST):H(e.SCISSOR_TEST)}function U(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function he(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=L[r];i===void 0&&(i={type:void 0,texture:void 0},L[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||V[t]),i.type=t,i.texture=n)}function ge(){let t=L[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function _e(){try{e.compressedTexImage2D(...arguments)}catch(e){ai(`WebGLState:`,e)}}function W(){try{e.compressedTexImage3D(...arguments)}catch(e){ai(`WebGLState:`,e)}}function G(){try{e.texSubImage2D(...arguments)}catch(e){ai(`WebGLState:`,e)}}function K(){try{e.texSubImage3D(...arguments)}catch(e){ai(`WebGLState:`,e)}}function ve(){try{e.compressedTexSubImage2D(...arguments)}catch(e){ai(`WebGLState:`,e)}}function ye(){try{e.compressedTexSubImage3D(...arguments)}catch(e){ai(`WebGLState:`,e)}}function be(){try{e.texStorage2D(...arguments)}catch(e){ai(`WebGLState:`,e)}}function xe(){try{e.texStorage3D(...arguments)}catch(e){ai(`WebGLState:`,e)}}function Se(){try{e.texImage2D(...arguments)}catch(e){ai(`WebGLState:`,e)}}function Ce(){try{e.texImage3D(...arguments)}catch(e){ai(`WebGLState:`,e)}}function we(t){return d[t]===void 0?e.getParameter(t):d[t]}function q(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Te(t){te.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),te.copy(t))}function Ee(t){z.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),z.copy(t))}function De(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Oe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function ke(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,L={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Z(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,te.set(0,0,e.canvas.width,e.canvas.height),z.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ne,disable:H,bindFramebuffer:re,drawBuffers:ie,useProgram:ae,setBlending:ce,setMaterial:le,setFlipSided:ue,setCullFace:de,setLineWidth:fe,setPolygonOffset:pe,setScissorTest:me,activeTexture:U,bindTexture:he,unbindTexture:ge,compressedTexImage2D:_e,compressedTexImage3D:W,texImage2D:Se,texImage3D:Ce,pixelStorei:q,getParameter:we,updateUBOMapping:De,uniformBlockBinding:Oe,texStorage2D:be,texStorage3D:xe,texSubImage2D:G,texSubImage3D:K,compressedTexSubImage2D:ve,compressedTexSubImage3D:ye,scissor:Te,viewport:Ee,reset:ke}}function Tp(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new J,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):$r(`canvas`)}function g(e,t,n){let r=1,i=_e(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),ii(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&ii(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];ii(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||ii(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Gr:Gi.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,ii(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function M(){let e=O;return e>=i.maxTextures&&ii(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function P(t,i){let a=r.get(t);if(t.isVideoTexture&&he(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)ii(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)ii(`WebGLRenderer: Texture marked for update but image is incomplete`);else{H(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function F(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){H(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function I(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){H(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function L(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){re(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let ee={[xn]:e.REPEAT,[Sn]:e.CLAMP_TO_EDGE,[Cn]:e.MIRRORED_REPEAT},R={[wn]:e.NEAREST,[Tn]:e.NEAREST_MIPMAP_NEAREST,[En]:e.NEAREST_MIPMAP_LINEAR,[Dn]:e.LINEAR,[On]:e.LINEAR_MIPMAP_NEAREST,[kn]:e.LINEAR_MIPMAP_LINEAR},te={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function z(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&ii(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ee[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ee[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ee[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,R[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,R[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,te[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function B(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=N(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function V(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ne(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=V(n.start,r.width,4),c=V(t.start,r.width,4);n.start<=i+1&&a===c&&V(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function H(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=B(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Gi.getPrimaries(Gi.workingColorSpace),r=o.colorSpace===``?null:Gi.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=ge(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);z(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===qn,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ne(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=vu(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else ii(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?ii(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=vu(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=_e(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=_e(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function re(t,o,s){if(o.image.length!==6)return;let c=B(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Gi.getPrimaries(Gi.workingColorSpace),r=o.colorSpace===``?null:Gi.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=ge(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);z(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?ii(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=_e(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ie(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),U(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,me(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ae(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;U(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,me(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,me(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);U(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,me(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,me(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function oe(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),z(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else P(i.depthTexture,0);let u=l.__webglTexture,d=me(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)U(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)U(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function se(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)oe(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?oe(i.__webglFramebuffer[0],t,0):oe(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ae(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ae(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ce(t,n,i){let a=r.get(t);n!==void 0&&ie(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&se(t)}function le(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&U(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=me(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ae(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),z(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ie(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ie(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),z(c,a),ie(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),z(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ie(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ie(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&se(t)}function ue(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let de=[],fe=[];function pe(t){if(t.samples>0){if(U(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(de.length=0,fe.length=0,de.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(de.push(l),fe.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,fe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,de))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function me(e){return Math.min(i.maxSamples,e.samples)}function U(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function he(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function ge(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Gi.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&ii(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):ai(`WebGLTextures: Unsupported texture color space:`,n)),t}function _e(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=M,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=P,this.setTexture2DArray=F,this.setTexture3D=I,this.setTextureCube=L,this.rebindTextures=ce,this.setupRenderTarget=le,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=pe,this.setupDepthRenderbuffer=se,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=U,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Ep(e,t){function n(n,r=``){let i,a=Gi.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Dp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Op=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,kp=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Es(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new cl({vertexShader:Dp,fragmentShader:Op,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Q(new Jc(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ap=class extends li{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new kp,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new J,C=null,w=null,T=new Kl;T.viewport=new na;let E=new Kl;E.viewport=new na;let D=[T,E],O=new ru,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Ia,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Ia,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Ia,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,z.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&ii(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&ii(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?qn:Kn,a=_.stencil?Bn:Fn);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new ia(d.textureWidth,d.textureHeight,{format:Gn,type:An,depthTexture:new ws(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new ia(f.framebufferWidth,f.framebufferHeight,{format:Gn,type:An,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),z.setContext(r),z.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let P=new Y,F=new Y;function I(e,t,n){P.setFromMatrixPosition(t.matrixWorld),F.setFromMatrixPosition(n.matrixWorld);let r=P.distanceTo(F),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function L(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;L(O,i);for(let e=0;e<a.length;e++)L(a[e],i);a.length===2?I(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),ee(e,O,i)};function ee(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=pi*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let R=null;function te(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Kl,o.layers.enable(n),o.viewport=new na,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Es,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}R&&R(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let z=new bu;z.setAnimationLoop(te),this.setAnimationLoop=function(e){R=e},this.dispose=function(){}}},jp=new sa,Mp=new Bi;Mp.set(-1,0,0,0,1,0,0,0,1);function Np(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,il(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(jp.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Mp),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Pp(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return ai(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?ii(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):ii(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Fp=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ip=null;function Lp(){return Ip===null&&(Ip=new us(Fp,16,16,Xn,Ln),Ip.name=`DFG_LUT`,Ip.minFilter=Dn,Ip.magFilter=Dn,Ip.wrapS=Sn,Ip.wrapT=Sn,Ip.generateMipmaps=!1,Ip.needsUpdate=!0),Ip}var Rp=class{constructor(e={}){let{canvas:t=ei(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=An}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Qn,Zn,Yn]),g=new Set([An,Fn,Nn,Bn,Rn,zn]),_=new Uint32Array(4),v=new Int32Array(4),y=new Y,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Ur;let j=0,M=0,N=null,P=-1,F=null,I=new na,L=new na,ee=null,R=new Z(0),te=0,z=t.width,B=t.height,V=1,ne=null,H=null,re=new na(0,0,z,B),ie=new na(0,0,z,B),ae=!1,oe=new ms,se=!1,ce=!1,le=new sa,ue=new Y,de=new na,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},pe=!1;function me(){return N===null?V:1}let U=n;function he(e,n){return t.getContext(e,n)}let ge,_e,W,G,K,ve,ye,be,xe,Se,Ce,we,q,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,Le,!1),t.addEventListener(`webglcontextrestored`,Re,!1),t.addEventListener(`webglcontextcreationerror`,ze,!1),U===null){let t=`webgl2`;if(U=he(t,e),U===null)throw he(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Fe()}catch(e){throw t.removeEventListener(`webglcontextlost`,Le,!1),t.removeEventListener(`webglcontextrestored`,Re,!1),t.removeEventListener(`webglcontextcreationerror`,ze,!1),ai(`WebGLRenderer: `+e.message),e}function Fe(){ge=new td(U),ge.init(),Me=new Ep(U,ge),_e=new Au(U,ge,e,Me),W=new wp(U,ge),_e.reversedDepthBuffer&&d&&W.buffers.depth.setReversed(!0),O=U.createFramebuffer(),k=U.createFramebuffer(),A=U.createFramebuffer(),G=new id(U),K=new ip,ve=new Tp(U,ge,W,K,_e,Me,G),ye=new ed(T),be=new xu(U),Ne=new Ou(U,be),xe=new nd(U,be,G,Ne),Se=new od(U,xe,be,Ne,G),ke=new ad(U,_e,ve),Ee=new ju(K),Ce=new rp(T,ye,ge,_e,Ne,Ee),we=new Np(T,K),q=new cp,Te=new hp(ge),Oe=new Du(T,ye,W,Se,p,s),De=new Cp(T,Se,_e),Pe=new Pp(U,G,_e,W),Ae=new ku(U,ge,G),je=new rd(U,ge,G),G.programs=Ce.programs,T.capabilities=_e,T.extensions=ge,T.properties=K,T.renderLists=q,T.shadowMap=De,T.state=W,T.info=G}m!==1009&&(w=new cd(m,t.width,t.height,o,r,i));let Ie=new Ap(T,U);this.xr=Ie,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let e=ge.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=ge.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(e){e!==void 0&&(V=e,this.setSize(z,B,!1))},this.getSize=function(e){return e.set(z,B)},this.setSize=function(e,n,r=!0){if(Ie.isPresenting){ii(`WebGLRenderer: Can't change size while VR device is presenting.`);return}z=e,B=n,t.width=Math.floor(e*V),t.height=Math.floor(n*V),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(z*V,B*V).floor()},this.setDrawingBufferSize=function(e,n,r){z=e,B=n,V=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){ai(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){ii(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(I)},this.getViewport=function(e){return e.copy(re)},this.setViewport=function(e,t,n,r){e.isVector4?re.set(e.x,e.y,e.z,e.w):re.set(e,t,n,r),W.viewport(I.copy(re).multiplyScalar(V).round())},this.getScissor=function(e){return e.copy(ie)},this.setScissor=function(e,t,n,r){e.isVector4?ie.set(e.x,e.y,e.z,e.w):ie.set(e,t,n,r),W.scissor(L.copy(ie).multiplyScalar(V).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(e){W.setScissorTest(ae=e)},this.setOpaqueSort=function(e){ne=e},this.setTransparentSort=function(e){H=e},this.getClearColor=function(e){return e.copy(Oe.getClearColor())},this.setClearColor=function(){Oe.setClearColor(...arguments)},this.getClearAlpha=function(){return Oe.getClearAlpha()},this.setClearAlpha=function(){Oe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(N!==null){let t=N.texture.format;e=h.has(t)}if(e){let e=N.texture.type,t=g.has(e),n=Oe.getClearColor(),r=Oe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,U.clearBufferuiv(U.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,U.clearBufferiv(U.COLOR,0,v))}else r|=U.COLOR_BUFFER_BIT}t&&(r|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&U.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Le,!1),t.removeEventListener(`webglcontextrestored`,Re,!1),t.removeEventListener(`webglcontextcreationerror`,ze,!1),Oe.dispose(),q.dispose(),Te.dispose(),K.dispose(),ye.dispose(),Se.dispose(),Ne.dispose(),Pe.dispose(),Ce.dispose(),Ie.dispose(),Ie.removeEventListener(`sessionstart`,Ke),Ie.removeEventListener(`sessionend`,qe),Je.stop()};function Le(e){e.preventDefault(),ni(`WebGLRenderer: Context Lost.`),E=!0}function Re(){ni(`WebGLRenderer: Context Restored.`),E=!1;let e=G.autoReset,t=De.enabled,n=De.autoUpdate,r=De.needsUpdate,i=De.type;Fe(),G.autoReset=e,De.enabled=t,De.autoUpdate=n,De.needsUpdate=r,De.type=i}function ze(e){ai(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Be(e){let t=e.target;t.removeEventListener(`dispose`,Be),Ve(t)}function Ve(e){He(e),K.remove(e)}function He(e){let t=K.get(e).programs;t!==void 0&&(t.forEach(function(e){Ce.releaseProgram(e)}),e.isShaderMaterial&&Ce.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=fe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=it(e,t,n,r,i);W.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=xe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ne.setup(i,r,s,n,c);let h,g=Ae;if(c!==null&&(h=be.get(c),g=je,g.setIndex(h)),i.isMesh)r.wireframe===!0?(W.setLineWidth(r.wireframeLinewidth*me()),g.setMode(U.LINES)):g.setMode(U.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),W.setLineWidth(e*me()),i.isLineSegments?g.setMode(U.LINES):i.isLineLoop?g.setMode(U.LINE_LOOP):g.setMode(U.LINE_STRIP)}else i.isPoints?g.setMode(U.POINTS):i.isSprite&&g.setMode(U.TRIANGLES);if(i.isBatchedMesh){if(ge.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?be.get(c).bytesPerElement:1,o=K.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(U,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Ue(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),se===!0&&Ee.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,et(e,t,r),e.side=0,e.needsUpdate=!0,et(e,t,r),e.side=2):et(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Te.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),ce=this.localClippingEnabled,se=Ee.init(this.clippingPlanes,ce),se===!0&&Ee.setGlobalState(this.clippingPlanes,t),D!==null&&De.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];Ue(o,n,t,e),r.add(o)}else Ue(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=K.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}ge.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let We=null;function Ge(e){We&&We(e)}function Ke(){Je.stop()}function qe(){Je.start()}let Je=new bu;Je.setAnimationLoop(Ge),typeof self<`u`&&Je.setContext(self),this.setAnimationLoop=function(e){We=e,Ie.setAnimationLoop(e),e===null?Je.stop():Je.start()},Ie.addEventListener(`sessionstart`,Ke),Ie.addEventListener(`sessionend`,qe),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){ai(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ie.enabled===!0&&Ie.isPresenting===!0,r=w!==null&&(N===null||n)&&w.begin(T,N);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ie.enabled===!0&&Ie.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ie.cameraAutoUpdate===!0&&Ie.updateCamera(t),t=Ie.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,N),x=Te.get(e,C.length),x.init(t),x.state.textureUnits=ve.getTextureUnits(),C.push(x),le.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),oe.setFromProjectionMatrix(le,Xr,t.reversedDepth),ce=this.localClippingEnabled,se=Ee.init(this.clippingPlanes,ce),b=q.get(e,S.length),b.init(),S.push(b),Ie.enabled===!0&&Ie.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&Ye(e,t,-1/0,T.sortObjects)}Ye(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(ne,H),pe=Ie.enabled===!1||Ie.isPresenting===!1||Ie.hasDepthSensing()===!1,pe&&Oe.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),se===!0&&Ee.beginShadows();let i=x.state.shadowsArray;if(De.render(i,e,t),se===!0&&Ee.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Ze(n,r,e,a)}pe&&Oe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Xe(b,e,n,n.viewport)}}else r.length>0&&Ze(n,r,e,t),pe&&Oe.render(e),Xe(b,e,t)}N!==null&&M===0&&(ve.updateMultisampleRenderTarget(N),ve.updateRenderTargetMipmap(N)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ne.resetDefaultState(),P=-1,F=null,C.pop(),C.length>0?(x=C[C.length-1],ve.setTextureUnits(x.state.textureUnits),se===!0&&Ee.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function Ye(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(oe)){r&&de.setFromMatrixPosition(e.matrixWorld).applyMatrix4(le);let i=Se.update(e),a=e.material;a.visible&&b.push(e,i,a,n,de.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(oe))){let i=Se.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),de.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),de.copy(e.boundingSphere.center)),de.applyMatrix4(e.matrixWorld).applyMatrix4(le)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,de.z,s,t)}}else a.visible&&b.push(e,i,a,n,de.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)Ye(i[e],t,n,r)}function Xe(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),se===!0&&Ee.setGlobalState(T.clippingPlanes,n),r&&W.viewport(I.copy(r)),i.length>0&&Qe(i,t,n),a.length>0&&Qe(a,t,n),o.length>0&&Qe(o,t,n),W.buffers.depth.setTest(!0),W.buffers.depth.setMask(!0),W.buffers.color.setMask(!0),W.setPolygonOffset(!1)}function Ze(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=ge.has(`EXT_color_buffer_half_float`)||ge.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new ia(1,1,{generateMipmaps:!0,type:e?Ln:An,minFilter:kn,samples:Math.max(4,_e.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Gi.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||I;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(R),te=T.getClearAlpha(),te<1&&T.setClearColor(16777215,.5),T.clear(),pe&&Oe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),se===!0&&Ee.setGlobalState(T.clippingPlanes,r),Qe(e,n,r),ve.updateMultisampleRenderTarget(a),ve.updateRenderTargetMipmap(a),ge.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,$e(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(ve.updateMultisampleRenderTarget(a),ve.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(R,te),d!==void 0&&(r.viewport=d),T.toneMapping=u}function Qe(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&$e(o,t,n,s,l,c)}}function $e(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function et(e,t,n){t.isScene!==!0&&(t=fe);let r=K.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Ce.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Ce.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=ye.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Be),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return nt(e,s),d}else s.uniforms=Ce.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Ce.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ee.uniform),nt(e,s),r.needsLights=ot(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=gf.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function nt(e,t){let n=K.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function rt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function it(e,t,n,r,i){t.isScene!==!0&&(t=fe),ve.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=N===null?T.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:Gi.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=ye.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=K.get(r),y=x.state.lights;if(se===!0&&(ce===!0||e!==F)){let t=e===F&&r.id===P;Ee.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ee.numPlanes||v.numIntersection!==Ee.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=et(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(W.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==P&&(P=r.id,w=!0),v.needsLights){let e=rt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||F!==e){W.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(U,`projectionMatrix`,e.projectionMatrix),O.setValue(U,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(U,ue.setFromMatrixPosition(e.matrixWorld)),_e.logarithmicDepthBuffer&&O.setValue(U,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(U,`isOrthographic`,e.isOrthographicCamera===!0),F!==e&&(F=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(U,`sunShadowMap`,y.state.sunShadowMap,ve),y.state.directionalShadowMap.length>0&&O.setValue(U,`directionalShadowMap`,y.state.directionalShadowMap,ve),y.state.spotShadowMap.length>0&&O.setValue(U,`spotShadowMap`,y.state.spotShadowMap,ve),y.state.pointShadowMap.length>0&&O.setValue(U,`pointShadowMap`,y.state.pointShadowMap,ve)),i.isSkinnedMesh){O.setOptional(U,i,`bindMatrix`),O.setOptional(U,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(U,`boneTexture`,e.boneTexture,ve))}i.isBatchedMesh&&(O.setOptional(U,i,`batchingTexture`),O.setValue(U,`batchingTexture`,i._matricesTexture,ve),O.setOptional(U,i,`batchingIdTexture`),O.setValue(U,`batchingIdTexture`,i._indirectTexture,ve),O.setOptional(U,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(U,`batchingColorTexture`,i._colorsTexture,ve));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&ke.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(U,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Lp()),w){if(O.setValue(U,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&at(k,E),a&&r.fog===!0&&we.refreshFogUniforms(k,a),we.refreshMaterialUniforms(k,r,V,B,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}gf.upload(U,tt(v),k,ve)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(gf.upload(U,tt(v),k,ve),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(U,`center`,i.center),O.setValue(U,`modelViewMatrix`,i.modelViewMatrix),O.setValue(U,`normalMatrix`,i.normalMatrix),O.setValue(U,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Pe.update(n,S),Pe.bind(n,S)}}return S}function at(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function ot(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(e,t,n){let r=K.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),K.get(e.texture).__webglTexture=t,K.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=K.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){N=e,j=t,M=n;let r=null,i=!1,a=!1;if(e){let o=K.get(e);if(o.__useDefaultFramebuffer!==void 0){W.bindFramebuffer(U.FRAMEBUFFER,o.__webglFramebuffer),I.copy(e.viewport),L.copy(e.scissor),ee=e.scissorTest,W.viewport(I),W.scissor(L),W.setScissorTest(ee),P=-1;return}if(o.__webglFramebuffer===void 0)ve.setupRenderTarget(e);else if(o.__hasExternalTextures)ve.rebindTextures(e,K.get(e.texture).__webglTexture,K.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&K.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);ve.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=K.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&ve.useMultisampledRTT(e)===!1?K.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,I.copy(e.viewport),L.copy(e.scissor),ee=e.scissorTest}else I.copy(re).multiplyScalar(V).floor(),L.copy(ie).multiplyScalar(V).floor(),ee=ae;if(n!==0&&(r=O),W.bindFramebuffer(U.FRAMEBUFFER,r)&&W.drawBuffers(e,r),W.viewport(I),W.scissor(L),W.setScissorTest(ee),i){let r=K.get(e.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=K.get(e.textures[t]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=K.get(e.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,t.__webglTexture,n)}P=-1};function st(e){let t=K.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=_e.textureFormatReadable(e.format),t.__typeReadable=_e.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){ai(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=K.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){W.bindFramebuffer(U.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+s);let u=st(o);if(u.__formatReadable===!1){ai(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){ai(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&U.readPixels(t,n,r,i,Me.convert(c),Me.convert(l),a)}finally{let e=N===null?null:K.get(N).__webglFramebuffer;W.bindFramebuffer(U.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=K.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){W.bindFramebuffer(U.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+s);let d=st(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,f),U.bufferData(U.PIXEL_PACK_BUFFER,a.byteLength,U.STREAM_READ),U.readPixels(t,n,r,i,Me.convert(l),Me.convert(u),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let p=N===null?null:K.get(N).__webglFramebuffer;W.bindFramebuffer(U.FRAMEBUFFER,p);let m=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await si(U,m,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,f),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,a),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(f),U.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;ve.setTexture2D(e,0),U.copyTexSubImage2D(U.TEXTURE_2D,n,0,0,o,s,i,a),W.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Me.convert(t.format),_=Me.convert(t.type),v;t.isData3DTexture?(ve.setTexture3D(t,0),v=U.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(ve.setTexture2DArray(t,0),v=U.TEXTURE_2D_ARRAY):(ve.setTexture2D(t,0),v=U.TEXTURE_2D),W.activeTexture(U.TEXTURE0),W.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,t.flipY),W.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),W.pixelStorei(U.UNPACK_ALIGNMENT,t.unpackAlignment);let y=W.getParameter(U.UNPACK_ROW_LENGTH),b=W.getParameter(U.UNPACK_IMAGE_HEIGHT),x=W.getParameter(U.UNPACK_SKIP_PIXELS),S=W.getParameter(U.UNPACK_SKIP_ROWS),C=W.getParameter(U.UNPACK_SKIP_IMAGES);W.pixelStorei(U.UNPACK_ROW_LENGTH,h.width),W.pixelStorei(U.UNPACK_IMAGE_HEIGHT,h.height),W.pixelStorei(U.UNPACK_SKIP_PIXELS,l),W.pixelStorei(U.UNPACK_SKIP_ROWS,u),W.pixelStorei(U.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=K.get(e),r=K.get(t),h=K.get(n.__renderTarget),g=K.get(r.__renderTarget);W.bindFramebuffer(U.READ_FRAMEBUFFER,h.__webglFramebuffer),W.bindFramebuffer(U.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,K.get(e).__webglTexture,i,d+n),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,K.get(t).__webglTexture,a,m+n)),U.blitFramebuffer(l,u,o,s,f,p,o,s,U.DEPTH_BUFFER_BIT,U.NEAREST);W.bindFramebuffer(U.READ_FRAMEBUFFER,null),W.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||K.has(e)){let n=K.get(e),r=K.get(t);W.bindFramebuffer(U.READ_FRAMEBUFFER,k),W.bindFramebuffer(U.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,n.__webglTexture,i),T?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,r.__webglTexture,a),i===0?T?U.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):U.copyTexSubImage2D(v,a,f,p,l,u,o,s):U.blitFramebuffer(l,u,o,s,f,p,o,s,U.COLOR_BUFFER_BIT,U.NEAREST);W.bindFramebuffer(U.READ_FRAMEBUFFER,null),W.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?U.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?U.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):U.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):U.texSubImage2D(U.TEXTURE_2D,a,f,p,o,s,g,_,h);W.pixelStorei(U.UNPACK_ROW_LENGTH,y),W.pixelStorei(U.UNPACK_IMAGE_HEIGHT,b),W.pixelStorei(U.UNPACK_SKIP_PIXELS,x),W.pixelStorei(U.UNPACK_SKIP_ROWS,S),W.pixelStorei(U.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&U.generateMipmap(v),W.unbindTexture()},this.initRenderTarget=function(e){K.get(e).__webglFramebuffer===void 0&&ve.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?ve.setTextureCube(e,0):e.isData3DTexture?ve.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?ve.setTexture2DArray(e,0):ve.setTexture2D(e,0),W.unbindTexture()},this.resetState=function(){j=0,M=0,N=null,W.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Xr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Gi._getDrawingBufferColorSpace(e),t.unpackColorSpace=Gi._getUnpackColorSpace()}};function zp(e,t){let n=new Rp({canvas:e,antialias:!0});return n.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.setSize(window.innerWidth,window.innerHeight),n.toneMapping=4,n.toneMappingExposure=1,t&&(n.shadowMap.enabled=!0,n.shadowMap.type=2),{renderer:n,resize(){n.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.setSize(window.innerWidth,window.innerHeight)}}}var Bp={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Vp=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Hp=new Zl(-1,1,1,-1,0,1),Up=new class extends Ro{constructor(){super(),this.setAttribute(`position`,new Eo([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new Eo([0,2,0,0,2,0],2))}},Wp=class{constructor(e){this._mesh=new Q(Up,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Hp)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Gp=class extends Vp{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof cl?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=al.clone(e.uniforms),this.material=new cl({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Wp(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Kp=class extends Vp{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},qp=class extends Vp{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Jp=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new J);this._width=n.width,this._height=n.height,t=new ia(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ln}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Gp(Bp),this.copyPass.material.blending=0,this.timer=new iu}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Kp!==void 0&&(r instanceof Kp?n=!0:r instanceof qp&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new J);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Yp={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Z(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},Xp=class e extends Vp{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new J(256,256):new J(e.x,e.y),this.clearColor=new Z(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new ia(i,a,{type:Ln,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new ia(i,a,{type:Ln,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new ia(i,a,{type:Ln,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=Yp;this.highPassUniforms=al.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new cl({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new J(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new Y(1,1,1),new Y(1,1,1),new Y(1,1,1),new Y(1,1,1),new Y(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=al.clone(Bp.uniforms),this.blendMaterial=new cl({uniforms:this.copyUniforms,vertexShader:Bp.vertexShader,fragmentShader:Bp.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Z,this._oldClearAlpha=1,this._basic=new Xo,this._fsQuad=new Wp(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new J(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new cl({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new J(.5,.5)},direction:{value:new J(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new cl({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Xp.BlurDirectionX=new J(1,0),Xp.BlurDirectionY=new J(0,1);var Zp={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Qp=class extends Vp{constructor(){super(),this.isOutputPass=!0,this.uniforms=al.clone(Zp.uniforms),this.material=new ll({name:Zp.name,uniforms:this.uniforms,vertexShader:Zp.vertexShader,fragmentShader:Zp.fragmentShader}),this._fsQuad=new Wp(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Gi.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},$p=new Set;function em(e){$p.add(e)}function tm(e){$p.delete(e)}function nm(){return $p}var rm={void:461069,charcoal:1383204,slate:3818578,ash:8161172,porcelain:15262421,vermilion:16730933,amber:16758344},im={void:395537,charcoal:1186604,slate:3949646,ash:9078397,porcelain:15721419,vermilion:16730933,amber:16758344},am={value:.35},om={value:.12},sm={value:1},cm={value:1.8},lm={value:.82};function um(e,t,n,r){let i=Math.min(Math.max(e,0),1);am.value=i,om.value=i*.34,sm.value=Math.max(t,.05),cm.value=Math.max(n,0),lm.value=Math.max(r,.05)}var dm=13293023,fm=rm.amber,pm=rm.vermilion,mm={void:461586,ash:6715530,architecture:2436925,rimEdge:dm,backgroundNear:1712686,backgroundFar:988445,actorCoat:3950423,actorMetal:15265780,actorGlass:fm,enemyBody:4279132,enemyAccent:pm,bossShell:790550,bossFurnace:16734750,chain:5595503,danger:pm,reward:fm},hm=new Z;function gm(e,t){return t===1?e:(hm.setHex(e),t<1?hm.multiplyScalar(t):hm.lerp(new Z(16777215),Math.min((t-1)*.8,1)),hm.getHex())}function _m(e,t){if(t>=1)return e;hm.setHex(e);let n=hm.r*.299+hm.g*.587+hm.b*.114;return hm.setRGB(n+(hm.r-n)*t,n+(hm.g-n)*t,n+(hm.b-n)*t),hm.getHex()}function vm(e){let t=document.createElement(`canvas`);return t.width=e,t.height=e,t.getContext(`2d`)}function ym(e){let t=new Cs(e.canvas);return t.wrapS=xn,t.wrapT=xn,t.colorSpace=Ur,t.needsUpdate=!0,t}function bm(){let e=vm(128);if(e===null)return null;e.fillStyle=`#b9b9b9`,e.fillRect(0,0,128,128);for(let t=0;t<2600;t++){let t=150+Math.floor(Math.random()*105);e.fillStyle=`rgba(`+t+`,`+t+`,`+t+`,0.35)`,e.fillRect(Math.random()*128,Math.random()*128,1.6,1.6)}for(let t=0;t<26;t++){e.strokeStyle=`rgba(90,90,90,0.16)`,e.lineWidth=.6+Math.random(),e.beginPath();let t=Math.random()*128;e.moveTo(0,t),e.lineTo(128,t+(Math.random()-.5)*12),e.stroke()}return ym(e)}function xm(){let e=vm(128);if(e===null)return null;e.fillStyle=`#c2c2c2`,e.fillRect(0,0,128,128);for(let t=0;t<120;t++){let t=Math.random()*128,n=.6+Math.random()*2.4,r=120+Math.floor(Math.random()*120);e.fillStyle=`rgba(`+r+`,`+Math.floor(r*.9)+`,`+Math.floor(r*.78)+`,0.3)`,e.fillRect(t,0,n,128)}for(let t=0;t<40;t++){e.fillStyle=`rgba(150,96,54,0.09)`;let t=Math.random()*128,n=Math.random()*128;e.fillRect(t,n,2+Math.random()*10,1+Math.random()*26)}return ym(e)}function Sm(){let e=vm(128);if(e===null)return null;let t=e.createRadialGradient(64,64,4,64,64,64);return t.addColorStop(0,`#ffffff`),t.addColorStop(.45,`#ffd9a0`),t.addColorStop(1,`#9d5f22`),e.fillStyle=t,e.fillRect(0,0,128,128),ym(e)}var Cm=256;function wm(e,t,n){let r=e*374761393+t*668265263+n*1442695040;return r=(r^r>>>13)>>>0,r=Math.imul(r,1274126177)>>>0,((r^r>>>16)>>>0)/4294967296}function Tm(e){return e*e*(3-2*e)}function Em(e,t,n,r){let i=e*n,a=t*n,o=Math.floor(i),s=Math.floor(a),c=Tm(i-o),l=Tm(a-s),u=(o%n+n)%n,d=(s%n+n)%n,f=(u+1)%n,p=(d+1)%n,m=wm(u,d,r),h=wm(f,d,r),g=wm(u,p,r),_=wm(f,p,r),v=m+(h-m)*c;return v+(g+(_-g)*c-v)*l}function Dm(e,t,n,r){let i=0,a=0,o=1;for(let s of r)i+=Em(e,t,s,n+s)*o,a+=o,o*=.55;return i/a}function Om(e,t){let n=Cm;for(let e=-1;e<=1;e++)for(let r=-1;r<=1;r++)t(e*n,r*n)}function km(e){let t=new Cs(e.canvas);return t.wrapS=xn,t.wrapT=xn,t.colorSpace=``,t.anisotropy=4,t.needsUpdate=!0,t}function Am(){let e=vm(Cm);if(e===null)return null;let t=e.createImageData(Cm,Cm),n=t.data;for(let e=0;e<Cm;e++)for(let t=0;t<Cm;t++){let r=t/Cm,i=e/Cm,a=Dm(r,i,11,[4,8,16]),o=Dm(r,i,29,[32,64]),s=.62+a*.24+o*.14,c=Math.round(Math.min(Math.max(s,0),1)*255),l=(e*Cm+t)*4;n[l]=c,n[l+1]=c,n[l+2]=c,n[l+3]=255}e.putImageData(t,0,0),e.lineCap=`round`;for(let t=0;t<22;t++){let n=wm(t,3,91)*Cm,r=wm(t,7,91)*Cm,i=12+wm(t,11,91)*46,a=wm(t,13,91)*Math.PI;e.strokeStyle=wm(t,17,91)>.5?`rgba(58,58,58,0.30)`:`rgba(235,235,235,0.22)`,e.lineWidth=.8+wm(t,19,91)*2.2,Om(e,(t,o)=>{e.beginPath(),e.moveTo(n+t,r+o),e.lineTo(n+t+Math.cos(a)*i,r+o+Math.sin(a)*i),e.stroke()})}for(let t=0;t<14;t++){let n=wm(t,23,77)*Cm,r=wm(t,29,77)*Cm,i=2+wm(t,31,77)*6;e.fillStyle=`rgba(40,40,40,0.24)`,Om(e,(a,o)=>{e.beginPath(),e.ellipse(n+a,r+o,i,i*.6,wm(t,37,77)*Math.PI,0,Math.PI*2),e.fill()})}return km(e)}function jm(){let e=vm(Cm);if(e===null)return null;let t=e.createImageData(Cm,Cm),n=t.data;for(let e=0;e<Cm;e++)for(let t=0;t<Cm;t++){let r=t/Cm,i=e/Cm,a=Dm(r*6,i*.35,5,[8,16,32]),o=Dm(r,i,41,[64]),s=.66+a*.24+o*.1,c=Math.round(Math.min(Math.max(s,0),1)*255),l=(e*Cm+t)*4;n[l]=c,n[l+1]=c,n[l+2]=c,n[l+3]=255}e.putImageData(t,0,0);for(let t=0;t<18;t++){let n=wm(t,5,53)*Cm,r=wm(t,9,53)*Cm,i=2.4+wm(t,15,53)*2.2;Om(e,(t,a)=>{let o=e.createRadialGradient(n+t-i*.3,r+a-i*.3,0,n+t,r+a,i);o.addColorStop(0,`rgba(255,255,255,0.34)`),o.addColorStop(.62,`rgba(150,150,150,0.14)`),o.addColorStop(1,`rgba(48,48,48,0.30)`),e.fillStyle=o,e.beginPath(),e.arc(n+t,r+a,i,0,Math.PI*2),e.fill()})}return km(e)}function Mm(){let e=vm(Cm);if(e===null)return null;let t=e.createImageData(Cm,Cm),n=t.data;for(let e=0;e<Cm;e++)for(let t=0;t<Cm;t++){let r=Dm(t/Cm,e/Cm,61,[32,64]),i=wm(t,e,97),a=.68+r*.18+i*.08,o=Math.round(Math.min(Math.max(a,0),1)*255),s=(e*Cm+t)*4;n[s]=o,n[s+1]=o,n[s+2]=o,n[s+3]=255}return e.putImageData(t,0,0),km(e)}var Nm={void:`stone`,ash:`stone`,architecture:`stone`,backgroundNear:`stone`,backgroundFar:`stone`,rimEdge:`stone`,chain:`metal`,bossShell:`metal`,actorMetal:`metal`,actorCoat:`metal`,enemyBody:`metal`};function Pm(e,t,n,r){e.onBeforeCompile=e=>{e.uniforms.uGrainMap={value:t},e.uniforms.uGrainAmount=n,e.uniforms.uGrainScale=sm,e.uniforms.uGrainContrast=cm,e.uniforms.uGrainNormalizer=lm,e.vertexShader=(`varying vec3 vGrainPos;
`+e.vertexShader).replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vGrainPos = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;`);let i=r?`vec2 gUv = vGrainPos.xy * 0.11 * uGrainScale;`:`vec2 gUv = vGrainPos.xy * 0.35 * uGrainScale;`;e.fragmentShader=(`varying vec3 vGrainPos;
uniform sampler2D uGrainMap;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainContrast;
uniform float uGrainNormalizer;
`+e.fragmentShader).replace(`#include <map_fragment>`,[i,`vec3 gTex = texture2D( uGrainMap, gUv ).rgb / uGrainNormalizer;`,`gTex = vec3( 1.0 ) + ( gTex - vec3( 1.0 ) ) * uGrainContrast;`,`vec3 gMul = clamp( mix( vec3( 1.0 ), gTex, uGrainAmount ), vec3( 0.35 ), vec3( 1.6 ) );`,`diffuseColor.rgb *= pow( gMul, vec3( 2.2 ) );`].join(`
`))},e.customProgramCacheKey=()=>r?`omr-grain-world`:`omr-grain-local`,e.needsUpdate=!0}function Fm(e,t){let n=Math.max(2,Math.min(Math.round(e),8)),r=t===null?n:t.length,i=new Uint8Array(r);for(let e=0;e<r;e++){let r=t===null?(e+1)/n:t[e]??1;i[e]=Math.round(Math.min(Math.max(r,0),1)*255)}let a=new us(i,r,1,Jn);return a.minFilter=wn,a.magFilter=wn,a.generateMipmaps=!1,a.colorSpace=``,a.needsUpdate=!0,a}function Im(e,t,n,r){let i=Math.min(r,e*.28,t*.28,n*.28);if(i<=.004)return new Ds(e,t,n);let a=e*.5-i,o=t*.5-i,s=Math.max(n-i*2,.001),c=new oc;c.moveTo(-a,-o),c.lineTo(a,-o),c.lineTo(a,o),c.lineTo(-a,o),c.closePath();let l=new Wc(c,{depth:s,bevelEnabled:!0,bevelThickness:i,bevelSize:i,bevelSegments:2,curveSegments:1});return l.translate(0,0,-s*.5),l}function Lm(e,t,n){let r=Math.min(Math.max(n,0),1);return hm.setHex(e).lerp(new Z(t),r),hm.getHex()}var Rm=Lm(725017,im.void,l.feel.farFieldDarken);function zm(e){let t=(e>>16&255)/255,n=(e>>8&255)/255,r=(e&255)/255;return t*.299+n*.587+r*.114}function Bm(e,t){if(t===void 0)return 0;let n=zm(e.charcoal),r=zm(t);if(r<=n)return 0;let i=Math.max(zm(e.ash)-n,1e-4);return Math.min((r-n)/i,1)}function Vm(e,t,n){let r=Lm(e.void,e.charcoal,t);if(n===void 0)return r;let i=Bm(e,n);return i<=0?r:Lm(r,n,Math.min(.3+.5*i,1))}function Hm(e,t){if(t===void 0)return e.void;let n=Bm(e,t);return n<=0?e.void:Lm(e.void,t,Math.min(.18+.3*n,1))}var Um={baseline:{id:`baseline`,name:`Baseline`,palette:mm,lights:{hemiSky:7311295,hemiGround:658708,hemiIntensity:1,key:{color:16770764,intensity:1,x:-10,y:14,z:12},fill:{color:7312328,intensity:1,x:9,y:3,z:14},rim:null,spot:null},fog:{enabled:!0,nearScale:1,farScale:1,saturation:1,colorOverride:null},postfx:{bloomScale:1,vignetteScale:1,outlineActors:!1,outlineArchitecture:!1,toon:!1,toneMapped:!0},shadows:!1,glowAdditive:!0,bevel:0,depthDesaturate:0,ambienceSaturation:1,ambienceIntensityScale:1,rigMix:0,textured:!1,smooth:!1,specular:!1,toonLevels:null},a:{id:`a`,name:`Illustrated fable`,palette:{void:988445,ash:7042951,architecture:3096145,rimEdge:13819110,backgroundNear:2173752,backgroundFar:1449255,actorCoat:4477025,actorMetal:15129026,actorGlass:16763001,enemyBody:4871268,enemyAccent:pm,bossShell:1382687,bossFurnace:16742958,chain:7042951,danger:pm,reward:16761446},lights:{hemiSky:9417956,hemiGround:1778480,hemiIntensity:1.05,key:{color:16773340,intensity:1,x:-12,y:13,z:12},fill:{color:7181260,intensity:1.6,x:10,y:2,z:13},rim:{color:16751178,intensity:.26,x:4,y:6,z:-12},spot:null},fog:{enabled:!0,nearScale:.8,farScale:.95,saturation:.9,colorOverride:null},postfx:{bloomScale:.68,vignetteScale:1.05,outlineActors:!1,outlineArchitecture:!1,toon:!1,toneMapped:!0},shadows:!1,glowAdditive:!0,bevel:0,depthDesaturate:.45,ambienceSaturation:1,ambienceIntensityScale:1.05,rigMix:.62,textured:!0,smooth:!0,specular:!1,toonLevels:null},b:{id:`b`,name:`Miniature theatre`,palette:{void:1909547,ash:9277333,architecture:4015440,rimEdge:12896717,backgroundNear:2830907,backgroundFar:1909547,actorCoat:4936545,actorMetal:14206874,actorGlass:16761968,enemyBody:5594474,enemyAccent:14832703,bossShell:2237996,bossFurnace:16747066,chain:9277333,danger:14832703,reward:15774814},lights:{hemiSky:10135739,hemiGround:2827552,hemiIntensity:.75,key:{color:16769717,intensity:1.55,x:-11,y:15,z:10},fill:{color:9085117,intensity:.7,x:8,y:2,z:12},rim:{color:10470655,intensity:1.1,x:2,y:8,z:-14},spot:{color:16768168,intensity:90,x:-8,y:16,z:9}},fog:{enabled:!0,nearScale:1.2,farScale:1.15,saturation:.75,colorOverride:null},postfx:{bloomScale:.55,vignetteScale:.85,outlineActors:!1,outlineArchitecture:!1,toon:!1,toneMapped:!0},shadows:!0,glowAdditive:!1,bevel:.06,depthDesaturate:.2,ambienceSaturation:.7,ambienceIntensityScale:.9,rigMix:.7,textured:!1,smooth:!1,specular:!0,toonLevels:null},c:{id:`c`,name:`Graphic monochrome`,palette:{void:im.void,ash:im.ash,architecture:im.slate,rimEdge:im.porcelain,backgroundNear:im.charcoal,backgroundFar:Rm,actorCoat:im.slate,actorMetal:im.porcelain,actorGlass:im.amber,enemyBody:im.slate,enemyAccent:im.vermilion,bossShell:im.charcoal,bossFurnace:im.amber,chain:im.ash,danger:im.vermilion,reward:im.amber},ramp:im,lights:{hemiSky:im.ash,hemiGround:im.void,hemiIntensity:.55,key:{color:16774374,intensity:.62,x:-3,y:14,z:7},fill:{color:9414340,intensity:.12,x:9,y:2,z:10},rim:null,spot:null},fog:{enabled:!0,nearScale:1,farScale:1,saturation:0,colorOverride:im.void},postfx:{bloomScale:.1,vignetteScale:1.5,outlineActors:!1,outlineArchitecture:!1,toon:!0,toneMapped:!1},shadows:!1,glowAdditive:!1,bevel:0,depthDesaturate:1,ambienceSaturation:0,ambienceIntensityScale:1,rigMix:1,textured:!1,grain:!0,smooth:!1,specular:!1,toonLevels:[.55,.55,.55,.55,.86,.86,.86,1]}};function Wm(e,t){let n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;e.textured&&(n=bm(),r=xm(),i=Sm()),e.grain===!0&&(s=Am(),c=jm(),l=Mm()),e.postfx.toon&&(a=Fm(t,e.toonLevels));function u(t,n){if(e.grain!==!0)return null;let r=n!==void 0&&n!==`none`?n:Nm[t];return r===`stone`?s:r===`metal`?c:null}function d(t){return e.textured?t===`stone`?n:t===`metal`?r:t===`glass`?i:null:null}function f(t,n){return gm(e.palette[t],n===void 0?1:n)}function p(t,n){let r=n===void 0?{}:n,i=f(t,r.shade),o=r.doubleSide===!0?2:0,s=r.emissiveColor===void 0?i:r.emissiveColor;if(r.emissiveMix!==void 0){let e=Math.min(Math.max(r.emissiveMix,0),1);hm.setHex(i).lerp(new Z(s),e),s=hm.getHex()}let c=r.emissiveIntensity===void 0?0:r.emissiveIntensity,p=r.fog===void 0||r.fog;if(r.unlit===!0){let e=new Xo({color:i,side:o,fog:p});return l!==null&&r.fog!==!1&&Pm(e,l,om,!1),e}if(e.postfx.toon&&a!==null){let e=new dl({color:i,gradientMap:a,emissive:s,emissiveIntensity:c,side:o,fog:p}),n=u(t,r.texture);return n!==null&&Pm(e,n,am,!0),e}let m=d(r.texture===void 0?`none`:r.texture),h=new ul({color:i,emissive:s,emissiveIntensity:c,roughness:r.roughness===void 0?e.specular?.34:.8:r.roughness,metalness:r.metalness===void 0?e.specular?.55:.15:r.metalness,flatShading:!e.smooth,side:o,fog:p});if(m!==null){let e=r.repeat===void 0?1:r.repeat,t=m.clone();t.needsUpdate=!0,t.wrapS=xn,t.wrapT=xn,t.repeat.set(e,e),h.map=t}return h}function m(e,t){return p(e,{...t===void 0?{}:t,unlit:!1})}let h=[[0,e.palette.backgroundNear],[.3,e.palette.architecture],[.55,gm(e.palette.reward,.5)],[.8,e.palette.reward],[1,e.palette.danger]],g=new Z,_=new Z;function v(t){let n=Math.min(Math.max(t,0),1);for(let e=1;e<h.length;e++){let t=h[e-1],r=h[e];if(t===void 0||r===void 0||n>r[0])continue;let i=Math.max(r[0]-t[0],1e-4);return g.setHex(t[1]),_.setHex(r[1]),g.lerp(_,(n-t[0])/i).getHex()}return e.palette.danger}function y(t,n){return new Xo({color:t,transparent:!0,opacity:e.glowAdditive?n:n*.7,depthWrite:!1,blending:e.glowAdditive?2:1,vertexColors:!0,side:2})}function b(t,n,r){return e.bevel<=0?new Ds(t,n,r):Im(t,n,r,e.bevel)}function x(){return!e.postfx.outlineActors&&!e.postfx.outlineArchitecture?null:(o===null&&(o=new Xo({color:e.palette.void,side:1,fog:!1})),o)}return{id:e.id,name:e.name,palette:e.palette,ramp:e.ramp===void 0?rm:e.ramp,lights:e.lights,fog:e.fog,postfx:e.postfx,shadows:e.shadows,glowAdditive:e.glowAdditive,bevel:e.bevel,depthDesaturate:e.depthDesaturate,ambienceSaturation:e.ambienceSaturation,ambienceIntensityScale:e.ambienceIntensityScale,rigMix:e.rigMix,actorLayer:1,material:p,litMaterial:m,heat:v,glowMaterial:y,boxGeometry:b,outlineMaterial:x,colorOf:f}}function Gm(e,t,n){if(!n.postfx.outlineActors)return;let r=n.outlineMaterial();if(r===null)return;let i=[];e.traverse(e=>{let t=e;t.isMesh===!0&&t.userData.outline!==!0&&i.push(t)});for(let e of i){let n=new Q(e.geometry,r);n.userData.outline=!0,n.scale.setScalar(1+t),n.renderOrder=-1,n.layers.mask=e.layers.mask,e.add(n)}}function Km(e,t){return _m(e,t)}function qm(e,t){return gm(e,t)}function Jm(){let e=`c`;if(typeof location<`u`){let t=new URLSearchParams(location.search).get(`look`);(t===`a`||t===`b`||t===`c`||t===`baseline`)&&(e=t)}return e}function Ym(){return Um[Jm()].palette.void}function Xm(e){let t=Um[Jm()];return Wm(t,e)}function Zm(e){if(typeof document>`u`||typeof location>`u`)return;let t=new URLSearchParams(location.search);if(t.get(`look`)===null||t.get(`screenshot`)===`1`||document.getElementById(`look-bar`)!==null)return;let n=document.createElement(`div`);n.id=`look-bar`,n.style.cssText=[`position:fixed`,`left:50%`,`bottom:18px`,`transform:translateX(-50%)`,`display:flex`,`gap:8px`,`padding:8px 10px`,`background:rgba(7,9,13,0.86)`,`border:1px solid rgba(232,226,213,0.25)`,`font-family:ui-monospace,monospace`,`font-size:12px`,`letter-spacing:0.08em`,`z-index:40`].join(`;`);for(let t of[`a`,`b`,`c`]){let r=document.createElement(`button`);r.textContent=Um[t].name;let i=t===e;r.style.cssText=[`cursor:pointer`,`padding:6px 12px`,`border:1px solid `+(i?`#ffb648`:`rgba(232,226,213,0.3)`),`background:`+(i?`rgba(255,182,72,0.18)`:`transparent`),`color:`+(i?`#ffb648`:`#e8e2d5`),`font:inherit`].join(`;`),r.addEventListener(`click`,()=>{let e=new URLSearchParams(location.search);e.set(`look`,t),location.search=e.toString()}),n.appendChild(r)}document.body.appendChild(n)}var Qm=48,$m=[`varying vec2 vUv;`,`void main() {`,`  vUv = uv;`,`  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);`,`}`].join(`
`),eh=[`uniform float uNear;`,`uniform float uFar;`,`float eyeDepth(sampler2D tex, vec2 uv) {`,`  float d = texture2D(tex, uv).x;`,`  return -((uNear * uFar) / ((uFar - uNear) * d - uFar));`,`}`].join(`
`),th={uniforms:{tDiffuse:{value:null},tDepth:{value:null},uTexel:{value:new J(1/1280,1/720)},uThickness:{value:1},uThreshold:{value:.2},uOpacity:{value:.85},uScale:{value:.02},uInk:{value:new Z(395537)},uNear:{value:.1},uFar:{value:400}},vertexShader:$m,fragmentShader:[`uniform sampler2D tDiffuse;`,`uniform sampler2D tDepth;`,`uniform vec2 uTexel;`,`uniform float uThickness;`,`uniform float uThreshold;`,`uniform float uOpacity;`,`uniform float uScale;`,`uniform vec3 uInk;`,`varying vec2 vUv;`,eh,`void main() {`,`  vec4 base = texture2D(tDiffuse, vUv);`,`  vec2 o = uTexel * max(uThickness, 0.35);`,`  float c  = eyeDepth(tDepth, vUv);`,`  float tl = eyeDepth(tDepth, vUv + vec2(-o.x,  o.y));`,`  float tc = eyeDepth(tDepth, vUv + vec2( 0.0,  o.y));`,`  float tr = eyeDepth(tDepth, vUv + vec2( o.x,  o.y));`,`  float ml = eyeDepth(tDepth, vUv + vec2(-o.x,  0.0));`,`  float mr = eyeDepth(tDepth, vUv + vec2( o.x,  0.0));`,`  float bl = eyeDepth(tDepth, vUv + vec2(-o.x, -o.y));`,`  float bc = eyeDepth(tDepth, vUv + vec2( 0.0, -o.y));`,`  float br = eyeDepth(tDepth, vUv + vec2( o.x, -o.y));`,`  float gx = (tl + 2.0 * ml + bl) - (tr + 2.0 * mr + br);`,`  float gy = (tl + 2.0 * tc + tr) - (bl + 2.0 * bc + br);`,`  float mag = sqrt(gx * gx + gy * gy);`,`  float rel = mag / max(c, 0.001);`,`  float t0 = max(uThreshold, 0.001) * max(uScale, 0.0001);`,`  float edge = smoothstep(t0, t0 * 4.0, rel);`,`  gl_FragColor = vec4(mix(base.rgb, uInk, edge * uOpacity), base.a);`,`}`].join(`
`)},nh={uniforms:{tDiffuse:{value:null},uThreshold:{value:.38},uTexel:{value:new J(1/640,1/360)}},vertexShader:$m,fragmentShader:[`uniform sampler2D tDiffuse;`,`uniform float uThreshold;`,`uniform vec2 uTexel;`,`varying vec2 vUv;`,`vec3 lit(vec2 uv) {`,`  vec3 c = texture2D(tDiffuse, uv).rgb;`,`  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));`,`  float warm = smoothstep(0.02, 0.22, c.r - c.b);`,`  return c * smoothstep(uThreshold, uThreshold + 0.4, l) * warm;`,`}`,`void main() {`,`  vec2 o = uTexel * 2.6;`,`  vec3 sum = lit(vUv) * 4.0;`,`  sum += lit(vUv + vec2( o.x, 0.0)) * 2.0;`,`  sum += lit(vUv + vec2(-o.x, 0.0)) * 2.0;`,`  sum += lit(vUv + vec2(0.0,  o.y)) * 2.0;`,`  sum += lit(vUv + vec2(0.0, -o.y)) * 2.0;`,`  sum += lit(vUv + o) + lit(vUv - o) + lit(vUv + vec2(o.x, -o.y)) + lit(vUv + vec2(-o.x, o.y));`,`  gl_FragColor = vec4(sum / 16.0, 1.0);`,`}`].join(`
`)},rh={uniforms:{tDiffuse:{value:null},tBright:{value:null},uDir:{value:new J(0,-1)},uStrength:{value:.35},uDecay:{value:.94},uSamples:{value:24},uGain:{value:3.2}},vertexShader:$m,fragmentShader:[`uniform sampler2D tDiffuse;`,`uniform sampler2D tBright;`,`uniform vec2 uDir;`,`uniform float uStrength;`,`uniform float uDecay;`,`uniform float uSamples;`,`uniform float uGain;`,`varying vec2 vUv;`,`void main() {`,`  vec4 base = texture2D(tDiffuse, vUv);`,`  float n = max(uSamples, 1.0);`,`  vec2 stepUv = uDir / n;`,`  vec3 sum = vec3(0.0);`,`  float w = 1.0;`,`  float total = 0.0;`,`  for (int i = 0; i < 48; i++) {`,`    float t = float(i);`,`    if (t >= n) break;`,`    float k = t / n;`,`    vec2 uv = vUv - stepUv * t;`,`    sum += texture2D(tBright, uv).rgb * w;`,`    total += w;`,`    w *= uDecay;`,`  }`,`  sum /= max(total, 0.0001);`,`  gl_FragColor = vec4(base.rgb + sum * uStrength * uGain, base.a);`,`}`].join(`
`)},ih={uniforms:{tDiffuse:{value:null},tDepth:{value:null},uFocus:{value:15},uAperture:{value:.012},uMaxBlur:{value:.006},uAspect:{value:16/9},uGain:{value:4},uTaps:{value:16},uNear:{value:.1},uFar:{value:400}},vertexShader:$m,fragmentShader:[`uniform sampler2D tDiffuse;`,`uniform sampler2D tDepth;`,`uniform float uFocus;`,`uniform float uAperture;`,`uniform float uMaxBlur;`,`uniform float uAspect;`,`uniform float uGain;`,`uniform float uTaps;`,`varying vec2 vUv;`,eh,`void main() {`,`  float dist = eyeDepth(tDepth, vUv);`,`  float coc = clamp(abs(dist - uFocus) * uAperture * uGain, 0.0, 1.0) * uMaxBlur;`,`  vec4 base = texture2D(tDiffuse, vUv);`,`  if (coc < 0.0004) {`,`    gl_FragColor = base;`,`    return;`,`  }`,`  vec2 scale = vec2(1.0 / uAspect, 1.0);`,`  vec3 sum = base.rgb;`,`  float total = 1.0;`,`  float n = max(uTaps, 1.0);`,`  for (int i = 1; i <= 16; i++) {`,`    float t = float(i);`,`    if (t > n) break;`,`    float a = t * 2.39996323;`,`    float r = sqrt(t / n);`,`    vec2 off = vec2(cos(a), sin(a)) * r * coc * scale;`,`    sum += texture2D(tDiffuse, vUv + off).rgb;`,`    total += 1.0;`,`  }`,`  gl_FragColor = vec4(sum / total, base.a);`,`}`].join(`
`)},ah={uniforms:{tDiffuse:{value:null},uAmount:{value:.08},uTime:{value:0},uResolution:{value:new J(1280,720)}},vertexShader:$m,fragmentShader:[`uniform sampler2D tDiffuse;`,`uniform float uAmount;`,`uniform float uTime;`,`uniform vec2 uResolution;`,`varying vec2 vUv;`,`float hash12(vec2 p) {`,`  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);`,`}`,`void main() {`,`  vec4 c = texture2D(tDiffuse, vUv);`,`  if (uAmount <= 0.0001) {`,`    gl_FragColor = c;`,`    return;`,`  }`,`  float n = hash12(floor(vUv * uResolution) + vec2(uTime, uTime * 1.7)) - 0.5;`,`  vec3 g = pow(max(c.rgb, vec3(0.0)), vec3(0.4545454));`,`  float luma = dot(g, vec3(0.2126, 0.7152, 0.0722));`,`  g += n * uAmount * (0.22 + 1.1 * luma * (1.0 - luma * 0.6));`,`  gl_FragColor = vec4(pow(max(g, vec3(0.0)), vec3(2.2)), c.a);`,`}`].join(`
`)},oh={uniforms:{tDiffuse:{value:null},strength:{value:.55},softness:{value:.45}},vertexShader:$m,fragmentShader:[`uniform sampler2D tDiffuse;`,`uniform float strength;`,`uniform float softness;`,`varying vec2 vUv;`,`void main() {`,`  vec4 color = texture2D(tDiffuse, vUv);`,`  vec2 d = vUv - vec2(0.5);`,`  float r = length(d) * 1.41421356;`,`  float edge = smoothstep(1.0 - softness, 1.0, r);`,`  color.rgb *= 1.0 - edge * strength;`,`  gl_FragColor = color;`,`}`].join(`
`)},sh={uniforms:{tDiffuse:{value:null}},vertexShader:$m,fragmentShader:[`uniform sampler2D tDiffuse;`,`varying vec2 vUv;`,`void main() {`,`  gl_FragColor = texture2D(tDiffuse, vUv);`,`}`].join(`
`)},ch=class extends Vp{target;scene;camera;copyMaterial;copyUniforms;quad;constructor(e,t,n,r){super(),this.needsSwap=!1,this.scene=e,this.camera=t,this.target=new ia(n,r,{type:Ln,depthTexture:uh(n,r)}),this.copyMaterial=new cl({uniforms:al.clone(sh.uniforms),vertexShader:sh.vertexShader,fragmentShader:sh.fragmentShader,depthTest:!1,depthWrite:!1}),this.copyUniforms=this.copyMaterial.uniforms.tDiffuse,this.copyUniforms.value=this.target.texture,this.quad=new Wp(this.copyMaterial)}get depth(){return this.target.depthTexture??null}setSize(e,t){this.target.setSize(Math.max(e,2),Math.max(t,2))}render(e,t,n){e.setRenderTarget(this.target),e.render(this.scene,this.camera),e.setRenderTarget(this.renderToScreen?null:n),this.quad.render(e)}dispose(){this.target.dispose(),this.copyMaterial.dispose(),this.quad.dispose()}},lh=class extends Vp{scene;camera;actorLayer;world;bright;brightMaterial;shaftMaterial;brightUniforms;shaftUniforms;brightQuad;shaftQuad;scratchDir=new J;hidden=[];width=1280;height=720;quality=1;constructor(e,t,n,r,i){super(),this.needsSwap=!0,this.scene=e,this.camera=t,this.actorLayer=n,this.width=r,this.height=i;let a=Math.max(Math.round(r*.25),16),o=Math.max(Math.round(i*.25),16);this.world=new ia(a,o,{type:Ln,depthBuffer:!0,stencilBuffer:!1}),this.world.texture.minFilter=Dn,this.world.texture.magFilter=Dn,this.bright=new ia(a,o,{type:Ln,depthBuffer:!1,stencilBuffer:!1}),this.bright.texture.minFilter=Dn,this.bright.texture.magFilter=Dn,this.bright.texture.wrapS=Sn,this.bright.texture.wrapT=Sn,this.brightMaterial=new cl({uniforms:al.clone(nh.uniforms),vertexShader:nh.vertexShader,fragmentShader:nh.fragmentShader,depthTest:!1,depthWrite:!1}),this.shaftMaterial=new cl({uniforms:al.clone(rh.uniforms),vertexShader:rh.vertexShader,fragmentShader:rh.fragmentShader,depthTest:!1,depthWrite:!1}),this.brightUniforms=this.brightMaterial.uniforms,this.shaftUniforms=this.shaftMaterial.uniforms,this.brightQuad=new Wp(this.brightMaterial),this.shaftQuad=new Wp(this.shaftMaterial)}configure(e,t,n){this.brightUniforms.uThreshold.value=Math.max(e.shaftThreshold,.001),this.shaftUniforms.uStrength.value=e.shaftStrength,this.shaftUniforms.uGain.value=Math.max(e.shaftGain,0),this.shaftUniforms.uDecay.value=Math.min(Math.max(e.shaftDecay,.5),.999),this.shaftUniforms.uSamples.value=Math.min(Math.max(Math.round(e.shaftSamples*t),4),Qm),this.applyDirection(n,e.shaftLength),this.enabled=e.shaftStrength>5e-4,t!==this.quality&&(this.quality=t,this.resizeBright())}applyDirection(e,t){let n=this.width/Math.max(this.height,1),r=this.scratchDir.set(e,-1).normalize().multiplyScalar(Math.max(t,0));r.x/=Math.max(n,1e-4),this.shaftUniforms.uDir.value.copy(r)}resizeBright(){let e=.25*Math.min(Math.max(this.quality,.25),1),t=Math.max(Math.round(this.width*e),16),n=Math.max(Math.round(this.height*e),16);this.world.setSize(t,n),this.bright.setSize(t,n),this.brightUniforms.uTexel.value.set(1/t,1/n)}setSize(e,t){this.width=e,this.height=t,this.resizeBright()}render(e,t,n){let r=e.getRenderTarget(),i=e.autoClear,a=this.camera.layers.mask,o=nm();for(let e of o)e.visible&&this.hidden.push(e);for(let e of this.hidden)e.visible=!1;e.autoClear=!0,this.camera.layers.disable(this.actorLayer),e.setRenderTarget(this.world),e.render(this.scene,this.camera),this.camera.layers.mask=a,e.autoClear=i;for(let e of this.hidden)e.visible=!0;this.hidden.length=0,this.brightUniforms.tDiffuse.value=this.world.texture,e.setRenderTarget(this.bright),e.clear(),this.brightQuad.render(e),this.shaftUniforms.tDiffuse.value=n.texture,this.shaftUniforms.tBright.value=this.bright.texture,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear()),this.shaftQuad.render(e),e.setRenderTarget(r)}dispose(){this.world.dispose(),this.bright.dispose(),this.brightMaterial.dispose(),this.shaftMaterial.dispose(),this.brightQuad.dispose(),this.shaftQuad.dispose()}};function uh(e,t){let n=new ws(e,t);return n.format=Kn,n.type=Fn,n.minFilter=wn,n.magFilter=wn,n}function dh(e,t,n,r,i){let a=e.getDrawingBufferSize(new J),o=Math.max(Math.round(a.x),2),s=Math.max(Math.round(a.y),2),c=new Jp(e),l=new ch(t,n,o,s);c.addPass(l);let u=new Gp(th),d=u.uniforms;d.uInk.value.setHex(Ym()),d.tDepth.value=l.depth,c.addPass(u);let f=new lh(t,n,1,o,s);f.setSize(o,s),c.addPass(f);let p=new Xp(new J(o,s),.9,.4,.7);c.addPass(p);let m=new Gp(ih),h=m.uniforms;h.tDepth.value=l.depth,c.addPass(m);let g=new Gp(ah),_=g.uniforms;c.addPass(g);let v=new Gp(oh),y=v.uniforms.strength,b=v.uniforms.softness;c.addPass(v),c.addPass(new Qp);let x=n,S=o,C=s;function w(e,t){S=Math.max(e,2),C=Math.max(t,2),d.uTexel.value.set(1/S,1/C),_.uResolution.value.set(S,C),h.uAspect.value=S/C}return w(o,s),{sync(e,t){um(e.textureGrain,e.textureScale,e.textureContrast,e.textureNormalizer);let n=Math.min(Math.max(e.fxQuality,.25),1),a=x.near===void 0?.1:x.near,o=x.far===void 0?400:x.far;d.uThickness.value=Math.max(e.inkThickness,0),d.uThreshold.value=Math.max(e.inkThreshold,.001),d.uOpacity.value=Math.min(Math.max(e.inkOpacity,0),1),d.uScale.value=Math.max(e.inkThresholdScale,1e-4),d.uNear.value=a,d.uFar.value=o,u.enabled=e.inkOpacity>5e-4&&e.inkThickness>0,f.configure(e,n,t===void 0?e.shaftDirX:t),p.strength=e.bloomStrength*r,p.radius=e.bloomRadius,p.threshold=e.bloomThreshold,h.uFocus.value=Math.max(x.position.z,.1),h.uAperture.value=Math.max(e.dofAperture,0),h.uMaxBlur.value=Math.max(e.dofMaxBlur,0),h.uGain.value=Math.max(e.dofGain,0),h.uTaps.value=n<.999?8:16,h.uNear.value=a,h.uFar.value=o,m.enabled=e.dofMaxBlur>1e-5&&e.dofAperture>0,_.uAmount.value=Math.max(e.grainAmount,0),_.uTime.value=performance.now()*.06%4096,g.enabled=e.grainAmount>5e-4,y.value=e.vignetteStrength*i,b.value=Math.max(e.vignetteSoftness,.01)},render(){c.render()},setSize(e,t){c.setSize(e,t),d.tDepth.value=l.depth,h.tDepth.value=l.depth,w(e,t)}}}var fh=0,ph=1,mh=2,hh=3,gh=4,_h=-6,vh=.008,yh=.008,bh=.016,xh={belfry:!0,cache:!0,vault:!0,sunwell:!0},Sh={reserve:!0,lenshall:!0},Ch=13162212,wh=11980258,Th=64,Eh=.5,Dh=1.3,Oh=[`stair`,`gallery`,`beam`,`bench`,`crate`,`wall`];function kh(e,t){let n=[];for(let r=0;r<=12;r++){let i=r/12,a=Math.sin(Math.PI*(.14+i*.74));n.push(new J(e*(.5+.5*a),i*t))}return n}function Ah(e,t){let n=[];for(let r=0;r<=10;r++){let i=r/10,a=(.5-.42*i**1.7)*e*t;n.push(new J(Math.max(a,.02*e),i*e))}return n.push(new J(.06*e,e*1.06)),n}function jh(e){let t=Math.floor(Math.abs(e)*1013+7)%2147483647;return t<=0&&(t=11),()=>(t=t*48271%2147483647,(t-1)/2147483646)}function Mh(e,t,n){return t.x>=e.x-n&&t.y>=e.y-n&&t.x+t.w<=e.x+e.w+n&&t.y+t.h<=e.y+e.h+n}function Nh(e,t,n){return e.x<t.x+t.w+n&&e.x+e.w>t.x-n&&e.y<t.y+t.h+n&&e.y+e.h>t.y-n}function Ph(e){let t=e.getAttribute(`position`),n=new Float32Array(t.count*3);n[0]=1,n[1]=1,n[2]=1,e.setAttribute(`color`,new Co(n,3))}function Fh(e){let t=e.getAttribute(`position`),n=new Float32Array(t.count*3),r=1/0,i=-1/0,a=1/0,o=-1/0;for(let e=0;e<t.count;e++){let n=t.getX(e),s=t.getY(e);n<r&&(r=n),n>i&&(i=n),s<a&&(a=s),s>o&&(o=s)}let s=Math.max(i-r,1e-4),c=Math.max(o-a,1e-4);for(let e=0;e<t.count;e++){let i=(t.getX(e)-r)/s,o=(t.getY(e)-a)/c,l=Math.max(Math.cos((i-.5)*Math.PI),0)**1.4*(.15+.85*o);n[e*3]=l,n[e*3+1]=l,n[e*3+2]=l}e.setAttribute(`color`,new Co(n,3))}function Ih(e){let t=e.getAttribute(`position`),n=new Float32Array(t.count*3),r=1/0,i=-1/0,a=1/0,o=-1/0;for(let e=0;e<t.count;e++){let n=t.getX(e),s=t.getY(e);n<r&&(r=n),n>i&&(i=n),s<a&&(a=s),s>o&&(o=s)}let s=Math.max(i-r,1e-4),c=Math.max(o-a,1e-4);for(let e=0;e<t.count;e++){let i=(t.getX(e)-r)/s,o=(t.getY(e)-a)/c,l=Math.max(Math.cos((i-.5)*Math.PI),0)**.5*(.34+.66*o**.8);n[e*3]=l,n[e*3+1]=l,n[e*3+2]=l}e.setAttribute(`color`,new Co(n,3))}function Lh(e,t,n,r,i){let a=e.getAttribute(`position`),o=new Float32Array(a.count*3),s=1/0,c=-1/0;for(let e=0;e<a.count;e++){let t=r===`x`?a.getX(e):a.getY(e);t<s&&(s=t),t>c&&(c=t)}let l=Math.max(c-s,1e-4),u=new Z;for(let e=0;e<a.count;e++){let c=(((r===`x`?a.getX(e):a.getY(e))-s)/l)**+i;u.copy(t).lerp(n,c),o[e*3]=u.r,o[e*3+1]=u.g,o[e*3+2]=u.b}e.setAttribute(`color`,new Co(o,3))}function Rh(e,t,n,r,i,a){let o=e.getAttribute(`position`),s=new Float32Array(o.count*3),c=Math.max(r,1e-4),l=new Z;for(let e=0;e<o.count;e++){let r=o.getY(e)+t,u=Math.min(Math.max((r-n)/c,0),1);l.copy(i).lerp(a,u**1.3),s[e*3]=l.r,s[e*3+1]=l.g,s[e*3+2]=l.b}e.setAttribute(`color`,new Co(s,3))}function zh(e){let t=e.checkpoint;if(t===void 0)return null;for(let n of e.decor){if(n.kind!==`lamp`)continue;let e=n.rect,r=Math.min(e.x,e.x+e.w),i=Math.max(e.x,e.x+e.w);if(!(t.x<r||t.x>i)&&!(t.y<e.y||t.y>e.y+e.h))return{x:e.x+e.w*.78,y:e.y+e.h-.52}}return null}function Bh(e,t){let n=new Pa;n.name=`room`;let r=t.ramp,i=t.postfx.outlineArchitecture,a=t.litMaterial(`backgroundNear`),o=t.litMaterial(`backgroundNear`,{shade:.9}),s=t.litMaterial(`architecture`),c=t.litMaterial(`architecture`,{shade:.74}),l=t.litMaterial(`architecture`,{shade:1.12}),u=t.material(`rimEdge`,{emissiveIntensity:.06}),d=t.litMaterial(`chain`),f=t.litMaterial(`chain`,{shade:.62}),p=t.litMaterial(`architecture`,{shade:.78}),m=t.litMaterial(`backgroundNear`,{shade:1.25}),h=t.material(`bossShell`,{shade:1.3,doubleSide:!0}),g=t.material(`backgroundFar`,{unlit:!0,shade:.4,doubleSide:!0}),_=new Xo({color:r.void,fog:!1}),v=new Xo({color:r.void}),y=t.colorOf(`backgroundFar`),b=new Xo({color:y}),x=new Xo({color:qm(y,1.16)}),S=qm(r.amber,1.4),C=new Xo({color:r.amber,fog:!1}),w=new Xo({color:qm(r.amber,.5),fog:!1}),T=new Xo({vertexColors:!0,fog:!1}),E=new Xo({color:16777215,vertexColors:!0,fog:!1}),D=new hs({color:r.amber,size:e.feel.emberSize,transparent:!0,opacity:e.feel.emberOpacity,depthWrite:!1,blending:2}),O=[a,o,s,c,l,u,d,f,p,m,h,g,_,v,b,x,C,w,T,E,D],k=[a,o,s,c,l,d,f,p,m].map(e=>({material:e,base:e.color.clone()})),A=new Z(r.void),j=[],M=[],N=[],P=[],F=[],I=[],L=[],ee=[],R=[],te=r.void,z=null,B=new io,V=[],ne=null,H=[],re=[],ie=null,ae=new Set,oe=[],se=[],ce=[],le=[],ue=[],de=new Map,fe=null,pe=0,me=0,U=new Z(r.amber),he=null,ge=!1,_e=new Map,W=new Map;function G(e){return M.push(e),e}function K(e){return j.push(e),e}function ve(){if(ge)return he;if(ge=!0,typeof document>`u`)return null;let e=document.createElement(`canvas`);e.width=Th,e.height=Th;let t=e.getContext(`2d`);if(t===null)return null;let n=Th*.5,r=t.createRadialGradient(n,n,0,n,n,n);r.addColorStop(0,`rgba(255,255,255,1)`),r.addColorStop(.16,`rgba(255,255,255,0.58)`),r.addColorStop(.42,`rgba(255,255,255,0.2)`),r.addColorStop(.72,`rgba(255,255,255,0.05)`),r.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=r,t.fillRect(0,0,Th,Th);let i=new Cs(e);return i.colorSpace=Ur,i.needsUpdate=!0,he=i,he}function ye(e){let n=K(t.litMaterial(`rimEdge`,{texture:`glass`,doubleSide:!0}));return n.color.setHex(Ch),n.transparent=!0,n.opacity=Math.min(Math.max(e,.02),1),n.depthWrite=!1,n.needsUpdate=!0,n}function be(e){return K(new Xo({color:r.porcelain,transparent:!0,opacity:e,depthWrite:!1,blending:2,fog:!1}))}function xe(e){return K(new Xo({color:e,map:ve(),transparent:!0,opacity:0,depthWrite:!1,blending:2,fog:!1}))}function Se(e,t){return K(new Xo({color:e,vertexColors:!0,transparent:!0,opacity:t,depthWrite:!1,blending:2,fog:!1}))}function Ce(t,n,r){let i=e.feel.edgeOutline,a=t.toFixed(3)+`:`+n.toFixed(3)+`:`+r.toFixed(3),o=_e.get(a);if(o!==void 0)return o;let s=G(new Ds(t+i*2,n+i*2,r+i*2));return _e.set(a,s),s}function we(e,n,r){let i=e.toFixed(3)+`:`+n.toFixed(3)+`:`+r.toFixed(3),a=W.get(i);if(a!==void 0)return a;let o=G(t.boxGeometry(e,n,r));return W.set(i,o),o}function q(e,n,r,a,o,s,c,l,u=!1){let d=Math.max(e,.01),f=Math.max(n,.01),p=Math.max(r,.01),m=new Q(we(d,f,p),c);if(m.position.set(a,o,s),l.add(m),u&&i){let e=fe===null?t.outlineMaterial():fe;if(e!==null){let t=new Q(Ce(d,f,p),e);t.userData.outline=!0,m.add(t)}}return m}function Te(e,t,n,r,i,a=!1){return q(e.w,e.h,t,e.x+e.w*.5,e.y+e.h*.5,n,r,i,a)}function Ee(e,t,n,r,i,a,o,s,c,l=!1){let u=n-e,d=r-t,f=q(Math.max(Math.hypot(u,d),.01),i,a,(e+n)*.5,(t+r)*.5,o,s,c,l);return f.rotation.z=Math.atan2(d,u),f}function De(e,t,n,r,i,a=0){let o=.16;q(e.w+i.rimOverhang*2-a*2,i.rimHeight,o,e.x+e.w*.5,e.y+e.h+bh-i.rimHeight*.5,n+t*.5-o*.5+i.rimOverhang-a,u,r,!0)}function Oe(e,t,n,r,i){let a=.07;q(e.w+yh*2,a,t-.02,e.x+e.w*.5,e.y+e.h+vh-a*.5,n,i,r)}function ke(e,t,n,r){Te(e,r.solidDepth,t,o,n,!0),Oe(e,r.solidDepth,t,n,s),De(e,r.solidDepth,t,n,r)}function Ae(e,t,n,r,i,a,o=_){let s=Math.max(i.courseSpacing,.3),c=Math.floor(e.h/s);if(c<1)return;let l=jh(a),u=Math.max(i.wallLift,.001),d=n+t*.5+u,f=e.x+u,p=Math.max(e.w-u*2,.02);for(let t=1;t<=c;t++){let n=e.y+t*s;if(n>e.y+e.h-.05)break;q(p,.032,.012,f+p*.5,n,d,o,r);let i=Math.max(1,Math.floor(p/1.6));for(let e=0;e<i;e++){let t=f+(e+.25+l()*.5)/i*p;q(.03,s-.06,.012,t,n-s*.5,d,o,r)}}}function je(e,t,n,r,i,a,o){let s=.06,c=[[e-n*.5+.09,t-r*.5+.09],[e+n*.5-.09,t-r*.5+.09],[e-n*.5+.09,t+r*.5-.09],[e+n*.5-.09,t+r*.5-.09]];for(let n of c)q(s,s,s,n[0]??e,n[1]??t,i,o,a)}function Me(e,t,n,r,i,a,o,s){q(e,t,n,r,i,a,s,o,!0),je(r,i,e,t,a+n*.5+.02,o,d)}function Ne(){for(let e=n.children.length-1;e>=0;e--){let t=n.children[e];t!==void 0&&n.remove(t)}for(let e of M)e.dispose();M.length=0;for(let e of j)e.dispose();j.length=0,_e=new Map,W=new Map,N.length=0,P.length=0,F.length=0,I.length=0,L.length=0,ee.length=0,R.length=0;for(let e of V)tm(e);V.length=0,ne=null,H.length=0,oe.length=0,se.length=0,ce.length=0,le.length=0,ue.length=0,de=new Map,fe=null,ae=new Set}function Pe(e){for(let t of N)t.mesh.visible=e.opened.indexOf(t.id)===-1;for(let t of P)t.mesh.visible=e.broken.indexOf(t.id)===-1;for(let t of ee){let n=e.opened.indexOf(t.id)===-1;t.sealed.visible=n,t.open.visible=!n}}function Fe(e,t,r,i,a,o,s,c=n){let l=Math.max(1,Math.round(r/s)),u=G(new $c(o*1.6,o*.55,4,8)),d=new X;d.position.set(e,t,i),c.add(d);for(let e=0;e<l;e++){let t=new Q(u,a);t.position.set(0,-(e+.5)*s,0),t.rotation.x=Math.PI*.5,t.rotation.y=e%2==0?0:Math.PI*.5,d.add(t)}return R.push({pivot:d,phase:e*.7}),d}function Ie(t,r,i,a,o,s,c){let l=Math.max(0,Math.round(e.feel.decorLightCap));if(l<=0)return null;if(H.length>=l){let e=-1,t=c;for(let n=0;n<H.length;n++){let r=H[n];r===void 0||r.priority<=t||(e=n,t=r.priority)}if(e<0)return null;let r=H[e];if(r===void 0)return null;n.remove(r.light),r.light.intensity=0,H.splice(e,1)}let u=new Xl(t,r,i,2);return u.layers.enableAll(),u.position.set(a,o,s),n.add(u),H.push({light:u,priority:c}),u}function Le(e,t){if(t===null)return e;e.updateWorldMatrix(!0,!1),B.setFromObject(e);let n=B.max.x-B.min.x;if(n>.02){let r=Math.max(B.min.x,t.x),i=Math.min(B.max.x,t.x+t.w);if(i-r<.04)return e.visible=!1,e;i-r<n-.002&&(e.scale.x*=(i-r)/n,e.position.x+=(r+i)*.5-(B.min.x+B.max.x)*.5)}let r=B.max.y-B.min.y;if(r>.02){let n=Math.max(B.min.y,t.y),i=Math.min(B.max.y,t.y+t.h);if(i-n<.04)return e.visible=!1,e;i-n<r-.002&&(e.scale.y*=(i-n)/r,e.position.y+=(n+i)*.5-(B.min.y+B.max.y)*.5)}return e}function Re(e,t){if(t===null||!e.visible)return 1;e.updateWorldMatrix(!0,!1),B.setFromObject(e);let n=4,r=(B.max.x-B.min.x)*.5;if(r>.02){let e=(B.min.x+B.max.x)*.5;n=Math.min(n,(e-t.x)/r,(t.x+t.w-e)/r)}let i=(B.max.y-B.min.y)*.5;if(i>.02){let e=(B.min.y+B.max.y)*.5;n=Math.min(n,(e-t.y)/i,(t.y+t.h-e)/i)}return Math.max(Math.min(n,4),1)}function ze(e,t,r,i,a,o,s,c=null){let l=G(new Jc(i,r,12,2));Lh(l,new Z(16777215),new Z(0),`x`,a>0?.8:1.25),a<0&&l.rotateZ(Math.PI);let u=new Q(l,Se(o,s));return u.rotation.x=-Math.PI*.5,u.position.set(e+a*i*.5,t+.012,.15),n.add(u),Le(u,c)}function Be(e,t,r,i,a,o=null){let s=G(new Os(r,24));Ph(s);let c=new Q(s,Se(i,a));return c.rotation.x=-Math.PI*.5,c.scale.set(1,.42,1),c.position.set(e,t+.012,.1),n.add(c),Le(c,o)}function Ve(e,t,r,i,a,o,s,c=null){let l=G(new Os(1,24));Ph(l);let u=new Q(l,Se(o,s));return u.scale.set(r*.5,i*.5,1),u.position.set(e,t,a),n.add(u),Le(u,c)}function He(e,t,r,i,a,o,s=n){let c=xe(a);c.opacity=Math.min(Math.max(o,0),1);let l=Math.max(i,.05)*2,u=new Q(G(new Jc(l,l)),c);return u.position.set(e,t,r),u.renderOrder=3,u.layers.set(1),s.add(u),u}function Ue(e,t=null,n=!1){let r=e.material;oe.push({material:r,opacity:r.opacity,mesh:e,scaleX:e.scale.x,scaleY:e.scale.y,grow:Re(e,t),lengthOnly:n})}function We(e){se.push({material:e,base:e.color.clone()})}function Ge(e){e!==null&&ce.push({light:e,intensity:e.intensity})}function Ke(e,t){return le.push({material:e,color:e.color.clone(),emissive:e.emissive.clone(),lift:t}),e}function qe(e,t,n,r,i,a,o,s){let c=Math.PI;for(let u=0;u<9;u++){let d=(u+.5)/9*c,f=n+r*.5,p=e+Math.cos(d)*f,m=t+Math.sin(d)*f,h=2*Math.PI*f/18*1.04,g=u===4,_=q(h,g?r*1.35:r,i,p,g?m+r*.12:m,a,g?l:o,s,!0);_.rotation.z=d-Math.PI*.5}q(.55,.32,i*1.06,e-n-r*.5,t-.16,a,o,s,!0),q(.55,.32,i*1.06,e+n+r*.5,t-.16,a,o,s,!0)}function Je(e,t,n,r,i){let a=e.x+e.w*.5,o=n<=_h;Te(e,t,n,r,i,!o);let s=Math.max(e.w*.32,.18);q(e.w*1.28,s,t*1.14,a,e.y+e.h-s*.5,n,r,i,!o),q(e.w*1.14,s*.7,t*1.07,a,e.y+e.h-s-s*.35,n,r,i,!o),q(e.w*1.32,s*1.1,t*1.16,a,e.y+s*.55,n,r,i,!o)}function Ye(e,t,n){let r=e.bounds.y;for(let i of e.solids){let e=i.y+i.h;e>n+.01||t<i.x-.05||t>i.x+i.w+.05||e>r&&(r=e)}return r}function Xe(e,t,r,i){let a=t.slice().sort((e,t)=>e.x-t.x);if(a.length===0){let t=Math.max(2,Math.round(e.rect.w/1)),n=e.rect.w/t,r=e.rect.h/t;for(let i=0;i<t;i++)a.push({x:e.rect.x+i*n,y:e.rect.y+(i+1)*r-.28,w:n,h:.28})}let l=a[0],u=a[a.length-1];if(l===void 0||u===void 0)return;let p=u.y>=l.y,m=p?l:u,h=p?u:l,g=e.z<=_h,_=g?i.solidDepth*.6:i.solidDepth,v=e.z,y=v-_*.5-.14,S=g?b:o,C=g?x:d,w=g?b:f;for(let e of a){g?(Te(e,_,v,S,n),q(e.w+.04,.06,_,e.x+e.w*.5,e.y+e.h-.03,v,x,n)):ke(e,v,n,i),q(.32,.09,.2,e.x+e.w*.5,e.y-.05,y,w,n,!g);let t=Ee(e.x+e.w*.5+.16,e.y-.08,e.x+e.w*.5-.22,e.y-.42,.07,.16,y,w,n);t.visible=!g}let T=Math.max(i.stairStringer,.12);if(Ee(m.x+m.w*.2,m.y-T*.7,h.x+h.w*.8,h.y-T*.7,T,.24,y,C,n,!g),!g){let e=Math.max(i.railHeight,.4);for(let t of a)q(.07,e,.07,t.x+t.w*.5,t.y+t.h+e*.5,y,f,n,!0);Ee(m.x+m.w*.5,m.y+m.h+e,h.x+h.w*.5,h.y+h.h+e,.09,.11,y,d,n,!0)}let E=Ye(r,m.x+m.w*.5,m.y),D=m.y-T-E;if(D>.2){let e={x:m.x+m.w*.05,y:E,w:m.w*.9,h:D};Te(e,_*.7,y-.2,g?b:c,n,!g),q(e.w*1.12,.14,_*.76,e.x+e.w*.5,E+D-.07,y-.2,g?x:s,n,!g)}}function Ze(e,t,r,i){let a=t.slice().sort((e,t)=>e.x-t.x);a.length===0&&a.push({x:e.rect.x,y:e.rect.y+e.rect.h-.5,w:e.rect.w,h:.5});let o=e.z<=_h,l=o?i.solidDepth*.6:i.solidDepth,u=e.z,p=u-l*.5+.16,m=Math.max(i.railHeight,.4),h=Math.max(i.balusterSpacing,.4),g=r.bounds;for(let e of a){o?(Te(e,l,u,b,n),q(e.w,.06,l,e.x+e.w*.5,e.y+e.h+vh-.03,u,x,n)):(ke(e,u,n,i),q(e.w,.1,.12,e.x+e.w*.5,e.y+.05-vh,u+l*.5-.06+vh,f,n,!0));let t=e.y+e.h,a=Math.max(2,Math.round(e.w/h)+1);for(let r=0;r<a;r++)q(.075,m,.075,e.x+.12+(e.w-.24)*r/(a-1),t+m*.5,p,o?x:f,n,!o);q(e.w,.1,.13,e.x+e.w*.5,t+m,p,o?x:d,n,!o),q(e.w,.05,.07,e.x+e.w*.5,t+m*.48,p,o?x:f,n,!o);let _=[e.x+.3,e.x+e.w-.3];for(let t of _){let i=t<g.x+.9,a=t>g.x+g.w-.9;if(i||a){let r=i?g.x:g.x+g.w,a=Math.abs(t-r)+.3,s=(t+r)*.5;q(a,.42,l*.8,s,e.y-.21,p-.1,o?b:c,n,!o),Ee(r,e.y-1.2,t,e.y-.3,.16,.2,p-.1,o?b:f,n,!o);continue}let u=Ye(r,t,e.y),m=e.y-u;if(m>.4){q(.34,m,.34,t,u+m*.5,p-.2,o?b:f,n,!o),q(.5,.16,.5,t,u+.08,p-.2,o?b:s,n,!o),q(.5,.14,.5,t,e.y-.07,p-.2,o?b:d,n,!o);let r=t<e.x+e.w*.5?1:-1;Ee(t,e.y-1.1,t+r*.9,e.y-.16,.1,.14,p-.2,o?b:f,n,!o)}}}}function Qe(e,t,r,i){let a=t[0]??{x:e.rect.x,y:e.rect.y,w:e.rect.w,h:Math.min(e.rect.h,.9)},s=e.z<=_h,l=s?i.solidDepth*.5:i.solidDepth*.7,u=e.z,p=t.length>0,m=a.x+a.w*.5,h=a.y+a.h*.5;q(a.w,a.h*.62,l*.55,m,h,u,s?b:o,n,!s),q(a.w,a.h*.2,l,m,a.y+a.h*.1,u,s?b:f,n,!s),p&&!s?(q(a.w,a.h*.2,l,m,a.y+a.h*.9-i.rimHeight*.5,u,f,n,!0),De(a,l,u,n,i)):q(a.w,a.h*.2,l,m,a.y+a.h*.9,u,s?x:d,n,!s),s||(Me(.22,a.h*1.06,l*1.05,a.x+.11-vh,h,u,n,d),Me(.22,a.h*1.06,l*1.05,a.x+a.w-.11+vh,h,u,n,d));let g=e.rect.y+e.rect.h-(a.y+a.h);if(g>1.5&&!s){let t=a.x+a.w*.82,o=Math.max(i.chainSegmentHeight,.05),s=Math.max(g*.72,.8);q(.7,.24,l*.8,t,e.rect.y+e.rect.h-.12,u-.2,f,n,!0),Fe(t,e.rect.y+e.rect.h-.24,s,u-.2,d,Math.max(i.chainRadius,.02),o);let p=a.x+a.w*.18;q(.7,.24,l*.8,p,e.rect.y+e.rect.h-.12,u-.2,f,n,!0),Fe(p,e.rect.y+e.rect.h-.24,Math.min(s*.35,2.2),u-.2,d,Math.max(i.chainRadius,.02),o);let m=Ye(r,a.x+a.w*.5,a.y);a.y-m>.3&&(q(.5,a.y-m,.5,a.x+.55,m+(a.y-m)*.5,u-.3,c,n,!0),q(.5,a.y-m,.5,a.x+a.w-.55,m+(a.y-m)*.5,u-.3,c,n,!0))}}function $e(e,t,r,i){let a=t[0]??{x:e.rect.x,y:e.rect.y+e.rect.h-.4,w:e.rect.w,h:.4},s=e.z,c=i.solidDepth*.7;Te(a,c,s,o,n,!0),De(a,c,s,n,i);let u=Ye(r,a.x+a.w*.5,a.y),f=a.y-u;if(f>.05){let e=[a.x+.32,a.x+a.w-.32];for(let t of e)q(.34,f,c*.9,t,u+f*.5,s+.05,l,n,!0),q(.46,.09,c*.94,t,u+.045,s+.05,d,n,!0);q(a.w-.9,.08,.08,a.x+a.w*.5,u+f*.45,s-.05,d,n,!0)}}function et(e,t,r){let i=t.length>0?t:[e.rect],a=e.z,o=a<=_h;for(let e of i){let i=o?r.solidDepth*.5:r.solidDepth*.85,s=e.x+e.w*.5,l=e.y+e.h*.5;if(Te(e,i,a,o?b:c,n,!o),o)continue;let u=a+i*.5+.008;q(e.w-.16,.03,.012,s,e.y+e.h*.36,u,_,n),q(e.w-.16,.03,.012,s,e.y+e.h*.68,u,_,n),q(.09,e.h,.06,e.x+.06,l,u+.02,f,n,!0),q(.09,e.h,.06,e.x+e.w-.06,l,u+.02,f,n,!0),q(e.w,.07,.06,s,l,u+.02,f,n,!0),je(s,l,e.w-.02,e.h-.02,u+.06,n,d),t.length>0&&De(e,i,a,n,r,.04)}}function tt(e,t){let n=Math.max(e.x,t.x),r=Math.min(e.x+e.w,t.x+t.w),i=Math.max(e.y,t.y),a=Math.min(e.y+e.h,t.y+t.h);if(r-n<=.02||a-i<=.02)return[e];let o=[];return i-e.y>.02&&o.push({x:e.x,y:e.y,w:e.w,h:i-e.y}),e.y+e.h-a>.02&&o.push({x:e.x,y:a,w:e.w,h:e.y+e.h-a}),n-e.x>.02&&o.push({x:e.x,y:i,w:n-e.x,h:a-i}),e.x+e.w-r>.02&&o.push({x:r,y:i,w:e.x+e.w-r,h:a-i}),o}function nt(e,t){let n=[e];for(let e of t){let t=[];for(let r of n)for(let n of tt(r,e))t.push(n);n=t}return n}function rt(e,t,r){let i=e.z,o=i<=_h,s=o?r.solidDepth*.6:r.solidDepth,c=(e.intensity??0)>=1,l=[],u=[];for(let n of t.length>0?t:[e.rect]){let t=re.filter(e=>Nh(e.rect,n,-.04));if(e.z===0)for(let e of t)(e.side===`ceiling`||e.side===`floor`)&&(e.rect.y<n.y-.05||e.rect.y+e.rect.h>n.y+n.h+.05||u.push(e));for(let e of nt(n,t.map(e=>e.rect)))l.push(e)}for(let e of l)if(Te(e,s,i,o?b:a,n,!o),t.length>0&&!o&&De(e,s,i,n,r),!o){if(c){let t=Math.max(1,Math.round(e.w/1.4)),r=Math.max(1,Math.round(e.h/1)),a=e.w/t,o=e.h/r,c=i+s*.5+.006;for(let i=0;i<t;i++)for(let t=0;t<r;t++){let r=e.x+(i+.5)*a,s=e.y+(t+.5)*o;q(a-.05,.03,.012,r,e.y+t*o,c,_,n),q(.03,o-.05,.012,e.x+i*a,s,c,_,n),je(r,s,a-.1,o-.1,c+.03,n,f)}}else Ae(e,s,i,n,r,e.x+e.y*3)}let d=ie;if(d!==null)for(let e of u)Mt(e,d,r)}function it(e,t){return e.transparent=!0,e.depthWrite=!1,e.opacity=t,e.visible=t>.004,e.needsUpdate=!0,e}function at(e,t){let n=t.bounds;for(let r of t.solids)if((r.x+r.w<=n.x+.01||r.x>=n.x+n.w-.01||r.y+r.h<=n.y+.01||r.y>=n.y+n.h-.01)&&Nh(e,r,.05))return r;return null}function ot(e,a){let o=ie;if(o===null)return;let s=e.rect,c=a.solidDepth,l=Math.max(a.veilRestOpacity,0),u=e.z+.02,d=it(K(t.material(`backgroundNear`)),l),f=it(K(new Xo({color:r.void,fog:!1})),l),p=it(K(t.material(`architecture`,{shade:.74})),l),m=i?it(K(new Xo({color:r.void,side:1,fog:!1})),l):null,h=i?it(K(new Xo({color:r.void,side:1,fog:!1})),0):null,g={rect:s,opacity:l,hide:[{material:d,base:1},{material:f,base:1},{material:p,base:1}],show:[],lights:[],stone:it(K(t.material(`architecture`)),0),stoneDark:it(K(t.material(`architecture`,{shade:.74})),0),stoneLit:it(K(t.material(`architecture`,{shade:1.12})),0),outline:h};m!==null&&g.hide.push({material:m,base:1}),g.show.push({material:g.stone,base:1}),g.show.push({material:g.stoneDark,base:1}),g.show.push({material:g.stoneLit,base:1}),h!==null&&g.show.push({material:h,base:1}),ue.push(g);for(let e of re)Nh(e.rect,s,.2)&&de.set(e,g);let _=at(s,o),v=o.bounds,y=_!==null&&_.x>=v.x+v.w-.01,b=_!==null&&_.x+_.w<=v.x+.01,x=y?1:b?-1:0,S=Math.max(a.wallLift,.001),C=x===0?s:{x:x>0?s.x-S*2:s.x,y:s.y,w:s.w+S*2,h:s.h};fe=m,Te(C,c,u,d,n,!0);let w=_===null?C:{x:_.x,y:s.y,w:_.w,h:s.h};Ae(w,c,u,n,a,w.x+w.y,f);let T=u+c*.5+S*2,E=s.y+Math.min(Math.max(a.courseSpacing,.3)*.5,s.h*.3);if(q(w.w*.44,.05,.014,w.x+w.w*.24,E,T,f,n),_!==null&&x!==0){let e=x>0?_.x:_.x+_.w;q(.5,s.h,c+.24,e+x*(.25-S*3),s.y+s.h*.5,u,p,n,!0)}fe=null}function st(e,t){let r=e.rect,i=e.z,a=i<=_h,l=jh(r.x*3.1+r.y*1.7+r.w),d=Math.max(4,Math.round(r.w*2.4)),p=a?t.solidDepth*.5:t.solidDepth*.8;for(let e=0;e<d;e++){let e=l(),t=(1-Math.abs(e*2-1))**1.3,u=.28+l()*.55,d=r.x+e*r.w,f=r.y+l()*r.h*t*.85+u*.35,m=l(),h=a?m<.3?x:b:m<.35?s:m<.7?c:o,g=q(u*(.8+l()*.7),u,p*(.5+l()*.4),d,f,i+(l()-.5)*.3,h,n,!a);g.rotation.z=(l()-.5)*1.1}if(a)return;for(let e=0;e<2;e++){let a=r.x+r.w*(.3+e*.4),s=r.y+r.h*.55+e*.25,c=new Pa;c.position.set(a,s,i+.1),c.rotation.z=(l()-.5)*.9,n.add(c),q(.9,.24,p*.5,0,0,0,o,c,!0),q(.94,t.rimHeight,p*.54,0,.136-t.rimHeight*.5,0,u,c,!0)}let m=Ee(r.x+r.w*.2,r.y+.2,r.x+r.w*.6,r.y+r.h*1.3,.22,.2,i-.4,f,n,!0);m.rotation.z+=.05}function ct(e,t){let i=e.rect,a=e.z,o=i.y+i.h,s=i.w>=0?1:-1,c=i.x,l=i.x+i.w*.78;q(.14,.9,.3,c+s*.07,o-.3,a,f,n,!0),q(Math.abs(l-c)+.1,.1,.1,(c+l)*.5,o,a,f,n,!0),Ee(c+s*.1,o-.72,l-s*.25,o-.06,.07,.07,a,f,n,!0),q(.06,.16,.06,l,o-.08,a,d,n);let u=o-.16,p=.62,m=.42,h=u-p*.5;q(.52,.09,.52,l,u,a,f,n,!0),q(m*.6,.12,m*.6,l,u+.08,a,f,n,!0),q(.48,.07,.48,l,u-p,a,f,n,!0);let g=K(new Xo({color:r.amber,fog:!1}));q(m,.52,m*.9,l,h,a,g,n).layers.set(1);let _=[l-m*.5,l+m*.5];for(let e of _)q(.05,p,.05,e,h,a+m*.46,f,n);q(.05,p,.05,l,h,a+m*.46,f,n);let v=K(new Xo({color:r.porcelain,fog:!1}));q(.1,.2,.1,l,h-.05,a+m*.2,v,n).layers.set(1),He(l,h,a+m*.5,t.lampHaloRadius,r.amber,t.lampHaloOpacity);let y=Ie(r.amber,t.lampLightIntensity,t.lampLightDistance,l,h,a+.9,fh);y!==null&&(em(y),V.push(y)),Be(l,i.y,2.4,r.amber,t.passageSpillOpacity*.8,z),Ve(l,h-.3,3,3.6,a-.35,r.amber,t.passageSpillOpacity*.22,z),F.push({material:g,base:new Z(r.amber),light:y,lightBase:t.lampLightIntensity,phase:l,amount:.12,furnace:!1})}function lt(e,t){let r=e.rect,i=e.z,a=i<=_h,o=r.w>=r.h,s=Math.max(Math.min(r.w,r.h)*.5,.08),c=Math.max(r.w,r.h),l=r.x+r.w*.5,u=r.y+r.h*.5,p=a?b:f,m=a?x:d,h=new Q(G(new ks(s,s,c,10)),p);h.position.set(l,u,i),o&&(h.rotation.z=Math.PI*.5),n.add(h);let g=G(new ks(s*1.3,s*1.3,.1,10)),_=[-c*.5+.08,0,c*.5-.08];for(let e of _){let t=new Q(g,m);t.position.set(o?l+e:l,o?u:u+e,i),o&&(t.rotation.z=Math.PI*.5),n.add(t)}if((e.intensity??0)>=1&&!a){let e=o?r.x+r.w:l,t=o?u:r.y+r.h,a=new Q(G(new Qc(s*1.15,10,8)),f);a.position.set(e,t,i),n.add(a);let c=Math.max(s*6,.8),p=new Q(G(new ks(s,s,c,10)),f);p.position.set(o?e:e+c*.5,o?t+c*.5:t,i),o||(p.rotation.z=Math.PI*.5),n.add(p);let m=new Q(g,d);m.position.set(o?e:e+c-.05,o?t+c-.05:t,i),o||(m.rotation.z=Math.PI*.5),n.add(m)}}function ut(e,t){let r=e.rect,i=e.z,o=r.x+r.w*.5;Te(r,.16,i-.3,a,n,!0);let c=[r.y+r.h*.78,r.y+r.h*.42];for(let e of c)q(r.w-.16,.07,.12,o,e,i-.16,d,n,!0),q(.1,.16,.16,r.x+.14,e-.02,i-.16,f,n),q(.1,.16,.16,r.x+r.w-.14,e-.02,i-.16,f,n);let l=c[0]??r.y,u=c[1]??r.y,p=Math.max(2,Math.floor(r.w/.55)),m=jh(r.x+r.y*2);for(let e=0;e<p;e++){let t=r.x+.3+(r.w-.6)*e/Math.max(p-1,1),a=(e+Math.floor(m()*2))%4;if(a===0)Ee(t-.08,l-.06,t-.02,l-.7,.05,.05,i-.1,d,n),Ee(t+.08,l-.06,t+.02,l-.7,.05,.05,i-.1,d,n);else if(a===1)q(.05,.62,.05,t,l-.35,i-.1,f,n),q(.26,.14,.14,t,l-.62,i-.1,d,n,!0);else if(a===2){let e=new Q(G(new $c(.16,.05,6,14)),d);e.position.set(t,l-.26,i-.1),n.add(e)}else{let e=new Q(G(new ks(.14,.14,.22,10)),s);e.rotation.x=Math.PI*.5,e.position.set(t,l-.22,i-.1),n.add(e)}let o=t+.2;if(e%2==0)q(.05,.5,.05,o,u-.28,i-.1,f,n),q(.1,.1,.1,o,u-.55,i-.1,d,n);else{let e=new Q(G(new $c(.1,.03,6,10,Math.PI)),d);e.position.set(o,u-.2,i-.1),e.rotation.z=Math.PI,n.add(e)}}t.rimHeight}function dt(e,t){let r=e.rect,i=e.z,a=i<=_h,o=r.x+r.w*.5,s=Math.max(r.h*.24,.3),l=r.y+r.h*.62,u=r.w*.5,p=a?b:f,m=a?x:d,h=new Q(G(new ks(s,s,u,12)),p);h.rotation.z=Math.PI*.5,h.position.set(o,l,i),n.add(h);let g=G(new $c(s*1.02,s*.12,5,16));for(let e=0;e<4;e++){let t=new Q(g,m);t.rotation.y=Math.PI*.5,t.position.set(o-u*.3+e*u*.2,l,i),n.add(t)}let _=[o-u*.5-.1,o+u*.5+.1];for(let e of _)Ee(e-.5,r.y,e,l,.16,.2,i,p,n,!a),Ee(e+.5,r.y,e,l,.16,.2,i,p,n,!a),q(1.3,.2,.7,e,r.y+.1,i,a?b:c,n,!a),q(.34,.34,.34,e,l,i,m,n,!a);if(!a){let e=new Q(G(new $c(s*1.1,.05,6,18)),d),t=_[1]??o;e.position.set(t+.3,l,i+.2),e.rotation.y=Math.PI*.5,n.add(e);for(let e=0;e<4;e++){let r=q(.05,s*2.1,.05,t+.3,l,i+.2,d,n);r.rotation.z=e*Math.PI/4}}let v=Math.max(t.chainSegmentHeight,.05),y=l-s-r.y;y>.4&&Fe(o+u*.1,l-s+.05,y,i+.1,m,Math.max(t.chainRadius,.02),v)}function ft(e,t){let r=e.rect,i=e.z,a=i<=_h,o=r.x+r.w*.5,s=Math.max(r.w*.09,.4),l=r.y+s*.5,u=a?b:c,f=a?x:d;q(r.w,s,s*1.4,o,l,i,u,n,!a),q(r.w*.7,s*.55,s*1.5,o,l+s*.7,i,u,n,!a);let p=[o-r.w*.3,o+r.w*.3];for(let e of p)q(.24,s*1.2,s*1.5,e,l+s*.1,i,f,n,!a);let m=new Q(G(new ks(s*.36,s*.36,s*1.8,10)),f);m.rotation.x=Math.PI*.5,m.position.set(o,l,i),n.add(m);let h=Math.max(t.chainSegmentHeight,.05),g=r.y+r.h,_=g-(l+s);if(_>.3)for(let e of p)Fe(e,g,_,i,f,Math.max(t.chainRadius,.02)*1.3,h*1.2),q(.8,.3,s,e,g-.15,i,u,n,!a)}function pt(e,t){let i=e.rect,a=e.z,o=a<=_h,c=i.w*.5,l=i.y+i.h-c,u=i.x+c,d=Math.max(i.w*.13,.3),f=o?t.solidDepth*.5:t.solidDepth*.9,p=o?b:s;qe(u,l,c,d,f,a,p,n);let m=d*1.15;if(Je({x:i.x-m,y:i.y,w:m,h:l-i.y},f,a,p,n),Je({x:i.x+i.w,y:i.y,w:m,h:l-i.y},f,a,p,n),(e.intensity??0)>=1){let e=G(new Jc(i.w,i.h,2,6));Lh(e,new Z(r.void),new Z(qm(r.charcoal,.9)),`y`,1.2);let t=new Q(e,T);t.position.set(u,i.y+i.h*.5,a-f*.5-.02),n.add(t)}}function mt(e,t){let i=e.rect,o=e.z,s=i.x+i.w*.5;i.y+i.h*.5;let c=e.intensity===void 0?1:e.intensity,l=t.solidDepth*1.1;Te(i,l,o,a,n,!0),q(i.w*1.12,.14,l*1.1,s,i.y+i.h-.07,o,d,n,!0),q(i.w*1.12,.14,l*1.1,s,i.y+.07,o,f,n,!0);let u=i.w*.66,p=i.h*.46,m=i.y+i.h*.4,h=o+l*.5,g=K(new Xo({color:r.amber,fog:!1}));q(u,p,.2,s,m,h-.2,g,n),q(u+.24,.1,.16,s,m+p*.5+.05,h+.02,d,n,!0),q(u+.24,.1,.16,s,m-p*.5-.05,h+.02,d,n,!0),q(.12,p+.2,.16,s-u*.5-.06,m,h+.02,d,n,!0),q(.12,p+.2,.16,s+u*.5+.06,m,h+.02,d,n,!0);for(let e=0;e<3;e++)q(.06,p,.08,s-u*.5+(e+1)/4*u,m,h-.04,f,n);je(s,m,u+.3,p+.26,h+.1,n,d);let _=Ie(r.amber,t.furnaceLightIntensity*c,t.furnaceLightDistance,s,m,h+.8,mh);Ve(s,m,i.w*2.4,i.h*1.6,h+.12,r.amber,t.decorGlowOpacity*.6*c),F.push({material:g,base:new Z(r.amber),light:_,lightBase:t.furnaceLightIntensity*c,phase:s*.6,amount:t.furnacePulseAmount,furnace:!0})}function ht(e,i){let a=e.rect,o=e.z,s=o<=_h,c=a.x+a.w*.5,l=Math.max(a.w,.16)*.5,f=Math.max(a.h,.3),p=Math.min(f*.13,.2),m=Math.max(f-p*2,.1),h=a.y+p,g=h+m*.44,_=e.color===void 0?r.amber:e.color,v=e.intensity===void 0?1:e.intensity,y=s?8:16,S=new Q(G(new qc(kh(l,m),y)),s?b:ye(Math.min(i.lensOpacity*1.5,.9)));S.position.set(c,h,o),S.renderOrder=2,n.add(S);let C=new Q(G(new ks(l*.84,l*.7,p,y)),s?x:u);C.position.set(c,a.y+a.h-p*.5,o),n.add(C);let w=new Q(G(new ks(l*.88,l*.98,p,y)),s?x:d);if(w.position.set(c,a.y+p*.5,o),n.add(w),s)return;let T=new Q(G(new ks(l*.46,l*.46,p*.62,10)),d);T.position.set(c,a.y+a.h-p*1.2,o),n.add(T);let E=K(new Xo({color:_,fog:!1})),D=new Q(G(new ks(l*.4,l*.5,m*.58,12)),E);D.position.set(c,g,o),n.add(D);let O=be(.32);q(l*.2,m*.52,.02,c-l*.44,h+m*.56,o+l*.82,O,n);let k=Math.max(a.w,a.h)*2.6,A=new Q(G(new Jc(k,k)),xe(_));A.position.set(c,g,o+.14),A.layers.set(t.actorLayer),A.renderOrder=3,n.add(A);let j=Ie(_,i.jarLightIntensity*v,i.jarLightDistance,c,g,o+.6,ph);I.push({core:E,halo:A.material,base:new Z(_),light:j,strength:v,phase:(Math.abs(c)*1.73+Math.abs(a.y)*2.31)%(Math.PI*2)})}function gt(e,t){let i=e.rect,a=e.z,o=a<=_h,s=i.x+i.w*.5,l=Math.max(i.w,.4)*.5,p=Math.max(i.y+i.h-l,i.y+l*.6),m=Math.max(p-l-i.y,0),h=o?14:36,g=e.color===void 0?r.amber:e.color,_=(e.intensity===void 0?1:e.intensity)*t.lensOpacity;if(m>.18){let e=[s-l*.62,s+l*.62];for(let t of e)q(.14,m,.24,t,i.y+m*.5,a,o?b:f,n,!o);q(l*1.7,.1,.18,s,i.y+m*.42,a,o?b:d,n,!o),q(l*1.5,.16,.6,s,i.y+.08,a,o?b:c,n,!o)}o||(Ve(s,p,l*3.4,l*3.4,a-.3,r.amber,_*.55),Ve(s,p,l*.95,l*.95,a-.08,g,_*.5));let v=new Q(G(new Os(l*.96,h)),o?x:ye(t.lensOpacity));v.position.set(s,p,a),v.renderOrder=2,n.add(v);let y=new Q(G(new $c(l,Math.max(l*.05,.035),5,h)),o?x:u);if(y.position.set(s,p,a),n.add(y),o)return;let S=be(.4);Ee(s-l*.58,p+l*.06,s-l*.16,p+l*.64,l*.11,.03,a+.05,S,n),Ee(s-l*.3,p-l*.34,s-l*.1,p-l*.06,l*.07,.03,a+.05,S,n);let C=[p-l*.86,p+l*.86];for(let e of C)q(l*.36,.12,.2,s,e,a,d,n,!0);q(.12,l*.4,.2,s-l*.97,p,a,f,n,!0),q(.12,l*.4,.2,s+l*.97,p,a,f,n,!0)}function _t(e,t){let r=e.rect,i=e.z,a=r.x+r.w*.5,o=r.y+r.h*.5,s=e.color===void 0?S:e.color,c=e.intensity===void 0?1:e.intensity,l=G(new Jc(r.w,r.h,14,22));Ih(l);let u=new Q(l,Se(s,t.sunlightOpacity*c));u.position.set(a,o,i),n.add(u);let d=G(new Jc(r.w*.3,r.h,6,22));Ih(d);let f=new Q(d,Se(s,t.sunlightOpacity*c*.7));f.position.set(a,o,i+.1),n.add(f),q(r.w*.82,.14,.06,a,r.y+r.h-.07,i+.14,be(Math.min(c,1)),n),Be(a,r.y,Math.max(r.w,.6)*.95,s,Math.min(t.sunlightOpacity*c*1.5,1)),Ie(s,t.sunlightLightIntensity*c,Math.max(r.h,r.w)*1.6,a,r.y+r.h*.84,i+.9,gh)}function vt(e,t){let i=e.rect,a=e.z,o=a<=_h,s=i.w>=i.h,c=Math.max(s?i.w:i.h,.5),l=Math.max(Math.min(s?i.h:i.w,.7)*.5,.08),u=i.x+i.w*.5,p=i.y+i.h*.5,m=e.color===void 0?r.amber:e.color,h=e.intensity===void 0?1:e.intensity,g=o?8:14,_=new Q(G(new ks(l,l,c,g,1,!0)),o?b:ye(Math.min(t.lensOpacity*1.3,.8)));_.position.set(u,p,a),s&&(_.rotation.z=Math.PI*.5),_.renderOrder=2,n.add(_);let v=G(new ks(l*1.3,l*1.3,l*.5,g)),y=Math.max(2,Math.round(c/2.4)+1);for(let e=0;e<y;e++){let t=-c*.5+(e+.5)/y*c,r=s?u+t:u,i=s?p:p+t,m=new Q(v,o?x:d);m.position.set(r,i,a),s&&(m.rotation.z=Math.PI*.5),n.add(m),!o&&(q(l*.7,l*.7,.9,r,i,a-.5,f,n,!0),s?q(l*3,l*.34,.22,r,i-l*1.5,a,d,n,!0):q(l*.34,l*3,.22,r-l*1.5,i,a,d,n,!0))}let S=G(new ks(l*1.55,l*1.55,.18,g));for(let e of[-c*.5+.09,c*.5-.09]){let t=new Q(S,o?x:d);t.position.set(s?u+e:u,s?p:p+e,a),s&&(t.rotation.z=Math.PI*.5),n.add(t)}if(o)return;let C=K(new Xo({color:m,fog:!1})),w=new Q(G(new ks(l*.46,l*.46,c-.22,10)),C);w.position.set(u,p,a),s&&(w.rotation.z=Math.PI*.5),w.renderOrder=1,n.add(w);let T=K(new Xo({color:m,fog:!1,transparent:!0,opacity:.85,depthWrite:!1,blending:2})),E=G(new ks(l*.8,l*.8,Math.min(c*.2,1),12)),D=[],O=[];for(let e=0;e<3;e++){let t=new Q(E,T);t.position.set(u,p,a),s&&(t.rotation.z=Math.PI*.5),t.renderOrder=3,n.add(t),D.push(t),O.push(e/3*c)}let k=t.conduitLightIntensity*h,A=Ie(m,k,t.conduitLightDistance,u,p,a+.5,hh);L.push({bands:D,offsets:O,axis:s?`x`:`y`,start:s?u-c*.5:p-c*.5,length:c,core:C,band:T,base:new Z(m),light:A,lightBase:k,phase:(Math.abs(u)*1.31+Math.abs(p)*2.17)%(Math.PI*2)})}function yt(e,t,i){let a=e.rect,o=e.z,s=a.x+a.w*.5,c=a.y+a.h*.5,l=Math.max(Math.min(a.w,a.h),.8)*.5,p=e.color===void 0?r.amber:e.color,m=Math.max(i.gateDepth,.3)*.4,h=new Pa;h.position.set(s,c,o),n.add(h);let g=new Pa;g.position.set(s,c,o),g.visible=!1,n.add(g);let _=G(new $c(l,l*.08,6,30));for(let e of[h,g]){let t=new Q(_,u);t.position.set(0,0,m*.5),e.add(t);let n=new Q(G(new ks(l*1.08,l*1.14,m*.8,30,1,!0)),f);n.rotation.x=Math.PI*.5,e.add(n)}let v=new Q(G(new ks(l*.99,l*.99,m,30)),f);v.rotation.x=Math.PI*.5,h.add(v);let y=G(new Ds(l*.86,l*.17,m*.9)),b=G(new Ds(l*.24,l*.17,m*.9)),x=G(new Ds(l*.3,l*.08,m*.5));for(let e=0;e<8;e++){let t=e/8*Math.PI*2,n=new Q(y,d);n.position.set(Math.cos(t)*l*.52,Math.sin(t)*l*.52,m*.6),n.rotation.z=t,h.add(n);let r=new Q(b,d);r.position.set(Math.cos(t)*l*.85,Math.sin(t)*l*.85,m*.6),r.rotation.z=t,g.add(r);let i=new Q(x,u);i.position.set(Math.cos(t)*l*.42,Math.sin(t)*l*.42,m*.95),i.rotation.z=t,h.add(i)}let S=new Q(G(new ks(l*.25,l*.25,m*1.3,18)),d);S.rotation.x=Math.PI*.5,S.position.set(0,0,m*.4),h.add(S);let C=new Q(G(new Os(l*.15,18)),K(new Xo({color:qm(p,.45),fog:!1})));C.position.set(0,0,m*1.06),h.add(C);let T=G(new Ds(l*.09,l*.09,l*.09));for(let e=0;e<14;e++){let t=(e+.5)/14*Math.PI*2,n=new Q(T,u);n.position.set(Math.cos(t)*l*.9,Math.sin(t)*l*.9,m*.7),h.add(n)}let E=new Q(G(new Os(l*1.55,30)),Se(p,i.passageSpillOpacity*.7));Ph(E.geometry),E.position.set(0,0,-m*1.2),h.add(E),Le(E,z);let D=new Q(G(new $c(l*.93,l*.045,6,30)),w);D.position.set(0,0,m*.9),h.add(D);let O=new Q(G(new Os(l*.82,30)),K(new Xo({color:p,fog:!1})));O.position.set(0,0,-m*.2),g.add(O);let k=xe(p);k.opacity=Math.min(i.passageSpillOpacity*1.4,1);let A=new Q(G(new Jc(Math.max(a.w,.3),Math.max(a.h,.3))),k);A.position.set(0,0,m*1.4),A.renderOrder=3,g.add(A),Le(A,z);let j=new Q(G(new Os(l*2.2,24)),Se(p,i.passageSpillOpacity*.9));Ph(j.geometry),j.rotation.x=-Math.PI*.5,j.scale.set(1,.4,1),j.position.set(0,-c+a.y+.02,.6),g.add(j),Le(j,z);let M=null;for(let e of t.gates)if(Nh(e.rect,a,.9)){M=e.id;break}M!==null&&ee.push({id:M,sealed:h,open:g})}function bt(e,t){let i=e.color===void 0?r.ash:e.color,a=e.intensity===void 0?1:e.intensity,o=G(new Jc(e.rect.w,e.rect.h,8,6));Fh(o);let s=new Q(o,Se(i,t.shaftOpacity*a));s.position.set(e.rect.x+e.rect.w*.5,e.rect.y+e.rect.h*.5,e.z),n.add(s)}function xt(e,t){let r=e.rect,i=e.z,o=i<=_h,s=r.x+r.w*.5,l=Math.max(r.h,.2)*.5,u=r.y+l+.18,p=Math.max(r.w,.2),m=o?b:c,h=o?x:d,g=new Q(G(new ks(l,l,p,14)),m);g.rotation.z=Math.PI*.5,g.position.set(s,u,i),n.add(g);let _=G(new ks(l*1.06,l*1.06,.14,14)),v=[-p*.32,p*.08,p*.42];for(let e of v){let t=new Q(_,h);t.rotation.z=Math.PI*.5,t.position.set(s+e,u,i),n.add(t)}let y=G(new Qc(l*.98,12,8,0,Math.PI*2,0,Math.PI*.5)),S=new Q(y,m);S.rotation.z=Math.PI*.5,S.position.set(s-p*.5,u,i),n.add(S);let C=new Q(y,m);C.rotation.z=-Math.PI*.5,C.position.set(s+p*.5,u,i),n.add(C);let w=[s-p*.3,s+p*.3];for(let e of w)q(.4,u-l*.7-r.y,.5,e,r.y+(u-l*.7-r.y)*.5,i,o?b:c,n,!o);if(o)return;let T=Math.max(2,Math.round(t.boilerRivets)),E=G(new Ds(l*.12,l*.12,l*.12));for(let e=0;e<T;e++){let t=e/T*Math.PI-Math.PI*.5,r=new Q(E,d);r.position.set(s-p*.12,u+Math.sin(t)*l*.9,i+Math.cos(t)*l*.9),n.add(r)}q(l*.7,l*.6,.12,s-p*.12,u-l*.15,i+l*.96,a,n,!0),q(l*.8,.05,.14,s-p*.12,u+l*.16,i+l*.98,d,n);let D=l*.28,O=Math.max(r.h*1.1,1.2),k=new Q(G(new ks(D,D,O,10)),f);k.position.set(s+p*.3,u+l+O*.5-.1,i-.1),n.add(k);let A=new Q(G(new ks(D*1.35,D*1.35,.1,10)),d);A.position.set(s+p*.3,u+l+O-.1,i-.1),n.add(A);let j=Math.max(p*1.6,1.4),M=new Q(G(new ks(D,D,j,10)),f);M.rotation.z=Math.PI*.5,M.position.set(s+p*.3+j*.5,u+l+O-.15-D,i-.1),n.add(M);let N=new Q(G(new Qc(D*1.1,10,8)),f);N.position.set(s+p*.3,u+l+O-.15-D,i-.1),n.add(N);let P=new Q(G(new ks(D*1.4,D*1.4,.1,10)),d);P.rotation.z=Math.PI*.5,P.position.set(s+p*.3+j-.05,u+l+O-.15-D,i-.1),n.add(P)}function St(e,t){let i=e.rect,a=i.x+i.w*.5,o=i.y,s=Math.max(i.h,.2),c=e.intensity===void 0?0:e.intensity,l=t.solidDepth*.82,u=e.z;q(i.w,s,l,a,o-s*.5+.004,u,v,n);let p=Math.max(2,Math.round(t.grateBarCount*Math.max(i.w/4,.5)));for(let e=0;e<p;e++)q(.09,.058,l,i.x+(e+.5)/p*i.w,o-.021,u,f,n);if(q(i.w+.12,.058,.1,a,o-.021,u+l*.5-.05,d,n),q(i.w+.12,.058,.1,a,o-.021,u-l*.5+.05,d,n),q(.1,.058,l,i.x-.01,o-.021,u,d,n),q(.1,.058,l,i.x+i.w+.01,o-.021,u,d,n),c>0){let e=G(new Jc(i.w,l,6,2));Lh(e,new Z(16777215),new Z(16777215),`x`,1);let d=new Q(e,Se(r.amber,t.grateGlowOpacity*c));d.rotation.x=-Math.PI*.5,d.position.set(a,o-s+.03,u),n.add(d),ze(a,o,l-.1,i.w*.5,1,r.amber,t.grateGlowOpacity*c*.35),ze(a,o,l-.1,i.w*.5,-1,r.amber,t.grateGlowOpacity*c*.35)}}function Ct(e){let t=Math.max(e.rect.h,.5),r=Math.max(e.rect.w,.5),i=r/t,a=e.z<=_h,o=e.rect.x+r*.5,s=new Q(G(new qc(Ah(t,1),24)),a?b:h);if(s.position.set(o,e.rect.y,e.z),s.scale.set(i,1,i),n.add(s),a){q(r*1.02,t*.05,.1,o,e.rect.y+t*.03,e.z+r*.5,x,n);let i=new Q(G(new Ds(t*.22,t*.16,t*.22)),b);i.position.set(o,e.rect.y+t*1.1,e.z),n.add(i);return}let c=new Q(G(new qc(Ah(t*.97,.92),16)),g);c.position.set(o,e.rect.y+t*.02,e.z),c.scale.set(i,1,i),n.add(c);let l=new Q(G(new Qc(t*.08,8,6)),d);l.position.set(o,e.rect.y+t*.22,e.z),n.add(l);let f=new Q(G(new $c(t*.5,t*.032,4,26)),u);f.rotation.x=Math.PI*.5,f.position.set(o,e.rect.y+t*.03,e.z),f.scale.set(i,i,1),n.add(f)}function wt(e,t){let n=e.color===void 0?r.amber:e.color,i=e.intensity===void 0?1:e.intensity,a=Math.max(e.rect.w,e.rect.h,t.decorGlowSize),o=e.rect.x+e.rect.w*.5,s=e.rect.y+e.rect.h*.5;Ve(o,s,a*1.5,a*1.5,e.z,n,t.decorGlowOpacity*i),e.z>_h&&Ie(n,t.decorGlowIntensity*i,a*6,o,s,e.z+.5,gh)}function Tt(e,r,i){let a=0;for(let t of e){let e=Math.max(t.rect.w*t.rect.h,0);a+=Math.round(e*i.emberPerArea*r)}let o=Math.min(Math.max(a,0),Math.max(1,Math.round(i.emberMax)));if(o<=0)return;let s=Math.max(i.dawnEmberBoost,1),c=Math.max(o,Math.round(o*s)),l=G(new Ro),u=new Co(new Float32Array(c*3),3);u.setUsage(Yr),l.setAttribute(`position`,u);let d=new Float32Array(c),f=new Float32Array(c),p=new Float32Array(c),m=new Float32Array(c),h=u.array,g=0;for(let t of e){let e=Math.max(t.rect.w*t.rect.h,0),n=Math.round(e*i.emberPerArea*r);a>0&&(n=Math.round(n*c/a));for(let e=0;e<n&&g<c;e++){let e=t.rect.x+Math.random()*t.rect.w,n=t.rect.y+Math.random()*t.rect.h;f[g]=e,p[g]=t.rect.y,m[g]=Math.max(t.rect.h,.5),d[g]=Math.random()*Math.PI*2,h[g*3]=e,h[g*3+1]=n,h[g*3+2]=t.z,g++}}for(;g<c;g++){let t=e[0],n=t===void 0?{x:0,y:0,w:1,h:1}:t.rect,r=n.x+Math.random()*n.w;f[g]=r,p[g]=n.y,m[g]=Math.max(n.h,.5),d[g]=Math.random()*Math.PI*2,h[g*3]=r,h[g*3+1]=n.y+Math.random()*n.h,h[g*3+2]=t===void 0?-1:t.z}u.needsUpdate=!0,l.setDrawRange(0,o);let _=new bs(l,D);_.frustumCulled=!1,_.layers.set(t.actorLayer),n.add(_),ne={points:_,attribute:u,seed:d,originX:f,minY:p,spanY:m,count:c,base:o,drawn:o}}function Et(e,t){ke(e,0,n,t)}function Dt(e,t,r,i){let a=e.z<=_h;switch(e.kind){case`block`:{let t=a?b:m;Te(e.rect,i.solidDepth*(a?.8:1.4),e.z,t,n);return}case`pillar`:Je(e.rect,i.solidDepth*1.1,e.z,a?b:p,n);return;case`chain`:{let t=Math.max(e.rect.w/.3,.6)*(a?.5:1);Fe(e.rect.x+e.rect.w*.5,e.rect.y+e.rect.h,e.rect.h,e.z,a?b:d,Math.max(i.chainRadius,.02)*t,Math.max(i.chainSegmentHeight,.05)*t);return}case`cylinder`:{let t=Math.max(e.rect.w,.2)*.5,r=new Q(G(new ks(t,t,Math.max(e.rect.h,.2),14,1,!0)),a?b:p);r.position.set(e.rect.x+t,e.rect.y+e.rect.h*.5,e.z),n.add(r);return}case`bell`:Ct(e);return;case`glow`:wt(e,i);return;case`furnace`:mt(e,i);return;case`shaft`:bt(e,i);return;case`jar`:ht(e,i);return;case`lens`:gt(e,i);return;case`sunlight`:_t(e,i);return;case`conduit`:vt(e,i);return;case`shutter`:yt(e,r,i);return;case`boiler`:xt(e,i);return;case`grate`:St(e,i);return;case`embers`:return;case`stair`:Xe(e,t,r,i);return;case`gallery`:Ze(e,t,r,i);return;case`beam`:Qe(e,t,r,i);return;case`bench`:$e(e,t,r,i);return;case`crate`:et(e,t,i);return;case`wall`:rt(e,t,i);return;case`veil`:ot(e,i);return;case`rubble`:st(e,i);return;case`lamp`:ct(e,i);return;case`pipe`:lt(e,i);return;case`rack`:ut(e,i);return;case`winch`:dt(e,i);return;case`yoke`:ft(e,i);return;case`arch`:pt(e,i);return;case`rim`:Te(e.rect,i.rimHeight*2,e.z,u,n,!0);return;default:return}}function Ot(e,t,n,r){let i=t.bounds,a=xh[e.to]===!0,o=a?`warm`:Sh[e.to]===!0?`pale`:`ash`,s=null,c=-1/0;for(let t of n){if(!Nh(e.rect,t,.05))continue;let n=t.x>=i.x+i.w-.01,r=t.x+t.w<=i.x+.01,l=t.y+t.h<=i.y+.01,u=t.y>=i.y+i.h-.01;if(n||r){let r=Math.min(e.rect.x+e.rect.w,t.x+t.w)-Math.max(e.rect.x,t.x)+.06;if(r<=c)continue;c=r,s={door:e,rect:{x:t.x,y:e.rect.y,w:t.w,h:e.rect.h},side:n?`right`:`left`,warm:a,tone:o};continue}if(l||u){let n=Math.min(e.rect.y+e.rect.h,t.y+t.h)-Math.max(e.rect.y,t.y);if(n<=c)continue;c=n,s={door:e,rect:{x:e.rect.x,y:t.y,w:e.rect.w,h:t.h},side:l?`floor`:`ceiling`,warm:a,tone:o}}}if(s!==null)return s;for(let t of r){if(!Nh(e.rect,t,.05)||e.rect.x<t.x-.05||e.rect.x+e.rect.w>t.x+t.w+.05)continue;let n=e.rect.y+e.rect.h*.5<t.y;return{door:e,rect:{x:e.rect.x,y:t.y,w:e.rect.w,h:t.h},side:n?`ceiling`:`floor`,warm:a,tone:o}}return null}function kt(e){return e===`warm`?r.amber:e===`pale`?wh:r.ash}function At(e,t,i){let a=e.rect,o=e.side===`right`,u=t.solidDepth,d=o?a.x:a.x+a.w,f=o?a.x+a.w:a.x,p=o?1:-1,m=a.x+a.w*.5,h=a.y+a.h*.5,g=e.tone,_=kt(g),v=g===`warm`?r.amber:qm(_,1.15),y=Math.max(t.passageInteriorDepth,.2),b=Math.max(t.passageFrameLift,0),x=-u*.5-y,S=u+y,C=-y*.5,w=g===`pale`?new Z(te).multiplyScalar(.34):new Z(r.void),E=g===`pale`?new Z(te).lerp(new Z(wh),.55):new Z(_).multiplyScalar(g===`warm`?.7:.42),D=ae.has(e),O=G(new Jc(a.w+.06,a.h,8,2));Lh(O,w,E,`x`,1.4),o||O.scale(-1,1,1);let k=D?K(new Xo({vertexColors:!0,fog:!1})):T,A=new Q(O,k);A.position.set(m,h,x),n.add(A),D&&We(k);let j=G(new Jc(a.w,S,8,2));Lh(j,new Z(r.charcoal).multiplyScalar(.7),E.clone().multiplyScalar(.8),`x`,1.3),o||j.scale(-1,1,1);let M=new Q(j,T);M.rotation.x=-Math.PI*.5,M.position.set(m,a.y+.02,C),n.add(M);let N=G(new Jc(a.w,S,8,2));Lh(N,new Z(r.void),w.clone().lerp(E,.35),`x`,1.5),o||N.scale(-1,1,1);let P=new Q(N,T);P.rotation.x=Math.PI*.5,P.position.set(m,a.y+a.h-.02,C),n.add(P);let F=de.get(e),I=F===void 0?s:F.stone,L=F===void 0?c:F.stoneDark,ee=F===void 0?l:F.stoneLit;F!==void 0&&(fe=F.outline);let R=u+.16+b*2,B=b,V=.42;q(a.w+.7,.16,R+.12,m-p*.14,a.y+.08,B,I,n,!0);let ne=q(a.w+.86,.08,R+.2,m-p*.18,a.y+.19,B,ee,n,!0);ne.renderOrder=1,q(a.w+.5,.06,R+.26,m-p*.1,a.y+.245,B,L,n),q(V,a.h+.05,R,d+p*V*.5,h,B,I,n,!0),q(V*.7,a.h+.05,R-.06,f-p*V*.35,h,B,L,n,!0),q(.16,a.h+.05,R+.16,d+p*.08,h,B,ee,n,!0);for(let e of[d+p*V*.5,f-p*V*.35])q(V*1.28,.3,R+.14,e,a.y+.42,B,L,n,!0),q(V*1.28,.26,R+.14,e,a.y+a.h-.15,B,L,n,!0);if(i){let e=a.w*.5;qe(m,a.y+a.h-.02,e,.5,R,B,I,n),q(a.w+1.2,.36,R,m,a.y+a.h+e+.62,B,L,n,!0)}else q(a.w+V*1.6,.62,R,m,a.y+a.h+.31,B,I,n,!0),q(.7,.86,R+.1,m,a.y+a.h+.4,B,ee,n,!0),q(.42,.24,R+.18,m,a.y+a.h+.1,B,L,n,!0),q(a.w+V*2.2,.22,R-.06,m,a.y+a.h+.83,B,L,n,!0);fe=null;let H={x:a.x,y:a.y,w:a.w,h:a.h},re=ze(d,a.y,Math.min(a.w*2.1,u-.1),t.passageSpillLength,-p,v,t.passageSpillOpacity*(g===`ash`?.6:.9),z),ie=Ve(m-p*.2,h,a.w*1.6,a.h*1.15,x+.3,v,t.passageSpillOpacity*(g===`warm`?.9:g===`pale`?1.5:.9),H);Ve(d-p*.3,a.y+a.h*.62,a.w*1.1,a.h*.9,u*.5+b*2+.06,v,t.passageSpillOpacity*.32,z),jt(e,t);let oe=null;if(t.passageLightIntensity>0&&g!==`ash`&&(oe=Ie(_,t.passageLightIntensity*(g===`warm`?1:.55),t.passageLightDistance,d-p*.2,h,.4,fh)),F!==void 0){let e=re.material,t=ie.material;F.show.push({material:e,base:e.opacity}),F.show.push({material:t,base:t.opacity}),e.opacity=0,e.visible=!1,t.opacity=0,t.visible=!1,oe!==null&&(F.lights.push({light:oe,intensity:oe.intensity}),oe.intensity=0)}D&&(Ue(re,z,!0),Ge(oe))}function jt(e,t){let i=e.rect,a=e.side===`right`,o=a?1:-1,s=a?i.x:i.x+i.w,c=t.solidDepth,l=e.tone===`pale`?wh:r.amber,u=s-o*.52,d=i.y+Math.min(i.h*.78,i.h-.4),p=c*.5+.12;q(.1,.34,.12,u,d+.28,p,f,n,!0),q(.26,.09,.26,u,d+.1,p,f,n,!0);let m=K(new Xo({color:l,fog:!1}));q(.2,.26,.2,u,d-.06,p,m,n).layers.set(1),q(.26,.07,.26,u,d-.22,p,f,n,!0),He(u,d-.06,p+.1,Eh,l,t.lampHaloOpacity);let h=K(new Xo({color:r.porcelain,transparent:!0,opacity:.55,depthWrite:!1,blending:2,fog:!1})),g=q(.07,i.h-.12,.07,s-o*.035,i.y+i.h*.5,p-.02,h,n);g.renderOrder=2,Be(u,i.y,1.9,l,t.passageSpillOpacity*.55,z),F.push({material:m,base:new Z(l),light:null,lightBase:0,phase:u*1.7,amount:.1,furnace:!1})}function Mt(e,t,i){let a=e.rect,o=e.side===`ceiling`,c=i.solidDepth,u=a.x+a.w*.5,p=a.y+a.h*.5,m=kt(e.tone),h=e.tone===`warm`?r.amber:qm(m,1.15),g=G(new Jc(a.w,a.h,2,8));Lh(g,new Z(r.void),new Z(m).multiplyScalar(.8),`y`,1.3),o||g.scale(1,-1,1);let _=new Q(g,T);_.position.set(u,p,-c*.5+.03),n.add(_);let v=.4;q(v,a.h+.1,c+.16,a.x-v*.5,p,0,s,n,!0),q(v,a.h+.1,c+.16,a.x+a.w+v*.5,p,0,s,n,!0);let y=o?a.y:a.y+a.h;q(a.w+v*2.4,.24,c+.2,u,y+(o?-.12:.12),0,l,n,!0);let b=a.y+a.h,x=o?Ye(t,u,a.y):a.y,S=Math.max(b-x,.5),C=-c*.5+.2,w=Math.max(2,Math.round(S/.42));for(let e=0;e<w;e++)q(a.w*.58,.06,.06,u,x+(e+.5)/w*S,C,d,n);if(q(.07,S,.07,u-a.w*.3,x+S*.5,C,f,n),q(.07,S,.07,u+a.w*.3,x+S*.5,C,f,n),o){let e=Math.max(a.y-x,.4),t=G(new Jc(a.w*1.5,e,4,8));Lh(t,new Z(0),new Z(16777215),`y`,1.4);let r=new Q(t,Se(h,i.passageSpillOpacity*.55));r.position.set(u,x+e*.5,-c*.5+.5),n.add(r),Le(r,z),Be(u,x,a.w*1.6,h,i.passageSpillOpacity*.9,z),Ve(u,a.y+.2,a.w*2.2,1.6,-c*.5+.4,h,i.passageSpillOpacity*.7,z)}else Ve(u,a.y+a.h-.3,a.w*2,1.4,-c*.5+.4,h,i.passageSpillOpacity*.5,z)}function Nt(e,t){let i=e.rect,a=i.x+i.w*.5,o=i.y+i.h*.5,c=t.solidDepth;q(i.w,i.h,.2,a,o,-c*.5+.1,_,n),q(.4,i.h,c,i.x-.2,o,0,s,n,!0),q(.4,i.h,c,i.x+i.w+.2,o,0,s,n,!0),q(i.w+.8,.5,c,a,i.y+i.h+.25,0,s,n,!0),ze(a,i.y,i.w*1.6,t.passageSpillLength*.6,1,r.ash,t.passageSpillOpacity*.6,z)}function Pt(e,t,r,i){let o=r.bounds,l=e.x>=o.x+o.w-.01,u=e.x+e.w<=o.x+.01,p=e.y+e.h<=o.y+.01,m=e.y>=o.y+o.h-.01,h=i.solidDepth,g=p&&e.h<=.8,v={x:e.x,y:e.y,w:e.w,h:e.h};l&&(v.w+=6),u&&(v.x-=6,v.w+=6),p&&!g&&(v.y-=6,v.h+=6),m&&(v.h+=6);let y=t.filter(t=>Nh(t.rect,e,.05)),b=[];if(l||u){let e=v.y,t=y.slice().sort((e,t)=>e.rect.y-t.rect.y);for(let n of t){let t=n.rect.y+n.rect.h,r=n.door.to===`belfry`||n.door.to===`landing`?n.rect.w*.5:0;n.rect.y>e&&b.push({x:v.x,y:e,w:v.w,h:n.rect.y-e}),e=t+r}v.y+v.h>e&&b.push({x:v.x,y:e,w:v.w,h:v.y+v.h-e})}else{let e=v.x,t=y.slice().sort((e,t)=>e.rect.x-t.rect.x);for(let n of t)n.rect.x>e&&b.push({x:e,y:v.y,w:n.rect.x-e,h:v.h}),e=n.rect.x+n.rect.w;v.x+v.w>e&&b.push({x:e,y:v.y,w:v.x+v.w-e,h:v.h})}for(let t of b)if(Te(t,h,0,a,n,!0),l||u){let r={x:e.x,y:Math.max(t.y,o.y-1),w:e.w,h:Math.min(t.y+t.h,o.y+o.h+1)-Math.max(t.y,o.y-1)};r.h>.4&&Ae(r,h,0,n,i,t.y+e.x)}if(p){for(let t of b){let r={x:t.x,y:e.y,w:t.w,h:e.h};Oe(r,h,0,n,s),De(r,h,0,n,i)}let t=h*.5+.006;if(g){let t=Math.max(2,Math.round(e.w/2.4));for(let r=0;r<=t;r++){let i=e.x+r/t*e.w;i<o.x-.4||i>o.x+o.w+.4||y.some(e=>i>e.rect.x-.3&&i<e.rect.x+e.rect.w+.3)||q(.3,.5,h*1.04,i,e.y-.25,0,f,n,!0)}q(e.w,.16,h*1.02,e.x+e.w*.5,e.y-.08,0,d,n,!0)}else{let r=Math.max(2,Math.round(e.w/2.6)),a=jh(e.x+e.w);q(e.w,.032,.012,e.x+e.w*.5,e.y+e.h-.7,t,_,n);for(let o=1;o<r;o++)q(.03,.6,.012,e.x+o/r*e.w+(a()-.5)*.6,e.y+e.h-.35-i.rimHeight,t,_,n)}for(let e of y)e.side===`floor`&&Mt(e,r,i)}if(m){let t=Math.max(2,Math.round(e.w/3.2));for(let r=0;r<=t;r++){let i=e.x+r/t*e.w;i<o.x-.5||i>o.x+o.w+.5||q(.55,.7,h*1.1,i,e.y-.35,0,c,n,!0)}q(e.w,.3,h*1.06,e.x+e.w*.5,e.y-.15,0,a,n,!0);for(let e of y)e.side===`ceiling`&&Mt(e,r,i)}if(l||u){let t=l?e.x:e.x+e.w,r=l?1:-1,a=.5,s=[],u=o.y,d=y.slice().sort((e,t)=>e.rect.y-t.rect.y);for(let e of d){let n=e.door.to===`belfry`||e.door.to===`landing`?e.rect.w*.5+.9:.9;e.rect.y-.02>u&&s.push({x:t,y:u,w:a,h:e.rect.y-u}),u=e.rect.y+e.rect.h+n}o.y+o.h>u&&s.push({x:t,y:u,w:a,h:o.y+o.h-u});for(let e of s){if(e.h<.3)continue;let o=t+r*(a*.5-i.wallLift);q(a,e.h,h+.24,o,e.y+e.h*.5,0,c,n,!0)}for(let e of y)(e.side===`left`||e.side===`right`)&&At(e,i,e.door.to===`belfry`||e.door.to===`landing`)}}function Ft(e,i,a){let o=new Pa;o.position.set(e.x+e.w*.5,e.y+e.h*.5,0),n.add(o);let s=Math.max(i.gateDepth,.3),c=a?Ke(K(t.litMaterial(`chain`,{shade:.62})),.4):f,l=a?Ke(K(t.litMaterial(`chain`)),1):d;if(a){let t=G(new Os(1,24));Ph(t);let n=new Q(t,Se(r.amber,i.passageSpillOpacity*1.1));n.scale.set(e.w*1.4,e.h*.62,1),n.position.set(0,-e.h*.08,-s*.5-.12),o.add(n),Le(n,z);let a=z===null||e.x+e.w*.5>z.x+z.w*.5?-1:1,c=new Q(t,Se(r.amber,i.passageSpillOpacity*.7));c.rotation.x=-Math.PI*.5,c.scale.set(e.w*2.6,i.solidDepth*.42,1),c.position.set(a*e.w*1.6,-e.h*.5+.012,0),o.add(c),Le(c,z),Ue(c,z,!0)}let u=Math.max(e.w,.3),p=.14;q(u,p,s,0,e.h*.5-p*.5,0,c,o,!0),q(u,p,s,0,-e.h*.5+p*.5,0,c,o,!0),q(p,e.h,s,-u*.5+p*.5,0,0,c,o,!0),q(p,e.h,s,u*.5-p*.5,0,0,c,o,!0);let m=Math.max(3,Math.round(s/.28));for(let t=0;t<m;t++){let n=-s*.5+(t+.5)/m*s;q(u*.86,.09,.09,0,0,n,l,o,!0),q(.09,e.h-p*2,.09,0,0,n,l,o,!0)}q(u*.92,.12,s*1.04,0,e.h*.22,0,c,o,!0),q(u*.92,.12,s*1.04,0,-e.h*.22,0,c,o,!0);let h=q(u*.9,.5,.16,0,-e.h*.02,s*.5+.06,l,o,!0);return h.renderOrder=1,q(.08,.14,.06,0,-e.h*.02-.02,s*.5+.16,_,o),q(.14,.06,.06,0,-e.h*.02+.06,s*.5+.16,_,o),je(0,-e.h*.02,u*.86,.46,s*.5+.16,o,c),o}function It(e,t){let r=new Pa;r.position.set(e.x+e.w*.5,e.y+e.h*.5,0),n.add(r);let i=Math.max(t.breakableDepth,.3);q(e.w,e.h,i,0,0,0,c,r,!0);let a=Math.max(3,Math.round(e.h/.34)),o=e.h/a,l=i*.5+.006;for(let t=0;t<a;t++){let n=-e.h*.5+(t+1)*o;t<a-1&&q(e.w,.03,.012,0,n,l,_,r);let i=Math.max(1,Math.round(e.w/.42));for(let a=0;a<i;a++){let s=-e.w*.5+(a+(t%2==0?.5:1))/i*e.w;Math.abs(s)<e.w*.5-.02&&q(.03,o-.06,.012,s,n-o*.5,l,_,r)}}return q(e.w+.5,.36,i+.24,0,e.h*.5+.18,0,s,r,!0),q(.3,e.h+.4,i+.2,-e.w*.5-.15,.1,0,s,r,!0),q(.3,e.h+.4,i+.2,e.w*.5+.15,.1,0,s,r,!0),r}let Lt=[];return{group:n,build(t,i){Ne();let a=e.feel,o=t.bounds,s=t.ambience===void 0?void 0:t.ambience.fogColor,c=Bm(r,s);te=s===void 0?r.void:s,z={x:o.x,y:o.y,w:o.w,h:o.h},A.setHex(te);let l=Math.max(a.paleKeyLift,0);for(let e of k)e.material.color.copy(e.base).lerp(A,c*l),e.material.emissive.setHex(0),e.material.emissiveIntensity=0;let u=o.y+o.h*.5,d=G(new Jc(a.backPlaneSize,a.backPlaneSize,1,48));Rh(d,u,o.y,o.h,new Z(Hm(r,s)),new Z(Vm(r,a.farGradientTop,s)));let f=new Q(d,E);f.position.set(o.x+o.w*.5,u,a.backPlaneZ),n.add(f);let p=[],m=[];for(let e of t.solids)e.x+e.w<=o.x+.01||e.x>=o.x+o.w-.01||e.y+e.h<=o.y+.01||e.y>=o.y+o.h-.01?p.push(e):m.push(e);let h=[],g=[];for(let e of t.doors){let n=Ot(e,t,p,m);n===null?g.push(e):h.push(n)}re=h,ie=t;for(let e of t.gates){let t=h.find(t=>Nh(t.rect,e.rect,1.4));t!==void 0&&t.warm&&ae.add(t)}let _=new Set,v=new Map;for(let e of t.decor){if(e.z!==0||Oh.indexOf(e.kind)===-1)continue;let t=[];for(let n of m)_.has(n)||Mh(e.rect,n,.06)&&(t.push(n),_.add(n));v.set(e,t)}Lt.length=0;let y=t.decor.slice().sort((e,t)=>e.z-t.z);for(let e of y){if(e.kind===`embers`){Lt.push(e);continue}Dt(e,v.get(e)??[],t,a)}if(Lt.length>0){let e=t.ambience===void 0?a.emberDensity:t.ambience.emberDensity;Tt(Lt,e,a)}for(let e of m)_.has(e)||Et(e,a);for(let e of p)Pt(e,h,t,a);for(let e of g)Nt(e,a);for(let e of t.gates){let t=h.find(t=>Nh(t.rect,e.rect,1.4));N.push({id:e.id,mesh:Ft(e.rect,a,t!==void 0&&t.warm)})}for(let e of t.breakables)P.push({id:e.id,mesh:It(e.rect,a)});Pe(i)},syncGates:Pe,setPlayerPos(e,t){pe=e,me=t},sync(e,t,n,r,i,a){let o=n.feel,s=Math.max(o.dawnDoorGlow-1,.001),c=Math.min(Math.max((a-1)/s,0),1),l=Math.max(o.dawnSpillCap,1);for(let e of oe){e.material.opacity=Math.min(e.opacity*a,1);let t=Math.min(1+.35*c,l,e.grow);e.mesh.scale.x=e.scaleX*t,e.mesh.scale.y=e.lengthOnly?e.scaleY:e.scaleY*t}for(let e of se)e.material.color.copy(e.base).lerp(U,c*.4).multiplyScalar(1+c*.9);for(let e of ce)e.light.intensity=e.intensity*Math.min(a,Dh);for(let e of le){let t=c*e.lift;e.material.color.copy(e.color).lerp(U,t*.72),e.material.emissive.copy(e.emissive).lerp(U,t),e.material.emissiveIntensity=t*.9}if(ue.length>0){let e=Math.max(o.veilRestOpacity,0),n=Math.max(o.veilRevealRadius,0),r=Math.max(o.veilFadePerSec,0)*t;for(let t of ue){let i=t.rect,a=Math.min(Math.max(pe,i.x),i.x+i.w),o=Math.min(Math.max(me,i.y),i.y+i.h),s=(Math.hypot(pe-a,me-o)<=n?0:e)-t.opacity;t.opacity+=Math.abs(s)<=r?s:Math.sign(s)*r;let c=t.opacity,l=e<=0?1:1-t.opacity/e;for(let e of t.hide)e.material.opacity=e.base*c,e.material.visible=e.material.opacity>.004;for(let e of t.show)e.material.opacity=e.base*l,e.material.visible=e.material.opacity>.004;for(let e of t.lights)e.light.intensity=e.intensity*l}}let u=1+(Math.sin(e*o.flickerSpeed)*.6+Math.sin(e*o.flickerSpeed*2.37)*.4)*o.flickerAmount;for(let t of F){let n=t.furnace?r:1,i=(1+Math.sin(e*o.furnacePulseSpeed+t.phase)*t.amount)*n,a=Math.min(i*u,1.25);t.material.color.copy(t.base).multiplyScalar(a),t.light!==null&&(t.light.intensity=t.lightBase*i*u)}if(I.length>0){let t=Math.max(o.jarGlow,0),n=o.jarPulseSpeed,r=Math.min(t*.42,1);for(let i of I){let a=1+Math.sin(e*n+i.phase)*.22;i.core.color.copy(i.base).multiplyScalar(t*a),i.halo.opacity=Math.min(r*a,1),i.light!==null&&(i.light.intensity=o.jarLightIntensity*i.strength*a)}}if(L.length>0){let t=Math.max(o.conduitGlow,0),n=o.conduitFlowSpeed;for(let r of L){r.core.color.copy(r.base).multiplyScalar(t*.4),r.band.color.copy(r.base).multiplyScalar(t);let i=e*n+r.phase;for(let e=0;e<r.bands.length;e++){let t=r.bands[e];if(t===void 0)continue;let n=(i+(r.offsets[e]??0))%r.length,a=r.start+(n<0?n+r.length:n);r.axis===`x`?t.position.x=a:t.position.y=a}r.light!==null&&(r.light.intensity=r.lightBase*(.82+.26*Math.sin(e*n+r.phase)))}}let d=Ii.degToRad(o.chainSwayDeg);for(let t of R)t.pivot.rotation.z=Math.sin(e*o.chainSwaySpeed+t.phase)*d;let f=ne;if(f!==null){D.size=o.emberSize,D.opacity=o.emberOpacity;let n=Math.min(f.count,Math.max(1,Math.round(f.base*i)));n!==f.drawn&&(f.drawn=n,f.points.geometry.setDrawRange(0,n));let r=f.attribute.array,a=o.emberRiseSpeed,s=o.emberSwayAmp,c=o.emberSwaySpeed;for(let n=0;n<f.count;n++){let i=f.seed[n]??0,o=f.minY[n]??0,l=f.spanY[n]??1,u=(r[n*3+1]??o)+a*t*(.6+i%1*.8);u>o+l&&(u=o),r[n*3+1]=u,r[n*3]=(f.originX[n]??0)+Math.sin(e*c+i)*s}f.attribute.needsUpdate=!0}},dispose(){Ne();for(let e of O)e.dispose();he!==null&&(he.dispose(),he=null),ge=!1}}}var Vh=.6,Hh=1.2,Uh=.5,Wh=.52,Gh=.019,Kh=1.35,qh=-.035,Jh=-.208,Yh=new Z(16777215),Xh=-.16,Zh=.15,Qh=.45,$h=64,eg=64,tg=64,ng=.32,rg=.62,ig=.26,ag=9;function og(){let e=document.createElement(`canvas`);e.width=$h,e.height=$h;let t=e.getContext(`2d`);if(t===null)return null;let n=$h*.5,r=t.createRadialGradient(n,n,0,n,n,n);r.addColorStop(0,`rgba(255,255,255,1)`),r.addColorStop(.18,`rgba(255,255,255,0.62)`),r.addColorStop(.45,`rgba(255,255,255,0.22)`),r.addColorStop(.75,`rgba(255,255,255,0.05)`),r.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=r,t.fillRect(0,0,$h,$h);let i=new Cs(e);return i.colorSpace=Ur,i.needsUpdate=!0,i}function sg(){let e=document.createElement(`canvas`);e.width=eg,e.height=eg;let t=e.getContext(`2d`);if(t===null)return null;let n=t.createImageData(eg,eg),r=n.data;for(let e=0;e<eg;e++){let t=(e/63-.5)*2;for(let n=0;n<eg;n++){let i=(n/63-.5)*2,a=Math.sqrt(i*i+t*t),o=a>=1?0:(1-a*a)**1.2,s=(e*eg+n)*4;r[s]=255,r[s+1]=255,r[s+2]=255,r[s+3]=Math.round(kg(o)*255)}}t.putImageData(n,0,0);let i=new Cs(e);return i.colorSpace=Ur,i.needsUpdate=!0,i}function cg(){let e=document.createElement(`canvas`);e.width=tg,e.height=tg;let t=e.getContext(`2d`);if(t===null)return null;let n=t.createImageData(tg,tg),r=n.data;for(let e=0;e<tg;e++){let t=e/63,n=ig+.74*(t>=Qh?1:t/Qh),i=1-t*t;for(let t=0;t<tg;t++){let a=(t/63-.5)*2,o=1-Math.abs(a)/n,s=kg((o<=0?0:o*o)*i),c=(e*tg+t)*4;r[c]=255,r[c+1]=255,r[c+2]=255,r[c+3]=Math.round(s*255)}}t.putImageData(n,0,0);let i=new Cs(e);return i.colorSpace=Ur,i.needsUpdate=!0,i}function lg(e,t){let n=new Xo({color:t,map:e,transparent:!0,opacity:0,depthWrite:!1,depthTest:!0,blending:2,fog:!1});return new Q(new Jc(1,1),n)}var ug=[[-.09,0],[-.13,.12],[-.19,.28],[-.24,.4],[-.21,.43],[.19,.43],[.26,.37],[.19,.24],[.12,.1],[.09,0]],dg=[[-.185,.402],[.196,.402],[.222,.44],[-.176,.44]],fg=[[-.16,.08],[-.1,.2],[.03,.23],[.17,.17],[.27,.05],[.19,0],[.14,-.08],[.18,-.22],[.2,-.42],[.172,-.62],[.13,-.5],[.075,-.71],[.015,-.53],[-.055,-.74],[-.125,-.55],[-.2,-.7],[-.255,-.48],[-.3,-.26],[-.27,-.08],[-.22,0]],pg=[[.075,.045],[0,.065],[-.115,.03],[-.245,-.035],[-.355,-.135],[-.4,-.215],[-.325,-.175],[-.215,-.108],[-.095,-.055],[.02,-.03],[.075,-.02]],mg=[[.045,.078],[-.178,.078],[-.178,.012],[-.152,.012],[-.152,-.118],[-.126,-.142],[0,-.142],[.025,-.118],[.025,.012],[.045,.012]],hg=[[-.07,.01],[-.085,.09],[-.06,.17],[0,.21],[.09,.2],[.15,.13],[.12,.05],[.07,.01]],gg=[[.079,.198],[.127,.166],[.152,.13],[.121,.048],[.07,.008],[.068,.026],[.107,.056],[.136,.128],[.113,.157],[.073,.182]],_g=[[-.055,.02],[.055,.02],[.048,-.2],[-.048,-.2]],vg=[[-.046,.02],[.046,.02],[.04,-.2],[-.04,-.2]],yg=[[-.072,0],[.058,0],[.072,-.03],[.134,-.048],[.142,-.086],[.13,-.1],[-.072,-.1],[-.078,-.06]],bg=[[-.042,.03],[.042,.03],[.036,-.17],[-.036,-.17]],xg=[[-.036,.02],[.036,.02],[.03,-.16],[-.03,-.16]],Sg=[[0,.05],[.55,.033],[1,.011],[1,-.011],[.55,-.033],[0,-.05]],Cg=[[.9,.0176],[1,.011],[1,-.011],[.9,-.0176]],wg=[[-.06,.036],[.035,.036],[.035,-.036],[-.06,-.036]],Tg=[[-.058,.01],[.058,.01],[.058,-.168],[-.058,-.168]],Eg=[[-.04,-.022],[.04,-.022],[.04,-.148],[-.04,-.148]],Dg=[[-.04,-.022],[.04,-.022],[.04,-.148],[-.04,-.148]],Og=[[0,-.02],[.025,-.078],[0,-.14],[-.025,-.078]];function kg(e){return e<0?0:e>1?1:e}function Ag(e){return e<-1?-1:e>1?1:e}function jg(e){let t=new ac,n=!0;for(let r of e)n?(t.moveTo(r[0],r[1]),n=!1):t.lineTo(r[0],r[1]);return t.closePath(),t}function Mg(e,t,n,r){let i=new ac;return i.absellipse(e,t,n,r,0,Math.PI*2,!1,0),i}function Ng(e,t){let n=new oc,r=!0;for(let t of e)r?(n.moveTo(t[0],t[1]),r=!1):n.lineTo(t[0],t[1]);if(n.closePath(),t!==void 0)for(let e of t)n.holes.push(e);return n}function Pg(e,t,n,r){let i=new Wc(Ng(e,r),{depth:n,bevelEnabled:!1,curveSegments:10});i.translate(0,0,-n*.5),i.computeBoundingBox();let a=i.boundingBox,o=0,s=0;a!==null&&(o=(a.min.x+a.max.x)*.5,s=(a.min.y+a.max.y)*.5,i.translate(-o,-s,0));let c=new Q(i,t);return c.position.set(o,s,0),c}function Fg(e,t){let n=new Pa;n.name=`player`;let r=e.feel.actorPlateDepth,i=e.feel.actorPlateStep,a=-2*i,o=-i,s=i,c=2*i,l=t.material(`actorCoat`,{unlit:!0}),u=t.material(`bossShell`,{unlit:!0}),d=t.material(`actorCoat`,{unlit:!0,shade:Wh}),f=t.material(`actorMetal`,{unlit:!0}),p=t.material(`void`,{unlit:!0,fog:!1}),m=t.material(`actorGlass`,{unlit:!0}),h=t.material(`reward`,{unlit:!0});for(let e of[l,u,d,f,m,h])e.fog=!1,e.needsUpdate=!0;let g=new Z(l.color),_=new Z(u.color),v=new Z(d.color),y=new Z(f.color),b=new Z(m.color),x=new Z(h.color),S=new Z(t.colorOf(`void`)),C=new Z,w=new Os(e.feel.actorPinRadius,12);function T(e,t,n){let r=new Q(w,d);return r.position.set(e,t,n),r}let E=new Os(Gh,10),D=new Pa;n.add(D);let O=new X;O.position.set(0,Uh,0),D.add(O);let k=new X;k.position.set(0,.52,a),O.add(k);let A=Pg(fg,u,r);k.add(A);let j=new X;j.position.set(qh,.6799999999999999,a-i*.4),O.add(j),j.add(Pg(pg,u,r));let M=new X;M.position.set(Jh,.015000000000000013,o),O.add(M),M.add(Pg(mg,l,r));let N=new Q(E,f);N.position.set(-.066,.004,r*.6),M.add(N);let P=Pg(ug,l,r);P.position.z=0,O.add(P);let F=Pg(dg,f,r*.8);F.position.z=s,O.add(F);let I=new X;I.position.set(0,.43999999999999995,0),I.rotation.z=-.04,O.add(I);let L=Pg(hg,l,r,[Mg(.042,.115,.031,.058)]);L.position.z=0,I.add(L);let ee=Pg(gg,f,r*.8);ee.position.z=s,I.add(ee);let R=Pg([[-.02,.03],[.11,.03],[.11,.2],[-.02,.2]],p,r*.6);R.position.z=o,I.add(R);function te(e,t,n){let i=new X;i.position.set(e,Uh,t),D.add(i),i.add(Pg(_g,n,r)),i.add(T(0,0,r*.6));let a=new X;a.position.set(0,-.2,0),i.add(a),a.add(Pg(vg,n,r));let o=new X;return o.position.set(0,-.2,0),a.add(o),o.add(Pg(yg,l,r)),{hip:i,knee:a,boot:o}}let z=te(-.05,o,u),B=te(.05,s,l);function V(e,t,n){let i=new X;i.position.set(e,.38,t),O.add(i),i.add(Pg(bg,n,r)),i.add(T(0,0,r*.6));let a=new X;a.position.set(0,-.17,0),i.add(a),a.add(Pg(xg,n,r));let o=new X;return o.position.set(0,-.16,0),a.add(o),{shoulder:i,elbow:a,hand:o}}let ne=V(-.04,o,u),H=ne.shoulder,re=ne.elbow;H.rotation.z=.15,re.rotation.z=1.15;let ie=new X;ie.position.set(0,0,c-o),ne.hand.add(ie);let ae=new Pa;ae.position.set(0,.03,0),ie.add(ae);let oe=Pg(Tg,f,r,[jg(Eg)]);ae.add(oe);let se=new Q(new $c(.022,.007,4,10),f);se.position.set(0,.03,0),ae.add(se);let ce=Pg(Dg,m,r*.7);ce.position.z=r*.6,ae.add(ce);let le=Pg(Og,h,r*.5);le.position.z=r*1.1,ae.add(le);let ue=le.position.y,de=new Xl(t.colorOf(`reward`),e.feel.playerLightIntensity,e.feel.playerLightDistance,2);de.position.set(0,-.085,2*i),ae.add(de),em(de);let fe=V(.02,s,l),pe=fe.shoulder,me=fe.elbow,U=new X;U.position.set(0,0,c-s),fe.hand.add(U);let he=Pg(wg,l,r);U.add(he);let ge=new Q(new $c(.028,.008,4,10),l);ge.position.set(-.058,0,0),U.add(ge);let _e=new X;_e.position.set(.03,0,0),U.add(_e),_e.add(Pg(Sg,l,r*.7)),_e.add(Pg(Cg,f,r*.72)),n.traverse(e=>{let n=e;n.isMesh===!0&&n.layers.set(t.actorLayer)}),Gm(n,e.feel.outlineThickness,t);let W=new Pa;W.name=`lanternLight`,n.add(W);let G=t.colorOf(`reward`),K=lg(og(),G),ve=lg(cg(),G),ye=lg(sg(),G);W.add(ve),W.add(ye),W.add(K);for(let e of[K,ve,ye])e.layers.set(t.actorLayer),e.renderOrder=2;let be=K.material,xe=ve.material,Se=ye.material,Ce=new Y,we=1,q=1,Te=!0,Ee=0,De=0,Oe=0,ke=0,Ae=0,je=0,Me=0,Ne=-1,Pe=-1,Fe=0;function Ie(e,t,n){let r=Ii.degToRad(n.feel.needleRestDeg),i=Ii.degToRad(n.feel.needleBackDeg),a=Ii.degToRad(n.feel.needleFrontDeg),o=e.attackUntil-t;if(e.attackPhase===`windup`){let e=kg(1-o/(Math.max(n.attack.windupMs,1)/1e3));return r+(i-r)*(e*e)}if(e.attackPhase===`active`){let e=kg(1-o/(Math.max(n.attack.activeMs,1)/1e3));return i+(a-i)*e**.6}if(e.attackPhase===`recovery`){let e=kg(1-o/(Math.max(n.attack.recoveryMs,1)/1e3));return a+(r-a)*e}return r}function Le(e,t,n){let r=e.attackUntil-t,i=-.45,a=1.25;if(e.attackDir===`up`?(i=.55,a=2.25):e.attackDir===`down`&&(i=1.55,a=.1),e.attackPhase===`windup`){let e=kg(1-r/(Math.max(n.attack.windupMs,1)/1e3));return e*e*i}if(e.attackPhase===`active`){let e=kg(1-r/(Math.max(n.attack.activeMs,1)/1e3));return i+(a-i)*e**.55}if(e.attackPhase===`recovery`){let e=kg(1-r/(Math.max(n.attack.recoveryMs,1)/1e3));return a*(1-e)}return 0}return{group:n,sync(e,t,r,i,a){let o=a.feel,s=Math.max(0,Math.min(i-Ee,.1));Ee=i;let c=e.prev.x+(e.pos.x-e.prev.x)*t,p=e.prev.y+(e.pos.y-e.prev.y)*t;n.position.set(c,p,0),D.scale.set(a.player.width/Vh,a.player.height/Hh,1);let w=r<e.dashUntil,T=e.attackPhase!==`none`,E=r<e.hurtUntil,M=e.health<=0;M&&Pe<0&&(Pe=r),M||(Pe=-1),e.hurtUntil>Fe&&(Me+=o.courierLanternSwingDeg*.14*e.facing,Ae+=5),Fe=e.hurtUntil,e.grounded&&!Te?(q=o.landSquash,Ae-=7,Me-=2.4):!e.grounded&&Te&&e.vel.y>0&&(q=2-o.jumpSquash,Ne=r),Te=e.grounded;let N=Math.min(1,Math.max(o.squashRecoverPerSec,0)*s);q+=(1-q)*N;let P=Math.abs(e.vel.x),F=Ag(e.vel.x*e.facing/Math.max(a.player.walkSpeed,.01)),L=e.grounded&&P>.4&&!M;De+=L?s*o.legSwingSpeed*(.45+.55*Math.abs(F)):s*o.legSwingSpeed*.15;let ee=Pe<0?0:kg((r-Pe)/(Math.max(o.courierDeathCrumpleMs,1)/1e3)),R=0;if(R=M?-Ii.degToRad(70)*ee:E?Ii.degToRad(o.courierHurtRecoilDeg):w?-Ii.degToRad(o.courierLeanRunDeg*1.8):e.grounded?-Ii.degToRad(o.courierLeanRunDeg)*F:-Ii.degToRad(o.courierLeanAirDeg)*F,T&&!M&&!E){let t=Ii.degToRad(o.courierLeanAttackDeg);e.attackPhase===`windup`?R+=t:e.attackPhase===`active`&&(R-=t)}Oe+=(R-Oe)*Math.min(1,14*s),O.rotation.z=Oe;let te=T&&e.attackDir===`side`?o.courierAttackTwistDeg:0,V=Ii.degToRad(te)*(e.attackPhase===`windup`?-1:1);O.rotation.y+=(V-O.rotation.y)*Math.min(1,16*s);let ne=M||L?0:Math.sin(i*o.courierBreathSpeed);I.rotation.z=-.04+ne*o.courierBreathAmount;let ae=Ii.degToRad(o.legSwingDeg),oe=Ii.degToRad(o.courierKneeBendDeg);if(M)B.hip.rotation.z+=(.9-B.hip.rotation.z)*Math.min(1,8*s),z.hip.rotation.z+=(.2-z.hip.rotation.z)*Math.min(1,8*s),B.knee.rotation.z+=(-1.5-B.knee.rotation.z)*Math.min(1,8*s),z.knee.rotation.z+=(-1.1-z.knee.rotation.z)*Math.min(1,8*s);else if(!e.grounded){let t=Ag(e.vel.y/Math.max(a.player.jumpVelocity,.01)),n=.34+t*.16,r=-.4+t*.12;B.hip.rotation.z+=(n-B.hip.rotation.z)*Math.min(1,12*s),z.hip.rotation.z+=(r-z.hip.rotation.z)*Math.min(1,12*s),B.knee.rotation.z+=(-.35-B.knee.rotation.z)*Math.min(1,12*s),z.knee.rotation.z+=(-.85-z.knee.rotation.z)*Math.min(1,12*s)}else if(L){let e=Math.sin(De),t=Math.sin(De+Math.PI);B.hip.rotation.z=e*ae,z.hip.rotation.z=t*ae,B.knee.rotation.z=-Math.max(0,-e)*oe,z.knee.rotation.z=-Math.max(0,-t)*oe}else B.hip.rotation.z*=.78,z.hip.rotation.z*=.78,B.knee.rotation.z*=.78,z.knee.rotation.z*=.78;B.boot.position.y=-.2+Math.max(0,-B.knee.rotation.z)*o.courierBootLift,z.boot.position.y=-.2+Math.max(0,-z.knee.rotation.z)*o.courierBootLift,B.boot.rotation.z=-B.hip.rotation.z-B.knee.rotation.z,z.boot.rotation.z=-z.hip.rotation.z-z.knee.rotation.z;let se=-Ii.degToRad(o.courierHemSwingDeg)*F;L&&(se+=Math.sin(De)*Ii.degToRad(o.courierHemSwingDeg)*.3),M&&(se=.3);let ce=Math.max(o.courierHemFollowPerSec,.1);Ae+=(se-ke)*ce*ce*.5*s,Ae*=Math.max(0,1-ce*.62*s),ke+=Ae*s,k.rotation.z=ke,j.rotation.z=ke*Kh;let fe=e.grounded||M?0:o.courierHemFlareAir,he=w?o.courierHemFlareAir*1.5:fe;A.scale.set(1+he,1-he*.35,1);let ge=-Ii.degToRad(o.courierLanternSwingDeg)*F;M&&(ge=.5);let G=Math.max(o.courierLanternFollowPerSec,.1);Me+=(ge-je)*G*G*.42*s,Me*=Math.max(0,1-G*.5*s),je+=Me*s,ie.rotation.z=je-H.rotation.z-re.rotation.z;let Re=Ii.degToRad(o.courierArmSwingDeg),ze=Le(e,r,a);T||(ze=M?-.6:e.grounded?L?-Math.sin(De)*Re:0:-.3),pe.rotation.z+=(ze-pe.rotation.z)*Math.min(1,(T?30:12)*s),me.rotation.z=T?.12:.3-Math.abs(pe.rotation.z)*.3;let Be=M?.7:L?.2+Math.sin(De)*Re*.35:.2;H.rotation.z+=(Be-H.rotation.z)*Math.min(1,10*s);let Ve=e.longwick?a.attack.longwickReach/Math.max(a.attack.reach,.01):1,He=e.attackPhase===`active`,Ue=a.player.height*o.needleRestLengthRatio*Ve*(He?o.needleActiveStretch:1);_e.scale.set(Ue,1,1);let We=0;e.attackDir===`up`?We=Math.PI*.5:e.attackDir===`down`&&(We=-Math.PI*.5);let Ge=pe.rotation.z+me.rotation.z;T?U.rotation.z=We+Ie(e,r,a)-Ge:U.rotation.z=Ii.degToRad(o.needleRestDeg)-Ge*.55;let Ke=q,qe=1/Math.sqrt(Math.max(q,.05));if(!e.grounded&&Ne>=0){let t=Math.max(o.courierJumpAnticipateMs,1)/1e3,n=r-Ne;if(n<t){let e=kg(n/t),r=o.courierJumpCrouch+(1-o.courierJumpCrouch)*e;Ke*=r,qe/=r}else{let t=1-kg(Math.abs(e.vel.y)/Math.max(a.player.jumpVelocity,.01)),n=1+(o.courierApexStretch-1)*t;Ke*=n,qe/=n}}w&&(qe*=o.dashStretch,Ke/=o.dashStretch),M&&(Ke*=1-.42*ee,qe*=1+.16*ee),L&&(Ke*=1+Math.sin(De*2)*o.courierRunBobAmp),n.scale.set(qe*e.facing,Ke,1);let Je=1+(Math.sin(i*o.flickerSpeed)*.6+Math.sin(i*o.flickerSpeed*1.73+1.1)*.4)*o.flickerAmount,Ye=1,Xe=o.playerEmissive*Je,Ze=o.playerLightIntensity*Je;if(M){let e=kg((r-Pe)/(Math.max(o.courierGutterMs,1)/1e3)),t=1-e+Math.max(0,Math.sin(r*26))*(1-e)*.5;Ye=Math.max(.02,t),Xe=o.playerEmissive*t,Ze=o.playerLightIntensity*t*.8,h.color.copy(x).lerp(S,kg(e*1.1)),m.color.copy(b).lerp(_,kg(e*1.15))}else h.color.copy(x),m.color.copy(b).lerp(Yh,kg((Xe-.5)*.7));let Qe=r<e.invulnerableUntil&&!w&&!M,$e=0;if(Qe){let e=Math.max(o.blinkPeriodMs,1)/1e3,t=Math.floor(r/e)%2==0;$e=t?0:.62,Xe=t?o.playerEmissive:o.blinkEmissive,Ze=t?o.playerLightIntensity:o.playerLightIntensity*.25,m.color.copy(b).lerp(Yh,kg((Xe-.5)*.7))}let et=kg(o.playerCoatEmissive);C.copy(g).lerp(y,et).lerp(S,$e),l.color.copy(C),C.copy(_).lerp(y,et).lerp(S,$e),u.color.copy(C),C.copy(v).lerp(y,et).lerp(S,$e),d.color.copy(C),C.copy(y).lerp(S,$e),f.color.copy(C),le.scale.set(Ye,Ye,1),le.position.y=ue-(1-Ye)*.02,de.intensity=Ze,de.distance=o.playerLightDistance;let tt=e.grounded&&!M?1:0;we+=(tt-we)*Math.min(1,ag*s);let nt=kg(Ze/Math.max(o.playerLightIntensity,1e-4)),rt=qe*e.facing;W.scale.set(1/(rt===0?1:rt),1/Math.max(Ke,1e-4),1),de.updateWorldMatrix(!0,!1),Ce.setFromMatrixPosition(de.matrixWorld);let it=Ce.x-n.position.x,at=Ce.y-n.position.y,ot=Math.max(o.lanternHaloRadius,0)*2;K.position.set(it,at,Xh),K.scale.set(ot,ot,1);let st=Math.max(o.lanternHaloOpacity,0)*nt;be.opacity=st,K.visible=st>.002;let ct=Math.max(o.lanternBeamLength,0);ve.position.set(it,at-ct*.5,Zh),ve.scale.set(ct*rg,ct,1);let lt=Math.max(o.lanternBeamOpacity,0)*nt*we;xe.opacity=lt,ve.visible=lt>.002;let ut=Math.max(o.lanternPoolWidth,0),dt=ut*ng;ye.position.set(it*.35,0,Xh),ye.scale.set(ut,dt,1);let ft=Math.max(o.lanternPoolOpacity,0)*nt*we;Se.opacity=ft,ye.visible=ft>.002}}}var Ig=new Z(16777215),Lg=[[-.3,.3],[-.33,.5],[-.3,.66],[-.22,.74],[.14,.74],[.28,.68],[.33,.52],[.3,.34],[.14,.22],[-.12,.24]],Rg=[[-.2,.7],[-.23,.83],[-.16,.94],[.03,.98],[.19,.92],[.24,.8],[.19,.7]],zg=[[-.15,.81],[.19,.815],[.2,.865],[-.15,.86]],Bg=[[-.18,.79],[.23,.795],[.24,.885],[-.18,.88]],Vg=[[-.235,.685],[.235,.685],[.27,.735],[-.2,.735]],Hg=[[-.075,.02],[.075,.02],[.085,-.16],[.145,-.19],[.15,-.27],[-.115,-.27],[-.11,-.18],[-.085,-.15]],Ug=[[-.055,.03],[.055,.03],[.048,-.24],[-.048,-.24]],Wg=[[0,.055],[.3,.095],[.35,.005],[.28,-.05],[0,-.05]],Gg=[[0,-.05],[.28,-.05],[.35,.005],[.3,.012],[.26,-.022],[0,-.022]],Kg=[[-.38,.3],[-.4,.78],[-.32,.9],[.32,.9],[.4,.78],[.4,.3],[.32,.22],[-.32,.22]],qg=[[-.4,.4],[.4,.4],[.4,.435],[-.4,.435]],Jg=[[-.4,.72],[.4,.72],[.4,.755],[-.4,.755]],Yg=[[-.1,.86],[.1,.86],[.09,1],[-.09,1]],Xg=[[-.15,0],[.15,0],[.2,.25],[-.2,.25]],Zg=[[-.11,.24],[.11,.24],[.13,.05],[.13,0],[-.13,0],[-.13,.05]],Qg=[[-.13,0],[.13,0],[.13,.035],[-.13,.035]],$g=[[-.42,.5],[.38,.5],[.3,.6],[.24,.73],[-.22,.73],[-.3,.6]],e_=[[-.425,.492],[.385,.492],[.39,.54],[-.42,.54]],t_=[[-.26,.18],[.2,.18],[.28,.54],[-.34,.54]],n_=[[-.16,.26],[.09,.26],[.12,.46],[-.2,.46]],r_=[[-.185,.235],[.115,.235],[.15,.485],[-.235,.485]],i_=[[-.272,.165],[.212,.165],[.218,.215],[-.278,.215]],a_=[[-.08,.68],[.2,.68],[.26,.75],[.17,.8],[.34,.88],[.14,.99],[0,1.02],[-.1,.93],[-.12,.78]],o_=[[-.03,-.021],[.4,-.013],[.4,.013],[-.03,.021]],s_=[[.33,-.019],[.41,-.014],[.45,0],[.41,.014],[.33,.019]],c_=[[-.032,-.085],[.032,-.085],[.032,0],[-.032,0]],l_=[[-.013,-.068],[.013,-.068],[.013,-.017],[-.013,-.017]],u_=[[-.19,.34],[.19,.34],[.15,.55],[-.15,.55]],d_=[[-.155,.545],[.155,.545],[.16,.585],[-.16,.585]],f_=[[.29,.1],[.37,.19],[.16,.3],[0,.32],[-.18,.27],[-.29,.14],[-.31,-.04],[-.24,-.2],[-.1,-.29],[.08,-.3],[.22,-.23],[.29,-.1]],p_=[[-.55,.52],[.06,.44],[.55,.52]],m_=.5,h_=.44,g_=.215,__=.245,v_=.1;function y_(e){let t=-e;return[[-.052,.03],[.052,.03],[.038,t+.15],[.072,t+.07],[.072,t],[-.072,t],[-.072,t+.07],[-.038,t+.15]]}function b_(e,t){let n=[];for(let r of e)n.push([r[0],r[1]*t]);return n}function x_(e,t,n){let r=[];for(let i=0;i<t;i++){let a=i/t*Math.PI*2;r.push([Math.cos(a)*e,Math.sin(a)*e*n])}return r}function S_(e){return e<0?0:e>1?1:e}function C_(e){return e>.62?1:e>.26?.5:0}function w_(e,t){let n=new oc,r=!0;for(let t of e)r?(n.moveTo(t[0],t[1]),r=!1):n.lineTo(t[0],t[1]);if(n.closePath(),t!==void 0)for(let e of t)n.holes.push(e);return n}function T_(e){let t=new ac,n=!0;for(let r of e)n?(t.moveTo(r[0],r[1]),n=!1):t.lineTo(r[0],r[1]);return t.closePath(),t}function E_(e,t,n,r){let i=new Wc(w_(e,r),{depth:n,bevelEnabled:!1,curveSegments:8});i.translate(0,0,-n*.5),i.computeBoundingBox();let a=i.boundingBox,o=0,s=0;a!==null&&(o=(a.min.x+a.max.x)*.5,s=(a.min.y+a.max.y)*.5,i.translate(-o,-s,0));let c=new Q(i,t);return c.position.set(o,s,0),c}function D_(e,t){let n=new Pa;n.name=`enemies`;let r=e.feel.actorPlateDepth,i=e.feel.actorPlateStep,a=t.material(`actorMetal`,{unlit:!0}),o=new Os(e.feel.actorPinRadius,12),s=t.material(`enemyBody`,{unlit:!0}),c=t.material(`ash`,{unlit:!0}),l=t.material(`bossShell`,{unlit:!0}),u=t.material(`void`,{unlit:!0,fog:!1});for(let e of[a,s,c,l])e.fog=!1,e.needsUpdate=!0;let d=new Z(t.colorOf(`ash`,e.feel.guardVisorRestShade)),f=new Z(t.colorOf(`enemyAccent`)),p=new Z(t.colorOf(`reward`)),m=new Z(t.colorOf(`danger`)),h=[],g=new Z;function _(e,t,n){let r=new Q(o,a);return r.position.set(e,t,n),r}function v(){let o=new Pa,u=new X;o.add(u);let p=new X;p.position.set(0,.24,0),u.add(p);let m=s.clone(),h=c.clone(),g=s.clone();g.color.copy(d);let v=new X;v.position.set(0,-.24,0),p.add(v);let y=E_(Lg,m,r);v.add(y);let b=E_(Vg,a,r*.8);b.position.z=i,v.add(b);for(let e of[-.17,0,.17])v.add(_(e,.44,r*.6));let x=new X;x.position.set(0,.72,0),v.add(x);let S=E_(Rg,h,r,[T_(zg)]);S.position.y-=.72,x.add(S);let C=E_(Bg,g,r*.55);C.position.y-=.72,C.position.z=-i*.6,x.add(C);let w=[],T=[[-.13,-i,m],[.13,i,h]];for(let[e,t,n]of T){let i=new X;i.position.set(e,.27,t),u.add(i),i.add(E_(Hg,n,r)),w.push(i)}let E=new X;E.position.set(.1,.62,i),v.add(E),E.add(E_(Ug,h,r)),E.add(_(0,0,r*.6));let D=new X;D.position.set(0,-.24,i),E.add(D),D.rotation.z=-.4,D.add(E_(Wg,g,r));let O=E_(Gg,a,r*.7);return O.position.z=r*.7,D.add(O),n.add(o),o.traverse(e=>{let n=e;n.isMesh===!0&&n.layers.set(t.actorLayer)}),Gm(o,e.feel.outlineThickness,t),{id:-1,kind:`guard`,group:o,stack:u,lean:p,body:v,head:x,arm:E,hips:w,feet:[],chains:[],iris:null,slateMat:m,ashMat:h,accentMat:g,backMat:null,slateBase:new Z(s.color),ashBase:new Z(c.color),accentBase:d,accentHot:f,backBase:new Z(l.color),restY:-.24,deadAt:0,squash:1,phase:0,seen:!1,wasGrounded:!0}}function y(){let o=new Pa,u=new X;o.add(u);let d=new X;d.position.set(0,.22,0),u.add(d);let f=s.clone(),h=c.clone(),g=s.clone();g.color.copy(p);let v=new X;v.position.set(0,-.22,0),d.add(v),v.add(E_(Kg,f,r));let y=E_(qg,a,r*.8);y.position.z=i,v.add(y);let b=E_(Jg,a,r*.8);b.position.z=i,v.add(b);let x=E_(Yg,h,r);v.add(x);let S=Math.max(2,Math.round(e.feel.boilerRivets));for(let e=0;e<S;e++){let t=-.28+.56*e/Math.max(S-1,1);v.add(_(t,.56,r*.6))}let C=E_(Xg,g,r*.7);C.position.z=-i,v.add(C);let w=[];for(let e of[-.24,.24]){let t=new X;t.position.set(e,0,i),u.add(t),t.add(E_(Zg,h,r));let n=E_(Qg,a,r*.7);n.position.z=r*.7,t.add(n),w.push(t)}return n.add(o),o.traverse(e=>{let n=e;n.isMesh===!0&&n.layers.set(t.actorLayer)}),Gm(o,e.feel.outlineThickness,t),{id:-1,kind:`stomper`,group:o,stack:u,lean:d,body:v,head:null,arm:null,hips:[],feet:w,chains:[],iris:null,slateMat:f,ashMat:h,accentMat:g,backMat:null,slateBase:new Z(s.color),ashBase:new Z(c.color),accentBase:p,accentHot:m,backBase:new Z(l.color),restY:-.22,deadAt:0,squash:1,phase:0,seen:!1,wasGrounded:!0}}function b(){let o=new Pa,u=new X;o.add(u);let d=new X;d.position.set(0,.5,0),u.add(d);let f=s.clone(),h=c.clone(),g=l.clone(),v=s.clone();v.color.copy(p);let y=new X;y.position.set(0,-.5,0),d.add(y);let b=E_($g,g,r);b.position.z=-i,y.add(b);let x=E_(e_,a,r*.8);x.position.z=i,y.add(x);let S=E_(r_,v,r*.6);S.position.z=-i*.6,y.add(S),y.add(E_(t_,f,r,[T_(n_)]));let C=E_(i_,a,r*.8);C.position.z=i,y.add(C);let w=new X;w.position.set(0,.68,i),y.add(w);let T=E_(a_,f,r);T.position.y-=.68,w.add(T),w.add(_(0,0,r*.6));let E=new X;E.position.set(.2,.13,i),w.add(E),E.add(E_(o_,f,r*.8));let D=E_(s_,a,r*.8);D.position.z=r*.6,E.add(D),E.add(_(0,0,r*.6));let O=[];for(let[e,t]of[[-.2,2],[.13,3]]){let n=y,o=.175;for(let s=0;s<t;s++){let t=new X;t.position.set(s===0?e:0,o,s===0?i*.5:0),n.add(t),t.add(E_(c_,a,r*.7,[T_(l_)])),O.push(t),n=t,o=-.085}y.add(_(e,.175,r*.6))}return n.add(o),o.traverse(e=>{let n=e;n.isMesh===!0&&n.layers.set(t.actorLayer)}),Gm(o,e.feel.outlineThickness,t),{id:-1,kind:`lamplighter`,group:o,stack:u,lean:d,body:y,head:w,arm:E,hips:[],feet:[],chains:O,iris:null,slateMat:f,ashMat:h,accentMat:v,backMat:g,slateBase:new Z(s.color),ashBase:new Z(c.color),accentBase:p,accentHot:m,backBase:new Z(l.color),restY:-.5,deadAt:0,squash:1,phase:0,seen:!1,wasGrounded:!1}}function x(){let o=new Pa,d=new X;o.add(d);let f=new X;f.position.set(0,h_,0),d.add(f);let h=s.clone(),g=c.clone(),v=s.clone();v.color.copy(p);let y=new X;y.position.set(0,-.44,0),f.add(y);let b=[],x=0;for(let e of p_){let t=new X;t.position.set((x-1)*.07,h_,(x-1)*i),t.rotation.z=e[0],d.add(t),t.add(E_(y_(e[1]),h,r)),d.add(_((x-1)*.07,h_,r*.6+i)),b.push(t),x++}y.add(E_(u_,h,r));let S=E_(d_,a,r*.8);S.position.z=i,y.add(S);let C=new X;C.position.set(0,m_,0),y.add(C);let w=.21999999999999997,T=Math.max(e.sentry.width/Math.max(e.sentry.height,.01),.1),E=E_(b_(f_,T),h,r);E.position.y+=w,E.position.z=-i,C.add(E);let D=E_(x_(g_,18,T),u,r*.8);D.position.y+=w,C.add(D);let O=E_(x_(v_,16,T),v,r*.6);O.position.y+=w,O.position.z=i*.5,C.add(O);let k=E_(x_(__,22,T),a,r*.7,[T_(x_(g_,22,T))]);return k.position.y+=w,k.position.z=i,C.add(k),C.add(_(0,0,r*.6+i)),n.add(o),o.traverse(e=>{let n=e;n.isMesh===!0&&n.layers.set(t.actorLayer)}),Gm(o,e.feel.outlineThickness,t),{id:-1,kind:`sentry`,group:o,stack:d,lean:f,body:y,head:C,arm:null,hips:b,feet:[],chains:[],iris:O,slateMat:h,ashMat:g,accentMat:v,backMat:null,slateBase:new Z(s.color),ashBase:new Z(c.color),accentBase:p,accentHot:m,backBase:new Z(l.color),restY:-.44,deadAt:0,squash:1,phase:0,seen:!1,wasGrounded:!0}}function S(e){for(let t of h)if(t.id===e.id&&t.kind===e.kind)return t;for(let t of h)if(!t.seen&&t.kind===e.kind&&t.id===-1)return t.id=e.id,t.deadAt=0,t;let t=e.kind===`guard`?v():e.kind===`lamplighter`?b():e.kind===`sentry`?x():y();return t.id=e.id,h.push(t),t}let C=0;return{group:n,sync(e,t,n,r){let a=r.feel,o=Math.max(0,Math.min(n-C,.1));C=n;let s=Math.min(1,26*o);for(let e of h)e.seen=!1;for(let c of e){let e=S(c);e.seen=!0;let l=c.kind===`guard`?r.guard:c.kind===`lamplighter`?r.lamplighter:c.kind===`sentry`?r.sentry:r.stomper,u=c.kind===`lamplighter`?Math.max(r.lamplighter.dropTelegraphMs,1)/1e3:c.kind===`sentry`?Math.max(r.sentry.chargeMs,1)/1e3:c.kind===`stomper`?Math.max(r.stomper.telegraphMs,1)/1e3:Math.max(r.guard.telegraphMs,1)/1e3,d=!c.alive||c.state===`dead`,f=c.prev.x+(c.pos.x-c.prev.x)*t,p=c.prev.y+(c.pos.y-c.prev.y)*t,m=1;if(d){e.deadAt===0&&(e.deadAt=n);let t=Math.max(a.enemyDeathFadeMs,1)/1e3;if(m=1-(n-e.deadAt)/t,m<=0){e.group.visible=!1;continue}}else e.deadAt=0;let h=C_(c.flash<0?0:c.flash>1?1:c.flash),_=c.kind===`sentry`?0:h*a.enemyRecoilDistance*-c.facing;if(e.group.visible=!0,e.group.position.set(f+_,p,0),e.stack.scale.z=.2+.8*m,e.stack.position.z=-(1-m)*i,c.kind===`stomper`){if(c.grounded&&!e.wasGrounded&&(e.squash=a.stomperSquash),c.state===`telegraph`){let t=S_(1-(c.stateUntil-n)/u),r=t*t*(3-2*t);e.squash=Math.min(e.squash,1+(a.stomperSquash-1)*r)}else e.squash+=(1-e.squash)*Math.min(1,a.stomperSquashRecoverPerSec*o)}e.wasGrounded=c.grounded;let v=c.kind===`stomper`?e.squash:1,y=1/Math.sqrt(Math.max(v,.05));e.group.scale.set(l.width*c.facing*m*y,l.height*m*v,1);let b=Ii.degToRad(a.enemyLeanDeg),x=Math.abs(c.vel.x)>.2;c.kind===`lamplighter`?e.phase+=o*r.lamplighter.bobSpeed:c.kind===`sentry`?e.phase+=o*1.1:x&&c.state===`patrol`&&(e.phase+=o*a.legSwingSpeed*.42);let C=0,w=0,T=.6,E=0,D=1,O=0;if(c.kind===`sentry`){if(d)C=b*.9,E=.75,w=-.05,D=.18;else if(c.state===`telegraph`){let e=S_(1-(c.stateUntil-n)/u);C=-b*.32*e,E=-.1*e,D=1+1.15*e*e,O=.16*e}else c.state===`attack`?(C=b*.22,E=.05,D=2.7,O=.22):c.state===`recover`?(C=b*.55,E=.5,w=-.03,D=.4):c.state===`hurt`?(E=.14,D=1.15):(E=Math.sin(e.phase*.6)*.07,D=1+Math.sin(e.phase*1.4)*.06)}else if(c.kind===`lamplighter`){if(c.state===`telegraph`){let e=S_(1-(c.stateUntil-n)/u);C=b*.4*e,T=-.35+.85*e,E=-.2*e}else c.state===`attack`?(C=-b*.5,T=-1.25,E=-.3):c.state===`recover`?(C=b*.15,w=-.02,T=-.8,E=.2):c.state===`hurt`?(C=b*.9,T=-.1,E=.34):(C=Math.sin(e.phase*.45)*b*.12,T=-.35+Math.sin(e.phase*.7)*.05,E=Math.sin(e.phase*.5)*.03)}else if(c.state===`telegraph`){C=b;let e=S_(1-(c.stateUntil-n)/u);T=.6+2*e,E=-.06*e}else c.state===`attack`?(C=-b*1.2,T=.3):c.state===`recover`?(C=Ii.degToRad(a.guardSlumpDeg)*.5,w=-.05,T=.12,E=Ii.degToRad(a.guardSlumpDeg)):c.state===`hurt`?(C=b*.8,T=.75):x&&(C=b*.25+Math.sin(e.phase*2)*b*.16,T=.6+Math.sin(e.phase)*.18);c.kind===`stomper`&&(C=0),e.lean.rotation.z+=(C-e.lean.rotation.z)*s;let k=c.kind!==`lamplighter`&&x&&c.state===`patrol`?Math.abs(Math.cos(e.phase))*.03:0;e.body.position.y+=(w+e.restY+k-e.body.position.y)*s;let A=e.arm;A!==null&&(A.rotation.z+=(T-A.rotation.z)*s);let j=e.head;j!==null&&(j.rotation.z+=(E-j.rotation.z)*s);let M=e.iris;if(M!==null){let e=M.scale.x+(D-M.scale.x)*s;M.scale.set(e,e,1)}let N=Ii.degToRad(a.enemyLeanDeg)*.9,P=0;for(let t of e.hips){let n=0;if(c.kind===`sentry`){let e=p_[P];n=(e===void 0?0:e[0])*(1-O)+(d&&P===0?.62:0)}else x&&c.state===`patrol`&&(n=Math.sin(e.phase+P*Math.PI)*N);t.rotation.z+=(n-t.rotation.z)*s,P++}let F=0;for(let t of e.feet){let n=F===0?-1:1,r=!c.grounded,i=r?.05:0,a=r?-.04:(1-e.squash)*.28;t.position.y+=(i-t.position.y)*s,t.rotation.z+=(n*(r?.3:0)-t.rotation.z)*s;let o=.24*n;t.position.x+=(o+a*n-t.position.x)*s,F++}let I=0;for(let t of e.chains){let e=c.vel.x*-.05,i=r.lamplighter.bobSpeed,a=Math.sin(n*i*.8+I*1.4)*.14+e*(1+I*.4);t.rotation.z+=(a-t.rotation.z)*s,I++}let L=d,ee=0;if(c.state===`telegraph`){let e=S_(1-(c.stateUntil-n)/u);ee=c.kind===`stomper`?e*e*(3-2*e):.4+.6*e}else(c.state===`attack`||c.kind===`stomper`&&!c.grounded)&&(ee=1);if(c.kind!==`guard`&&L&&(ee=0),c.kind===`sentry`){if(L)g.copy(e.backBase);else if(c.state===`attack`)g.copy(e.accentHot);else if(c.state===`telegraph`){let t=S_(1-(c.stateUntil-n)/u);g.copy(e.accentBase).lerp(Ig,.12+.6*t)}else c.state===`recover`?g.copy(e.accentBase).lerp(e.backBase,.82):g.copy(e.accentBase);g.lerp(Ig,h)}else c.kind===`lamplighter`&&L?g.copy(e.backBase).lerp(Ig,h):(g.copy(e.accentBase).lerp(e.accentHot,ee).lerp(Ig,h),c.kind===`stomper`&&L&&g.lerp(e.slateBase,1-m));e.accentMat.color.copy(g),g.copy(e.slateBase).lerp(Ig,h),e.slateMat.color.copy(g),g.copy(e.ashBase).lerp(Ig,h),e.ashMat.color.copy(g);let R=e.backMat;R!==null&&(g.copy(e.backBase).lerp(Ig,h),R.color.copy(g))}for(let e of h)e.seen||(e.group.visible=!1,e.id=-1,e.deadAt=0)}}}var O_=new Z(16777215),k_=.075,A_=4,j_=64,M_=.55,N_=.09,P_=.07,F_=.14;function I_(){let e=document.createElement(`canvas`);e.width=j_,e.height=j_;let t=e.getContext(`2d`);if(t===null)return null;let n=j_*.5,r=t.createRadialGradient(n,n,0,n,n,n);r.addColorStop(0,`rgba(255,255,255,1)`),r.addColorStop(.16,`rgba(255,255,255,0.7)`),r.addColorStop(.42,`rgba(255,255,255,0.26)`),r.addColorStop(.72,`rgba(255,255,255,0.06)`),r.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=r,t.fillRect(0,0,j_,j_);let i=new Cs(e);return i.colorSpace=Ur,i.needsUpdate=!0,i}var L_=[[-.5,0],[-.497,.055],[-.44,.12],[-.405,.22],[-.392,.35],[-.385,.46],[-.345,.55],[-.25,.625],[-.15,.66],[.15,.66],[.25,.625],[.345,.55],[.385,.46],[.392,.35],[.405,.22],[.44,.12],[.497,.055],[.5,0]],R_=[[-.5,0],[.5,0],[.495,.024],[-.495,.024]],z_=[[-.393,.33],[.393,.33],[.391,.355],[-.391,.355]],B_=[[-.377,.5],[.377,.5],[.366,.525],[-.366,.525]],V_=[[-.03,.05],[.015,.14],[-.015,.24],[.03,.33],[0,.42],[.045,.5],[.085,.47],[.04,.39],[.075,.3],[.03,.21],[.06,.12],[.022,.04]],H_=[[-.2,.52],[-.27,.66],[-.3,.77],[-.24,.85],[-.08,.89],[.14,.87],[.24,.8],[.22,.67],[.17,.57],[.1,.52]],U_=[[-.16,-.07],[-.19,.03],[-.14,.11],[.02,.14],[.16,.09],[.19,0],[.14,-.08]],W_=[[-.12,-.05],[.15,-.05],[.15,.09],[-.12,.09]],G_=[[-.15,.035],[-.142,.13],[-.08,.195],[.08,.195],[.142,.13],[.15,.035]],K_=[[-.011,.042],[.011,.042],[.011,.186],[-.011,.186]],q_=[-.084,0,.084],J_=[[-.55,.96],[.55,.96],[.55,1.09],[.42,1.09],[.42,1.03],[-.42,1.03],[-.42,1.09],[-.55,1.09]];function Y_(e){return e<0?0:e>1?1:e}function X_(e){let t=new oc,n=!0;for(let r of e)n?(t.moveTo(r[0],r[1]),n=!1):t.lineTo(r[0],r[1]);return t.closePath(),t}function Z_(e,t,n,r){let i=new oc;i.absellipse(0,0,e,t,0,Math.PI*2,!1,0);let a=new ac;return a.absellipse(0,0,Math.max(e-n,.002),Math.max(t-r,.002),0,Math.PI*2,!0,0),i.holes.push(a),i}function Q_(e){let t=new oc;return t.absellipse(0,0,e,e,0,Math.PI*2,!1,0),t}function $_(e,t){let n=new Wc(e,{depth:t,bevelEnabled:!1,curveSegments:10});return n.translate(0,0,-t*.5),n}function ev(e){e.computeBoundingBox();let t=e.boundingBox;if(t===null)return[e,0,0];let n=(t.min.x+t.max.x)*.5,r=(t.min.y+t.max.y)*.5;return e.translate(-n,-r,0),[e,n,r]}function tv(e,t,n){let[r,i,a]=ev($_(X_(e),n)),o=new Q(r,t);return o.position.set(i,a,0),o}function nv(e,t){let n=new Pa;n.name=`boss`,n.visible=!1;let r=e.feel.actorPlateDepth,i=e.feel.actorPlateStep,a=-2*i,o=-i,s=i,c=2*i,l=t.material(`bossShell`,{unlit:!0}),u=t.material(`enemyBody`,{unlit:!0}),d=t.material(`ash`,{unlit:!0}),f=t.material(`chain`,{unlit:!0}),p=t.material(`actorMetal`,{unlit:!0}),m=t.material(`void`,{unlit:!0,fog:!1}),h=t.material(`bossFurnace`,{unlit:!0}),g=t.material(`void`,{unlit:!0}),_=t.material(`bossFurnace`,{unlit:!0});for(let e of[l,u,d,f,p,h,g,_])e.fog=!1,e.needsUpdate=!0;let v=new Z(l.color),y=new Z(u.color),b=new Z(d.color),x=new Z(t.colorOf(`bossFurnace`)),S=new Z(t.colorOf(`danger`)),C=new Z(t.colorOf(`void`)),w=new Z,T=new Pa;n.add(T);let E=tv(J_,l,r*1.6);E.position.z=o,T.add(E);let D=Math.max(e.feel.bellChainSpacing,.05),O=ev($_(Z_(.058,D*.54,.022,.026),r*.7))[0],k=ev($_(Z_(.052,.072,.02,.024),r*.7))[0],A=ev($_(Q_(.095),r))[0],j=ev($_(Z_(.11,.11,.022,.022),r*.7))[0],M=new Pa;M.position.set(0,1.06,o),T.add(M);let N=Math.max(2,Math.round(e.feel.bellChainLinks));for(let e=0;e<N;e++){let t=new Q(O,f);t.position.set(0,e*D,0),t.scale.x=e%2==0?1:.45,M.add(t)}let P=new X;T.add(P);let F=[];for(let e of[-.28,.28]){let t=new X;t.position.set(e,.98,o),T.add(t);for(let e=0;e<3;e++){let n=new Q(k,f);n.position.set(0,-.06-e*.085,0),n.scale.x=e%2==0?1:.45,t.add(n)}F.push(t)}let I=new X;P.add(I);let L=new X;I.add(L);let ee=tv(L_,l,r);ee.position.z=o,L.add(ee);let R=tv(R_,p,r*.8);R.position.z=o+r*.7,L.add(R);let te=tv(z_,p,r*.8);te.position.z=o+r*.7,L.add(te);let z=tv(B_,p,r*.8);z.position.z=o+r*.7,L.add(z);let B=tv(V_,m,r*.8),V=B.position.x,ne=B.position.y;B.position.z=a,L.add(B);let H=tv(V_,_,r*.7);H.position.z=a+r*.5,H.visible=!1,L.add(H);let re=tv(H_,u,r);re.position.z=s,L.add(re);let ie=tv(G_,m,r*.8);ie.position.z=c+r*.5,L.add(ie);let ae=tv(G_,h,r*.7);ae.position.z=c+r*1.05,ae.scale.set(.86,.8,1),L.add(ae);for(let e of q_){let t=tv(K_,p,r*.6);t.position.x+=e,t.position.z=c+r*1.6,L.add(t)}let oe=new X;oe.position.set(0,.89,0),L.add(oe);let se=tv(W_,g,r*.7);se.position.z=s+r*.4,oe.add(se);let ce=X_(U_);for(let e of[-.06,.02,.1]){let t=new ac;t.moveTo(e-.013,-.035),t.lineTo(e+.013,-.035),t.lineTo(e+.013,.075),t.lineTo(e-.013,.075),t.closePath(),ce.holes.push(t)}let le=ev($_(ce,r)),ue=new Q(le[0],d);ue.position.set(le[1],le[2],s+r),oe.add(ue);function de(t,n,i,a){let o=new X;o.position.set(t,n,i),L.add(o);let s=new Q(ev($_(Q_(e.feel.actorPinRadius),r*.6))[0],p);s.position.z=r*.7,o.add(s);let c=[];for(let e=0;e<A_;e++){let t=new Q(k,a);t.rotation.z=Math.PI*.5,t.scale.x=e%2==0?1:.45,o.add(t),c.push(t)}let l=new X;o.add(l);let d=new Q(ev($_(Q_(e.feel.actorPinRadius),r*.6))[0],p);d.position.z=r*.7,l.add(d);for(let e=0;e<A_;e++){let t=new Q(k,a);t.rotation.z=Math.PI*.5,t.scale.x=e%2==0?1:.45,l.add(t),c.push(t)}let f=new X;l.add(f);let m=new Q(A,u);f.add(m);let h=new Q(j,p);return h.position.z=r*.7,f.add(h),{pivot:o,links:c,elbow:l,clapper:f}}let fe=de(-.06,.77,0,d),pe=de(.1,.79,c,p),me=new Xl(t.colorOf(`bossFurnace`),0,1,2);n.add(me);let U=new Xo({color:t.colorOf(`bossFurnace`),map:I_(),transparent:!0,opacity:0,depthWrite:!1,blending:2,fog:!1}),he=new Q(new Jc(1,1),U);he.frustumCulled=!1,he.layers.set(t.actorLayer),he.visible=!1,n.add(he),T.traverse(e=>{let n=e;n.isMesh===!0&&n.layers.set(t.actorLayer)}),Gm(T,e.feel.outlineThickness,t);function ge(e,t){return Y_((t-e.stateStart)/(e.stateUntil-e.stateStart))}function _e(e,t,n,r,i){let a=k_+.06300000000000001*Y_(n),o=Math.sin(i),s=Math.sin(i-M_),c=Math.sin(i-M_*2);e.pivot.rotation.z=t+r*o,e.elbow.rotation.z=r*.85*(s-o);let l=0;for(let t of e.links){let e=l%A_;t.position.x=(e+.5)*a,t.rotation.z=Math.PI*.5+r*.55*Math.sin(i-.2*(l+1)),l++}e.elbow.position.x=A_*a;let u=A_*a+.11,d=r*.75*(c-s);e.clapper.position.set(Math.cos(d)*u,Math.sin(d)*u,0)}let W=1,G=0;return{group:n,sync(e,r,i,o,s,c,f){if(e===null){n.visible=!1,he.visible=!1;return}n.visible=!0;let p=s.feel,m=s.boss,E=e.prev.x+(e.pos.x-e.prev.x)*r,D=e.prev.y+(e.pos.y-e.prev.y)*r,O=Ii.degToRad(p.bossShellTiltDeg),k=Ii.degToRad(p.bossArmSwingDeg),A=Ii.degToRad(p.bellArmRestDeg),j=e.phase===2?p.bossShellLift*.35:0,N=0,ee=1,R=A,te=A+.14,z=0,re=0,ie=.14,ae=0,se=0,ce=0,le=0,ue=0,de=p.bossFurnaceEmissive*(e.phase===2?.9:.6),K=1+Math.sin(o*p.bellBreathSpeed)*p.bellBreathAmount*(e.phase===2?1.4:1),ve=Math.sin(o*p.bellBreathSpeed*.72);if(e.state===`dormant`)ie=.34,de*=.7,se=.2,le=1,N=Ii.degToRad(p.bellRockDeg)*.12*ve;else if(e.state===`idle`)ie=.14-Math.sin(o*p.bellBreathSpeed)*.018,de*=K,se=.34+.12*ve,le=1,N=Ii.degToRad(p.bellRockDeg)*.18*ve;else if(e.state===`sweepTelegraph`){let t=ge(e,i);N=O*t,R=A+(k-A)*(t*t),z=.3*t,ie=.14-.12*t,ae=.35+.65*t,ce=t,de=p.bossFurnaceEmissive*(.6+p.bellMouthFlare*t)}else if(e.state===`sweepActive`){let t=ge(e,i);N=O*(1-t),R=k+(-k*.4-k)*t**.55,z=.3+.7*t**.4,ie=.02,ae=1,ce=1,de=p.bossFurnaceEmissive*(1+p.bellMouthFlare)}else if(e.state===`sweepRecover`){let t=ge(e,i);R=-k*.4+(A+k*.4)*t,z=1-t,ie=.38-.24*t,ae=0,ce=1-t,N=-Ii.degToRad(p.bellRockDeg)*Math.sin(t*Math.PI*3)*(1-t),de=p.bossFurnaceEmissive*(.9+.6*(1-t))*K}else if(e.state===`stompTelegraph`){let t=ge(e,i);ee=1-(1-p.bellCompress)*t,R=A+(k*.75-A)*t,te=A+(k*.75-A)*t,z=.25*t,re=.25*t,ie=.14-.1*t,ae=t,ce=t,de=p.bossFurnaceEmissive*(.6+p.bellMouthFlare*t)}else if(e.state===`stompRise`){let t=ge(e,i);ee=p.bellCompress+(1.06-p.bellCompress)*t,j+=p.bossShellLift*t,R=k*.75,te=k*.75,z=.25,re=.25,ie=.02,ae=1,ce=1,de=p.bossFurnaceEmissive*(1+p.bellMouthFlare)}else if(e.state===`stompSlam`){let t=ge(e,i);ee=1.06-.24*t,j+=p.bossShellLift*(1-t),R=k*.75+(-k*.55-k*.75)*t,te=R,z=.25+.4*t,re=z,ie=.1+.2*t,ae=1,ce=1,de=p.bossFurnaceEmissive*(1+p.bellMouthFlare*1.4)}else if(e.state===`stompRecover`){let t=ge(e,i);ee=.82+.18*Y_(t*3),N=Ii.degToRad(p.bellRockDeg)*Math.sin(t*Math.PI*p.bellRockSpeed)*(1-t),R=-k*.55+(A+k*.55)*Y_(t*1.6),te=R,z=.65*(1-Y_(t*1.6)),re=z,ie=.32-.18*t,ae=0,ce=1-Y_(t*2),de=p.bossFurnaceEmissive*(.7+.5*(1-t))*K}else if(e.state===`crack`){let t=ge(e,i);j=p.bossShellLift*t,N=O*.7*t,ie=.14-.12*t,ae=t,ce=t*.6,de=p.bossFurnaceEmissive*(.8+1.1*t)}else if(e.state===`dead`){let t=Math.max(i-e.stateStart,0),n=Math.exp(-t*1.05);ue=Ii.degToRad(p.bellArmSwayDeg)*2.6*n*Math.sin(t*5.4),j=0,N=O*.4,ee=.94,R=A-.25+ue,te=A-.18+ue*.78,ie=.44,ae=0,ce=0,de=p.bossFurnaceEmissive*.7*K}n.position.set(E,D,0),T.scale.set(m.width*e.facing,m.height,1),P.position.y=j,I.position.set(0,.24,0),I.rotation.z=-N,L.position.set(0,-.24,0),L.scale.set(1+(1-ee)*.4,ee,1);let ye=Y_(m.sweepReach/Math.max(m.width,.1)/1.2140000000000002);W+=(le-W)*N_;let be=Ii.degToRad(p.bellArmSwayDeg)*W,xe=o*p.bellArmSwaySpeed;_e(pe,R,z*ye,be,xe),_e(fe,te,re*ye,be*.85,xe+.9);let Se=0;if(c!==void 0&&f!==void 0&&(e.state===`idle`||e.state===`dormant`)){let e=D+m.height*.78,t=Math.abs(c-E)+.6,n=Math.atan2(f+.6-e,t);Se=n<-.14?-.14:n>F_?F_:n}G+=(Se-G)*P_,oe.rotation.z=-ie+G;let Ce=e.phase===2||e.state===`crack`||e.state===`dead`;if(H.visible=Ce,Ce){let t=e.state===`crack`?ge(e,i):1;H.scale.set(.5+1.1*t,1,1),B.scale.set(.5+1.1*t,1,1)}else B.scale.set(1,1,1);B.position.set(V,ne,a);let we=e.flash<0?0:e.flash>1?1:e.flash,q=Math.min(1,(we>.62?1:we>.26?.5:0)*p.telegraphEmissive),Te=e.phase===2||e.state===`sweepTelegraph`||e.state===`sweepActive`||e.state===`stompTelegraph`||e.state===`stompRise`||e.state===`stompSlam`||e.state===`crack`,Ee=p.bellBreathSpeed*(Te?5.2:2.4),De=(Math.sin(o*Ee)*.62+Math.sin(o*Ee*1.87+1.1)*.38)*p.bossFurnaceShimmer*(Te?1.5:1);w.copy(x).lerp(S,ce).multiplyScalar(1+De*.3).lerp(O_,q),h.color.copy(w),w.copy(C).lerp(x,se).lerp(S,ae),g.color.copy(w),w.copy(v).lerp(O_,q),l.color.copy(w),w.copy(y).lerp(O_,q),u.color.copy(w),w.copy(b).lerp(O_,q),d.color.copy(w);let Oe=e.state===`crack`?.5+.45*ge(e,i):e.state===`dead`?.55:.82;w.setHex(t.heat(Oe)),_.color.copy(w).lerp(O_,Math.min(1,p.bellHeatEmissive*.3));let ke=1+De*.28;me.color.copy(x).lerp(S,ce),me.intensity=Math.max(de*ke,0)*p.bossFurnaceLightScale,me.distance=m.width*p.bossFurnaceLightRange,me.position.set(0,m.height*.1,m.width*.2);let Ae=e.phase===2?1.35:1,je=Math.max(p.bossFurnaceGlowRadius,0)*2*(1+De*.16)*Ae,Me=Math.min(Y_(de*1.05*ke*Ae),.42);U.color.copy(x).lerp(S,ce),U.opacity=Me,he.scale.set(je,je,1),he.position.set(0,m.height*(j+.115),m.width*.08),he.visible=Me>.004&&je>.01;let Ne=Ii.degToRad(p.chainSwayDeg)*.25,Pe=Math.sin(o*p.chainSwaySpeed)*Ne+N*.3;M.rotation.z=Pe;for(let e of F)e.rotation.z=Pe*.6}}}var rv=6,iv=8,av=10,ov=14,sv=12,cv=4,lv=3,uv=4,dv=[-.32,-.12,.11,.34],fv=[.4,.74,.7,.36],pv=[.46,.72,.64,.42],mv=4,hv=.12,gv=.25,_v=8,vv=.55,yv=.055,bv=.35,xv=-.25,Sv=-.42;function Cv(e){return e<0?0:e>1?1:e}function wv(e){let t=new oc,n=Math.max(4,Math.round(e))*2;for(let e=0;e<n;e++){let r=e/n*Math.PI*2,i=e%2==0?1:.34,a=Math.cos(r)*i,o=Math.sin(r)*i;e===0?t.moveTo(a,o):t.lineTo(a,o)}return t.closePath(),new Xc(t)}function Tv(){let e=new oc;return e.moveTo(.5,0),e.lineTo(-.2,.5),e.lineTo(-.5,.5),e.lineTo(.16,0),e.lineTo(-.5,-.5),e.lineTo(-.2,-.5),e.closePath(),new Xc(e)}function Ev(){let e=new oc;return e.moveTo(-.5,0),e.lineTo(-.34,.34),e.lineTo(0,.5),e.lineTo(.34,.34),e.lineTo(.5,0),e.lineTo(.24,.1),e.lineTo(-.24,.1),e.closePath(),new Xc(e)}function Dv(){let e=new oc;return e.moveTo(-.5,0),e.lineTo(-.28,.58),e.lineTo(0,1),e.lineTo(.28,.58),e.lineTo(.5,0),e.closePath(),new Xc(e)}function Ov(){let e=document.createElement(`canvas`);e.width=64,e.height=64;let t=e.getContext(`2d`);if(t===null)return null;let n=t.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.3,`rgba(255,255,255,0.5)`),n.addColorStop(.68,`rgba(255,255,255,0.12)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64);let r=new Cs(e);return r.colorSpace=Ur,r.needsUpdate=!0,r}function kv(){let e=new oc;return e.moveTo(-.5,0),e.lineTo(-.3,.34),e.lineTo(-.12,.62),e.lineTo(.02,1),e.lineTo(.16,.7),e.lineTo(.36,.42),e.lineTo(.5,0),e.closePath(),new Xc(e)}function Av(){let e=new oc;return e.moveTo(0,.5),e.lineTo(.3,0),e.lineTo(0,-.5),e.lineTo(-.3,0),e.closePath(),new Xc(e)}function jv(e,t){let n=new Pa;n.name=`fx`;let r=new Jc(1,1),i=e.feel.fxBurstSpikes,a=wv(i),o=Tv(),s=Ev(),c=Dv(),l=kv(),u=Av();function d(e,n,r){let i=t.material(e,{unlit:!0,fog:!1,shade:r===void 0?1:r});return i.transparent=!0,i.opacity=n,i.depthWrite=!1,i.side=2,i}function f(e,t,r,i,a){let o=[];for(let s=0;s<e;s++){let e=d(r,1,i),s=new Q(t,e);s.visible=!1,s.position.z=a,s.frustumCulled=!1,s.layers.set(1),n.add(s),o.push({mesh:s,material:e,x:0,y:0,vx:0,vy:0,size:1,spin:0,flip:1,born:0,life:1,active:!1})}return o}function p(e,t,n,r,i,a,o,s,c,l,u){let d=e[t%e.length];return d===void 0?t:(d.x=n,d.y=r,d.vx=i,d.vy=a,d.size=o,d.spin=s,d.flip=u===void 0?1:u,d.born=c,d.life=Math.max(l,.02),d.active=!0,d.mesh.visible=!0,(t+1)%e.length)}function m(e,t,n,r,i){for(let a of e){if(!a.active)continue;let e=n-a.born;if(e<0||e>=a.life){a.active=!1,a.mesh.visible=!1;continue}let o=Math.max(0,1-r*t);a.vx*=o,a.vy=a.vy*o-i*t,a.x+=a.vx*t,a.y+=a.vy*t;let s=e/a.life;a.mesh.position.x=a.x,a.mesh.position.y=a.y,a.mesh.rotation.z+=a.spin*t,a.material.opacity=1-s*s}}function h(e,t){let i=new Pa;i.visible=!1;let a=d(e,t),o=new Q(r,a);o.layers.set(1),i.add(o);let s=d(e,1),c=[];for(let e=0;e<4;e++){let e=new Q(r,s);e.layers.set(1),i.add(e),c.push(e)}return n.add(i),{group:i,fill:o,fillMaterial:a,edges:c,edgeMaterial:s}}function g(e,t,n,r,i,a,o,s){let c=Math.max(o,.001);if(a>=c){e.group.visible=!1;return}e.group.visible=!0,e.group.position.set(0,0,Sv);let l=t+r*.5,u=n+i*.5;e.fill.visible=!1,e.fillMaterial.opacity=0,e.edgeMaterial.opacity=s*(1-a/c);let d=yv,f=e.edges[0],p=e.edges[1],m=e.edges[2],h=e.edges[3];f!==void 0&&(f.position.set(l,n+d*.5,.01),f.scale.set(r,d,1)),p!==void 0&&(p.position.set(l,n+i-d*.5,.01),p.scale.set(r,d,1)),m!==void 0&&(m.position.set(t+d*.5,u,.01),m.scale.set(d,i,1)),h!==void 0&&(h.position.set(t+r-d*.5,u,.01),h.scale.set(d,i,1))}let _=d(`actorMetal`,e.feel.fxArcOpacity);function v(e,t){let n=Ii.degToRad(e);return new Yc(Math.max(.05,t),1,22,1,-n*.5,n)}let y=e.feel.fxArcSpanDeg,b=e.feel.fxArcInnerRatio,x=v(y,b),S=new Q(x,_);S.visible=!1,S.frustumCulled=!1,S.layers.set(1),n.add(S);let C=f(iv,a,`actorMetal`,1,bv),w=f(av,o,`ash`,1,xv),T=f(ov,s,`ash`,.8,bv*.5),E=f(sv,u,`reward`,1,bv),D=new Z(t.colorOf(`reward`)),O=new Z(t.colorOf(`actorMetal`)),k=0,A=0,j=0,M=0,N=[];for(let e=0;e<rv;e++)N.push(h(`danger`,.16));let P=h(`danger`,.2),F=h(`danger`,.12),I=t.material(`danger`,{unlit:!0,fog:!1,shade:.66}),L=t.material(`danger`,{unlit:!0,fog:!1,shade:1.5}),ee=t.material(`danger`,{unlit:!0,fog:!1,shade:1.18});I.side=2,L.side=2,ee.side=2;let R=d(`reward`,.5);R.blending=2,R.map=Ov();let te=[],z=Math.max(1,Math.round(e.world.hazardCapacity));for(let e=0;e<z;e++){let e=new Pa;e.visible=!1;let t=new Q(r,R);t.position.z=-.02,t.layers.set(1),e.add(t);let i=[];for(let t=0;t<uv;t++){let t=new Q(l,ee);t.position.z=.01,t.layers.set(1),e.add(t),i.push(t)}let a=new Q(c,I);a.position.z=0,a.layers.set(1),e.add(a);let o=new Q(c,L);o.position.z=.02,o.layers.set(1),e.add(o),n.add(e),te.push({group:e,crest:o,core:a,underglow:t,tongues:i})}let B=f(Math.min(z,_v)*Math.max(2,Math.round(e.feel.fireWaveSparks)),u,`reward`,1,.43),V=0,ne=[];for(let e=0;e<64;e++)ne.push(0);let H=d(`reward`,1),re=[];for(let e=0;e<lv;e++)re.push(d(`reward`,.5-e*.14,.92-e*.18));let ie=[];for(let e=0;e<z;e++){let e=new Pa;e.visible=!1;let t=[];for(let n=2;n>=0;n--){let r=re[n];if(r===void 0)continue;let i=new Q(u,r);i.frustumCulled=!1,i.layers.set(1),e.add(i),t[n]=i}let r=new Q(u,H);r.frustumCulled=!1,r.layers.set(1),e.add(r),n.add(e),ie.push({group:e,head:r,tail:t})}let ae=Ov(),oe=[];for(let e=0;e<z;e++){let e=new Pa;e.visible=!1;let t=d(`reward`,.5);t.blending=2,t.map=ae;let i=new Q(r,t);e.add(i);let a=d(`reward`,.94),o=new Q(r,a);e.add(o);let s=d(`actorMetal`,1),c=new Q(r,s);e.add(c);let l=d(`actorMetal`,1),f=[];for(let t=0;t<mv;t++){let t=new Q(u,l);e.add(t),f.push(t)}let p=d(`reward`,1);p.blending=2,p.map=ae;let m=new Q(r,p);e.add(m),e.traverse(e=>{let t=e;t.isMesh===!0&&(t.frustumCulled=!1,t.layers.set(1))}),n.add(e),oe.push({group:e,glow:i,glowMaterial:t,body:o,bodyMaterial:a,core:c,coreMaterial:s,motes:f,moteMaterial:l,flash:m,flashMaterial:p})}function se(e,t,n,r,i){let a=t.sentry;for(let t of e.enemies){if(t.kind!==`sentry`||Math.abs(t.pos.y+a.height*.5-r)>a.height*.6)continue;let e=(a.width+i)*.5;if(!(Math.abs(t.pos.x+t.facing*e-n)>.6))return t.facing}return 1}let ce=d(`reward`,1),le=[];for(let e=0;e<cv;e++){let e=new Pa;e.visible=!1;let r=new Q(u,ce);r.layers.set(1),e.add(r);let i=new Xl(t.colorOf(`reward`),0,5,2);i.layers.enableAll(),em(i),e.add(i),n.add(e),le.push({group:e,mesh:r,light:i})}let ue=new Q(u,d(`reward`,1));ue.visible=!1,ue.layers.set(1),n.add(ue);let de=new Xl(t.colorOf(`reward`),0,6,2);de.layers.enableAll(),em(de),de.visible=!1,n.add(de);let fe=[];for(let e=0;e<64;e++)fe.push(!1);let pe=0,me=null,U=null;function he(e){if(e.feel.fxBurstSpikes===i)return;i=e.feel.fxBurstSpikes;let t=wv(i);for(let e of C)e.mesh.geometry=t;a.dispose(),a=t}function ge(e,t,n,r,i){he(i);let a=C[k%C.length];a!==void 0&&(a.material.color.copy(n?D:O),k=p(C,k,e,t,0,0,i.feel.fxBurstRadius,0,r,Math.max(i.feel.fxBurstLifeMs,1)/1e3))}function _e(e,t,n,r,i){let a=Math.max(1,Math.round(i.feel.fxChevronCount));for(let o=0;o<a;o++){let a=(o+1)*i.feel.fxChevronSpacing;A=p(w,A,e-n*a,t+(o%2==0?.08:-.08),-n*(1.2+o*.3),0,i.feel.fxChevronSize*(1-o*.12),0,r,Math.max(i.feel.fxChevronLifeMs,1)/1e3*(1-o*.1),n)}}function W(e,t,n,r,i){let a=Math.max(1,Math.round(r.feel.fxDustCount));for(let o=0;o<a;o++){let a=o%2==0?1:-1,s=Math.floor(o/2)+1;j=p(T,j,e+a*s*i*.4,t,a*s*i*.8,r.feel.fxDustRise,r.feel.fxDustSize*(1-o*.08),0,n,Math.max(r.feel.fxDustLifeMs,1)/1e3)}}function G(e,t,n,r){let i=Math.max(1,Math.round(r.feel.fxLiftCount));for(let a=0;a<i;a++){let i=(a%2==0?1:-1)*(.1+a%3*.12);M=p(E,M,e+i,t+a*.08,i*.2,r.feel.fxLiftRise*(.7+a%3*.2),r.feel.fxLiftSize*(1-a*.07),0,n,Math.max(r.feel.fxLiftLifeMs,1)/1e3)}}function K(e){for(let t of e)t.active&&t.mesh.scale.set(t.size*t.flip,t.size,1)}function ve(e,t,n,r){if(e.attackPhase!==`active`){S.visible=!1;return}if(r.feel.fxArcSpanDeg!==y||r.feel.fxArcInnerRatio!==b){y=r.feel.fxArcSpanDeg,b=r.feel.fxArcInnerRatio;let e=v(y,b);S.geometry=e,x.dispose(),x=e}let i=Math.max(r.attack.activeMs,1)/1e3,a=Cv(1-(e.attackUntil-n)/i),o=Math.max(1,Math.round(r.feel.fxArcFrames)),s=Math.min(o-1,Math.floor(a*o)),c=(s+.5)/o,l=((e.longwick?r.attack.longwickReach:r.attack.reach)+r.player.width*.5)*.8,u=Ii.degToRad(r.feel.needleBackDeg),d=u+(Ii.degToRad(r.feel.needleFrontDeg)-u)*c**.6;e.attackDir===`up`?d+=Math.PI*.5:e.attackDir===`down`&&(d-=Math.PI*.5),e.facing<0&&(d=Math.PI-d);let f=e.prev.x+(e.pos.x-e.prev.x)*t,p=e.prev.y+(e.pos.y-e.prev.y)*t;S.visible=!0,S.position.set(f,p+r.player.height*.45,bv),S.rotation.z=d,S.scale.setScalar(l),_.opacity=r.feel.fxArcOpacity*(1-s*.28)}return{group:n,setRoom(e){me=zh(e),U=e.checkpoint===void 0?null:{x:e.checkpoint.x,y:e.checkpoint.y};for(let e of[C,w,T,E,B])for(let t of e)t.active=!1,t.mesh.visible=!1;for(let e=0;e<ne.length;e++)ne[e]=0},onEvent(e,t,n){let r=t.time;e.kind===`attackHit`||e.kind===`bossHurt`?ge(e.x,e.y,!1,r,n):e.kind===`enemyDeath`||e.kind===`bossDeath`?(ge(e.x,e.y,!0,r,n),G(e.x,e.y,r,n)):e.kind===`dash`?_e(e.x,e.y+n.player.height*.45,t.player.dashDir,r,n):e.kind===`land`?W(e.x,e.y,r,n,.5):e.kind===`bossAttack`?t.boss!==null&&t.boss.state===`stompRecover`&&W(e.x,e.y,r,n,1.6):e.kind===`checkpoint`?me===null?G(e.x,e.y,r,n):G(me.x,me.y,r,n):e.kind===`pickup`?G(e.x,e.y,r,n):e.kind===`breakableBroken`&&W(e.x,e.y,r,n,.9)},sync(e,t,n,r,i,a,o){let s=o.feel,c=Math.max(r,0);ve(t,n,i,o);let l=0;for(let t of e.enemies){if(l>=rv)break;if(!t.alive||t.state!==`telegraph`||t.kind===`lamplighter`||t.kind===`sentry`)continue;let e=N[l];if(e===void 0)break;l++;let r=t.kind===`guard`?o.guard:o.stomper,a=t.kind===`guard`?o.guard.lungeSpeed*(o.guard.lungeMs/1e3):0,c=t.prev.x+(t.pos.x-t.prev.x)*n,u=t.prev.y+(t.pos.y-t.prev.y)*n,d=t.facing>0?c-r.width*.5:c-r.width*.5-a,f=Math.max(r.telegraphMs,1)/1e3,p=Cv(1-(t.stateUntil-i)/f);g(e,d,u,r.width+a,r.height,p,s.telegraphEdgeFraction,s.fxMarkOpacity)}for(let e=l;e<rv;e++){let t=N[e];t!==void 0&&(t.group.visible=!1)}let u=e.boss;if(u!==null&&u.state===`sweepTelegraph`){let e=Cv((i-u.stateStart)/(u.stateUntil-u.stateStart)),t=o.boss.sweepReach,n=o.boss.height*o.boss.sweepHeightRatio,r=u.facing>0?u.pos.x+o.boss.width*.5:u.pos.x-o.boss.width*.5-t;g(P,r,u.pos.y,t,n,e,s.telegraphEdgeFraction,s.fxMarkOpacity)}else P.group.visible=!1;if(u!==null&&(u.state===`stompTelegraph`||u.state===`stompRise`||u.state===`stompSlam`)){let e=u.state===`stompTelegraph`?Cv((i-u.stateStart)/(u.stateUntil-u.stateStart)):1;g(F,u.pos.x-o.boss.width*.5,u.pos.y,o.boss.width,o.boss.height,e,s.telegraphEdgeFraction,s.fxMarkOpacity)}else F.group.visible=!1;let d=0,f=0,h=0;for(let t=0;t<e.hazards.length;t++){let r=e.hazards[t];if(r===void 0)continue;let c=fe[t]===!0;if(r.alive&&!c&&r.kind===`wave`&&W(r.pos.x,r.pos.y,i,o,.6),fe[t]=r.alive,!r.alive)continue;let l=r.prev.x+(r.pos.x-r.prev.x)*n,u=r.prev.y+(r.pos.y-r.prev.y)*n;if(r.kind===`beam`){if(h>=oe.length)continue;let t=oe[h];if(t===void 0)continue;h++;let n=Math.max(o.sentry.beamMs,1)/1e3,s=Cv(1-(r.until-i)/n),c=Cv(s/hv),d=s>.75?Cv((1-s)/gv):1,f=r.h*.5,p=se(e,o,r.pos.x,r.pos.y+f,r.w);t.group.visible=!0,t.group.position.set(l,u,bv),t.glow.position.set(0,f,-.02),t.glow.scale.set(r.w*1.06,r.h*3.4*(.4+.6*c),1),t.glowMaterial.opacity=.55*d,t.body.position.set(0,f,.01),t.body.scale.set(r.w,r.h*.7*c,1),t.bodyMaterial.opacity=.94*d,t.core.position.set(0,f,.02),t.core.scale.set(r.w,r.h*.22*c,1),t.coreMaterial.opacity=d;for(let e=0;e<mv;e++){let n=t.motes[e];if(n===void 0)continue;let i=(e/mv+a*.9)%1,o=r.h*(.3+.12*Math.sin(a*7+e*1.7));n.position.set(p*(i-.5)*r.w,f+Math.sin(a*9+e*2.1)*r.h*.16,.03),n.scale.set(o,o,1)}t.moteMaterial.opacity=d*(.7+.3*Math.sin(a*11));let m=Cv(s/.3),g=r.h*(2.4+3.2*m);t.flash.position.set(-p*r.w*.5,f,.04),t.flash.scale.set(g,g,1),t.flashMaterial.opacity=(1-m)*.9;continue}if(r.kind===`ember`){if(f>=ie.length)continue;let e=ie[f];if(e===void 0)continue;f++,e.group.visible=!0,e.group.position.set(l,u+r.h*.5,bv),e.head.scale.set(r.w,r.h,1);let t=-r.vel.x,n=-r.vel.y,i=Math.sqrt(t*t+n*n);i<1e-4?(t=0,n=1):(t/=i,n/=i);for(let i=0;i<lv;i++){let a=e.tail[i];if(a===void 0)continue;let o=r.h*(.46+i*.4),s=.74-i*.2;a.position.set(t*o,n*o,-.01*(i+1)),a.scale.set(r.w*s,r.h*s,1)}continue}if(d>=te.length)continue;let m=te[d];if(m===void 0)continue;d++,m.group.visible=!0,m.group.position.set(l,u,bv),m.core.scale.set(r.w,r.h,1),m.core.position.set(0,0,0),m.crest.scale.set(r.w*(1-s.fxRidgeCrest*2.4),r.h*(1-s.fxRidgeCrest*3),1),m.crest.position.set(0,r.h*s.fxRidgeCrest*.4,.02),m.underglow.scale.set(r.w*3.4,r.h*1.5,1),m.underglow.position.set(0,r.h*.1,-.02);let g=t*1.37;for(let e=0;e<uv;e++){let t=m.tongues[e];if(t===void 0)continue;let n=.5+.5*Math.sin(a*s.fireWaveFlicker+g+e*1.9),i=r.h*s.fireWaveHeightScale*(pv[e]??.4)*(.4+.6*n);t.scale.set(r.w*.24,i,1),t.position.set(r.w*(dv[e]??0),r.h*(fv[e]??.6),.01)}let _=ne[t];if(_===void 0||i>=_){let e=Math.max(s.fireWaveSparks,1);ne[t]=i+vv/e;let n=r.vel.x>=0?-1:1,a=(Math.imul(V+1,2654435761)>>>0)%1e3/1e3;V=p(B,V,l+n*r.w*(.44+a*.72),u+r.h*(.12+a*.4),n*(.3+a*.6),1.2+a*1.1,s.fxLiftSize*(.42+a*.3),0,i,vv)}}for(let e=d;e<te.length;e++){let t=te[e];t!==void 0&&(t.group.visible=!1)}for(let e=f;e<ie.length;e++){let t=ie[e];t!==void 0&&(t.group.visible=!1)}for(let e=h;e<oe.length;e++){let t=oe[e];t!==void 0&&(t.group.visible=!1)}let _=0;for(let t of e.pickups){if(_>=cv)break;if(t.collected)continue;let e=le[_];if(e===void 0)break;_++;let n=Math.sin(a*s.pickupBobSpeed+_)*s.pickupBobAmp;e.group.visible=!0,e.group.position.set(t.pos.x,t.pos.y+s.pickupHaloRadius+n,bv),e.mesh.scale.setScalar(s.pickupHaloRadius*2),e.light.intensity=s.pickupLightIntensity,e.light.distance=s.pickupLightDistance,i>=pe&&(pe=i+1.1,G(t.pos.x,t.pos.y,i,o))}for(let e=_;e<cv;e++){let t=le[e];t!==void 0&&(t.group.visible=!1)}let v=U,y=v!==null&&me===null&&e.progress.checkpointRoom===e.roomId;if(ue.visible=y,de.visible=y,y&&v!==null){let e=1+(Math.sin(a*s.flickerSpeed)*.6+Math.sin(a*s.flickerSpeed*2.11+.7)*.4)*s.flickerAmount;ue.position.set(v.x,v.y+s.checkpointFlameHeight*.5,bv),ue.scale.set(s.checkpointFlameHeight*.75,s.checkpointFlameHeight*e,1),de.position.set(v.x,v.y+s.checkpointFlameHeight*.5,.3),de.intensity=s.pickupLightIntensity*e,de.distance=s.pickupLightDistance}m(C,c,i,0,0),m(w,c,i,3.2,0),m(T,c,i,2.4,-.4),m(E,c,i,1.1,-.2),m(B,c,i,1.5,1.4);for(let e of C){if(!e.active)continue;let t=Cv((i-e.born)/e.life),n=e.size*(.5+s.fxBurstGrow*t);e.mesh.scale.set(n,n,1)}K(w),K(T),K(E),K(B)}}}function Mv(e,t){let n=new Kl(e.camera.fovDeg,t,.1,400);n.layers.enableAll(),n.position.set(0,0,e.camera.distance);let r=t,i=e.camera.fovDeg,a=0,o=0,s=0,c=0,l=0,u=0,d=0;function f(e){let t=Ii.degToRad(e.camera.fovDeg)*.5;return Math.tan(t)*e.camera.distance}function p(e,t,n,r){return n-t<=r*2?(t+n)*.5:e<t+r?t+r:e>n-r?n-r:e}function m(e,t,n,i){let a=i.camera,o=e.prev.x+(e.pos.x-e.prev.x)*n,s=e.prev.y+(e.pos.y-e.prev.y)*n,c=o+a.lookAheadX*e.facing,l=s+i.player.height*.5+a.lookAheadY,m=f(i),h=m*r,g=a.roomPad,_=t.bounds.x-g,v=t.bounds.x+t.bounds.w+g,y=t.bounds.y-g,b=t.bounds.y+t.bounds.h+g;c=p(c,_,v,h),l=p(l,y,b,m),u=c,d=l}return{camera:n,sync(e,t,r,f,p){p.camera.fovDeg!==i&&(i=p.camera.fovDeg,n.fov=i,n.updateProjectionMatrix()),m(e,t,r,p);let h=Math.max(f,0),g=1-(1-p.camera.followLerp)**(h*60);if(a+=(u-a)*g,o+=(d-o)*g,s>5e-4){let e=Math.random()*Math.PI*2;c=Math.cos(e)*s,l=Math.sin(e)*s,s*=p.camera.shakeDecay**(h*60)}else s=0,c=0,l=0;n.position.set(a+c,o+l,p.camera.distance),n.lookAt(a+c,o+l,0)},addShake(e){e>s&&(s=e)},snapTo(t,r){m(r,t,1,e),a=u,o=d,s=0,c=0,l=0,n.position.set(a,o,e.camera.distance),n.lookAt(a,o,0)},resize(e){r=e,n.aspect=e,n.updateProjectionMatrix()}}}var Nv=461586;function Pv(e,t){let n=Xm(t.feel.toonBands);Zm(n.id);let{renderer:r,resize:i}=zp(e,n.shadows);n.postfx.toneMapped||(r.toneMapping=0,r.toneMappingExposure=1);let a=n.lights,o=n.fog.colorOverride===null?Nv:n.fog.colorOverride,s=new Ua,c=new Z(o);s.background=c;let l=new Ha(o,t.feel.fogNear*n.fog.nearScale,t.feel.fogFar*n.fog.farScale);n.fog.enabled&&(s.fog=l);let u=new Pl(a.hemiSky,a.hemiGround,t.feel.hemiIntensity*a.hemiIntensity);u.layers.enableAll(),s.add(u);let d=new $l(a.key.color,t.feel.keyIntensity*a.key.intensity);d.layers.enableAll(),d.position.set(a.key.x,a.key.y,a.key.z),n.shadows&&(d.castShadow=!0,d.shadow.mapSize.set(1024,1024),d.shadow.camera.left=-22,d.shadow.camera.right=22,d.shadow.camera.top=22,d.shadow.camera.bottom=-22,d.shadow.camera.far=80,d.shadow.bias=-.0015),s.add(d);let f=new $l(a.fill.color,t.feel.fillIntensity*a.fill.intensity);if(f.layers.enableAll(),f.position.set(a.fill.x,a.fill.y,a.fill.z),s.add(f),a.rim!==null){let e=new $l(a.rim.color,a.rim.intensity);e.layers.enableAll(),e.position.set(a.rim.x,a.rim.y,a.rim.z),s.add(e)}let p=a.spot,m=null;p!==null&&(m=new Jl(p.color,p.intensity,70,Math.PI*.32,.55,1.4),m.layers.enableAll(),m.position.set(p.x,p.y,p.z),n.shadows&&(m.castShadow=!0,m.shadow.mapSize.set(1024,1024),m.shadow.bias=-.002),s.add(m),s.add(m.target));let h=Bh(t,n);s.add(h.group);let g=Fg(t,n);s.add(g.group);let _=D_(t,n);s.add(_.group);let v=nv(t,n);s.add(v.group);let y=jv(t,n);if(s.add(y.group),n.shadows)for(let e of[h.group,g.group,_.group,v.group])e.traverse(e=>{let t=e;t.isMesh===!0&&(t.castShadow=!0,t.receiveShadow=!0)});let b=Mv(t,window.innerWidth/window.innerHeight),x=dh(r,s,b.camera,n.postfx.bloomScale,n.postfx.vignetteScale),S=null,C=null,w=!0,T=null;function E(e,t){let n=t.checkpoint??t.waypoints[0];return e.phase!==`title`||n===void 0?e.player:(T===null&&(T={...e.player,pos:{x:n.x,y:n.y},prev:{x:n.x,y:n.y},vel:{x:0,y:0}}),T.pos.x=n.x,T.pos.y=n.y,T.prev.x=n.x,T.prev.y=n.y,T.facing=1,T.grounded=!0,T.health=e.player.health,T)}let D=new Z(a.hemiSky),O=new Z(a.hemiGround),k=new Z(a.key.color),A=new Z(a.fill.color),j=new Z(n.colorOf(`reward`)),M=1,N=1,P=1,F=new Z(o),I=new Z(a.hemiSky),L=new Z(a.hemiGround),ee=new Z(a.key.color),R=new Z(a.fill.color),te=t.feel.shaftDirX,z=t.feel.shaftDirX,B=t.feel.fogNear,V=t.feel.fogFar,ne=t.feel.hemiIntensity,H=t.feel.keyIntensity,re=t.feel.fillIntensity;function ie(e){let t=Math.max(0,Math.min(1,e.feel.dawnWarmth));ee.lerp(j,t),R.lerp(j,t),ne*=e.feel.dawnLightBoost,H*=e.feel.dawnLightBoost}function ae(e){let t=Math.max(0,Math.min(1,e.feel.victoryWarmth));ee.lerp(j,t),R.lerp(j,t),ne*=e.feel.victoryLightBoost,H*=e.feel.victoryLightBoost}function oe(e,t,r){let i=S,s=n.ambienceSaturation;if(z=i===null||i.shaftDirX===void 0?e.feel.shaftDirX:i.shaftDirX,i===null){F.setHex(o),I.setHex(a.hemiSky),L.setHex(a.hemiGround),ee.setHex(a.key.color),R.setHex(a.fill.color),B=e.feel.fogNear*n.fog.nearScale,V=e.feel.fogFar*n.fog.farScale,ne=e.feel.hemiIntensity*a.hemiIntensity,H=e.feel.keyIntensity*a.key.intensity,re=e.feel.fillIntensity*a.fill.intensity,r&&ie(e),t&&ae(e);return}let c=Bm(n.ramp,i.fogColor),l=n.fog.colorOverride===null||c>0?Km(i.fogColor,n.fog.saturation):n.fog.colorOverride,u=c>0?n.rigMix*(1-c):n.rigMix;F.setHex(l),I.setHex(Km(i.hemiSky,s)).lerp(D,u),L.setHex(Km(i.hemiGround,s)).lerp(O,u),ee.setHex(Km(i.keyColor,s)).lerp(k,u),R.setHex(Km(i.fillColor,s)).lerp(A,u);let d=e.feel.ambienceGain*n.ambienceIntensityScale;B=i.fogNear*n.fog.nearScale,V=i.fogFar*n.fog.farScale,ne=i.hemiIntensity*d*a.hemiIntensity,H=i.keyIntensity*d*a.key.intensity,re=i.fillIntensity*d*a.fill.intensity,r&&ie(e),t&&ae(e)}function se(e,t,n,r){oe(t,n,r);let i=w?1:Math.min(1,Math.max(t.feel.ambienceLerpPerSec,0)*Math.max(e,0));w=!1,l.color.lerp(F,i),c.copy(l.color),u.color.lerp(I,i),u.groundColor.lerp(L,i),d.color.lerp(ee,i),f.color.lerp(R,i),te+=(z-te)*i,l.near+=(B-l.near)*i,l.far+=(V-l.far)*i,u.intensity+=(ne-u.intensity)*i,d.intensity+=(H-d.intensity)*i,f.intensity+=(re-f.intensity)*i;let a=n?t.feel.victoryFurnaceBoost:1;M+=(a-M)*i;let o=r?Math.max(t.feel.dawnEmberBoost,1):1;N+=(o-N)*i;let s=r?Math.max(t.feel.dawnDoorGlow,1):1;P+=(s-P)*i}function ce(){i(),b.resize(window.innerWidth/window.innerHeight),x.setSize(window.innerWidth,window.innerHeight)}return window.addEventListener(`resize`,ce),window.__omrScene=s,window.__omrCamera=b.camera,{setRoom(e,n){S=e.ambience===void 0?null:e.ambience;let r=S;z=r===null||r.shaftDirX===void 0?t.feel.shaftDirX:r.shaftDirX,te=z,C===e.id?h.syncGates(n):(C=e.id,h.build(e,n)),y.setRoom(e)},sync(e,t,n,r,i,a,o){let s=e.progress.bossDefeated&&e.phase!==`title`;se(r,o,e.phase===`victory`,s),h.syncGates(e.progress),h.setPlayerPos(e.player.pos.x,e.player.pos.y),h.sync(a,r,o,M,N,P);let c=E(e,t);g.sync(c,n,i,a,o),_.sync(e.enemies,n,i,o),v.sync(e.boss,n,i,a,o,c.pos.x,c.pos.y),y.sync(e,c,n,r,i,a,o),b.sync(c,t,n,r,o),m!==null&&p!==null&&(m.position.set(e.player.pos.x+p.x,e.player.pos.y+p.y,p.z),m.target.position.set(e.player.pos.x,e.player.pos.y,0),m.target.updateMatrixWorld()),x.sync(o.feel,te)},onEvent(e,t,n){y.onEvent(e,t,n)},addShake(e){b.addShake(e)},snapCamera(e,t){b.snapTo(e,t)},render(){x.render()},resize:ce}}function Fv(e,t){e.textContent!==t&&(e.textContent=t)}function Iv(e){let t=document.createElement(`div`);t.className=`hud`;let n=document.createElement(`div`);n.className=`hud-lantern`;let r=[],i=document.createElement(`div`);i.className=`hud-dash`;let a=document.createElement(`span`);a.className=`hud-dash-label`,a.textContent=`dash`;let o=document.createElement(`div`);o.className=`hud-dash-track`;let s=document.createElement(`div`);s.className=`hud-dash-fill`,o.appendChild(s),i.appendChild(a),i.appendChild(o);let c=document.createElement(`div`);c.className=`hud-badge`,c.textContent=ot,t.appendChild(n),t.appendChild(i),t.appendChild(c);let l=document.createElement(`div`);l.className=`hud-room`;let u=document.createElement(`div`);u.className=`hud-boss`;let d=document.createElement(`div`);d.className=`hud-boss-name`,d.textContent=at;let f=document.createElement(`div`);f.className=`hud-boss-track`;let p=document.createElement(`div`);p.className=`hud-boss-fill`,f.appendChild(p),u.appendChild(d),u.appendChild(f),e.appendChild(t),e.appendChild(l),e.appendChild(u);let m=-1,h=null,g=-1,_=-1,v=-1,y=null,b=null,x=``,S=-1e3,C=!1;return{sync(e,i){let a=Math.max(0,Math.round(e.progress.maxHealthBonus)),d=Math.max(1,Math.round(i.player.maxHealth)+a);if(d!==g){g=d,n.replaceChildren(),r.length=0;for(let e=0;e<d;e++){let e=document.createElement(`span`);e.className=`hud-pip`,n.appendChild(e),r.push(e)}_=-1}let f=Math.max(0,Math.min(d,Math.round(e.player.health)));if(f!==_){_=f;for(let e=0;e<r.length;e++){let t=r[e];t!==void 0&&t.classList.toggle(`lit`,e<f)}}let w=Math.max(i.dash.cooldownMs,1)/1e3,T=Math.max(0,e.player.dashReadyAt-e.time),E=Math.max(0,Math.min(1,1-T/w)),D=Math.round(E*100);D!==v&&(v=D,s.style.width=D+`%`);let O=T<=0;O!==y&&(y=O,o.classList.toggle(`ready`,O));let k=e.player.longwick;k!==b&&(b=k,c.classList.toggle(`show`,k)),e.roomId!==x&&(x=e.roomId,Fv(l,dt(e.roomId)),S=e.time);let A=e.phase!==`title`&&e.phase!==`paused`&&e.time-S<i.feel.roomLabelMs/1e3;A!==C&&(C=A,l.classList.toggle(`show`,A));let j=e.phase===`title`;t.classList.toggle(`hidden`,j);let M=e.boss,N=!j&&e.phase!==`dead`&&e.phase!==`victory`&&M!==null&&M.alive&&M.state!==`dormant`;if(N!==h&&(h=N,u.classList.toggle(`show`,N)),M!==null){let e=Math.max(0,Math.min(1,M.health/Math.max(M.maxHealth,1))),t=Math.round(e*1e3)/10;t!==m&&(m=t,p.style.width=t+`%`)}}}}function Lv(e){let t=document.createElement(`div`);t.className=`screen screen-title`;let n=document.createElement(`h1`);n.textContent=Je;let r=document.createElement(`p`);r.className=`screen-hook`,r.textContent=Ye;let i=document.createElement(`p`);i.className=`screen-controls`,i.textContent=Xe;let a=document.createElement(`p`);a.className=`screen-prompt screen-prompt-pulse`,a.textContent=Ze,t.appendChild(n),t.appendChild(r),t.appendChild(i),t.appendChild(a),e.appendChild(t);let o=null,s=-1;return{sync(e,n){let r=Math.max(1,n.feel.titlePulseMs);r!==s&&(s=r,a.style.setProperty(`--pulse-ms`,r+`ms`));let i=e.phase===`title`;i!==o&&(o=i,t.classList.toggle(`show`,i))}}}function Rv(e){let t=document.createElement(`div`);t.className=`screen screen-pause`;let n=document.createElement(`h1`);n.textContent=Qe;let r=document.createElement(`p`);r.className=`screen-prompt screen-where`;let i=document.createElement(`p`);i.className=`screen-controls`,i.textContent=Xe;let a=document.createElement(`p`);a.className=`screen-prompt`,a.textContent=$e,t.appendChild(n),t.appendChild(r),t.appendChild(i),t.appendChild(a),e.appendChild(t);let o=null,s=``;return{sync(e){let n=e.phase===`paused`;n&&e.roomId!==s&&(s=e.roomId,r.textContent=dt(e.roomId)),n!==o&&(o=n,t.classList.toggle(`show`,n))}}}function zv(e,t){e.textContent!==t&&(e.textContent=t)}function Bv(e){let t=document.createElement(`div`);t.className=`vignette`;let n=document.createElement(`div`);n.className=`banner`;let r=document.createElement(`p`);r.className=`banner-prompt`,r.textContent=rt,e.appendChild(t),e.appendChild(n),e.appendChild(r);let i=``,a=-1e3,o=0,s=null,c=null,l=null,u=-1,d=``,f=!1,p=-1e3,m=new Set;function h(e,t,n){e.time<p||(i=t,a=e.time,o=n)}function g(e,t,n){i=t,a=e.time,o=n,p=e.time+n}function _(){f=!1,p=-1e3,i=``,a=-1e3,o=0,m.clear()}function v(e,t){let n=null,r=1/0;for(let i of e.pickups){if(!i.collected||m.has(i.id))continue;let e=i.pos.x-t.x,a=i.pos.y-t.y,o=e*e+a*a;o<r&&(r=o,n=i.id)}if(n===null)return lt.longwick;m.add(n);let i=e.pickups.find(e=>e.id===n);return i===void 0?lt.longwick:lt[i.kind]}function y(e,t,n){return t?`victory`:e?`death`:n?`intro`:``}return{onEvent(e,t,n){let r=n.feel,i=r.bannerMs/1e3;if(e.kind===`pickup`)h(t,v(t,e),i);else if(e.kind===`checkpoint`)h(t,et,i);else if(e.kind===`gateOpen`)h(t,st,i);else if(e.kind===`breakableBroken`)h(t,ct,i);else if(e.kind===`death`)g(t,tt,i);else if(e.kind===`victory`)g(t,nt,i);else if(e.kind===`roomEnter`){let e=t.boss;!f&&e!==null&&e.alive&&(f=!0,g(t,it,r.bossIntroMs/1e3))}},sync(e,f){let p=e.phase===`dead`,m=e.phase===`victory`;e.phase===`title`&&_();let h,g=i;p?(h=!0,g=tt):m?(h=!0,g=nt):h=e.phase!==`title`&&e.time-a<o,h&&zv(n,g),h!==s&&(s=h,n.classList.toggle(`show`,h));let v=y(p,m,h&&!p&&!m&&g===`THE BELLKEEPER - No light leaves the reserve.`);v!==d&&(d=v,n.classList.toggle(`banner-victory`,v===`victory`),n.classList.toggle(`banner-death`,v===`death`),n.classList.toggle(`banner-intro`,v===`intro`));let b=m&&e.time-e.victoryAt>=f.feel.victoryHoldMs/1e3;b!==c&&(c=b,r.classList.toggle(`show`,b));let x=p||m,S=p?f.feel.deathDelayMs:f.feel.victoryHoldMs;S!==u&&(u=S,t.style.setProperty(`--vignette-ms`,S+`ms`)),x!==l&&(l=x,t.classList.toggle(`show`,x),t.classList.toggle(`victory`,m))}}}function Vv(e){let t=document.createElement(`div`);return t.className=`fade`,e.appendChild(t),{onEvent(e,n){if(e.kind===`start`){t.style.transition=`none`,t.style.opacity=`0`;return}(e.kind===`roomEnter`||e.kind===`respawn`)&&(t.style.transition=`none`,t.style.opacity=`1`,t.offsetWidth,t.style.transition=`opacity `+Math.max(0,n.feel.transitionFadeMs)+`ms linear`,t.style.opacity=`0`)}}}var Hv=class e{constructor(t,n,r,i,a=`div`){this.parent=t,this.object=n,this.property=r,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(a),this.domElement.classList.add(`lil-controller`),this.domElement.classList.add(i),this.$name=document.createElement(`div`),this.$name.classList.add(`lil-name`),e.nextNameID=e.nextNameID||0,this.$name.id=`lil-gui-name-${++e.nextNameID}`,this.$widget=document.createElement(`div`),this.$widget.classList.add(`lil-widget`),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener(`keydown`,e=>e.stopPropagation()),this.domElement.addEventListener(`keyup`,e=>e.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(r)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle(`lil-disabled`,e),this.$disable.toggleAttribute(`disabled`,e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?`none`:``,this}hide(){return this.show(!1)}options(e){let t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},Uv=class extends Hv{constructor(e,t,n){super(e,t,n,`lil-boolean`,`label`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`checkbox`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener(`change`,()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function Wv(e){let t,n;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?n=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),n?`#`+n:!1}var Gv={isPrimitive:!0,match:e=>typeof e==`string`,fromHexString:Wv,toHexString:Wv},Kv={isPrimitive:!0,match:e=>typeof e==`number`,fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>`#`+e.toString(16).padStart(6,0)},qv=[Gv,Kv,{isPrimitive:!1,match:e=>Array.isArray(e)||ArrayBuffer.isView(e),fromHexString(e,t,n=1){let r=Kv.fromHexString(e);t[0]=(r>>16&255)/255*n,t[1]=(r>>8&255)/255*n,t[2]=(r&255)/255*n},toHexString([e,t,n],r=1){r=255/r;let i=e*r<<16^t*r<<8^n*r<<0;return Kv.toHexString(i)}},{isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,n=1){let r=Kv.fromHexString(e);t.r=(r>>16&255)/255*n,t.g=(r>>8&255)/255*n,t.b=(r&255)/255*n},toHexString({r:e,g:t,b:n},r=1){r=255/r;let i=e*r<<16^t*r<<8^n*r<<0;return Kv.toHexString(i)}}];function Jv(e){return qv.find(t=>t.match(e))}var Yv=class extends Hv{constructor(e,t,n,r){super(e,t,n,`lil-color`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`color`),this.$input.setAttribute(`tabindex`,-1),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$text=document.createElement(`input`),this.$text.setAttribute(`type`,`text`),this.$text.setAttribute(`spellcheck`,`false`),this.$text.setAttribute(`aria-labelledby`,this.$name.id),this.$display=document.createElement(`div`),this.$display.classList.add(`lil-display`),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Jv(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener(`input`,()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener(`blur`,()=>{this._callOnFinishChange()}),this.$text.addEventListener(`input`,()=>{let e=Wv(this.$text.value);e&&this._setValueFromHexString(e)}),this.$text.addEventListener(`focus`,()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener(`blur`,()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){let t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},Xv=class extends Hv{constructor(e,t,n){super(e,t,n,`lil-function`),this.$button=document.createElement(`button`),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener(`click`,e=>{e.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener(`touchstart`,()=>{},{passive:!0}),this.$disable=this.$button}},Zv=class extends Hv{constructor(e,t,n,r,i,a){super(e,t,n,`lil-number`),this._initInput(),this.min(r),this.max(i);let o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){let e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+`%`}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`text`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),window.matchMedia(`(pointer: coarse)`).matches&&(this.$input.setAttribute(`type`,`number`),this.$input.setAttribute(`step`,`any`)),this.$widget.appendChild(this.$input),this.$disable=this.$input;let e=()=>{let e=parseFloat(this.$input.value);isNaN(e)||(this._stepExplicit&&(e=this._snap(e)),this.setValue(this._clamp(e)))},t=e=>{let t=parseFloat(this.$input.value);isNaN(t)||(this._snapClampSetValue(t+e),this.$input.value=this.getValue())},n=e=>{e.key===`Enter`&&this.$input.blur(),e.code===`ArrowUp`&&(e.preventDefault(),t(this._step*this._arrowKeyMultiplier(e))),e.code===`ArrowDown`&&(e.preventDefault(),t(this._step*this._arrowKeyMultiplier(e)*-1))},r=e=>{this._inputFocused&&(e.preventDefault(),t(this._step*this._normalizeMouseWheel(e)))},i=!1,a,o,s,c,l,u=e=>{a=e.clientX,o=s=e.clientY,i=!0,c=this.getValue(),l=0,window.addEventListener(`mousemove`,d),window.addEventListener(`mouseup`,f)},d=e=>{if(i){let t=e.clientX-a,n=e.clientY-o;Math.abs(n)>5?(e.preventDefault(),this.$input.blur(),i=!1,this._setDraggingStyle(!0,`vertical`)):Math.abs(t)>5&&f()}if(!i){let t=e.clientY-s;l-=t*this._step*this._arrowKeyMultiplier(e),c+l>this._max?l=this._max-c:c+l<this._min&&(l=this._min-c),this._snapClampSetValue(c+l)}s=e.clientY},f=()=>{this._setDraggingStyle(!1,`vertical`),this._callOnFinishChange(),window.removeEventListener(`mousemove`,d),window.removeEventListener(`mouseup`,f)};this.$input.addEventListener(`input`,e),this.$input.addEventListener(`keydown`,n),this.$input.addEventListener(`wheel`,r,{passive:!1}),this.$input.addEventListener(`mousedown`,u),this.$input.addEventListener(`focus`,()=>{this._inputFocused=!0}),this.$input.addEventListener(`blur`,()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement(`div`),this.$slider.classList.add(`lil-slider`),this.$fill=document.createElement(`div`),this.$fill.classList.add(`lil-fill`),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add(`lil-has-slider`);let e=(e,t,n,r,i)=>(e-t)/(n-t)*(i-r)+r,t=t=>{let n=this.$slider.getBoundingClientRect(),r=e(t,n.left,n.right,this._min,this._max);this._snapClampSetValue(r)},n=e=>{this._setDraggingStyle(!0),t(e.clientX),window.addEventListener(`mousemove`,r),window.addEventListener(`mouseup`,i)},r=e=>{t(e.clientX)},i=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener(`mousemove`,r),window.removeEventListener(`mouseup`,i)},a=!1,o,s,c=e=>{e.preventDefault(),this._setDraggingStyle(!0),t(e.touches[0].clientX),a=!1},l=e=>{e.touches.length>1||(this._hasScrollBar?(o=e.touches[0].clientX,s=e.touches[0].clientY,a=!0):c(e),window.addEventListener(`touchmove`,u,{passive:!1}),window.addEventListener(`touchend`,d))},u=e=>{if(a){let t=e.touches[0].clientX-o,n=e.touches[0].clientY-s;Math.abs(t)>Math.abs(n)?c(e):(window.removeEventListener(`touchmove`,u),window.removeEventListener(`touchend`,d))}else e.preventDefault(),t(e.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener(`touchmove`,u),window.removeEventListener(`touchend`,d)},f=this._callOnFinishChange.bind(this),p;this.$slider.addEventListener(`mousedown`,n),this.$slider.addEventListener(`touchstart`,l,{passive:!1}),this.$slider.addEventListener(`wheel`,e=>{if(Math.abs(e.deltaX)<Math.abs(e.deltaY)&&this._hasScrollBar)return;e.preventDefault();let t=this._normalizeMouseWheel(e)*this._step;this._snapClampSetValue(this.getValue()+t),this.$input.value=this.getValue(),clearTimeout(p),p=setTimeout(f,400)},{passive:!1})}_setDraggingStyle(e,t=`horizontal`){this.$slider&&this.$slider.classList.toggle(`lil-active`,e),document.body.classList.toggle(`lil-dragging`,e),document.body.classList.toggle(`lil-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){let e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},Qv=class extends Hv{constructor(e,t,n,r){super(e,t,n,`lil-option`),this.$select=document.createElement(`select`),this.$select.setAttribute(`aria-labelledby`,this.$name.id),this.$display=document.createElement(`div`),this.$display.classList.add(`lil-display`),this.$select.addEventListener(`change`,()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener(`focus`,()=>{this.$display.classList.add(`lil-focus`)}),this.$select.addEventListener(`blur`,()=>{this.$display.classList.remove(`lil-focus`)}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(e=>{let t=document.createElement(`option`);t.textContent=e,this.$select.appendChild(t)}),this.updateDisplay(),this}updateDisplay(){let e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}},$v=class extends Hv{constructor(e,t,n){super(e,t,n,`lil-string`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`text`),this.$input.setAttribute(`spellcheck`,`false`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$input.addEventListener(`input`,()=>{this.setValue(this.$input.value)}),this.$input.addEventListener(`keydown`,e=>{e.code===`Enter`&&this.$input.blur()}),this.$input.addEventListener(`blur`,()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},ey=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function ty(e){let t=document.createElement(`style`);t.innerHTML=e;let n=document.querySelector(`head link[rel=stylesheet], head style`);n?document.head.insertBefore(t,n):document.head.appendChild(t)}var ny=!1,ry=class e{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:r,title:i=`Controls`,closeFolders:a=!1,injectStyles:o=!0,touchStyles:s=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement(`div`),this.domElement.classList.add(`lil-gui`),this.$title=document.createElement(`button`),this.$title.classList.add(`lil-title`),this.$title.setAttribute(`aria-expanded`,!0),this.$title.addEventListener(`click`,()=>this.openAnimated(this._closed)),this.$title.addEventListener(`touchstart`,()=>{},{passive:!0}),this.$children=document.createElement(`div`),this.$children.classList.add(`lil-children`),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(i),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add(`lil-root`),s&&this.domElement.classList.add(`lil-allow-touch-styles`),!ny&&o&&(ty(ey),ny=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add(`lil-auto-place`,`autoPlace`),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty(`--width`,r+`px`),this._closeFolders=a}add(e,t,n,r,i){if(Object(n)===n)return new Qv(this,e,t,n);let a=e[t];switch(typeof a){case`number`:return new Zv(this,e,t,n,r,i);case`boolean`:return new Uv(this,e,t);case`string`:return new $v(this,e,t);case`function`:return new Xv(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,n=1){return new Yv(this,e,t,n)}addFolder(t){let n=new e({parent:this,title:t});return this.root._closeFolders&&n.close(),n}load(e,t=!0){return e.controllers&&this.controllers.forEach(t=>{t instanceof Xv||t._name in e.controllers&&t.load(e.controllers[t._name])}),t&&e.folders&&this.folders.forEach(t=>{t._title in e.folders&&t.load(e.folders[t._title])}),this}save(e=!0){let t={controllers:{},folders:{}};return this.controllers.forEach(e=>{if(!(e instanceof Xv)){if(e._name in t.controllers)throw Error(`Cannot save GUI with duplicate property "${e._name}"`);t.controllers[e._name]=e.save()}}),e&&this.folders.forEach(e=>{if(e._title in t.folders)throw Error(`Cannot save GUI with duplicate folder "${e._title}"`);t.folders[e._title]=e.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute(`aria-expanded`,!this._closed),this.domElement.classList.toggle(`lil-closed`,this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?`none`:``,this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute(`aria-expanded`,!this._closed),requestAnimationFrame(()=>{let t=this.$children.clientHeight;this.$children.style.height=t+`px`,this.domElement.classList.add(`lil-transition`);let n=e=>{e.target===this.$children&&(this.$children.style.height=``,this.domElement.classList.remove(`lil-transition`),this.$children.removeEventListener(`transitionend`,n))};this.$children.addEventListener(`transitionend`,n);let r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle(`lil-closed`,!e),requestAnimationFrame(()=>{this.$children.style.height=r+`px`})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(e=>e.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}},iy=`borrowed-dawn:tuning`;function ay(){let e=new ry({title:`Tuning`});for(let[t,n]of Object.entries(l)){let r=e.addFolder(t);for(let[e,t]of Object.entries(n))if(typeof t==`number`){let i=t===0?1:Math.abs(t)*4,a=t<0?-i:0,o=t<0?0:i;r.add(n,e,a,o)}r.close()}try{let t=localStorage.getItem(iy);t&&e.load(JSON.parse(t))}catch{}e.onChange(()=>{try{localStorage.setItem(iy,JSON.stringify(e.save()))}catch{}});let t={exportJson:()=>{let e=JSON.stringify(l,null,2);navigator.clipboard?.writeText(e),console.log(`[tuning] copied to clipboard:
`+e)},resetSaved:()=>{try{localStorage.removeItem(iy)}catch{}location.reload()}};e.add(t,`exportJson`).name(`copy tuning as JSON`),e.add(t,`resetSaved`).name(`reset saved overrides`);let n=new URLSearchParams(location.search).get(`screenshot`)===`1`;return e.hide(),n||window.addEventListener(`keydown`,t=>{t.code===`Backquote`&&(t.preventDefault(),e._hidden?e.show():e.hide())}),e}var oy=1e-4,sy=2;function cy(e){let t=Math.floor(e.sampleRate*sy),n=e.createBuffer(1,t,e.sampleRate),r=n.getChannelData(0),i=49734321;for(let e=0;e<t;e+=1)i=i*1664525+1013904223>>>0,r[e]=i/4294967295*2-1;let a={ctx:e,created:0,active:0,noiseSource(){let t=e.createBufferSource();return t.buffer=n,t.loop=!0,t},track(e){a.created+=1,a.active+=1,e.onended=()=>{--a.active}}};return a}function ly(e,t){let n=Math.max(t.attack??.004,.001),r=t.hold??0;return e+n+r+Math.max(t.decay,.01)}function uy(e,t,n){let r=e.createGain(),i=Math.max(n.gain,oy*4),a=Math.max(n.attack??.004,.001),o=n.hold??0,s=ly(t,n),c=r.gain;return c.setValueAtTime(oy,t),n.curve===`linear`?(c.linearRampToValueAtTime(i,t+a),c.setValueAtTime(i,t+a+o),c.linearRampToValueAtTime(0,s)):(c.exponentialRampToValueAtTime(i,t+a),c.setValueAtTime(i,t+a+o),c.exponentialRampToValueAtTime(oy,s)),r}function dy(e,t,n,r){let i=e.createBiquadFilter();if(i.type=n.type,i.Q.value=n.q??1,i.frequency.setValueAtTime(Math.max(n.freq,20),t),n.freqTo!==void 0){let e=Math.max(n.sweep??r,.01);i.frequency.exponentialRampToValueAtTime(Math.max(n.freqTo,20),t+e)}return i}function fy(e,t,n,r,i){let a=uy(e,t,r);if(i===void 0)return a.connect(n),a;let o=dy(e,t,i,ly(t,r)-t);return a.connect(o),o.connect(n),a}function py(e,t,n,r){let i=e.ctx,a=i.createOscillator();if(a.type=r.type,r.detune!==void 0&&a.detune.setValueAtTime(r.detune,n),a.frequency.setValueAtTime(Math.max(r.freq,1),n),r.freqTo!==void 0){let e=Math.max(r.glide??r.decay,.01);a.frequency.exponentialRampToValueAtTime(Math.max(r.freqTo,1),n+e)}let o=fy(i,n,t,r,r.filter);a.connect(o);let s=ly(n,r);return a.start(n),a.stop(s+.02),e.track(a),s}function my(e,t,n,r){let i=e.ctx,a=e.noiseSource();r.rate!==void 0&&a.playbackRate.setValueAtTime(r.rate,n);let o=fy(i,n,t,r,r.filter);a.connect(o);let s=ly(n,r);return a.start(n,n*7919%1.5),a.stop(s+.02),e.track(a),s}function hy(e,t,n,r,i,a){let o=a.falloff??.55,s=a.spread??.22,c=0,l=n,u=a.filter===void 0?t:dy(e.ctx,n,a.filter,a.decay);a.filter!==void 0&&u.connect(t);for(let t of i){let i=a.gain*o**+c,d=Math.max(a.decay*(1-s*c),.04),f=py(e,u,n,{type:a.type??`sine`,freq:r*t,gain:i,attack:.002+c*.001,decay:d});f>l&&(l=f),c+=1}return l}function gy(e,t,n,r,i){let a=e.ctx,o=a.createOscillator();o.type=`sine`,o.frequency.setValueAtTime(r,n);let s=a.createGain();return s.gain.setValueAtTime(i,n),o.connect(s),s.connect(t),o.start(n),e.track(o),o}function _y(e,t){try{e.stop(t)}catch{e.disconnect()}}var vy=60/54,yy=vy/2,by=8,xy=[[146.83,174.61,220],[116.54,146.83,174.61],[98,116.54,146.83],[110,130.81,164.81]],Sy=[[146.83,220,293.66],[164.81,246.94,329.63],[130.81,196,261.63],[174.61,261.63,349.23]],Cy=[146.83,174.61,220,261.63,329.63,391.99],wy=[[130.81,196,261.63],[146.83,220,293.66],[123.47,185,246.94],[110,164.81,220]],Ty=[391.99,329.63,293.66,349.23,293.66,261.63],Ey=1567.98,Dy=3.6,Oy=4.2,ky=5,Ay={cinder:{cutoffScale:1,organGain:.55,airFreq:380,airGain:.05},bellkeeper:{cutoffScale:1,organGain:.55,airFreq:380,airGain:.05},dawn:{cutoffScale:1.9,organGain:.7,airFreq:760,airGain:.035},reserve:{cutoffScale:2.4,organGain:.42,airFreq:1150,airGain:.02}},jy=73.42,My=[1,2,3.01,4.72],Ny=[1,2,2.76,5.4,8.9],Py=[110,73.42],Fy=520,Iy=2.2,Ly=3.4,Ry=3.8,zy=36.71,By=293.66,Vy=[1,2.01,3.38],Hy=[73.42,87.31,98,110],Uy=.5,Wy=.9,Gy=1.05;function Ky(e,t){let n=e[(t%e.length+e.length)%e.length];return n===void 0?[]:n}function qy(e,t,n){let r=e[(t%e.length+e.length)%e.length];return r===void 0?n:r}function Jy(e,t,n,r){let i=e.ctx,a=n===`dawn`,o=n===`reserve`,s=Ay[n],c=Fy*s.cutoffScale,l=i.createGain();l.gain.value=1e-4,l.connect(t);let u=i.createGain();u.gain.value=1,u.connect(l);let d=i.createBiquadFilter();d.type=`lowpass`,d.Q.value=.7,d.frequency.value=c,d.connect(l);let f=i.createGain();f.gain.value=s.organGain,f.connect(d);let p=i.createGain();p.gain.value=.9,p.connect(l);let m=i.createGain();m.gain.value=1,m.connect(l);let h=i.createGain();h.gain.value=0,h.connect(l);let g=[],_=0,v=0,y=1,b=!1,x=!1,S=!1;function C(e,t,n){let r=h.gain;r.cancelScheduledValues(t),r.setValueAtTime(r.value,t),r.linearRampToValueAtTime(e,t+n)}function w(){return S?yy/(r.fightTempoScale>.1?r.fightTempoScale:1):yy}function T(t,n){let r=n*y;hy(e,u,t,jy,My,{gain:r*.5,decay:.95,falloff:.5,spread:.2,filter:{type:`lowpass`,freq:1200+700*(y-1),q:.9}}),my(e,u,t,{gain:r*.05,attack:.001,decay:.035,filter:{type:`highpass`,freq:2600,q:.8}})}function E(t,n){let r=Ky(a?Sy:xy,n),i=0;for(let n of r)py(e,f,t,{type:`sine`,freq:n,gain:a?.075:.085,attack:Iy,hold:Ly,decay:Ry,curve:`linear`}),py(e,f,t,{type:`triangle`,freq:n*2,detune:i===0?-5:4,gain:a?.042:.026,attack:2.8000000000000003,hold:Ly,decay:Ry,curve:`linear`}),i===0&&py(e,f,t,{type:`sine`,freq:n*.5,gain:.05,attack:Iy,hold:4.2,decay:Ry,curve:`linear`}),i+=1}function D(t,n){let r=n%3*1;for(let n=0;n<3;n++){let i=qy(Cy,r+n,220),a=t+n*vy*1.5;py(e,f,a,{type:`triangle`,freq:i,gain:.05,attack:.3,hold:.55,decay:1.5,curve:`linear`}),py(e,f,a,{type:`sine`,freq:i*2,gain:.022,attack:.22,hold:.4,decay:1.2,curve:`linear`})}}function O(t,n){let r=Ky(wy,n),i=0;for(let n of r)py(e,f,t,{type:`sine`,freq:n,gain:.055,attack:Dy,hold:Oy,decay:ky,curve:`linear`}),py(e,f,t,{type:`triangle`,freq:n*2,detune:i===0?-6:5,gain:.024,attack:4.4,hold:Oy,decay:ky,curve:`linear`}),i===0&&py(e,l,t,{type:`sine`,freq:n*8,gain:.006,attack:Dy*.7,hold:Oy*.6,decay:ky,curve:`linear`}),i+=1}function k(t,n){let r=n%2*3;for(let n=0;n<3;n++){let i=qy(Ty,r+n,293.66),a=t+n*vy*2;py(e,f,a,{type:`triangle`,freq:i,gain:.038,attack:.45,hold:.5,decay:2.2,curve:`linear`}),py(e,l,a,{type:`sine`,freq:i*2,gain:.012,attack:.35,hold:.4,decay:1.8,curve:`linear`})}}function A(t,n,r,i){let a=qy(Py,n,110);hy(e,p,t,a,Ny,{gain:i,decay:r,falloff:.62,spread:.16,filter:{type:`lowpass`,freq:2400,q:.6}}),my(e,p,t,{gain:.03,attack:.002,decay:.25,filter:{type:`bandpass`,freq:900,freqTo:400,sweep:.25,q:1.6}})}function j(t,n){let i=Math.max(r.fightPulseGain,0)*(n%4==0?1:.68);py(e,h,t,{type:`sawtooth`,freq:zy*2,freqTo:zy,glide:.08,gain:i,attack:.004,decay:.17,filter:{type:`lowpass`,freq:300,q:1.3}})}function M(t,n){hy(e,h,t,By,Vy,{gain:.08,decay:.34,falloff:.5,spread:.3,filter:{type:`bandpass`,freq:2200,q:1.1}}),n&&hy(e,h,t,By*2,Vy,{gain:.05,decay:.26,falloff:.5,spread:.3,filter:{type:`highpass`,freq:1800,q:.9}})}function N(t,n,r){let i=qy(Hy,n,73.42),a=qy(Hy,n+1,98);py(e,h,t,{type:`sawtooth`,freq:i,freqTo:a,glide:r,gain:.07,attack:r*.55,decay:r*.45,curve:`linear`,filter:{type:`lowpass`,freq:320,freqTo:1100,sweep:r,q:1.5}}),py(e,h,t,{type:`triangle`,freq:i*2,freqTo:a*2,glide:r,gain:.035,attack:r*.6,decay:r*.4,curve:`linear`})}function P(t){let n=e.noiseSource(),r=i.createBiquadFilter();r.type=`bandpass`,r.frequency.value=s.airFreq,r.Q.value=.9;let a=i.createGain();a.gain.value=s.airGain,n.connect(r),r.connect(a),a.connect(l),n.start(t,.4),e.track(n),g.push(n),g.push(gy(e,r.frequency,t,.05,140))}function F(t){for(let n of[-4,6]){let r=i.createOscillator();r.type=`sine`,r.frequency.value=Ey,r.detune.value=n;let a=i.createGain();a.gain.value=.007,r.connect(a),a.connect(l),r.start(t),e.track(r),g.push(r),g.push(gy(e,a.gain,t,.043,.005))}let n=i.createOscillator();n.type=`sine`,n.frequency.value=Ey*1.5;let r=i.createGain();r.gain.value=.004,n.connect(r),r.connect(l),n.start(t),e.track(n),g.push(n),g.push(gy(e,r.gain,t,.029,.0035)),g.push(gy(e,n.detune,t,.06,7))}function I(t){for(let n of[-7,6]){let r=i.createOscillator();r.type=`sawtooth`,r.frequency.value=36.71,r.detune.value=n;let a=i.createBiquadFilter();a.type=`lowpass`,a.frequency.value=96,a.Q.value=1.1;let o=i.createGain();o.gain.value=.085,r.connect(a),a.connect(o),o.connect(m),r.start(t),e.track(r),g.push(r),g.push(gy(e,o.gain,t,.07,.03))}let n=i.createOscillator();n.type=`sine`,n.frequency.value=73.42;let r=i.createGain();r.gain.value=.045,n.connect(r),r.connect(m),n.start(t),e.track(n),g.push(n);let a=e.noiseSource(),o=i.createBiquadFilter();o.type=`lowpass`,o.frequency.value=190,o.Q.value=.8;let s=i.createGain();s.gain.value=.07,a.connect(o),o.connect(s),s.connect(m),a.start(t,.9),e.track(a),g.push(a),g.push(gy(e,s.gain,t,.11,.025))}function L(e){if(!x)return;let t=i.currentTime,s=w();if(_<t){let e=Math.ceil((t-_)/s);_+=e*s,v+=e}for(;_<e;){let e=_,t=w(),i=v%by,s=Math.floor(v/by);o?i===0&&(s%2==0?O(e,s/2):k(e,(s-1)/2)):a?i===0&&(s%2==0?E(e,s/2):D(e,(s-1)/2)):(i===0?(T(e,.5),s%2==0&&E(e,s/2)):i===4?T(e,.3):i===6&&y>Gy&&T(e,Math.min(.3,.3*(y-1))),S?(j(e,i),i%2==1&&M(e,b),i===0&&(s%Math.max(1,Math.round(r.fightTollBars))===0&&A(e,s,4.2,.26*y),b&&N(e,s,t*by))):n===`bellkeeper`&&i===0&&s%(b?2:4)==0&&A(e,s/2,4.6,.2*y)),_+=t,v+=1}}return{id:n,start(e){x||(x=!0,_=e+.05,v=0,P(e),n===`bellkeeper`&&I(e),o&&F(e),L(e+.5))},schedule(e){L(e)},fadeIn(e,t){let n=l.gain;n.cancelScheduledValues(e),n.setValueAtTime(Math.max(n.value,1e-4),e),n.linearRampToValueAtTime(1,e+t)},fadeOut(e,t){let n=l.gain;return n.cancelScheduledValues(e),n.setValueAtTime(Math.max(n.value,1e-4),e),n.linearRampToValueAtTime(0,e+t),e+t},setIntensity(e,t){y=e;let r=n===`bellkeeper`&&e>Gy;r!==S&&(S=r,C(+!!r,t,r?Uy:Wy)),d.frequency.cancelScheduledValues(t),d.frequency.setValueAtTime(d.frequency.value,t),d.frequency.linearRampToValueAtTime(c*e,t+2.5),u.gain.cancelScheduledValues(t),u.gain.setValueAtTime(u.gain.value,t),u.gain.linearRampToValueAtTime(e,t+2.5)},setPhase2(e){b||(b=!0,m.gain.cancelScheduledValues(e),m.gain.setValueAtTime(m.gain.value,e),m.gain.linearRampToValueAtTime(1.45,e+2))},bossDown(e){n===`bellkeeper`&&(S=!1,C(0,e,Wy),A(e,1,9.5,.34))},stop(e){for(let t of g)_y(t,e);g.length=0,x=!1,S=!1,l.disconnect()}}}var Yy=.16;function Xy(e,t){return 1+Math.sin(e*127.1)*t}function Zy(e,t,n,r,i,a){my(e,t,n,{gain:i,attack:.001,decay:.05,filter:{type:`bandpass`,freq:r,q:a}}),my(e,t,n+Yy,{gain:i*.8,attack:.001,decay:.06,filter:{type:`bandpass`,freq:r*.9,q:a}})}function Qy(e,t,n){my(e,t,n,{gain:.16,attack:.006,decay:.11,filter:{type:`bandpass`,freq:900,freqTo:1900,sweep:.11,q:1.4}}),py(e,t,n,{type:`sine`,freq:220,freqTo:330,glide:.09,gain:.07,decay:.1})}function $y(e,t,n){py(e,t,n,{type:`sine`,freq:148,freqTo:70,glide:.12,gain:.2,decay:.13}),my(e,t,n,{gain:.09,attack:.001,decay:.05,filter:{type:`highpass`,freq:1400,q:.7}}),hy(e,t,n+.02,2100,[1,1.61],{gain:.03,decay:.1,falloff:.7})}function eb(e,t,n){let r=Xy(n,.08);my(e,t,n,{gain:.13,attack:.012,decay:.1,filter:{type:`bandpass`,freq:1200*r,freqTo:3100*r,sweep:.08,q:3.2}}),my(e,t,n+.05,{gain:.05,attack:.004,decay:.07,filter:{type:`bandpass`,freq:2600,freqTo:1100,sweep:.07,q:3}})}function tb(e,t,n){hy(e,t,n,420*Xy(n,.06),[1,2.41,3.94,5.3],{gain:.24,decay:.22,falloff:.5,spread:.25,filter:{type:`bandpass`,freq:1500,q:.9}}),my(e,t,n,{gain:.12,attack:.001,decay:.03,filter:{type:`highpass`,freq:2500,q:.8}}),py(e,t,n,{type:`sine`,freq:120,freqTo:62,glide:.1,gain:.1,decay:.1})}function nb(e,t,n){my(e,t,n,{gain:.2,attack:.01,decay:.21,filter:{type:`bandpass`,freq:320,freqTo:1700,sweep:.13,q:1.2}}),my(e,t,n+.12,{gain:.08,attack:.01,decay:.14,filter:{type:`bandpass`,freq:1500,freqTo:420,sweep:.14,q:1.4}}),py(e,t,n,{type:`triangle`,freq:180,freqTo:92,glide:.18,gain:.09,decay:.18})}function rb(e,t,n){hy(e,t,n,1780,[1,1.32,2.11],{gain:.12,decay:.17,falloff:.6,spread:.3});for(let r of[0,.045,.1])my(e,t,n+r,{gain:.1-r*.4,attack:.002,decay:.05,filter:{type:`highpass`,freq:1900,q:.9}});py(e,t,n,{type:`sine`,freq:150,freqTo:72,glide:.16,gain:.16,decay:.16})}function ib(e,t,n){py(e,t,n,{type:`sawtooth`,freq:300,freqTo:58,glide:.65,gain:.16,attack:.01,decay:.7,filter:{type:`lowpass`,freq:900,freqTo:240,sweep:.7,q:1.1}}),my(e,t,n,{gain:.1,attack:.02,decay:.5,filter:{type:`bandpass`,freq:700,freqTo:240,sweep:.5,q:1.3}}),hy(e,t,n+.18,220,[1,1.51,2.32,3.41],{gain:.13,decay:.95,falloff:.56,spread:.2,filter:{type:`lowpass`,freq:1400,q:.7}})}function ab(e,t,n){my(e,t,n,{gain:.09,attack:.02,decay:.16,filter:{type:`bandpass`,freq:600,freqTo:1600,sweep:.14,q:1.1}}),hy(e,t,n+.06,220,[1,2,3.01],{gain:.14,decay:.8,falloff:.55,filter:{type:`lowpass`,freq:2200,q:.7}}),hy(e,t,n+.26,293.66,[1,2,3.01],{gain:.12,decay:.95,falloff:.55,filter:{type:`lowpass`,freq:2400,q:.7}})}function ob(e,t,n){let r=Xy(n,.09);my(e,t,n,{gain:.14,attack:.001,decay:.09,filter:{type:`bandpass`,freq:820*r,q:7}}),py(e,t,n,{type:`square`,freq:184*r,freqTo:132*r,glide:.08,gain:.09,decay:.09,filter:{type:`lowpass`,freq:1100,q:.9}})}function sb(e,t,n){let r=Xy(n,.07);hy(e,t,n,700*r,[1,1.74,2.9],{gain:.16,decay:.22,falloff:.55,spread:.25,filter:{type:`bandpass`,freq:1300,q:1.1}}),hy(e,t,n+.12,470*r,[1,1.74,2.9],{gain:.12,decay:.26,falloff:.55,spread:.25,filter:{type:`bandpass`,freq:1e3,q:1.1}}),py(e,t,n+.06,{type:`sine`,freq:96,freqTo:52,glide:.22,gain:.12,decay:.24}),my(e,t,n,{gain:.06,attack:.004,decay:.18,filter:{type:`highpass`,freq:2200,q:.8}})}function cb(e,t,n){py(e,t,n,{type:`sine`,freq:440,gain:.12,attack:.006,decay:.5}),py(e,t,n,{type:`triangle`,freq:880,gain:.04,attack:.006,decay:.35}),py(e,t,n+.14,{type:`sine`,freq:587.33,gain:.11,attack:.006,decay:.6}),py(e,t,n+.14,{type:`triangle`,freq:1174.66,gain:.032,attack:.008,decay:.4})}function lb(e,t,n){hy(e,t,n,73.42,[1,2,2.76,5.4,8.9],{gain:.26,decay:3.6,falloff:.6,spread:.14,filter:{type:`lowpass`,freq:2600,q:.6}});let r=[146.83,220,293.66,440],i=0;for(let a of r)py(e,t,n+.1+i*.07,{type:`sine`,freq:a,gain:.09-i*.012,attack:.6,hold:1.4,decay:2.6,curve:`linear`}),py(e,t,n+.1+i*.07,{type:`triangle`,freq:a*2,gain:.022,attack:.9,hold:1.2,decay:2.4,curve:`linear`}),i+=1}function ub(e,t,n){let r=0,i=.075;for(let a=0;a<7;a+=1)my(e,t,n+r,{gain:.09,attack:.001,decay:.045,filter:{type:`bandpass`,freq:1600-a*90,q:8}}),r+=i,i*=1.12;py(e,t,n+r+.05,{type:`sine`,freq:112,freqTo:58,glide:.28,gain:.2,decay:.32}),hy(e,t,n+r+.05,196,[1,2.2,3.6],{gain:.12,decay:.5,falloff:.55,filter:{type:`lowpass`,freq:1800,q:.8}})}function db(e,t,n){my(e,t,n,{gain:.2,attack:.001,decay:.12,filter:{type:`lowpass`,freq:1700,freqTo:700,sweep:.12,q:.9}});for(let r=0;r<6;r+=1)my(e,t,n+(.05+r*.042),{gain:.07*(1-r*.13),attack:.001,decay:.035,filter:{type:`bandpass`,freq:1800+Math.sin(r*12.9)*700,q:5}});py(e,t,n,{type:`sine`,freq:110,freqTo:52,glide:.2,gain:.12,decay:.22})}function fb(e,t,n){my(e,t,n,{gain:.1,attack:.03,decay:.3,filter:{type:`bandpass`,freq:500,freqTo:1500,sweep:.25,q:1}}),hy(e,t,n+.05,293.66,[1,2,3.01,4.7],{gain:.16,decay:1.25,falloff:.55,spread:.18,filter:{type:`lowpass`,freq:2600,q:.7}}),hy(e,t,n+.34,440,[1,2,3.01,4.7],{gain:.13,decay:1.4,falloff:.55,spread:.18,filter:{type:`lowpass`,freq:2800,q:.7}})}function pb(e,t,n){my(e,t,n,{gain:.12,attack:.04,decay:.3,filter:{type:`bandpass`,freq:380,freqTo:2300,sweep:.3,q:6}}),py(e,t,n,{type:`sawtooth`,freq:124,freqTo:268,glide:.3,gain:.05,attack:.05,decay:.3,filter:{type:`bandpass`,freq:700,freqTo:1600,sweep:.3,q:4}})}function mb(e,t,n){py(e,t,n,{type:`sine`,freq:176,freqTo:48,glide:.11,gain:.24,decay:.17}),hy(e,t,n,288,[1,2.68],{gain:.1,decay:.13,falloff:.5,filter:{type:`lowpass`,freq:1200,q:.8}}),my(e,t,n,{gain:.15,attack:.001,decay:.09,filter:{type:`lowpass`,freq:1900,freqTo:480,sweep:.09,q:1.1}})}function hb(e,t,n){my(e,t,n,{gain:.09,attack:.2,decay:.18,filter:{type:`bandpass`,freq:2700,freqTo:5200,sweep:.34,q:.9}}),py(e,t,n,{type:`triangle`,freq:300,freqTo:430,glide:.32,gain:.03,attack:.18,decay:.2,filter:{type:`highpass`,freq:900,q:.7}})}function gb(e,t,n){hy(e,t,n,536,[1,1.47,2.93],{gain:.15,decay:.14,falloff:.48,spread:.3,filter:{type:`bandpass`,freq:1650,q:1.3}}),my(e,t,n,{gain:.1,attack:.001,decay:.04,filter:{type:`bandpass`,freq:940,q:5}}),py(e,t,n,{type:`square`,freq:94,freqTo:66,glide:.1,gain:.07,decay:.11,filter:{type:`lowpass`,freq:620,q:.9}})}function _b(e,t,n){hy(e,t,n,1240,[1,2.76],{gain:.07,decay:.18,falloff:.45,spread:.3,filter:{type:`highpass`,freq:900,q:.7}}),hy(e,t,n+.17,1560,[1,2.76],{gain:.08,decay:.2,falloff:.45,spread:.3,filter:{type:`highpass`,freq:1e3,q:.7}})}function vb(e,t,n){my(e,t,n,{gain:.1,attack:.035,decay:.24,filter:{type:`bandpass`,freq:1900,freqTo:400,sweep:.24,q:1.1}}),py(e,t,n,{type:`sine`,freq:640,freqTo:230,glide:.22,gain:.05,attack:.03,decay:.22})}function yb(e,t,n){py(e,t,n,{type:`sine`,freq:610,freqTo:1960,glide:.84,gain:.07,attack:.14,decay:.82}),py(e,t,n,{type:`triangle`,freq:915,freqTo:2940,glide:.84,gain:.022,attack:.22,decay:.78}),my(e,t,n,{gain:.03,attack:.3,decay:.58,filter:{type:`bandpass`,freq:3e3,freqTo:6200,sweep:.8,q:6}})}function bb(e,t,n){my(e,t,n,{gain:.16,attack:.001,decay:.045,filter:{type:`highpass`,freq:3800,q:.8}}),hy(e,t,n,2380,[1,1.93],{gain:.09,decay:.13,falloff:.5,spread:.3});for(let r=0;r<3;r+=1)my(e,t,n+.045+r*.038,{gain:.045-r*.01,attack:.001,decay:.025,filter:{type:`bandpass`,freq:4600+Math.sin(r*9.7)*1200,q:9}})}function xb(e,t,n){let r=0,i=.085;for(let a=0;a<4;a+=1)hy(e,t,n+r,980+a*190,[1,2.44],{gain:.07,decay:.07,falloff:.5,spread:.3,filter:{type:`bandpass`,freq:2e3+a*260,q:2.4}}),r+=i,i*=.82}function Sb(e,t,n){xb(e,t,n),py(e,t,n,{type:`sawtooth`,freq:92,freqTo:158,glide:.45,gain:.13,attack:.06,decay:.45,filter:{type:`bandpass`,freq:320,freqTo:980,sweep:.45,q:5.5}}),my(e,t,n+.08,{gain:.06,attack:.05,decay:.4,filter:{type:`bandpass`,freq:2400,freqTo:3400,sweep:.4,q:7}})}function Cb(e,t,n){Zy(e,t,n,320,.11,10),my(e,t,n,{gain:.16,attack:.22,decay:.26,filter:{type:`bandpass`,freq:200,freqTo:720,sweep:.44,q:2.2}}),py(e,t,n,{type:`sine`,freq:56,freqTo:44,glide:.45,gain:.16,attack:.2,decay:.28}),py(e,t,n+.05,{type:`triangle`,freq:160,gain:.05,attack:.18,decay:.25,filter:{type:`bandpass`,freq:160,q:12}})}function wb(e,t,n){py(e,t,n,{type:`sine`,freq:92,freqTo:38,glide:.24,gain:.3,decay:.26}),hy(e,t,n,260,[1,2.32,3.81,5.12],{gain:.2,decay:.42,falloff:.55,spread:.2,filter:{type:`lowpass`,freq:2e3,q:.8}}),my(e,t,n,{gain:.14,attack:.001,decay:.045,filter:{type:`highpass`,freq:1800,q:.8}})}function Tb(e,t,n){hy(e,t,n,186*Xy(n,.05),[1,2.12,3.3],{gain:.16,decay:.24,falloff:.5,spread:.25,filter:{type:`bandpass`,freq:760,q:1.6}}),my(e,t,n,{gain:.1,attack:.001,decay:.07,filter:{type:`bandpass`,freq:1400,q:6}})}function Eb(e,t,n){my(e,t,n,{gain:.22,attack:.001,decay:.16,filter:{type:`bandpass`,freq:1100,freqTo:420,sweep:.16,q:2.2}}),py(e,t,n,{type:`sawtooth`,freq:140,freqTo:52,glide:.3,gain:.16,decay:.34,filter:{type:`lowpass`,freq:1200,q:1}}),my(e,t,n+.1,{gain:.15,attack:.08,decay:.85,filter:{type:`highpass`,freq:1200,freqTo:3200,sweep:.7,q:.8}}),py(e,t,n+.12,{type:`sine`,freq:220,freqTo:700,glide:.7,gain:.07,attack:.12,decay:.8})}function Db(e,t,n){py(e,t,n,{type:`sine`,freq:120,freqTo:30,glide:1.5,gain:.28,attack:.02,decay:1.6}),hy(e,t,n+.05,73.42,[1,2,2.76,5.4,8.9],{gain:.24,decay:3,falloff:.6,spread:.16,filter:{type:`lowpass`,freq:2200,q:.6}}),my(e,t,n+.12,{gain:.16,attack:.06,decay:1.2,filter:{type:`bandpass`,freq:2200,freqTo:600,sweep:1.1,q:1.2}});for(let r=0;r<5;r+=1)hy(e,t,n+.5+r*.13,320-r*34,[1,1.9],{gain:.07,decay:.3,falloff:.6,filter:{type:`bandpass`,freq:900,q:1.8}})}function Ob(e,t,n){let r=[220,293.66,369.99],i=0;for(let a of r){let r=n+.18+i*.24;hy(e,t,r,a,[1,2,2.76,5.4],{gain:.16+i*.03,decay:2.2+i*.6,falloff:.62,spread:.14,filter:{type:`lowpass`,freq:3200,q:.6}}),py(e,t,r,{type:`sine`,freq:a*2,gain:.04,attack:.05,hold:.2,decay:1.1,curve:`linear`}),i+=1}}function kb(e,t,n){hy(e,t,n,146.83,[1,2,2.76,5.4],{gain:.18,decay:2.8,falloff:.6,spread:.16,filter:{type:`lowpass`,freq:2400,q:.6}});let r=[146.83,174.61,220,293.66],i=0;for(let a of r)py(e,t,n+.9+i*.05,{type:`sine`,freq:a,gain:.07,attack:.9,hold:1.2,decay:2.4,curve:`linear`}),i+=1}function Ab(e,t,n,r){my(e,t,n,{gain:.08,attack:.001,decay:.03,filter:{type:`bandpass`,freq:1250,q:6}}),py(e,t,n+.02,{type:`sine`,freq:r?660:880,freqTo:r?880:660,glide:.07,gain:.07,decay:.12})}function jb(e,t,n){hy(e,t,n,110,[1,2,3.01],{gain:.12,decay:1.1,falloff:.55,filter:{type:`lowpass`,freq:1800,q:.7}}),py(e,t,n+.08,{type:`sine`,freq:220,freqTo:293.66,glide:.25,gain:.06,attack:.05,decay:.5})}function Mb(e,t,n,r){switch(n){case`start`:jb(e,t,r);return;case`jump`:Qy(e,t,r);return;case`land`:$y(e,t,r);return;case`attackSwing`:eb(e,t,r);return;case`attackHit`:tb(e,t,r);return;case`dash`:nb(e,t,r);return;case`hurt`:rb(e,t,r);return;case`death`:ib(e,t,r);return;case`respawn`:ab(e,t,r);return;case`enemyHurt`:ob(e,t,r);return;case`enemyDeath`:sb(e,t,r);return;case`pickup`:cb(e,t,r);return;case`dawnCore`:lb(e,t,r);return;case`gateOpen`:ub(e,t,r);return;case`breakableBroken`:db(e,t,r);return;case`checkpoint`:fb(e,t,r);return;case`guardTelegraph`:pb(e,t,r);return;case`guardAttack`:mb(e,t,r);return;case`stomperTelegraph`:hb(e,t,r);return;case`stomperAttack`:gb(e,t,r);return;case`lamplighterTelegraph`:_b(e,t,r);return;case`lamplighterAttack`:vb(e,t,r);return;case`sentryTelegraph`:yb(e,t,r);return;case`sentryAttack`:bb(e,t,r);return;case`bossTelegraphSweep`:Sb(e,t,r);return;case`bossTelegraphStomp`:Cb(e,t,r);return;case`bossAttack`:wb(e,t,r);return;case`bossHurt`:Tb(e,t,r);return;case`bossPhase`:Eb(e,t,r);return;case`bossDeath`:Db(e,t,r);return;case`victorySting`:Ob(e,t,r);return;case`victory`:kb(e,t,r);return;case`pause`:Ab(e,t,r,!1);return;case`resume`:Ab(e,t,r,!0);return;default:return}}var Nb=`modulepreload`,Pb=function(e){return`/borrowed-dawn/builds/m4-final/`+e},Fb={},Ib=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,import.meta.url).href}r=o(t.map(t=>{if(t=Pb(t,n),t=s(t),t in Fb)return;Fb[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:Nb,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function Lb(){return{music:{},sfx:{}}}function Rb(e){let t={};if(typeof e!=`object`||!e)return t;for(let[n,r]of Object.entries(e))typeof r==`string`&&r.length>0&&(t[n]=r);return t}function zb(e){let t=Lb(),n=null,r=new Map,i=null,a=null,o=1,s=!1;function l(e){return`/borrowed-dawn/builds/m4-final/audio/`+e}function u(e,t,i){if(n===null)return null;let a=(t?`m:`:`s:`)+e,o=r.get(a);if(o!==void 0)return o;let s=new n.Howl({src:[l(e)],loop:t,volume:i,preload:!0});return r.set(a,s),s}return{load(r){fetch(l(`manifest.json`),{cache:`no-cache`}).then(e=>e.ok?e.json():null).then(e=>{if(typeof e!=`object`||!e)return null;let n=e;return t={music:Rb(n.music),sfx:Rb(n.sfx)},Object.keys(t.music).length+Object.keys(t.sfx).length===0?null:Ib(()=>import(`./howler-B5H_URx5.js`).then(e=>c(e.default,1)),[])}).then(t=>{t!==null&&(n=t,t.Howler.volume(e.master),t.Howler.mute(s),r())}).catch(()=>{t=Lb()})},hasMusic(e){return n!==null&&t.music[e]!==void 0},hasSfx(e){return n!==null&&t.sfx[e]!==void 0},playMusic(r,s){let c=t.music[r];if(c===void 0||n===null||i===r&&a!==null)return;let l=a;l!==null&&(l.fade(l.volume(),0,s),window.setTimeout(()=>l.stop(),s+40));let d=u(c,!0,0);d!==null&&(i=r,a=d,d.play(),d.fade(0,e.music*o,s))},stopMusic(e){let t=a;t!==null&&(t.fade(t.volume(),0,e),window.setTimeout(()=>t.stop(),e+40),a=null,i=null)},playSfx(n){let r=t.sfx[n];if(r===void 0)return;let i=u(r,!1,e.sfx);i!==null&&i.play()},setMuted(e){s=e,n!==null&&n.Howler.mute(e)},setMusicScale(t){o=t,a!==null&&a.volume(e.music*t)}}}function Bb(e,t){if(e.music===`reserve`)return`reserve`;let n;return n=e.music===`bellkeeper`?`bellkeeper`:e.music===`cinder`||e.bossArena===void 0?`cinder`:`bellkeeper`,t&&n===`cinder`?`dawn`:n}var Vb={guard:`guardTelegraph`,stomper:`stomperTelegraph`,lamplighter:`lamplighterTelegraph`,sentry:`sentryTelegraph`},Hb={guard:`guardAttack`,stomper:`stomperAttack`,lamplighter:`lamplighterAttack`,sentry:`sentryAttack`};function Ub(e,t){for(let n of t.pickups)if(Math.abs(n.pos.x-e.x)<.01&&Math.abs(n.pos.y-e.y)<.01)return n.kind===`dawnCore`?`dawnCore`:`pickup`;return`pickup`}function Wb(e,t){switch(e.kind){case`roomEnter`:return null;case`pickup`:return Ub(e,t);case`bossTelegraph`:return t.boss!==null&&t.boss.state===`stompTelegraph`?`bossTelegraphStomp`:`bossTelegraphSweep`;default:return e.kind}}function Gb(e){let t=e.audio,n=zb({master:t.master,music:t.music,sfx:t.sfx}),r=new URLSearchParams(location.search).get(`mute`)===`1`,i=null,a=null,o=null,s=null,c=null,l=null,u=null,d=[],f=null,p=`cinder`,m=1,h=!1,g=0,_=null,v=!1,y=new Map,b=null;function x(){if(i===null||a===null||u===null)return;let e=i.currentTime,r=t.crossfadeMs/1e3;if(n.hasMusic(p)){for(let t of d)t.stopAt===null&&(t.stopAt=t.bed.fadeOut(e,r));f=null,n.playMusic(p,t.crossfadeMs);return}if(n.stopMusic(t.crossfadeMs),f!==null&&f.id===p)return;for(let t of d)t.stopAt===null&&(t.stopAt=t.bed.fadeOut(e,r));let o=Jy(a,u,p,t);o.start(e),o.fadeIn(e,r),m>1&&o.setIntensity(m,e),d.push({bed:o,stopAt:null}),f=o}function S(){if(_===null)return;let e=Bb(_,v);(e!==p||f===null)&&(e!==p&&(h=!1,m=1),p=e,x())}function C(e){if(o===null)return;let n=o.gain;n.cancelScheduledValues(e),n.setValueAtTime(n.value,e),n.linearRampToValueAtTime(r?0:t.master,e+t.muteRampMs/1e3)}function w(){if(g=performance.now()+t.duckMs,n.setMusicScale(t.duckOnDeath),i===null||l===null)return;let e=i.currentTime,r=t.duckMs/1e3,a=l.gain;a.cancelScheduledValues(e),a.setValueAtTime(a.value,e),a.linearRampToValueAtTime(t.duckOnDeath,e+.12),a.setValueAtTime(t.duckOnDeath,e+r*.6),a.linearRampToValueAtTime(1,e+r)}function T(e){if(i===null||u===null)return;let t=i.currentTime,n=u.gain;n.cancelScheduledValues(t),n.setValueAtTime(n.value,t),n.linearRampToValueAtTime(e,t+.25)}function E(e){if(n.hasSfx(e)){n.playSfx(e);return}i!==null&&a!==null&&s!==null&&Mb(a,s,e,i.currentTime+.005)}function D(){if(i!==null){i.state===`suspended`&&i.resume();return}let e=window.AudioContext;e!==void 0&&(i=new e,a=cy(i),o=i.createGain(),o.gain.value=r?0:t.master,o.connect(i.destination),s=i.createGain(),s.gain.value=t.sfx,s.connect(o),c=i.createGain(),c.gain.value=t.music,c.connect(o),l=i.createGain(),l.gain.value=1,l.connect(c),u=i.createGain(),u.gain.value=1,u.connect(l),i.state===`suspended`&&i.resume(),x())}function O(){r=!r,n.setMuted(r),i!==null&&C(i.currentTime)}function k(e){e.isTrusted&&D()}return window.addEventListener(`keydown`,k),window.addEventListener(`pointerdown`,k),window.addEventListener(`keydown`,e=>{e.isTrusted&&!e.repeat&&e.code===`KeyM`&&O()}),n.setMuted(r),n.load(()=>x()),{get muted(){return r},get context(){return i},unlock:D,toggleMute:O,setRoom(e){_=e,y.clear(),S()},onEvent(e,n){if((e.kind===`start`||e.kind===`respawn`)&&y.clear(),e.kind===`death`?w():e.kind===`pause`?T(t.pauseDuck):e.kind===`resume`&&T(1),e.kind===`bossTelegraph`&&!h&&(h=!0,m=t.bossIntensity,i!==null&&f!==null&&f.setIntensity(m,i.currentTime)),e.kind===`bossPhase`&&i!==null&&f!==null&&f.setPhase2(i.currentTime),e.kind===`bossDeath`&&(h=!1,m=1,i!==null&&f!==null)){let e=i.currentTime;f.setIntensity(1,e),f.bossDown(e)}let r=Wb(e,n);r!==null&&E(r),e.kind===`bossDeath`&&E(`victorySting`)},sync(e,a){e.progress.bossDefeated!==v&&(v=e.progress.bossDefeated,S()),e.roomId!==b&&(b=e.roomId,y.clear());for(let t of e.enemies){let e=y.get(t.id);e!==t.state&&(y.set(t.id,t.state),e!==void 0&&(t.state===`telegraph`?E(Vb[t.kind]):(t.state===`attack`||t.state===`recover`&&e===`telegraph`)&&E(Hb[t.kind])))}if(i===null)return;let l=i.currentTime;for(let e=d.length-1;e>=0;--e){let n=d[e];if(n!==void 0){if(n.stopAt!==null&&l>n.stopAt+.05){n.bed.stop(l),d.splice(e,1);continue}n.bed.schedule(l+t.lookaheadSec)}}g>0&&performance.now()>=g&&(g=0,n.setMusicScale(1)),c!==null&&Math.abs(c.gain.value-t.music)>.001&&(c.gain.value=t.music),s!==null&&Math.abs(s.gain.value-t.sfx)>.001&&(s.gain.value=t.sfx),!r&&o!==null&&Math.abs(o.gain.value-t.master)>.001&&(o.gain.value=t.master)},stats(){return{context:i===null?`none`:i.state,bed:f===null?null:f.id,beds:d.length,muted:r,intensity:m,created:a===null?0:a.created,active:a===null?0:a.active}}}}f.screenshot&&document.body.classList.add(`screenshot`);var Kb=document.getElementById(`game`),qb=document.getElementById(`ui`);ay();var Jb,Yb;if(f.start===`demo`)Jb=It.room,Yb={x:It.pos.x,y:It.pos.y};else if(f.room!==null){let e=Lt(f.room);if(e!==void 0){let t=e.checkpoint??e.waypoints[0];Jb=e.id,t!==void 0&&(Yb={x:t.x,y:t.y})}}var Xb=qe({tuning:l,seed:f.seed,rooms:Ft,startRoom:Jb,startPos:Yb,god:f.god}),Zb=We(),Qb=f.autoplay?bn(Xb):Yt(),$b=Pv(Kb,l),ex=Iv(qb),tx=Lv(qb),nx=Rv(qb),rx=Bv(qb),ix=Vv(qb),ax=Gb(l);function ox(){let e=Xb.currentRoom();$b.setRoom(e,Xb.state.progress),$b.snapCamera(e,Xb.state.player),ax.setRoom(e)}ox();var sx=performance.now(),cx=0,lx=Jt();function ux(e){let t=Math.min((e-sx)/1e3,.1)*f.fast;sx=e,cx+=t;let n=Qb.sample();lx.moveX=n.moveX,lx.moveY=n.moveY,lx.jumpHeld=n.jumpHeld,n.jump&&(lx.jump=!0),n.attack&&(lx.attack=!0),n.dash&&(lx.dash=!0),n.pause&&(lx.pause=!0),n.confirm&&(lx.confirm=!0),Xb.setInput(lx);let r=!1,i=Zb.advance(t,e=>{Xb.step(e),r||(r=!0,lx.jump=!1,lx.attack=!1,lx.dash=!1,lx.pause=!1,lx.confirm=!1,Xb.setInput(lx))}),a=Xb.state;for(let e of a.events)(e.kind===`roomEnter`||e.kind===`respawn`||e.kind===`start`)&&ox(),e.kind===`hurt`||e.kind===`death`?$b.addShake(l.feel.shakeOnHit):e.kind===`enemyDeath`?$b.addShake(l.feel.shakeOnKill):e.kind===`bossAttack`&&$b.addShake(l.feel.shakeOnBossSlam),$b.onEvent(e,a,l),ax.onEvent(e,a),rx.onEvent(e,a,l),ix.onEvent(e,l);a.events.length=0;let o=Xb.currentRoom();$b.sync(a,o,i,t,a.time,cx,l),ax.sync(a,t),ex.sync(a,l),tx.sync(a,l),nx.sync(a),rx.sync(a,l),$b.render(),requestAnimationFrame(ux)}requestAnimationFrame(ux),window.__omr={game:Xb,tuning:l,params:f,rooms:Ft},window.__omrAudio=ax,console.log(`[borrowed-dawn] boot ok`,{seed:f.seed,room:Xb.state.roomId});export{o as t};
//# sourceMappingURL=index-CWx8PS47.js.map