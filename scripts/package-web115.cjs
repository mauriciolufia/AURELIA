const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),zlib=require('node:zlib');
module.exports=function(root){
 const file=path.join(root,'index.html'),original=fs.readFileSync(file,'utf8'),optimized=JSON.parse(fs.readFileSync(path.join(root,'src/artwork115.json'))),resources=[];let web=original;
 // v72 replaced these old maps, except the illustrated mural in slot seven. The complete HTML retains every fallback.
 for(const name of ['__v31TexturePixels','__v40ArchPixels'])web=web.replace(new RegExp('(const '+name+'=)(.*?)(;\\n)'),(_,begin,data,end)=>begin+JSON.stringify(Object.fromEntries(Object.entries(JSON.parse(data)).map(([key,slots])=>[key,slots.map((value,index)=>index===6?value:null)])))+end);
 const blueprintsAt=web.indexOf('const __v103Blueprints=');
 web=web.replace(/data:image\/(png|jpeg);base64,([A-Za-z0-9+/=]+)/g,(url,type,encoded,offset)=>{
  const bytes=Buffer.from(encoded,'base64'),sha=crypto.createHash('sha256').update(bytes).digest('hex'),alternate=optimized[sha],name=alternate?.file||'assets/game115/'+sha.slice(0,20)+(type==='jpeg'?'.jpg':'.png');
  if(!alternate)fs.writeFileSync(path.join(root,name),bytes);else if(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,name))).digest('hex')!==alternate.sha256)throw Error('Invalid optimized texture '+name);
  resources.push({file:name,bytes:alternate?.optimizedBytes??bytes.length,originalSha256:sha,startup:offset<blueprintsAt,lossless:true});return name;
 });
 web=web.replace(/<script id="aurelia-web115-redirect">[\s\S]*?<\/script>/,'');
 const startup=resources.filter(r=>r.startup),preloads=startup.map(r=>'<link rel="preload" as="'+(r.file.endsWith('.webp')?'image':'fetch')+'" href="'+r.file+'" crossorigin="anonymous">').join('');
 web=web.replace('<head>','<head><script>window.__AURELIA_WEB115__=true;</script>'+preloads);
 fs.writeFileSync(path.join(root,'play.html'),web);
 const manifest={version:115,completeBytes:Buffer.byteLength(original),completeGzipBytes:zlib.gzipSync(original,{level:9}).length,webBytes:Buffer.byteLength(web),webGzipBytes:zlib.gzipSync(web,{level:9}).length,sha256:crypto.createHash('sha256').update(web).digest('hex'),resources};
 manifest.initialDownloadBytes=manifest.webGzipBytes+startup.reduce((n,r)=>n+r.bytes,0);fs.writeFileSync(path.join(root,'assets/game115/manifest.json'),JSON.stringify(manifest,null,2)+'\n');
 console.log('Web edition: '+manifest.webGzipBytes+' bytes compressed HTML; '+manifest.initialDownloadBytes+' bytes including all initial textures vs '+manifest.completeGzipBytes+' previously');
};
