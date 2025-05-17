import{a as M,i as f,S as x}from"./assets/vendor-DFCQGEf1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();const H="https://pixabay.com/api/",h=15,I=500/h,P={key:"40945002-e125ab8d3394997b1a8dc0871",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h};async function g(e,t={}){if(t.page>I)return{hits:[]};const o=await M.get(H,{params:{...P,...t,q:e}});return console.log(o.data.hits),o.data}const i=document.querySelector(".gallery"),u=document.querySelector(".more-btn"),q=document.querySelector(".more_container"),n=document.createElement("span");n.classList.add("loader");f.settings({position:"topRight",messageSize:"16px",displayMode:2});const y=new x(".gallery a",{captionsData:"alt",captionDelay:250});function w(e){return e.map(({largeImageURL:t,webformatURL:o,tags:l,likes:r,views:s,comments:a,downloads:E})=>`<li class="gallery-item">
            <div class="img-wrapper">
              <a href="${t}">
                  <img
                    class="gallery-img"
                    src="${o}" 
                    alt="${l}"
                    width="360"
                    height="200">
              </a> 
            </div>
            <div class="text-wrapper">
              <ul class="img-info-list">
                <li class="info-item">
                  <h3 class="info-title">likes</h3>
                  <p class="info-text">${r}</p>
                </li>
                <li class="info-item">
                  <h3 class="info-title">views</h3>
                  <p class="info-text">${s}</p>
                </li>
                <li class="info-item">
                  <h3 class="info-title">comments</h3>
                  <p class="info-text">${a}</p>
                </li>
                <li class="info-item">
                  <h3 class="info-title">downloads</h3>
                  <p class="info-text">${E}</p>
                </li>
              </ul>
            </div>
        </li>`).join(" ")}const A=()=>{i.innerHTML=""},G=(e,t)=>{const o=w(e);i.innerHTML=o,y.refresh(),t>15?L():p()},$=e=>{const t=w(e);i.insertAdjacentHTML("beforeend",t),y.refresh()},N=()=>{A(),i.append(n),n.classList.add("center")},O=()=>{p(),q.append(n)},v=()=>{n.remove(),n.className="loader"},L=()=>{u.classList.remove("visually-hidden")},p=()=>{u.classList.add("visually-hidden")},d=e=>{f.error({message:e})},b=document.querySelector("form"),[T]=b.elements;let c="",m=1;b.addEventListener("submit",async e=>{e.preventDefault(),c=m=1,N();try{c=_();const{hits:t,totalHits:o}=await g(c,{page:m});if(t.length===0){d("Sorry, there are no images matching your search query. Please try again!");return}G(t,o)}catch(t){S(t)}finally{v()}});u.addEventListener("click",async()=>{O();try{const{hits:e}=await g(c,{page:m+1});if(m++,e.length===0){d("We're sorry, but you've reached the end of search results.");return}$(e),L(),B()}catch(e){S(e)}finally{v()}});const S=e=>{if(console.error("Error:",e),e.message){d(e.message);return}d("Something went wrong. Please try again later.")};function B(){const e=i.querySelector(".gallery-item");if(e){const t=e.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}}const _=()=>{const e=T.value.trim();if(e==="")throw p(),new Error("Search field cannot be empty");return e};
//# sourceMappingURL=index.js.map
