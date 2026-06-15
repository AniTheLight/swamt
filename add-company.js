const form = document.getElementById("company-form");
const linkRows = document.getElementById("link-rows");
const addLinkBtn = document.getElementById("add-link");
const resultBox = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector(".submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

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
    links: links,
    status: "pending"
  };

  try {
    const { error } = await supabaseClient.from("companies").insert(entry);
    if (error) throw error;

    form.hidden = true;
    resultTitle.textContent = "Thanks!";
    resultMessage.textContent = "Your company has been submitted and is now pending review. Once approved, it'll appear in the directory.";
    resultBox.hidden = false;
    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (err) {
    console.error(err);
    resultTitle.textContent = "Something went wrong";
    resultMessage.textContent = "We couldn't submit your company right now. Please try again in a moment.";
    resultBox.hidden = false;
    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Add to directory";
  }
});const form = document.getElementById("company-form");
const linkRows = document.getElementById("link-rows");
const addLinkBtn = document.getElementById("add-link");
const resultBox = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector(".submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

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
    links: links,
    status: "pending"
  };

  try {
    const { error } = await supabaseClient.from("companies").insert(entry);
    if (error) throw error;

    form.hidden = true;
    resultTitle.textContent = "Thanks!";
    resultMessage.textContent = "Your company has been submitted and is now pending review. Once approved, it'll appear in the directory.";
    resultBox.hidden = false;
    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (err) {
    console.error(err);
    resultTitle.textContent = "Something went wrong";
    resultMessage.textContent = "We couldn't submit your company right now. Please try again in a moment.";
    resultBox.hidden = false;
    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Add to directory";
  }
});
