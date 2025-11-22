// ----- Default portfolio data -----
const defaultData = {
    hero: {
        name: "VIMAL CHAUHAN",
        tagline: "B.Tech IT | Web & App Developer"
    },
    work: [
        {
            year: "2024",
            role: "Backend Intern",
            company: "XYZ Tech",
            desc: "Built REST APIs and optimized DB queries."
        },
        {
            year: "2023",
            role: "Web Developer Intern",
            company: "ABC Solutions",
            desc: "Developed responsive web dashboards."
        }
    ],
    education: [
        {
            year: "2026",
            course: "B.Tech in Information Technology",
            institute: "Your College Name",
            desc: "CGPA: 8.5 / 10 (expected)"
        },
        {
            year: "2022",
            course: "Higher Secondary (PCM)",
            institute: "Your School",
            desc: "Percentage: 90%"
        }
    ],
    passions: ["Photography", "Gaming", "Badminton", "Movies"],
    languages: ["English", "Hindi"],
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "SQL", "Java"],
    contact: [
        { label: "Email", value: "youremail@example.com" },
        { label: "Phone", value: "+91-XXXXXXXXXX" },
        { label: "GitHub", value: "github.com/yourid" },
        { label: "LinkedIn", value: "linkedin.com/in/yourid" }
    ]
};

function getData() {
    const saved = localStorage.getItem("portfolioData");
    if (!saved) {
        localStorage.setItem("portfolioData", JSON.stringify(defaultData));
        return defaultData;
    }
    try {
        return JSON.parse(saved);
    } catch {
        return defaultData;
    }
}

function renderPortfolio() {
    const data = getData();

    // Hero
    const heroNameEl = document.getElementById("hero-name");
    const heroTaglineEl = document.getElementById("hero-tagline");
    heroNameEl.innerHTML = "";
    data.hero.name.split("").forEach((ch) => {
        const span = document.createElement("span");
        span.textContent = ch;
        heroNameEl.appendChild(span);
    });
    heroTaglineEl.textContent = data.hero.tagline;

    // Work
    const workList = document.getElementById("work-list");
    workList.innerHTML = "";
    data.work.forEach((job) => {
        const div = document.createElement("div");
        div.className = "timeline-item";
        div.innerHTML = `
      <div class="timeline-year">${job.year}</div>
      <div class="timeline-role">${job.role}</div>
      <div class="timeline-company">${job.company}</div>
      <p class="timeline-desc">${job.desc || ""}</p>
    `;
        workList.appendChild(div);
    });

    // Education
    const eduList = document.getElementById("education-list");
    eduList.innerHTML = "";
    data.education.forEach((edu) => {
        const div = document.createElement("div");
        div.className = "timeline-item";
        div.innerHTML = `
      <div class="timeline-year">${edu.year}</div>
      <div class="timeline-role">${edu.course}</div>
      <div class="timeline-company">${edu.institute}</div>
      <p class="timeline-desc">${edu.desc || ""}</p>
    `;
        eduList.appendChild(div);
    });

    // Passions
    const passionList = document.getElementById("passion-list");
    passionList.innerHTML = "";
    data.passions.forEach((p) => {
        const li = document.createElement("li");
        li.textContent = p;
        passionList.appendChild(li);
    });

    // Languages
    const langList = document.getElementById("languages-list");
    langList.innerHTML = "";
    data.languages.forEach((lang) => {
        const li = document.createElement("li");
        li.textContent = lang;
        langList.appendChild(li);
    });

    // Skills
    const skillsList = document.getElementById("skills-list");
    skillsList.innerHTML = "";
    data.skills.forEach((sk) => {
        const span = document.createElement("span");
        span.className = "skill-pill";
        span.textContent = sk;
        skillsList.appendChild(span);
    });

    // Contact
    const contactList = document.getElementById("contact-list");
    contactList.innerHTML = "";
    data.contact.forEach((c) => {
        const li = document.createElement("li");
        li.textContent = `${c.label}: ${c.value}`;
        contactList.appendChild(li);
    });

    setupLetterFlowAnimation();
    setupBackgroundAnimation();
}

/* ---- Interactive letter flow ---- */
function setupLetterFlowAnimation() {
    const nameEl = document.querySelector(".letter-flow");
    if (!nameEl) return;
    const letters = Array.from(nameEl.querySelectorAll("span"));

    nameEl.addEventListener("mousemove", (e) => {
        const rect = nameEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const center = rect.width / 2;

        letters.forEach((span, index) => {
            const offset = index / letters.length;
            const distance = (x - center) / rect.width;
            const strength = distance * 30 * (offset - 0.5); // wave
            span.style.transform = `translateY(${strength}px)`;
        });
    });

    nameEl.addEventListener("mouseleave", () => {
        letters.forEach((span) => {
            span.style.transform = "translateY(0)";
        });
    });

    letters.forEach((span) => {
        span.addEventListener("mouseenter", () => span.classList.add("hovered"));
        span.addEventListener("mouseleave", () => span.classList.remove("hovered"));
    });
}

/* ---- Cursor-reactive particle background ---- */
function setupBackgroundAnimation() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height;

    const particles = [];
    const numParticles = 80;
    const mouse = { x: null, y: null };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6
        });
    }

    window.addEventListener("mousemove", (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(255, 200, 60, 0.8)";
        ctx.strokeStyle = "rgba(255, 200, 60, 0.25)";

        particles.forEach((p, idx) => {
            // attraction to mouse
            if (mouse.x != null) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const force = dist < 180 ? (180 - dist) / 1800 : 0;
                p.vx += (dx / dist || 0) * force;
                p.vy += (dy / dist || 0) * force;
            }

            p.x += p.vx;
            p.y += p.vy;

            // wrap around
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();

            // connect to nearby
            for (let j = idx + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist2 = dx * dx + dy * dy;
                if (dist2 < 120 * 120) {
                    ctx.globalAlpha = 1 - dist2 / (120 * 120);
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.stroke();
                }
            }
            ctx.globalAlpha = 1;
        });

        requestAnimationFrame(draw);
    }
    draw();
}

document.addEventListener("DOMContentLoaded", renderPortfolio);
