import{a as b,i as m,S}from"./assets/vendor-BMHzDZyJ.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=a(t);fetch(t.href,i)}})();const x="https://pixabay.com/api/",h=15,E=500/h,P={key:"40945002-e125ab8d3394997b1a8dc0871",image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:h};async function p(r,e={}){return e.page>E?{hits:[]}:(await b.get(x,{params:{...P,...e,q:r}})).data}function g(r){return r.map(({largeImageURL:e,webformatURL:a,tags:n,likes:t,views:i,comments:c,downloads:w})=>`<li class="gallery-item">
            <div class="img-wrapper">
              <a href="${e}">
                  <img
                    class="gallery-img"
                    src="${a}" 
                    alt="${n}"
                    width="360"
                    height="200">
              </a> 
            </div>
            <div class="text-wrapper">
              <ul class="img-info-list">
                <li class="info-item">
                  <h3 class="info-title">likes</h3>
                  <p class="info-text">${t}</p>
                </li>
                <li class="info-item">
                  <h3 class="info-title">views</h3>
                  <p class="info-text">${i}</p>
                </li>
                <li class="info-item">
                  <h3 class="info-title">comments</h3>
                  <p class="info-text">${c}</p>
                </li>
                <li class="info-item">
                  <h3 class="info-title">downloads</h3>
                  <p class="info-text">${w}</p>
                </li>
              </ul>
            </div>
        </li>`).join(" ")}const y=document.querySelector("form"),[q]=y.elements,d=document.querySelector(".gallery"),l=document.querySelector(".more-btn"),H=document.querySelector(".more_container"),o=document.createElement("span");o.classList.add("loader");let u="",f=1;m.settings({position:"topRight",messageSize:"16px",displayMode:2});const v=new S(".gallery a",{captionsData:"alt",captionDelay:250});y.addEventListener("submit",async r=>{if(r.preventDefault(),u=q.value.trim(),f=1,d.innerHTML="",u===""){m.error({message:"Search field cannot be empty"}),l.classList.add("visually-hidden");return}o.classList.add("center"),d.appendChild(o);try{const e=await p(u,{page:f}),a=e.hits;if(a.length===0){s,m.error({message:"Sorry, there are no images matching your search query. Please try again!"});return}const n=g(a);d.innerHTML=n,v.refresh(),e.totalHits>15?l.classList.remove("visually-hidden"):l.classList.add("visually-hidden")}catch(e){L(e)}finally{o.remove(),o.classList.remove("center")}});l.addEventListener("click",async()=>{l.classList.add("visually-hidden"),H.append(o);try{const r=await p(u,{page:f+1});f++;const e=r.hits;if(e.length===0){m.error({message:"We're sorry, but you've reached the end of search results."});return}const a=g(e);d.insertAdjacentHTML("beforeend",a),v.refresh(),l.classList.remove("visually-hidden"),$()}catch(r){L(r)}finally{o.remove()}});const L=r=>{console.error("Error:",r),m.error({message:"Something went wrong. Please try again later."})};function $(){const r=d.querySelector(".gallery-item");if(r){const e=r.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
