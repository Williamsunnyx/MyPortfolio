

// Open modal
document.querySelectorAll('.qualify-modal-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
  });
});

// Close modal when clicking × or outside
document.querySelectorAll('.qualify-modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target.classList.contains('qualify-close') || e.target === modal) {
      modal.style.display = 'none';
    }
  });
});


const header = document.querySelector("header"); // Use your actual header selector if needed
let lastScrollTop = 0;
const scrollThreshold = 10; // Minimum scroll distance before triggering animation

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
    if (currentScroll > lastScrollTop) {
      // Scrolling down → hide header
      header.classList.add("hide-header");
      header.classList.remove("show-header");
    } else {
      // Scrolling up → show header
      header.classList.add("show-header");
      header.classList.remove("hide-header");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }
});

const reviewers = document.querySelectorAll(".reviewer-item");
const reviewertx = document.querySelectorAll(".name");
const texts = document.querySelectorAll(".review-text");
const list = document.querySelector(".reviewer-list");
let current = 0;

function slideDown() {
  // Remove active state from current
  texts[current].classList.remove("active");
  reviewers[current].style.opacity = "0";
  reviewers[current].style.transform = "translateY(-90px) translateX(0px) ";
  reviewers[current].style.left = "50%";

  // Move top one to bottom after transition
  setTimeout(() => {
    list.appendChild(reviewers[current]);
    reviewers[current].style.transform = "translateY(0) ";
    reviewers[current].style.opacity = "0.6";
    current = (current + 1) % reviewers.length;

    // Set active for next
    reviewers.forEach((rev, i) => {
      if (i === current) {
        rev.style.opacity = "1";
        reviewers[i].style.transform = "scale(1) ";

      } else {
        rev.style.opacity = "0.6";
        reviewers[i].style.transform = "scale(0.8) translateX(-20px)";

      }
    });

    texts.forEach((t, i) => t.classList.toggle("active", i === current));
  }, 600);
}

setTimeout(slideDown, 500);

    const hamburger = document.getElementById('hamburger');
    const sideMenu = document.getElementById('sideMenu');
    const closeBtn = document.getElementById('closeBtn');
    const openBtn = document.querySelector('.hamburger');
    const contentWrapper = document.querySelector('.content-wrapper');

    hamburger.addEventListener('click', () => {
      sideMenu.style.left = '0';
      contentWrapper.classList.add('dimmed');
      document.body.style.backgroundColor = "black";
      openBtn.classList.add('tot');// only dim page content
    });

    closeBtn.addEventListener('click', () => {
      sideMenu.style.left = '-100%';
      contentWrapper.classList.remove('dimmed');
      document.body.style.backgroundColor = "";
      openBtn.classList.remove('tot');
    });

    // Optional: Close menu when clicking outside
    window.addEventListener('click', (e) => {
      if(e.target === sideMenu){
        sideMenu.style.left = '-100%';
        contentWrapper.classList.remove('dimmed');
      }
    });

    // Optional: Change navbar background on scroll
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if(window.scrollY > 50){
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });

    function formatValue(raw, format, suffix){
      if(format === 'percent') return Math.round(raw) + '%';
      return Math.round(raw) + (suffix || '');
    }

    function animateCount(el, target, format){
      const duration = 1100 + Math.random()*500;
      const start = performance.now();
      const from = 0;
      const suffix = el.dataset.suffix || '';
      function step(now){
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = from + eased * (target - from);
        el.textContent = formatValue(value, format, suffix);
        if(t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          const num = entry.target.querySelector('.num');
          if(num){
            const rawTarget = Number(num.dataset.target) || 0;
            const fmt = num.dataset.format || 'int';
            animateCount(num, rawTarget, fmt);
          }
        }
      });
    },{threshold:0.18});

    document.querySelectorAll('.reveals').forEach(el => observer.observe(el));

     const titles = document.querySelectorAll('.experience-title');
  const contents = document.querySelectorAll('.experience-content');
  const modal = document.getElementById('experienceModal');
  const modalContent = document.getElementById('modalContent');

  titles.forEach(title => {
    title.addEventListener('click', () => {
      const id = title.dataset.id;

      // Remove active from all
      titles.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Set active
      title.classList.add('active');

      if(window.innerWidth > 701){
        document.querySelector(`.experience-content[data-id='${id}']`).classList.add('active');
      } else {
        // For mobile: show modal
        const content = document.querySelector(`.experience-content[data-id='${id}']`);
        modalContent.innerHTML = `<span class="modal-close" onclick="closeModal()">&times;</span>` + content.innerHTML;
        modal.style.display = 'flex';
      }
    });
  });

  function closeModal(){
    modal.style.display = 'none';
  }

  
  document.addEventListener('DOMContentLoaded', () => {
      if(typeof AOS !== 'undefined'){ AOS.init({once:true,duration:600}); }

      const track=document.getElementById('track'),prevBtn=document.getElementById('prev'),nextBtn=document.getElementById('next'),dotsWrap=document.getElementById('dots'),filters=document.querySelectorAll('.filter'),carouselWrap=document.getElementById('carousel');

      let cards=Array.from(track.children);let index=0;let pageCount=1;let autoInterval=null;const AUTO_DELAY=3500;

      const io=new IntersectionObserver((entries,obs)=>{entries.forEach(e=>{if(e.isIntersecting){const img=e.target;const src=img.getAttribute('data-src');if(src){img.src=src;img.removeAttribute('data-src');}obs.unobserve(img);}});},{root:null,rootMargin:'200px',threshold:0.01});
      document.querySelectorAll('img.project-thumb').forEach(i=>io.observe(i));

      function cardWidth(){
        const card=track.querySelector('.project-card');
        if(!card) return 36;
        return card.offsetWidth+16;
      }
      function computePageCount(){
        const visibleW=carouselWrap.offsetWidth-40;
        const cW=cardWidth();
        const perView=Math.max(1,Math.floor(visibleW/cW));
        const visibleCards=cards.filter(c=>c.style.display!=='none');pageCount=Math.max(1,Math.ceil(visibleCards.length/perView));return {perView,visibleCards};}
      function rebuildDots(){computePageCount();dotsWrap.innerHTML='';for(let i=0;i<pageCount;i++){const d=document.createElement('button');d.className='dot';d.addEventListener('click',()=>{index=i;update();resetAuto();});dotsWrap.appendChild(d);}updateDots();}
      function updateDots(){Array.from(dotsWrap.children).forEach((d,i)=>d.classList.toggle('active',i===index));}
      function update(){const cW=cardWidth();track.style.transform=`translateX(${-(index*cW)}px)`;updateDots();}
      function goNext(){index=Math.min(pageCount-1,index+1);update();}
      function goPrev(){index=Math.max(0,index-1);update();}

      nextBtn.addEventListener('click',()=>{goNext();resetAuto();});
      prevBtn.addEventListener('click',()=>{goPrev();resetAuto();});


            function startAuto() {
        stopAuto();

        if (pageCount <= 1) return;

        autoInterval = setTimeout(() => {
            index = (index + 1) % pageCount;
            update();
            startAuto();
        }, AUTO_DELAY);
        }

        function stopAuto() {
        if (autoInterval) {
            clearTimeout(autoInterval);
        }

        autoInterval = null;
        }
      function resetAuto(){stopAuto();startAuto();}

      carouselWrap.addEventListener('mouseenter',stopAuto);
      carouselWrap.addEventListener('mouseleave',startAuto);

      // Swipe
      let pointerDown=false,startX=0,scrollStart=0;
      carouselWrap.addEventListener('pointerdown',e=>{pointerDown=true;startX=e.clientX;scrollStart=-index*cardWidth();track.style.transition='none';});
      carouselWrap.addEventListener('pointermove',e=>{if(!pointerDown)return;const dx=e.clientX-startX;track.style.transform=`translateX(${scrollStart+dx}px)`;});
      function endPointer(e){if(!pointerDown)return;pointerDown=false;track.style.transition='transform .45s cubic-bezier(.22,.9,.32,1)';const dx=e.clientX-startX;const threshold=cardWidth()/4;if(Math.abs(dx)>threshold){if(dx<0)index=Math.min(pageCount-1,index+1);else index=Math.max(0,index-1);}update();}
      carouselWrap.addEventListener('pointerup',endPointer);
      carouselWrap.addEventListener('pointercancel',endPointer);

      // Keyboard navigation
      document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){goNext();resetAuto();}else if(e.key==='ArrowLeft'){goPrev();resetAuto();}});

      filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');const cat=btn.dataset.cat;cards.forEach(c=>{c.style.display=(cat==='all'||c.dataset.cat===cat)?'':'none';});cards=Array.from(track.children);index=0;rebuildDots();update();resetAuto();}));

      let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{rebuildDots();update();},150);});

      rebuildDots();update();startAuto();
    });

    // === Scroll Animation Script ===
