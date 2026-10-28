/* Optional volcanic reward and five one-roll enemy afflictions. */
const __v119Afflictions={sleep:{name:'Sueño',level:5,seconds:10,color:'#cbb3ff'},freeze:{name:'Congelación',level:10,seconds:10,color:'#9deaff'},burn:{name:'Quemadura',level:5,seconds:8,color:'#ff9a45'},poison:{name:'Veneno',level:20,seconds:12,color:'#a0e476'},confusion:{name:'Confusión',level:30,seconds:8,color:'#ff9fdd'},stone:{name:'Petrificación',level:40,seconds:10,color:'#a5a8a5'}};
const __v119Effects={enemies:new Map(),textures:new Map(),clock:0,attempts:0,successes:0};
for(const[kind,d]of Object.entries(__v119Afflictions)){
 const s=__v56AddSpell({id:'estado119-'+kind,name:d.name,element:'status119',level:d.level,cost:15+d.level,range:22,power:['poison','burn'].includes(kind)?Math.round(__v105Scale.magic(d.level)*.12):0,price:120+d.level*d.level*2,color:d.color,cooldown:2.5,duration:d.seconds,status119:kind});__v119Canonical.set(s.id,s);
}
const __v119Elementalist=__v56AddSpell({id:'elementalista',name:'Elementalista',element:'elementalBuff119',level:40,cost:80,power:0,range:0,price:0,color:'#ffdc91',cooldown:2.5,duration:900,reward119:true});__v119Canonical.set(__v119Elementalist.id,__v119Elementalist);
_fv.status119='Alteración de estado';_fv.elementalBuff119='Poder elemental';
__v114QuarterMana();__v119Schools();
function __v119Marker(c,kind){
 const d=__v119Afflictions[kind];let texture=__v119Effects.textures.get(kind);
 if(!texture){const canvas=document.createElement('canvas');canvas.width=256;canvas.height=64;const ctx=canvas.getContext('2d');ctx.font='bold 27px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.lineWidth=5;ctx.strokeStyle='#13232c';ctx.fillStyle=d.color;ctx.strokeText(d.name.toUpperCase(),128,32);ctx.fillText(d.name.toUpperCase(),128,32);texture=new _0.CanvasTexture(canvas);__v119Effects.textures.set(kind,texture);}
 const marker=new _0.Sprite(new _0.SpriteMaterial({map:texture,transparent:true,depthWrite:false,depthTest:true}));marker.scale.set(5,1.25,1);marker.position.copy(__v92AimPoint(c));marker.position.y+=1.4;_6.add(marker);return marker;
}
function __v119Disabled(c){const effects=__v119Effects.enemies.get(c);return !!effects&&['sleep','stone','freeze'].some(k=>(effects.get(k)?.remaining||0)>0);}
function __v119Confused(c){return __v119Effects.enemies.get(c)?.get('confusion');}
function __v119Disoriented(c){const s=__v119Confused(c);return !!s&&Math.sin((s.duration-s.remaining)*3+(c.phase||0))>0;}
function __v119Affect(c,kind,spell){
 __v119Effects.attempts++;const chance=__v109Context(c).boss?.2:.5;
 if(Math.random()>=chance){_5p=.65;$('damage-text').textContent='RESISTIÓ '+__v119Afflictions[kind].name.toUpperCase();return false;}
 let effects=__v119Effects.enemies.get(c);if(!effects)__v119Effects.enemies.set(c,effects=new Map());const previous=effects.get(kind);if(previous){previous.marker.removeFromParent();previous.marker.material.dispose();}
 const duration=__v119Afflictions[kind].seconds;effects.set(kind,{kind,duration,remaining:duration,next:2,power:spell.power||0,marker:__v119Marker(c,kind)});
 if(__v119Disabled(c)){if(c.specialAction)_d3(c);c.ai='recover';c.attackTimer=0;c.cooldown=Math.max(.15,c.cooldown||0);if(c.warning)c.warning.visible=false;}
 __v119Effects.successes++;__v68Burst(__v92AimPoint(c),spell.color,'impact',1.1,.4);_5p=.65;$('damage-text').textContent=__v119Afflictions[kind].name.toUpperCase();return true;
}
function __v119EffectsTick(dt){
 __v119Effects.clock+=dt;
 for(const[c,effects]of __v119Effects.enemies){let index=0;
  for(const[kind,e]of effects){e.remaining=Math.max(0,e.remaining-dt);e.marker.visible=!c.dead&&c.g.visible&&__v92SameFloor(c);e.marker.position.copy(__v92AimPoint(c));e.marker.position.y+=1.4+index++*.6;
   if(['poison','burn'].includes(kind)&&!c.dead){const elapsed=e.duration-e.remaining;while(e.next<=elapsed+1e-7&&e.next<=e.duration){e.next+=2;__v119Effects.periodic=true;try{_fd(c,e.power,kind==='burn'?'fire':'nature');}finally{__v119Effects.periodic=false;}if(c.dead)break;}}
   if(c.dead||e.remaining===0){e.marker.removeFromParent();e.marker.material.dispose();effects.delete(kind);}
  }
  if(!effects.size)__v119Effects.enemies.delete(c);
 }
}
function __v119EffectsClear(){for(const effects of __v119Effects.enemies.values())for(const e of effects.values()){e.marker.removeFromParent();e.marker.material.dispose();}__v119Effects.enemies.clear();}
function __v119GrantElementalist(){if(!(__v103.boss?.dead||__v103.state.boss)||rpg.known.includes('elementalista'))return false;rpg.known.push('elementalista');_3a('Ígneo vencido · aprendiste Elementalista: poder elemental +50% durante 15 minutos.');return true;}
const __v119BossReward=_fd;_fd=function(c,...args){const alive=c&&!c.dead,r=__v119BossReward(c,...args);if(alive&&c===__v103.boss&&c.dead&&__v119GrantElementalist())_iv();return r;};
const __v119EffectCast=_gd;_gd=function(){
 __v119Known();const s=_5n.find(s=>s.id===rpg.spell);if(!s?.status119&&s?.id!=='elementalista')return __v119EffectCast();
 if(!_u||_74()||_5o>0||rpg.level<s.level||!rpg.known.includes(s.id)||__v56Status.sleep>0||__v56Status.stun>0)return false;
 if(rpg.mp<s.cost){_3a('MP insuficientes.');return false;}
 if(s.id==='elementalista'){rpg.mp-=s.cost;_5o=s.cooldown;rpg.elementalBoost119=900;__v68Burst(_14,s.color,'buff',2,.5);_6s('magic');_fl();_iv();return true;}
 const target=__v92Nearest(s,new _0.Vector3(_14.x,_14.y-.12,_14.z));if(!target){_3a('Mira a un enemigo visible dentro del alcance.');return false;}
 rpg.mp-=s.cost;_5o=s.cooldown;const visual={...s,element:s.status119==='freeze'?'ice':s.status119==='burn'?'fire':s.status119==='poison'?'nature':'shadow',target119:target.c};__v58Launch(visual);_6s('magic');_fl();return true;
};
const __v119StatusImpact=__v92FlightImpact;__v92FlightImpact=function(f){
 if(!f.spell.status119)return __v119StatusImpact(f);if(f.hit92)return;f.hit92=true;
 const c=f.target92;if(!c||c.dead||!__v92SameFloor(c))return;const p=__v92AimPoint(c);if(p.distanceTo(f.end)>2||!__v92Ray(f.g.position,p))return;
 return __v119Affect(c,f.spell.status119,f.spell);
};
const __v119EnemyStatusFrame=_d7;_d7=function(dt){if(_u&&!_74())__v119EffectsTick(dt);return __v119EnemyStatusFrame(dt);};
const __v119StatusMove=__v109MoveRate;__v109MoveRate=function(c){return __v119Disabled(c)?0:__v119StatusMove(c);};
const __v119StatusChoice=__v70AttackChoice;__v70AttackChoice=function(c){return __v119Disabled(c)||__v119Disoriented(c)?null:__v119StatusChoice(c);};
const __v119StatusStart=_d4;_d4=function(c){return __v119Disabled(c)||__v119Disoriented(c)?false:__v119StatusStart(c);};
const __v119StatusContact=_d0;_d0=function(c,...args){return !__v117Incoming.context?.ranged&&(__v119Disabled(c)||__v119Disoriented(c))?false:__v119StatusContact(c,...args);};
const __v119StatusDecision=__v98EnemyDecision;__v98EnemyDecision=function(c){
 if(__v119Disabled(c)){const b=__v98EnemyBrain(c);b.action='recover';b.target=null;return;}
 const confused=__v119Confused(c);if(confused&&__v118Slot(c)){const p=c.g.position,a=(confused.duration-confused.remaining)*1.7+(c.phase||0),target={x:p.x+Math.sin(a)*4,z:p.z+Math.cos(a)*4,mode:'confused'},b=__v98EnemyBrain(c);if(__v97SafeTarget(c,target)){b.action='confused';b.target=target;b.updated=__v98AI.clock;return;}}
 return __v119StatusDecision(c);
};
const __v119StatusAim=__v117EnemyAim;__v117EnemyAim=function(c,origin,speed,range){const p=__v119StatusAim(c,origin,speed,range),confused=__v119Confused(c);if(!confused)return p;const a=.65+Math.sin((confused.duration-confused.remaining)*2)*.55,dx=p.x-origin.x,dz=p.z-origin.z;p.x=origin.x+dx*Math.cos(a)-dz*Math.sin(a);p.z=origin.z+dx*Math.sin(a)+dz*Math.cos(a);return p;};
const __v119StatusEmperor=__v94EmperorTick;__v94EmperorTick=function(dt){if(__v119Disabled(__v94Emperor.boss)){__v94EmperorFX(dt);return;}return __v119StatusEmperor(dt);};
const __v119StatusRaid=__v88DemonTick;__v88DemonTick=function(r,...args){if(__v119Disabled(r.c))return;return __v119StatusRaid(r,...args);};
const __v119ElementTimer=_ge;_ge=function(dt){if(_u&&!_74())rpg.elementalBoost119=Math.max(0,(rpg.elementalBoost119||0)-dt);return __v119ElementTimer(dt);};
const __v119EffectInfo=__v75SpellInfo;__v75SpellInfo=function(s){if(s.id==='elementalista')return'Poder de las técnicas elementales +50% durante 15 minutos. Recompensa de Ígneo, en la última planta de la Caldera de Obsidiana.';if(s.status119){const d=__v119Afflictions[s.status119];return d.name+' durante '+d.seconds+' s · Éxito: 50% contra normales y élites; 20% contra jefes · Alcance '+s.range+' m.'+(['poison','burn'].includes(s.status119)?' Daño por pulso: (poder '+s.power+' / DEF) ×8, cada 2 s.':'');}return __v119EffectInfo(s);};
const __v119EffectSources=__v75Sources;__v75Sources=function(s){return s.id==='elementalista'?[{site:__v103.site,label:'Derrota a Ígneo en la quinta planta de la Caldera de Obsidiana. Misión secundaria.'}]:__v119EffectSources(s);};
const __v119EffectWorld=_bj;_bj=function(...args){__v119EffectsClear();rpg.elementalBoost119=0;const r=__v119EffectWorld(...args);__v119Schools();__v114QuarterMana();__v119GrantElementalist();return r;};
const __v119EffectLoad=_dn;_dn=function(s,...args){__v119EffectsClear();const r=__v119EffectLoad(s,...args);rpg.elementalBoost119=s?.seed===_f?Math.max(0,Math.min(900,Number(s.magicEffects119?.elementalBoost)||0)):0;__v119GrantElementalist();return r;};
const __v119EffectWrite=__v96WriteSave;__v96WriteSave=function(value){try{const s=JSON.parse(value);if(s&&s.seed===_f){s.magicEffects119={elementalBoost:Math.max(0,Math.min(900,rpg.elementalBoost119||0))};value=JSON.stringify(s);}}catch(e){}return __v119EffectWrite(value);};
window.__AURELIA_STATUS119__={audit:()=>({rewardKnown:rpg.known.includes('elementalista'),elementalBoost:rpg.elementalBoost119||0,normalChance:.5,bossChance:.2,attempts:__v119Effects.attempts,successes:__v119Effects.successes,affected:__v119Effects.enemies.size,spells:_5n.filter(s=>s.status119).map(s=>({id:s.id,name:s.name,level:s.level,cost:s.cost,seconds:s.duration}))})};
