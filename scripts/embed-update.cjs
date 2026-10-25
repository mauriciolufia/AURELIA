const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'index.html');
let html = fs.readFileSync(file, 'utf8');
// Replace the legacy 20% roll once; contact and distance now share one 30% decision.
html=html.replace('if(enemy&&Math.random()<.20){','if(enemy&&__v117HeroEvades(c)){');
html=html.replace('const reach=__v85EnemyRange(c,(c.boss?c.defn.range*.72:c.elite?4:2.4)*1.3*1.5*.7*1.5);if(d<reach', 'const reach=__v117MeleeReach(c);if(d<reach');
html=html.replace('_d0(s.c,s.art.power,s.art.status);','__v117RangedHit(s.c,s.art.power,s.art.status,s.art);');
html=html.replace('const a=Math.atan2(_14.x-p.x,_14.z-p.z);for(const off', 'const aim117=__v117EnemyAim(c,new _0.Vector3(p.x,p.y+1.8,p.z),19,46),a=Math.atan2(aim117.x-p.x,aim117.z-p.z);for(const off');
// A bell must use the same two-ally recruitment cap as visual alerts.
html=html.replace("for(const ally of a.members)if(!ally.dead&&Math.abs(ally.__v75Room-c.__v75Room)<=1)ally.__v75AlertUntil=__v75.clock+12;", '__v117Alarm(a,c);');
// Both public URLs must also work when downloaded as one HTML file.
html=html.replace(/<script id="aurelia-web115-redirect">[\s\S]*?<\/script>/,'');
const furnitureStart=' for(const i of[1,2,4,5,7]){const[x,z]=pl.centers[i]';
if(html.includes(furnitureStart)){
 const start=html.indexOf(furnitureStart),end=html.indexOf('\n',start);
 html=html.slice(0,start)+' for(const i of[1,2,4,5,7])__v97RoomFurniture(a,i);'+html.slice(end);
}
const oldThreat="l.threats.find(c=>Math.hypot(c.g.position.x-n.x,c.g.position.z-n.z)<(n.age==='child'?28:21)&&Math.abs(c.g.position.y-n.homeY)<5&&_5w(n.x,n.z,c.g.position.x,c.g.position.z,n.homeY+1.4))";
html=html.replace(oldThreat,'__v97NearestThreat(n)');
// Draw the original vector artwork at native high resolution; never upscale a bitmap.
html=html.replace('const size=__v60Mobile?256:512,canvas=', 'const size=__v60Mobile?512:1024,canvas=');
html=html.replace("palette=(__v85Palettes[theme]||__v85Palettes.desert)[role],size=__v60Mobile?256:512,c=", "palette=(__v85Palettes[theme]||__v85Palettes.desert)[role],size=__v60Mobile?512:1024,c=");
html=html.replace("if(d<reach&&c.cooldown===0&&", "if(d<reach&&__v92LOS(c)&&c.cooldown===0&&");
html=html.replace("if(n.__v88Controlled||n.__v88Dead)continue;const dist=", "if(n.__v88Controlled||n.__v88Dead||n.__v98Active)continue;const dist=");
html=html.replace("if(n.__v88Controlled||n.__v88Dead||n.__v98Active)continue;const dist=", "if(n.__v88Controlled||n.__v88Dead||n.__v98Active||n.__v88Brain?.state==='flee')continue;const dist=");
html=html.replace("for(const n of l.active){if(n.__v88Controlled||n.__v88Dead)continue;const b=", "for(const n of l.active){if(n.__v88Controlled||n.__v88Dead||n.__v98Active)continue;const b=");
html=html.replace("__v88Move(n,b.escape,n.age==='child'?5:4.2,dt,l.active);", "__v98Escape(n,b.escape,dt,l.active);");
// A lethal hit can clear every projectile while this loop is in progress.
html=html.replace('for(let i=_ct.length-1;i>=0;i--){const s=_ct[i];let end=', 'for(const s of [..._ct].reverse()){if(!_ct.includes(s))continue;let end=');
html=html.replace('s.life-=dt;if(end||s.life<=0){_6.remove(s.g);s.g.geometry.dispose();s.m.dispose();_ct.splice(i,1);}}', 'if(!_ct.includes(s))continue;s.life-=dt;if(end||s.life<=0){_6.remove(s.g);s.g.geometry.dispose();s.m.dispose();const index=_ct.indexOf(s);if(index>=0)_ct.splice(index,1);}}');
// Scale hostile attack clocks without slowing movement, projectiles or civilian routines.
for(const timer of ['cooldown','specialCooldown']){
 html=html.replaceAll('c.'+timer+'-dt)', 'c.'+timer+'-dt*__v102CombatRate(c))');
 html=html.replaceAll('c.'+timer+'-dt*2.07125)', 'c.'+timer+'-dt*2.07125*__v102CombatRate(c))');
}
html=html.replaceAll('c.attackTimer-=dt;', 'c.attackTimer-=dt*__v102CombatRate(c);');
html=html.replaceAll('c.attackTimer-dt*2.07125)', 'c.attackTimer-dt*2.07125*__v102CombatRate(c))');
html=html.replaceAll('c.specialAction.time-dt*2.07125)', 'c.specialAction.time-dt*2.07125*__v102CombatRate(c))');
html=html.replace('shown=c;a.time-=dt;', "shown=c;a.time-=dt*(a.phase==='windup'||a.phase==='fade'?__v102CombatRate(c):1);");
html=html.replace('e.clock+=dt;if(c.dead||!__v92SameFloor(c))', 'e.clock+=dt*__v102CombatRate(c);if(c.dead||!__v92SameFloor(c))');
html=html.replace('if(e.action){e.action.time-=dt;', 'if(e.action){e.action.time-=dt*__v102CombatRate(c);');
html=html.replace('r.next=w.clock+1.5+(r.index%4)*.1;', 'r.next=w.clock+(1.5+(r.index%4)*.1)/__v102CombatRate(c);');
html=html.replace('const t=(w.clock-r.action.start)/.75,', 'const t=(w.clock-r.action.start)/(.75/__v102CombatRate(c)),');
html=html.replace('p.next+=2;_5p=.6;', 'p.next+=2/(p.rate102||1);_5p=.6;');
html=html.replace('_cu.tick+=dt;while(_cu.tick>=1)', '_cu.tick+=dt*__v102Combat.burnRate;while(_cu.tick>=1)');
// Keep the new cut-and-fill road visible in the mountain terrain itself.
html=html.replace('new _0.PlaneGeometry(m.r*2,m.r*2,64,64)', 'new _0.PlaneGeometry(m.r*2,m.r*2,128,128)');
html=html.replace("{areas:[__v83.areas.find(a=>a.key==='crypt')],boss:_m.find(c=>c.boss==='optional-pharaoh')}", '__v102SolarGroup()');
html=html.replace('if(_eb)_14.set(s.player[0],_dz.y+1.85,s.player[2]);','if(_eb)__v102SolarRestorePosition(s.player);');
html=html.replaceAll('Cripta del Sol · recorre sus doce cámaras','Pirámide del Sol Eterno · tres plantas conectadas');
html=html.replaceAll('Capitana Bruma Roja','Barbanegra').replaceAll('Bruma Roja','Barbanegra');
html=html.replace('_14.y-1.85<t.y+3&&__v86TrapContains', "_14.y-1.85<t.y+(['spikes','dark','vapor102','poison'].includes(t.type)?8:3)&&__v86TrapContains");
html=html.replaceAll("['spikes','dark','vapor102','poison'].includes(t.type)?8:3", "['spikes','dark','vapor102','poison','poisongas','firejet','burn','fire108'].includes(t.type)?11.8:3");
// Exterior destinations must not inherit remote interior floor coordinates.
html=html.replace(/a.site===index&&a.key!=='crypt'(?:&&!a.plan103&&a.tower94!==__v102Solar)*/g, "a.site===index&&a.key!=='crypt'&&!a.plan103&&a.tower94!==__v102Solar");
// The expanded world has more than 500 breakable barrels; keep every cleared barrel.
html=html.replace('].slice(0,500);s.blessings=', '].slice(0,2000);s.blessings=');
// NPC battles use the same damage formula as the player, including projectile impacts.
html=html.replace('__v88HitNPC(target,20+(w.elapsed>65?7:0),p.owner);', "__v88HitNPC(target,.85,p.owner);");
html=html.replace('__v88HitNPC(d,8+(r.index%4)+(w.elapsed>65?5:0),r);', '__v88HitNPC(d,1,r);');
html=html.replace('r.c.hp-r.c.maxHp*(.018+(d.index%3)*.002)', 'r.c.hp-__v105Damage(d.atk,r.c.def)');
html=html.replace('const st=_g4(),factor=_85===2?1.18:1;', 'const st=_g4(),factor=1;');
html=html.replace("name:'Tríada de energía imperial',type:'projectile',range:46,power:1.25", "name:'Tríada de energía imperial',type:'projectile',range:46,power:1.5");
html=html.replace('_d0(c,1.25);e.audit.hits++', '_d0(c,1.5);e.audit.hits++');
// Preserve readable, terrain-conforming quicksand throughout the desert.
html=html.replace('tries<2000&&s.fields.length<12','tries<8000&&s.fields.length<12');
html=html.replace("Math.abs(_2r(xx,zz)-y)>.65||_i7(xx,zz,y+1.85)","Math.abs(_2r(xx,zz)-y)>1.1||_he(xx,zz).id!=='desert'||_i7(xx,zz,y+1.85)");
html=html.replace("e.specialCursor++%2?'darkness':'energy'", "['darkness','energy','pulse'][e.specialCursor++%3]");
html=html.replace("type:r.fire&&Math.random()<.65?'fire':'claw'", "type:['claw','fire','pulse'][(r.__v107Turns=(r.__v107Turns||0)+1)%3]");
html=html.replace("if(r.action.type==='fire')__v88Spit(r,d);else if(Math.hypot", "if(r.action.type==='fire')__v88Spit(r,d);else if(r.action.type==='pulse')__v107RaidPulse(r);else if(Math.hypot");
html=html.replace('for(const c of items){const inside=c.w!==undefined?', 'for(const c of items){if(c.destruct108&&(c.destruct108===__v108Scenery.ignore||__v108Scenery.broken.has(c.destruct108)))continue;const inside=c.w!==undefined?');
html=html.replace("list.push({x,y,z,s:b.id==='polar'?", "list.push({x,y,z,rock108:true,s:b.id==='polar'?");
// Preserve per-tree and per-rock ownership through streamed sector geometry.
html=html.replace('m.castShadow=m.receiveShadow=true;_8.add(m);return m;', 'm.castShadow=m.receiveShadow=true;_8.add(m);__v108SceneryPart(m,items,geo);return m;');
html=html.replace('else _bb(o.geometry,o.material,o.matrixWorld,o.castShadow);', 'else _bb(o.geometry,o.material,o.matrixWorld,o.castShadow,__v108SceneryMeshId(o));');
html=html.replace('_bb(o.geometry,o.material,new _0.Matrix4().multiplyMatrices(o.matrixWorld,m),o.castShadow);', '_bb(o.geometry,o.material,new _0.Matrix4().multiplyMatrices(o.matrixWorld,m),o.castShadow,o.userData.destruct108?.[i]);');
html=html.replace('for(const r of p.records){const base=_b9(r.geometry);', 'for(const r of p.records){if(r.destruct108&&__v108Scenery.broken.has(r.destruct108))continue;const base=_b9(r.geometry);');
html=html.replace("if(i%3===0){\n      mesh(new _0.CylinderGeometry(.2,.26,4.3,6)", "if(i%3===0){g.userData.tree108=true;\n      mesh(new _0.CylinderGeometry(.2,.26,4.3,6)");

