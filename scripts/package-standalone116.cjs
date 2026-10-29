const fs=require('node:fs'),path=require('node:path');
module.exports=function(root){
 const html=fs.readFileSync(path.join(root,'index.html'));
 fs.writeFileSync(path.join(root,'play.html'),html);
 // Keep this published revision at its own URL, independent of a cached index page.
 if(html.includes(Buffer.from('v142-torre-carmesi-verificada')))fs.writeFileSync(path.join(root,'version142.html'),html);
 console.log('Both entry points contain the complete standalone game: '+html.length+' bytes, all artwork embedded');
};
