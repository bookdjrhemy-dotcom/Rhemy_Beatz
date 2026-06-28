// ─── DATA ─────────────────────────────────────────────────────────────────
const PRODUCER = {
  name: "RHEMY BEATZ",
  tagline: "High Quality Beats For Artists Who Want To Win.",
  bio: "Multi-platinum producer with over a decade of experience crafting sounds for the world's top artists. Based in Atlanta, GA — Rhemy Beatz blends trap, melodic hip-hop, and dark cinematic textures into beats that don't just play, they move people.",
  bio2: "Known for pushing sonic boundaries and delivering professional, radio-ready instrumentals that sit perfectly in any mix.",
  credits: "Featured on 200+ tracks. Collaborated with Grammy-winning artists. Placements across major labels including Atlantic, Interscope, and Republic Records.",
  achievements: "2M+ streams across all platforms. 3× Billboard charting tracks. Producer of the Year nominee 2023. Gold certified placement.",
  stats: [
    { num: "200+", label: "Tracks Produced" },
    { num: "2M+",  label: "Total Streams" },
    { num: "3×",   label: "Billboard Charted" },
    { num: "10+",  label: "Years Active" },
  ],
  instagram: "https://instagram.com",
  youtube: "https://youtube.com",
  tiktok: "https://tiktok.com",
  email: "bookdjrhemy@gmail.com",
};

const BEATS = [
  {
    id: 1, title: "Dark Skies",
    desc: "An atmospheric trap banger with haunting strings and hard-hitting 808s. Perfect for introspective bars over cinematic production.",
    genre: "Trap", bpm: 140, key: "F# Minor", mood: "Dark",
    tags: ["Trap", "Dark", "Cinematic"],
    price: 29.99, basic: 29.99, premium: 79.99, exclusive: 499.99,
    color: "#1a0a1a",
  },
  {
    id: 2, title: "Golden Hour",
    desc: "Melodic hip-hop with warm piano chords and smooth, rolling drums. A summer anthem waiting to happen.",
    genre: "Hip-Hop", bpm: 95, key: "C Major", mood: "Uplifting",
    tags: ["Melodic", "Piano", "Summer"],
    price: 24.99, basic: 24.99, premium: 69.99, exclusive: 449.99,
    color: "#1a1200",
  },
  {
    id: 3, title: "Midnight Run",
    desc: "High-energy drill production with rolling 808 patterns and razor-sharp hi-hats. Built for the streets.",
    genre: "Drill", bpm: 145, key: "D Minor", mood: "Aggressive",
    tags: ["Drill", "Aggressive", "808s"],
    price: 34.99, basic: 34.99, premium: 89.99, exclusive: 599.99,
    color: "#0a0f1a",
  },
  {
    id: 4, title: "Neon Nights",
    desc: "Atmospheric R&B trap fusion with silky synths and minimal, spacious drums. For artists who move at their own pace.",
    genre: "R&B", bpm: 85, key: "A Minor", mood: "Moody",
    tags: ["R&B", "Atmospheric", "Smooth"],
    price: 27.99, basic: 27.99, premium: 74.99, exclusive: 479.99,
    color: "#001a1a",
  },
  {
    id: 5, title: "Phantom Keys",
    desc: "Gothic trap with orchestral elements, eerie piano stabs, and cavernous reverb. A cinematic experience.",
    genre: "Trap", bpm: 138, key: "E Minor", mood: "Dark",
    tags: ["Gothic", "Orchestral", "Cinematic"],
    price: 39.99, basic: 39.99, premium: 99.99, exclusive: 699.99,
    color: "#0d0a1a",
  },
  {
    id: 6, title: "Sunrise Drip",
    desc: "Laid-back West Coast vibes with jazz-influenced chords and head-nodding groove. Perfect for storytelling.",
    genre: "Hip-Hop", bpm: 88, key: "Bb Major", mood: "Chill",
    tags: ["West Coast", "Jazz", "Groove"],
    price: 22.99, basic: 22.99, premium: 64.99, exclusive: 399.99,
    color: "#1a0f00",
  },
  {
    id: 7, title: "Electric Soul",
    desc: "Afrobeats-infused trap with electric guitar loops and infectious hi-hat patterns. Pure vibe.",
    genre: "Afrobeats", bpm: 105, key: "G Major", mood: "Energetic",
    tags: ["Afrobeats", "Guitar", "Vibey"],
    price: 31.99, basic: 31.99, premium: 84.99, exclusive: 549.99,
    color: "#001a0a",
  },
  {
    id: 8, title: "Frozen Time",
    desc: "Dreamy lofi hip-hop with vintage textures, dusty samples, and a melancholic piano melody.",
    genre: "Lo-Fi", bpm: 78, key: "C# Minor", mood: "Melancholic",
    tags: ["Lo-Fi", "Dreamy", "Piano"],
    price: 19.99, basic: 19.99, premium: 54.99, exclusive: 349.99,
    color: "#0a0f1a",
  },
];

