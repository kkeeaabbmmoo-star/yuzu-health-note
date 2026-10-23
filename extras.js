/* extras.js: 2ショット・メンバー・落ち葉強化（データキーには触らない。位置は yz_ui_pos_v1 のみ） */
(function(){
const KEY="yz_ui_pos_v1",$=id=>document.getElementById(id);
const css=`#yzx{position:fixed;z-index:40;left:50%;top:150px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 12px;border-radius:24px;background:rgba(255,255,255,.82);backdrop-filter:blur(6px);box-shadow:0 6px 20px #ff5f8f44;border:3px solid #fff;touch-action:auto;max-width:92vw}
#yzx.edit{outline:3px dashed #ff5f8f;touch-action:none;cursor:grab}
#yzx .ts{width:150px;height:150px;border-radius:50%;object-fit:cover;border:5px solid #fff;box-shadow:0 0 0 4px #ff9ab8,0 6px 16px #0003}
#yzx .mem{display:flex;gap:10px}#yzx .mem div{text-align:center;font-size:11px;font-weight:bold;color:#7a3a55}
#yzx .mem span{display:flex;width:42px;height:42px;border-radius:50%;align-items:center;justify-content:center;font-size:24px;background:#fff;box-shadow:0 0 0 3px var(--r);margin:0 auto 3px}
#yzx .ctl{display:flex;gap:4px;flex-wrap:wrap;justify-content:center}#yzx .ctl button,#yzx select{width:auto;margin:0;font-size:11px;padding:3px 7px;border-radius:12px;border:1px solid #ff9ab8;background:#fff;color:#c0306a}
#yzx.mini .ts,#yzx.mini .mem{display:none}
#yzleaf{position:fixed;inset:0;pointer-events:none;z-index:16;overflow:hidden}
#yzleaf i{position:absolute;top:-60px;font-style:normal;animation:yzf linear infinite;filter:drop-shadow(0 2px 3px #0003)}
@keyframes yzf{0%{transform:translate(0,0) rotate(0)}25%{transform:translate(30px,27vh) rotate(60deg)}50%{transform:translate(-25px,55vh) rotate(140deg)}75%{transform:translate(25px,82vh) rotate(220deg)}100%{transform:translate(-10px,112vh) rotate(300deg)}}
@media (prefers-reduced-motion:reduce){#yzleaf i{animation:none;display:none}}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
let pos={};try{pos=JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(pos))}catch(e){}};
const w=document.createElement("div");w.id="yzx";
const mem=[["ゆず💖","👧","#ff9ab8"],["エイジ","👦","#8ec5ff"],["ゆい🌸","🌸","#ffc2d4"],["ゆか🍊","🍊","#ffc77a"]];
w.innerHTML=`<img class="ts" alt="ゆずとエイジ"><div class="mem">${mem.map(m=>`<div><span style="--r:${m[2]}">${m[1]}</span>${m[0]}</div>`).join("")}</div><div class="ctl"><button data-a="edit">✋ 位置を動かす</button><select data-a="pre"><option value="">📍 場所</option><option>左上</option><option>右上</option><option>中央</option><option>左下</option><option>右下</option></select><button data-a="mini">－ 小さく</button><button data-a="reset">初期位置に戻す</button></div>`;
document.body.appendChild(w);
const img=w.querySelector(".ts");const cp=localStorage.getItem("yz_avatar_couple");img.src=cp||"img/twoshot.svg";
function apply(){if(pos.x!=null){const r=w.getBoundingClientRect();const x=Math.max(0,Math.min(innerWidth-r.width,pos.x)),y=Math.max(0,Math.min(innerHeight-r.height,pos.y));w.style.left=x+"px";w.style.top=y+"px";w.style.transform="none"}else{w.style.left="50%";w.style.top="150px";w.style.transform="translateX(-50%)"}w.classList.toggle("mini",!!pos.mini);w.querySelector('[data-a=mini]').textContent=pos.mini?"＋ 大きく":"－ 小さく"}
apply();addEventListener("resize",apply);
let edit=false,d=null;
w.addEventListener("click",e=>{const a=e.target.dataset&&e.target.dataset.a;if(a=="edit"){edit=!edit;w.classList.toggle("edit",edit);e.target.textContent=edit?"✅ 完了":"✋ 位置を動かす"}else if(a=="mini"){pos.mini=!pos.mini;save();apply()}else if(a=="reset"){const m=pos.mini;pos={};if(m)pos.mini=m;save();apply()}});
w.querySelector("select").onchange=e=>{const v=e.target.value;if(!v)return;const r=w.getBoundingClientRect(),m=10,W=innerWidth-r.width,H=innerHeight-r.height;const P={"左上":[m,m],"右上":[W-m,m],"中央":[W/2,H/2],"左下":[m,H-90],"右下":[W-m,H-90]}[v];pos.x=P[0];pos.y=P[1];save();apply();e.target.value=""};
w.addEventListener("pointerdown",e=>{if(!edit||/BUTTON|SELECT|OPTION/.test(e.target.tagName))return;const r=w.getBoundingClientRect();d={dx:e.clientX-r.left,dy:e.clientY-r.top};w.setPointerCapture(e.pointerId);e.preventDefault()});
w.addEventListener("pointermove",e=>{if(!d)return;pos.x=e.clientX-d.dx;pos.y=e.clientY-d.dy;apply()});
const end=()=>{if(d){d=null;save()}};w.addEventListener("pointerup",end);w.addEventListener("pointercancel",end);
// 落ち葉（季節のフレームがONの時だけ）
const L=document.createElement("div");L.id="yzleaf";document.body.appendChild(L);let lm=-1;
const set={9:["🍁","🍂","🌰"],10:["🍁","🍂","🍁"],11:["🍁","🍂","🍂"],12:["❄️","🍂"],1:["❄️"],2:["❄️","🌸"],3:["🌸"],4:["🌸","🌸"],5:["🍃"],6:["💧"],7:["🍃"],8:["✨"]};
const col=["hue-rotate(0deg) saturate(1.4)","hue-rotate(-15deg) saturate(1.6)","hue-rotate(25deg) saturate(1.5)"];
function leaves(){const s=$("sfr"),on=s&&s.classList.contains("on"),m=on?(+s.dataset.m||new Date().getMonth()+1):0;if(m===lm)return;lm=m;L.innerHTML="";if(!m)return;const e=set[m]||["🍁"];let h="";for(let i=0;i<18;i++){const ch=m>=9&&m<=11&&i%3==2?"<b style='color:#f2c230'>🍂</b>":e[i%e.length];h+=`<i style="left:${Math.random()*96}vw;font-size:${22+Math.random()*20}px;animation-duration:${9+Math.random()*9}s;animation-delay:${-Math.random()*16}s;opacity:${.75+Math.random()*.25};filter:${col[i%3]} drop-shadow(0 2px 3px #0003)">${ch}</i>`}L.innerHTML=h}
leaves();setInterval(leaves,1500);
})();
