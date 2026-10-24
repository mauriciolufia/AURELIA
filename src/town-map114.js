/* Readable service names in town plans, with collision-free labels and clickable destinations. */
const __v114Map={labels:[],town:null};
const __v114MapKinds={shop:'Tienda',inn:'Posada',mage:'Magia',mission:'Misiones',church:'Iglesia'};
const __v114DrawTown=__v76DrawTown;__v76DrawTown=function(c,w,h,s,m,small=false){
 if(small)return __v114DrawTown(c,w,h,s,m,small);
 const fill=c.fillText;c.fillText=function(text,...args){if(/^(Tienda|Posada|Magias?|Misiones|Iglesia)$/.test(text))return;return fill.call(c,text,...args);};
 try{return __v114DrawTown(c,w,h,s,m,small);}finally{c.fillText=fill;}
};
const __v114MapDraw=_fo;_fo=function(...args){
 const r=__v114MapDraw(...args);__v114Map.labels=[];const town=__v76MapTown();__v114Map.town=town;
 if($('atlas').hidden||!town||town.hostile||town.name==='Nocteverde'||_eb||__v75At())return r;
 const m=_aq(),c=$('world-canvas').getContext('2d'),services=__v20TownServices.get(_1h.indexOf(town)),entries=[];
 for(const[key,label]of Object.entries(__v114MapKinds)){const h=services?.[key];if(h&&Number.isFinite(h.x+h.z))entries.push({label,h});}
 for(const n of[__v75.sage?.npc,__v104Ship.sage])if(n?.__v101.home.city===town.name&&!entries.some(e=>e.h===n.__v101.home))entries.push({label:'Sabio',h:n.__v101.home});
 c.save();c.font='bold '+(__v60Mobile?12:13)+'px Arial';c.textAlign='center';c.textBaseline='middle';c.lineWidth=3;c.lineJoin='round';
 for(const {label,h}of entries){const px=m.cx+h.x*m.scale,py=m.cy+h.z*m.scale;if(px<0||px>m.w||py<0||py>m.h)continue;const w=c.measureText(label).width+8,height=18;let box;
  const offsets=[[0,-18],[0,18],[44,0],[-44,0],[0,-39],[0,39],[44,-24],[-44,24],[60,36],[-60,-36],[0,62],[0,-62]];
  for(const[dx,dy]of offsets){const x=_18(px+dx,w/2+5,m.w-w/2-5),y=_18(py+dy,12,m.h-12),candidate={x:x-w/2,y:y-height/2,w,h:height};if(__v114Map.labels.some(o=>candidate.x<o.x+o.w+4&&candidate.x+candidate.w+4>o.x&&candidate.y<o.y+o.h+4&&candidate.y+candidate.h+4>o.y))continue;box=candidate;break;}
  if(!box)continue;const x=box.x+w/2,y=box.y+height/2;c.strokeStyle='#f3d598aa';c.lineWidth=1;c.beginPath();c.moveTo(px,py);c.lineTo(x,y);c.stroke();c.strokeStyle='#102a31';c.lineWidth=3.5;c.strokeText(label,x,y);c.fillStyle='#fff2b5';c.fillText(label,x,y);__v114Map.labels.push({...box,label,house:h});
 }c.restore();return r;
};
const __v114MapClick=_av.onclick;_av.onclick=function(e){
 if(!_ao&&__v114Map.town===__v76MapTown()){const rect=_av.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top,label=__v114Map.labels.find(l=>x>=l.x&&x<=l.x+l.w&&y>=l.y&&y<=l.y+l.h);if(label){__v76Waypoint({x:label.house.x,z:label.house.z,name:label.label+' de '+__v114Map.town.name,site:null});return;}}
 return __v114MapClick.call(this,e);
};
window.__AURELIA_TOWN_MAP114__={audit:()=>({town:__v114Map.town?.name,labels:__v114Map.labels.map(({label,x,y,w,h})=>({label,x,y,w,h}))})};
