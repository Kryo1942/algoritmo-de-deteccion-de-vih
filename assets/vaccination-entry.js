(function () {
  function addVaccinationEntry() {
    var page = document.body.dataset.page || "";
    var base = document.body.dataset.base || "";
    var url = base + "vacunacion.html";
    var menu = document.querySelector(".menu-list");
    if (menu && !menu.querySelector('[href$="vacunacion.html"]')) {
      var menuLink = document.createElement("a");
      menuLink.className = "menu-link";
      menuLink.href = url;
      menuLink.innerHTML = "<span>Vacunación</span><small>Infografías clínicas</small>";
      var meds = menu.querySelector('[href$="medicamentos.html"]');
      if (meds && meds.nextSibling) menu.insertBefore(menuLink, meds.nextSibling);
      else menu.appendChild(menuLink);
    }

    if (page !== "home") return;
    var actions = document.querySelector(".hero-actions");
    if (actions && !actions.querySelector('[href="vacunacion.html"]')) {
      var action = document.createElement("a");
      action.className = "cta secondary";
      action.href = "vacunacion.html";
      action.textContent = "Vacunación";
      actions.appendChild(action);
    }

    var library = document.getElementById("librarySection");
    if (library && !document.querySelector(".vaccination-index-entry")) {
      library.insertAdjacentHTML("beforebegin", "<section class='section-card vaccination-index-entry'><div class='section-head'><div><small>Vacunación</small><h2>Infografías clínicas de vacunas</h2></div><p>Subpáginas completas por vacuna con utilidad, esquema, prevalencia, recurrencia y efectos adversos explicados con lenguaje claro.</p></div><a class='tool-card' href='vacunacion.html'><div><span class='badge'>8 vacunas</span><h3>Centro de vacunación</h3><p>VPH, influenza, hepatitis B, BCG, SRP, rotavirus, neumococo y Td/Tdap.</p></div><span class='text-link'>Abrir sección</span></a></section>");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addVaccinationEntry);
  } else {
    addVaccinationEntry();
  }
})();