const animatedScrollElements = document.querySelectorAll(
  ".slide-left, .slide-right, .fade-up, .zoom-in"
);

let scrollAnimationFrame = null;

const updateScrollAnimations = () => {
  if (scrollAnimationFrame) return;

  scrollAnimationFrame = requestAnimationFrame(() => {
    const triggerBottom = window.innerHeight * 0.85;

    const elementStates = Array.from(
      animatedScrollElements,
      (element, index) => ({
        element,
        index,
        visible:
          element.getBoundingClientRect().top < triggerBottom
      })
    );

    elementStates.forEach(({ element, index, visible }) => {
      if (visible) {
        element.style.transitionDelay = `${index * 0.1}s`;
        element.classList.add("animate");
      } else {
        element.classList.remove("animate");
      }
    });

    scrollAnimationFrame = null;
  });
};


window.addEventListener(
  "scroll",
  updateScrollAnimations,
  { passive: true }
);

updateScrollAnimations();

//TYPING EFFECT

// Terminal Text Effect
const roles = [
  "Web Designer.",
  "Customer Service.",
  "Waiter.",
  "Hospitality Service.",
  "Visual Design.",

];

let roleIndex = 0;
let charIndex = 0;
let typingSpeed = 100; // ms per character
let delayBetweenRoles = 2000; // delay before next role

const terminalText = document.querySelector(".terminal-text");

function typeRole() {
  const currentRole = roles[roleIndex];

  if(charIndex < currentRole.length) {
    terminalText.textContent += currentRole.charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, typingSpeed);
  } else {
    setTimeout(eraseRole, delayBetweenRoles);
  }
}

function eraseRole() {
  const currentRole = roles[roleIndex];

  if(charIndex > 0) {
    terminalText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, typingSpeed / 2);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, typingSpeed);
  }
}

// Start typing effect
typeRole();

