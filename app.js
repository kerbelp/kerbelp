/**
 * Pavel Kerbel — App Logic & Interactions (Vanilla JS)
 */

const EMAIL = "hello@pavelkerbel.com";

// --- Project Data ---
const PROJECTS = [
  {
    id: "metatron",
    kind: "MCP · Agent Infra",
    glyph: "graph",
    title: "Metatron",
    chips: ["TypeScript", "MCP", "Vector Store"],
    repo: "https://github.com/kerbelp/metatron",
    lede: "Coding agents lose the why behind a codebase the moment a session ends. Metatron persists architectural intent — decisions, constraints, and rationale — as structured priors and serves them to agents at inference time over the Model Context Protocol.",
    points: [
      "Captures design decisions as queryable, structured priors rather than freeform notes.",
      "Exposes context to any MCP-compatible agent — no per-tool integration work.",
      "Self-hosted by design: your architectural knowledge never leaves your infrastructure.",
      "Cuts hallucinated refactors by grounding agents in real prior decisions.",
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/kerbelp/metatron", icon: "github" }],
  },
  {
    id: "gemma",
    kind: "On-device AI · Android",
    glyph: "cpu",
    title: "Gemma 4 Edge AI App",
    chips: ["Kotlin", "Gemma 4", "On-device"],
    repo: "https://github.com/GemmaGuard/gemma-guard-android",
    lede: "Cloud inference means shipping user text off-device. This app runs a quantized Gemma 4 E2 model entirely on the phone — private by construction, functional offline, and tuned to live inside a mobile memory and thermal budget.",
    points: [
      "Local Gemma 4 E2 inference with no network round-trip — zero data leaves the device.",
      "Aggressive quantization and memory management to fit consumer Android hardware.",
      "Throughput tuned against real thermal and battery constraints, not benchmarks.",
      "Built for the Gemma 4 hackathon — full architecture writeup published.",
    ],
    links: [
      { label: "View on GitHub", href: "https://github.com/GemmaGuard/gemma-guard-android", icon: "github" },
      { label: "Read the writeup", href: "https://www.kaggle.com/competitions/gemma-4-good-hackathon/writeups/new-writeup-1775994235038", icon: "arrowUpRight" },
    ],
  },
  {
    id: "aicollection",
    kind: "Open Source · Platform",
    glyph: "layers",
    title: "AI Collection",
    chips: ["Open Source", "Community", "SEO"],
    repo: "https://github.com/ai-collection/ai-collection",
    stats: [
      { num: 8700, suffix: "+", lbl: "GitHub stars" },
      { num: 250, suffix: "K+", lbl: "Search clicks" },
    ],
    lede: "A community-curated directory of generative-AI applications that scaled into a genuine discovery platform — ranking organically for thousands of AI-tool queries and sustaining a contributor ecosystem.",
    points: [
      "Scaled to 8,700+ GitHub stars through sustained community contribution.",
      "Drove 250K+ organic Google Search clicks via structured, SEO-aware curation.",
      "Maintained an open contribution pipeline across hundreds of submissions.",
      "Became a default reference point for discovering generative-AI tooling.",
    ],
    links: [
      { label: "Visit the site", href: "http://thataicollection.com/", icon: "arrowUpRight" },
      { label: "View on GitHub", href: "https://github.com/ai-collection/ai-collection", icon: "github" },
    ],
  },
  {
    id: "zmail",
    kind: "Agentic Workflows",
    glyph: "flow",
    title: "Z-Mail Agent",
    chips: ["Python", "LangGraph", "LLM"],
    repo: "https://github.com/kerbelp",
    lede: "Most LLM email tools are a single brittle prompt. Z-Mail models the inbox as an explicit state graph — triage, drafting, and escalation become deterministic, inspectable transitions rather than emergent prompt behavior.",
    points: [
      "Non-linear agentic flows modeled as an explicit, auditable LangGraph state machine.",
      "Deterministic transitions make behavior reproducible and debuggable in production.",
      "Human-in-the-loop checkpoints for escalation on low-confidence actions.",
      "Built to run as real infrastructure — not a notebook demo.",
    ],
    links: [{ label: "View on GitHub", href: "https://github.com/kerbelp", icon: "github" }],
  },
];

// --- Inlined SVG Icons ---
const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>',
  arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  graph: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="7" r="2.4"/><circle cx="12" cy="18" r="2.4"/><path d="M7.7 7.6 10.4 16M16.4 8.7 13.4 16M8.3 6.4h7.4"/></svg>',
  cpu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v2.5M15 2v2.5M9 19.5V22M15 19.5V22M2 9h2.5M2 15h2.5M19.5 9H22M19.5 15H22"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></svg>',
  flow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h4a3 3 0 0 1 3 3v6"/></svg>'
};

