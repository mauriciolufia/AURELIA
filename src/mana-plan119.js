/* The former discounted cost is tripled before the level curve is applied. */
function __v119ManaPlan(records){
 const minimum=15,maximum=500,costs=Array(61).fill(0),floors=Array(61).fill(0);
 for(const r of records){const level=Math.max(1,Math.min(60,Math.round(Number(r.level)||1)));if(Number.isFinite(r.raw)&&r.raw>=0)floors[level]=Math.max(floors[level],r.raw*3/4);}
 for(let level=1;level<=60;level++){
  const curve=minimum*Math.pow(maximum/minimum,(level-1)/59),previous=level===1?minimum:costs[level-1]+1;
  costs[level]=Math.min(maximum,Math.ceil(Math.max(curve,floors[level],previous)-1e-9));
 }
 costs[60]=maximum;return costs;
}
if(typeof module!=='undefined'&&module.exports)module.exports=__v119ManaPlan;