(() => {
  "use strict";
const section = document.querySelector(".Exper2-section");
if (!section) return;

const cards = [...section.querySelectorAll(".Exper2-card")];
const timelineButtons = [...section.querySelectorAll(".Exper2-time")];
const timeline = section.querySelector(".Exper2-timeline");
const progress = section.querySelector(".Exper2-timeline-progress");
const stats = [...section.querySelectorAll(".Exper2-stat")];

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* Check whether a card is currently open */
function isExper2CardOpen(card) {
  return (
    card.classList.contains("is-active") ||
    card.classList.contains("active") ||
    card.classList.contains("is-open") ||
    card.classList.contains("open") ||
    card.getAttribute("aria-expanded") === "true" ||
    card.hasAttribute("open")
  );
}

/* Get the ID connecting the card to its timeline button */
function getExper2CardId(card) {
  return (
    card.dataset.card ||
    card.id ||
    card.getAttribute("data-id") ||
    null
  );
}

function resetTimelineProgress() {
  if (!progress) return;

  if (window.matchMedia("(max-width: 1180px)").matches) {
    progress.style.height = "2px";
    progress.style.width = "0";
  } else {
    progress.style.width = "2px";
    progress.style.height = "0";
  }
}

function updateTimeline(cardId) {
  const index = timelineButtons.findIndex(
    button => button.dataset.card === cardId
  );

  timelineButtons.forEach(button => {
    button.classList.toggle(
      "is-active",
      button.dataset.card === cardId && index >= 0
    );
  });

  /*
    Hide the skills only inside the open/current card.
    Restore the skills on all closed cards.
  */
  cards.forEach(card => {
    const cardSkills = card.querySelector(".Exper2-card-skills");

    if (!cardSkills) return;

    const cardMatches =
      card.dataset.card === cardId ||
      card.id === cardId ||
      card.getAttribute("data-id") === cardId;

    const shouldHide =
      cardMatches &&
      isExper2CardOpen(card);

    cardSkills.style.visibility = shouldHide ? "hidden" : "visible";
  });

  /* Increase or restore the timeline gap */
  if (timeline) {
    timeline.classList.toggle(
      "Exper2-gap-open",
      index >= 0 && cardId !== null
    );
  }

  /* Reset line when the card is closed */
  if (index < 0 || cardId === null) {
    resetTimelineProgress();
    return;
  }

  if (!progress) return;

  if (window.matchMedia("(max-width: 1180px)").matches) {
    progress.style.height = "2px";
    progress.style.width = `${
      (index / Math.max(timelineButtons.length - 1, 1)) * 75
    }%`;
  } else {
    progress.style.width = "2px";
    progress.style.height = `${
      (index / Math.max(timelineButtons.length - 1, 1)) * 100
    }%`;
  }
}

/*
  This listens to card clicks without replacing your existing
  card-opening and card-closing JavaScript.
*/
cards.forEach(card => {
  card.addEventListener("click", () => {

    /*
      Wait until your existing click function has added
      or removed the card's active/open class.
    */
    setTimeout(() => {
      const cardId = getExper2CardId(card);

      if (isExper2CardOpen(card)) {
        updateTimeline(cardId);
      } else {
        updateTimeline(null);
      }
    }, 0);
  });
});

/*
  Keep everything correct if another script changes
  the card class after an animation or transition.
*/
const cardObserver = new MutationObserver(() => {
  const openCard = cards.find(card => isExper2CardOpen(card));

  if (openCard) {
    updateTimeline(getExper2CardId(openCard));
  } else {
    updateTimeline(null);
  }
});

cards.forEach(card => {
  cardObserver.observe(card, {
    attributes: true,
    attributeFilter: [
      "class",
      "open",
      "aria-expanded"
    ]
  });
});

/* Correct timeline direction after resizing */
window.addEventListener("resize", () => {
  const openCard = cards.find(card => isExper2CardOpen(card));

  if (openCard) {
    updateTimeline(getExper2CardId(openCard));
  } else {
    updateTimeline(null);
  }
});

  function openCard(targetCard, shouldScroll = false) {
    cards.forEach(card => {
      const isTarget = card === targetCard;
      card.classList.toggle("is-open", isTarget);

      const trigger = card.querySelector(".Exper2-card-head");
      if (trigger) trigger.setAttribute("aria-expanded", String(isTarget));
    });

    updateTimeline(targetCard.id);

    if (shouldScroll) {
      targetCard.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center"
      });
    }
  }

  function closeCard(targetCard) {
    targetCard.classList.remove("is-open");
    const trigger = targetCard.querySelector(".Exper2-card-head");
    if (trigger) trigger.setAttribute("aria-expanded", "false");

    timelineButtons.forEach(button => button.classList.remove("is-active"));
    if (progress) {
      if (window.matchMedia("(max-width: 1180px)").matches) {
        progress.style.width = "0";
      } else {
        progress.style.height = "0";
      }
    }
  }

  cards.forEach(card => {
    const trigger = card.querySelector(".Exper2-card-head");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      if (card.classList.contains("is-open")) {
        closeCard(card);
      } else {
        openCard(card);
      }
    });

  });

  timelineButtons.forEach(button => {
    button.addEventListener("click", () => {
      const card = document.getElementById(button.dataset.card);
      if (card) openCard(card, true);
    });
  });

  function animateCounter(stat) {
    const counter = stat.querySelector(".Exper2-counter");
    const target = Number(stat.dataset.count || 0);
    const suffix = stat.dataset.suffix || "";
    const duration = reducedMotion ? 1 : 1200;
    const start = performance.now();

    cancelAnimationFrame(stat._counterFrame);

    function frame(now) {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 4);
      counter.textContent = `${Math.round(target * eased)}${suffix}`;

      if (elapsed < 1) {
        stat._counterFrame = requestAnimationFrame(frame);
      }
    }

    stat._counterFrame = requestAnimationFrame(frame);
  }

  function resetCounter(stat) {
    cancelAnimationFrame(stat._counterFrame);
    const counter = stat.querySelector(".Exper2-counter");
    counter.textContent = `0${stat.dataset.suffix || ""}`;
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
      } else {
        resetCounter(entry.target);
      }
    });
  }, { threshold: 0.45 });

  stats.forEach(stat => counterObserver.observe(stat));

  window.addEventListener("resize", () => {
    const activeCard = cards.find(card => card.classList.contains("is-open"));
    if (activeCard) updateTimeline(activeCard.id);
  }, { passive: true });

  const initiallyOpen = cards.find(card => card.classList.contains("is-open")) || cards[0];
  if (initiallyOpen) openCard(initiallyOpen);
})();




/* NEW ABOUT */

(() => {
  const section = document.querySelector(".MAIIN-ABOUT");
  if (!section) return;

  const counters = section.querySelectorAll(".MAIIN-ABOUT-counter");
  counters.forEach(counter => {
    const target = Number(counter.dataset.target || 0);
    const duration = 1350;
    const start = performance.now();

    const update = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(update);
      else counter.textContent = target;
    };
    requestAnimationFrame(update);
  });

const tiltItems = section.querySelectorAll("[data-tilt]");
const coarsePointer = window.matchMedia("(pointer: coarse)");

tiltItems.forEach(item => {
  let rect = null;
  let tiltFrame = null;
  let latestPointerEvent = null;

  const measureTiltItem = () => {
    rect = item.getBoundingClientRect();
  };

  item.addEventListener("pointerenter", measureTiltItem);

  item.addEventListener("pointermove", event => {
    if (coarsePointer.matches) return;

    latestPointerEvent = event;

    if (tiltFrame) return;

    tiltFrame = requestAnimationFrame(() => {
      if (!rect) {
        rect = item.getBoundingClientRect();
      }

      const x =
        (latestPointerEvent.clientX - rect.left) /
          rect.width -
        0.5;

      const y =
        (latestPointerEvent.clientY - rect.top) /
          rect.height -
        0.5;

      item.style.transform =
        `perspective(900px) ` +
        `rotateX(${y * -4}deg) ` +
        `rotateY(${x * 5}deg) ` +
        `translateY(-2px)`;

      tiltFrame = null;
    });
  });

  item.addEventListener("pointerleave", () => {
    cancelAnimationFrame(tiltFrame);

    tiltFrame = null;
    rect = null;
    item.style.transform = "";
  });
});

  const techButton = section.querySelector(".MAIIN-ABOUT__view-all");
  const techItems = [...section.querySelectorAll(".MAIIN-ABOUT__tech-item")];
  techButton?.addEventListener("click", () => {
    techItems.forEach((item, index) => {
      item.animate([
        { transform: "translateY(0) scale(1)" },
        { transform: "translateY(-10px) scale(1.04)" },
        { transform: "translateY(0) scale(1)" }
      ], { duration: 480, delay: index * 45, easing: "cubic-bezier(.2,.8,.2,1)" });
    });
  });
})();




