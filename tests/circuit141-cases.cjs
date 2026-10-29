module.exports=[
 ['physical tower floors have no route that skips either middle room',`(()=>{
  const old=_14.clone(),reports=[];
  try{for(const a of __v139.areas.slice(0,9)){
   _14.y=a.y+1.85;const order=a.design.main,start=__v139.centers[order[0]],end=__v139.centers[order[3]],mask=new Set();
   // Use the floor polygons actually drawn, not the old logical walk139 mask.
   for(let x=-40;x<=40;x++)for(let z=-32;z<=32;z++){
    if(!a.design.polygons.some(p=>__v84PointInRing([x,z],p.outer)&&!p.holes.some(h=>__v84PointInRing([x,z],h))))continue;
    const p=__v83Point(a,[x,z]);if(!_i7(p.x,p.z,a.y+1.85))mask.add(x+','+z);
   }
   const reach=omit=>{const q=[start],seen=new Set([start.join(',')]);for(let i=0;i<q.length;i++){const[x,z]=q[i];if(x===end[0]&&z===end[1])return true;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,zz=z+dz,key=xx+','+zz,r=a.design.rects[omit];if(!mask.has(key)||seen.has(key)||r&&xx>r[0]&&xx<r[2]&&zz>r[1]&&zz<r[3])continue;seen.add(key);q.push([xx,zz]);}}return false;};
   if(!reach(-1)||reach(order[1])||reach(order[2]))throw Error('Physical floor permits a shortcut or has no route: '+a.key);
   reports.push({floor:a.floor139+1,order});
  }return reports;}finally{_14.copy(old);}
 })()`],
 ['real movement crosses every room through its corridor and is stopped by the corridor side walls',`(()=>{
  const old={pos:_14.clone(),yaw,cameraYaw:__v95Camera.yaw,joy:{..._16},keys:{..._15},flight:_v,ride:_9d,sprint:_w};let crossings=0,blocked=0;
  try{for(const k of Object.keys(_15))_15[k]=false;_v=false;_9d=null;_w=true;_16.x=0;_16.y=1;
   const walk=(a,from,to,limit=600)=>{const p=__v83Point(a,from),q=__v83Point(a,to);_14.set(p.x,a.y+1.85,p.z);_12=0;_13=true;let n=0;while(Math.hypot(_14.x-q.x,_14.z-q.z)>.2&&n++<limit){yaw=Math.atan2(-(q.x-_14.x),-(q.z-_14.z));__v95Camera.yaw=yaw;_3m(.008);}return Math.hypot(_14.x-q.x,_14.z-q.z)<.3&&Math.abs(_14.y-a.y-1.85)<.3;};
   for(const a of __v139.areas.slice(0,9)){
    const order=a.design.main;for(let i=0;i<3;i++){const p=__v139.centers[order[i]],q=__v139.centers[order[i+1]];if(!walk(a,p,q)||!walk(a,q,p))throw Error('Corridor blocked '+a.key+'/'+i);crossings+=2;}
    for(const[from,to]of[[[0,-16],[0,0]],[[0,16],[0,0]],[[16,0],[0,0]]]){if(walk(a,from,to,120))throw Error('Can enter forbidden central cross '+a.key);const p=__v83Local(a,_14.x,_14.z);if(Math.abs(p[0])+Math.abs(p[1])<11.5)throw Error('Crossed a corridor side wall '+a.key);blocked++;}
    for(const[x,z]of[[0,-12.8],[0,12.8],[12.8,0]]){const p=__v83Point(a,[x,z]);for(const h of[1.85,5,8.5])if(!_i7(p.x,p.z,a.y+h))throw Error('Wall is not solid to ceiling '+a.key);}
   }return{crossings,blocked};
  }finally{_14.copy(old.pos);yaw=old.yaw;__v95Camera.yaw=old.cameraYaw;_16.x=old.joy.x;_16.y=old.joy.y;Object.assign(_15,old.keys);_v=old.flight;_9d=old.ride;_w=old.sprint;}
 })()`],
 ['old saves in the central crossing recover on the same floor without losing progress',`(()=>{
  _iv();const saved=JSON.parse(__v96ReadSave()),old=_14.clone();let recovered=0;
  try{for(const a of __v139.areas.slice(0,9))for(const local of[[0,0],[0,-12.8]]){
   const p=__v83Point(a,local),s=JSON.parse(JSON.stringify(saved));s.player=[p.x,a.y+1.85,p.z];_dn(s);
   if(Math.abs(_14.y-a.y-1.85)>.15||!__v139Contains(a,_14.x,_14.z)||rpg.gold!==saved.gold||rpg.level!==saved.level)throw Error('Invalid saved-position recovery '+a.key+' '+_14.toArray());recovered++;
  }return{recovered};}finally{_dn(saved);_14.copy(old);}
 })()`]
];
