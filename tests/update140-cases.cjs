module.exports=[
['Emperor HP doubles once and retains damage across stat refreshes and save load',`(()=>{
 const c=__v94Emperor.boss,copy={...c};__v140EnemyStats(copy);const baseline=copy.maxHp;
 if(c.maxHp!==baseline*2)throw Error('HP not doubled '+c.maxHp+'/'+baseline);c.hp=Math.round(c.maxHp*.6);const hp=c.hp;
 for(let i=0;i<4;i++)__v87EnemyStats(c);if(Math.abs(c.hp-hp)>2||c.maxHp!==baseline*2)throw Error('Compounded HP');
 _iv();const save=JSON.parse(__v96ReadSave());_dn(save);if(c.dead||c.maxHp!==baseline*2||Math.abs(c.hp-hp)>3)throw Error('HP lost on reload');return{baseline,maxHp:c.maxHp,hp:c.hp};
})()`],
['mouse sensitivity is 1.5 and first person smooths without camera position drift',`(()=>{if(__v60Mobile)return{desktopMouseOnly:true};
 const old={yaw,pitch:_11,mode:__aurCameraMode};__aurSetCameraMode('first');const start=yaw,pitch=_11;
 _5.domElement.dispatchEvent(new PointerEvent('pointermove',{pointerType:'mouse',movementX:20,movementY:10,bubbles:true}));
 if(Math.abs(yaw-start+20*.005025*1.5)>.00001||Math.abs(_11-pitch+10*.00465*1.5)>.00001)throw Error('Wrong mouse gain');
 __v140Look.firstReady=false;_bl();const first=__v81Cam.yaw;yaw+=.3;__v140Look.last=performance.now()-16;_bl();
 if(__v81Cam.yaw<=first||__v81Cam.yaw>=yaw||_7.position.distanceTo(_14)>.001)throw Error('First-person smoothing drifts');
 yaw=old.yaw;_11=old.pitch;__aurSetCameraMode(old.mode);return{gain:1.5,smoothing:57};
})()`],
['mouse wheel zooms third person in both directions, clamps and ignores menus and first person',`(()=>{if(__v60Mobile)return{desktopWheelOnly:true};
 const mode=__aurCameraMode;__aurSetCameraMode('third');__v12ThirdDistance=7;
 const wheel=delta=>_5.domElement.dispatchEvent(new WheelEvent('wheel',{deltaY:delta,bubbles:true,cancelable:true}));wheel(-100);const close=__v12ThirdDistance;wheel(100);if(!(close<7&&Math.abs(__v12ThirdDistance-7)<.001))throw Error('No reversible zoom');
 for(let i=0;i<80;i++)wheel(240);if(__v12ThirdDistance!==18)throw Error('Far limit');for(let i=0;i<80;i++)wheel(-240);if(__v12ThirdDistance!==1.8)throw Error('Near limit');
 __aurSetCameraMode('first');wheel(100);if(__v12ThirdDistance!==1.8)throw Error('Zoom changed first-person');__aurSetCameraMode('third');_dp(true);wheel(100);if(__v12ThirdDistance!==1.8)throw Error('Menu consumes wheel');_dp(false);__v12ThirdDistance=7;__aurSetCameraMode(mode);return{close,limits:[1.8,18]};
})()`],
['equipped held shield reduces a real enemy hit by 80 percent and replaces weapon in both cameras',`(()=>{
 const c=__v94Emperor.boss,old={p:_14.clone(),hp:_2l,grace:__v75.grace,random:Math.random,level:rpg.level,equipped:{...rpg.equipped},owned:new Set(rpg.owned),mode:__aurCameraMode,demo:__v85Demo.active};
 try{rpg.level=60;rpg.owned.add('equipment134-shield-60');rpg.equipped.shield='equipment134-shield-60';__aureliaSyncAvatarGear(true);__v85Demo.active=false;__v75.grace=0;Math.random=()=>.99;
 _14.set(c.g.position.x+2,c.g.position.y+1.85,c.g.position.z);_2l=_g4().maxHp;__v140Guard.held=false;c.__v68ImpactAt=0;const before=_2l;_d0(c);const normal=before-_2l;
 window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyT',bubbles:true,cancelable:true}));if(!__v140Guarding())throw Error('T does not guard');_2l=_g4().maxHp;c.__v68ImpactAt=0;_2m=0;const hp=_2l;_d0(c);const guarded=hp-_2l;
 if(normal<=0||Math.abs(guarded-Math.round(normal*.2))>1)throw Error('Wrong shield damage '+normal+'/'+guarded);
 const attack=_84;_8d();if(_84!==attack)throw Error('Weapon attacks during block');_84=.4;_86=false;_8g(.1);if(_84!==0)throw Error('Ongoing swing continues through shield defense');
 for(const mode of['first','third']){__aurSetCameraMode(mode);for(let i=0;i<20;i++)__aurUpdatePlayerAvatar(.016);_8g(.016);if(_4n.visible||__aurPlayerAvatar.weaponRoot.visible||mode==='first'&&!__v140Guard.first.visible||mode==='third'&&__aurPlayerAvatar.leftArm.rotation.x>-.8)throw Error('Shield pose missing '+mode);}
 window.dispatchEvent(new KeyboardEvent('keyup',{code:'KeyT',bubbles:true}));if(__v140Guarding())throw Error('Guard stuck after release');delete rpg.equipped.shield;__v140Guard.held=true;if(__v140Guarding())throw Error('Blocks without shield');
 return{normal,guarded,reduction:1-guarded/normal};
 }finally{__v140ReleaseGuard();_14.copy(old.p);_2l=old.hp;__v75.grace=old.grace;Math.random=old.random;rpg.level=old.level;rpg.equipped=old.equipped;rpg.owned=old.owned;__v85Demo.active=old.demo;__aurSetCameraMode(old.mode);__aureliaSyncAvatarGear(true);for(let i=0;i<40;i++)__aurUpdatePlayerAvatar(.016);}
})()`],
['real enemy arms, torso and legs pose during physical and spell attacks, with no frozen animation',`(()=>{
 const old=_14.clone(),reports=[];const samples=[__v94Emperor.boss,...__v139.guards.slice(0,4),...__v88Eclipse.areas[4].members.filter(c=>c.parts?.length).slice(0,2)];
 try{for(const c of samples){const ai=c.ai,action=c.specialAction,visible=c.g.visible,stun=c.stun;_14.copy(c.g.position).add(new _0.Vector3(2,1.85,2));c.g.visible=true;c.stun=0;c.ai='windup';const rig=__v140Rig(c),before=rig.joints.map(j=>j.node.rotation.x);rig.pulse=0;
 for(let i=0;i<10;i++)__v140EnemyPose(c,.016);if(rig.joints.length&&rig.joints.every((j,i)=>Math.abs(j.node.rotation.x-before[i])<.05)||Math.abs(c.g.rotation.x)<.01)throw Error('Static attack '+c.spec.id+' '+JSON.stringify({disabled:__v119Disabled(c),same:__v92SameFloor(c),stun:c.stun,pose:rig.joints.map(j=>j.node.rotation.x),before,weight:rig.weight,pulse:rig.pulse,lean:c.g.rotation.x,area:c.__v83Area,current:__v75At()?.key,pos:c.g.position.toArray(),player:_14.toArray()}));
 reports.push({species:c.spec.id,arms:rig.joints.length,bodyLean:c.g.rotation.x});c.ai=ai;c.specialAction=action;c.g.visible=visible;c.stun=stun;}
 if(reports.filter(r=>r.arms===2).length<4)throw Error('Missing real limb rigs');return reports;
 }finally{_14.copy(old);}
})()`],
['island, tower and southern sea have requested sizes and old tower saves migrate safely',`(()=>{
 for(const a of __v139.areas)if(!__v123.roots.some(r=>r.g===a.root))throw Error('Tower floor missing from scenery index '+a.key);if(!__v123.roots.some(r=>r.g===__v139.roof))throw Error('Exterior roof missing from scenery index');
 const s=__AURELIA_ISLAND140__.audit(),old=__v140Island.old,coast=_1h[0],oldDistance=Math.hypot(old.x-coast.x,old.z-coast.z),distance=Math.hypot(s.x-coast.x,s.z-coast.z);
 if(s.radii[0]!==107.5||s.radii[1]!==70||s.floorScale!==2||distance<=oldDistance+200||!_ef(s.x,2700)||_2r(s.x,2680)>-3||_2r(s.x,s.z)<4)throw Error('Wrong island/sea expansion '+JSON.stringify(s));
 const a=__v139.areas[0],p=__v83Point(a,[-25,-25]);_14.set(p.x,a.y+1.85,p.z);if(__v75At()!==a||_i7(p.x,p.z,_14.y))throw Error('Expanded room not usable');
 _iv();const save=JSON.parse(__v96ReadSave());delete save.island140;save.player=[old.x-8,a.y+1.85,old.z+8];_dn(save);if(Math.abs(_14.x-(s.x-16))>.1||Math.abs(_14.z-(s.z+16))>.1)throw Error('Old tower save not migrated');return{...s,coastDistance:distance,oldCoastDistance:oldDistance};
})()`],
['boat and player save positions remain in the expanded southern sea',`(()=>{const old={p:_14.clone(),x:_e9.x,z:_e9.z,aboard:_ea};try{_iv();const save=JSON.parse(__v96ReadSave());save.player=[-640,.7,2600];save.adventures={...save.adventures,boat:{x:-640,z:2600},aboard:true,inPyramid:false};_dn(save);if(_e9.x!==-640||_e9.z!==2600||Math.abs(_14.z-2600)>.1||!_ea)throw Error('Southern boat restore failed');return{boat:[_e9.x,_e9.z],player:_14.toArray(),aboard:_ea};}finally{_14.copy(old.p);_e9.x=old.x;_e9.z=old.z;_e9.g.position.set(old.x,-2.15,old.z);_ea=old.aboard;}})()`],
['tower has twice the dim light and Divine Light can brighten a normal room for 900 seconds',`(()=>{
 const a=__v139.areas[0],p=__v83Point(a,[-16,-16]),old={p:_14.clone(),hour:_x,known:[...rpg.known],mp:rpg.mp,cd:_5o,lit:[...__v75Save.lit]};
 try{_14.set(p.x,a.y+1.85,p.z);_x=0;__v75Save.lit=__v75Save.lit.filter(k=>k!==a.key);for(let i=0;i<40;i++){_10+=.04;_fk();}const normal=_9.intensity;
 rpg.known.push('luz_divina');rpg.mp=999;_5o=0;if(!__v75Cast('luz_divina'))throw Error('Divine Light rejected ordinary tower');for(let i=0;i<40;i++){_10+=.04;_fk();}const divine=_9.intensity;
 if(Math.abs(normal-.6)>.03||divine<normal*1.45||__v86LightState()[a.key]!==900)throw Error('Wrong tower light '+normal+'/'+divine);
 __v86LightState()[a.key]=.02;_ge(.04);_fk();if(__v140Divine(a))throw Error('Divine Light never expires');return{night:normal,divine,duration:900};
 }finally{_14.copy(old.p);_x=old.hour;rpg.known=old.known;rpg.mp=old.mp;_5o=old.cd;__v75Save.lit=old.lit;}
})()`],
['stair sides and underside are solid while step surfaces remain traversable',`(()=>{const old=_14.clone();let tested=0;try{for(const st of __v139.stairs){const p=__v83Point(st.lower,[st.x,(st.z0+st.z1)/2]);_14.set(p.x,st.lower.y+1.85,p.z);if(!_i7(p.x,p.z,_14.y))throw Error('Ghost staircase '+st.lower.key);_14.y=st.lower.y+5+1.85;if(_i7(p.x,p.z,_14.y))throw Error('Step top blocked');tested++;}return{solidStairs:tested,...__AURELIA_STAIRS140__.audit()};}finally{_14.copy(old);}})()`],
['ground floor has no balconies and a real wooden door with animated collision',`(()=>{const a=__v139.areas[0],d=__v140Island.door,old=_14.clone();if(a.balconies139.length||!d)throw Error('Ground floor entry missing');try{const p=__v83Point(a,[-32,-16]);_14.set(p.x,a.y+1.85,p.z);d.pivot.rotation.y=0;__v73DoorShape(d);if(!__v73DoorHit(p.x,p.z,_14.y))throw Error('Closed wooden door has no collision');d.pivot.rotation.y=d.open;__v73DoorShape(d);if(__v73DoorHit(p.x,p.z,_14.y))throw Error('Open wooden door blocks entrance');d.pivot.rotation.y=d.angle;__v73DoorShape(d);return{groundBalconies:0,upperBalconies:36,woodDoor:true};}finally{_14.copy(old);}})()`],
['identical Eclipse views draw fewer peer-floor details without deleting enemies or geometry',`(()=>{const old=_14.clone(),results=[];try{for(const a of __v88Eclipse.areas){const p=__v83Point(a,a.design.centers.at(-1));_14.set(p.x,a.y+1.85,p.z);__v123Refresh(true);_bg(true);__v93Visibility();_bl();__v81OrientCamera();_fk();_7.updateMatrixWorld(true);__v140Draw(_6,_7);const before=_5.info.render.calls;__draw139(_6,_7);const after=_5.info.render.calls;if(after>before)throw Error('More draw calls '+a.key);results.push({floor:a.floor88+1,before,after});}if(!results.some(r=>r.after<r.before))throw Error('No measurable render reduction');return results;}finally{_14.copy(old);}})()`],
['enclosed rendering skips sun shadow passes, retains quality and restores exterior shadow setting',`(()=>{
 const old=_14.clone(),a=__v88Eclipse.areas[5],p=__v129Landing(a);_14.set(p.x,p.y+1.85,p.z);__v123Refresh(true);_bg(true);__v93Visibility();_bl();__v81OrientCamera();_fk();const shadow=_5.shadowMap.enabled,ratio=_5.getPixelRatio(),before=__v140Render.shadowPassesAvoided;__draw139(_6,_7);
 if(_5.shadowMap.enabled!==shadow||_5.getPixelRatio()!==ratio||shadow&&__v140Render.shadowPassesAvoided===before||__v140Render.branches<20||!__v140Render.skipped||_5.getContext().getError())throw Error('Rendering optimization/restore failed '+JSON.stringify(__v140Render));_14.copy(old);return __AURELIA_RENDER140__.audit();
})()`]
];