(() => {
  const section = document.querySelector(".HUMAN-CONTACT-section");
  if (!section) return;



/* =======================================================
   SUBTLE SUCCESS PARTICLES
======================================================= */

const HUMAN_CONTACT_launchSuccessParticles = (
  sourceElement,
  particleCount = 65
) => {
  if (!sourceElement) return;

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return;

  canvas.setAttribute("aria-hidden", "true");

  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "99999"
  });

  document.body.appendChild(canvas);

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  const resizeCanvas = () => {
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    context.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0
    );
  };

  resizeCanvas();

  const sourcePosition = sourceElement.getBoundingClientRect();

  const startX =
    sourcePosition.left + sourcePosition.width / 2;

  const startY =
    sourcePosition.top + sourcePosition.height / 2;

  const particleColors = [
    "#ef433c",
    "#ff7069",
    "#ffffff",
    "#9ebbe4",
    "#183b68"
  ];

  const particles = Array.from(
    { length: particleCount },
    () => {
      const angle =
        Math.random() * Math.PI * 1.15 +
        Math.PI * 0.92;

      const speed = 3.2 + Math.random() * 5.8;

      return {
        x: startX,
        y: startY,
        size: 2.5 + Math.random() * 4.5,
        velocityX: Math.cos(angle) * speed,
        velocityY: Math.sin(angle) * speed - 3.2,
        gravity: 0.14 + Math.random() * 0.08,
        rotation: Math.random() * Math.PI,
        rotationSpeed:
          (Math.random() - 0.5) * 0.2,
        opacity: 1,
        color:
          particleColors[
            Math.floor(
              Math.random() * particleColors.length
            )
          ],
        shape: Math.random() > 0.5 ? "circle" : "rectangle"
      };
    }
  );

  const animationStart = performance.now();
  const animationDuration = 1550;

  const drawParticles = (currentTime) => {
    const elapsed = currentTime - animationStart;

    context.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

    particles.forEach((particle) => {
      particle.velocityY += particle.gravity;
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.rotation += particle.rotationSpeed;

      particle.opacity = Math.max(
        0,
        1 - elapsed / animationDuration
      );

      context.save();

      context.globalAlpha = particle.opacity;
      context.translate(particle.x, particle.y);
      context.rotate(particle.rotation);
      context.fillStyle = particle.color;

      if (particle.shape === "circle") {
        context.beginPath();
        context.arc(
          0,
          0,
          particle.size / 2,
          0,
          Math.PI * 2
        );
        context.fill();
      } else {
        context.fillRect(
          -particle.size / 2,
          -particle.size / 3,
          particle.size,
          particle.size / 1.6
        );
      }

      context.restore();
    });

    if (elapsed < animationDuration) {
      requestAnimationFrame(drawParticles);
    } else {
      canvas.remove();
      window.removeEventListener("resize", resizeCanvas);
    }
  };

  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(drawParticles);
};


  const form = section.querySelector("#HUMAN-CONTACT-form");
  const conversation = section.querySelector(
    "#HUMAN-CONTACT-conversation"
  );

  const steps = [...section.querySelectorAll(".HUMAN-CONTACT-step")];
  const progressBar = section.querySelector("#HUMAN-CONTACT-progressBar");
  const currentStepLabel = section.querySelector(
    "#HUMAN-CONTACT-currentStep"
  );

  const backButton = section.querySelector(".HUMAN-CONTACT-back");
  const typingIndicator = section.querySelector(".HUMAN-CONTACT-typing");

  const nameInput = section.querySelector("#HUMAN-CONTACT-nameInput");
  const emailInput = section.querySelector("#HUMAN-CONTACT-emailInput");
  const messageInput = section.querySelector("#HUMAN-CONTACT-messageInput");
  const consentInput = section.querySelector("#HUMAN-CONTACT-consent");

  const messageCount = section.querySelector(
    "#HUMAN-CONTACT-messageCount"
  );

  const submitButton = section.querySelector(".HUMAN-CONTACT-submit");
  const submitError = section.querySelector(
    ".HUMAN-CONTACT-submitError"
  );

  const hiddenValues = {
    type: section.querySelector("#HUMAN-CONTACT-typeValue"),
    name: section.querySelector("#HUMAN-CONTACT-nameValue"),
    email: section.querySelector("#HUMAN-CONTACT-emailValue"),
    message: section.querySelector("#HUMAN-CONTACT-messageValue"),
    reply: section.querySelector("#HUMAN-CONTACT-replyValue")
  };

  const summaryValues = {
    type: section.querySelector("#HUMAN-CONTACT-summaryType"),
    name: section.querySelector("#HUMAN-CONTACT-summaryName"),
    email: section.querySelector("#HUMAN-CONTACT-summaryEmail"),
    reply: section.querySelector("#HUMAN-CONTACT-summaryReply")
  };

  const formData = {
    type: "",
    typeShort: "",
    name: "",
    email: "",
    message: "",
    reply: ""
  };

  let currentStep = 1;

  /* =======================================================
     SCROLL REVEAL
  ======================================================== */

  const revealElements = section.querySelectorAll(
    ".HUMAN-CONTACT-reveal"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(
          "is-visible",
          entry.isIntersecting
        );
      });
    },
    {
      threshold: 0.14
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });

  /* =======================================================
     DIRECT CONTACT MENU
  ======================================================== */

  const options = section.querySelector(".HUMAN-CONTACT-options");
  const optionsTrigger = section.querySelector(
    ".HUMAN-CONTACT-optionsTrigger"
  );

  const optionsMenu = section.querySelector(
    ".HUMAN-CONTACT-optionsMenu"
  );

  const setOptionsMenu = (open) => {
    options?.classList.toggle("is-open", open);
    optionsTrigger?.setAttribute("aria-expanded", String(open));
    optionsMenu?.setAttribute("aria-hidden", String(!open));
  };

  optionsTrigger?.addEventListener("click", (event) => {
    event.stopPropagation();

    setOptionsMenu(
      !options?.classList.contains("is-open")
    );
  });

  optionsMenu?.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    setOptionsMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOptionsMenu(false);
    }
  });

  /* =======================================================
     CHAT HELPERS
  ======================================================== */

  const scrollConversation = () => {
    requestAnimationFrame(() => {
      conversation.scrollTop = conversation.scrollHeight;
    });
  };

  const createMessage = (text, type = "received") => {
    const message = document.createElement("div");

    message.className =
      `HUMAN-CONTACT-message HUMAN-CONTACT-message--${type}`;

    if (type === "received") {
      message.innerHTML = `
        <div class="HUMAN-CONTACT-messageAvatar">
          <img src="profil.png" alt="">
        </div>

        <div>
          <span class="HUMAN-CONTACT-messageName">Williams</span>
          <div class="HUMAN-CONTACT-bubble"></div>
        </div>
      `;
    } else {
      message.innerHTML = `
        <div class="HUMAN-CONTACT-bubble"></div>
      `;
    }

    message.querySelector(".HUMAN-CONTACT-bubble").textContent = text;

    conversation.insertBefore(message, typingIndicator);
    scrollConversation();
  };

  const showTyping = (callback) => {
    typingIndicator.classList.add("is-visible");
    scrollConversation();

    window.setTimeout(() => {
      typingIndicator.classList.remove("is-visible");
      callback();
    }, 550);
  };

  const displayQuestion = (stepNumber) => {
    const step = steps.find(
      (item) => Number(item.dataset.step) === stepNumber
    );

    const question = step?.dataset.question;

    if (!question) return;

    showTyping(() => {
      createMessage(question, "received");
    });
  };

  const updateProgress = () => {
    const visibleStep = Math.min(currentStep, 5);
    const progress = visibleStep * 20;

    currentStepLabel.textContent = visibleStep;
    progressBar.style.width = `${progress}%`;

    backButton.disabled = currentStep <= 1;
  };

  const showStep = (stepNumber, askQuestion = true) => {
    steps.forEach((step) => {
      step.classList.toggle(
        "is-active",
        Number(step.dataset.step) === stepNumber
      );

      step.classList.remove("is-invalid");
    });

    currentStep = stepNumber;
    updateProgress();

    if (askQuestion && stepNumber <= 5) {
      displayQuestion(stepNumber);
    }
  };

  const moveForward = (answer) => {
    createMessage(answer, "sent");

    const nextStep = currentStep + 1;

    if (nextStep === 6) {
      updateSummary();
      showStep(6, false);

      showTyping(() => {
        createMessage(
          "Thank you. Everything looks ready to send.",
          "received"
        );
      });

      return;
    }

    showStep(nextStep);
  };

  /* =======================================================
     STEP ONE
  ======================================================== */

  section
    .querySelectorAll(
      '.HUMAN-CONTACT-step[data-step="1"] [data-value]'
    )
    .forEach((button) => {
      button.addEventListener("click", () => {
        formData.type = button.dataset.value || "";
        formData.typeShort =
          button.dataset.shortValue ||
          button.dataset.value ||
          "";

        hiddenValues.type.value = formData.type;

        moveForward(formData.type);
      });
    });

  /* =======================================================
     TEXT INPUT STEPS
  ======================================================== */

  const isEmailValid = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const continueTextStep = () => {
    const activeStep = steps.find(
      (step) => Number(step.dataset.step) === currentStep
    );

    activeStep?.classList.remove("is-invalid");

    if (currentStep === 2) {
      const value = nameInput.value.trim();

      if (!value) {
        activeStep?.classList.add("is-invalid");
        nameInput.focus();
        return;
      }

      formData.name = value;
      hiddenValues.name.value = value;
      moveForward(value);
      return;
    }

    if (currentStep === 3) {
      const value = emailInput.value.trim();

      if (!isEmailValid(value)) {
        activeStep?.classList.add("is-invalid");
        emailInput.focus();
        return;
      }

      formData.email = value;
      hiddenValues.email.value = value;
      moveForward(value);
      return;
    }

    if (currentStep === 4) {
      const value = messageInput.value.trim();

      if (value.length < 20) {
        activeStep?.classList.add("is-invalid");
        messageInput.focus();
        return;
      }

      formData.message = value;
      hiddenValues.message.value = value;

      const preview =
        value.length > 115
          ? `${value.slice(0, 115)}…`
          : value;

      moveForward(preview);
    }
  };

  section
    .querySelectorAll(".HUMAN-CONTACT-next")
    .forEach((button) => {
      button.addEventListener("click", continueTextStep);
    });

  [nameInput, emailInput].forEach((input) => {
    input?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        continueTextStep();
      }
    });
  });

  /* =======================================================
     MESSAGE PROMPTS AND COUNTER
  ======================================================== */

  const updateMessageCount = () => {
    messageCount.textContent = messageInput.value.length;

    messageCount.style.color =
      messageInput.value.length > 720
        ? "#ff918d"
        : "";
  };

  messageInput?.addEventListener("input", updateMessageCount);

  section
    .querySelectorAll("[data-prompt]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const prompt = button.dataset.prompt || "";

        if (!messageInput.value.trim()) {
          messageInput.value = prompt;
        } else {
          messageInput.value += `\n\n${prompt}`;
        }

        messageInput.focus();
        messageInput.setSelectionRange(
          messageInput.value.length,
          messageInput.value.length
        );

        updateMessageCount();
      });
    });

  /* =======================================================
     REPLY METHOD
  ======================================================== */

  section
    .querySelectorAll(
      '.HUMAN-CONTACT-step[data-step="5"] [data-value]'
    )
    .forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.value || "";

        formData.reply = value;
        hiddenValues.reply.value = value;

        moveForward(value);
      });
    });

  /* =======================================================
     SUMMARY
  ======================================================== */

  const updateSummary = () => {
    summaryValues.type.textContent =
      formData.typeShort || "—";

    summaryValues.name.textContent =
      formData.name || "—";

    summaryValues.email.textContent =
      formData.email || "—";

    summaryValues.reply.textContent =
      formData.reply || "—";
  };

  /* =======================================================
     PREVIOUS STEP
  ======================================================== */

  backButton?.addEventListener("click", () => {
    if (currentStep <= 1) return;

    const previousStep =
      currentStep === 6 ? 5 : currentStep - 1;

    showStep(previousStep, false);
  });

  /* =======================================================
     RESET
  ======================================================== */

  const resetConversation = () => {
    form.reset();

    Object.keys(formData).forEach((key) => {
      formData[key] = "";
    });

    Object.values(hiddenValues).forEach((field) => {
      field.value = "";
    });

    const dynamicMessages = conversation.querySelectorAll(
      ".HUMAN-CONTACT-message"
    );

    dynamicMessages.forEach((message, index) => {
      if (index > 1) {
        message.remove();
      }
    });

    messageCount.textContent = "0";
    submitError.textContent = "";

    submitButton.classList.remove(
      "is-loading",
      "is-success"
    );

    submitButton.removeAttribute("disabled");

    showStep(1, false);
  };

  section
    .querySelector(".HUMAN-CONTACT-reset")
    ?.addEventListener("click", resetConversation);

  /* =======================================================
     FORM SUBMISSION DEMONSTRATION
  ======================================================== */

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitError.textContent = "";

    if (!consentInput.checked) {
      submitError.textContent =
        "Please confirm that your details may be used to respond.";

      consentInput.focus();
      return;
    }

    if (
      !formData.type ||
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.reply
    ) {
      submitError.textContent =
        "Please complete every step of the conversation before sending.";
      return;
    }

    /* Keep the hidden email fields synchronized with the chat answers. */
    hiddenValues.type.value = formData.type;
    hiddenValues.name.value = formData.name;
    hiddenValues.email.value = formData.email;
    hiddenValues.message.value = formData.message;
    hiddenValues.reply.value = formData.reply;

    const subjectField = section.querySelector(
      "#HUMAN-CONTACT-web3Subject"
    );

    if (subjectField) {
      subjectField.value =
        `${formData.typeShort || formData.type} enquiry from ${formData.name}`;
    }

    submitButton.classList.remove("is-success");
    submitButton.classList.add("is-loading");
    submitButton.setAttribute("disabled", "true");

    try {
      const submissionData = new FormData(form);

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: submissionData
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "The message could not be sent."
        );
      }

      submitButton.classList.remove("is-loading");
      submitButton.classList.add("is-success");
      HUMAN_CONTACT_launchSuccessParticles(submitButton);
      createMessage(
        `Thank you, ${formData.name}. Your message has been sent successfully. I will respond as soon as possible.`,
        "received"
      );

      submitError.textContent = "";

      /* Keep disabled after success to prevent duplicate submissions. */
      submitButton.setAttribute("disabled", "true");

      window.setTimeout(() => {
        submitButton.classList.remove("is-success");
      }, 3500);
    } catch (error) {
      console.error("Web3Forms submission failed:", error);

      submitButton.classList.remove(
        "is-loading",
        "is-success"
      );

      submitButton.removeAttribute("disabled");

      submitError.textContent =
        "Your message could not be sent. Please check your connection and try again.";
    }
  });

  /* =======================================================
     COPY EMAIL
  ======================================================== */

  const copyEmailButton = section.querySelector(
    ".HUMAN-CONTACT-copyEmail"
  );

  copyEmailButton?.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;
    const emailText = copyEmailButton.querySelector("strong");

    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);

      const originalText = emailText.textContent;
      emailText.textContent = "Email copied";

      window.setTimeout(() => {
        emailText.textContent = originalText;
      }, 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });

  updateProgress();
  updateMessageCount();
})();


