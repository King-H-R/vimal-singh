const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123"; // change this!

function loadPortfolioData() {
    const saved = localStorage.getItem("portfolioData");
    if (!saved) return null;
    try {
        return JSON.parse(saved);
    } catch {
        return null;
    }
}

function savePortfolioData(data) {
    localStorage.setItem("portfolioData", JSON.stringify(data));
}

function fillAdminForm() {
    const data = loadPortfolioData();
    if (!data) return;

    document.getElementById("hero-name-input").value = data.hero.name;
    document.getElementById("hero-tagline-input").value = data.hero.tagline;
    document.getElementById("work-json").value = JSON.stringify(data.work, null, 2);
    document.getElementById("education-json").value = JSON.stringify(data.education, null, 2);
    document.getElementById("skills-json").value = JSON.stringify(data.skills, null, 2);
    document.getElementById("contact-json").value = JSON.stringify(data.contact, null, 2);
}

function showDashboard() {
    document.getElementById("login-box").classList.add("hidden");
    document.getElementById("admin-dashboard").classList.remove("hidden");
    fillAdminForm();
}

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const saveBtn = document.getElementById("save-btn");

    loginBtn.addEventListener("click", () => {
        const user = document.getElementById("admin-username").value.trim();
        const pass = document.getElementById("admin-password").value.trim();

        if (user === ADMIN_USER && pass === ADMIN_PASS) {
            showDashboard();
        } else {
            alert("Invalid credentials");
        }
    });

    saveBtn.addEventListener("click", () => {
        try {
            const updated = {
                hero: {
                    name: document.getElementById("hero-name-input").value.trim(),
                    tagline: document.getElementById("hero-tagline-input").value.trim()
                },
                work: JSON.parse(document.getElementById("work-json").value || "[]"),
                education: JSON.parse(document.getElementById("education-json").value || "[]"),
                skills: JSON.parse(document.getElementById("skills-json").value || "[]"),
                contact: JSON.parse(document.getElementById("contact-json").value || "[]"),
                // keep passions & languages from existing data if present
                passions: (loadPortfolioData() || {}).passions || [],
                languages: (loadPortfolioData() || {}).languages || []
            };
            savePortfolioData(updated);
            alert("Saved! Open index.html to see the changes.");
        } catch (err) {
            alert("Error parsing JSON. Please check your data.");
            console.error(err);
        }
    });
});
