(function () {
  var app = document.getElementById("app");
  if (!app) return;

  var base = document.body.dataset.base || "";
  var page = document.body.dataset.page || "vaccination";
  var value = document.body.dataset.value || "";

  var vaccines = [
    {
      slug: "vph",
      title: "Vacuna contra el virus del papiloma humano",
      short: "VPH",
      tone: "teal",
      protects: "Cáncer cervicouterino, anal, vulvar, vaginal, de pene y orofaríngeo, además de verrugas genitales asociadas a tipos incluidos en la vacuna.",
      use: "Sirve para entrenar al sistema inmune antes del contacto con el virus. No trata infecciones ya presentes, pero reduce el riesgo de nuevas infecciones por los tipos cubiertos.",
      schedule: "Ideal entre 9 y 14 años. Si se inicia antes de los 15 años suelen ser 2 dosis; desde los 15 años o en inmunocompromiso suelen indicarse 3 dosis según valoración clínica.",
      prevalence: "El VPH es una infección muy frecuente; la mayoría de personas sexualmente activas puede exponerse en algún momento de la vida.",
      recurrence: "El virus puede persistir o reaparecer si no se elimina por completo. La vacuna ayuda a prevenir infecciones futuras, no a curar lesiones existentes.",
      adverse: ["Dolor, enrojecimiento o inflamación en el brazo.", "Fiebre baja, cansancio, náusea, dolor de cabeza o mareo transitorio.", "El desmayo puede ocurrir en adolescentes después de cualquier vacuna; conviene sentarse 15 minutos."],
      warning: "Buscar atención si hay dificultad para respirar, ronchas generalizadas, hinchazón de cara o labios, fiebre persistente o malestar intenso.",
      sources: [["CDC: seguridad VPH", "https://www.cdc.gov/vaccine-safety/vaccines/hpv.html"], ["CDC: recomendaciones VPH", "https://www.cdc.gov/hpv/hcp/vaccination-considerations/index.html"], ["CDC: efectos posibles", "https://www.cdc.gov/vaccines/basics/possible-side-effects.html"]]
    },
    {
      slug: "influenza",
      title: "Vacuna contra influenza estacional",
      short: "Influenza",
      tone: "blue",
      protects: "Influenza y sus complicaciones: neumonía, descompensación de enfermedades crónicas, hospitalización y muerte en grupos vulnerables.",
      use: "Reduce la probabilidad de enfermar gravemente. Es especialmente importante en niñas y niños pequeños, personas embarazadas, adultos mayores, personal de salud y pacientes con comorbilidades.",
      schedule: "Aplicación anual antes o durante la temporada de influenza. En menores que la reciben por primera vez pueden requerirse 2 dosis según edad y antecedente.",
      prevalence: "La influenza circula cada año y produce brotes estacionales. Su impacto cambia por temporada y por variantes predominantes.",
      recurrence: "Puede repetirse porque el virus cambia y la protección disminuye con el tiempo; por eso se recomienda vacunación anual.",
      adverse: ["Dolor local, enrojecimiento o sensibilidad.", "Fiebre baja, cansancio y dolor muscular por 1 a 2 días.", "La vacuna inactivada no causa influenza; los síntomas leves son respuesta inmune esperada."],
      warning: "Consultar si aparecen datos de alergia grave, fiebre alta persistente, dificultad respiratoria o síntomas neurológicos inusuales.",
      sources: [["CDC: influenza", "https://www.cdc.gov/flu/vaccines/index.html"], ["CDC: calendario", "https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-age-compliant.html"], ["CDC: efectos posibles", "https://www.cdc.gov/vaccines/basics/possible-side-effects.html"]]
    },
    {
      slug: "hepatitis-b",
      title: "Vacuna contra hepatitis B",
      short: "Hepatitis B",
      tone: "green",
      protects: "Hepatitis B aguda, infección crónica, cirrosis y cáncer hepatocelular relacionados con el virus.",
      use: "Previene una infección que se transmite por sangre, contacto sexual y de madre a hijo. La primera dosis temprana protege al recién nacido en una ventana crítica.",
      schedule: "En esquemas infantiles se aplica desde el nacimiento y se completa en serie. En adolescentes o adultos sin vacuna previa se indica completar esquema según producto y riesgo.",
      prevalence: "Millones de personas viven con hepatitis B crónica en el mundo. Muchas no lo saben hasta que hay daño hepático.",
      recurrence: "La infección crónica puede reactivarse en inmunosupresión. La vacunación previene infección, pero no trata una hepatitis B ya establecida.",
      adverse: ["Dolor o sensibilidad en el sitio de aplicación.", "Fiebre baja o cansancio breve.", "Los eventos graves son raros; la vigilancia se mantiene por seguridad."],
      warning: "Acudir a atención urgente ante reacción alérgica, desmayo prolongado, fiebre persistente o síntomas que preocupen al paciente o familia.",
      sources: [["CDC: hepatitis B", "https://www.cdc.gov/hepatitis-b/vaccination/index.html"], ["CDC: calendario infantil", "https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-age-compliant.html"], ["OMS: hepatitis B", "https://www.who.int/news-room/fact-sheets/detail/hepatitis-b"]]
    },
    {
      slug: "bcg",
      title: "Vacuna BCG contra tuberculosis grave",
      short: "BCG",
      tone: "gold",
      protects: "Formas graves de tuberculosis en la infancia, especialmente meningitis tuberculosa y tuberculosis miliar.",
      use: "Se usa para reducir enfermedad grave temprana en contextos donde la tuberculosis sigue siendo un riesgo de salud pública.",
      schedule: "En México se aplica durante el primer mes de vida, de acuerdo con campañas y lineamientos nacionales vigentes.",
      prevalence: "La tuberculosis continúa presente en todo el mundo; el riesgo aumenta con exposición cercana, pobreza, hacinamiento o inmunosupresión.",
      recurrence: "BCG no evita todos los contagios ni garantiza protección contra tuberculosis pulmonar del adulto. La infección latente puede reactivarse si bajan las defensas.",
      adverse: ["Pequeña lesión, costra o cicatriz local esperada.", "Inflamación leve de ganglios cercanos.", "Complicaciones diseminadas son muy raras y se asocian sobre todo a inmunodeficiencias graves."],
      warning: "Valorar antes de aplicar si hay sospecha de inmunodeficiencia. Consultar si hay úlcera extensa, secreción persistente, fiebre o ganglios grandes.",
      sources: [["Salud México: vacunación 2025", "https://www.gob.mx/salud/articulos/protege-a-tus-hijas-e-hijos-menores-de-5-anos"], ["OMS: tuberculosis", "https://www.who.int/health-topics/tuberculosis"], ["CDC: BCG", "https://www.cdc.gov/tb/hcp/vaccines/index.html"]]
    },
    {
      slug: "srp",
      title: "Vacuna triple viral SRP",
      short: "SRP",
      tone: "red",
      protects: "Sarampión, rubéola y parotiditis, tres enfermedades capaces de causar brotes y complicaciones importantes.",
      use: "Es una vacuna clave de inmunidad comunitaria: protege a quien se vacuna y ayuda a cortar cadenas de transmisión.",
      schedule: "En la infancia se indican 2 dosis. Los calendarios pueden ajustar edades exactas por país, brotes o campañas de recuperación.",
      prevalence: "El sarampión es altamente contagioso y puede regresar cuando bajan las coberturas de vacunación.",
      recurrence: "Con esquema completo la protección suele ser duradera. Los brotes se relacionan más con falta de vacunación o esquemas incompletos.",
      adverse: ["Dolor local, fiebre o exantema leve días después.", "Inflamación leve de glándulas salivales o dolor articular transitorio.", "Eventos graves son raros; no se aplica en embarazo ni inmunosupresión grave sin valoración."],
      warning: "Consultar si hay fiebre alta persistente, convulsión, reacción alérgica o síntomas intensos. Evitar embarazo por el periodo indicado por el personal de salud.",
      sources: [["CDC: MMR", "https://www.cdc.gov/vaccines/vpd/mmr/public/index.html"], ["CDC: calendario", "https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-age-compliant.html"], ["OMS: sarampión", "https://www.who.int/news-room/fact-sheets/detail/measles"]]
    },
    {
      slug: "rotavirus",
      title: "Vacuna oral contra rotavirus",
      short: "Rotavirus",
      tone: "blue",
      protects: "Gastroenteritis grave por rotavirus, deshidratación, urgencias y hospitalización en lactantes.",
      use: "Protege en los primeros meses de vida, cuando la diarrea grave puede deshidratar rápidamente.",
      schedule: "Se administra por vía oral en lactantes, usualmente a los 2 y 4 meses; algunos productos requieren tercera dosis. Debe completarse dentro de límites de edad.",
      prevalence: "Antes de la vacunación, el rotavirus era causa muy común de diarrea grave en menores de 5 años.",
      recurrence: "Puede haber reinfecciones, pero suelen ser más leves después de la vacunación o infección previa.",
      adverse: ["Irritabilidad, diarrea o vómito leve.", "Fiebre baja ocasional.", "Existe un riesgo raro de invaginación intestinal; el beneficio poblacional sigue siendo alto."],
      warning: "Acudir si hay dolor abdominal intenso, vómitos repetidos, sangre en heces, llanto inconsolable o somnolencia marcada después de la vacuna.",
      sources: [["CDC: rotavirus", "https://www.cdc.gov/vaccines/vpd/rotavirus/index.html"], ["Salud México: menores de 5 años", "https://www.gob.mx/salud/articulos/protege-a-tus-hijas-e-hijos-menores-de-5-anos"], ["CDC: efectos posibles", "https://www.cdc.gov/vaccines/basics/possible-side-effects.html"]]
    },
    {
      slug: "neumococo",
      title: "Vacuna conjugada contra neumococo",
      short: "Neumococo",
      tone: "green",
      protects: "Neumonía, meningitis, bacteriemia, otitis media y enfermedad invasiva causada por serotipos de Streptococcus pneumoniae.",
      use: "Disminuye infecciones graves, sobre todo en lactantes, adultos mayores y personas con enfermedades crónicas o inmunocompromiso.",
      schedule: "En la infancia se aplica en serie durante el primer año y refuerzo posterior. En adultos o pacientes de riesgo se elige producto y dosis según edad y antecedente.",
      prevalence: "El neumococo es una causa importante de neumonía y enfermedad invasiva; la carga es mayor en extremos de edad.",
      recurrence: "Existen múltiples serotipos. La vacuna cubre los más relevantes incluidos en el producto, pero no todos los neumococos posibles.",
      adverse: ["Dolor, enrojecimiento o inflamación local.", "Fiebre, somnolencia o irritabilidad breve en niñas y niños.", "Reacciones graves son raras."],
      warning: "Buscar atención si hay reacción alérgica, fiebre alta persistente o deterioro del estado general.",
      sources: [["CDC: neumococo", "https://www.cdc.gov/pneumococcal/vaccines/index.html"], ["CDC: calendario", "https://www.cdc.gov/vaccines/hcp/imz-schedules/child-adolescent-age-compliant.html"], ["Salud México: esquema", "https://www.gob.mx/salud/articulos/protege-a-tus-hijas-e-hijos-menores-de-5-anos"]]
    },
    {
      slug: "td-tdpa",
      title: "Vacunas Td y Tdap",
      short: "Td/Tdap",
      tone: "gold",
      protects: "Tétanos, difteria y tosferina. Tdap añade protección contra tosferina para adolescentes, adultos y embarazo según indicación.",
      use: "Mantiene refuerzos contra toxinas bacterianas y ayuda a proteger a recién nacidos cuando se aplica Tdap durante el embarazo.",
      schedule: "Después de esquema infantil, se recomiendan refuerzos periódicos. Tdap se indica en cada embarazo y en adolescentes/adultos según antecedente.",
      prevalence: "La tosferina puede causar brotes y es más grave en lactantes. El tétanos no se transmite persona a persona, pero puede entrar por heridas.",
      recurrence: "La inmunidad contra tosferina disminuye con el tiempo; por eso existen refuerzos y estrategia en embarazo.",
      adverse: ["Dolor local, enrojecimiento o inflamación.", "Dolor corporal, cansancio, fiebre baja o dolor de cabeza.", "Inflamación extensa del brazo puede ocurrir y suele resolverse."],
      warning: "Consultar si hay reacción alérgica, fiebre alta, debilidad progresiva o antecedente de evento neurológico que deba valorarse antes de otra dosis.",
      sources: [["CDC: Tdap/Td", "https://www.cdc.gov/vaccines/vpd/dtap-tdap-td/index.html"], ["CDC: embarazo y tosferina", "https://www.cdc.gov/pertussis/vaccines/tdap-vaccination-during-pregnancy.html"], ["CDC: efectos posibles", "https://www.cdc.gov/vaccines/basics/possible-side-effects.html"]]
    }
  ];

  function vaccineUrl(slug) { return base + "vacunas/" + slug + ".html"; }
  function homeUrl() { return base + "index.html"; }
  function vaccinationUrl() { return base + "vacunacion.html"; }
  function esc(text) { return String(text || "").replace(/[&<>]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c]; }); }

  function teamNames() {
    var site = window.PROTOCOLOS_SITE;
    var vih = site && site.protocols && site.protocols.find(function (item) { return item.slug === "vih"; });
    if (vih && Array.isArray(vih.team) && vih.team.length) return vih.team;
    return ["Espacio para agregar los nombres del equipo del protocolo de VIH"];
  }

  function topbar(active) {
    return "<header class='vax-topbar'><a class='vax-brand' href='" + homeUrl() + "'><span class='vax-brand-mark'>PC</span><span>Protocolos Clínicos</span></a><nav class='vax-nav' aria-label='Navegación de vacunación'><a href='" + homeUrl() + "'>Inicio</a><a class='" + (active === "vaccination" ? "active" : "") + "' href='" + vaccinationUrl() + "'>Vacunación</a></nav></header>";
  }

  function landingCard(vaccine) {
    return "<a class='vax-card' href='" + vaccineUrl(vaccine.slug) + "'><div><div class='vax-chip-row'><span class='vax-chip " + vaccine.tone + "'>" + esc(vaccine.short) + "</span><span class='vax-chip'>Infografía</span></div><h3>" + esc(vaccine.title) + "</h3><p>" + esc(vaccine.protects) + "</p></div><span class='vax-card-link'>Abrir subpágina</span></a>";
  }

  function credits() {
    return "<section class='vax-credits'><div><h2>Equipo del protocolo de VIH</h2><ol>" + teamNames().map(function (name) { return "<li>" + esc(name) + "</li>"; }).join("") + "</ol></div><div><h2>Revisión académica</h2><p><strong>Revisado por el Dr. Noé Macías Segura</strong></p><p>Departamento de Inmunología, UANL.</p><p>Material educativo: confirmar decisiones clínicas con cartilla nacional, guías vigentes y valoración profesional.</p></div></section>";
  }

  function sources(items) {
    return "<section class='vax-panel'><div class='vax-section-head'><div><span class='vax-eyebrow'>Referencias</span><h2>Fuentes consultadas</h2></div><p>Se priorizan fuentes institucionales para mantener el mensaje claro y responsable.</p></div><div class='vax-sources'>" + items.map(function (source) { return "<a class='vax-source' target='_blank' rel='noopener noreferrer' href='" + source[1] + "'><span>" + esc(source[0]) + "</span>" + esc(source[1].replace(/^https?:\/\//, "")) + "</a>"; }).join("") + "</div></section>";
  }

  function renderLanding() {
    app.innerHTML = topbar("vaccination") + "<main class='vax-shell'><section class='vax-hero'><div><span class='vax-eyebrow'>Centro de infografías clínicas</span><h1>Vacunación explicada con claridad, precisión y confianza</h1><p>Estas subpáginas resumen para qué sirve cada vacuna, qué enfermedad previene, cómo se aplica, qué tan frecuente es el problema, por qué puede repetirse y cuáles efectos adversos pueden aparecer sin generar alarma innecesaria.</p><div class='vax-toolbar'><a class='vax-button primary' href='#vacunas'>Ver vacunas</a><button class='vax-button' type='button' onclick='window.print()'>Imprimir</button></div></div><aside class='vax-hero-aside'><strong>Enfoque de comunicación</strong><ul class='vax-list'><li>Explicar beneficios antes de hablar de riesgos.</li><li>Separar efectos esperados de señales de alarma.</li><li>Usar fuentes oficiales y lenguaje no alarmista.</li></ul></aside></section><div class='vax-section-head' id='vacunas'><div><span class='vax-eyebrow'>Subpáginas</span><h2>Vacunas incluidas</h2></div><p>Selecciona una vacuna para abrir su infografía completa.</p></div><section class='vax-grid'>" + vaccines.map(landingCard).join("") + "</section>" + credits() + "</main>";
  }

  function tile(kind, title, body) {
    return "<article class='vax-tile " + kind + "'><strong>" + esc(title) + "</strong><p>" + esc(body) + "</p></article>";
  }

  function renderDetail(vaccine) {
    var adverseList = vaccine.adverse.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("");
    app.innerHTML = topbar("vaccination") + "<main class='vax-shell'><a class='vax-back' href='" + vaccinationUrl() + "'>Volver a vacunación</a><section class='vax-detail-hero'><div><span class='vax-eyebrow'>Infografía clínica</span><h1>" + esc(vaccine.title) + "</h1><p>" + esc(vaccine.protects) + "</p><div class='vax-chip-row'><span class='vax-chip " + vaccine.tone + "'>" + esc(vaccine.short) + "</span><span class='vax-chip'>Prevención</span><span class='vax-chip'>Efectos adversos en botón aparte</span></div></div><aside class='vax-detail-aside'><strong>Mensaje central</strong><p>Las vacunas preparan defensas antes de la exposición. La mayoría de molestias posteriores son leves y breves; las señales de alarma son poco frecuentes y se explican por separado.</p></aside></section><section class='vax-panel'><div class='vax-section-head'><div><span class='vax-eyebrow'>Resumen visual</span><h2>Qué debe saber el paciente</h2></div><p>Información diseñada para una infografía completa y fácil de leer.</p></div><div class='vax-infographic'>" + tile("primary", "Para qué sirve", vaccine.use) + tile("blue", "Esquema general", vaccine.schedule) + tile("green", "Prevalencia", vaccine.prevalence) + tile("gold", "Recurrencia", vaccine.recurrence) + tile("red", "Qué previene", vaccine.protects) + tile("primary", "Cómo explicarlo", "La vacunación no busca asustar: busca reducir complicaciones reales con una intervención preventiva estudiada y vigilada.") + "</div><div class='vax-toolbar'><button class='vax-button primary' type='button' data-adverse>Ver efectos adversos</button><button class='vax-button' type='button' onclick='window.print()'>Imprimir</button></div><section class='vax-panel vax-adverse' id='adversePanel' hidden><span class='vax-eyebrow'>Seguridad</span><h2>Efectos adversos explicados sin alarmar</h2><p>La mayoría son señales de que el sistema inmune está respondiendo y desaparecen solos. No significan que la vacuna haya causado la enfermedad.</p><ul>" + adverseList + "</ul><div class='vax-note'><strong>Cuándo sí consultar:</strong> " + esc(vaccine.warning) + "</div></section></section>" + sources(vaccine.sources) + credits() + "</main>";
    var button = document.querySelector("[data-adverse]");
    var panel = document.getElementById("adversePanel");
    if (button && panel) {
      button.addEventListener("click", function () {
        var open = panel.hidden;
        panel.hidden = !open;
        button.textContent = open ? "Ocultar efectos adversos" : "Ver efectos adversos";
        if (open) panel.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  if (page === "vaccine") {
    var vaccine = vaccines.find(function (item) { return item.slug === value; });
    if (vaccine) renderDetail(vaccine);
    else renderLanding();
  } else {
    renderLanding();
  }
})();