/* THE PROCESS CONNECTING ANIMATION */

document.addEventListener("DOMContentLoaded", () => {
  const processComponents = document.querySelectorAll(".WS-process");

  processComponents.forEach((component) => {
    const steps = [
      ...component.querySelectorAll(".WS-process__step")
    ];

    const nodes = [
      ...component.querySelectorAll(".WS-process__node")
    ];

    const svg = component.querySelector(
      ".WS-process__circuit"
    );

    const basePath = component.querySelector(
      ".WS-process__base-path"
    );

    const activePath = component.querySelector(
      ".WS-process__active-path"
    );

    const energyOne = component.querySelector(
      ".WS-process__energy--one"
    );

    const energyTwo = component.querySelector(
      ".WS-process__energy--two"
    );

    const energyThree = component.querySelector(
      ".WS-process__energy--three"
    );

    if (
      !steps.length ||
      !nodes.length ||
      !svg ||
      !basePath ||
      !activePath ||
      !energyOne ||
      !energyTwo ||
      !energyThree
    ) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

        let pathLength = 0;
        let animationFrame = null;
        let animationStart = null;
        let previousActiveIndex = -1;
        let resizeTimeout = null;
        let processFrameCount = 0;

    /*
      14 seconds for the current to travel through
      all five process steps.
    */
    const travelDuration = 14000;

    /*
      Pause after reaching the final step.
    */
    const endingPause = 1800;

    const fullCycleDuration =
      travelDuration + endingPause;

function buildCircuitPath() {
  const componentRect = component.getBoundingClientRect();

  const width = componentRect.width;
  const height = componentRect.height;
  const isMobile = window.innerWidth <= 560;

  /*
    Read all node positions before changing the SVG.
  */
  const nodeRects = nodes.map(node => {
    const rect = node.getBoundingClientRect();

    return {
      left: rect.left - componentRect.left,
      right: rect.right - componentRect.left,
      top: rect.top - componentRect.top,
      bottom: rect.bottom - componentRect.top,
      centerX:
        rect.left -
        componentRect.left +
        rect.width / 2,
      centerY:
        rect.top -
        componentRect.top +
        rect.height / 2
    };
  });

  if (nodeRects.length < 2) return;

  /*
    Only write to the SVG after all layout readings.
  */
  svg.setAttribute(
    "viewBox",
    `0 0 ${width} ${height}`
  );

  let pathData = "";


  if (isMobile) {
    /*
      Mobile:
      connect from the bottom of one icon
      to the top of the next icon.
    */

    const firstNode = nodeRects[0];

    pathData = `
      M ${firstNode.centerX} ${firstNode.bottom}
    `;

    for (
      let index = 1;
      index < nodeRects.length;
      index++
    ) {
      const previous = nodeRects[index - 1];
      const current = nodeRects[index];

      const startX = previous.centerX;
      const startY = previous.bottom;

      const endX = current.centerX;
      const endY = current.top;

      const middleY =
        startY + (endY - startY) / 2;

      pathData += `
        C ${startX} ${middleY},
          ${endX} ${middleY},
          ${endX} ${endY}
      `;
    }
  } else {
    /*
      Desktop:
      connect from the right edge of one icon
      to the left edge of the next icon.
    */

    const firstNode = nodeRects[0];

    pathData = `
      M ${firstNode.right} ${firstNode.centerY}
    `;

    for (
      let index = 1;
      index < nodeRects.length;
      index++
    ) {
      const previous = nodeRects[index - 1];
      const current = nodeRects[index];

      const startX = previous.right;
      const startY = previous.centerY;

      const endX = current.left;
      const endY = current.centerY;

      const middleX =
        startX + (endX - startX) / 2;

      pathData += `
        C ${middleX} ${startY},
          ${middleX} ${endY},
          ${endX} ${endY}
      `;
    }
  }

  basePath.setAttribute("d", pathData);
  activePath.setAttribute("d", pathData);

  pathLength = activePath.getTotalLength();

  activePath.style.strokeDasharray =
    `${pathLength}`;

  activePath.style.strokeDashoffset =
    `${pathLength}`;

  setParticlePosition(energyOne, 0);
  setParticlePosition(energyTwo, 0);
  setParticlePosition(energyThree, 0);
}

    function setParticlePosition(
      particle,
      distance
    ) {
      if (!pathLength) return;

      const safeDistance = Math.max(
        0,
        Math.min(distance, pathLength)
      );

      const point =
        activePath.getPointAtLength(safeDistance);

      particle.setAttribute("cx", point.x);
      particle.setAttribute("cy", point.y);
    }

    function activateStep(activeIndex) {
      if (activeIndex === previousActiveIndex) {
        return;
      }

      steps.forEach((step, index) => {
        step.classList.toggle(
          "is-active",
          index === activeIndex
        );

        step.classList.toggle(
          "is-complete",
          index < activeIndex
        );
      });

      previousActiveIndex = activeIndex;
    }

    /*
      Smoothstep easing:
      gentle start, smooth middle and gentle ending.
    */
    function smoothProgress(value) {
      return value * value * (3 - 2 * value);
    }

    function animateCircuit(timestamp) {
      if (!animationStart) {
        animationStart = timestamp;
      }

      const elapsed =
        timestamp - animationStart;

      const cycleTime =
        elapsed % fullCycleDuration;

      const isPaused =
        cycleTime >= travelDuration;

      const linearProgress = isPaused
        ? 1
        : cycleTime / travelDuration;

      const progress =
        smoothProgress(linearProgress);

      const travelledDistance =
        pathLength * progress;

      /*
        Gradually reveals the red wire.
      */
      activePath.style.strokeDashoffset =
        pathLength - travelledDistance;

      /*
        Main current head.
      */
processFrameCount++;

if (processFrameCount % 2 === 0) {
  setParticlePosition(
    energyOne,
    travelledDistance
  );

  setParticlePosition(
    energyTwo,
    travelledDistance - 21
  );

  setParticlePosition(
    energyThree,
    travelledDistance - 41
  );
}      energyOne.style.opacity =
        isPaused ? "0" : "1";

      energyTwo.style.opacity =
        travelledDistance > 21 && !isPaused
          ? "0.75"
          : "0";

      energyThree.style.opacity =
        travelledDistance > 41 && !isPaused
          ? "0.42"
          : "0";

      /*
        Activate each step as the current reaches it.
      */
      const activeIndex = Math.min(
        steps.length - 1,
        Math.floor(progress * steps.length)
      );

      activateStep(activeIndex);

      animationFrame =
        requestAnimationFrame(animateCircuit);
    }

    function resetVisualState() {
      previousActiveIndex = -1;

      steps.forEach((step) => {
        step.classList.remove(
          "is-active",
          "is-complete"
        );
      });

      activePath.style.strokeDashoffset =
        `${pathLength}`;

      energyOne.style.opacity = "0";
      energyTwo.style.opacity = "0";
      energyThree.style.opacity = "0";
    }

    function startAnimation() {
    cancelAnimationFrame(animationFrame);

    animationStart = null;
    processFrameCount = 0;

      resetVisualState();

      if (reduceMotion.matches) {
        activePath.style.strokeDashoffset = "0";

        steps.forEach((step, index) => {
          step.classList.toggle(
            "is-complete",
            index < steps.length - 1
          );

          step.classList.toggle(
            "is-active",
            index === steps.length - 1
          );
        });

        return;
      }

      animationFrame =
        requestAnimationFrame(animateCircuit);
    }

    const resizeObserver =
      new ResizeObserver(() => {
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {
          buildCircuitPath();
          startAnimation();
        }, 120);
      });

    resizeObserver.observe(component);

    buildCircuitPath();
    startAnimation();

    reduceMotion.addEventListener?.(
      "change",
      startAnimation
    );
  });
});


