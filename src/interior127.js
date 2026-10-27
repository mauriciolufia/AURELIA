/* One resident floor, plus the directly connected floor only at its own stair endpoint. */
function __v127Floors(a){
 const visible=new Set(a?[a]:[]),radius=22;
 const near=p=>p&&Math.hypot(_14.x-p.x,_14.z-p.z)<radius;
 for(const st of __v88Eclipse.stairs){if(st.lower===a&&near(st.start))visible.add(st.upper);if(st.upper===a&&near(st.end))visible.add(st.lower);}
 for(const tower of [...(__v94.towers||[]),__v102Solar])for(const st of tower.flights||[]){
  if(!a?.plan95&&(st.lower===a||st.upper===a)){const upper=st.upper===a,p={x:tower.x+st.x,z:tower.z-(upper?st.z1:st.z0)};if(near(p))visible.add(upper?st.lower:st.upper);}
 }
 if(a?.plan95)for(const st of a.plan95.stairs||[]){const incoming=st.upper===a.key,p=__v83Point(a,[st.x,incoming?st.z1:st.z0]);if(near(p)){const peer=__v83.areas.find(f=>f.key===(incoming?st.lower:st.upper));if(peer)visible.add(peer);}}
 if(!a?.plan95&&__v92Maya.areas?.includes(a)){const index=__v92Maya.areas.indexOf(a),p={x:__v92Maya.x+24,z:__v92Maya.z-(index===0?12:31)};if(near(p))visible.add(__v92Maya.areas[index===0?1:0]);}
 if(a?.plan103)for(const p of a.plan103.props||[]){if(!['up','down'].includes(p.type))continue;if(near({x:a.x+p.x,z:a.z+p.z})){const peer=__v103.areas[a.floor103+(p.type==='down'?1:-1)];if(peer)visible.add(peer);}}
 return visible;
}
const __v127Visibility=__v93Visibility;
__v93Visibility=function(){const r=__v127Visibility(),a=__v75At();if(!__v126Interior(a))return r;const visible=__v127Floors(a);
 for(const f of __v83.areas)if(f.root)f.root.visible=visible.has(f);
 for(const st of __v88Eclipse.stairs)st.root.visible=st.lower===a||st.upper===a;
 for(const t of [...(__v94.towers||[]),__v102Solar])for(const st of t.flights||[])if(st.root)st.root.visible=st.lower===a||st.upper===a;
 for(const rec of __v123.loaded){const c=rec.owner;if(c.__v83Area&&c.__v83Area!==a.key){rec.g.visible=false;if(c.warning)c.warning.visible=false;}}
 return r;
};
function __v127Roots(){__v126.interiorRoots=new Set(__v83.areas.flatMap(a=>[a.root,...a.groups].filter(Boolean)));}
const __v127World=_bj;_bj=function(...args){const r=__v127World(...args);__v127Roots();return r;};
const __v127Load=_dn;_dn=function(...args){const r=__v127Load(...args);__v127Roots();return r;};
window.__AURELIA_INTERIORS127__={audit:()=>({current:__v75At()?.key||null,visible:[...__v127Floors(__v75At())].map(a=>a.key),stairRadius:22,exteriorRadius:96,preservesFloorState:true})};
