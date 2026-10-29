module.exports=[
['ten floors, published room counts and exactly four unique guards per ordinary floor',`(()=>{
 const a=__AURELIA_TOWER139__.audit();if(a.floors.length!==10||a.stairs!==9||a.species.length!==4)throw Error('Incomplete tower');
 for(const f of a.floors)if(f.rooms!==(f.key==='aurora139-9'?1:4)||f.guards!==(f.key==='aurora139-9'?0:4)||f.balconies!==(f.key==='aurora139-0'?0:4))throw Error('Wrong roster '+JSON.stringify(f));
 if(a.floors[9].height!==14||a.floors[0].height!==10||a.levels.some(n=>n<35||n>45))throw Error('Wrong height or level');
 for(const f of __v139.areas.slice(0,9)){const groups=f.members.reduce((o,c)=>(o[c.__v75Room]=(o[c.__v75Room]||0)+1,o),{});if(groups[1]!==2||groups[2]!==2||Object.keys(groups).length!==2||new Set(f.members.map(c=>c.spec.id)).size!==4)throw Error('Wrong occupied rooms');}
 return a;
})()`],
['actual walls force room 1 to 2 to 3 to 4 on all nine floors; balconies cannot bypass a room',`(()=>{
 const old=_14.clone(),reports=[];
 try{for(const a of __v139.areas.slice(0,9)){
  _14.y=a.y+1.85;const order=a.design.main,start=__v139.centers[order[0]],end=__v139.centers[order[3]],mask=new Map();
  for(let x=-40;x<=40;x++)for(let z=-32;z<=32;z++){const p=__v83Point(a,[x,z]);if(__v139Contains(a,p.x,p.z)&&!_i7(p.x,p.z,a.y+1.85))mask.set(x+','+z,true);}
  const reach=omit=>{const q=[start],seen=new Set([start.join(',')]);for(let i=0;i<q.length;i++){const[x,z]=q[i];if(x===end[0]&&z===end[1])return true;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,zz=z+dz,key=xx+','+zz,r=a.design.rects[omit];if(!mask.has(key)||seen.has(key)||r&&xx>r[0]&&xx<r[2]&&zz>r[1]&&zz<r[3])continue;seen.add(key);q.push([xx,zz]);}}return false;};
  if(!reach(-1)||reach(order[1])||reach(order[2]))throw Error('Broken mandatory chain '+a.key);
  for(const r of a.balconies139){const p=__v83Point(a,[(r[0]+r[2])/2,(r[1]+r[3])/2]);if(Math.abs(_ei(p.x,p.z)-a.y)>.15)throw Error('Balcony has no floor');}
  reports.push({floor:a.floor139+1,order});
 }return reports;}finally{_14.copy(old);}
})()`],
['all nine stairs have ground and free headroom at every sampled step',`(()=>{
 const old=_14.clone();let samples=0;
 try{for(const s of __v139.stairs)for(let i=0;i<=60;i++){const t=i/60,p=__v83Point(s.lower,[s.x,s.z0+(s.z1-s.z0)*t]),y=s.lower.y+10*t;_14.set(p.x,y+1.85,p.z);if(Math.abs(_ei(p.x,p.z)-y)>.2||_i7(p.x,p.z,y+1.85))throw Error('Blocked step '+s.lower.key+'/'+i+' '+JSON.stringify({ground:_ei(p.x,p.z),y}));samples++;}return{samples};}finally{_14.copy(old);}
})()`],
['real controls climb and descend every tower staircase',`(()=>{
 const old={pos:_14.clone(),yaw,cameraYaw:__v95Camera.yaw,joy:{..._16},keys:{..._15},flight:_v,ride:_9d,sprint:_w};let steps=0;
 try{for(const k of Object.keys(_15))_15[k]=false;_v=false;_9d=null;_w=true;_16.x=0;_16.y=1;
 for(const st of __v139.stairs)for(const down of [false,true]){const dir=Math.sign(st.z1-st.z0),a=down?st.upper:st.lower,from=__v83Point(a,[st.x,down?st.z1+dir*.9:st.z0]),to=__v83Point(a,[st.x,down?st.z0:st.z1+dir*.9]),expected=(down?st.lower.y:st.upper.y)+1.85;_14.set(from.x,a.y+1.85,from.z);_12=0;_13=true;let n=0;
 while(Math.hypot(_14.x-to.x,_14.z-to.z)>.15&&n++<2000){yaw=Math.atan2(-(to.x-_14.x),-(to.z-_14.z));__v95Camera.yaw=yaw;_3m(.008);steps++;}
 _16.y=0;for(let settle=0;settle<150&&Math.abs(_14.y-expected)>.1;settle++)_3m(.008);_16.y=1;
 if(n>=2000||Math.abs(_14.y-expected)>.3)throw Error('Stuck '+st.lower.key+' '+down+' '+JSON.stringify({position:_14.toArray(),expected}));
 }return{stairs:9,directions:2,steps};
 }finally{_14.copy(old.pos);yaw=old.yaw;__v95Camera.yaw=old.cameraYaw;_16.x=old.joy.x;_16.y=old.joy.y;Object.assign(_15,old.keys);_v=old.flight;_9d=old.ride;_w=old.sprint;}
})()`],
['real controls access every balcony, return inside, and stop at the outer rail',`(()=>{
 const old={pos:_14.clone(),yaw,cameraYaw:__v95Camera.yaw,joy:{..._16},keys:{..._15},flight:_v,ride:_9d,sprint:_w};let balconies=0;
 try{for(const k of Object.keys(_15))_15[k]=false;_v=false;_9d=null;_w=true;_16.x=0;
 const walk=(a,from,to,limit=200)=>{_14.set(from.x,a.y+1.85,from.z);_12=0;_13=true;_16.y=1;let n=0;while(Math.hypot(_14.x-to.x,_14.z-to.z)>.15&&n++<limit){yaw=Math.atan2(-(to.x-_14.x),-(to.z-_14.z));__v95Camera.yaw=yaw;_3m(.008);}return n;};
 for(const a of __v139.areas)for(const r of a.balconies139){const side=Math.sign(r[0]+r[2]),z=(r[1]+r[3])/2,inside=__v83Point(a,[side*26,z]),balcony=__v83Point(a,[side*36,z]);
  if(walk(a,inside,balcony)>=200||Math.abs(_14.y-a.y-1.85)>.3||__v75At()!==a||!__v139Balcony(a)||__v126Interior(a))throw Error('Cannot access balcony '+a.key+'/'+side+'/'+z);
  __v123Refresh(true);_bg(true);__v93Visibility();if(!__v139.roof.visible||!a.root.visible)throw Error('Exterior facade missing');
  walk(a,balcony,__v83Point(a,[side*44,z]),100);if(Math.abs(__v83Local(a,_14.x,_14.z)[0])>40||Math.abs(_14.y-a.y-1.85)>.3)throw Error('Rail does not stop player');
  if(walk(a,balcony,inside)>=200||__v139Balcony(a))throw Error('Cannot return inside');balconies++;
 }return{balconies,returnPaths:balconies,rails:balconies};
 }finally{_14.copy(old.pos);yaw=old.yaw;__v95Camera.yaw=old.cameraYaw;_16.x=old.joy.x;_16.y=old.joy.y;Object.assign(_15,old.keys);_v=old.flight;_9d=old.ride;_w=old.sprint;}
})()`],
['embedded floor image and animated wall torches, darker night and brighter day',`(async()=>{
 const old=_14.clone(),hour=_x,a=__v139.areas[0],texture=__v139Material('floor').map;
 if(!texture.image?.complete)await new Promise((resolve,reject)=>{texture.image.addEventListener('load',resolve,{once:true});texture.image.addEventListener('error',reject,{once:true});});
 if(!texture.image.src.startsWith('data:image/webp;base64,')||texture.image.width<1000)throw Error('Floor image missing or degraded');
 for(const f of __v139.areas)if(f.torches.fixtures.length!==8||!f.torches.flames.isInstancedMesh)throw Error('Missing wall torches '+f.key);
 try{const p=__v83Point(a,[-8,-8]);_14.set(p.x,a.y+1.85,p.z);const samples=[];
 for(const h of[0,12]){_x=h;for(let i=0;i<50;i++){_10+=.04;_fk();__v106TorchLight(.04,true);}samples.push({hour:h,fill:_9.intensity,exposure:_5.toneMappingExposure,torch:Math.max(...__v85.lights.map(l=>l.intensity))});}
 if(samples[0].fill>=samples[1].fill||samples[0].fill>.7||samples[1].fill>1.3||samples.some(s=>s.torch<=10||s.torch>48))throw Error('Wrong interior light '+JSON.stringify(samples));
 const p2=__v83Point(a,[-36,-16]);_14.set(p2.x,a.y+1.85,p2.z);for(let i=0;i<50;i++){_10+=.04;_fk();__v106TorchLight(.04,true);}
 if(_9.intensity<1||__v85.lights.some(l=>l.intensity>.01))throw Error('Balcony did not restore exterior light');return{texture:[texture.image.width,texture.image.height],torches:80,samples,balconyFill:_9.intensity};
 }finally{_14.copy(old);_x=hour;}
})()`],
['dragon and original legendary chest are upstairs; dragon uses tower movement and original reward lock',`(()=>{
 const top=__v139.areas[9],c=__v88Island.dragon,chest=__v88Island.chest,old=_14.clone();
 if(c.__v83Area!==top.key||c.homeY!==top.y||chest.y!==top.y||Math.abs(c.g.position.y-top.y)>.1||chest.id!==880050)throw Error('Dragon/chest not relocated');
 try{_14.set(c.x+5,top.y+1.85,c.z+5);__v123Refresh(true);_bg(true);if(_9b(c,c.x+.1,c.z)===false)throw Error('Dragon cannot move upstairs');
 const before=rpg.opened.has(chest.id);if(_fe(chest)!==false||rpg.opened.has(chest.id)!==before)throw Error('Treasure unlocked before battle');return{dragonY:c.homeY,chestY:chest.y};}finally{_14.copy(old);}
})()`],
['all four guard roles have real species techniques and legal attack attributes',`(()=>{
 const roles=new Set();for(const c of __v139.guards){__v109Ensure(c);roles.add(__v137Role(c));const def=__v139Species.find(s=>s.id===c.spec.id);if(c.__v109Family!==def.family||def.family==='ashMage'&&!c.__v68Skills.some(s=>s.element==='fire'))throw Error('Wrong species kit '+c.spec.id);if(!c.__v68Skills?.length||!(c.hp>0&&c.def>0&&c.damage>0)||c.__v68Skills.some(s=>s.level137>c.level)||__v87CanRespawn(c))throw Error('Invalid guard');}
 if(!['tank','assault','ranged','mage'].every(r=>roles.has(r)))throw Error('Missing roles '+[...roles]);return{roles:[...roles]};
})()`],
['floor visibility, demo travel and saved kills work on every tower floor',`(()=>{
 const old=_14.clone(),demo=__v85Demo.active,c=__v139.guards[0],snapshot={dead:c.dead,hp:c.hp};
 try{__v85Demo.active=true;if(__v129Groups().find(g=>g.id==='aurora139')?.floors.length!==10)throw Error('Missing floor menu');
 for(const a of __v139.areas){const p=__v83Point(a,a.floor139===9?[-8,8]:__v139.centers[a.design.main[0]]);_14.set(p.x,a.y+1.85,p.z);__v123Refresh(true);_bg(true);__v93Visibility();if(__v75At()!==a||!a.root.visible||__v139.areas.filter(f=>f.root.visible).length>2)throw Error('Floor visibility '+a.key);}
 c.dead=true;c.hp=0;_iv();const saved=JSON.parse(__v96ReadSave());if(!saved.tower139?.dead.includes(c.spawnId))throw Error('Kill omitted');c.dead=false;c.hp=c.maxHp;_dn(saved);
 if(!c.dead||c.hp!==0||__v139.areas.length!==10||__v139.guards.length!==36||__v88Island.dragon.__v83Area!=='aurora139-9')throw Error('Save lost tower state');return{floors:10,guards:36,savedKill:true};
 }finally{Object.assign(c,snapshot);_14.copy(old);__v85Demo.active=demo;}
})()`]
];
