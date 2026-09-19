/* externalBlog.js
   Unified & optimized blog carousel
*/

document.addEventListener("DOMContentLoaded", () => {
  const heroSlides = [...document.querySelectorAll(".hero-slide")];
  const sideCards = [...document.querySelectorAll(".side-card:not(.clone)")];
  const sidebarTrack = document.getElementById("sidebarTrack");
  const progress = document.querySelector(".hero-progress span");

  if (!heroSlides.length) return;

  let current = 0;
  let autoplay;
  const DURATION = 5000;
  const isMobile = () => window.innerWidth <= 768;

  function setActive(index){
    heroSlides.forEach((s,i)=>s.classList.toggle("active",i===index));
    sideCards.forEach((c,i)=>c.classList.toggle("active",i===index));
    current=index;
    updateSidebar();
    restartProgress();
  }

  function next(){ setActive((current+1)%heroSlides.length); }
  function prev(){ setActive((current-1+heroSlides.length)%heroSlides.length); }

  function updateSidebar(){
    if(!sidebarTrack) return;
    const card=sideCards[current];
    if(isMobile()){
      sidebarTrack.style.transform=`translate3d(${-card.offsetLeft}px,0,0)`;
    }else{
      sidebarTrack.style.transform=`translate3d(0,${-card.offsetTop}px,0)`;
    }
  }

  function start(){
    stop();
    autoplay=setInterval(next,DURATION);
  }
  function stop(){ clearInterval(autoplay); }

  function restartProgress(){
    if(!progress) return;
    progress.style.animation="none";
    void progress.offsetWidth;
    progress.style.animation=`progressFill ${DURATION/1000}s linear forwards`;
  }

  sideCards.forEach((card,i)=>{
    card.addEventListener("click",()=>{
      setActive(i);
      start();
    });
  });

  document.addEventListener("keydown",e=>{
    if(e.key==="ArrowRight"){next();start();}
    if(e.key==="ArrowLeft"){prev();start();}
  });

  const hero=document.querySelector(".hero-panel");
  hero?.addEventListener("mouseenter",stop);
  hero?.addEventListener("mouseleave",start);

  // Touch swipe
  let startX=0,startY=0;
  hero?.addEventListener("touchstart",e=>{
    startX=e.touches[0].clientX;
    startY=e.touches[0].clientY;
  },{passive:true});

  hero?.addEventListener("touchend",e=>{
    const dx=e.changedTouches[0].clientX-startX;
    const dy=e.changedTouches[0].clientY-startY;
    if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>40){
      dx<0?next():prev();
      start();
    }
  });

  // Lazy loading
  if("IntersectionObserver" in window){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const img=entry.target;
          if(img.dataset.src){
            img.src=img.dataset.src;
            img.removeAttribute("data-src");
          }
          io.unobserve(img);
        }
      });
    });
    document.querySelectorAll("img[data-src]").forEach(img=>io.observe(img));
  }

  let resizeTimer;
  window.addEventListener("resize",()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(updateSidebar,120);
  });

  requestAnimationFrame(()=>setActive(0));
  start();
});
