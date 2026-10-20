const fs=require('fs'),vm=require('vm'),assert=require('assert');
const s=fs.readFileSync(require('path').resolve(__dirname,'../index.html'),'utf8');
const body=s.slice(s.indexOf('function __v95Plan('),s.indexOf('function __v95RemoveArea('));
const ctx={__v95Ring:r=>[[r[0],r[1]],[r[2],r[1]],[r[2],r[3]],[r[0],r[3]]],__v94Hole:st=>[[st.x-2.4,st.z1-7],[st.x+2.4,st.z1-7],[st.x+2.4,st.z1+1],[st.x-2.4,st.z1+1]]};vm.createContext(ctx);vm.runInContext(body,ctx);
for(const [key,theme,count] of [['ice','ice',3],['candy','candy',5],['corsair','corsair',3],['maya','maya',2],['polar95','polar95',2],['crypt','sun',1]])for(let index=0;index<count;index++){
 const a={key:key==='crypt'?'crypt':key+index,__v92Maya:key==='maya',tower94:key!=='crypt'&&key!=='maya'?{id:theme,flights:[]}:null};
 const p=ctx.__v95Plan(a,index,count);
 const blocked=(x,z,omit=-1)=>p.walls.some(([x1,z1,x2,z2])=>Math.abs(x-(x1+x2)/2)<Math.abs(x2-x1)/2+.7&&Math.abs(z-(z1+z2)/2)<Math.abs(z2-z1)/2+.7)||(omit>=0&&x>p.rects[omit][0]&&x<p.rects[omit][2]&&z>p.rects[omit][1]&&z<p.rects[omit][3]);
 const visit=omit=>{const q=[[...p.centers[0]]],seen=new Set([q[0].join(',')]);for(let i=0;i<q.length;i++){const [x,z]=q[i];for(const [dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const xx=x+dx,zz=z+dz,k=xx+','+zz;if(Math.abs(xx)>p.b||Math.abs(zz)>p.b||seen.has(k)||blocked(xx,zz,omit))continue;seen.add(k);q.push([xx,zz]);}}return seen;};
 const reached=visit(-1);for(let i=0;i<9;i++)assert(reached.has(p.centers[i].join(',')),`${key}/${index} room ${i} unreachable`);
 for(let i=1;i<6;i++)assert(!visit(i).has(p.centers[6].join(',')),`${key}/${index} room ${i} bypassable`);
 console.log('PASS',key,index+1,'9 rooms reachable; each intermediate main room mandatory');
}
