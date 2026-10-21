/* King Candy keeps his boss identity and combat stats, with a new articulated royal body. */
function __v102KingCandy(c){
 if(!c)return;const record=_b0.find(r=>r.owner===c);if(record){_cq(record,false);_b0.splice(_b0.indexOf(record),1);}const old=c.g,g=new _0.Group();g.position.copy(old.position);g.rotation.copy(old.rotation);g.scale.setScalar(1.55);old.removeFromParent();c.g=g;c.legs=[];c.parts=[];__v92Ownership(c);
 const skin='#efc3a0',white='#fff3e4',gold='#e8bb4d',pink='#c94f83',dark='#4a3464';
 __v97Model(g,[['sphere',pink,0,1.35,0,.83,.93,.53],['sphere',skin,0,2.62,-.04,.56,.64,.49],['sphere',skin,0,2.35,-.42,.48,.27,.18],['sphere',skin,0,2.59,-.55,.14,.17,.18],['box',gold,0,1.2,-.5,.12,1.35,.08],['sphere',dark,0,1.48,.36,.9,.95,.2],['box',white,0,2.02,-.3,1.2,.28,.45],['sphere',gold,0,1.8,-.52,.09,.09,.07],['sphere',gold,0,1.48,-.55,.09,.09,.07],['sphere',gold,0,1.14,-.5,.09,.09,.07],['box','#71334e',0,2.28,-.55,.34,.065,.025],['box',white,0,2.31,-.57,.3,.055,.025]]);
 for(const side of[-1,1]){
  const leg=new _0.Group();leg.position.set(side*.38,.61,0);g.add(leg);__v97Model(leg,[['box',dark,0,-.1,0,.44,.74,.45],['bevel','#453447',0,-.43,-.14,.52,.26,.8]]);c.legs.push(leg);
  const arm=new _0.Group();arm.position.set(side*.8,1.85,0);g.add(arm);__v97Model(arm,[['sphere',pink,0,-.3,0,.24,.53,.28],['box',white,0,-.62,-.07,.42,.17,.46],['sphere',skin,0,-.79,-.08,.23,.23,.24]]);c.parts.push(arm);
  // Bald on top: white hair only at the temples and back, plus thick white eyebrows.
  const hair=new _0.Group();hair.name='Cabello blanco en sienes y nuca · coronilla calva';g.add(hair);const plan=[['sphere',skin,side*.57,2.57,-.04,.15,.21,.12],['sphere',white,side*.21,2.83,-.47,.18,.065,.06],['sphere','#fffdf3',side*.22,2.73,-.49,.09,.09,.045],['sphere','#43354b',side*.22,2.73,-.53,.045,.06,.02]];for(let i=0;i<5;i++)plan.push(['sphere',white,side*(.48+.02*Math.sin(i)),2.53+i*.1,.12,.15,.15,.3]);__v97Model(hair,plan);
  if(side===1){
   const candy=new _0.Group();candy.name='Piruleta en la mano';candy.position.set(0,-.72,-.13);arm.add(candy);__v97Model(candy,[['box',white,0,.7,0,.065,1.65,.065]]);
   const canvas=document.createElement('canvas');canvas.width=canvas.height=1024;const ctx=canvas.getContext('2d');ctx.fillStyle='#fff8e5';ctx.fillRect(0,0,1024,1024);ctx.lineWidth=56;ctx.lineCap='round';for(let j=0;j<6;j++){ctx.beginPath();for(let i=0;i<=360;i++){const t=i/360,a=j*Math.PI/3+t*Math.PI*2.3,r=t*485,x=512+Math.cos(a)*r,y=512+Math.sin(a)*r;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.strokeStyle=['#e96188','#8acdd9','#eab24c','#9c80ce','#e96188','#8acdd9'][j];ctx.stroke();}
   const texture=new _0.CanvasTexture(canvas);texture.colorSpace=_0.SRGBColorSpace;texture.anisotropy=Math.min(8,_5.capabilities.getMaxAnisotropy());const disc=new _0.Mesh(new _0.CylinderGeometry(.57,.57,.12,48),new _0.MeshToonMaterial({map:texture,color:'#ffffff',gradientMap:__v66Ramp}));disc.rotation.x=Math.PI/2;disc.position.set(0,1.73,0);disc.name='Caramelo espiral · textura 1024';disc.userData.v66Detail=true;candy.add(disc);
  }
 }
 const crown=new _0.Group();crown.name='Corona real de King Candy';g.add(crown);const plan=[['sphere',gold,0,3.13,.07,.5,.15,.43]];for(let j=0;j<9;j++){const a=j*Math.PI*2/9;plan.push(['cone',gold,Math.sin(a)*.46,3.35,.07+Math.cos(a)*.39,.11,.47,.1],['sphere',j%2?'#d56891':'#8ad6e0',Math.sin(a)*.48,3.13,.07+Math.cos(a)*.41,.065,.07,.065]);}__v97Model(crown,plan);
 c.__v91BodyRadius=.83;c.__v92FixedModel=true;g.name='King Candy · rey mayor de cabello blanco';g.userData.kingCandy102={bald:true,hair:'white',crown:true,lollipop:true};g.userData.modelSpecies92=c.spec.id;g.userData.v66Styled=true;__v66BaseCP(c);
}
