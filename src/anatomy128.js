/* Anatomical overlays share merged geometry; only nearby, resident monsters receive them. */
const __v128={built:0,models:new Set(),last:-Infinity};
function __v128Eligible(c){return !!c?.hostile&&!c.__suppressed126&&(c.biome==='demonic'||c.biome==='volcano'||c.__v103||c.__v88Abyss||c.__v88FinalFloor!==undefined||c.__v83Area?.startsWith('eclipse-floor-'));}
function __v128Face(c){
 if(c.spec.id==='ojo_espinoso')return{y:2.12,z:-1,spread:0,r:.38};
 if(c.spec.id==='ice94_eye')return{y:2,z:-.8,spread:0,r:.31};
 const root=c.hdGroup||c.__motion124?.pivot||c.g,eyes=[];
 root.updateWorldMatrix(true,true);const inv=root.matrixWorld.clone().invert(),p=new _0.Vector3();
 root.traverse(o=>{if(!o.isMesh||o.userData.v66Detail||o.userData.anatomy128)return;const recipe=o.geometry?.userData?.recipe,type=recipe?.name||o.geometry?.type||'',r=recipe?.args?.[0]??o.geometry?.parameters?.radius;if(!/Sphere|Icosahedron/.test(type)||!Number.isFinite(r))return;const radius=r*Math.max(Math.abs(o.scale.x),Math.abs(o.scale.y),Math.abs(o.scale.z));if(radius<.018||radius>.15)return;p.setFromMatrixPosition(o.matrixWorld).applyMatrix4(inv);if(p.y>.3&&p.z<-.15&&Math.abs(p.x)<1.2)eyes.push({x:p.x,y:p.y,z:p.z,r:radius});});
 let best=null;for(const a of eyes)for(const b of eyes)if(a.x>0&&b.x<0&&Math.abs(a.x+b.x)<.08&&Math.abs(a.y-b.y)<.06&&Math.abs(a.z-b.z)<.08&&(!best||a.y>best.y))best={y:(a.y+b.y)/2,z:(a.z+b.z)/2,spread:(a.x-b.x)/2,r:Math.max(a.r,b.r)};
 if(best)return best;
 const cave=Number(c.spec.id.split('-')[1]);if(c.__v103)return{y:[.85,2.1,.8,2.55,2.55,.75,2.38][cave],z:[-1.24,-.4,-1.4,-.43,-.43,-1.24,-.4][cave],spread:.17,r:.07};
 return{y:2.65,z:-.4,spread:.15,r:.075};
}
function __v128Mesh(parent,plan,name){if(!plan.length)return null;const mesh=new _0.Mesh(__v66Geometry(plan,false),__v66DetailMat);mesh.name=name;mesh.userData.anatomy128=true;mesh.frustumCulled=true;mesh.receiveShadow=true;mesh.castShadow=false;parent.add(mesh);return mesh;}
function __v128Build(c){
 if(!__v128Eligible(c)||c.dead)return;
 const host=c.hdGroup||c.__motion124?.pivot||c.g;
 if(c.__anatomy128){if(c.__anatomy128.host!==host){for(const mesh of c.__anatomy128.limbs)if(mesh)mesh.removeFromParent();c.__anatomy128.root.removeFromParent();__v128.models.delete(c);c.__anatomy128=null;return __v128Build(c);}if(c.lowNodes)c.lowNodes=c.lowNodes.filter(n=>n!==c.__anatomy128.root);return;}
 const f=__v128Face(c),family=c.__v109Family||__v109Context(c).id,volcanic=c.biome==='volcano',bone='#e2c9a1',dark='#241e2b',skin=c.__v103?['#3e3548','#7c3c45','#bd5f42','#3b354c','#58404d','#754735','#77647c'][Number(c.spec.id.split('-')[1])]:c.spec.color||(volcanic?'#80504b':'#70536f'),ridge=volcanic?'#b97a5f':'#a184aa',iris=volcanic?'#ffb65f':'#cba5f6',root=new _0.Group();root.name='Anatomía detallada · '+(c.name||c.spec.name);root.userData.anatomy128=true;host.add(root);
 const fine=[],body=[],features=new Set(),head=Math.max(.24,Math.min(.65,f.spread*2.4)),insect=['beetle','magmascorpion'].includes(family),beast=['salamander','spinedBeast','dragon','chimera','devourer'].includes(family),eye=['abyssEye','iceEye'].includes(family),humanoid=!insect&&!beast&&!eye&&family!=='firebat';
 // Separate sclera, recessed iris, slit pupil, eyelids and brow ridges.
 for(const side of(eye?[0]:[-1,1])){
  const x=side*f.spread,r=f.r;
  fine.push(['sphere',dark,x,f.y,f.z-.008,r*1.55,r*1.45,r*.45],['sphere',bone,x,f.y,f.z-.035,r*1.25,r*1.1,r*.42],['sphere',iris,x,f.y,f.z-.065,r*.72,r*.94,r*.26],['sphere','#140e1b',x,f.y,f.z-.086,r*.23,r*.77,r*.16],['sphere','#fff4de',x-side*r*.25,f.y+r*.34,f.z-.10,r*.19,r*.2,r*.09],['sphere',ridge,x,f.y+r*1.35,f.z+.012,r*1.7,r*.35,r*.6,0,0,-side*.18]);
  if(!eye)fine.push(['sphere',skin,side*head*.72,f.y-head*.55,f.z+.07,head*.29,head*.38,head*.24],['cone',ridge,side*head*.95,f.y+head*.5,f.z+.16,head*.13,head*.8,head*.13,0,0,-side*.35]);
 }features.add('ojos');features.add('cabeza');
 if(!eye){
  const mouthY=f.y-head*.7,width=head*1.2,z=f.z-.02;
  fine.push(['sphere',dark,0,mouthY,z,width*.58,head*.23,head*.20],['sphere',skin,0,mouthY-head*.2,z+.045,width*.65,head*.22,head*.21],['sphere','#9b555d',0,mouthY-head*.08,z-.07,width*.28,head*.065,head*.1]);
  for(let i=0;i<6;i++){const x=(i/5-.5)*width;fine.push(['cone',bone,x,mouthY+head*.055,z-.11,head*.065,head*(i===0||i===5?.32:.19),head*.06,0,0,Math.PI],['cone',bone,x,mouthY-head*.14,z-.105,head*.05,head*.14,head*.05]);}
  features.add('dientes');features.add('mandíbula');
 }
 if(humanoid){
  const cy=f.y*.58,w=head*1.85,front=Math.max(-.55,f.z+.03);
  for(const side of[-1,1])body.push(['sphere',skin,side*w*.38,cy+.18,front,w*.42,head*.42,head*.18],['sphere',ridge,side*w*.42,cy+.42,front+.04,w*.48,head*.12,head*.12,0,0,-side*.18]);
  for(let row=0;row<3;row++)for(const side of[-1,1])body.push(['sphere',skin,side*head*.28,cy-.2-row*head*.31,front+.025,head*.25,head*.2,head*.13]);
  for(let i=0;i<4;i++)body.push(['box',dark,0,cy-.15-i*head*.22,front-.1,head*.045,head*.12,.025]);
  features.add('pecho');features.add('abdomen');
 }else if(insect||beast){
  const long=c.__v103?1:head*1.5;for(let i=0;i<6;i++)for(const side of[-1,1])body.push(['sphere',ridge,side*.27,.85,-.65+i*.26*long,.24,.13,.17,0,0,side*.2]);features.add('placas');
 }
 if(eye){
  features.add('ojo único');
  for(let i=0;i<10;i++){const a=i*Math.PI/5;body.push(['cone',ridge,Math.cos(a)*.65,f.y+Math.sin(a)*.65,.08,.09,.55,.09,0,0,a-Math.PI/2]);}features.add('espinas');
 }
 const coarse=__v128Mesh(root,body,'Pecho, músculos y placas · geometría compartida'),face=__v128Mesh(root,fine,'Cabeza, párpados, pupilas y dientes · geometría compartida'),limbs=[];
 const joints=[...new Set([...(c.legs||[]),...(c.parts||[])])].filter(j=>{if(Math.abs(j.position.x)<=.2||humanoid&&j.position.y>f.y*.94)return false;if(j.isGroup)return true;if(!humanoid||!j.isMesh||j.position.y<f.y*.45||!j.geometry)return false;j.geometry.computeBoundingBox();const size=j.geometry.boundingBox.getSize(new _0.Vector3());return size.x*Math.abs(j.scale.x)<.9&&size.y*Math.abs(j.scale.y)>.25;});
 const synthetic=[];
 if(humanoid&&!joints.some(j=>j.position.y>f.y*.45))for(const side of[-1,1]){const joint=new _0.Group();joint.name='Hombro esculpido · brazo articulado';joint.position.set(side*head*2.05,f.y*.73,0);root.add(joint);joints.push(joint);synthetic.push(joint);}
 for(const joint of joints){
  const arm=humanoid&&joint.position.y>f.y*.45,plan=[],side=Math.sign(joint.position.x)||1;let anchor=joint;
  if(joint.isMesh){anchor=new _0.Group();anchor.name='Anclaje anatómico articulado';anchor.scale.set(1/Math.max(.001,Math.abs(joint.scale.x)),1/Math.max(.001,Math.abs(joint.scale.y)),1/Math.max(.001,Math.abs(joint.scale.z)));joint.add(anchor);}
  if(family==='firebat'){
   for(let i=0;i<5;i++)plan.push(['box',ridge,side*(.18+i*.12),.03,-.25+i*.12,.035,.055,.7-i*.09,0,i*.14,0]);plan.push(['cone',bone,side*.8,.03,-.12,.06,.27,.06,0,0,side*Math.PI/2]);features.add('alas');
  }else if(arm){
   const length=joint.isMesh?Math.min(.9,joint.geometry.boundingBox.getSize(new _0.Vector3()).y*Math.abs(joint.scale.y)*.5+.1):c.__v103?.key&&family==='ashMage'?.65:.9;
   plan.push(['sphere',skin,0,-.15,.01,.25,.30,.23],['sphere',ridge,0,.05,0,.28,.15,.23]);
   plan.push(['sphere',skin,0,-length*.43,-.06,.21,.32,.20],['sphere',ridge,0,-length*.7,-.07,.20,.16,.21],['sphere',skin,0,-length,-.10,.22,.22,.18]);
   for(let i=0;i<3;i++){const x=(i-1)*.13;plan.push(['sphere',ridge,x,-length-.12,-.17,.075,.085,.08],['sphere',skin,x,-length-.25,-.19,.066,.16,.075],['cone',bone,x,-length-.43,-.23,.045,.18,.045,Math.PI*.1,0,Math.PI]);}
   plan.push(['sphere',skin,side*.23,-length-.04,-.12,.09,.15,.09,0,0,side*.7],['cone',bone,side*.30,-length-.19,-.17,.047,.17,.047,0,0,Math.PI]);features.add('brazos');features.add('dedos');features.add('uñas');
  }else{
   const footX=insect?side*(family==='magmascorpion'?.65:.4):0,footY=family==='magmascorpion'?-.16:family==='salamander'?-.2:insect?-.52:-.64;plan.push(['sphere',ridge,footX,footY+.1,-.12,.16,.14,.13]);for(let i=0;i<3;i++)plan.push(['cone',bone,footX+(i-1)*.13,footY,-.30,.055,.24,.055,-Math.PI/2,0,0]);features.add('garras');
  }
  const mesh=__v128Mesh(anchor,plan,arm?'Antebrazo, mano articulada y uñas':'Articulación y garras');if(mesh)limbs.push(mesh);
 }
 // Reptilian tails and demon tail tips follow the torso, without changing hitboxes.
 if(beast||['archdevil','winged','demon'].includes(family)){
  const tail=new _0.Group();tail.name='Cola segmentada';tail.position.set(0,beast?.55:1,.40);root.add(tail);const plan=[];
  for(let i=0;i<7;i++){const t=i/6;plan.push(['sphere',skin,Math.sin(t*1.4)*.35,t*t*.5,t*1.6,.22*(1-t*.75),.20*(1-t*.7),.29*(1-t*.6)],['cone',ridge,Math.sin(t*1.4)*.35,.2+t*t*.5,t*1.6,.08,.25,.075]);}
  plan.push(['cone',bone,.35,.65,1.7,.10,.35,.08,Math.PI/3,0,-.3]);limbs.push(__v128Mesh(tail,plan,'Escamas y punta de cola'));features.add('cola');
 }
 c.__anatomy128={root,host,coarse,face,limbs,features:[...features],synthetic,family};__v128.models.add(c);__v128.built++;if(c.lowNodes)c.lowNodes=c.lowNodes.filter(n=>n!==root);
}
function __v128Tick(){
 if(!_u||_74()||_10-__v128.last<.12)return;__v128.last=_10;
 const nearby=__v68Pool().filter(c=>__v128Eligible(c)&&!c.dead&&c.g.visible&&c.g.position.distanceToSquared(_14)<48*48).sort((a,b)=>a.g.position.distanceToSquared(_14)-b.g.position.distanceToSquared(_14));const began=performance.now();let added=0;for(const c of nearby){if(!c.__anatomy128&&(added>=2||performance.now()-began>2.5))continue;if(!c.__anatomy128)added++;__v128Build(c);}
 for(const c of __v128.models){const detail=c.__anatomy128,d=c.g.position.distanceToSquared(_14),active=!c.dead&&c.g.visible&&__v92SameFloor(c);detail.root.visible=active&&d<48*48;if(detail.face)detail.face.visible=d<24*24;for(const mesh of detail.limbs)if(mesh)mesh.visible=active&&d<28*28;}
}
const __v128Combat=_h8;_h8=function(dt){const r=__v128Combat(dt);__v128Tick();if(_u&&!_74())for(const c of __v128.models){const d=c.__anatomy128;if(!d.root.visible||c.g.position.distanceToSquared(_14)>28*28)continue;for(const[i,arm]of d.synthetic.entries()){const casting=!!c.specialAction||c.ai==='windup',target=casting?-.75:Math.sin(_10*4+(c.phase||0)+i*Math.PI)*.12;arm.rotation.x+=(target-arm.rotation.x)*(1-Math.exp(-Math.max(0,dt)*12));}}return r;};
const __v128HD=_hw;_hw=function(c){const r=__v128HD(c);if(c.__anatomy128)__v128Build(c);return r;};
const __v128World=_bj;_bj=function(...args){__v128.models.clear();__v128.built=0;__v128.last=-Infinity;return __v128World(...args);};
// Raise only the final hall's architecture from 18 m to 23.4 m; floor and stairs retain their elevations.
const __v128Raise=__v88RaiseArea;__v88RaiseArea=function(a){const r=__v128Raise(a);if(a.design.floor88!==5)return r;const factor=1.3,base=a.y;a.root.scale.y*=factor;a.root.position.y=base*(1-a.root.scale.y);a.ceilingHeight88=23.4;if(a.roof)a.roof.height=base+23.4;
 for(const c of a.colliders){c.bottom=base+((c.bottom??base)-base)*factor;c.top=base+((c.top??base+18)-base)*factor;}
 for(const d of a.doors)d.y=base+(d.y-base)*factor;
 for(const o of __v75.objects)if(o.area===a){o.y=base+(o.y-base)*factor;if(o.h)o.h*=factor;}
 if(a.torches)for(const f of a.torches.fixtures)f.y=base+(f.y-base)*factor;
 return r;};
window.__AURELIA_ANATOMY128__={audit:()=>({built:__v128.built,models:[...__v128.models].map(c=>({id:c.spawnId,species:c.spec.id,family:c.__anatomy128.family,features:c.__anatomy128.features})),fineDistance:24,limbDistance:28,bodyDistance:48,finalHallHeight:__v88Eclipse.areas.at(-1)?.ceilingHeight88})};
