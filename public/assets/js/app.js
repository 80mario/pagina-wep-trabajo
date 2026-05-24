const page = document.body.dataset.page;
const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");
const config = window.MS_SITE_CONFIG || {};
const whatsappPhone = document.body.dataset.whatsappPhone || config.whatsappPhone || "";
const whatsappMessage = document.body.dataset.whatsappMessage || config.whatsappMessage || "Hola Mario, quiero pedir presupuesto para una instalacion.";

document.querySelector(`[data-nav="${page}"]`)?.classList.add("active");

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.href = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

document.querySelectorAll("[data-phone-display]").forEach((item) => {
  item.textContent = config.phoneDisplay || item.textContent;
});

document.querySelectorAll("[data-phone-link]").forEach((link) => {
  link.href = config.phoneHref || link.href;
});

document.querySelectorAll("[data-email-display]").forEach((item) => {
  item.textContent = config.email || item.textContent;
});

document.querySelectorAll("[data-area-display]").forEach((item) => {
  item.textContent = config.serviceArea || item.textContent;
});

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

document.querySelector("[data-contact-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const status = form.querySelector("[data-form-status]");
  const data = Object.fromEntries(new FormData(form).entries());

  if (data.website) {
    status.textContent = "Solicitud enviada.";
    form.reset();
    return;
  }

  status.textContent = "Enviando solicitud. Un momento...";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.error || "No se pudo enviar.");
    }

    form.reset();
    status.textContent = "Solicitud enviada. Si quieres respuesta mas rapida, tambien puedes escribir por WhatsApp.";
  } catch (error) {
    status.textContent = "No se pudo enviar ahora. Revisa nombre, telefono y mensaje, o contacta por WhatsApp.";
  }
});