// ─── STATE ────────────────────────────────────────────────────────────────
let currentBeat = null;
let isPlaying = false;
let currentQueue = [...BEATS];
let filteredBeats = [...BEATS];
const audioEl = document.getElementById("audio");

// ─── INIT ─────────────────────────────────────────────────────────────────
function init() {
  setupLoadingScreen();
  setupCursor();
  setupNavScroll();
  setupHeroParallax();
  setupScrollIndicator();
  setupMobileMenu();
  // Only run setupHubHero if on hub.html
  if (window.location.pathname.includes('hub.html') || window.location.pathname.endsWith('/hub')) {
    setupHubHero();
  }
  renderProducer();
  renderBeats(BEATS);
  setupFilters();
  setupPlayer();
  setupContact();
  setupModal();
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────
function setupLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  const waveform = document.getElementById("loading-waveform");
  const particles = document.getElementById("loading-particles");
  
  // Create waveform bars
  for (let i = 0; i < 9; i++) {
    const bar = document.createElement("div");
    bar.className = "loading-waveform-bar";
    waveform.appendChild(bar);
  }
  
  // Create floating particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(216,31,38,${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
      animation-delay: ${Math.random() * 5}s;
    `;
    particles.appendChild(particle);
  }
  
  // Add particle animation keyframes dynamically
  const style = document.createElement("style");
  style.textContent = `
    @keyframes particleFloat {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 3000);
}

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────
function setupCursor() {
  const cursor = document.getElementById("cursor");
  const cursorRing = document.getElementById("cursor-ring");
  
  if (!cursor || !cursorRing) return;
  
  // Disable on touch devices
  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorRing.style.display = 'none';
    return;
  }
  
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursorRing.style.left = e.clientX + "px";
    cursorRing.style.top = e.clientY + "px";
  });
  
  // Context-aware cursor interactions
  document.querySelectorAll("a, button, .beat-row, .beat-card, .perk-card, .genre-card, .hub-card, .service-card").forEach(el => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hovering");
      cursorRing.classList.add("hovering");
      
      // Context-specific cursor modes
      if (el.classList.contains("beat-row") || el.classList.contains("play-pause-btn")) {
        cursor.classList.add("play-mode");
      } else if (el.querySelector(".beat-row-btn[title='Like']") || el.title === "Wishlist") {
        cursor.classList.add("heart-mode");
      } else if (el.title === "Cart" || el.querySelector(".beat-row-btn[title='Add to Cart']")) {
        cursor.classList.add("cart-mode");
      }
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovering", "play-mode", "heart-mode", "cart-mode");
      cursorRing.classList.remove("hovering");
    });
  });
}

// ─── NAV SCROLL EFFECT ────────────────────────────────────────────────────
function setupNavScroll() {
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });
}

// ─── HERO PARALLAX ────────────────────────────────────────────────────────
function setupHeroParallax() {
  const heroBg = document.getElementById("hero-bg");
  const heroContent = document.querySelector(".hero-content");
  
  if (!heroBg) return;
  
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroBg.style.transform = `scale(1.15) translate(${x}px, ${y}px)`;
  });
  
  // Create floating particles
  const particlesContainer = document.getElementById("hero-particles");
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: rgba(216,31,38,${Math.random() * 0.4 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 15 + 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      particlesContainer.appendChild(particle);
    }
  }
}

