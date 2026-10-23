/* extras.js: 2ショット・メンバー・落ち葉強化（データキーには触らない。位置は yz_ui_pos_v1 のみ） */
(function(){
const KEY="yz_ui_pos_v1",$=id=>document.getElementById(id);
const css=`#yzx{position:fixed;z-index:40;right:10px;bottom:calc(92px + env(safe-area-inset-bottom));display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 8px;border-radius:18px;background:rgba(255,255,255,.82);backdrop-filter:blur(6px);box-shadow:0 6px 20px #ff5f8f44;border:3px solid #fff;touch-action:auto;max-width:92vw}
#yzx.edit{outline:3px dashed #ff5f8f;touch-action:none;cursor:grab}
#yzx .ts{width:90px;height:90px;border-radius:50%;object-fit:cover;border:3px solid #fff;box-shadow:0 0 0 3px #ff9ab8,0 6px 16px #0003}
#yzx .mem{display:flex;gap:6px}#yzx .mem div{text-align:center;font-size:9px;font-weight:bold;color:#7a3a55}
#yzx .mem span{display:flex;width:26px;height:26px;border-radius:50%;align-items:center;justify-content:center;font-size:15px;background:#fff;box-shadow:0 0 0 3px var(--r);margin:0 auto 3px}
#yzx .ctl{display:flex;gap:4px;flex-wrap:wrap;justify-content:center}#yzx .ctl button,#yzx select{width:auto;margin:0;font-size:10px;padding:2px 6px;border-radius:12px;border:1px solid #ff9ab8;background:#fff;color:#c0306a}
#yzx .pill{display:none;border:0;background:none;font-size:13px;font-weight:bold;color:#c0306a;padding:2px 6px}#yzx.mini{padding:6px 12px;border-radius:999px}#yzx.mini>*{display:none!important}#yzx.mini .pill{display:block!important}header .av{position:absolute;margin:0;gap:6px;z-index:6}header .av .ph,header .av img{width:34px!important;height:34px!important;font-size:16px!important;border-width:2px!important}header .av label{font-size:9px}header.hv-bl .av{left:10px;bottom:64px}header.hv-br .av{right:10px;bottom:64px}header.hv-tl .av{left:10px;top:calc(env(safe-area-inset-top) + 70px)}header.hv-tr .av{right:10px;top:calc(env(safe-area-inset-top) + 62px)}header .vb{position:absolute;right:10px;bottom:10px;margin:0;height:30px;font-size:12px;padding:0 12px}header .dr{margin-top:auto}
#yzleaf{position:fixed;inset:0;pointer-events:none;z-index:16;overflow:hidden}
#yzleaf i{position:absolute;top:-60px;font-style:normal;animation:yzf linear infinite;filter:drop-shadow(0 2px 3px #0003)}
@keyframes yzf{0%{transform:translate(0,0) rotate(0)}25%{transform:translate(30px,27vh) rotate(60deg)}50%{transform:translate(-25px,55vh) rotate(140deg)}75%{transform:translate(25px,82vh) rotate(220deg)}100%{transform:translate(-10px,112vh) rotate(300deg)}}
@media (prefers-reduced-motion:reduce){#yzleaf i{animation:none;display:none}}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
let pos={};try{pos=JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(pos))}catch(e){}};
const w=document.createElement("div");w.id="yzx";
const mem=[["ゆず💖","👧","#ff9ab8"],["エイジ","👦","#8ec5ff"],["ゆい🌸","🌸","#ffc2d4"],["ゆか🍊","🍊","#ffc77a"]];
w.innerHTML=`<button class="pill" data-a="mini">💕 みんな</button><img class="ts" alt="ゆずとエイジ"><div class="mem">${mem.map(m=>`<div><span style="--r:${m[2]}">${m[1]}</span>${m[0]}</div>`).join("")}</div><div class="ctl"><button data-a="edit">✋ 位置を動かす</button><select data-a="pre"><option value="">📍 場所</option><option>左上</option><option>右上</option><option>中央</option><option>左下</option><option>右下</option></select><select data-a="hav"><option value="">👤 上のアイコン</option><option value="tl">左上</option><option value="tr">右上</option><option value="bl">左下</option><option value="br">右下</option></select><button data-a="mini">－ たたむ</button><button data-a="reset">初期位置に戻す</button></div>`;
document.body.appendChild(w);
const img=w.querySelector(".ts");const cp=localStorage.getItem("yz_avatar_couple");img.src=cp||"img/twoshot.svg";
function apply(){if(pos.x!=null){const r=w.getBoundingClientRect();const x=Math.max(0,Math.min(innerWidth-r.width,pos.x)),y=Math.max(0,Math.min(innerHeight-r.height,pos.y));w.style.left=x+"px";w.style.top=y+"px";w.style.transform="none"}else{w.style.left="";w.style.top="";w.style.transform=""}w.classList.toggle("mini",!pos.open);const hd=document.querySelector("header");if(hd){hd.classList.remove("hv-bl","hv-br","hv-tl","hv-tr");hd.classList.add("hv-"+(pos.hav||"tr"))}}
apply();addEventListener("resize",apply);
let edit=false,d=null;
w.addEventListener("click",e=>{const a=e.target.dataset&&e.target.dataset.a;if(a=="edit"){edit=!edit;w.classList.toggle("edit",edit);e.target.textContent=edit?"✅ 完了":"✋ 位置を動かす"}else if(a=="mini"){pos.open=!pos.open;delete pos.x;delete pos.y;save();apply()}else if(a=="reset"){const m=pos.open;pos={};if(m)pos.open=m;save();apply()}});
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
const set=document.getElementById("t-set");if(set&&!document.getElementById("yzhow")){const c=document.createElement("div");c.className="card";c.id="yzhow";c.innerHTML=`<h2>📷 みんなのアイコン写真</h2><div class="small">いちばん上の丸いアイコン（エイジ・ふたり・ゆず・ゆい・ゆか）をタップすると写真をえらべるよ。えらんだ写真は自動で丸く切り取られて、このiPhoneに保存されるよ♡ 場所は右下の「💕 みんな」→「👤 上のアイコン」で変えられるよ。</div>`;set.insertBefore(c,set.firstChild)}
})();
