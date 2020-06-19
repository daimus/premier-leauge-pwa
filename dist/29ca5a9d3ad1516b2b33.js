(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{20:function(t,e,n){"use strict";n.r(e),n.d(e,"open",(function(){return l})),n.d(e,"close",(function(){return u}));n(26),n(41);var r=n(22),a=n.n(r),o=n(23),s=n(25);class i extends HTMLElement{constructor(){super()}connectedCallback(){}disconnectedCallback(){}attributeChangedCallback(){}adoptedCallback(){}set items(t){this._items=t,this.render()}render(){let t=this,e="";this._items.forEach(t=>{e+=`<tr class="spacer">\n                <td colspan="10"></td>\n            </tr>\n            <tr class="highlighted">\n                <td>${t.position}</td>\n                <td><a href="/#/team/${t.team.id}"><img src="${t.team.crestUrl}" alt="${t.team.name}" class="team-crest" />${t.team.name}</a> <button class="btn-flat tooltipped" data-position="bottom" data-tooltip="Follow ${t.team.name}" data-teamid="${t.team.id}"></button> </td>\n                <td>${t.playedGames}</td>\n                <td>${t.won}</td>\n                <td>${t.draw}</td>\n                <td>${t.lost}</td>\n                <td>${t.goalsFor}</td>\n                <td>${t.goalsAgainst}</td>\n                <td>${t.goalDifference}</td>\n                <td>${t.points}</td>\n            </tr>`}),this.innerHTML=`<div style="overflow-x:auto">\n        <table class="classement-table">\n            <thead>\n                <tr>\n                    <th>#</th>\n                    <th>Club</th>\n                    <th>P</th>\n                    <th>W</th>\n                    <th>D</th>\n                    <th>L</th>\n                    <th>GF</th>\n                    <th>GA</th>\n                    <th>GD</th>\n                    <th>PTS</th>\n                </tr>\n            </thead>\n            <tbody>\n                ${e}\n            </tbody>\n        </table>\n        </div>`;const n=document.querySelectorAll(".tooltipped");M.Tooltip.init(n);for(let e=0;e<n.length;e++){const r=parseInt(n[e].getAttribute("data-teamid"));Object(s.c)(r).then(i=>{void 0!==i?(n[e].innerHTML='<i class="material-icons color-success">playlist_add_check</i>',n[e].setAttribute("data-tooltip","Unfollow "+i.name),n[e].addEventListener("click",()=>{n[e].innerHTML=a.a,Object(s.b)(r).then(e=>{M.toast({html:`You're not following ${i.name} anymore`}),t.render()}).catch(t=>{M.toast({html:"Error happen when unfollow team 🙁"}),n[e].innerHTML='<i class="material-icons color-success">playlist_add_check</i>'})})):(n[e].innerHTML='<i class="material-icons color-primary">playlist_add</i>',n[e].addEventListener("click",()=>{n[e].innerHTML=a.a,Object(o.d)(r).then(e=>{Object(s.a)(e).then(n=>{M.toast({html:`You're following ${e.name} 😎`}),t.render()})}).catch(t=>{M.toast({html:"Please connect the internet to follow team 😉"}),n[e].innerHTML='<i class="material-icons color-primary">playlist_add</i>'})}))})}}}customElements.define("standing-table",i);n(24);var c=n(43),d=n.n(c);n(44);const l=()=>{document.querySelector("main").innerHTML=d.a;const t=document.querySelector("standing-table"),e=document.querySelector("preloader-small");return Object(o.b)().then(n=>{e.destroy(),t.items=n.standings[0].table}).catch(t=>{e.destroy(),M.toast({html:"Having trouble with intenet connection or API request limit reached 😢"})}),Promise.resolve()},u=()=>Promise.resolve()},22:function(t,e){t.exports='<div class=row> <div class="col s12 m12 l12 xl12 center-align"> <div class="preloader-wrapper small active" style=margin-top:50px> <div class="spinner-layer spinner-green-only"> <div class="circle-clipper left"> <div class=circle></div> </div> <div class=gap-patch> <div class=circle></div> </div> <div class="circle-clipper right"> <div class=circle></div> </div> </div> </div> </div> </div>'},23:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return o})),n.d(e,"d",(function(){return s})),n.d(e,"c",(function(){return i}));const r=async t=>{try{const e=await fetch(new URL(t,"https://api.football-data.org/v2/"),{method:"GET",headers:{"X-Auth-Token":"913db747fd0d4f90b1b8799422f1e10b",Connection:"keep-alive"}});return await e.json()}catch(t){throw t}},a=async t=>await r("competitions/2021/matches?matchday="+t),o=async()=>await r("competitions/2021/standings?standingType=TOTAL"),s=async t=>await r("teams/"+t),i=async()=>await r("competitions/2021")},24:function(t,e,n){"use strict";var r=n(22),a=n.n(r);class o extends HTMLElement{constructor(){super()}connectedCallback(){this.render()}disconnectedCallback(){}attributeChangedCallback(){}adoptedCallback(){}render(){this.innerHTML=a.a}destroy(){this.remove()}}customElements.define("preloader-small",o)},25:function(t,e,n){"use strict";n.d(e,"a",(function(){return w})),n.d(e,"d",(function(){return x})),n.d(e,"c",(function(){return L})),n.d(e,"b",(function(){return k}));let r,a;const o=new WeakMap,s=new WeakMap,i=new WeakMap,c=new WeakMap,d=new WeakMap;let l={get(t,e,n){if(t instanceof IDBTransaction){if("done"===e)return s.get(t);if("objectStoreNames"===e)return t.objectStoreNames||i.get(t);if("store"===e)return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return m(t[e])},set:(t,e,n)=>(t[e]=n,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function u(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(a||(a=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(h(this),e),m(o.get(this))}:function(...e){return m(t.apply(h(this),e))}:function(e,...n){const r=t.call(h(this),e,...n);return i.set(r,e.sort?e.sort():[e]),m(r)}}function p(t){return"function"==typeof t?u(t):(t instanceof IDBTransaction&&function(t){if(s.has(t))return;const e=new Promise((e,n)=>{const r=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",o),t.removeEventListener("abort",o)},a=()=>{e(),r()},o=()=>{n(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",a),t.addEventListener("error",o),t.addEventListener("abort",o)});s.set(t,e)}(t),e=t,(r||(r=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])).some(t=>e instanceof t)?new Proxy(t,l):t);var e}function m(t){if(t instanceof IDBRequest)return function(t){const e=new Promise((e,n)=>{const r=()=>{t.removeEventListener("success",a),t.removeEventListener("error",o)},a=()=>{e(m(t.result)),r()},o=()=>{n(t.error),r()};t.addEventListener("success",a),t.addEventListener("error",o)});return e.then(e=>{e instanceof IDBCursor&&o.set(e,t)}).catch(()=>{}),d.set(e,t),e}(t);if(c.has(t))return c.get(t);const e=p(t);return e!==t&&(c.set(t,e),d.set(e,t)),e}const h=t=>d.get(t);const f=["get","getKey","getAll","getAllKeys","count"],b=["put","add","delete","clear"],v=new Map;function g(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(v.get(e))return v.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,a=b.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!a&&!f.includes(n))return;const o=async function(t,...e){const o=this.transaction(t,a?"readwrite":"readonly");let s=o.store;r&&(s=s.index(e.shift()));const i=await s[n](...e);return a&&await o.done,i};return v.set(e,o),o}l=(t=>({...t,get:(e,n,r)=>g(e,n)||t.get(e,n,r),has:(e,n)=>!!g(e,n)||t.has(e,n)}))(l);const y=function(t,e,{blocked:n,upgrade:r,blocking:a,terminated:o}={}){const s=indexedDB.open(t,e),i=m(s);return r&&s.addEventListener("upgradeneeded",t=>{r(m(s.result),t.oldVersion,t.newVersion,m(s.transaction))}),n&&s.addEventListener("blocked",()=>n()),i.then(t=>{o&&t.addEventListener("close",()=>o()),a&&t.addEventListener("versionchange",()=>a())}).catch(()=>{}),i}("Premier Leauge",1,{upgrade(t){t.createObjectStore("teams",{keyPath:"id",autoIncrement:!0}).createIndex("name","name")}}),w=async t=>(await y).add("teams",t),x=async()=>(await y).getAll("teams"),L=async t=>(await y).get("teams",t),k=async t=>(await y).delete("teams",t)},41:function(t,e,n){var r=n(1),a=n(42);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[t.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);t.exports=a.locals||{}},42:function(t,e,n){(e=n(2)(!1)).push([t.i,".classement-table thead {\r\n    color: #ffffff;\r\n    margin-bottom: 50px;\r\n}\r\n\r\n.classement-table thead tr {\r\n    border-bottom: unset;\r\n}\r\n\r\n.classement-table thead tr td {\r\n    padding: 10px;\r\n}\r\n\r\n.highlighted {\r\n    border-bottom: unset;\r\n    background-color: #ffffff;\r\n    border-radius: 3px;\r\n    font-weight: 500;\r\n    -webkit-box-shadow: 0px 20px 70px -20px rgba(0,0,0,0.35);\r\n    -moz-box-shadow: 0px 20px 70px -20px rgba(0,0,0,0.35);\r\n    box-shadow: 0px 20px 70px -20px rgba(0,0,0,0.35);\r\n}\r\n\r\n.highlighted td {\r\n    padding: 10px;\r\n}\r\n\r\n.spacer {\r\n    border-bottom: unset;\r\n}\r\n\r\n.spacer td {\r\n    padding: 5px 15px;\r\n}\r\n\r\n.team-crest {\r\n    width: 20px;\r\n    margin: 0 10px;\r\n}",""]),t.exports=e},43:function(t,e){t.exports='<section id=standings> <header-bar></header-bar> <preloader-small></preloader-small> <div class="container classement-container"> <div class=row> <div class="col s12 m12"> <standing-table></standing-table> </div> </div> </div> </section>'},44:function(t,e,n){var r=n(1),a=n(45);"string"==typeof(a=a.__esModule?a.default:a)&&(a=[[t.i,a,""]]);var o={insert:"head",singleton:!1};r(a,o);t.exports=a.locals||{}},45:function(t,e,n){(e=n(2)(!1)).push([t.i,".classement-container {\r\n    position: relative;\r\n    top: -100px;\r\n}",""]),t.exports=e}}]);