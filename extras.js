/* extras.js: 2ショット・メンバー・落ち葉強化（データキーには触らない。位置は yz_ui_pos_v1 のみ） */
(function(){
const KEY="yz_ui_pos_v1",$=id=>document.getElementById(id);
const css=`#yzx{position:fixed;z-index:40;right:10px;bottom:calc(92px + env(safe-area-inset-bottom));display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 8px;border-radius:18px;background:rgba(255,255,255,.82);backdrop-filter:blur(6px);box-shadow:0 6px 20px #ff5f8f44;border:3px solid #fff;touch-action:auto;max-width:92vw}
#yzx.edit{outline:3px dashed #ff5f8f;touch-action:none;cursor:grab}
#yzx .ts{width:90px;height:90px;border-radius:50%;object-fit:cover;border:3px solid #fff;box-shadow:0 0 0 3px #ff9ab8,0 6px 16px #0003}
#yzx .mem{display:flex;gap:6px}#yzx .mem div{text-align:center;font-size:9px;font-weight:bold;color:#7a3a55}
#yzx .mem span{display:flex;width:26px;height:26px;border-radius:50%;align-items:center;justify-content:center;font-size:15px;background:#fff;box-shadow:0 0 0 3px var(--r);margin:0 auto 3px}
#yzx .ctl{display:flex;gap:4px;flex-wrap:wrap;justify-content:center}#yzx .ctl button,#yzx select{width:auto;margin:0;font-size:10px;padding:2px 6px;border-radius:12px;border:1px solid #ff9ab8;background:#fff;color:#c0306a}
#yzx .pill{display:none;border:0;background:none;font-size:13px;font-weight:bold;color:#c0306a;padding:2px 6px}#yzx.mini{position:fixed!important;left:auto!important;top:auto!important;right:10px!important;bottom:calc(92px + env(safe-area-inset-bottom))!important;transform:none!important;width:auto!important;height:32px!important;min-height:0!important;max-height:32px!important;min-width:0!important;padding:0 12px!important;border-radius:16px!important;overflow:hidden!important;justify-content:center!important;gap:0!important;border-width:2px!important;backdrop-filter:none!important;background:#fff!important}#yzx.mini .pill{line-height:28px;padding:0!important;margin:0!important;width:auto!important;height:28px!important}#yzx.mini>*{display:none!important}#yzx.mini .pill{display:block!important}header .av{position:absolute;margin:0;gap:6px;z-index:6}header .av .ph,header .av img{width:34px!important;height:34px!important;font-size:16px!important;border-width:2px!important}header .av label{font-size:9px}header.hv-bl .av{left:10px;bottom:64px}header.hv-br .av{right:10px;bottom:64px}header.hv-tl .av{left:10px;top:calc(env(safe-area-inset-top) + 70px)}header.hv-tr .av{right:10px;top:calc(env(safe-area-inset-top) + 62px)}header .vb{position:absolute;right:10px;bottom:10px;margin:0;height:30px;font-size:12px;padding:0 12px}header .dr{margin-top:auto}
#yzx.inset{position:static!important;transform:none!important;margin:10px auto 0;box-shadow:none;border:2px solid #ffd1dc}#yzx.inset .pill,#yzx.inset [data-a=mini],#yzx.inset [data-a=pre]{display:none!important}#yzleaf{position:fixed;inset:0;pointer-events:none;z-index:16;overflow:hidden}
#yzleaf i{position:absolute;top:-60px;font-style:normal;animation:yzf linear infinite;filter:drop-shadow(0 2px 3px #0003)}
@keyframes yzf{0%{transform:translate(0,0) rotate(0)}25%{transform:translate(30px,27vh) rotate(60deg)}50%{transform:translate(-25px,55vh) rotate(140deg)}75%{transform:translate(25px,82vh) rotate(220deg)}100%{transform:translate(-10px,112vh) rotate(300deg)}}
@media (prefers-reduced-motion:reduce){#yzleaf i{animation:none;display:none}}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
let pos={};try{pos=JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){}
pos=(pos&&typeof pos=="object"&&!Array.isArray(pos))?pos:{};["x","y"].forEach(k=>{if(typeof pos[k]!="number"||!isFinite(pos[k])||pos[k]<0||pos[k]>4000)delete pos[k]});["w","h","s","size","mini"].forEach(k=>delete pos[k]);if(pos.open!==true)delete pos.open;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(pos))}catch(e){}};
const w=document.createElement("div");w.id="yzx";
const mem=[["ゆず💖","👧","#ff9ab8"],["エイジ","👦","#8ec5ff"],["ゆい🌸","🌸","#ffc2d4"],["ゆか🍊","🍊","#ffc77a"]];
w.innerHTML=`<button class="pill" data-a="mini">💕 みんな</button><img class="ts" alt="ゆずとエイジ"><div class="mem">${mem.map(m=>`<div><span style="--r:${m[2]}">${m[1]}</span>${m[0]}</div>`).join("")}</div><div class="ctl"><button data-a="edit">✋ 位置を動かす</button><select data-a="pre"><option value="">📍 場所</option><option>左上</option><option>右上</option><option>中央</option><option>左下</option><option>右下</option></select><select data-a="hav"><option value="">👤 上のアイコン</option><option value="tl">左上</option><option value="tr">右上</option><option value="bl">左下</option><option value="br">右下</option></select><button data-a="mini">－ たたむ</button><button data-a="reset">初期位置に戻す</button></div><div id="yzsel" style="display:none;font-size:10px;color:#c0306a;text-align:center"></div>`;
(function place(){const h=document.getElementById("yzhow");if(h){h.appendChild(w);w.classList.add("inset");pos.open=true}else setTimeout(place,300)})();
const img=w.querySelector(".ts");const cp=localStorage.getItem("yz_avatar_couple");img.src=cp||"img/twoshot.svg";
function apply(){if(w.classList.contains("inset")){const hd=document.querySelector("header");if(hd){hd.classList.remove("hv-bl","hv-br","hv-tl","hv-tr");hd.classList.add("hv-"+(pos.hav||"tr"))}w.classList.remove("mini");return}const hd=document.querySelector("header");if(hd){hd.classList.remove("hv-bl","hv-br","hv-tl","hv-tr");hd.classList.add("hv-"+(pos.hav||"tr"))}if(!pos.open){w.style.left=w.style.top=w.style.transform=w.style.width=w.style.height="";w.classList.add("mini");return}if(pos.x!=null){const r=w.getBoundingClientRect();const x=Math.max(0,Math.min(innerWidth-r.width,pos.x)),y=Math.max(0,Math.min(innerHeight-r.height,pos.y));w.style.left=x+"px";w.style.top=y+"px";w.style.transform="none"}else{w.style.left="";w.style.top="";w.style.transform=""}w.classList.toggle("mini",!pos.open)}
apply();addEventListener("resize",apply);
let edit=false,d=null;
w.addEventListener("click",e=>{const a=e.target.dataset&&e.target.dataset.a;if(a=="edit"){edit=!edit;w.classList.toggle("edit",edit);e.target.textContent=edit?"✅ 完了":"✋ 位置を動かす";window.yzEdit=edit;document.dispatchEvent(new Event("yzedit"))}else if(a=="mini"){if(w.classList.contains('inset'))return;pos.open=!pos.open;delete pos.x;delete pos.y;save();apply()}else if(a=="reset"){const m=pos.open;pos={};if(m)pos.open=m;save();apply()}});
w.querySelector("[data-a=hav]").onchange=e=>{if(e.target.value){pos.hav=e.target.value;save();apply()}e.target.value=""};
w.querySelector("[data-a=pre]").onchange=e=>{const v=e.target.value;if(!v)return;const r=w.getBoundingClientRect(),m=10,W=innerWidth-r.width,H=innerHeight-r.height;const P={"左上":[m,m],"右上":[W-m,m],"中央":[W/2,H/2],"左下":[m,H-90],"右下":[W-m,H-90]}[v];pos.x=P[0];pos.y=P[1];save();apply();e.target.value=""};
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
/* 4人のアイコン枠（ゆい・ゆか追加）・ゆずの声ボタン非表示・設定ガイド */
(function(){
const s=document.createElement("style");s.textContent=`header .vb,#voiceB{display:none!important}
.av label{position:relative}.av .ph::after{content:"📷";position:absolute;right:-4px;top:-4px;font-size:11px;background:#fff;border-radius:50%;width:16px;height:16px;line-height:16px;text-align:center;box-shadow:0 1px 3px #0003}
.av .ph{position:relative}header .av .yzhint{position:absolute;left:0;right:0;top:100%;margin-top:2px;font-size:9px;white-space:nowrap;text-align:center;color:#fff;text-shadow:0 1px 3px #e85d88}
header .av{flex-wrap:nowrap}`;document.head.appendChild(s);
const av=document.querySelector("header .av");if(!av)return;
const EM={yui:"🌸",yuka:"🍊"};
function show(k){const el=document.getElementById("av_"+k),d=localStorage.getItem("yz_avatar_"+k);let n;if(d){n=document.createElement("img");n.src=d}else{n=document.createElement("span");n.className="ph";n.textContent=EM[k]}n.id="av_"+k;el.replaceWith(n);hint()}
[["yui","ゆい"],["yuka","ゆか"]].forEach(([k,nm])=>{if(document.getElementById("av_"+k))return;const l=document.createElement("label");l.innerHTML=`<span id="av_${k}" class="ph"></span>${nm}<input type="file" accept="image/*" data-k="${k}" style="display:none">`;av.appendChild(l);
 const inp=l.querySelector("input");inp.onchange=()=>{const f=inp.files[0];if(!f)return;const img=new Image();img.onload=()=>{const c=document.createElement("canvas");c.width=c.height=200;const m=Math.min(img.width,img.height);c.getContext("2d").drawImage(img,(img.width-m)/2,(img.height-m)/2,m,m,0,0,200,200);try{localStorage.setItem("yz_avatar_"+k,c.toDataURL("image/jpeg",0.85))}catch(e){alert("保存できませんでした")}show(k);URL.revokeObjectURL(img.src);inp.value=""};img.src=URL.createObjectURL(f)};show(k)});
function hint(){let h=av.querySelector(".yzhint");const empty=av.querySelector(".ph");if(empty&&!h){h=document.createElement("div");h.className="yzhint";h.textContent="📷 タップで写真をえらんでね";av.appendChild(h)}else if(!empty&&h)h.remove()}
new MutationObserver(hint).observe(av,{childList:true,subtree:true});hint();
const set=document.getElementById("t-set");if(set&&!document.getElementById("yzhow")){const c=document.createElement("div");c.className="card";c.id="yzhow";c.innerHTML=`<h2>📷 みんなのアイコン写真</h2><div class="small">いちばん上の丸いアイコン（エイジ・ふたり・ゆず・ゆい・ゆか）を<b>タップ</b>→写真をえらぶ→丸い枠の中で指で動かす・2本ゆびで拡大→「決定」で保存だよ。<b>長押し</b>したまま指を動かすと、上の写真の中で好きな場所に動かせるよ♡ 下のボタンで大きさ変更や初期位置に戻すこともできるよ。</div>`;set.insertBefore(c,set.firstChild)}
})();

/* 4人のアイコンを1つずつ動かす・大きさ変更・リセット（yz_ui_pos_v1 の av のみ） */
(function(){
const KEY="yz_ui_pos_v1",NM={eiji:"エイジ",couple:"ふたり",yuzu:"ゆず",yui:"ゆい",yuka:"ゆか"};
const ld=()=>{try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){return{}}};
const sv=f=>{const p=ld();p.av=p.av||{};f(p.av);try{localStorage.setItem(KEY,JSON.stringify(p))}catch(e){}};
const lab=k=>{const el=document.getElementById("av_"+k);return el&&el.closest("label")};
function ap(){const A=ld().av||{};Object.keys(NM).forEach(k=>{const l=lab(k);if(!l)return;const v=A[k]||{};l.style.transform=`translate(${v.x||0}px,${v.y||0}px) scale(${v.s||1})`;l.style.zIndex=v.x||v.y?7:""})}
let sel=null,d=null;const box=document.getElementById("yzsel");
function ui(){if(!box)return;box.style.display=window.yzEdit?"block":"none";box.innerHTML=sel?`えらんだ: <b>${NM[sel]}</b> <button data-b="+">＋大きく</button><button data-b="-">－小さく</button><button data-b="r">↺ この子を戻す</button>`:"上のアイコンを指で動かしてね（タップでえらぶ）";document.querySelectorAll("header .av label").forEach(l=>l.style.outline=window.yzEdit?(l===lab(sel)?"2px solid #ff4f86":"1px dashed #fff"):"")}
box&&box.addEventListener("click",e=>{const b=e.target.dataset.b;if(!b||!sel)return;sv(A=>{const v=A[sel]=A[sel]||{};if(b=="+")v.s=Math.min(2.5,(v.s||1)+.2);if(b=="-")v.s=Math.max(.5,(v.s||1)-.2);if(b=="r")delete A[sel]});ap()});
const av=document.querySelector("header .av");
if(av){av.addEventListener("click",e=>{if(window.yzEdit){e.preventDefault();e.stopPropagation()}},true);
av.addEventListener("pointerdown",e=>{if(!window.yzEdit)return;const l=e.target.closest("label");if(!l)return;const k=(l.querySelector("[id^=av_]")||{}).id;if(!k)return;sel=k.slice(3);const v=(ld().av||{})[sel]||{};d={l,sx:e.clientX-(v.x||0),sy:e.clientY-(v.y||0)};l.setPointerCapture(e.pointerId);e.preventDefault();ui()});
av.addEventListener("pointermove",e=>{if(!d)return;const x=Math.max(-innerWidth+40,Math.min(innerWidth-40,e.clientX-d.sx)),y=Math.max(-60,Math.min(innerHeight-80,e.clientY-d.sy));sv(A=>{const v=A[sel]=A[sel]||{};v.x=x;v.y=y});ap()});
const end=()=>{d=null};av.addEventListener("pointerup",end);av.addEventListener("pointercancel",end)}
document.addEventListener("yzedit",()=>{if(!window.yzEdit)sel=null;if(av)av.style.touchAction=window.yzEdit?"none":"";ui()});
// 全体の「初期位置に戻す」で4人も戻す
document.querySelector('#yzx [data-a=reset]')?.addEventListener("click",()=>{sv(A=>{for(const k in A)delete A[k]});ap()});
new MutationObserver(ap).observe(av||document.body,{childList:true,subtree:true});ap();ui();
// パネルのメンバー欄も写真を使う
const mp={"ゆず💖":"yuzu","エイジ":"eiji","ゆい🌸":"yui","ゆか🍊":"yuka"};document.querySelectorAll("#yzx .mem div").forEach(dv=>{const k=mp[dv.lastChild.textContent];const ph=k&&localStorage.getItem("yz_avatar_"+k);if(ph){const sp=dv.querySelector("span");sp.innerHTML=`<img src="${ph}" style="width:100%;height:100%;border-radius:50%;object-fit:cover">`}});
})();
/* 長押しドラッグ（ヘッダー内）・丸トリミング */
(function(){
const KEY="yz_ui_pos_v1";
const st=document.createElement("style");st.textContent=`header .av img{object-fit:cover!important;border-radius:50%!important}header .av label{-webkit-touch-callout:none;user-select:none;-webkit-user-select:none}header .av label.drag{opacity:.85;filter:drop-shadow(0 4px 8px #0005)}
#yzcrop{position:fixed;inset:0;z-index:2147483500;background:#000c;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;touch-action:none}
#yzcrop canvas{width:300px;height:300px;touch-action:none}#yzcrop .t{color:#fff;font-size:14px}#yzcrop .b{display:flex;gap:12px}#yzcrop button{font-size:16px;padding:10px 22px;border-radius:20px;border:0;font-weight:bold}#yzcrop .ok{background:#ff5f8f;color:#fff}`;document.head.appendChild(st);
const ld=()=>{try{const p=JSON.parse(localStorage.getItem(KEY)||"{}");return p&&typeof p=="object"?p:{}}catch(e){return{}}};
const sv=f=>{const p=ld();p.av=p.av||{};f(p.av);try{localStorage.setItem(KEY,JSON.stringify(p))}catch(e){}};
const hdr=document.querySelector("header"),av=hdr&&hdr.querySelector(".av");if(!av)return;
const key=l=>{const e=l.querySelector("[id^=av_]");return e&&e.id.slice(3)};
let lp=null,drag=null,blockClick=0;
av.addEventListener("pointerdown",e=>{if(window.yzEdit)return;const l=e.target.closest("label");if(!l)return;const k=key(l);if(!k)return;const v=(ld().av||{})[k]||{};
 lp={l,k,x0:e.clientX,y0:e.clientY,vx:v.x||0,vy:v.y||0,s:v.s||1,t:setTimeout(()=>{drag=lp;l.classList.add("drag");if(navigator.vibrate)navigator.vibrate(20)},450)}});
av.addEventListener("pointermove",e=>{if(!lp)return;const dx=e.clientX-lp.x0,dy=e.clientY-lp.y0;if(!drag){if(Math.hypot(dx,dy)>10){clearTimeout(lp.t);lp=null}return}
 const l=drag.l,H=hdr.getBoundingClientRect();l.style.transform=`translate(${drag.vx}px,${drag.vy}px) scale(${drag.s})`;const r=l.getBoundingClientRect();
 let nx=drag.vx+dx,ny=drag.vy+dy;const bx=r.left-drag.vx,by=r.top-drag.vy;nx=Math.max(H.left-bx,Math.min(H.right-r.width-bx,nx));ny=Math.max(H.top-by,Math.min(H.bottom-r.height-by,ny));
 l.style.transform=`translate(${nx}px,${ny}px) scale(${drag.s})`;drag.nx=nx;drag.ny=ny});
const end=()=>{if(lp)clearTimeout(lp.t);if(drag){drag.l.classList.remove("drag");if(drag.nx!=null){const d=drag;sv(A=>{const v=A[d.k]=A[d.k]||{};v.x=d.nx;v.y=d.ny})}blockClick=Date.now()}lp=null;drag=null};
av.addEventListener("pointerup",end);av.addEventListener("pointercancel",end);
av.addEventListener("touchmove",e=>{if(drag)e.preventDefault()},{passive:false});
av.addEventListener("contextmenu",e=>e.preventDefault());
av.addEventListener("click",e=>{if(Date.now()-blockClick<500){e.preventDefault();e.stopPropagation()}},true);
// 丸トリミング
const EM={eiji:"👦",yuzu:"👧",couple:"💑",yui:"🌸",yuka:"🍊"};
function refresh(k){const el=document.getElementById("av_"+k);if(!el)return;const d=localStorage.getItem("yz_avatar_"+k);const n=document.createElement("img");n.id=el.id;n.src=d;n.alt=k;el.replaceWith(n)}
function crop(file,k){const img=new Image(),url=URL.createObjectURL(file);img.onload=()=>{
 const o=document.createElement("div");o.id="yzcrop";o.innerHTML=`<div class="t">ゆびで動かす・2本ゆびで拡大縮小してね♡</div><canvas width="600" height="600"></canvas><input type="range" min="1" max="5" step="0.01" value="1" style="width:260px"><div class="b"><button class="ng">やめる</button><button class="ok">決定</button></div>`;document.body.appendChild(o);
 const c=o.querySelector("canvas"),g=c.getContext("2d"),rg=o.querySelector("input"),S=600,base=S/Math.min(img.width,img.height);let z=1,tx=0,ty=0;
 const clamp=()=>{const mx=(img.width*base*z-S)/2,my=(img.height*base*z-S)/2;tx=Math.max(-mx,Math.min(mx,tx));ty=Math.max(-my,Math.min(my,ty))};
 const draw=(mask=true)=>{clamp();g.fillStyle="#fff";g.fillRect(0,0,S,S);const w=img.width*base*z,h=img.height*base*z;g.drawImage(img,(S-w)/2+tx,(S-h)/2+ty,w,h);if(mask){g.save();g.fillStyle="#000a";g.beginPath();g.rect(0,0,S,S);g.arc(S/2,S/2,S/2-6,0,Math.PI*2,true);g.fill("evenodd");g.strokeStyle="#ff9ab8";g.lineWidth=6;g.beginPath();g.arc(S/2,S/2,S/2-6,0,Math.PI*2);g.stroke();g.restore()}};
 const P=new Map();let pd=0,pz=1;const k2=S/300;
 c.addEventListener("pointerdown",e=>{c.setPointerCapture(e.pointerId);P.set(e.pointerId,[e.clientX,e.clientY]);if(P.size==2){const [a,b]=[...P.values()];pd=Math.hypot(a[0]-b[0],a[1]-b[1]);pz=z}});
 c.addEventListener("pointermove",e=>{if(!P.has(e.pointerId))return;const pr=P.get(e.pointerId);P.set(e.pointerId,[e.clientX,e.clientY]);if(P.size==1){tx+=(e.clientX-pr[0])*k2;ty+=(e.clientY-pr[1])*k2}else if(P.size==2&&pd){const [a,b]=[...P.values()];z=Math.max(1,Math.min(5,pz*Math.hypot(a[0]-b[0],a[1]-b[1])/pd));rg.value=z}draw()});
 const up=e=>{P.delete(e.pointerId);pd=0};c.addEventListener("pointerup",up);c.addEventListener("pointercancel",up);
 c.addEventListener("wheel",e=>{e.preventDefault();z=Math.max(1,Math.min(5,z*(e.deltaY<0?1.1:.9)));rg.value=z;draw()},{passive:false});
 rg.oninput=()=>{z=+rg.value;draw()};draw();
 const close=()=>{o.remove();URL.revokeObjectURL(url)};o.querySelector(".ng").onclick=close;
 o.querySelector(".ok").onclick=()=>{draw(false);const out=document.createElement("canvas");out.width=out.height=256;out.getContext("2d").drawImage(c,0,0,256,256);try{localStorage.setItem("yz_avatar_"+k,out.toDataURL("image/jpeg",0.88))}catch(e){alert("保存できませんでした（容量がいっぱいかも）")}refresh(k);close()}};
 img.src=url}
document.addEventListener("change",e=>{const i=e.target;if(!(i instanceof HTMLInputElement)||i.type!="file"||!i.dataset.k||!i.closest("header .av"))return;e.stopImmediatePropagation();e.stopPropagation();const f=i.files[0];if(f)crop(f,i.dataset.k);i.value=""},true);
})();
