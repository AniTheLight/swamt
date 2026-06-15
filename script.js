const TOTAL_SLOTS = 15; // 5 x 3 grid

const grid = document.getElementById("grid");
const filterSelect = document.getElementById("tag-filter");

init();

async function init() {
  const companies = await loadCompanies();

  // Build the filter dropdown from every tag used across companies
  const allTags = new Set();
  companies.forEach(c => c.tags.forEach(t => allTags.add(t)));

  [...allTags].sort().forEach(tag => {
    const opt = document.createElement("option");
    opt.value = tag;
    opt.textContent = "#" + tag;
    filterSelect.appendChild(opt);
  });

  // Render cards
  companies.forEach(company => {
    grid.appendChild(buildCard(company));
  });

  // Fill remaining slots with placeholders
  for (let i = companies.length; i < TOTAL_SLOTS; i++) {
    const slot = document.createElement("div");
    slot.className = "card-slot";
    slot.innerHTML = `<div class="card-placeholder">More founders coming soon</div>`;
    grid.appendChild(slot);
  }
}

async function loadCompanies() {
  try {
    const { data, error } = await supabaseClient
      .from("companies")
      .select("name, founder, description, tags, links")
      .eq("status", "approved")
      .order("created_at", { ascending: true });

    if (error) throw error;
    if (data && data.length) return data;
  } catch (err) {
    console.warn("Could not load companies from Supabase, using local data instead.", err);
  }

  // Fallback to the local seed data (data.js) if Supabase is unreachable or empty
  return COMPANIES;
}

function buildCard(company) {
  const slot = document.createElement("div");
  slot.className = "card-slot";
  slot.dataset.tags = company.tags.join(",");

  const inner = document.createElement("div");
  inner.className = "card-inner";
  inner.setAttribute("tabindex", "0");
  inner.setAttribute("role", "button");
  inner.setAttribute("aria-label", `${company.name}, ${company.founder}. Press enter to see links.`);

  const front = document.createElement("div");
  front.className = "card-face card-front";
  front.innerHTML = `
    <p class="card-name">${escapeHtml(company.name)}</p>
    <p class="card-founder">${escapeHtml(company.founder)}</p>
    <p class="card-desc">${escapeHtml(company.description)}</p>
    <p class="card-tags">${company.tags.map(t => "#" + t).join(" ")}</p>
  `;

  const back = document.createElement("div");
  back.className = "card-face card-back";

  let linksHtml;
  if (company.links.length) {
    linksHtml = company.links
      .map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(l.label)}</a>`)
      .join("");
  } else {
    linksHtml = `<p class="no-link">No link shared yet</p>`;
  }

  back.innerHTML = `
    <p class="card-name">${escapeHtml(company.name)}</p>
    ${linksHtml}
    <p class="hint">Click to flip back</p>
  `;

  inner.appendChild(front);
  inner.appendChild(back);
  slot.appendChild(inner);

  // Flip on click (but not when clicking a link)
  inner.addEventListener("click", (e) => {
    if (e.target.tagName === "A") return;
    slot.classList.toggle("flipped");
  });

  // Keyboard support
  inner.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      slot.classList.toggle("flipped");
    }
  });

  return slot;
}

// Filter by hashtag
filterSelect.addEventListener("change", () => {
  const value = filterSelect.value;
  grid.querySelectorAll(".card-slot[data-tags]").forEach(slot => {
    const tags = slot.dataset.tags.split(",");
    const show = value === "all" || tags.includes(value);
    slot.style.display = show ? "" : "none";
  });
});

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
