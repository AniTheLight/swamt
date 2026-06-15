const form = document.getElementById("company-form");
const linkRows = document.getElementById("link-rows");
const addLinkBtn = document.getElementById("add-link");
const resultBox = document.getElementById("result");
const snippetEl = document.getElementById("snippet");
const copyBtn = document.getElementById("copy-snippet");

const MAX_LINKS = 4;

addLinkBtn.addEventListener("click", () => {
  const rows = linkRows.querySelectorAll(".link-row");
  if (rows.length >= MAX_LINKS) return;

  const row = document.createElement("div");
  row.className = "link-row";
  row.innerHTML = `
    <input type="text" name="linkLabel" placeholder="Label, e.g. Website">
    <input type="url" name="linkUrl" placeholder="https://...">
  `;
  linkRows.appendChild(row);

  if (linkRows.querySelectorAll(".link-row").length >= MAX_LINKS) {
    addLinkBtn.disabled = true;
    addLinkBtn.textContent = "Maximum links reached";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const companyName = form.companyName.value.trim();
  const founderName = form.founderName.value.trim();
  const description = form.description.value.trim();

  const tags = [form.tag1.value, form.tag2.value, form.tag3.value]
    .map(t => t.trim().replace(/^#/, ""))
    .filter(Boolean)
    .slice(0, 3);

  const labels = [...form.querySelectorAll('input[name="linkLabel"]')];
  const urls = [...form.querySelectorAll('input[name="linkUrl"]')];
  const links = labels
    .map((labelInput, i) => ({
      label: labelInput.value.trim(),
      url: urls[i].value.trim()
    }))
    .filter(link => link.label && link.url);

  const entry = {
    name: companyName,
    founder: founderName,
    description: description,
    tags: tags,
    links: links
  };

  snippetEl.textContent = formatEntry(entry);
  resultBox.hidden = false;
  resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(snippetEl.textContent).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy snippet"), 1500);
  });
});

function formatEntry(entry) {
  const tagsStr = entry.tags.map(t => `"${t}"`).join(", ");
  const linksStr = entry.links.length
    ? entry.links.map(l => `    { label: "${escapeQuotes(l.label)}", url: "${escapeQuotes(l.url)}" }`).join(",\n")
    : "";

  return `  {
    name: "${escapeQuotes(entry.name)}",
    founder: "${escapeQuotes(entry.founder)}",
    description: "${escapeQuotes(entry.description)}",
    tags: [${tagsStr}],
    links: [${entry.links.length ? "\n" + linksStr + "\n  " : ""}]
  },`;
}

function escapeQuotes(str) {
  return str.replace(/"/g, '\\"');
}
