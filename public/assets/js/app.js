const page = document.body.dataset.page;
const nav = document.querySelector(".nav");
const menuToggle = document.querySelector(".menu-toggle");

document.querySelector(`[data-nav="${page}"]`)?.classList.add("active");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

document.querySelector("[data-contact-form]")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const status = form.querySelector("[data-form-status]");
  const data = Object.fromEntries(new FormData(form).entries());

  status.textContent = "Enviando solicitud...";

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
    status.textContent = "Solicitud enviada. Te contactaremos lo antes posible.";
  } catch (error) {
    status.textContent = "No se pudo enviar ahora. Revisa los datos o prueba de nuevo.";
  }
});
