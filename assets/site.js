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

  function formatProtocolCount(count) {
    if (count === 0) return "Sin protocolos";
    return count + (count === 1 ? " protocolo" : " protocolos");
  }

  function renderTopbar(activeCategorySlug) {
    const activeCategory = activeCategorySlug ? getCategoryBySlug(activeCategorySlug) : null;
    const currentLabel = activeCategory ? activeCategory.short : "Inicio";
    const currentDetail = activeCategory ? activeCategory.title : "Portal clínico";

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
                <a class="menu-link ${!activeCategorySlug ? "active" : ""}" href="${homeUrl()}">
                  <span>Inicio</span>
                  <small>Portada clínica</small>
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
      </div>
    `;
  }

  function renderStats() {
    const availableCount = site.protocols.filter((protocol) => protocol.status === "Disponible").length;
    const activeCategoriesCount = site.categories.filter((category) => getProtocolsByCategorySlug(category.slug).length > 0).length;
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
          <span>Categorías con contenido</span>
          <strong>${activeCategoriesCount}</strong>
          <p>Categorías que ya cuentan con al menos un protocolo clínico cargado.</p>
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
    return `
      <a class="protocol-card" href="${protocolUrl(protocol.slug)}" data-search="${[
        protocol.title,
        protocol.category,
        protocol.summary,
        protocol.tags.join(" ")
      ].join(" ").toLowerCase()}" data-date="${protocol.updatedAt}">
        <div class="card-top">
          <span class="chip category">${protocol.category}</span>
          <span class="chip status">${protocol.status}</span>
        </div>
        <h3>${protocol.title}</h3>
        <p>${protocol.summary}</p>
        <div class="card-bottom">
          <span class="chip date">${formatDate(protocol.updatedAt)}</span>
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
      </main>
    `;
  }

  function setupHomeInteractions() {
    const searchInput = document.getElementById("homeSearch");
    const sortSelect = document.getElementById("homeSort");
    const grid = document.getElementById("homeLibraryGrid");
    const resultCount = document.getElementById("homeResultCount");
    const allProtocols = [...site.protocols];

    function renderLibrary() {
      const query = searchInput.value.trim().toLowerCase();
      let items = allProtocols.filter((protocol) => {
        if (!query) return true;
        return [
          protocol.title,
          protocol.category,
          protocol.summary,
          protocol.tags.join(" ")
        ].join(" ").toLowerCase().includes(query);
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
      <section class="section-card spaced-top">
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
  } else if (page === "protocol") {
    app.innerHTML = renderProtocolPage(value);
    setupTopbarMenu();
    const protocol = getProtocolBySlug(value);
    if (protocol && protocol.kind === "algorithm") setupAlgorithm(protocol);
  } else {
    app.innerHTML = renderNotFound("No se pudo cargar la vista solicitada.");
    setupTopbarMenu();
  }
})();