/* SKILLS AND CERTIFICATE SECTION */
(() => {
  const sections = document.querySelectorAll(".SC-section");

  sections.forEach((section) => {
    const tabs = [...section.querySelectorAll(".SC-tab")];
    const panels = [...section.querySelectorAll(".SC-panel")];

    const certificateItems = [...section.querySelectorAll(".SC-certificate-item")];
    const previewFrame = section.querySelector(".SC-preview-frame");
    const previewImage = section.querySelector(".SC-preview-image");
    const previewTitle = section.querySelector(".SC-preview-title");
    const previewMeta = section.querySelector(".SC-preview-meta");
    const downloadButton = section.querySelector(".SC-download");
    const openButton = section.querySelector(".SC-open");

    const dialog = section.querySelector(".SC-dialog");
    const dialogImage = section.querySelector(".SC-dialog-image");
    const dialogCaption = section.querySelector(".SC-dialog-caption");
    const dialogClose = section.querySelector(".SC-dialog-close");

    let currentCertificate = certificateItems[0] || null;

    function activateTab(tab) {
      const panelId = tab.getAttribute("aria-controls");

      tabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });

      panels.forEach((panel) => {
        const active = panel.id === panelId;
        panel.hidden = !active;

        requestAnimationFrame(() => {
          panel.classList.toggle("is-visible", active);
        });
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activateTab(tab));

      tab.addEventListener("keydown", (event) => {
        if (!["ArrowRight", "ArrowLeft"].includes(event.key)) return;

        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const currentIndex = tabs.indexOf(tab);
        const nextTab = tabs[(currentIndex + direction + tabs.length) % tabs.length];
        nextTab.focus();
        activateTab(nextTab);
      });
    });

    function setCertificate(item) {
      if (!item || !previewImage) return;

      currentCertificate = item;
      const image = item.dataset.image || "";
      const title = item.dataset.title || "Certificate";
      const date = item.dataset.date || "";
      const issuer = item.dataset.issuer || "";
      const download = item.dataset.download || image;

      certificateItems.forEach((certificate) => {
        certificate.classList.toggle("is-selected", certificate === item);
      });

      previewFrame?.classList.add("is-loading");

      const preload = new Image();
      preload.onload = () => {
        previewImage.src = image;
        previewImage.alt = `Preview of ${title}`;
        previewImage.classList.remove("is-changing");
        void previewImage.offsetWidth;
        previewImage.classList.add("is-changing");

        if (previewTitle) previewTitle.textContent = title;
        if (previewMeta) previewMeta.textContent = [issuer, date].filter(Boolean).join(" · ");
        if (downloadButton) downloadButton.href = download;

        previewFrame?.classList.remove("is-loading");
      };

      preload.onerror = () => {
        previewFrame?.classList.remove("is-loading");
        console.warn(`Could not load certificate preview: ${image}`);
      };

      preload.src = image;
    }

    certificateItems.forEach((item) => {
      item.addEventListener("click", () => setCertificate(item));
    });

    function openFullscreenPreview() {
      if (!currentCertificate || !dialog || !dialogImage) return;

      const title = currentCertificate.dataset.title || "Certificate";
      const date = currentCertificate.dataset.date || "";
      const issuer = currentCertificate.dataset.issuer || "";
      const image = currentCertificate.dataset.image || "";

      dialogImage.src = image;
      dialogImage.alt = `Fullscreen preview of ${title}`;

      if (dialogCaption) {
        dialogCaption.textContent = [title, issuer, date].filter(Boolean).join(" · ");
      }

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        window.open(image, "_blank", "noopener,noreferrer");
      }
    }

    openButton?.addEventListener("click", openFullscreenPreview);
    previewImage?.addEventListener("click", openFullscreenPreview);
    previewImage?.style.setProperty("cursor", "zoom-in");

    dialogClose?.addEventListener("click", () => dialog?.close());

    dialog?.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;

      if (outside) dialog.close();
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          section.classList.toggle("is-inview", entry.isIntersecting);

          if (entry.isIntersecting) {
            section.querySelectorAll(".SC-progress span").forEach((bar) => {
              bar.style.animation = "none";
              void bar.offsetWidth;
              bar.style.animation = "";
            });
          }
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(section);
    

    /* =========================================
   FULL-SCREEN REFERENCES MODAL
========================================= */

const referenceOpenButtons = [
  ...section.querySelectorAll(".SC-people-reference-button")
];

const referencesModal = section.querySelector(
  ".SC-references-modal"
);

const referencesModalBackdrop = section.querySelector(
  ".SC-references-modal-backdrop"
);

const referencesModalClose = section.querySelector(
  ".SC-references-modal-close"
);

let lastReferenceOpenButton = null;
let referenceModalClosing = false;


function openReferencesModal(button) {
  if (!referencesModal || referenceModalClosing) return;

  lastReferenceOpenButton = button;

  referencesModal.classList.remove("is-closing");
  referencesModal.hidden = false;

  document.documentElement.classList.add(
    "SC-references-modal-open"
  );

  document.body.classList.add(
    "SC-references-modal-open"
  );

  requestAnimationFrame(() => {
    referencesModalClose?.focus();
  });
}


function closeReferencesModal() {
  if (
    !referencesModal ||
    referencesModal.hidden ||
    referenceModalClosing
  ) {
    return;
  }

  referenceModalClosing = true;

  referencesModal.classList.add("is-closing");

  window.setTimeout(() => {
    referencesModal.hidden = true;

    referencesModal.classList.remove("is-closing");

    document.documentElement.classList.remove(
      "SC-references-modal-open"
    );

    document.body.classList.remove(
      "SC-references-modal-open"
    );

    referenceModalClosing = false;

    lastReferenceOpenButton?.focus();
  }, 300);
}


referenceOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openReferencesModal(button);
  });
});


