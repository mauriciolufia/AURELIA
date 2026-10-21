const {chromium}=require('playwright');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 let html=fs.readFileSync(path.resolve(__dirname,'../index.html'),'utf8');
 // Capture the actual generated level 41+ kits before the new balance layer runs.
 html=html.replace('/* Gentler early encounters',`const __balanceBaseline=new Map(),__balanceWorld=_bj;_bj=function(...args){const r=__balanceWorld(...args);for(const c of _m)if(c.hostile&&c.level>40)__balanceBaseline.set(c,JSON.stringify(c.__v68Skills));return r;};\n/* Gentler early encounters`);
 html=html.replace('const _ix=_7q();','_5.render=()=>{};window.__balanceTest=s=>eval(s);const _ix=_7q();');
 const errors=[],server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(html);});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--disable-dev-shm-usage']});
  const page=await browser.newPage({viewport:{width:960,height:540}});page.on('pageerror',e=>errors.push(e.message));await page.goto(`http://127.0.0.1:${server.address().port}/`,{waitUntil:'domcontentloaded',timeout:180000});
  await page.waitForFunction(()=>window.__balanceTest&&!document.getElementById('ag-start').disabled,null,{timeout:240000});const run=s=>page.evaluate(s=>window.__balanceTest(s),s);await run('active=false');await page.click('#ag-start');await run('active=false');
  console.log('PASS actual early enemies have at most 2 techniques; every high-level kit is unchanged',await run(`(()=>{
   const low=_m.filter(__v99Early),high=[...__balanceBaseline];if(!low.length||!high.length)throw Error('Missing enemy level groups');
   for(const c of low)if(c.__v68Skills.length>2||!c.__v68Skills.includes(c.art)||c.__v85IndoorSkills&&c.__v85IndoorSkills!==c.__v68Skills)throw Error('Invalid limited kit '+c.level);
   for(const[c,skills]of high)if(JSON.stringify(c.__v68Skills)!==skills)throw Error('High-level kit changed '+c.level);
   return{earlyEnemies:low.length,highLevelKitsPreserved:high.length};})()`));
  console.log('PASS level boundaries 1, 40, 41 and 60 preserve damage and advanced aggression',await run(`(()=>{
   const result=[];for(const level of[1,40,41,60]){const c={hostile:true,level,phase:.2,damage:123,__v68Skills:[{name:'Fire',type:'projectile'},{name:'Ice',type:'ring'},{name:'Heal',type:'heal'},{name:'Guard',type:'buffDefense'}]},original=c.__v68Skills;
    c.art=original[0];const detect=__v99Detection(c);__v99Schedule(c);const delay=c.__v68NextAction-__v68CombatTime;__v68Schedule(c);const ratio=(c.__v68NextAction-__v68CombatTime)/delay;__v99Limit(c);
    if(Math.abs(__v92Detect(c)/detect-(level<=40?.85:1))>.00001||Math.abs(ratio-(level<=40?1.2:1))>.00001||c.damage!==123||c.__v68Skills.length!==(level<=40?2:4)||level>40&&c.__v68Skills!==original)throw Error('Wrong balance boundary '+level);
    result.push({level,techniques:c.__v68Skills.length,attackIntervalMultiplier:ratio});
    if(level<=40){c.__v68Skills.push({name:'New technique',type:'ring'});__v99Limit(c);if(c.__v68Skills.length>2)throw Error('A later technique bypassed the limit');}
   }return result;})()`));
  console.log('PASS provisional low levels cannot truncate the kit of a later high-level enemy',await run(`(()=>{
   const c={hostile:true,level:1,__v68Skills:[{name:'Fire',type:'projectile'},{name:'Ice',type:'ring'},{name:'Heal',type:'heal'}]},building=__v99Life.building;c.art=c.__v68Skills[0];
   try{__v99Life.building=true;__v99Limit(c);if(c.__v68Skills.length!==3)throw Error('Provisional level truncated a kit');c.level=50;__v99Life.building=false;__v99Limit(c);if(c.__v68Skills.length!==3)throw Error('Final high-level kit changed');return true;}finally{__v99Life.building=building;}
  })()`));
  console.log('PASS all living NPCs have a brain and a visible idle animation, including houses and services',await run(`(()=>{
   const all=_2h.filter(n=>!n.__v88Dead&&!n.__v88Controlled);let interiors=0;
   for(const n of all){if(!n.__v98Active)throw Error('Unmanaged NPC '+n.id);const b=__v98NPCBrain(n);if(!__v98NPCActions.includes(b.action))throw Error('No activity '+n.id);
    if(n.__v99Area){interiors++;if(!__v99Free(n.__v99Area,n.x,n.z))throw Error('Blocked original spawn '+n.id);}
    const clock=__v98AI.clock;__v98NPCPose(n,b,false,.05);const y=n.g.position.y,arm=n.arms[0]?.rotation.z;__v98AI.clock+=.37;__v98NPCPose(n,b,false,.05);__v98AI.clock=clock;
    if(n.g.position.y===y&&n.arms[0]?.rotation.z===arm)throw Error('Frozen idle pose '+n.id);
   }return{animated:all.length,interiors};})()`));
  console.log('PASS house, king, priest, merchant, mage, innkeeper and quest NPCs walk without crossing walls',await run(`(()=>{
   const chosen=new Set(['ines','court-2-0','v78-noct-merchant','v78-noct-sorcerer','sidequest92-polar95','sidequest92-maya']);
   for(const job of['merchant','innkeeper','priest','sorcerer']){const n=_2h.find(n=>n.__v99Area&&n.job===job);if(n)chosen.add(n.id);}
   const old=_14.clone(),hour=_x,weather=_66,threat=__v97NearestThreat,activeList=__v88Life.active,result=[];
   try{_x=12;_66=()=>false;__v97NearestThreat=()=>null;
    for(const id of chosen){const n=_2h.find(n=>n.id===id);if(!n?.__v99Area)throw Error('Missing test role '+id);const a=n.__v99Area,b=__v98NPCBrain(n),start={x:n.x,z:n.z};__v88Life.active=[n];_14.set(n.x+30,n.homeY+1.85,n.z);b.lastGreet=Infinity;b.until=0;b.next=0;
     let traveled=0;const actions=new Set();for(let i=0;i<1200;i++){const x=n.x,z=n.z;__v98AI.clock+=.05;__v99Life.plans=0;__v99Life.graphMs=0;__v99InteriorTick(n,b,.05);actions.add(b.action);traveled+=Math.hypot(n.x-x,n.z-z);
      if(!__v99Free(a,n.x,n.z)||!__v99Segment(a,{x,z},n))throw Error('NPC crossed a wall or left its floor '+id);
     }if(traveled<1||actions.size<2||!a.nodes?.[0].edges.length)throw Error('NPC does not walk/change activities '+id+' '+traveled+' '+[...actions]);
     result.push({id,traveled:Number(traveled.toFixed(2)),activities:actions.size});
    }return result;
   }finally{_14.copy(old);_x=hour;_66=weather;__v97NearestThreat=threat;__v88Life.active=activeList;}
  })()`));
  console.log('PASS indoor NPCs can choose all 15 contextual behaviors',await run(`(()=>{
   const n=_2h.find(n=>n.id==='ines'),b=__v98NPCBrain(n),old=_14.clone(),hour=_x,weather=_66,threat=__v97NearestThreat,seen=new Set();
   const decide=expected=>{b.until=0;b.target=null;__v99Decision(n,b);seen.add(b.action);if(expected&&b.action!==expected)throw Error(expected+' -> '+b.action);};
   try{_x=12;_66=()=>false;__v97NearestThreat=()=>null;_14.set(n.x+30,n.homeY+1.85,n.z);b.lastGreet=Infinity;b.energy=.7;b.social=.6;b.curiosity=.5;b.dangerUntil=0;
    for(let i=0;i<20;i++)decide();_x=23;decide('sleep');_x=12;_66=()=>true;b.action='patrol';decide('shelter');_66=()=>false;
    _14.set(n.x+2,n.homeY+1.85,n.z);b.lastGreet=-Infinity;decide('greet');__v97NearestThreat=()=>({g:{position:{x:n.x+1,z:n.z}}});b.action='patrol';decide('alert');decide('flee');
    if(seen.size!==15)throw Error('Unreachable indoor behaviors '+[...seen]);return[...seen];
   }finally{_14.copy(old);_x=hour;_66=weather;__v97NearestThreat=threat;b.dangerUntil=0;}
  })()`));
  console.log('PASS per-frame service pins do not reset moving NPCs; shops, magic and quests remain available',await run(`(()=>{
   const positions=new Map(_2h.filter(n=>n.__v99Area).map(n=>[n,{x:n.x,z:n.z}]));__v76PinMerchant();__v78PinNight();__v75Tick(0);
   for(const[n,p]of positions)if(Math.hypot(n.x-p.x,n.z-p.z)>.00001)throw Error('Service pin still active '+n.id);
   const checked=[];for(const role of['merchant','sorcerer']){const n=_2h.find(n=>n.castleService===role),p={x:n.x,z:n.z};if(!__v54OpenCastleService(n))throw Error('Service no longer opens '+role);if(Math.hypot(n.x-p.x,n.z-p.z)>.00001)throw Error('Opening service teleports NPC');if($('rpg-panel').hidden||!$('item-list').children.length)throw Error('Empty service '+role);$('rpg-panel').hidden=true;checked.push(role);}
   for(const q of _bp)if(q.giver&&!_2h.some(n=>n.id===q.giver))throw Error('Missing quest giver '+q.giver);return{services:checked,questGivers:_bp.length};})()`));
  assert.deepEqual(errors,[]);console.log('PASS no browser exceptions');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e.stack);process.exitCode=1});