// ─── SCROLL INDICATOR ──────────────────────────────────────────────────────
function setupScrollIndicator() {
  const scrollIndicator = document.getElementById("scroll-indicator");
  if (!scrollIndicator) return;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      scrollIndicator.classList.add("hidden");
    } else {
      scrollIndicator.classList.remove("hidden");
    }
  });
}

// ─── HUB HERO ──────────────────────────────────────────────────────────────
function setupHubHero() {
  const hubHeroParticles = document.getElementById("hub-hero-particles");
  const bodWaveform = document.getElementById("bod-waveform");
  
  // Create floating particles for Hub hero
  if (hubHeroParticles) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(216,31,38,${Math.random() * 0.3 + 0.1});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 10 + 10}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      hubHeroParticles.appendChild(particle);
    }
  }
  
  // Create waveform bars for Beat of Day
  if (bodWaveform) {
    for (let i = 0; i < 20; i++) {
      const bar = document.createElement("div");
      bar.className = "bod-waveform-bar";
      bar.style.cssText = `
        width: 3px;
        height: ${Math.random() * 60 + 20}%;
        background: var(--accent);
        border-radius: 2px;
        animation: bodWaveformAnim ${Math.random() * 0.5 + 0.5}s ease-in-out infinite alternate;
        animation-delay: ${i * 0.05}s;
      `;
      bodWaveform.appendChild(bar);
    }
  }
  
  // Add dynamic keyframes for Hub particles
  const style = document.createElement("style");
  style.textContent = `
    @keyframes floatParticle {
      0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
      25% { transform: translateY(-30px) translateX(10px); opacity: 0.6; }
      50% { transform: translateY(-10px) translateX(-10px); opacity: 0.4; }
      75% { transform: translateY(-40px) translateX(5px); opacity: 0.5; }
    }
    @keyframes bodWaveformAnim {
      0% { transform: scaleY(0.3); }
      100% { transform: scaleY(1); }
    }
  `;
  document.head.appendChild(style);
}

// ─── MOBILE MENU ──────────────────────────────────────────────────────────
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
  const mobileMenuActions = document.querySelectorAll(".mobile-menu-action");
  
  if (!mobileMenuBtn || !mobileMenu) return;
  
  function openMenu() {
    mobileMenu.classList.add("active");
    mobileMenuBtn.classList.add("active");
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    
    // Staggered animations for menu items
    mobileMenuLinks.forEach((link, index) => {
      const delay = parseInt(link.dataset.delay) || index * 50;
      link.style.transitionDelay = `${delay}ms`;
    });
    
    mobileMenuActions.forEach((action, index) => {
      const delay = parseInt(action.dataset.delay) || (index + 6) * 50;
      action.style.transitionDelay = `${delay}ms`;
    });
    
    // Update active state based on current section
    updateActiveMenuLink();
  }
  
  function closeMenu() {
    mobileMenu.classList.remove("active");
    mobileMenuBtn.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    
    // Reset transition delays
    mobileMenuLinks.forEach(link => {
      link.style.transitionDelay = "0ms";
    });
    
    mobileMenuActions.forEach(action => {
      action.style.transitionDelay = "0ms";
    });
  }
  
  function updateActiveMenuLink() {
    const scrollPos = window.scrollY + 100;
    const sections = document.querySelectorAll("section[id]");
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        mobileMenuLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }
  
  mobileMenuBtn.addEventListener("click", openMenu);
  mobileMenuClose.addEventListener("click", closeMenu);
  mobileMenuOverlay.addEventListener("click", closeMenu);
  
  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      closeMenu();
    }
  });
  
  // Close menu when clicking a link
  mobileMenuLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
  
  // Update active link on scroll
  window.addEventListener("scroll", () => {
    if (mobileMenu.classList.contains("active")) {
      updateActiveMenuLink();
    }
  });
  
  // Update Now Playing section
  updateMobileMenuNowPlaying();
}