referencesModalClose?.addEventListener(
  "click",
  closeReferencesModal
);


referencesModalBackdrop?.addEventListener(
  "click",
  closeReferencesModal
);


document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    referencesModal &&
    !referencesModal.hidden
  ) {
    closeReferencesModal();
  }
});

  });
})();





(() => {
  const footer = document.querySelector(".PORTFOOT-footer");

  if (!footer) return;

  const topButton = footer.querySelector(".PORTFOOT-go-up");
  const year = footer.querySelector(".PORTFOOT-current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  topButton?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
})();




  (() => {
    const journalSection = document.querySelector(".JOURNAL-section");

    if (!journalSection) return;

    /* -----------------------------------------
       Scroll reveal
    ----------------------------------------- */

    const revealItems = journalSection.querySelectorAll(".JOURNAL-reveal");

    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("JOURNAL-visible");
            observer.unobserve(entry.target);
          });
        },
        {
          threshold: 0.14,
          rootMargin: "0px 0px -50px 0px"
        }
      );

      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      revealItems.forEach((item) =>
        item.classList.add("JOURNAL-visible")
      );
    }

    /* -----------------------------------------
       Bird flight
    ----------------------------------------- */

    const birdFlight = journalSection.querySelector(
      ".JOURNAL-bird-flight"
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let birdInterval = null;
    let hasStartedFlying = false;

    const playBirdAnimation = () => {
      if (!birdFlight || reducedMotion) return;

      birdFlight.classList.remove("JOURNAL-bird-flight--active");

      // Restart the CSS animation.
      void birdFlight.offsetWidth;

      birdFlight.classList.add("JOURNAL-bird-flight--active");
    };

    const startBirdCycle = () => {
      if (hasStartedFlying || reducedMotion) return;

      hasStartedFlying = true;

      playBirdAnimation();

      // Bird returns after the first animation finishes.
      birdInterval = window.setInterval(playBirdAnimation, 23000);
    };

    if ("IntersectionObserver" in window && birdFlight) {
      const birdObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            startBirdCycle();
            birdObserver.disconnect();
          });
        },
        {
          threshold: 0.15
        }
      );

      birdObserver.observe(journalSection);
    } else {
      startBirdCycle();
    }

    /* -----------------------------------------
       Subtle desktop card tilt
    ----------------------------------------- */

    const tiltCards = journalSection.querySelectorAll(
      "[data-journal-tilt]"
    );

    const allowTilt = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (allowTilt && !reducedMotion) {
      tiltCards.forEach((card) => {
        const isFeatured = card.classList.contains(
          "JOURNAL-card--featured"
        );

        card.addEventListener("pointermove", (event) => {
          const bounds = card.getBoundingClientRect();

          const relativeX = event.clientX - bounds.left;
          const relativeY = event.clientY - bounds.top;

          const centerX = bounds.width / 2;
          const centerY = bounds.height / 2;

          const rotateY =
            ((relativeX - centerX) / centerX) * 2.4;

          const rotateX =
            ((centerY - relativeY) / centerY) * 2.4;

          const lift = isFeatured
            ? "translateY(-17px)"
            : "translateY(-3px)";

          card.style.transform = `
            ${lift}
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
          `;
        });

        card.addEventListener("pointerleave", () => {
          card.style.transform = isFeatured
            ? "translateY(-17px)"
            : "";
        });
      });
    }

    /* -----------------------------------------
       Cleanup
    ----------------------------------------- */

    window.addEventListener(
      "pagehide",
      () => {
        if (birdInterval) {
          window.clearInterval(birdInterval);
        }
      },
      { once: true }
    );
  })();
