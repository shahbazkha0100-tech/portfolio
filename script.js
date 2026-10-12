const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.getElementById("serviceSelect");
    const target = link.dataset.service;
    if (!select) return;
    const match = Array.from(select.options).find(option => option.text.toLowerCase().includes(target.toLowerCase()));
    if (match) select.value = match.value;
  });
});

const form = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");
form?.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio inquiry — ${data.get("service")}`);
  const body = encodeURIComponent(
`Hello Shahbaz,

My name: ${data.get("name")}
Business: ${data.get("business") || "Not provided"}
Email: ${data.get("email")}
Phone: ${data.get("phone") || "Not provided"}
Service: ${data.get("service")}

Project details:
${data.get("details")}

Sent from the Shahbaz Khan portfolio website.`
  );
  feedback.textContent = "Your email draft is being prepared. Please review it and press Send in your email app.";
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
});