function updateMobileMenuNowPlaying() {
  const nowPlayingSection = document.getElementById("mobile-menu-now-playing");
  const npTitle = document.getElementById("mobile-menu-np-title");
  const npGenre = document.getElementById("mobile-menu-np-genre");
  const npInitials = document.getElementById("mobile-menu-np-initials");
  const npPlayBtn = document.getElementById("mobile-menu-np-play");
  
  if (!nowPlayingSection) return;
  
  if (currentBeat) {
    nowPlayingSection.classList.remove("hidden");
    npTitle.textContent = currentBeat.title;
    npGenre.textContent = `${currentBeat.genre} · ${currentBeat.bpm} BPM`;
    npInitials.textContent = getInitials(currentBeat.title);
    
    if (isPlaying) {
      npPlayBtn.classList.add("playing");
    } else {
      npPlayBtn.classList.remove("playing");
    }
    
    npPlayBtn.onclick = () => {
      togglePlayPause();
      updateMobileMenuNowPlaying();
    };
  } else {
    nowPlayingSection.classList.add("hidden");
  }
}

// ─── PRODUCER ─────────────────────────────────────────────────────────────
function renderProducer() {
  document.getElementById("hero-name").textContent = PRODUCER.name;
  document.getElementById("hero-tagline").textContent = PRODUCER.tagline;
  document.getElementById("about-bio-1").textContent = PRODUCER.bio;
  document.getElementById("about-bio-2").textContent = PRODUCER.bio2;
  document.getElementById("credits-text").textContent = PRODUCER.credits;
  document.getElementById("achievements-text").textContent = PRODUCER.achievements;
  document.querySelectorAll(".nav-logo").forEach(el => el.textContent = PRODUCER.name);
  document.querySelectorAll(".footer-name").forEach(el => el.textContent = PRODUCER.name);

  const statsEl = document.getElementById("about-stats");
  statsEl.innerHTML = PRODUCER.stats.map(s => `
    <div class="stat-card">
      <div class="stat-num">${s.num}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join("");
}

// ─── BEATS GRID ───────────────────────────────────────────────────────────
function getInitials(title) {
  return title.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

function getBeatGradient(beat) {
  return `linear-gradient(135deg, ${beat.color || '#111'} 0%, #0a0a0a 100%)`;
}

function renderBeats(beats) {
  filteredBeats = beats;
  currentQueue = beats;
  const grid = document.getElementById("beats-grid");
  const countEl = document.getElementById("beat-count");
  countEl.textContent = `${beats.length} beat${beats.length !== 1 ? "s" : ""}`;

  if (beats.length === 0) {
    grid.innerHTML = `<div class="no-beats">
      <svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      No beats found. Try clearing your filters.
    </div>`;
    return;
  }

  grid.innerHTML = beats.map(beat => `
    <div class="beat-row${currentBeat && currentBeat.id === beat.id ? " playing" : ""}"
         data-id="${beat.id}" onclick="handleBeatRowClick(${beat.id}, event)">
      <div class="beat-row-artwork" style="background: ${getBeatGradient(beat)}">
        <div class="beat-row-artwork-placeholder">${getInitials(beat.title)}</div>
      </div>
      <div class="beat-row-info">
        <div class="beat-row-title">${beat.title}</div>
        <div class="beat-row-meta">
          <span>${beat.genre}</span>
          <span>•</span>
          <span>${beat.bpm} BPM</span>
          <span>•</span>
          <span>${beat.key}</span>
        </div>
      </div>
      <div class="beat-row-waveform">
        <div class="beat-row-waveform-bar"></div>
        <div class="beat-row-waveform-bar"></div>
        <div class="beat-row-waveform-bar"></div>
        <div class="beat-row-waveform-bar"></div>
        <div class="beat-row-waveform-bar"></div>
        <div class="beat-row-waveform-bar"></div>
        <div class="beat-row-waveform-bar"></div>
        <div class="beat-row-waveform-bar"></div>
      </div>
      <div class="beat-row-price">$${beat.price.toFixed(2)}</div>
      <div class="beat-row-actions">
        <button class="beat-row-btn" title="Like" onclick="toggleLike(${beat.id}, event)">
          <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
        <button class="beat-row-btn" title="Add to Cart" onclick="addToCart(${beat.id}, event)">
          <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </button>
        <button class="beat-row-btn" title="Buy Now" onclick="openModal(${beat.id}, event)">
          <svg viewBox="0 0 24 24"><path d="M5 4v2h14V4H5zm0 4v2h14V8H5zm0 4v2h14v-2H5zm0 4v2h14v-2H5z"/></svg>
        </button>
      </div>
    </div>
  `).join("");
}

function handleBeatRowClick(id, e) {
  if (e.target.closest(".beat-row-btn")) return;
  playBeat(id);
}

function toggleLike(id, e) {
  e.stopPropagation();
  const btn = e.currentTarget;
  btn.classList.toggle("liked");
}

function addToCart(id, e) {
  e.stopPropagation();
  // Add cart functionality here
  alert("Added to cart!");
}

// ─── FILTERS ──────────────────────────────────────────────────────────────
function setupFilters() {
  const genres = [...new Set(BEATS.map(b => b.genre))].sort();
  const moods  = [...new Set(BEATS.map(b => b.mood))].sort();
  const genreSel = document.getElementById("filter-genre");
  const moodSel  = document.getElementById("filter-mood");
  genres.forEach(g => { const o = document.createElement("option"); o.value = g; o.textContent = g; genreSel.appendChild(o); });
  moods.forEach(m  => { const o = document.createElement("option"); o.value = m; o.textContent = m; moodSel.appendChild(o); });

  document.getElementById("filter-search").addEventListener("input", applyFilters);
  genreSel.addEventListener("change", applyFilters);
  moodSel.addEventListener("change", applyFilters);
}

function applyFilters() {
  const search = document.getElementById("filter-search").value.toLowerCase().trim();
  const genre  = document.getElementById("filter-genre").value;
  const mood   = document.getElementById("filter-mood").value;

  const result = BEATS.filter(b => {
    if (search && !b.title.toLowerCase().includes(search) &&
        !b.genre.toLowerCase().includes(search) &&
        !b.mood.toLowerCase().includes(search)) return false;
    if (genre && b.genre !== genre) return false;
    if (mood  && b.mood  !== mood)  return false;
    return true;
  });
  renderBeats(result);
}

// ─── AUDIO PLAYER ─────────────────────────────────────────────────────────
function playBeat(idOrBeat) {
  const beat = typeof idOrBeat === "number" ? BEATS.find(b => b.id === idOrBeat) : idOrBeat;
  if (!beat) return;

  if (currentBeat && currentBeat.id === beat.id) {
    togglePlayPause();
    return;
  }

  currentBeat = beat;
  isPlaying = true;

  // Update player UI
  updatePlayerInfo();
  document.getElementById("player").classList.add("visible");
  document.querySelector(".play-pause-btn").classList.add("playing");

  // Audio: in a static file we can't load real audio, so we simulate progress
  audioEl.pause();
  audioEl.src = ""; // No real audio in static build
  startSimulatedProgress();

  // Refresh beats grid to show playing state
  renderBeats(filteredBeats);
}

function togglePlayPause() {
  if (!currentBeat) return;
  isPlaying = !isPlaying;
  const btn = document.querySelector(".play-pause-btn");
  const player = document.getElementById("player");
  if (isPlaying) {
    btn.classList.add("playing");
    player.classList.add("playing");
    startSimulatedProgress();
  } else {
    btn.classList.remove("playing");
    player.classList.remove("playing");
    clearInterval(progressTimer);
  }
  renderBeats(filteredBeats);
  updateMobileMenuNowPlaying();
}

function updatePlayerInfo() {
  if (!currentBeat) return;
  document.getElementById("player-title").textContent = currentBeat.title;
  document.getElementById("player-genre").textContent = `${currentBeat.genre} · ${currentBeat.bpm} BPM · ${currentBeat.key}`;
  document.getElementById("player-art-initials").textContent = getInitials(currentBeat.title);
  
  // Create waveform bars
  const waveform = document.getElementById("player-waveform");
  waveform.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const bar = document.createElement("div");
    bar.className = "player-waveform-bar";
    waveform.appendChild(bar);
  }
}

// Simulated progress (since we have no real audio files in a static build)
let progressTimer = null;
let simProgress = 0;
const SIM_DURATION = 180; // 3 minutes

function startSimulatedProgress() {
  clearInterval(progressTimer);
  progressTimer = setInterval(() => {
    if (!isPlaying) { clearInterval(progressTimer); return; }
    simProgress = Math.min(simProgress + 1, SIM_DURATION);
    const pct = (simProgress / SIM_DURATION) * 100;
    document.getElementById("progress-fill").style.width = pct + "%";
    document.getElementById("progress-thumb").style.left  = pct + "%";
    document.getElementById("time-current").textContent = formatTime(simProgress);
    document.getElementById("time-total").textContent   = formatTime(SIM_DURATION);
    if (simProgress >= SIM_DURATION) { simProgress = 0; playNext(); }
  }, 1000);
}

function playNext() {
  if (!currentBeat || currentQueue.length === 0) return;
  const idx = currentQueue.findIndex(b => b.id === currentBeat.id);
  const next = currentQueue[(idx + 1) % currentQueue.length];
  simProgress = 0;
  playBeat(next.id);
}

function playPrev() {
  if (!currentBeat || currentQueue.length === 0) return;
  const idx = currentQueue.findIndex(b => b.id === currentBeat.id);
  const prev = currentQueue[(idx - 1 + currentQueue.length) % currentQueue.length];
  simProgress = 0;
  playBeat(prev.id);
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function setupPlayer() {
  document.querySelector(".play-pause-btn").addEventListener("click", togglePlayPause);
  document.getElementById("btn-next").addEventListener("click", () => { simProgress = 0; playNext(); });
  document.getElementById("btn-prev").addEventListener("click", () => { simProgress = 0; playPrev(); });

  // Progress bar scrubbing
  const progressTrack = document.getElementById("progress-track");
  progressTrack.addEventListener("click", e => {
    if (!currentBeat) return;
    const rect = progressTrack.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    simProgress = Math.floor(pct * SIM_DURATION);
    document.getElementById("progress-fill").style.width  = (pct * 100) + "%";
    document.getElementById("progress-thumb").style.left  = (pct * 100) + "%";
    document.getElementById("time-current").textContent   = formatTime(simProgress);
  });

  // Volume
  const volTrack = document.getElementById("volume-track");
  const volFill  = document.getElementById("volume-fill");
  volTrack.addEventListener("click", e => {
    const rect = volTrack.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    volFill.style.width = (pct * 100) + "%";
    audioEl.volume = pct;
  });
}

// ─── MODAL ────────────────────────────────────────────────────────────────
function setupModal() {
  document.getElementById("modal-overlay").addEventListener("click", e => {
    if (e.target === document.getElementById("modal-overlay")) closeModal();
  });
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
}

function openModal(id, e) {
  if (e) e.stopPropagation();
  const beat = BEATS.find(b => b.id === id);
  if (!beat) return;

  document.getElementById("modal-art-initials").textContent = getInitials(beat.title);
  document.getElementById("modal-art").style.background = getBeatGradient(beat);
  document.getElementById("modal-title").textContent = beat.title;
  document.getElementById("modal-desc").textContent = beat.desc;
  document.getElementById("modal-spec-genre").textContent = beat.genre;
  document.getElementById("modal-spec-bpm").textContent = beat.bpm + " BPM";
  document.getElementById("modal-spec-key").textContent = beat.key;
  document.getElementById("modal-spec-mood").textContent = beat.mood;
  document.getElementById("modal-tags").innerHTML = beat.tags.map(t =>
    `<span class="modal-tag">${t}</span>`).join("");
  document.getElementById("modal-license-basic").textContent    = `$${beat.basic.toFixed(2)}`;
  document.getElementById("modal-license-premium").textContent  = `$${beat.premium.toFixed(2)}`;
  document.getElementById("modal-license-exclusive").textContent = beat.exclusive ? `$${beat.exclusive.toFixed(2)}` : "Contact";

  document.getElementById("modal-play-btn").onclick = () => { playBeat(beat.id); closeModal(); };

  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// ─── CONTACT ──────────────────────────────────────────────────────────────
function setupContact() {
  document.getElementById("contact-form").addEventListener("submit", e => {
    e.preventDefault();
    const btn = document.getElementById("submit-btn");
    btn.textContent = "Sending…";
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById("contact-form").style.display = "none";
      document.getElementById("form-success").classList.add("show");
    }, 1200);
  });
  
  // Newsletter form
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", e => {
      e.preventDefault();
      newsletterForm.style.display = "none";
      document.getElementById("newsletter-success").classList.add("show");
    });
  }
}

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimonial-card");

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle("active", i === index);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}

function prevTestimonial() {
  currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentTestimonial);
}

// ─── BOOT ─────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", init);
