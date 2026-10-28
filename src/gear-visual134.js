/* Shared, merged equipment silhouettes: leather, steel, royal, arcane, celestial, divine. */
const __v134Looks=[
 {metal:'#8d9294',trim:'#87694d',dark:'#49392c',cloth:'#776046',gem:'#b7c5bb',light:'#c6cdb9'},
 {metal:'#b0bec8',trim:'#a49165',dark:'#384858',cloth:'#364e63',gem:'#759bb3',light:'#9ab9d0'},
 {metal:'#c4d3dc',trim:'#d6ae60',dark:'#334757',cloth:'#314f78',gem:'#5daccb',light:'#8bd5eb'},
 {metal:'#777caa',trim:'#e2bb76',dark:'#272b49',cloth:'#49446c',gem:'#90e1eb',light:'#7fdfeb'},
 {metal:'#dce5ef',trim:'#e6c580',dark:'#495070',cloth:'#465a7d',gem:'#8cd8fb',light:'#9ee5ff'},
 {metal:'#d9cba5',trim:'#e4b85e',dark:'#706347',cloth:'#a9b6cc',gem:'#b0edff',light:'#64d8ff'}
];
const __v134Models=new Map(),__v134SolidMat=new _0.MeshStandardMaterial({vertexColors:true,metalness:.45,roughness:.42,flatShading:true}),__v134GlowMat=new _0.MeshBasicMaterial({vertexColors:true});
const __v134FirstSolid=__v134SolidMat.clone(),__v134FirstGlow=__v134GlowMat.clone();
for(const m of[__v134FirstSolid,__v134FirstGlow]){m.depthTest=false;m.depthWrite=false;}
function __v134Ring(plan,color,x,y,z,r,width,segments=20){for(let i=0;i<segments;i++){const a=i*Math.PI*2/segments;plan.push(['box',color,x+Math.sin(a)*r,y+Math.cos(a)*r,z,width,r*Math.PI*2/segments*1.04,width,0,0,-a-Math.PI/2]);}}
function __v134Plans(slot,type,rank,part='main'){
 const p=__v134Looks[rank],solid=[],glow=[];const add=(shape,color,x,y,z,sx,sy,sz,rx=0,ry=0,rz=0)=>solid.push([shape,color,x,y,z,sx,sy,sz,rx,ry,rz]);
 const jewel=(x,y,z,s=.08)=>{add('gem',p.trim,x,y,z,s*1.4,s*1.5,s*.75);(rank>=3?glow:solid).push(['gem',rank>=3?p.light:p.gem,x,y,z-.028,s,s*1.2,s*.65]);};
 if(slot==='weapon'){
  add('box',p.dark,0,-.08,0,.075,.34,.07);
  for(let i=0;i<5;i++)add('box',rank?p.trim:'#a28b66',0,-.22+i*.065,0,.08,.017,.075,0,0,.15);
  add('gem',p.metal,0,.15,0,.09,.09,.065);
  if(type==='axe'){
   add('box',p.dark,0,-.85,0,.07,1.4,.065);add('box',p.trim,0,-1.34,0,.17,.36,.12);
   for(const side of[-1,1]){add('gem',p.metal,side*.24,-1.35,0,.30,.36,.065,0,0,side*.12);add('cone',p.metal,side*.4,-1.4,0,.10,.46,.065,0,0,side*.2);}
   jewel(0,-1.35,-.08,.08);if(rank>=3)glow.push(['box',p.light,0,-.85,-.038,.025,.78,.018]);
  }else if(type==='mace'){
   add('box',p.dark,0,-.8,0,.075,1.38,.075);add('sphere',p.metal,0,-1.48,0,.23,.28,.23);
   for(let i=0;i<8;i++){const a=i*Math.PI/4;add('gem',p.trim,Math.sin(a)*.21,-1.48,Math.cos(a)*.21,.1,.29,.1,0,a,0);}
   if(rank>=3){jewel(0,-1.48,-.25,.13);__v134Ring(glow,p.light,0,-1.48,-.02,.33,.015,16);}
  }else if(type==='spear'){
   add('box',p.dark,0,-.82,0,.055,2.15,.055);add('box',p.trim,0,-1.7,0,.29,.065,.075);
   add('gem',p.metal,0,-2,0,.12,.4,.045);if(rank>=3)glow.push(['gem',p.light,0,-1.99,-.045,.032,.3,.014]);
   if(rank>=4)for(const side of[-1,1])add('cone',p.trim,side*.12,-1.82,0,.05,.36,.04,0,0,side*.4);
  }else{
   const great=type==='greatsword',length=great?1.7:1.32,width=(great?.19:.13)*(rank>=4?1.65:1);
   add('box',p.metal,0,-.35-length/2,0,width,length,.055);
   for(const side of[-1,1])add('box',rank>=2?'#e4eaf0':'#b4bdc0',side*width*.48,-.35-length/2,-.007,.018,length,.064,0,0,0);
   add('cone',p.metal,0,-.35-length-.12,0,width*.62,.27,.04,0,0,Math.PI);
   add('box',p.trim,0,-.29,0,rank>=2?.52:.38,.07,.09);
   if(rank>=1)add('box',p.dark,0,-.75,-.031,.025,.7,.012);
   if(rank>=3)glow.push(['box',p.light,0,-.95,-.039,.022,length*.63,.016]);
   if(rank>=2)jewel(0,-.28,-.065,.075);
   if(rank>=4)for(const side of[-1,1])for(let i=0;i<(rank===5?5:3);i++)add('cone',p.trim,side*(.15+i*.055),-.29+i*.04,.014,.035,.24-i*.025,.035,0,0,-side*(.7+i*.12));
   if(rank===5)for(const side of[-1,1])for(let i=0;i<4;i++)add('cone',p.trim,side*(width*.48+.018),-.61-i*.23,.005,.035,.16,.025,0,0,-side*.35);
  }
  if(rank>=2)for(let i=0;i<rank;i++)add('gem',p.trim,0,-.54-i*.14,-.04,.024,.04,.012,0,0,i%2?.4:-.4);
  if(rank===5){__v134Ring(glow,p.light,0,-.3,.035,.18,.012,16);for(const side of[-1,1])jewel(side*.28,-.21,-.01,.05);}
 }else if(slot==='head'){
  add('sphere',rank?p.metal:p.dark,0,.12,.07,.48,.36,.40);
  add('box',p.trim,0,.15,-.35,.73,.075,.08);
  for(const side of[-1,1]){add('box',p.metal,side*.35,-.04,-.12,.12,.38,.32,0,0,side*.12);add('gem',p.trim,side*.32,.15,-.32,.065,.085,.035);}
  if(rank>=1)add('box',p.trim,0,.025,-.44,.045,.24,.06);
  if(rank>=2){jewel(0,.22,-.39,.07);for(const side of[-1,1])add('cone',p.trim,side*.28,.47,.05,.055,.31,.07,0,0,-side*.25);}
  if(rank>=3){add('box',p.dark,0,.3,.05,.10,.18,.65);for(let i=0;i<5;i++)add('cone',p.trim,(i-2)*.12,.47,-.1,.042,.20+(2-Math.abs(i-2))*.07,.045);}
  if(rank===5){__v134Ring(solid,p.trim,0,.26,.36,.62,.025,28);__v134Ring(glow,p.light,0,.26,.37,.57,.012,28);}
 }else if(slot==='body'&&part==='shoulder'){
  add('sphere',rank?p.metal:p.dark,0,-.045,.015,.23,.18,.25);
  add('box',p.trim,0,-.1,-.17,.31,.045,.10);
  if(rank>=2)for(let i=0;i<3;i++)add('box',i%2?p.trim:p.metal,0,-.13-i*.07,.005,.29-i*.035,.06,.36-i*.03);
  if(rank>=4)for(let i=0;i<(rank===5?5:3);i++)add('cone',p.trim,.04+i*.035,.12+i*.035,.04+i*.065,.05,.25+i*.04,.07,-.6,0,-.2);
  if(rank>=3)jewel(0,-.03,-.24,.06);
 }else if(slot==='body'){
  add('box',rank?p.metal:p.dark,0,1.1,.025,.83,.84,.46);
  for(const side of[-1,1]){add('sphere',rank?p.metal:p.dark,side*.2,1.25,-.19,.23,.24,.12);add('box',p.trim,side*.37,1.2,-.11,.04,.65,.25,0,0,-side*.08);}
  for(let i=0;i<(rank?4:2);i++)add('box',i%2?p.metal:p.dark,0,.84+i*.09,-.235,.64+i*.035,.075,.07);
  add('box',p.trim,0,.72,-.02,.85,.08,.47);
  if(rank>=1)for(const side of[-1,1])for(let i=0;i<3;i++)add('gem',p.trim,side*.31,1.08+i*.12,-.245,.018,.02,.018);
  if(rank>=2){jewel(0,1.33,-.32,.10);for(const side of[-1,1])for(let i=0;i<3;i++)add('box',p.trim,side*(.13+i*.07),1.35-i*.05,-.28,.11,.025,.03,0,0,-side*.48);}
  if(rank>=3){glow.push(['box',p.light,0,1.01,-.285,.024,.23,.018]);for(const side of[-1,1])add('box',p.trim,side*.32,.66,-.12,.22,.19,.16,0,0,-side*.16);}
  if(rank===5){for(const side of[-1,1])for(let i=0;i<5;i++)add('cone',p.trim,side*(.15+i*.04),1.29-i*.025,-.28,.025,.24-i*.02,.025,0,0,-side*.85);}
  // The cape crest is visible from the normal third-person camera behind the hero.
  if(rank>=2){add('gem',p.trim,0,1.24,.30,.15,.20,.045);(rank>=3?glow:solid).push(['gem',rank>=3?p.light:p.gem,0,1.24,.345,.085,.13,.025]);add('box',p.trim,0,1,.30,.028,.25,.025);}
  if(rank>=4)for(const side of[-1,1])for(let i=0;i<4;i++)add('cone',p.trim,side*(.10+i*.045),1.28-i*.055,.31,.027,.19-i*.02,.025,0,0,side*.8);
 }else if(slot==='hands'){
  add('box',rank?p.metal:p.dark,0,-.5,-.005,.23,.35,.23);
  for(let i=0;i<(rank?3:1);i++)add('box',p.trim,0,-.4-i*.11,-.12,.24,.045,.04);
  add('sphere',rank?p.metal:p.dark,0,-.72,-.005,.13,.14,.12);
  for(let i=0;i<4;i++){add('box',p.metal,(i-1.5)*.048,-.77,-.09,.037,.13,.08);if(rank>=2)add('gem',p.trim,(i-1.5)*.048,-.73,-.14,.02,.025,.018);}
  if(rank>=3)jewel(0,-.52,-.15,.055);
 }else if(slot==='legs'){
  add('box',rank?p.metal:p.dark,0,-.19,-.025,.28,.36,.28);
  add('gem',p.trim,0,-.4,-.16,.16,.13,.055);
  add('box',p.metal,0,-.59,-.12,.23,.32,.11);
  for(let i=0;i<(rank?3:1);i++)add('box',p.trim,0,-.49-i*.085,-.18,.235-i*.025,.028,.035);
  if(rank>=3)glow.push(['box',p.light,0,-.56,-.195,.018,.19,.015]);
  if(rank>=4)jewel(0,-.4,-.2,.045);
 }else if(slot==='feet'){
  add('box',p.dark,0,-.83,-.065,.30,.22,.43);
  add('box',rank?p.metal:p.dark,0,-.85,-.17,.30,.16,.28);
  add('box',p.trim,0,-.93,-.065,.31,.035,.44);
  for(let i=0;i<(rank?3:1);i++)add('box',p.trim,0,-.76+i*.055,-.1,.25,.035,.20);
  if(rank>=3)jewel(0,-.82,-.325,.04);
 }else if(slot==='shield'){
  add('gem',p.trim,0,0,0,.40,.52,.11);add('gem',rank?p.metal:p.dark,0,0,-.035,.34,.46,.10);
  add('box',p.trim,0,.01,-.13,.035,.62,.025);add('box',p.trim,0,.06,-.13,.44,.035,.025);
  if(rank>=2)jewel(0,.06,-.16,.10);
  if(rank>=3)__v134Ring(glow,p.light,0,.06,-.14,.18,.012,20);
  if(rank>=4)for(const side of[-1,1])for(let i=0;i<4;i++)add('cone',p.trim,side*(.27+i*.045),.14+i*.06,.015,.045,.24-i*.025,.035,0,0,-side*.7);
 }
 return{solid,glow};
}
function __v134Model(item,part='main',first=false){
 const rank=__v134Rank(item),key=[item.slot,item.type,rank,part].join(':'),root=new _0.Group();root.name=item.name+' · '+__v134Names[Math.min(7,[0,1,2,3,6,7][rank])];root.userData.equipment134={slot:item.slot,rank,part};
 if(!__v134Models.has(key)){const p=__v134Plans(item.slot,item.type,rank,part);__v134Models.set(key,{solid:p.solid.length?__v66Geometry(p.solid,false):null,glow:p.glow.length?__v66Geometry(p.glow,false):null});}
 const model=__v134Models.get(key);
 for(const[geometry,material]of[[model.solid,first?__v134FirstSolid:__v134SolidMat],[model.glow,first?__v134FirstGlow:__v134GlowMat]])if(geometry){const mesh=new _0.Mesh(geometry,material);mesh.castShadow=false;mesh.receiveShadow=!first;if(first)mesh.renderOrder=31;root.add(mesh);}
 return root;
}
__aureliaSyncAvatarGear=function(force=false){
 const a=__aurPlayerAvatar;if(!a)return;const signature=__v105Slots.map(slot=>rpg.equipped[slot]||'').join('|');
 if(!force&&a.__v134Signature===signature)return;
 a.__v134Signature=signature;
 for(const root of a.__v134Parts||[])root.removeFromParent();a.__v134Parts=[];
 const items=__v134Equipped(),equipped=slot=>items.find(i=>i.slot===slot),attach=(slot,host,part='main',side=1)=>{const item=equipped(slot);if(!item)return;const root=__v134Model(item,part);if(side<0)root.scale.x=-1;host.add(root);a.__v134Parts.push(root);return root;};
 a.bodyArmor.visible=a.shoulderL.visible=a.shoulderR.visible=a.helm.visible=a.gloveL.visible=a.gloveR.visible=a.greaveL.visible=a.greaveR.visible=false;
 a.hat.visible=!equipped('head');a.torso.visible=!equipped('body');a.weaponRoot.clear();
 if(equipped('weapon')){const item=equipped('weapon'),model=__v134Model(item);model.scale.setScalar(item.type==='spear'?.62:item.type==='greatsword'?.5:.56);model.position.y=.1;if(item.type==='spear')model.rotation.z=Math.PI;a.weaponRoot.add(model);}
 attach('body',a.root);attach('body',a.leftArm,'shoulder',-1);attach('body',a.rightArm,'shoulder');
 const helm=attach('head',a.root);if(helm)helm.position.y=1.97;
 attach('hands',a.leftArm,'main',-1);attach('hands',a.rightArm);
 attach('legs',a.leftLeg,'main',-1);attach('legs',a.rightLeg);
 attach('feet',a.leftLeg,'main',-1);attach('feet',a.rightLeg);a.shoeL.visible=a.shoeR.visible=!equipped('feet');
 a.shield.visible=false;const shield=attach('shield',a.leftArm);if(shield)shield.position.set(-.03,-.47,-.13);
 if(!a.__v134CapeMaterial){a.cape.material=a.cape.material.clone();a.__v134CapeMaterial=a.cape.material;}
 const body=equipped('body');a.cape.material.color.set(body?__v134Looks[__v134Rank(body)].cloth:'#8b4d63');
};
// First-person models use the same silhouette, with separate depth-independent materials.
_5x=function(){
 if(_4n)_4n.removeFromParent();_4n=new _0.Group();_4n.name='Arma del héroe · v134';_4n.scale.setScalar(.65);_7.add(_4n);if(!_7.parent)_6.add(_7);
 const item=__v134Equipped().find(i=>i.slot==='weapon');
 if(item){const model=__v134Model(item,'main',true);model.rotation.z=Math.PI;_4n.add(model);}
 const plan=[['box','#ddb695',0,.02,.06,.18,.22,.13]];for(let i=0;i<4;i++)plan.push(['box','#d5aa89',-.07+i*.046,.12,.02,.038,.10,.09]);
 const gloves=__v134Equipped().find(i=>i.slot==='hands');if(gloves){const p=__v134Looks[__v134Rank(gloves)];plan.push(['box',p.metal,0,-.08,.04,.20,.14,.16],['box',p.trim,0,-.15,.04,.21,.03,.17]);}
 const hand=new _0.Mesh(__v66Geometry(plan,false),__v134FirstSolid);hand.renderOrder=32;_4n.add(hand);
 _4n.position.set(.30,-.3,-.9);_4n.rotation.set(-.1,-.04,-.24);
};
window.__AURELIA_GEAR_VISUAL134__={audit:()=>({templates:__v134Models.size,tiers:6,merged:true,extraLights:0,parts:__aurPlayerAvatar?.__v134Parts?.length||0})};