// Late withered trees also retain ownership through their shared instance batches.
html=html.replaceAll('batches.get(key).push({x,y,z,sx,sy,sz,ry,rz});', 'batches.get(key).push({x,y,z,sx,sy,sz,ry,rz,owner108:__v108Scenery.scopeOwner?.id});');
html=html.replace("for(const[i,p]of trees.entries()){const h=5+rng88()", "for(const[i,p]of trees.entries()){__v108Scenery.scopeOwner=__v108SceneryObject('tree',p.x,p.y,p.z,.58);const h=5+rng88()");
html=html.replace("tag:'withered88'};_q.push(c);}", "tag:'withered88'};_q.push(c);__v108Scenery.scopeOwner=null;}");
html=html.replace("for(const p of trees){const h=6+random()", "for(const p of trees){__v108Scenery.scopeOwner=__v108SceneryObject('tree',p.x,p.y,p.z,.6);const h=6+random()");
html=html.replace("tag:'withered91'});\n }", "tag:'withered91'});__v108Scenery.scopeOwner=null;\n }");
html=html.replace('batches.get(key).push({matrix:obj.matrix.clone()});', 'batches.get(key).push({matrix:obj.matrix.clone(),owner108:__v108Scenery.scopeOwner?.id});');
html=html.replaceAll('mesh.setMatrixAt(i,obj.matrix);}mesh.instanceMatrix', 'mesh.setMatrixAt(i,obj.matrix);if(p.owner108)__v108OwnInstance(__v108Scenery.objects.get(p.owner108),mesh,i);}mesh.instanceMatrix');
html=html.replace('mesh.setMatrixAt(i,p.matrix);continue;', 'mesh.setMatrixAt(i,p.matrix);if(p.owner108)__v108OwnInstance(__v108Scenery.objects.get(p.owner108),mesh,i);continue;');
html=html.replace(/root.name='Yermo del Eclipse · árboles, osamentas y ruinas';(?:root\.userData\.animated=true;)*/g, "root.name='Yermo del Eclipse · árboles, osamentas y ruinas';root.userData.animated=true;");
html=html.replace(/root.name='Ruinas detalladas y arboleda marchita del Eclipse';(?:root\.userData\.animated=true;)*/g, "root.name='Ruinas detalladas y arboleda marchita del Eclipse';root.userData.animated=true;");

