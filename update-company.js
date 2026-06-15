const form = document.getElementById("request-form");
const resultBox = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const linkRows = document.getElementById("link-rows");
const addLinkBtn = document.getElementById("add-link");
const removeCheckbox = document.getElementById("check-remove");

const MAX_LINKS = 4;

// Toggle the detail section under each checkbox
document.querySelectorAll('input[name="check"]').forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    const detail = document.getElementById("detail-" + checkbox.value);
    if (detail) detail.hidden = !checkbox.checked;

    if (checkbox.value === "remove") {
      // Disable all other checkboxes/details when "remove" is selected
      document.querySelectorAll('input[name="check"]').forEach(other => {
        if (other === checkbox) return;
        other.disabled = checkbox.checked;
        if (checkbox.checked) {
          other.checked = false;
          const otherDetail = document.getElementById("detail-" + other.value);
          if (otherDetail) otherDetail.hidden = true;
        }
      });
    }
  });
});

addLinkBtn.addEventListener("click", () => {
  const rows = linkRows.querySelectorAll(".link-row");
  if (rows.length >= MAX_LINKS) return;

  const row = document.createElement("div");
  row.className = "link-row";
  row.innerHTML = `
    <input type="text" name="newLinkLabel" placeholder="Label, e.g. Website">
    <input type="url" name="newLinkUrl" placeholder="https://...">
  `;
  linkRows.appendChild(row);

  if (linkRows.querySelectorAll(".link-row").length >= MAX_LINKS) {
    addLinkBtn.disabled = true;
    addLinkBtn.textContent = "Maximum links reached";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const companyName = form.companyName.value.trim();
  const contact = form.contact.value.trim();
  const checked = [...form.querySelectorAll('input[name="check"]:checked')].map(c => c.value);

  if (!companyName) {
    showResult("Missing company name", "Please enter the company name as it appears on the site so we know which listing to update.");
    return;
  }

  if (checked.length === 0) {
    showResult("Nothing selected", "Please tick at least one thing you'd like to change.");
    return;
  }

  const changes = {};

  if (checked.includes("remove")) {
    changes.remove = true;
  } else {
    if (checked.includes("name")) {
      changes.name = form.newName.value.trim();
    }
    if (checked.includes("founder")) {
      changes.founder = form.newFounder.value.trim();
    }
    if (checked.includes("description")) {
      changes.description = form.newDescription.value.trim();
    }
    if (checked.includes("tags")) {
      changes.tags = [form.newTag1.value, form.newTag2.value, form.newTag3.value]
        .map(t => t.trim().replace(/^#/, ""))
        .filter(Boolean)
        .slice(0, 3);
    }
    if (checked.includes("links")) {
      const labels = [...form.querySelectorAll('input[name="newLinkLabel"]')];
      const urls = [...form.querySelectorAll('input[name="newLinkUrl"]')];
      changes.links = labels
        .map((labelInput, i) => ({
          label: labelInput.value.trim(),
          url: urls[i].value.trim()
        }))
        .filter(link => link.label && link.url);
    }
    if (checked.includes("other")) {
      changes.other = form.newOther.value.trim();
    }
  }

  const submitBtn = form.querySelector(".submit-btn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  try {
    const { error } = await supabaseClient.from("change_requests").insert({
      company_name: companyName,
      contact: contact || null,
      changes: changes,
      status: "pending"
    });
    if (error) throw error;

    form.hidden = true;
    showResult("Thanks!", "Your change request has been sent for review. Once approved, your listing will be updated.");
  } catch (err) {
    console.error(err);
    showResult("Something went wrong", "We couldn't submit your request right now. Please try again in a moment.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit request";
  }
});

function showResult(title, message) {
  resultTitle.textContent = title;
  resultMessage.textContent = message;
  resultBox.hidden = false;
  resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
}
