// ─── DATA ─────────────────────────────────────────────────────────────────
const PRODUCER = {
  name: "Rhemy Beatz",
  tagline: "Beats That Hit Different",
  bio: "Multi-platinum producer with over a decade of experience crafting sounds for the world's top artists. Based in Atlanta, GA — XTRXMZ blends trap, melodic hip-hop, and dark cinematic textures into beats that don't just play, they move people.",
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
  email: "contact@xtrxmz.com",
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
  renderProducer();
  renderBeats(BEATS);
  setupFilters();
  setupPlayer();
  setupContact();
  setupModal();
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
    <div class="beat-card${currentBeat && currentBeat.id === beat.id ? " playing" : ""}"
         data-id="${beat.id}" onclick="handleBeatCardClick(${beat.id}, event)">
      <div class="beat-artwork" style="background: ${getBeatGradient(beat)}">
        <div class="beat-artwork-placeholder">${getInitials(beat.title)}</div>
        <div class="beat-play-btn">
          <div class="beat-play-icon">
            ${currentBeat && currentBeat.id === beat.id && isPlaying
              ? `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`
              : `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`
            }
          </div>
        </div>
        <div class="beat-playing-indicator">PLAYING</div>
      </div>
      <div class="beat-info">
        <div class="beat-title">${beat.title}</div>
        <div class="beat-meta">
          <span class="beat-tag gold">${beat.genre}</span>
          <span class="beat-tag">${beat.bpm} BPM</span>
          <span class="beat-tag">${beat.key}</span>
        </div>
        <div class="beat-footer">
          <div class="beat-price">$${beat.price.toFixed(2)}<span>/ basic</span></div>
          <button class="beat-buy-btn" onclick="openModal(${beat.id}, event)">Details</button>
        </div>
      </div>
    </div>
  `).join("");
}

function handleBeatCardClick(id, e) {
  if (e.target.closest(".beat-buy-btn")) return;
  playBeat(id);
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
  if (isPlaying) {
    btn.classList.add("playing");
    startSimulatedProgress();
  } else {
    btn.classList.remove("playing");
    clearInterval(progressTimer);
  }
  renderBeats(filteredBeats);
}

function updatePlayerInfo() {
  if (!currentBeat) return;
  document.getElementById("player-title").textContent = currentBeat.title;
  document.getElementById("player-genre").textContent = `${currentBeat.genre} · ${currentBeat.bpm} BPM · ${currentBeat.key}`;
  document.getElementById("player-art-initials").textContent = getInitials(currentBeat.title);
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
    `<span class="beat-tag">${t}</span>`).join("");
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
}

// ─── BOOT ─────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", init);