// Windows on tapered windmill shells must sit outside the masonry at their actual height.
html=html.replace('__v91LWindow(g,dx+side*4.7,h,(j%2)*15,1.4,2,side*Math.PI/2,p)', '__v91LWindow(g,dx+side*(6-h*.125+.12),h,(j%2)*15,1.4,2,side*Math.PI/2,p)');
html=html.replace('const g=base.index?base.toNonIndexed():base.clone();g.applyMatrix4(r.matrix);', 'const g=base.index?base.toNonIndexed():base.clone();__v108LandApplyUV(g,r.geometry);g.applyMatrix4(r.matrix);');
// Audited charge distances apply outside as well as inside a fortress.
html=html.replace('__v85Indoor(c)?Math.max(0,a.art.range-(a.travelled85||0)):Infinity', '(a.art.technique109||__v85Indoor(c))?Math.max(0,a.art.range-(a.travelled85||0)):Infinity');
html=html.replace('if(__v85Indoor(c)&&a.travelled85>=a.art.range)', 'if((a.art.technique109||__v85Indoor(c))&&a.travelled85>=a.art.range)');
// Slow hostile locomotion only; leave NPCs, player, perception and decision clocks intact.
for(const native of ['sp=c.speed*.35*__v92Speed(c)','sp=c.speed*__v92Speed(c)','sp=c.speed*.9*__v92Speed(c)'])
 html=html.replace(native+'*__v109MoveRate(c)',native).replace(native,native+'*__v109MoveRate(c)');
