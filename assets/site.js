(function () {
  const site = window.PROTOCOLOS_SITE;
  const app = document.getElementById("app");

  if (!site || !app) return;

  const page = document.body.dataset.page || "home";
  const value = document.body.dataset.value || "";
  const base = document.body.dataset.base || "";

  function homeUrl() {
    return base + "index.html";
  }

  function categoryUrl(slug) {
    return base + "categorias/" + slug + ".html";
  }

  function protocolUrl(slug) {
    return base + "protocolos/" + slug + ".html";
  }

  function medicationUrl() {
    return base + "medicamentos.html";
  }

  function formatDate(dateString) {
    const date = new Date(dateString + "T12:00:00");
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function sortByDateDesc(a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  }

  function sortByDateAsc(a, b) {
    return new Date(a.updatedAt) - new Date(b.updatedAt);
  }

  function sortByTitle(a, b) {
    return a.title.localeCompare(b.title, "es");
  }

  function getCategoryBySlug(slug) {
    return site.categories.find((category) => category.slug === slug);
  }

  function getProtocolBySlug(slug) {
    return site.protocols.find((protocol) => protocol.slug === slug);
  }

  function getProtocolsByCategorySlug(slug) {
    return site.protocols
      .filter((protocol) => protocol.categorySlug === slug)
      .sort(sortByDateDesc);
  }

  function getMedicationsByProtocolSlug(slug) {
    return (site.medications || []).filter((medication) => {
      return (medication.protocols || []).includes(slug);
    });
  }

  function protocolHasDose(protocol) {
    return getMedicationsByProtocolSlug(protocol.slug).length > 0;
  }

  function protocolIsUrgent(protocol) {
    return [
      protocol.alert || "",
      protocol.summary || "",
      ...(protocol.checklist || [])
    ].join(" ").toLowerCase().includes("urg");
  }

  function getSourceType(source) {
    const label = (source.label || "").toLowerCase();
    const url = (source.url || "").toLowerCase();

    if (url.includes("dailymed") || url.includes("fda.gov") || url.includes("xolremdi") || url.includes("kresladi")) {
      return { label: "Regulatorio", className: "regulatory" };
    }
    if (url.includes("rarediseases.org") || label.includes("nord")) return { label: "NORD", className: "nord" };
    if (url.includes("primaryimmune.org")) return { label: "IDF", className: "idf" };
    if (url.includes("ncbi.nlm.nih.gov") || url.includes("pmc.ncbi.nlm.nih.gov") || url.includes("medlineplus.gov")) {
      return { label: "NCBI/NIH", className: "nih" };
    }
    if (url.includes("merckmanuals.com")) return { label: "Manual clínico", className: "manual" };
    if (url.includes("aaaai.org")) return { label: "AAAAI", className: "society" };
    return { label: "Fuente clínica", className: "clinical" };
  }

  function renderSourceBadge(source) {
    const type = getSourceType(source);
    return `<small class="source-type ${type.className}">${type.label}</small>`;
  }

  function formatProtocolCount(count) {
    if (count === 0) return "Sin protocolos";
    return count + (count === 1 ? " protocolo" : " protocolos");
  }

  function renderTopbar(activeCategorySlug, activeSection) {
    const activeCategory = activeCategorySlug ? getCategoryBySlug(activeCategorySlug) : null;
    const inMedications = activeSection === "medications";
    const currentLabel = inMedications ? "Dosis" : activeCategory ? activeCategory.short : "Inicio";
    const currentDetail = inMedications ? "Medicamentos y cálculo de dosis" : activeCategory ? activeCategory.title : "Portal clínico";

    return `
      <header class="topbar">
        <a class="brand" href="${homeUrl()}">
          <span class="brand-mark">PC</span>
          <span class="brand-copy">
            <strong>Protocolos Clínicos</strong>
            <small>Consulta por categoría, enfermedad y fecha de actualización</small>
          </span>
        </a>
        <div class="topbar-tools">
          <div class="menu-shell">
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="siteMenu">
              <span class="menu-toggle-copy">
                <small>Menú</small>
                <strong>${currentLabel}</strong>
              </span>
              <span class="menu-icon" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <div class="menu-panel" id="siteMenu" hidden>
              <div class="menu-panel-head">
                <small>Sección actual</small>
                <strong>${currentDetail}</strong>
              </div>
              <nav class="menu-list" aria-label="Navegación principal">
                <a class="menu-link ${!activeCategorySlug && !inMedications ? "active" : ""}" href="${homeUrl()}">
                  <span>Inicio</span>
                  <small>Portada clínica</small>
                </a>
                <a class="menu-link ${inMedications ? "active" : ""}" href="${medicationUrl()}">
                  <span>Medicamentos</span>
                  <small>${(site.medications || []).length} cargados</small>
                </a>
                ${site.categories.map((category) => `
                  <a class="menu-link ${activeCategorySlug === category.slug ? "active" : ""}" href="${categoryUrl(category.slug)}">
                    <span>${category.title}</span>
                    <small>${formatProtocolCount(getProtocolsByCategorySlug(category.slug).length)}</small>
                  </a>
                `).join("")}
              </nav>
            </div>
          </div>
        </div>
      </header>
    `;
  }

  function renderHeroActions() {
    return `
      <div class="hero-actions">
        <a class="cta primary" href="#categoriesSection">Explorar categorías</a>
        <a class="cta secondary" href="#librarySection">Ver biblioteca</a>
        <a class="cta secondary" href="#glossarySection">Glosario</a>
      </div>
    `;
  }

  function renderStats() {
    const availableCount = site.protocols.filter((protocol) => protocol.status === "Disponible").length;
    const medicationsCount = (site.medications || []).length;
    return `
      <section class="stats-grid">
        <article class="stat-card">
          <span>Módulos clínicos</span>
          <strong>${site.protocols.length}</strong>
          <p>Protocolos clínicos disponibles para consulta en línea.</p>
        </article>
        <article class="stat-card">
          <span>Categorías</span>
          <strong>${site.categories.length}</strong>
          <p>Áreas clínicas organizadas para acceso rápido.</p>
        </article>
        <article class="stat-card">
          <span>Protocolos activos</span>
          <strong>${availableCount}</strong>
          <p>Contenido disponible para revisión inmediata.</p>
        </article>
        <article class="stat-card">
          <span>Medicamentos</span>
          <strong>${medicationsCount}</strong>
          <p>Base preparada para asociar fármacos y dosis a protocolos clínicos.</p>
        </article>
      </section>
    `;
  }

  function renderCategoryCard(category) {
    const count = getProtocolsByCategorySlug(category.slug).length;
    return `
      <a class="category-card" href="${categoryUrl(category.slug)}">
        <div class="card-accent accent-${category.accent}">${category.short}</div>
        <h3>${category.title}</h3>
        <p>${category.description}</p>
        <div class="card-meta">
          <span class="badge">${formatProtocolCount(count)}</span>
          <span class="card-helper">${category.helper}</span>
        </div>
      </a>
    `;
  }

  function renderProtocolCard(protocol) {
    const linkedMedications = getMedicationsByProtocolSlug(protocol.slug);
    return `
      <a class="protocol-card" href="${protocolUrl(protocol.slug)}" data-search="${[
        protocol.title,
        protocol.category,
        protocol.summary,
        protocol.tags.join(" "),
        linkedMedications.map((medication) => medication.name).join(" ")
      ].join(" ").toLowerCase()}" data-date="${protocol.updatedAt}">
        <div class="card-top">
          <span class="chip category">${protocol.category}</span>
          <span class="chip status">${protocol.status}</span>
        </div>
        <h3>${protocol.title}</h3>
        <p>${protocol.summary}</p>
        <div class="card-bottom">
          <span class="chip date">${formatDate(protocol.updatedAt)}</span>
          ${linkedMedications.length ? `<span class="chip dose-chip">${linkedMedications.length} dosis</span>` : ""}
          <span class="text-link">Abrir protocolo</span>
        </div>
      </a>
    `;
  }

  function renderRecentSection() {
    if (site.protocols.length < 2) return "";

    const recent = [...site.protocols].sort(sortByDateDesc).slice(0, 3);
    return `
      <section class="section-card">
        <div class="section-head">
          <div>
            <small>Portada clínica</small>
            <h2>Protocolos disponibles</h2>
          </div>
          <p>Ordenados por fecha de actualización para revisar primero las incorporaciones más recientes.</p>
        </div>
        <div class="protocol-grid three-up">
          ${recent.map(renderProtocolCard).join("")}
        </div>
      </section>
    `;
  }

  function renderMedicationToolCard() {
    return `
      <section class="section-card">
        <div class="section-head">
          <div>
            <small>Herramientas clínicas</small>
            <h2>Medicamentos y dosis</h2>
          </div>
          <p>Sección preparada para registrar medicamentos por protocolo y calcular dosis con variables clínicas.</p>
        </div>
        <a class="tool-card" href="${medicationUrl()}">
          <div>
            <span class="badge">${(site.medications || []).length} medicamentos</span>
            <h3>Calculadora de dosis</h3>
            <p>Filtra medicamentos por protocolo, calcula superficie corporal y aplica solo reglas de dosificación con fuente.</p>
          </div>
          <span class="text-link">Abrir sección</span>
        </a>
      </section>
    `;
  }

  function renderGlossarySection() {
    const terms = [
      { term: "BH", definition: "Biometría hemática; hemograma con recuento celular." },
      { term: "BSA / SC", definition: "Superficie corporal; algunas dosis se calculan en m²." },
      { term: "CGD", definition: "Enfermedad granulomatosa crónica." },
      { term: "CVID", definition: "Inmunodeficiencia común variable." },
      { term: "DHR", definition: "Dihidrorodamina; prueba funcional de estallido oxidativo." },
      { term: "HLH", definition: "Linfohistiocitosis hemofagocítica; síndrome inflamatorio grave." },
      { term: "HSCT", definition: "Trasplante de células hematopoyéticas." },
      { term: "IgG / IgA / IgM", definition: "Inmunoglobulinas usadas para evaluar inmunidad humoral." },
      { term: "IVIG / SCIG", definition: "Inmunoglobulina intravenosa o subcutánea." },
      { term: "VO / IV / SC", definition: "Vía oral, intravenosa y subcutánea." },
      { term: "VPH", definition: "Virus del papiloma humano." }
    ];

    return `
      <section class="section-card" id="glossarySection">
        <div class="section-head">
          <div>
            <small>Apoyo rápido</small>
            <h2>Glosario clínico</h2>
          </div>
          <p>Siglas frecuentes para leer los protocolos sin perderse en abreviaturas.</p>
        </div>
        <div class="glossary-grid">
          ${terms.map((item) => `
            <article class="glossary-card">
              <strong>${item.term}</strong>
              <p>${item.definition}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderMedicationsByProtocolSection() {
    const protocolGroups = site.protocols
      .map((protocol) => ({ protocol, medications: getMedicationsByProtocolSlug(protocol.slug) }))
      .filter((group) => group.medications.length > 0)
      .sort((a, b) => b.medications.length - a.medications.length || sortByTitle(a.protocol, b.protocol));

    if (!protocolGroups.length) return "";

    return `
      <section class="section-card">
        <div class="section-head">
          <div>
            <small>Vista por enfermedad</small>
            <h2>Medicamentos por protocolo</h2>
          </div>
          <p>Consulta rápidamente qué medicamentos o terapias con fórmula están vinculados a cada protocolo.</p>
        </div>
        <div class="medication-protocol-grid">
          ${protocolGroups.map(({ protocol, medications }) => `
            <article class="medication-protocol-card">
              <div>
                <span class="chip category">${protocol.category}</span>
                <h3>${protocol.title}</h3>
              </div>
              <ul>
                ${medications.map((medication) => `<li>${medication.name}</li>`).join("")}
              </ul>
              <a class="text-link" href="${protocolUrl(protocol.slug)}">Abrir protocolo</a>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderHomePage() {
    return `
      ${renderTopbar("")}
      <main class="page-shell">
        <section class="hero-grid">
          <article class="hero-main">
            <div class="eyebrow">Portal de consulta clínica</div>
            <h1>Protocolos clínicos organizados por enfermedad y categoría</h1>
            <p>Reúne protocolos clínicos sustentados en artículos de referencia, organizados por área clínica para facilitar su consulta y expansión progresiva.</p>
            ${renderHeroActions()}
          </article>
          <aside class="hero-side">
            <h3>Recorrido recomendado</h3>
            <ul>
              <li>Explora primero por categoría clínica.</li>
              <li>Ubica las áreas que ya tienen protocolos cargados.</li>
              <li>Busca una enfermedad o palabra clave específica.</li>
              <li>Revisa cada protocolo dentro de su categoría correspondiente.</li>
            </ul>
          </aside>
        </section>

        ${renderStats()}

        <section class="section-card" id="categoriesSection">
          <div class="section-head">
            <div>
              <small>Categorías</small>
              <h2>Tipos de enfermedades</h2>
            </div>
            <p>Selecciona un grupo clínico para revisar los protocolos disponibles en cada área.</p>
          </div>
          <div class="categories-grid">
            ${site.categories.map(renderCategoryCard).join("")}
          </div>
        </section>

        ${renderRecentSection()}

        ${renderMedicationToolCard()}

        <section class="section-card" id="librarySection">
          <div class="section-head">
            <div>
              <small>Biblioteca general</small>
              <h2>Buscar protocolos por enfermedad</h2>
            </div>
            <p>Usa el buscador para filtrar por enfermedad, categoría o palabra clave. También puedes cambiar el orden de la biblioteca.</p>
          </div>

          <div class="controls-row">
            <input id="homeSearch" class="search-input" type="search" placeholder="Buscar VIH, ITS, tamizaje, diagnóstico...">
            <select id="homeCategory" class="sort-select" aria-label="Filtrar por categoría">
              <option value="">Todas las categorías</option>
              ${site.categories.map((category) => `<option value="${category.slug}">${category.title}</option>`).join("")}
            </select>
            <select id="homeFeature" class="sort-select" aria-label="Filtrar por característica">
              <option value="">Todos los protocolos</option>
              <option value="dose">Con calculadora de dosis</option>
              <option value="urgent">Con alerta de urgencia</option>
              <option value="clinical">Solo protocolos clínicos</option>
              <option value="algorithm">Solo algoritmos</option>
            </select>
            <select id="homeSort" class="sort-select" aria-label="Ordenar protocolos">
              <option value="newest">Más nuevos primero</option>
              <option value="oldest">Más antiguos primero</option>
              <option value="az">Orden alfabético</option>
            </select>
            <div class="result-badge" id="homeResultCount">${site.protocols.length} resultados</div>
          </div>

          <div class="protocol-grid" id="homeLibraryGrid">
            ${[...site.protocols].sort(sortByDateDesc).map(renderProtocolCard).join("")}
          </div>
        </section>

        ${renderGlossarySection()}
      </main>
    `;
  }

  function renderMedicationPage() {
    const medications = site.medications || [];
    const hasMedications = medications.length > 0;

    return `
      ${renderTopbar("", "medications")}
      <main class="page-shell">
        <div class="breadcrumbs">
          <a href="${homeUrl()}">Inicio</a>
          <span>/</span>
          <span>Medicamentos</span>
        </div>

        <section class="protocol-hero medication-hero">
          <div class="protocol-hero-main">
            <div class="chip category">Herramienta clínica</div>
            <h1>Medicamentos y cálculo de dosis</h1>
            <p>Base para asociar medicamentos a protocolos y calcular dosis con reglas clínicas definidas por edad, sexo/género, peso y enfermedad.</p>
            <div class="hero-meta">
              <span class="chip status">${hasMedications ? medications.length + " medicamentos" : "Sin medicamentos cargados"}</span>
              <span class="chip date">Dosis con fuente</span>
            </div>
          </div>
          <aside class="protocol-hero-side">
            <h3>Variables preparadas</h3>
            <ul>
              <li>Protocolo o enfermedad asociada.</li>
              <li>Sexo/género cuando la dosis lo requiera.</li>
              <li>Edad y unidad de edad.</li>
              <li>Peso corporal en kilogramos.</li>
              <li>Superficie corporal cuando el medicamento use m².</li>
            </ul>
          </aside>
        </section>

        <section class="dose-layout">
          <form class="dose-panel" id="doseCalculator">
            <div class="section-head compact-head">
              <div>
                <small>Calculadora</small>
                <h2>Datos para cálculo de dosis</h2>
              </div>
            </div>

            <label class="field-group">
              <span>Medicamento</span>
              <select id="doseMedication" class="form-control">
                <option value="">Sin medicamentos cargados</option>
              </select>
            </label>

            <label class="field-group">
              <span>Protocolo asociado</span>
              <select id="doseProtocol" class="form-control">
                <option value="">No especificado</option>
                ${site.protocols.map((protocol) => `<option value="${protocol.slug}">${protocol.title}</option>`).join("")}
              </select>
            </label>

            <div class="form-grid">
              <label class="field-group">
                <span>Sexo/género</span>
                <select id="doseSex" class="form-control">
                  <option value="">No especificado</option>
                  <option value="femenino">Femenino</option>
                  <option value="masculino">Masculino</option>
                  <option value="otro">Otro / no aplica</option>
                </select>
              </label>

              <label class="field-group">
                <span>Edad</span>
                <input id="doseAge" class="form-control" type="number" min="0" step="1" placeholder="Ej. 24">
              </label>

              <label class="field-group">
                <span>Unidad de edad</span>
                <select id="doseAgeUnit" class="form-control">
                  <option value="years">Años</option>
                  <option value="months">Meses</option>
                  <option value="days">Días</option>
                </select>
              </label>

              <label class="field-group">
                <span>Peso (kg)</span>
                <input id="doseWeight" class="form-control" type="number" min="0" step="0.1" placeholder="Ej. 70">
              </label>

              <label class="field-group">
                <span>Talla (cm)</span>
                <input id="doseHeight" class="form-control" type="number" min="0" step="0.1" placeholder="Ej. 170">
              </label>

              <label class="field-group">
                <span>Superficie corporal (m²)</span>
                <input id="doseBsa" class="form-control" type="number" min="0" step="0.01" placeholder="Se calcula si capturas talla">
              </label>
            </div>

            <button class="tool-btn primary dose-submit" type="submit">Calcular dosis</button>
          </form>

          <aside class="dose-result" aria-live="polite">
            <span class="badge">Resultado</span>
            <h2 id="doseResultTitle">Sin cálculo disponible</h2>
            <p id="doseResultText">La calculadora quedará activa cuando se agreguen medicamentos con reglas de dosificación revisadas.</p>
            <div class="dose-result-grid">
              <div>
                <span>Dosis</span>
                <strong id="doseAmount">Pendiente</strong>
              </div>
              <div>
                <span>Frecuencia</span>
                <strong id="doseFrequency">Pendiente</strong>
              </div>
              <div>
                <span>Vía</span>
                <strong id="doseRoute">Pendiente</strong>
              </div>
            </div>
            <p class="dose-note">Usar solo con medicamentos validados y revisar cada cálculo antes de aplicarlo en un paciente.</p>
          </aside>
        </section>

        ${renderMedicationsByProtocolSection()}

        <section class="section-card">
          <div class="section-head">
            <div>
              <small>Base de medicamentos</small>
              <h2>Medicamentos registrados</h2>
            </div>
            <p>${hasMedications ? "Medicamentos disponibles para cálculo y consulta." : "Esta base queda lista para cargar medicamentos vinculados a protocolos clínicos."}</p>
          </div>
          ${hasMedications ? `
            <div class="protocol-grid">
              ${medications.map((medication) => `
                <article class="protocol-card">
                  <div class="card-top">
                    <span class="chip category">${medication.group || "Medicamento"}</span>
                    <span class="chip status">${medication.status || "Disponible"}</span>
                  </div>
                  <h3>${medication.name}</h3>
                  <p>${medication.summary || "Medicamento registrado para cálculo de dosis."}</p>
                  ${medication.formula ? `<p class="formula-note">${medication.formula}</p>` : ""}
                  ${medication.sources?.length ? `
                    <div class="mini-source-list">
                      ${medication.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${renderSourceBadge(source)} ${source.label}</a>`).join("")}
                    </div>
                  ` : ""}
                </article>
              `).join("")}
            </div>
          ` : `
            <div class="empty-state">
              <h2>Sin medicamentos cargados</h2>
              <p>Cuando agregues un medicamento, aparecerá aquí y podrá conectarse con la calculadora.</p>
            </div>
          `}
        </section>
      </main>
    `;
  }

  function setupHomeInteractions() {
    const searchInput = document.getElementById("homeSearch");
    const categorySelect = document.getElementById("homeCategory");
    const featureSelect = document.getElementById("homeFeature");
    const sortSelect = document.getElementById("homeSort");
    const grid = document.getElementById("homeLibraryGrid");
    const resultCount = document.getElementById("homeResultCount");
    const allProtocols = [...site.protocols];

    function renderLibrary() {
      const query = searchInput.value.trim().toLowerCase();
      let items = allProtocols.filter((protocol) => {
        const matchesQuery = !query || [
          protocol.title,
          protocol.category,
          protocol.summary,
          protocol.tags.join(" "),
          getMedicationsByProtocolSlug(protocol.slug).map((medication) => medication.name).join(" ")
        ].join(" ").toLowerCase().includes(query);
        const matchesCategory = !categorySelect.value || protocol.categorySlug === categorySelect.value;
        const matchesFeature = !featureSelect.value
          || (featureSelect.value === "dose" && protocolHasDose(protocol))
          || (featureSelect.value === "urgent" && protocolIsUrgent(protocol))
          || (featureSelect.value === "clinical" && protocol.kind === "clinical")
          || (featureSelect.value === "algorithm" && protocol.kind === "algorithm");
        return matchesQuery && matchesCategory && matchesFeature;
      });

      if (sortSelect.value === "oldest") items = items.sort(sortByDateAsc);
      else if (sortSelect.value === "az") items = items.sort(sortByTitle);
      else items = items.sort(sortByDateDesc);

      resultCount.textContent = items.length + (items.length === 1 ? " resultado" : " resultados");
      grid.innerHTML = items.length
        ? items.map(renderProtocolCard).join("")
        : `
            <div class="empty-state">
              <h2>Sin coincidencias</h2>
              <p>Prueba otra palabra clave o cambia el orden de la biblioteca.</p>
            </div>
          `;
    }

    searchInput.addEventListener("input", renderLibrary);
    categorySelect.addEventListener("change", renderLibrary);
    featureSelect.addEventListener("change", renderLibrary);
    sortSelect.addEventListener("change", renderLibrary);
  }

  function setupTopbarMenu() {
    const shell = document.querySelector(".menu-shell");
    const toggle = document.querySelector(".menu-toggle");
    const panel = document.querySelector(".menu-panel");

    if (!shell || !toggle || !panel) return;

    function setOpen(open) {
      shell.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      panel.hidden = !open;
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      setOpen(!shell.classList.contains("open"));
    });

    document.addEventListener("click", function (event) {
      if (!shell.contains(event.target)) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  function setupDoseCalculator() {
    const form = document.getElementById("doseCalculator");
    if (!form) return;

    const medications = site.medications || [];
    const medicationSelect = document.getElementById("doseMedication");
    const protocolSelect = document.getElementById("doseProtocol");
    const sexSelect = document.getElementById("doseSex");
    const ageInput = document.getElementById("doseAge");
    const ageUnitSelect = document.getElementById("doseAgeUnit");
    const weightInput = document.getElementById("doseWeight");
    const heightInput = document.getElementById("doseHeight");
    const bsaInput = document.getElementById("doseBsa");
    const submitButton = form.querySelector(".dose-submit");
    const resultTitle = document.getElementById("doseResultTitle");
    const resultText = document.getElementById("doseResultText");
    const doseAmount = document.getElementById("doseAmount");
    const doseFrequency = document.getElementById("doseFrequency");
    const doseRoute = document.getElementById("doseRoute");

    function setResult(title, text, amount, frequency, route) {
      resultTitle.textContent = title;
      resultText.textContent = text;
      doseAmount.textContent = amount || "Pendiente";
      doseFrequency.textContent = frequency || "Pendiente";
      doseRoute.textContent = route || "Pendiente";
    }

    function ageToYears(value, unit) {
      const age = Number(value);
      if (!Number.isFinite(age)) return null;
      if (unit === "days") return age / 365;
      if (unit === "months") return age / 12;
      return age;
    }

    function calculateBsa(weightKg, heightCm) {
      if (!Number.isFinite(weightKg) || !Number.isFinite(heightCm) || weightKg <= 0 || heightCm <= 0) return null;
      return Math.sqrt((weightKg * heightCm) / 3600);
    }

    function updateBsaFromHeight() {
      const calculatedBsa = calculateBsa(Number(weightInput.value), Number(heightInput.value));
      if (!calculatedBsa) return;
      bsaInput.value = calculatedBsa.toFixed(2);
    }

    function matchesCriteria(rule, patient) {
      const criteria = rule.criteria || {};
      if (criteria.protocolSlug && criteria.protocolSlug !== patient.protocolSlug) return false;
      if (criteria.sex && criteria.sex !== patient.sex) return false;
      if (Number.isFinite(criteria.minAgeYears) && patient.ageYears < criteria.minAgeYears) return false;
      if (Number.isFinite(criteria.maxAgeYears) && patient.ageYears > criteria.maxAgeYears) return false;
      if (Number.isFinite(criteria.minWeightKg) && patient.weightKg < criteria.minWeightKg) return false;
      if (Number.isFinite(criteria.maxWeightKg) && patient.weightKg > criteria.maxWeightKg) return false;
      if (Number.isFinite(criteria.minBsaM2) && (!Number.isFinite(patient.bsaM2) || patient.bsaM2 < criteria.minBsaM2)) return false;
      if (Number.isFinite(criteria.maxBsaM2) && (!Number.isFinite(patient.bsaM2) || patient.bsaM2 > criteria.maxBsaM2)) return false;
      return true;
    }

    function roundDose(value, roundTo) {
      if (!roundTo) return value;
      return Math.round(value / roundTo) * roundTo;
    }

    function calculateRule(rule, patient) {
      const calculation = rule.calculation || {};
      const unit = calculation.unit || "mg";
      let amount = null;

      if (calculation.type === "mgPerKg") amount = Number(calculation.amount) * patient.weightKg;
      if (calculation.type === "mcgPerKg") amount = Number(calculation.amount) * patient.weightKg;
      if (calculation.type === "mcgPerM2") {
        if (!Number.isFinite(patient.bsaM2) || patient.bsaM2 <= 0) return null;
        amount = Number(calculation.amount) * patient.bsaM2;
      }
      if (calculation.type === "fixed") amount = Number(calculation.amount);
      if (calculation.type === "mgPerKgRange") {
        const minAmount = Number(calculation.minAmount) * patient.weightKg;
        const maxAmount = Number(calculation.maxAmount) * patient.weightKg;
        if (!Number.isFinite(minAmount) || !Number.isFinite(maxAmount)) return null;
        return {
          amount: minAmount.toLocaleString("es-MX", { maximumFractionDigits: 1 }) + " a " + maxAmount.toLocaleString("es-MX", { maximumFractionDigits: 1 }) + " " + unit,
          frequency: rule.frequency || "No especificada",
          route: rule.route || "No especificada",
          note: rule.note || "Cálculo generado con la regla seleccionada."
        };
      }
      if (calculation.type === "mm2PerM2Range") {
        if (!Number.isFinite(patient.bsaM2) || patient.bsaM2 <= 0) return null;
        const minAmount = Number(calculation.minAmount) * patient.bsaM2;
        const maxAmount = Number(calculation.maxAmount) * patient.bsaM2;
        if (!Number.isFinite(minAmount) || !Number.isFinite(maxAmount)) return null;
        return {
          amount: minAmount.toLocaleString("es-MX", { maximumFractionDigits: 0 }) + " a " + maxAmount.toLocaleString("es-MX", { maximumFractionDigits: 0 }) + " " + unit,
          frequency: rule.frequency || "No especificada",
          route: rule.route || "No especificada",
          note: rule.note || "Cálculo generado con la regla seleccionada."
        };
      }
      if (calculation.type === "millionCellsPerKg") {
        amount = Number(calculation.amount) * patient.weightKg;
        if (!Number.isFinite(amount)) return null;
        return {
          amount: amount.toLocaleString("es-MX", { maximumFractionDigits: 1 }) + " x10^6 " + unit,
          frequency: rule.frequency || "No especificada",
          route: rule.route || "No especificada",
          note: rule.note || "Cálculo generado con la regla seleccionada."
        };
      }

      if (!Number.isFinite(amount)) return null;
      if (Number.isFinite(calculation.minDose)) amount = Math.max(amount, calculation.minDose);
      if (Number.isFinite(calculation.maxDose)) amount = Math.min(amount, calculation.maxDose);
      amount = roundDose(amount, calculation.roundTo);

      return {
        amount: amount + " " + unit,
        frequency: rule.frequency || "No especificada",
        route: rule.route || "No especificada",
        note: rule.note || "Cálculo generado con la regla seleccionada."
      };
    }

    function getSelectedMedication() {
      return medications.find((medication) => medication.id === medicationSelect.value);
    }

    function getMedicationsForProtocol(protocolSlug) {
      if (!protocolSlug) return medications;
      return medications.filter((medication) => {
        return (medication.protocols || []).includes(protocolSlug);
      });
    }

    function renderMedicationOptions() {
      const protocolSlug = protocolSelect.value;
      const filteredMedications = getMedicationsForProtocol(protocolSlug);
      const previousValue = medicationSelect.value;

      if (!filteredMedications.length) {
        medicationSelect.innerHTML = '<option value="">Sin medicamentos para este protocolo</option>';
        medicationSelect.disabled = true;
        setResult(
          "Sin medicamentos vinculados",
          protocolSlug
            ? "Este protocolo todavía no tiene medicamentos con fórmula de dosis cargada."
            : "Selecciona un protocolo para ver medicamentos vinculados.",
          "Pendiente",
          "Pendiente",
          "Pendiente"
        );
        return;
      }

      medicationSelect.disabled = false;
      medicationSelect.innerHTML = '<option value="">Selecciona un medicamento</option>' + filteredMedications.map((medication) => `
        <option value="${medication.id}">${medication.name}</option>
      `).join("");

      if (filteredMedications.some((medication) => medication.id === previousValue)) {
        medicationSelect.value = previousValue;
      } else if (protocolSlug) {
        medicationSelect.value = filteredMedications[0].id;
        setResult(
          "Medicamentos filtrados",
          "Mostrando medicamentos vinculados al protocolo seleccionado. Puedes cambiar el medicamento antes de calcular.",
          "Pendiente",
          "Pendiente",
          "Pendiente"
        );
      } else {
        medicationSelect.value = "";
      }
    }

    if (!medications.length) {
      medicationSelect.disabled = true;
      submitButton.disabled = true;
      setResult(
        "Sin medicamentos cargados",
        "Agrega medicamentos con reglas de dosificación para activar el cálculo.",
        "Pendiente",
        "Pendiente",
        "Pendiente"
      );
      return;
    }

    renderMedicationOptions();
    protocolSelect.addEventListener("change", renderMedicationOptions);
    weightInput.addEventListener("input", updateBsaFromHeight);
    heightInput.addEventListener("input", updateBsaFromHeight);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const medication = getSelectedMedication();
      const patient = {
        protocolSlug: protocolSelect.value,
        sex: sexSelect.value,
        ageYears: ageToYears(ageInput.value, ageUnitSelect.value),
        weightKg: Number(weightInput.value),
        bsaM2: bsaInput.value ? Number(bsaInput.value) : null
      };

      if (!medication) {
        setResult("Selecciona un medicamento", "Elige un medicamento para buscar sus reglas de dosificación.");
        return;
      }

      if (patient.protocolSlug && medication.protocols?.length && !medication.protocols.includes(patient.protocolSlug)) {
        setResult(
          "Medicamento no vinculado",
          "Este medicamento no está asociado a ese protocolo en la base actual.",
          "No aplica",
          "No aplica",
          "No aplica"
        );
        return;
      }

      if (!Number.isFinite(patient.ageYears) || !Number.isFinite(patient.weightKg) || patient.weightKg <= 0) {
        setResult("Datos incompletos", "Captura edad y peso para calcular la dosis.");
        return;
      }

      const needsBsa = (medication.dosingRules || []).some((rule) => {
        const calculationType = rule.calculation?.type;
        const criteria = rule.criteria || {};
        return ["mcgPerM2", "mm2PerM2Range"].includes(calculationType)
          || Number.isFinite(criteria.minBsaM2)
          || Number.isFinite(criteria.maxBsaM2);
      });

      if (needsBsa && (!Number.isFinite(patient.bsaM2) || patient.bsaM2 <= 0)) {
        setResult("Falta superficie corporal", "Este medicamento requiere capturar superficie corporal en m² para aplicar su fórmula.");
        return;
      }

      const rule = (medication.dosingRules || []).find((item) => matchesCriteria(item, patient));
      if (!rule) {
        setResult("Sin regla compatible", "No hay una regla de dosis que coincida con estos datos clínicos.");
        return;
      }

      const result = calculateRule(rule, patient);
      if (!result) {
        setResult("Regla incompleta", "La regla seleccionada no tiene una fórmula válida.");
        return;
      }

      setResult("Dosis calculada", result.note, result.amount, result.frequency, result.route);
    });
  }

  function renderImmunodeficiencyTool() {
    return `
      <section class="section-card screening-tool" id="immunodeficiencyTool">
        <div class="section-head">
          <div>
            <small>Herramienta de orientación</small>
            <h2>Sospecha de inmunodeficiencia primaria</h2>
          </div>
          <p>Tamizaje clínico inicial basado en señales de alarma; no sustituye valoración por inmunología ni confirmación por laboratorio.</p>
        </div>

        <section class="screening-layout">
          <form class="screening-form" id="immunodeficiencyForm">
            <div class="form-grid">
              <label class="field-group">
                <span>Edad actual</span>
                <input id="immuneAge" class="form-control" type="number" min="0" step="1" placeholder="Ej. 8">
              </label>

              <label class="field-group">
                <span>Unidad</span>
                <select id="immuneAgeUnit" class="form-control">
                  <option value="years">Años</option>
                  <option value="months">Meses</option>
                  <option value="days">Días</option>
                </select>
              </label>

              <label class="field-group">
                <span>Inicio de síntomas</span>
                <select id="immuneOnset" class="form-control">
                  <option value="">No especificado</option>
                  <option value="infancy">Primer año de vida</option>
                  <option value="childhood">Infancia</option>
                  <option value="adolescence">Adolescencia</option>
                  <option value="adult">Edad adulta</option>
                </select>
              </label>

              <label class="field-group">
                <span>Sexo/género</span>
                <select id="immuneSex" class="form-control">
                  <option value="">No especificado</option>
                  <option value="femenino">Femenino</option>
                  <option value="masculino">Masculino</option>
                  <option value="otro">Otro / no aplica</option>
                </select>
              </label>
            </div>

            <div class="check-section">
              <h3>Señales de alarma</h3>
              <div class="checklist-grid">
                <label class="check-option"><input type="checkbox" data-score="3" data-critical="true" value="Dos o más neumonías en un año"><span>Dos o más neumonías en un año.</span></label>
                <label class="check-option"><input type="checkbox" data-score="3" data-critical="true" value="Infecciones profundas, sepsis o meningitis"><span>Infecciones profundas, sepsis, meningitis o infecciones en sitios inusuales.</span></label>
                <label class="check-option"><input type="checkbox" data-score="3" data-critical="true" value="Gérmenes oportunistas o inusuales"><span>Infecciones oportunistas, inusuales o muy graves para la edad.</span></label>
                <label class="check-option"><input type="checkbox" data-score="3" data-critical="true" value="Necesidad de antibiótico intravenoso"><span>Necesidad de antibiótico intravenoso para controlar infecciones.</span></label>
                <label class="check-option"><input type="checkbox" data-score="3" data-critical="true" value="Antecedente familiar relevante"><span>Antecedente familiar de inmunodeficiencia o muertes tempranas por infección.</span></label>
                <label class="check-option"><input type="checkbox" data-score="2" value="Otitis, sinusitis o infecciones respiratorias recurrentes"><span>Otitis, sinusitis o infecciones respiratorias recurrentes.</span></label>
                <label class="check-option"><input type="checkbox" data-score="2" value="Antibióticos prolongados con poca respuesta"><span>Antibióticos por tiempo prolongado con respuesta pobre.</span></label>
                <label class="check-option"><input type="checkbox" data-score="2" value="Abscesos recurrentes"><span>Abscesos recurrentes en piel, tejidos profundos u órganos.</span></label>
                <label class="check-option"><input type="checkbox" data-score="2" value="Candidiasis persistente o micosis extensa"><span>Candidiasis persistente, recurrente o micosis extensa.</span></label>
                <label class="check-option"><input type="checkbox" data-score="2" value="Falla de crecimiento o diarrea crónica"><span>Falla de crecimiento, pérdida de peso o diarrea crónica.</span></label>
                <label class="check-option"><input type="checkbox" data-score="2" value="Autoinmunidad, citopenias o linfoproliferación"><span>Autoinmunidad, citopenias, linfadenopatía o hepatoesplenomegalia.</span></label>
                <label class="check-option"><input type="checkbox" data-score="2" value="Respuesta pobre a vacunas"><span>Respuesta clínica pobre a vacunas o infecciones a pesar de vacunación adecuada.</span></label>
              </div>
            </div>

            <div class="check-section secondary-checks">
              <h3>Factores que pueden sugerir causa secundaria</h3>
              <div class="checklist-grid compact-checks">
                <label class="check-option"><input type="checkbox" data-secondary="true" value="VIH"><span>VIH o exposición de riesgo.</span></label>
                <label class="check-option"><input type="checkbox" data-secondary="true" value="Inmunosupresores"><span>Uso de esteroides sistémicos, quimioterapia o inmunosupresores.</span></label>
                <label class="check-option"><input type="checkbox" data-secondary="true" value="Desnutrición"><span>Desnutrición o pérdida de peso importante.</span></label>
                <label class="check-option"><input type="checkbox" data-secondary="true" value="Diabetes u otra enfermedad crónica"><span>Diabetes, enfermedad renal, hepática u otra enfermedad crónica.</span></label>
                <label class="check-option"><input type="checkbox" data-secondary="true" value="Asplenia"><span>Asplenia anatómica o funcional.</span></label>
              </div>
            </div>

            <button class="tool-btn primary screening-submit" type="submit">Evaluar sospecha</button>
          </form>

          <aside class="screening-result" aria-live="polite">
            <span class="badge">Resultado</span>
            <h2 id="immuneResultTitle">Sin evaluación</h2>
            <p id="immuneResultText">Marca las señales presentes para estimar el nivel de sospecha y orientar los siguientes pasos.</p>
            <div class="risk-meter">
              <span id="immuneRiskBadge" class="risk-level neutral">Pendiente</span>
              <strong id="immuneScore">0 puntos</strong>
            </div>
            <div class="screening-recommendations">
              <h3>Siguientes pasos sugeridos</h3>
              <ul id="immuneNextSteps">
                <li>Completar historia clínica dirigida y documentar patrón de infecciones.</li>
              </ul>
            </div>
            <p class="dose-note">Ante infección grave, datos de sepsis o deterioro clínico, priorizar atención urgente.</p>
          </aside>
        </section>
      </section>
    `;
  }

  function setupImmunodeficiencyTool() {
    const form = document.getElementById("immunodeficiencyForm");
    if (!form) return;

    const resultTitle = document.getElementById("immuneResultTitle");
    const resultText = document.getElementById("immuneResultText");
    const riskBadge = document.getElementById("immuneRiskBadge");
    const scoreLabel = document.getElementById("immuneScore");
    const nextSteps = document.getElementById("immuneNextSteps");
    const onsetSelect = document.getElementById("immuneOnset");
    const sexSelect = document.getElementById("immuneSex");

    function setRiskClass(level) {
      riskBadge.className = "risk-level " + level;
    }

    function renderSteps(items) {
      nextSteps.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const selectedWarnings = [...form.querySelectorAll("[data-score]:checked")];
      const secondaryFactors = [...form.querySelectorAll("[data-secondary]:checked")];
      const criticalCount = selectedWarnings.filter((item) => item.dataset.critical === "true").length;
      let score = selectedWarnings.reduce((sum, item) => sum + Number(item.dataset.score || 0), 0);

      if (onsetSelect.value === "infancy") score += 2;
      if (onsetSelect.value === "childhood") score += 1;
      if (sexSelect.value === "masculino" && (onsetSelect.value === "infancy" || onsetSelect.value === "childhood")) score += 1;

      const warningList = selectedWarnings.map((item) => item.value);
      const hasSecondary = secondaryFactors.length > 0;
      let level = "low";
      let title = "Sospecha baja";
      let text = "No se identifican suficientes señales de alarma para una sospecha alta con este tamizaje.";
      let steps = [
        "Revisar frecuencia real, gravedad, duración y sitio de las infecciones.",
        "Buscar diagnósticos frecuentes que expliquen infecciones recurrentes, como alergia, asma, exposición escolar o tratamiento incompleto.",
        "Revalorar si aparecen infecciones graves, oportunistas o mala respuesta a tratamiento."
      ];

      if (score >= 7 || criticalCount >= 2) {
        level = "high";
        title = "Sospecha alta";
        text = "El patrón marcado sugiere priorizar estudio de inmunodeficiencia y referencia a inmunología clínica.";
        steps = [
          "Solicitar biometría hemática completa con diferencial.",
          "Solicitar inmunoglobulinas cuantitativas: IgG, IgA e IgM.",
          "Valorar subpoblaciones linfocitarias si el inicio fue temprano, grave u oportunista.",
          "Valorar respuesta a vacunas y complemento según el patrón clínico.",
          "Referir a inmunología clínica o alergología/inmunología."
        ];
      } else if (score >= 3 || criticalCount === 1) {
        level = "moderate";
        title = "Sospecha intermedia";
        text = "Hay datos que justifican ampliar interrogatorio, documentar infecciones y considerar estudios iniciales.";
        steps = [
          "Documentar número, sitio, germen, severidad y tratamiento de cada infección.",
          "Considerar biometría hemática con diferencial e inmunoglobulinas cuantitativas.",
          "Revisar esquema de vacunación y respuesta clínica esperada.",
          "Escalar a inmunología si persisten infecciones, hay mala respuesta o aparece una señal crítica."
        ];
      }

      if (hasSecondary) {
        steps.push("Evaluar causas secundarias en paralelo: " + secondaryFactors.map((item) => item.value).join(", ") + ".");
      }

      if (warningList.length) {
        steps.push("Señales marcadas: " + warningList.join("; ") + ".");
      }

      setRiskClass(level);
      riskBadge.textContent = title;
      scoreLabel.textContent = score + (score === 1 ? " punto" : " puntos");
      resultTitle.textContent = title;
      resultText.textContent = text;
      renderSteps(steps);
    });
  }

  function renderCategoryPage(categorySlug) {
    const category = getCategoryBySlug(categorySlug);
    if (!category) return renderNotFound("No encontramos esa categoría clínica.");
    const protocols = getProtocolsByCategorySlug(categorySlug);
    const hasProtocols = protocols.length > 0;
    const featured = protocols[0];

    return `
      ${renderTopbar(category.slug)}
      <main class="page-shell">
        <div class="breadcrumbs">
          <a href="${homeUrl()}">Inicio</a>
          <span>/</span>
          <span>${category.title}</span>
        </div>

        <section class="hero-grid category-hero">
          <article class="hero-main">
            <div class="eyebrow">Categoría clínica</div>
            <h1>${category.title}</h1>
            <p>${category.description} ${category.helper}</p>
            <div class="hero-actions">
              ${featured ? `<a class="cta primary" href="${protocolUrl(featured.slug)}">Abrir protocolo disponible</a>` : ""}
              <a class="cta secondary" href="${homeUrl()}">Volver al inicio</a>
            </div>
          </article>
          <aside class="hero-side">
            <h3>${hasProtocols ? "Protocolos disponibles" : "Estado de la categoría"}</h3>
            ${hasProtocols ? `
              <ul>
                ${protocols.map((protocol) => `<li>${protocol.title}</li>`).join("")}
              </ul>
            ` : `
              <p>Aún no hay protocolos publicados en esta categoría.</p>
            `}
          </aside>
        </section>

        ${category.slug === "inmunodeficiencias" ? renderImmunodeficiencyTool() : ""}

        <section class="section-card">
          <div class="section-head">
            <div>
              <small>Biblioteca por categoría</small>
              <h2>Protocolos de ${category.title}</h2>
            </div>
            <p>${hasProtocols ? "Consulta los protocolos disponibles en esta categoría y abre el módulo que necesites." : "Esta categoría queda lista para integrar nuevos protocolos clínicos basados en artículos."}</p>
          </div>
          ${hasProtocols ? `
            <div class="protocol-grid">
              ${protocols.map(renderProtocolCard).join("")}
            </div>
          ` : `
            <div class="empty-state">
              <h2>Sin protocolos cargados</h2>
              <p>Cuando agregues nuevos artículos, esta categoría podrá mostrar sus protocolos aquí.</p>
            </div>
          `}
        </section>
      </main>
    `;
  }

  function renderProtocolQuickSheet(protocol) {
    if (protocol.kind !== "clinical") return "";

    const relatedMeds = getMedicationsByProtocolSlug(protocol.slug);
    const treatmentSummary = relatedMeds.length
      ? relatedMeds.map((medication) => medication.name).join(", ")
      : protocol.treatment?.summary || "Manejo individualizado con especialista.";
    const cards = [
      {
        label: "Cuándo sospechar",
        title: protocol.sections?.[0]?.title || "Sospecha clínica",
        text: protocol.sections?.[0]?.text || protocol.summary
      },
      {
        label: "Primer estudio",
        title: protocol.sections?.[1]?.title || "Evaluación inicial",
        text: protocol.sections?.[1]?.text || "Documentar patrón clínico y solicitar estudios iniciales."
      },
      {
        label: "Dato de alarma",
        title: "No retrasar atención",
        text: protocol.alert
      },
      {
        label: "Tratamiento clave",
        title: protocol.treatment?.title || "Manejo",
        text: treatmentSummary
      },
      {
        label: "Cuándo referir",
        title: protocol.sections?.[2]?.title || "Derivación",
        text: protocol.sections?.[2]?.text || "Referir a inmunología clínica si la sospecha persiste o hay resultados compatibles."
      }
    ];

    return `
      <section class="quick-sheet">
        ${cards.map((card) => `
          <article class="quick-sheet-card">
            <span>${card.label}</span>
            <h3>${card.title}</h3>
            <p>${card.text}</p>
          </article>
        `).join("")}
      </section>
    `;
  }

  function renderClinicalProtocol(protocol) {
    return `
      <section class="facts-grid">
        ${protocol.facts.map((fact) => `
          <article class="detail-card">
            <span>${fact.label}</span>
            <strong>${fact.value}</strong>
          </article>
        `).join("")}
      </section>

      <section class="summary-card">
        <h2>Resumen clínico</h2>
        <ul>
          ${protocol.quickSummary.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>

      ${renderClinicalDecisionDiagram(protocol)}

      ${renderTreatmentPlan(protocol)}

      <section class="content-grid">
        <div class="content-main">
          <div class="detail-grid">
            ${protocol.sections.map((section) => `
              <article class="detail-card">
                <span>${section.label}</span>
                <h3>${section.title}</h3>
                <p>${section.text}</p>
              </article>
            `).join("")}
          </div>
        </div>

        <aside class="content-side">
          <article class="info-card">
            <h3>Puntos rápidos</h3>
            <ul>
              ${protocol.checklist.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </article>
          <article class="info-card alert-card">
            <h3>Alerta clínica</h3>
            <p>${protocol.alert}</p>
          </article>
        </aside>
      </section>

      ${renderClinicalSources(protocol)}
    `;
  }

  function getRelatedMedications(protocol) {
    return (site.medications || []).filter((medication) => {
      return (medication.protocols || []).includes(protocol.slug);
    });
  }

  function getEvidenceSources(protocol, relatedMeds) {
    const sourceMap = new Map();
    [...(protocol.sources || []), ...relatedMeds.flatMap((medication) => medication.sources || [])].forEach((source) => {
      if (source?.url && !sourceMap.has(source.url)) sourceMap.set(source.url, source);
    });
    return [...sourceMap.values()];
  }

  function renderEvidenceLinks(sources, limit) {
    const limitedSources = sources.slice(0, limit || sources.length);
    if (!limitedSources.length) return "";
    return `
      <div class="diagram-evidence">
        <strong>Base de evidencia</strong>
        <div>
          ${limitedSources.map((source) => `
            <a href="${source.url}" target="_blank" rel="noopener noreferrer">
              ${renderSourceBadge(source)}
              <span>${source.label}</span>
            </a>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderClinicalDecisionDiagram(protocol) {
    const relatedMeds = getRelatedMedications(protocol);
    const sources = getEvidenceSources(protocol, relatedMeds);
    const suspicion = protocol.sections?.[0];
    const initialStudy = protocol.sections?.[1];
    const confirmation = protocol.sections?.[2];
    const safety = protocol.sections?.[3];
    const treatment = protocol.treatment;
    const primaryTreatment = treatment?.principles?.[0];
    const definitiveTreatment = treatment?.principles?.[1] || treatment?.principles?.[2];
    const medicationNames = relatedMeds.length
      ? relatedMeds.map((medication) => medication.name).join(", ")
      : "sin fórmula universal segura; individualizar con especialista";

    return `
      <section class="section-card decision-diagram-card" id="decisionDiagram">
        <div class="section-head compact-head">
          <div>
            <small>Diagrama de decisión</small>
            <h2>Ruta visual para toma de decisiones</h2>
          </div>
          <p>Algoritmo resumido para primer contacto, confirmación y tratamiento inicial; debe ajustarse a guías locales y valoración especializada.</p>
        </div>

        <div class="decision-controls no-print">
          <button class="tool-btn primary" type="button" data-clinical-step="start">Iniciar</button>
          <button class="tool-btn secondary" type="button" data-clinical-step="urgent">Sí: hay gravedad</button>
          <button class="tool-btn secondary" type="button" data-clinical-step="stable">No: paciente estable</button>
          <button class="tool-btn secondary" type="button" data-clinical-step="confirm">Confirmación</button>
          <button class="tool-btn secondary" type="button" data-clinical-step="treatment">Manejo</button>
          <button class="tool-btn secondary" type="button" data-clinical-step="reset">Mostrar todo</button>
        </div>

        <article class="status-card clinical-flow-status no-print" aria-live="polite">
          <strong class="clinical-status-title">Vista completa</strong>
          <p class="clinical-status-text">Puedes recorrer el algoritmo por pasos o revisar todo el flujo completo.</p>
        </article>

        <div class="decision-diagram">
          <article class="decision-step decision-step-start" data-step="start">
            <span>1. Sospecha clínica</span>
            <h3>${suspicion?.title || "Identificar patrón clínico"}</h3>
            <p>${suspicion?.text || protocol.summary}</p>
          </article>

          <div class="flow-arrow" aria-hidden="true"></div>

          <article class="decision-step decision-step-question" data-step="question">
            <span>2. Pregunta crítica</span>
            <h3>¿Hay datos de gravedad, infección invasiva o alerta del protocolo?</h3>
            <p>${protocol.alert}</p>
          </article>

          <div class="decision-split">
            <article class="decision-step decision-step-urgent" data-step="urgent">
              <span>Si</span>
              <h3>Escalar de inmediato</h3>
              <p>Priorizar estabilización, cultivos o estudios del foco, tratamiento de infección activa y referencia urgente a inmunología o equipo especializado.</p>
            </article>
            <article class="decision-step decision-step-stable" data-step="stable">
              <span>No</span>
              <h3>${initialStudy?.title || "Solicitar estudios iniciales"}</h3>
              <p>${initialStudy?.text || "Documentar patrón clínico y solicitar estudios de inmunidad iniciales."}</p>
            </article>
          </div>

          <div class="flow-arrow" aria-hidden="true"></div>

          <article class="decision-step decision-step-question" data-step="interpretation">
            <span>3. Interpretación</span>
            <h3>¿Los hallazgos apoyan el diagnóstico sospechado?</h3>
            <p>Contrastar clínica, laboratorio, patrón infeccioso y causas secundarias antes de cerrar el diagnóstico.</p>
          </article>

          <div class="decision-split">
            <article class="decision-step decision-step-confirm" data-step="confirm">
              <span>Compatible</span>
              <h3>${confirmation?.title || "Confirmar y referir"}</h3>
              <p>${confirmation?.text || "Confirmar con pruebas especializadas y derivar para manejo definitivo."}</p>
            </article>
            <article class="decision-step decision-step-review" data-step="review">
              <span>No concluyente</span>
              <h3>Revalorar y repetir si persiste sospecha</h3>
              <p>Revisar infecciones documentadas, medicamentos, VIH, desnutrición, pérdidas proteicas u otras causas secundarias; repetir estudios si el cuadro evoluciona.</p>
            </article>
          </div>

          <div class="flow-arrow" aria-hidden="true"></div>

          <article class="decision-step decision-step-treatment" data-step="treatment">
            <span>4. Manejo</span>
            <h3>${treatment?.title || safety?.title || "Tratamiento y seguimiento"}</h3>
            <p>${primaryTreatment?.text || treatment?.summary || safety?.text || "Definir tratamiento con especialista según gravedad, genotipo y órgano afectado."}</p>
            <div class="diagram-medications">
              <strong>Medicamentos o terapia vinculada:</strong>
              <span>${medicationNames}</span>
            </div>
            ${definitiveTreatment ? `
              <p class="diagram-note">${definitiveTreatment.title}: ${definitiveTreatment.text}</p>
            ` : ""}
          </article>
        </div>

        ${renderEvidenceLinks(sources, 5)}
      </section>
    `;
  }

  function renderTreatmentPlan(protocol) {
    const treatment = protocol.treatment;
    const relatedMeds = getRelatedMedications(protocol);

    if (!treatment && !relatedMeds.length) return "";

    return `
      <section class="section-card treatment-card">
        <div class="section-head compact-head">
          <div>
            <small>Tratamiento</small>
            <h2>${treatment?.title || "Tratamiento y medicamentos"}</h2>
          </div>
          <p>${treatment?.summary || "Opciones terapéuticas vinculadas con este protocolo."}</p>
        </div>

        ${treatment?.principles?.length ? `
          <div class="treatment-grid">
            ${treatment.principles.map((item) => `
              <article class="treatment-item">
                <span>${item.label}</span>
                <h3>${item.title}</h3>
                <p>${item.text}</p>
              </article>
            `).join("")}
          </div>
        ` : ""}

        ${relatedMeds.length ? `
          <div class="medication-linked-list">
            ${relatedMeds.map((medication) => `
              <article class="linked-medication">
                <div>
                  <span class="badge">${medication.group || "Medicamento"}</span>
                  <h3>${medication.name}</h3>
                  <p>${medication.summary}</p>
                  ${medication.formula ? `<p class="formula-note">${medication.formula}</p>` : ""}
                </div>
                  ${medication.sources?.length ? `
                  <div class="mini-source-list">
                    ${medication.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${renderSourceBadge(source)} ${source.label}</a>`).join("")}
                  </div>
                ` : ""}
              </article>
            `).join("")}
          </div>
          <a class="cta secondary centered" href="${medicationUrl()}">Abrir calculadora de dosis</a>
        ` : `
          <p class="dose-note">Este protocolo no tiene una fórmula universal segura para calculadora. El tratamiento depende de especie, gravedad, genotipo, órgano afectado o centro especializado.</p>
        `}
      </section>
    `;
  }

  function renderClinicalSources(protocol) {
    const sources = protocol.sources || [];
    const hasCitation = Boolean(protocol.citation);
    if (!sources.length && !hasCitation) return "";

    return `
      <section class="section-card sources-card">
        <div class="section-head compact-head">
          <div>
            <small>Referencias</small>
            <h2>Fuentes consultadas</h2>
          </div>
          <p>Contenido resumido para consulta educativa; las decisiones clínicas deben confirmarse con guías locales y valoración especializada.</p>
        </div>
        ${sources.length ? `
          <div class="source-list">
            ${sources.map((source) => `
              <a class="source-link" href="${source.url}" target="_blank" rel="noopener noreferrer">
                <span>${source.label}</span>
                ${renderSourceBadge(source)}
                <small>${source.url.replace(/^https?:\/\//, "")}</small>
              </a>
            `).join("")}
          </div>
        ` : ""}
        ${hasCitation ? `<p class="citation-text">${protocol.citation}</p>` : ""}
      </section>
    `;
  }

  function renderNode(node) {
    return `
      <article class="node node--${node.tone}" data-id="${node.id}" data-group="${node.group}">
        <div class="node-top">
          <div>
            <h3>${node.title}</h3>
            <p>${node.text}</p>
          </div>
          <span class="badge">${node.badge}</span>
        </div>
        <button class="toggle" type="button">Ver detalles</button>
        <div class="extra">
          <strong>Detalles útiles:</strong>
          <ul>
            ${node.details.map((detail) => `<li>${detail}</li>`).join("")}
          </ul>
        </div>
      </article>
    `;
  }

  function renderAlgorithmProtocol(protocol) {
    const commonNodes = protocol.commonNodes.map((node, index, items) => renderNode(node) + (index < items.length - 1 ? '<div class="connector" aria-hidden="true"></div>' : "")).join("");
    const acuteNodes = protocol.branches.acute.nodes.map((node, index, items) => renderNode(node) + (index < items.length - 1 ? '<div class="connector" aria-hidden="true"></div>' : "")).join("");
    const screeningNodes = protocol.branches.screening.nodes.map((node, index, items) => renderNode(node) + (index < items.length - 1 ? '<div class="connector" aria-hidden="true"></div>' : "")).join("");
    const finalNodes = protocol.finalNodes.map((node, index, items) => renderNode(node) + (index < items.length - 1 ? '<div class="connector" aria-hidden="true"></div>' : "")).join("");

    return `
      <section class="facts-grid">
        ${protocol.facts.map((fact) => `
          <article class="detail-card">
            <span>${fact.label}</span>
            <strong>${fact.value}</strong>
          </article>
        `).join("")}
      </section>

      <section class="summary-card">
        <h2>Resumen clínico</h2>
        <ul>
          ${protocol.quickSummary.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>

      <section class="algorithm-toolbar">
        <button class="tool-btn primary play-btn" type="button">Recorrer protocolo</button>
        <button class="tool-btn secondary active" type="button" data-mode="all" aria-pressed="true">Mostrar todo</button>
        <button class="tool-btn secondary" type="button" data-mode="acute" aria-pressed="false">Ruta aguda</button>
        <button class="tool-btn secondary" type="button" data-mode="screening" aria-pressed="false">Ruta habitual</button>
      </section>

      <section class="status-card" aria-live="polite">
        <strong class="status-title">${protocol.routeMessages.all.title}</strong>
        <p class="status-text">${protocol.routeMessages.all.text}</p>
        <div class="pill-row">
          <span class="pill">Entrada</span>
          <span class="pill">Solicitud</span>
          <span class="pill">Consejería</span>
          <span class="pill">Decisión clínica</span>
          <span class="pill pill-acute">Sospecha aguda</span>
          <span class="pill pill-screening">Tamizaje habitual</span>
          <span class="pill">Confirmación</span>
          <span class="pill">Seguimiento</span>
        </div>
      </section>

      <section class="diagram-stack protocol-algorithm">
        ${commonNodes}
        <section class="branch-grid">
          <div>
            <span class="branch-label red">${protocol.branches.acute.label}</span>
            ${acuteNodes}
          </div>
          <div>
            <span class="branch-label green">${protocol.branches.screening.label}</span>
            ${screeningNodes}
          </div>
        </section>
        <section class="merge-line" aria-hidden="true">
          <div class="bar"></div>
          <div class="down"></div>
          <div class="bar"></div>
        </section>
        ${finalNodes}
        <section class="alert-banner">
          <h3>Alerta clínica</h3>
          <p>${protocol.alert}</p>
        </section>
      </section>

      <section class="test-grid">
        ${protocol.tests.map((test) => `
          <article class="test-card ${test.tone}">
            <h4>${test.title}</h4>
            <p>${test.text}</p>
          </article>
        `).join("")}
      </section>

      <section class="info-grid">
        <article class="info-card">
          <h3>Equipo</h3>
          <ol>
            ${protocol.team.map((member) => `<li>${member}</li>`).join("")}
          </ol>
        </article>
        <article class="info-card">
          <h3>Artículo base / cita</h3>
          <p>${protocol.citation}</p>
          <p class="spaced">${protocol.insight}</p>
        </article>
      </section>
    `;
  }

  function renderRelatedProtocols(protocol) {
    const related = site.protocols
      .filter((item) => item.categorySlug === protocol.categorySlug && item.slug !== protocol.slug)
      .sort(sortByDateDesc);

    if (!related.length) return "";

    return `
      <section class="section-card spaced-top related-protocols">
        <div class="section-head">
          <div>
            <small>Misma categoría</small>
            <h2>Otros protocolos de ${protocol.category}</h2>
          </div>
          <p>Continúa con otros protocolos disponibles dentro de la misma categoría clínica.</p>
        </div>
        <div class="protocol-grid">
          ${related.map(renderProtocolCard).join("")}
        </div>
      </section>
    `;
  }

  function renderProtocolPage(protocolSlug) {
    const protocol = getProtocolBySlug(protocolSlug);
    if (!protocol) return renderNotFound("No encontramos ese protocolo clínico.");

    return `
      ${renderTopbar(protocol.categorySlug)}
      <main class="page-shell">
        <div class="breadcrumbs">
          <a href="${homeUrl()}">Inicio</a>
          <span>/</span>
          <a href="${categoryUrl(protocol.categorySlug)}">${protocol.category}</a>
          <span>/</span>
          <span>${protocol.title}</span>
        </div>

        <section class="protocol-hero">
          <div class="protocol-hero-main">
            <div class="chip category">${protocol.category}</div>
            <h1>${protocol.title}</h1>
            <p>${protocol.subtitle}</p>
            <div class="hero-meta">
              <span class="chip status">${protocol.status}</span>
              <span class="chip date">Actualizado: ${formatDate(protocol.updatedAt)}</span>
            </div>
            <div class="hero-actions no-print">
              <button class="cta secondary print-btn" type="button">Imprimir / guardar PDF</button>
              ${protocol.kind === "clinical" ? `<a class="cta primary" href="#decisionDiagram">Ver diagrama</a>` : ""}
            </div>
          </div>
          <aside class="protocol-hero-side">
            <h3>Orientación rápida</h3>
            <ul>
              <li>Revisa el resumen clínico y los puntos de alarma principales.</li>
              <li>Pertenece a la categoría <strong>${protocol.category}</strong>.</li>
              <li>Al final encontrarás protocolos relacionados para ampliar la consulta.</li>
            </ul>
          </aside>
        </section>

        ${renderProtocolQuickSheet(protocol)}

        ${protocol.kind === "algorithm" ? renderAlgorithmProtocol(protocol) : renderClinicalProtocol(protocol)}

        ${renderRelatedProtocols(protocol)}
      </main>
    `;
  }

  function renderNotFound(message) {
    return `
      ${renderTopbar("")}
      <main class="page-shell">
        <section class="section-card empty-state">
          <h1>Página no encontrada</h1>
          <p>${message}</p>
          <a class="cta primary centered" href="${homeUrl()}">Volver al inicio</a>
        </section>
      </main>
    `;
  }

  function setupPrintButton() {
    const printButton = document.querySelector(".print-btn");
    if (!printButton) return;
    printButton.addEventListener("click", () => window.print());
  }

  function setupClinicalDecisionDiagram() {
    const card = document.querySelector(".decision-diagram-card");
    if (!card) return;

    const steps = [...card.querySelectorAll(".decision-step")];
    const buttons = [...card.querySelectorAll("[data-clinical-step]")];
    const statusTitle = card.querySelector(".clinical-status-title");
    const statusText = card.querySelector(".clinical-status-text");
    const stepGroups = {
      start: ["start", "question"],
      urgent: ["question", "urgent", "treatment"],
      stable: ["question", "stable", "interpretation"],
      confirm: ["interpretation", "confirm", "review"],
      treatment: ["confirm", "treatment"]
    };

    function setStep(target) {
      if (target === "reset") {
        steps.forEach((step) => {
          step.classList.remove("is-active", "is-dimmed");
        });
        buttons.forEach((button) => button.classList.remove("active"));
        statusTitle.textContent = "Vista completa";
        statusText.textContent = "Puedes recorrer el algoritmo por pasos o revisar todo el flujo completo.";
        return;
      }

      const activeSteps = stepGroups[target] || [target];
      steps.forEach((step) => {
        const active = activeSteps.includes(step.dataset.step);
        step.classList.toggle("is-active", active);
        step.classList.toggle("is-dimmed", !active);
      });
      buttons.forEach((button) => button.classList.toggle("active", button.dataset.clinicalStep === target));

      const focusStep = steps.find((step) => step.dataset.step === activeSteps[activeSteps.length - 1]) || steps[0];
      statusTitle.textContent = focusStep.querySelector("h3")?.textContent || "Paso seleccionado";
      statusText.textContent = focusStep.querySelector("p")?.textContent || "";
      focusStep.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    buttons.forEach((button) => {
      button.addEventListener("click", () => setStep(button.dataset.clinicalStep));
    });

    steps.forEach((step) => {
      step.addEventListener("click", () => setStep(step.dataset.step || "reset"));
    });
  }

  function setupAlgorithm(protocol) {
    const container = document.querySelector(".protocol-algorithm");
    if (!container) return;

    const nodes = [...container.querySelectorAll(".node")];
    const playButton = document.querySelector(".play-btn");
    const modeButtons = [...document.querySelectorAll("[data-mode]")];
    const statusTitle = document.querySelector(".status-title");
    const statusText = document.querySelector(".status-text");
    const acutePill = document.querySelector(".pill-acute");
    const screeningPill = document.querySelector(".pill-screening");
    const sequences = {
      all: ["1", "2", "3", "4", "5A", "6A", "7A", "8", "9"],
      acute: ["1", "2", "3", "4", "5A", "6A", "7A", "8", "9"],
      screening: ["1", "2", "3", "4", "5B", "6B", "7B", "8", "9"]
    };

    let currentMode = "all";
    let selectedNodeId = null;
    let isPlaying = false;
    let playToken = 0;

    function updateToolbar() {
      modeButtons.forEach((button) => {
        const active = button.dataset.mode === currentMode;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });
      playButton.textContent = isPlaying ? "Detener recorrido" : "Recorrer protocolo";
    }

    function updateNodes() {
      nodes.forEach((node) => {
        const group = node.dataset.group;
        const visible = currentMode === "all" || group === "common" || group === currentMode;
        node.style.opacity = visible ? "1" : "0.3";
        node.classList.toggle("route-highlight", currentMode !== "all" && group === currentMode);
        node.classList.toggle("active", visible && node.dataset.id === selectedNodeId);
      });
    }

    function setMode(mode) {
      currentMode = mode;
      if (selectedNodeId) {
        const currentNode = container.querySelector(`[data-id="${selectedNodeId}"]`);
        if (currentNode && currentNode.dataset.group !== "common" && currentNode.dataset.group !== currentMode && currentMode !== "all") {
          selectedNodeId = null;
        }
      }
      updateNodes();
      updateToolbar();
      acutePill.className = "pill pill-acute" + (mode === "acute" ? " active-red" : "");
      screeningPill.className = "pill pill-screening" + (mode === "screening" ? " active-green" : "");
      statusTitle.textContent = protocol.routeMessages[mode].title;
      statusText.textContent = protocol.routeMessages[mode].text;
    }

    function stopPlayback(message) {
      if (!isPlaying) return;
      isPlaying = false;
      playToken += 1;
      updateToolbar();
      if (message) {
        statusTitle.textContent = "Recorrido detenido";
        statusText.textContent = message;
      }
    }

    modeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (isPlaying) stopPlayback();
        setMode(button.dataset.mode);
      });
    });

    nodes.forEach((node) => {
      const toggle = node.querySelector(".toggle");
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        if (isPlaying) stopPlayback();
        const open = node.classList.toggle("open");
        toggle.textContent = open ? "Ocultar detalles" : "Ver detalles";
        selectedNodeId = node.dataset.id;
        updateNodes();
        statusTitle.textContent = "Bloque " + node.dataset.id + " seleccionado";
        statusText.textContent = node.querySelector("p").textContent;
      });

      node.addEventListener("click", () => {
        if (isPlaying) stopPlayback();
        selectedNodeId = node.dataset.id;
        updateNodes();
        statusTitle.textContent = "Bloque " + node.dataset.id + " en foco";
        statusText.textContent = node.querySelector("p").textContent;
      });
    });

    playButton.addEventListener("click", async () => {
      if (isPlaying) {
        stopPlayback("Puedes cambiar de ruta o abrir cualquier bloque manualmente.");
        return;
      }

      isPlaying = true;
      playToken += 1;
      const localToken = playToken;
      updateToolbar();
      const targetMode = currentMode === "all" ? "acute" : currentMode;
      setMode(targetMode);
      const sequence = sequences[targetMode];

      for (const id of sequence) {
        if (localToken !== playToken) return;
        const node = container.querySelector(`[data-id="${id}"]`);
        selectedNodeId = id;
        updateNodes();
        node.scrollIntoView({ behavior: "smooth", block: "center" });
        statusTitle.textContent = "Recorriendo paso " + id;
        statusText.textContent = node.querySelector("p").textContent;
        await new Promise((resolve) => setTimeout(resolve, 950));
      }

      isPlaying = false;
      updateToolbar();
      statusTitle.textContent = "Recorrido completado";
      statusText.textContent = "Puedes cambiar de ruta, volver a reproducir o abrir los detalles de cualquier bloque.";
    });

    setMode("all");
  }

  if (page === "home") {
    app.innerHTML = renderHomePage();
    setupTopbarMenu();
    setupHomeInteractions();
  } else if (page === "category") {
    app.innerHTML = renderCategoryPage(value);
    setupTopbarMenu();
    if (value === "inmunodeficiencias") setupImmunodeficiencyTool();
  } else if (page === "protocol") {
    app.innerHTML = renderProtocolPage(value);
    setupTopbarMenu();
    setupPrintButton();
    const protocol = getProtocolBySlug(value);
    if (protocol && protocol.kind === "algorithm") setupAlgorithm(protocol);
    if (protocol && protocol.kind === "clinical") setupClinicalDecisionDiagram();
  } else if (page === "medications") {
    app.innerHTML = renderMedicationPage();
    setupTopbarMenu();
    setupDoseCalculator();
  } else {
    app.innerHTML = renderNotFound("No se pudo cargar la vista solicitada.");
    setupTopbarMenu();
  }
})();
