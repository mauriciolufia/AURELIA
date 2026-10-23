const{chromium}=require('playwright'),fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{
 const root=path.resolve(__dirname,'..'),mobile=process.argv.includes('--mobile'),errors=[];
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8').replace('const _ix=_7q();',`const __render106=_5.render.bind(_5),__raf106=requestAnimationFrame;_5.render=()=>{};window.requestAnimationFrame=cb=>cb===frame?0:__raf106(cb);window.__test106=s=>eval(s);const _ix=_7q();`);
 const server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(html);});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
  browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--js-flags=--max-old-space-size=4096']});
  const page=await browser.newPage(mobile?{viewport:{width:844,height:390},isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/142.0.0.0 Mobile Safari/537.36'}:{viewport:{width:960,height:540}});page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded',timeout:180000});await page.waitForFunction(()=>window.__test106&&(!document.getElementById('ag-start').disabled||!document.getElementById('ag-error').hidden),null,{timeout:240000});assert.equal(await page.locator('#ag-error').isVisible(),false,await page.locator('#ag-error').textContent());await page.click('#ag-start');const run=s=>page.evaluate(s=>window.__test106(s),s);await run('active=false;');
  console.log('PASS all fortress floors readable by day and night, unchanged textures/resolution and fixed light budget',await run(`(()=>{
   const old=_14.clone(),hour=_x,eb=_eb,pixel=_5.getPixelRatio(),textures=[...__v85.textures.values()].map(t=>t.image.width).join(','),lights=[];_6.traverse(o=>{if(o.isLight)lights.push(o);});const count=lights.length;
   let samples=0;for(const a of __v83.areas){const c=a.plan103?a.plan103.rooms.find(r=>r.main):null,p=c?{x:a.x+c.x,z:a.z+c.z}:__v83Point(a,a.plan95?.centers?.[1]||a.design.centers[0]);_14.set(p.x,a.y+1.85,p.z);_eb=a.key==='crypt'||!!a.tower94&&a.tower94===__v102Solar;
    if(!__v75At())throw Error('Unrecognized floor '+a.key);
    for(const hour of[12,0]){_x=hour;for(let i=0;i<45;i++){_10+=.04;_fk();}const s=__AURELIA_LIGHTING106__.audit();if(s.blend<.999||Math.abs(s.exposure/s.outdoor.exposure-.91)>.001||s.hemisphere<1.40||s.hemisphere>1.44)throw Error('Unreadable/mis-scaled lighting '+a.key+' '+JSON.stringify(s));samples++;}
   }
   _14.copy(old);_x=hour;_eb=eb;for(let i=0;i<45;i++){_10+=.04;_fk();}const s=__AURELIA_LIGHTING106__.audit();if(s.blend!==0||s.exposure!==s.outdoor.exposure)throw Error('Outdoor lighting not restored');let after=0;_6.traverse(o=>{if(o.isLight)after++;});if(after!==count||_5.getPixelRatio()!==pixel||[...__v85.textures.values()].map(t=>t.image.width).join(',')!==textures||__v85.lights.length!==(${mobile}?3:6))throw Error('Changed light budget or image quality');return{floors:__v83.areas.length,samples,torchPool:__v85.lights.length,extraLights:after-count};
  })()`));
  console.log('PASS curse and Divine Light retain their effects, and torch relocation fades without extra shadows',await run(`(()=>{
   const a=__v83.areas.find(a=>a.torches?.fixtures.length),old=_14.clone(),dark=[...__v75Save.dark],lit=[...__v75Save.lit],p=__v83Point(a,a.plan95?.centers?.[1]||a.design.centers[0]);_14.set(p.x,a.y+1.85,p.z);
   __v75Save.dark=[...new Set([...dark,a.key])];__v75Save.lit=lit.filter(k=>k!==a.key);__v102Performance.dark=null;__v75DarkView();__v106TorchLight(.04);if(!_5.domElement.style.filter.includes('0.14')||__v85.lights.some(l=>l.intensity!==0))throw Error('Curse bypassed');
   __v75Save.lit.push(a.key);__v75DarkView();if(_5.domElement.style.filter)throw Error('Divine Light does not restore normal lighting');const l=__v85.lights[0];l.position.set(p.x,a.y+3,p.z);for(let i=0;i<40;i++){l.intensity=48;__v106TorchLight(.04);}const power=l.intensity;if(power<30||power>36||l.castShadow)throw Error('Unbounded or missing torch');const previous=l.position.clone();l.position.x+=20;l.intensity=48;__v106TorchLight(.04);if(!l.position.equals(previous)||l.intensity>=power)throw Error('Torch jumps instead of fading');const desired=__v106Lighting.torchStates.get(l).targetPosition.clone();for(let i=0;i<40;i++)__v106TorchLight(.04,false);if(!l.position.equals(desired)||l.intensity<30)throw Error('Cached torch relocation never settles');
   __v75Save.dark=dark;__v75Save.lit=lit;_14.copy(old);__v102Performance.dark=null;__v75DarkView();return{darkBrightness:.14,torchPeak:power,rayTracing:false};
  })()`));
  await run("__aurSetCameraMode('first');__aurUpdatePlayerAvatar(.04);__v85Demo.active=true;");
  const out='/tmp/aurelia-106';fs.mkdirSync(out,{recursive:true});
  for(const theme of mobile?['ice']:['ice','corsair','volcano']){
   for(const mode of['before','after']){
    await run(`(()=>{const a=${theme==='volcano'?'__v103.areas[0]':theme==='ice'?'__v94Ice.areas[0]':'__v94Corsair.areas[0]'},r=a.plan103?.rooms.find(r=>r.main),c=r?[r.x,r.z]:a.plan95.centers[1],p=r?{x:a.x+c[0],z:a.z+c[1]}:__v83Point(a,c);_14.set(p.x,a.y+1.85,p.z);_eb=false;_x=12;_bg(true);_bl();__v93Visibility();__v103Visibility();if(a.root)a.root.visible=true;const next=r?[r.x+10,r.z]:a.plan95.centers[2],aim=r?{x:a.x+next[0],z:a.z+next[1]}:__v83Point(a,next);_7.lookAt(aim.x,a.y+1.9,aim.z);__v75Save.dark=__v75Save.dark.filter(k=>k!==a.key);__v102Performance.dark=null;__v75DarkView();for(let i=0;i<45;i++){_10+=.04;${mode==='after'?'_fk()':'__v106Environment()'};__v75Tick(.04);}__render106(_6,_7);})()`);
    await page.locator('canvas').first().screenshot({path:path.join(out,theme+'-'+(mobile?'mobile-':'')+mode+'.png'),timeout:120000});
   }
  }
  assert.deepEqual(errors,[]);console.log('PASS raster rendering without browser errors',mobile?'mobile':'PC');
 }finally{await browser?.close();await new Promise(r=>server.close(r));}
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
