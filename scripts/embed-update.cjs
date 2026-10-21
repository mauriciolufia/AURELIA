const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'index.html');
let html = fs.readFileSync(file, 'utf8');
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
html=html.replace('if(!near&&dist<100)for(const n of _2h)', 'if(!near&&dist<180)for(const n of __v101DoorActors())');
html=html.replace('if(!near&&dist<180)for(const n of __v88Life.active)', 'if(!near&&dist<180)for(const n of __v101DoorActors())');
html=html.replace('for(const d of __v29Doors){const dist=', 'for(const d of __v29Doors){if(d.__v101Slide)continue;const dist=');
const sources = ['quality98.js', 'world97.js', 'ai98.js', 'ai99.js', 'day100.js', 'life101.js', 'mobile97.js', 'mobile101.js'].map(name => fs.readFileSync(path.join(root, 'src', name), 'utf8'));
const block = `${begin}\n${sources.join('\n')}\n${end}\n`;
if (html.includes(begin)) html = html.slice(0, html.indexOf(begin)) + block + html.slice(html.indexOf(end) + end.length).replace(/^\n/, '');
else {
  const marker = 'const _ix=_7q();';
  if (!html.includes(marker)) throw new Error('Missing game initialization marker');
  html = html.replace(marker, block + marker);
}
html=html.replace(/<title>[^<]*<\/title>/, '<title>Aurelia RPG · v101 Rutinas y HUD móvil</title>');
html=html.replace(/<meta name="aurelia-build" content="[^"]*">/, '<meta name="aurelia-build" content="v101-vida-diaria-hud-movil">');
fs.writeFileSync(file, html);
console.log('Embedded Aurelia update 101');
