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
      menuLink.innerHTML = "<span>Vacunación UANL</span><small>Vacunas</small>";
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
      action.textContent = "Vacunación UANL";
      actions.appendChild(action);
    }

    var library = document.getElementById("librarySection");
    if (library && !document.querySelector(".vaccination-index-entry")) {
      library.insertAdjacentHTML("beforebegin", "<section class='section-card vaccination-index-entry'><div class='section-head'><div><small>Vacunación UANL</small><h2>Vacunas</h2></div><p>Utilidad, esquema, prevalencia, recurrencia y efectos adversos.</p></div><a class='tool-card' href='vacunacion.html'><div><span class='badge'>8 vacunas</span><h3>Vacunación clínica UANL</h3><p>VPH, influenza, hepatitis B, BCG, SRP, rotavirus, neumococo y Td/Tdap.</p></div><span class='text-link'>Abrir vacunas</span></a></section>");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addVaccinationEntry);
  } else {
    addVaccinationEntry();
  }
})();
