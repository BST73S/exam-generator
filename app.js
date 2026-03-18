// Wait until page fully loads
document.addEventListener("DOMContentLoaded", () => {

  console.log("JS Loaded ✅");
  const form = document.getElementById("examForm");
    console.log("FORM:", form);

  if (!form) {
    console.error("Form not found ❌");
    return;
  }

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    console.log("Form submitted ✅");

    // Get input values
    const topic = document.getElementById("topic")?.value || "";
    const stakeholder = document.getElementById("stakeholder")?.value || "";
    const issue = document.getElementById("issue")?.value || "";
    const keywords = document.getElementById("keywords")?.value || "";

    console.log("INPUTS:", { topic, stakeholder, issue, keywords });

    // Update status
    const status = document.getElementById("status");
    if (status) status.innerText = "Generating...";

    // 🔥 Use test data (guaranteed to work)
  const data = await generateExam(topic, stakeholder, issue, keywords);

    console.log("DATA RECEIVED:", data);
    document.getElementById("a3-page").style.display = "grid";

    if (status) status.innerText = "Preview Ready ✅";
    populatePage(data);

    // Show preview
    const page = document.getElementById("a3-page");
    if (page) page.style.display = "grid";

    if (status) status.innerText = "Preview Ready ✅";
  });

});


// ==========================
// POPULATE PAGE
// ==========================
function populatePage(data) {

  setText("designProblem", data.design_problem);
  setText("about", data.about);

  fillList("designCriteria", data.design_criteria);
  fillList("experiences", data.experiences);
  fillList("attitudes", data.attitudes);
  fillList("motivations", data.motivations);
  fillList("expectations", data.expectations);

  // Images (replace later)
  setImage("img1", "https://picsum.photos/300?1");
  setImage("img2", "https://picsum.photos/300?2");
  setImage("img3", "https://picsum.photos/300?3");
  setImage("img4", "https://picsum.photos/300?4");
}


// ==========================
// HELPERS
// ==========================
function setText(id, text) {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`Missing element: ${id}`);
    return;
  }
  el.innerText = text;
}

function fillList(id, items) {
  const ul = document.getElementById(id);

  if (!ul) {
    console.warn(`Missing list: ${id}`);
    return;
  }

  ul.innerHTML = "";

  if (!items || items.length === 0) {
    ul.innerHTML = "<li>No data</li>";
    return;
  }

  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

function setImage(id, src) {
  const img = document.getElementById(id);
  if (img) img.src = src;
}


// ==========================
// EXPORT PDF
// ==========================
function exportPDF() {
  window.print();
}


async function generateExam(topic, stakeholder, issue, keywords) {

  const response = await fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      topic,
      stakeholder,
      issue,
      keywords
    })
  });

  return await response.json();
}