// --- Easing Function for Count Up ---
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Ready reveal animations
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.add("ready");
    });
  });

  // 2. Header blur/border on scroll
  const header = document.getElementById("header");
  const updateHeaderScroll = () => {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // 3. Smooth scrolling for navigations & CTAs
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 70,
        behavior: "smooth"
      });
    }
  };

  document.getElementById("brand-logo").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("btn-view-projects").addEventListener("click", () => scrollToSection("projects"));
  document.getElementById("btn-read-writing").addEventListener("click", () => scrollToSection("writing"));

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSec = link.getAttribute("data-sec");
      scrollToSection(targetSec);
    });
  });

  // 4. Scroll Spy (Active nav highlighting)
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = ["projects", "writing", "stack", "contact"];
  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 140;
    let activeSec = sections[0];
    for (const sec of sections) {
      const el = document.getElementById(sec);
      if (el && el.offsetTop <= scrollPos) {
        activeSec = sec;
      }
    }
    navLinks.forEach((link) => {
      if (link.getAttribute("data-sec") === activeSec) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };
  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  // 5. Pointer-tracked hover glow effects
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });

  // 6. Project Modal handlers
  const modalScrim = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");

  const openModal = (project) => {
    const statsHTML = project.stats ? `
      <div class="card-stats" style="margin-top: 24px;">
        ${project.stats.map(s => `
          <div class="stat">
            <span class="num">${s.num.toLocaleString()}${s.suffix}</span>
            <span class="lbl">${s.lbl}</span>
          </div>
        `).join('')}
      </div>
    ` : '';

    const pointsHTML = project.points.map(pt => `
      <li>${ICONS['check']} <span>${pt}</span></li>
    `).join('');

    const chipsHTML = project.chips.map(c => `
      <span class="chip">${c}</span>
    `).join('');

    const linksHTML = project.links.map(l => {
      const iconSVG = ICONS[l.icon] || ICONS['arrowUpRight'];
      const isPrimary = l.icon === 'github';
      return `
        <a class="btn ${isPrimary ? 'btn-primary' : 'btn-ghost'}" href="${l.href}" target="_blank" rel="noreferrer">
          ${iconSVG} ${l.label}
        </a>
      `;
    }).join('');

    modalContent.innerHTML = `
      <div class="modal-hd">
        <div class="card-glyph">${ICONS[project.glyph]}</div>
        <button class="modal-close" id="modal-close-btn" aria-label="Close">${ICONS['close']}</button>
      </div>
      <div class="modal-body">
        <div class="modal-kind">${project.kind}</div>
        <h2>${project.title}</h2>
        <p class="lede">${project.lede}</p>
        ${statsHTML}
        <div class="modal-section-label">Highlights</div>
        <ul class="modal-points">
          ${pointsHTML}
        </ul>
        <div class="modal-section-label">Stack</div>
        <div class="modal-chips">
          ${chipsHTML}
        </div>
        <div class="modal-actions">
          ${linksHTML}
        </div>
      </div>
    `;

    modalScrim.style.display = "grid";
    document.body.style.overflow = "hidden";

    // Attach internal close action
    document.getElementById("modal-close-btn").addEventListener("click", closeModal);
  };

  const closeModal = () => {
    modalScrim.style.display = "none";
    document.body.style.overflow = "";
    modalContent.innerHTML = "";
  };

  // Attach card triggers
  document.querySelectorAll(".card").forEach((card) => {
    const projectId = card.getAttribute("data-project-id");
    const projectObj = PROJECTS.find(p => p.id === projectId);
    
    if (projectObj) {
      card.addEventListener("click", () => openModal(projectObj));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") openModal(projectObj);
      });
    }
  });

  // Modal scrim dismissals
  modalScrim.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalScrim.style.display === "grid") {
      closeModal();
    }
  });

  // 7. Copy email action & Toast notification
  const toast = document.getElementById("toast-notification");
  let toastTimeout = null;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch (_) {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (_) {}
      document.body.removeChild(ta);
    }

    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
  };

  document.getElementById("btn-copy-email").addEventListener("click", copyEmail);

  // 8. Stats counting animation when scrolled into view
  const starsEl = document.getElementById("stat-stars");
  const clicksEl = document.getElementById("stat-clicks");
  const projectsSection = document.getElementById("projects");

  let statsAnimated = false;
  const duration = 1400; // ms

  const animateStats = () => {
    const start = performance.now();
    const starsTarget = parseInt(starsEl.getAttribute("data-target"), 10);
    const clicksTarget = parseInt(clicksEl.getAttribute("data-target"), 10);

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      const currentStars = Math.round(starsTarget * eased);
      const currentClicks = Math.round(clicksTarget * eased);

      starsEl.textContent = `${currentStars.toLocaleString()}+`;
      clicksEl.textContent = `${currentClicks}K+`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        starsEl.textContent = `${starsTarget.toLocaleString()}+`;
        clicksEl.textContent = `${clicksTarget}K+`;
      }
    };
    requestAnimationFrame(step);
  };

  const checkScrollForStats = () => {
    if (statsAnimated || !projectsSection) return;
    const rect = projectsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      statsAnimated = true;
      animateStats();
      window.removeEventListener("scroll", checkScrollForStats);
    }
  };

  // Run on initial check
  checkScrollForStats();
  requestAnimationFrame(checkScrollForStats);
  window.addEventListener("scroll", checkScrollForStats, { passive: true });
});
