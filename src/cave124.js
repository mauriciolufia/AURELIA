/* Stable lava, descending stair wells and species-specific detail, retaining IDs and statistics. */
function __v124CaveFloor(a,ceiling=false){
 const shape=new _0.Shape();shape.moveTo(-100,-100);shape.lineTo(100,-100);shape.lineTo(100,100);shape.lineTo(-100,100);shape.closePath();
 if(!ceiling){const p=a.plan103.props.find(p=>p.type==='down');if(p){const hole=new _0.Path();hole.moveTo(p.x-1.9,-p.z+3);hole.lineTo(p.x-1.9,-p.z-3);hole.lineTo(p.x+1.9,-p.z-3);hole.lineTo(p.x+1.9,-p.z+3);hole.closePath();shape.holes.push(hole);a.well124={x:a.x+p.x,z:a.z+p.z,area:a};}}
 const geo=new _0.ShapeGeometry(shape);geo.rotateX(-Math.PI/2);const p=geo.attributes.position,uv=geo.attributes.uv;for(let i=0;i<p.count;i++){p.setY(i,.08);uv.setXY(i,p.getX(i)/8,p.getZ(i)/8);}geo.computeVertexNormals();return geo;
}
function __v124CaveStair(a,p,g){
 g.name='Hueco de descenso · escalera tallada hacia abajo';
 for(let i=0;i<15;i++)__v97Model(g,[['box',i%2?'#8b776d':'#75616a',0,-.12-i*.30,-2.8+i*.4,3.5,.24,.42]]);
 __v97Model(g,[['box','#463842',-1.86,-2.5,0,.18,5.2,6],['box','#463842',1.86,-2.5,0,.18,5.2,6],['box','#352a36',0,-4.85,3.05,3.8,.2,.2],['box','#b59870',-1.93,.45,0,.10,.12,6.5],['box','#b59870',1.93,.45,0,.10,.12,6.5],['gem','#ffac59',1.7,-2.7,1.1,.18,.33,.18]]);
}
function __v124CaveReturn(a){return a.well124?{x:a.well124.x,z:a.well124.z-3.7,y:a.y}:{x:a.x+a.plan103.point(a.plan103.target).x,z:a.z+a.plan103.point(a.plan103.target).z,y:a.y};}
function __v124WellAt(x,z,feet){for(const a of __v103.areas){const w=a.well124;if(w&&Math.abs(x-w.x)<1.85&&Math.abs(z-w.z)<3.1&&feet>=a.y-5.5&&feet<a.y+4)return w;}return null;}
const __v124CaveAt=__v103AreaAt;__v103AreaAt=function(x=_14.x,z=_14.z,feet=_14.y-1.85){return __v124WellAt(x,z,feet)?.area||__v124CaveAt(x,z,feet);};
const __v124CaveGround=_ei;_ei=function(x,z){const w=__v124WellAt(x,z,_14.y-1.85);if(w)return w.area.y-Math.max(0,Math.min(4.5,(z-w.z+3)*.75));return __v124CaveGround(x,z);};
function __v124CaveDetail(c,p){
 const g=new _0.Group();g.name='Detalle volcánico · placas, minerales y articulaciones';c.g.add(g);c.__detail124=g;const gold='#dca568',rock='#70596b',glow='#ffb363';
 if(p.species===0||p.species===5){for(let i=0;i<5;i++)for(const side of[-1,1])__v97Model(g,[['bevel',rock,side*.42,.94,-.7+i*.32,.42,.18,.28],['sphere',gold,side*.66,.76,-.65+i*.32,.07,.07,.07]]);for(const side of[-1,1])__v97Model(g,[['cone',gold,side*.23,.65,-1.31,.09,.48,.09,Math.PI/2,0,0]]);}
 else if(p.species===1){for(const [i,wing]of c.parts.entries())for(let j=0;j<4;j++)__v97Model(wing,[['box','#b57974',(i?1:-1)*(.22+j*.18),.04,0,.05,.08,.7-j*.1,0,j*.12,0]]);__v97Model(g,[['sphere','#e59a6e',0,1.45,-.28,.2,.3,.08],['cone','#e5bb8c',-.15,2.25,-.31,.07,.27,.07],['cone','#e5bb8c',.15,2.25,-.31,.07,.27,.07]]);}
 else if(p.species===2){for(let i=0;i<9;i++)for(const side of[-1,1])__v97Model(g,[['sphere',i%2?rock:gold,side*.43,.55,-.75+i*.19,.07,.10,.10]]);__v97Model(g,[['box','#f5b66d',0,.45,-1.45,.45,.06,.08],['cone','#8d513d',0,.5,1.35,.25,1,.22,Math.PI/2,0,0]]);}
 else if(p.species===6){for(let i=0;i<7;i++)__v97Model(g,[['box',i%2?'#a4859b':'#65516f',-.4+i*.13,1.05,-.52,.04,1.3,.05]]);__v97Model(g,[['box',gold,0,1.43,-.59,.82,.12,.08],['gem',glow,0,1.45,-.67,.18,.22,.12],['sphere',gold,.95,2.5,-.3,.12,.12,.12]]);}
 else{for(const side of[-1,1]){__v97Model(g,[['bevel',rock,side*.45,1.65,-.44,.6,.55,.12],['box',gold,side*.48,1.25,-.49,.06,.25,.04],['cone',gold,side*.32,2.85,0,.11,.46,.11]]);for(const limb of (side===-1?[...c.legs,...c.parts]:[]))if(limb.isGroup)__v97Model(limb,[['sphere',rock,0,-.07,-.32,.14,.14,.12]]);}if(p.type==='boss')for(let i=0;i<6;i++)__v97Model(g,[['gem',glow,Math.cos(i*Math.PI/3)*.5,2.5+Math.sin(i*Math.PI/3)*.5,-.43,.12,.2,.09]]);}
}
function __v124Lavafall(a,p){
 const old=p.effect;old.removeFromParent();const effect=p.effect=new _0.Group();p.g.add(effect);const w=p.w||p.radius*2,d=p.d||p.radius*2,across=w>d;
 __v103Mesh(effect,new _0.BoxGeometry(w,7.5,d),__v103Mat('#ed6634','lava'),0,3.85,0);
 p.splash=__v103Mesh(effect,new _0.BoxGeometry(w,.12,d),__v103Mat('#ce4528','lava'),0,.16,0);
 if(!p.residual124)p.residual124=__v103Mesh(p.g,new _0.BoxGeometry(w,.08,d),__v103Mat('#742f32','lava'),0,.13,0);
 p.residual124.scale.set(1,1,1);p.effect.scale.set(1,1,1);p.warning.scale.set(across?w/(p.radius*2):1,across?1:d/(p.radius*2),1);
}
const __v124CaveVisible=__v103Visibility;__v103Visibility=function(){__v124CaveVisible();const a=__v103AreaAt();if(a)for(const p of a.hazards)if(p.type==='lava'||p.type==='lavafall'){p.g.visible=true;if(p.surface124)p.surface124.visible=true;if(p.residual124)p.residual124.visible=true;}};
const __v124CaveTick=__v103Tick;__v103Tick=function(dt){const r=__v124CaveTick(dt);if(_u&&!_74()){const a=__v103AreaAt(),w=a?.well124;if(w&&!_v&&Math.abs(_14.x-w.x)<1.6&&_14.z>w.z+2.55&&_14.z<w.z+3.1&&_14.y-1.85<a.y-3.4)__v103Goto(a.floor103+1);}return r;};
// A second procedural terrain sheet must not fill the visible stair openings.
const __v124CaveStream=_bg;_bg=function(...args){const r=__v124CaveStream(...args);if(__v103AreaAt())for(const group of _az.values())for(const mesh of group.children)if(mesh.material===_b5)mesh.visible=false;return r;};