html=html.replace('c.speed*dt*(hunting?1:.3)','c.speed*__v109MoveRate(c)*dt*(hunting?1:.3)');
html=html.replace('1.3*__v92Speed(c),','1.3*__v92Speed(c)*__v109MoveRate(c),');
html=html.replace('dt*(e.pending?10.5:8.7)*__v109MoveRate(c)','dt*(e.pending?10.5:8.7)').replace('dt*(e.pending?10.5:8.7)','dt*(e.pending?10.5:8.7)*__v109MoveRate(c)');
html=html.replace('Math.max(7.6,(c.spec.speed||4)*2),dt,crowd)','Math.max(7.6,(c.spec.speed||4)*2)*__v109MoveRate(c),dt,crowd)');
// Preserve catalogue identity, including items and spells with duplicate display names.
html=html.replaceAll('_7c(item.name,','__v110Card(item,item.name,');
html=html.replaceAll('_7c(sp.name,','__v110Card(sp,sp.name,');
html=html.replace(/(?:row\.__v110Item=s;)*__v75Text\(row,s\.name,'h3'\);/g,"row.__v110Item=s;__v75Text(row,s.name,'h3');");
// Recognition uses the same detection limit as the strategic AI, outside as well as indoors.
html=html.replace('d<40&&(inSight||c.__v54Aggro===true)','d<__v92Detect(c)&&(inSight||c.__v54Aggro===true)');
html=html.replace('hunting=_ea&&d<34&&','hunting=_ea&&d<__v92Detect(c)&&');
// Coordinate letters and edge numbers live in the mobile sidebar rather than over the map.
html=html.replace("if($('atlas').hidden||_eb)return r;const m=_aq(),c=$('world-canvas').getContext('2d'),cellX=", "if($('atlas').hidden||_eb||(__v60Mobile&&$('atlas').classList.contains('mobile-atlas112')))return r;const m=_aq(),c=$('world-canvas').getContext('2d'),cellX=");
// The vivid preset shares the native mobile 60 FPS budget and exact full-HD sizing.
html=html.replaceAll("['high','fullhd60']","['high','fullhd60','vivid60']");
html=html.replace("__v60Mobile&&$('quality')?.value==='fullhd60'", "__v60Mobile&&['fullhd60','vivid60'].includes($('quality')?.value)");
// Shared 30/70 turn policy also covers the emperor and the private town battle controller.
html=html.replace('telegraph=c;c.warning.position.set(c.g.position.x,c.g.position.y+.12,c.g.position.z);c.warning.visible=true;c.warning.material.opacity=.35+Math.sin(_10*12)*.2;', 'telegraph=c;__v113Telegraph(c,.35+Math.sin(_10*12)*.2);');
html=html.replace("Math.random()<.3?(['darkness','energy','pulse'][e.specialCursor++%3]):'physical'", "__v113Turn(c)==='special'?(['darkness','energy','pulse'][e.specialCursor++%3]):'physical'");
html=html.replace("range=r.fire?10:3", "range=__v113RaidChoice(r)==='normal'?3:(r.fire?10:3)");
html=html.replace("offset=r.fire?7:2.6", "offset=range>3?7:2.6");
html=html.replace("type:['claw','fire','pulse'][(r.__v107Turns=(r.__v107Turns||0)+1)%3]", "type:__v113RaidAttack(r)");
html=html.replace('_dy(28+c.level*16);', '__v113EliteXP(c,28+c.level*16);');
// Regional additions have their own fixed tiers; exclude them from the legacy redistribution pool.
html=html.replace("const pool=_5l.filter(i=>(i.slot!=='weapon')===armor&&!i.id.startsWith('candy-')&&i.tier<8)", "const pool=_5l.filter(i=>i.__v114Site===undefined&&(i.slot!=='weapon')===armor&&!i.id.startsWith('candy-')&&i.tier<8)");
// Avoid rewriting unchanged mobile HUD text.
html=html.replaceAll("$('hp-item').textContent='Poción HP '+_9e.hp+wait;", "__v114Text($('hp-item'),'Poción HP '+_9e.hp+wait);");
html=html.replaceAll("$('mp-item').textContent='Poción MP '+_9e.mp+wait;", "__v114Text($('mp-item'),'Poción MP '+_9e.mp+wait);");
html=html.replaceAll("if(_5p===0)$('damage-text').textContent='';", "if(_5p===0)__v114Text($('damage-text'),'');");
html=html.replaceAll('function __v76NearestEnemy(){let out=null,d=24;for(const c of _m)', 'function __v76NearestEnemy(){let out=null,d=24;for(const c of __v114LocalEnemies())');
html=html.replaceAll("$('talk').textContent=label||'Hablar / interactuar';", "__v114Text($('talk'),label||'Hablar / interactuar');");
html=html.replaceAll("$('enemy-name').textContent=(target.name||target.spec.name)+' · Niv. '+target.level;", "__v114Text($('enemy-name'),(target.name||target.spec.name)+' · Niv. '+target.level);");
html=html.replaceAll("$('enemy-hp').textContent=target.hp+' / '+target.maxHp+' HP · DEF '+target.def;", "__v114Text($('enemy-hp'),target.hp+' / '+target.maxHp+' HP · DEF '+target.def);");
html=html.replaceAll("$('danger').textContent=_2n>.7?'Enemigo cerca · ataca o esquiva':_2n>0?'Criaturas hostiles en los alrededores':'';", "__v114Text($('danger'),_2n>.7?'Enemigo cerca · ataca o esquiva':_2n>0?'Criaturas hostiles en los alrededores':'');");
// Quarter-MP display retains the usable fractions introduced by the discount.
html=html.replaceAll('Math.floor(rpg.mp)', '__v114MPDisplay()');
// Teleportation's original controller used literal MP costs; use the shared spell value.
html=html.replaceAll('rpg.mp<24','rpg.mp<__v114TeleportCost()').replaceAll('rpg.mp-=24','rpg.mp-=__v114TeleportCost()');
html=html.replace("textContent='24 MP · 2 segundos", "textContent=__v114TeleportCost()+' MP · 2 segundos").replace("'Viajar · 24 MP'", "'Viajar · '+__v114TeleportCost()+' MP'");
html=html.replace("'Necesitas 12 MP para lanzar Meteoro.'", "'Necesitas '+spell.cost+' MP para lanzar Meteoro.'").replace("'Necesitas 6 MP para Pasos guía.'", "'Necesitas '+s.cost+' MP para Pasos guía.'");
html=html.replace("'Necesitas 45 MP.'", "'Necesitas '+s.cost+' MP.'").replace("'Necesitas 65 MP.'", "'Necesitas '+s.cost+' MP.'");
html=html.replaceAll('Coste: 45 MP.', "Coste: '+s.cost+' MP.").replaceAll('Coste: 65 MP.', "Coste: '+s.cost+' MP.");
html=html.replaceAll('Cuesta 6 MP.', "Cuesta '+s.cost+' MP.").replaceAll('Nivel 15 · 28 MP.', "Nivel 15 · '+s.cost+' MP.").replaceAll('Nivel 20 · 45 MP.', "Nivel 20 · '+s.cost+' MP.");
html=html.replaceAll('Nivel 40 · 65 MP.', "Nivel 40 · '+s.cost+' MP.").replaceAll('Nivel 10 · 15 MP ·', "Nivel 10 · '+s.cost+' MP ·").replaceAll('Nivel 20 · 25 MP ·', "Nivel 20 · '+s.cost+' MP ·");
html=html.replace('_m.find(c=>c.dialogue&&!c.dead&&Math.hypot', '__v114SpeechCandidates().find(c=>c.dialogue&&!c.dead&&Math.hypot');
// A fresh game has no save to apply; the old null restore repeated costly world preparation.
html=html.replace('_bj(_f);_dn(_ix);', '_bj(_f);if(_ix)_dn(_ix);');
// Keep exact floor/stair math but consider only spatially relevant records on mobile.
html=html.replace('for(const f of __v20Floors)if(Math.abs(x-f.x)', 'for(const f of __v114FloorItems(__v20Floors,x,z))if(Math.abs(x-f.x)');
html=html.replace('for(const f of __v24Floors){const dx=x-f.x', 'for(const f of __v114FloorItems(__v24Floors,x,z)){const dx=x-f.x');
html=html.replace('for(const st of __v24Stairs){const vx=st.x1', 'for(const st of __v114FloorItems(__v24Stairs,x,z)){const vx=st.x1');
// Mobile streaming reads spatial candidates, while all desktop passes retain their original arrays.
html=html.replace('for(const a of _b0){const o=a.owner,alive', 'for(const a of __v114StreamActors(force)){const o=a.owner,alive');
html=html.replace('for(const a of _b0){\n    const o=a.owner;', 'for(const a of __v114StreamActors(force)){\n    const o=a.owner;');
html=html.replace('for(const a of _b0){\n    const o=a.owner; if(!a?.g||!o)', 'for(const a of __v114StreamActors(force)){\n    const o=a.owner; if(!a?.g||!o)');
html=html.replace('for(const a of _b0){\n      if(!a?.g||!a.owner)continue;', 'for(const a of __v114StreamActors(force)){\n      if(!a?.g||!a.owner)continue;');
html=html.replace('for(const n of _2h){ if(!n?.g) continue; n.g.visible=Math.hypot', 'for(const n of __v114StreamNPCs()){ if(!n?.g) continue; n.g.visible=Math.hypot');
html=html.replace('for(const c of _m){ if(!c?.g||c.dead) continue; if(Math.hypot', 'for(const c of __v114StreamCreatures()){ if(!c?.g||c.dead) continue; if(Math.hypot');
// The previous loader retained all full-size decoded atlas images through synchronous world construction.
html=html.replace(/const __v72Ready=Promise\.all\(Object\.entries\(__v72AtlasData\)[^\n]*\n/, 'const __v72Ready=__v115LoadArtwork();\n');
html=html.replace('(_v?55:_w||_15.ShiftLeft?18:9)', '(_v?55:_w||_15.ShiftLeft?(_9d?18:23.4):9)');
// Dedicated controllers must approach the same contact reach as ordinary enemies.
html=html.replace("e.pending!=='physical'||distance<8", "e.pending!=='physical'||distance<__v117MeleeReach(c)*.95");
html=html.replace("if(Math.hypot(_14.x-p.x,_14.z-p.z)<8.4){_d0(c,1);", "if(Math.hypot(_14.x-p.x,_14.z-p.z)<__v117MeleeReach(c)){_d0(c,1);");
html=html.replace("range=__v113RaidChoice(r)==='normal'?3:(r.fire?10:3)", "range=__v113RaidChoice(r)==='normal'?(d.__v113Hero?__v117MeleeReach(c):3):(r.fire?10:3)");
html=html.replace('offset=range>3?7:d.__v113Hero?__v117MeleeReach(c)*.72:2.6', 'offset=range>3?7:2.6');
html=html.replace('offset=range>3?7:2.6', "offset=d.__v113Hero&&__v113RaidChoice(r)==='normal'?__v117MeleeReach(c)*.72:range>3?7:2.6");
const begin = '/* AURELIA_UPDATE97_BEGIN */';
const end = '/* AURELIA_UPDATE97_END */';
// Service anchors still initialize their NPC, but must not reset a living NPC each frame.
html=html.replace('const {n,p}=__v76Merchant;n.x=p.x;', 'const {n,p}=__v76Merchant;if(n.__v99Area)return;n.x=p.x;');
html=html.replace('for(const {n,p}of __v78NightVendors){n.x=p.x;', 'for(const {n,p}of __v78NightVendors){if(n.__v99Area)continue;n.x=p.x;');
html=html.replace('for(const n of __v92Maya.npcs){const p=n.__v92Home;', 'for(const n of __v92Maya.npcs){if(n.__v99Area)continue;const p=n.__v92Home;');
html=html.replace('p=n?.__v94FaroHome;if(n&&p){', 'p=n?.__v94FaroHome;if(n&&p&&!n.__v99Area){');
html=html.replace('const p=__v54SafeServicePoint(n,svc);if(p&&Number.isFinite(p.x)', 'const p=__v54SafeServicePoint(n,svc);if(!n.__v99Area&&p&&Number.isFinite(p.x)');
html=html.replace('if(__v75.sage){const {npc:n,obj:o}=__v75.sage;', 'if(__v75.sage&&!__v75.sage.npc.__v99Area){const {npc:n,obj:o}=__v75.sage;');
html=html.replace("const visible=_2h.filter(n=>n.g.visible&&n.rank!=='king'&&n.activity!=='Dormiendo');", "const visible=_2h.filter(n=>!n.__v98Active&&n.g.visible&&n.rank!=='king'&&n.activity!=='Dormiendo');");
// The old central dormitory and primitive armory/library props overlap the furnished rooms.
const oldDorm='  const dormG=__v53Group(root,0,20),dormP=';
if(html.includes(oldDorm)){const start=html.indexOf(oldDorm),end=html.indexOf('\n',start);html=html.slice(0,start)+'  // Bedrooms are built in the west wing by __v101CastleWing.\n'+html.slice(end+1);}
const oldArmory='for(let i=0;i<6;i++){_1x(2.5,1.7,1.5,wood,x-66+i*7';
if(html.includes(oldArmory)){const start=html.indexOf(oldArmory),end=html.indexOf('\n',start);html=html.slice(0,start)+'// Furnished service rooms replace the original overlapping primitive tables and racks.\n'+html.slice(end+1);}
// Replace the obsolete open castle cots with fixed divided bedrooms opposite the library.
const oldCotsStart='  // Compact beds against the outer wall of the new inn.';
if(html.includes(oldCotsStart)){
 const start=html.indexOf(oldCotsStart),end=html.indexOf('  // Exterior banners',start);
 html=html.slice(0,start)+'  __v101CastleWing(s,index,g);\n'+html.slice(end);
}
html=html.replace('__v93Batch(g);g.userData.cull93=', '__v93Batch(g,new Set(__v29Doors.map(d=>d.pivot)));g.userData.cull93=');
// Nearby NPCs must open public doors even while the observer is in another room.
html=html.replace('if(dist>35&&Math.abs(d.angle)<.0001)continue;', 'if(dist>180&&Math.abs(d.angle)<.0001)continue;');
html=html.replace('if(!near&&dist<100)for(const n of _2h)', 'if(!near&&dist<180)for(const n of __v102DoorActors(d.p.x,d.p.z))');
html=html.replace('if(!near&&dist<180)for(const n of __v88Life.active)', 'if(!near&&dist<180)for(const n of __v102DoorActors(d.p.x,d.p.z))');
html=html.replace('for(const d of __v29Doors){const dist=', 'for(const d of __v29Doors){if(d.__v101Slide)continue;const dist=');
html=html.replace('for(const n of __v101DoorActors())', 'for(const n of __v102DoorActors(d.p.x,d.p.z))');
html=html.replaceAll('__v102DoorActors(d.p.x,d.p.z))','__v102DoorActors(d.p.x,d.p.z,Math.max(4,d.w*d.scale*.6+2)))');
html=html.replace('Math.hypot((n.x??0)-d.p.x,(n.z??0)-d.p.z)<3)', 'Math.hypot((n.x??0)-d.p.x,(n.z??0)-d.p.z)<Math.max(3,d.w*d.scale*.6+2))');
const sources = ['settlement102.js', 'corsair-plan102.js', 'quality98.js', 'world97.js', 'ai98.js', 'ai99.js', 'day100.js', 'life101.js', 'mobile97.js', 'mobile101.js', 'combat102.js', 'performance102.js', 'king102.js', 'mountain102.js', 'corsair102.js', 'castle102.js', 'solar102.js', 'riddles102.js', 'fortress102.js', 'volcano-plan103.js', 'volcano103.js', 'volcano104.js', 'airship104.js', 'balance-plan105.js', 'balance105.js', 'lighting106.js', 'world107.js', 'castle107.js', 'enemy-collision107.js', 'destruction108.js', 'hazards108.js', 'riddle-arrows108.js', 'landmarks108.js', 'frontier108.js', 'technique-plan109.js', 'techniques109.js', 'player110.js', 'catalog110.js', 'enemy-balance111.js', 'combat112.js', 'graphics112.js', 'mobile-map112.js', 'experience112.js', 'interaction113.js', 'combat113.js', 'experience113.js', 'performance114.js', 'crowd114.js', 'services114.js', 'commerce114.js', 'graphics114.js', 'town-map114.js', 'selling114.js', 'mana114.js', 'startup115.js', 'schedules115.js', 'progression117.js', 'combat117.js', 'enemy-combat117.js'].map(name => fs.readFileSync(path.join(root, 'src', name), 'utf8'));
sources.push('const __v103Blueprints='+JSON.stringify([1,2,3,4,5].map(i=>'data:image/png;base64,'+fs.readFileSync(path.join(root,'docs/volcano103/planta-'+i+'.png')).toString('base64')))+';');
const block = `${begin}\n${sources.join('\n')}\n${end}\n`;
if (html.includes(begin)) html = html.slice(0, html.indexOf(begin)) + block + html.slice(html.indexOf(end) + end.length).replace(/^\n/, '');
else {
  const marker = 'const _ix=_7q();';
  if (!html.includes(marker)) throw new Error('Missing game initialization marker');
  html = html.replace(marker, block + marker);
}
html=html.replace(/<title>[^<]*<\/title>/, '<title>Aurelia RPG · v117 Progresión y combate preciso</title>');
html=html.replace(/<meta name="aurelia-build" content="[^"]*">/, '<meta name="aurelia-build" content="v117-progresion-espada-magia">');
fs.writeFileSync(file, html);
console.log('Embedded Aurelia update 117');
require('./package-standalone116.cjs')(root);
