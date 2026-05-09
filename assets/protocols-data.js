window.PROTOCOLOS_SITE = {
  categories: [
    {
      id: "ITS",
      slug: "its",
      short: "ITS",
      title: "Infecciones de transmisión sexual",
      description: "Protocolos clínicos para sospecha, tamizaje, confirmación y seguimiento de enfermedades transmitidas por contacto sexual.",
      helper: "Actualmente incluye el protocolo de VIH.",
      accent: "red"
    },
    {
      id: "Respiratorias",
      slug: "respiratorias",
      short: "RS",
      title: "Enfermedades respiratorias",
      description: "Protocolos clínicos para cuadros respiratorios agudos y crónicos frecuentes en primer contacto y urgencias.",
      helper: "Categoría disponible para integrar protocolos basados en artículos.",
      accent: "blue"
    },
    {
      id: "Gastrointestinales",
      slug: "gastrointestinales",
      short: "GI",
      title: "Enfermedades gastrointestinales",
      description: "Protocolos clínicos para síntomas digestivos, hidratación, signos de alarma y conducta inicial.",
      helper: "Categoría disponible para integrar protocolos basados en artículos.",
      accent: "green"
    },
    {
      id: "Neurológicas",
      slug: "neurologicas",
      short: "NE",
      title: "Enfermedades neurológicas",
      description: "Protocolos clínicos orientados a identificación de datos de alarma y decisiones de referencia.",
      helper: "Categoría disponible para integrar protocolos basados en artículos.",
      accent: "purple"
    },
    {
      id: "Metabólicas",
      slug: "metabolicas",
      short: "MB",
      title: "Enfermedades metabólicas",
      description: "Protocolos para urgencias metabólicas y descompensaciones que requieren reconocimiento temprano.",
      helper: "Categoría disponible para integrar protocolos basados en artículos.",
      accent: "gold"
    },
    {
      id: "Inmunodeficiencias",
      slug: "inmunodeficiencias",
      short: "IN",
      title: "Inmunodeficiencias",
      description: "Protocolos clínicos para sospecha, clasificación inicial, referencia y seguimiento de inmunodeficiencias.",
      helper: "Inicialmente orientada a inmunodeficiencias primarias; lista para integrar secundarias después.",
      accent: "teal"
    }
  ],
  medications: [],
  protocols: [
    {
      id: "vih",
      slug: "vih",
      kind: "algorithm",
      title: "Detección temprana de VIH",
      category: "ITS",
      categorySlug: "its",
      status: "Disponible",
      updatedAt: "2026-04-25",
      summary: "Algoritmo clínico para exposición reciente, pruebas discordantes, tamizaje y confirmación diagnóstica en VIH.",
      subtitle: "Protocolo clínico dentro de ITS, con enfoque en sospecha de infección aguda y toma de decisiones diagnósticas.",
      tags: ["VIH", "ITS", "infección aguda", "tamizaje", "consejería"],
      facts: [
        { label: "Categoría", value: "ITS" },
        { label: "Enfoque", value: "Clínico-diagnóstico" },
        { label: "Prueba clave", value: "Cuarta generación" },
        { label: "Escalamiento", value: "NAT, PCR o carga viral" }
      ],
      quickSummary: [
        "Ubicado en la categoría de infecciones de transmisión sexual.",
        "Diseñado para primer contacto y orientación diagnóstica.",
        "El mensaje principal es que un negativo aislado no basta si la sospecha clínica sigue alta."
      ],
      routeMessages: {
        all: {
          title: "Vista general activa",
          text: "Estás viendo el protocolo completo. Puedes abrir una ruta específica o recorrerlo paso a paso."
        },
        acute: {
          title: "Ruta de sospecha aguda",
          text: "Aquí la clínica pesa mucho. Una prueba rápida o un Western blot negativos no descartan infección aguda si hubo exposición reciente."
        },
        screening: {
          title: "Ruta de tamizaje habitual",
          text: "Esta ruta sirve para cribado inicial. Los resultados reactivos requieren confirmación y los no reactivos deben interpretarse con el período de ventana."
        }
      },
      commonNodes: [
        {
          id: "1",
          group: "common",
          tone: "blue",
          badge: "Inicio",
          title: "1. Entrada al algoritmo",
          text: "Persona con exposición de riesgo, síntomas compatibles, embarazo, infecciones de transmisión sexual, control preventivo o solicitud voluntaria de la prueba.",
          details: [
            "Puede iniciar por sospecha clínica o por tamizaje preventivo.",
            "Incluye personas sintomáticas y asintomáticas."
          ]
        },
        {
          id: "2",
          group: "common",
          tone: "blue",
          badge: "Solicitud",
          title: "2. Quién solicita la prueba",
          text: "La prueba puede solicitarla la persona usuaria o indicarla personal médico, salud pública, banco de sangre, control prenatal o programas de VIH e ITS.",
          details: [
            "El acceso puede ser por decisión personal o por indicación clínica.",
            "La solicitud no sustituye el consentimiento informado."
          ]
        },
        {
          id: "3",
          group: "common",
          tone: "teal",
          badge: "Consejería",
          title: "3. Consentimiento informado y consejería antes de la prueba",
          text: "Antes de tomar la muestra, explicar el objetivo de la prueba, la confidencialidad, la voluntariedad, el período de ventana y el significado probable de cada resultado.",
          details: [
            "Explicar qué significa un resultado reactivo y uno no reactivo.",
            "Aclarar que una prueba negativa temprana puede no descartar infección reciente."
          ]
        },
        {
          id: "4",
          group: "common",
          tone: "yellow",
          badge: "Decisión",
          title: "4. Decisión clínica inicial",
          text: "Valorar si hubo exposición reciente o síntomas compatibles con infección aguda por VIH. Si no los hay, seguir la ruta de tamizaje habitual.",
          details: [
            "La sospecha aguda prioriza pruebas útiles para detectar infección reciente.",
            "Si no hay sospecha aguda, seguir la ruta habitual."
          ]
        }
      ],
      branches: {
        acute: {
          label: "Si hay sospecha de VIH agudo",
          nodes: [
            {
              id: "5A",
              group: "acute",
              tone: "red",
              badge: "Ruta aguda",
              title: "5A. Sospecha de infección aguda",
              text: "No descartar VIH con una sola prueba rápida negativa. En los primeros días o semanas puede no haber anticuerpos detectables.",
              details: [
                "Una prueba rápida de anticuerpos o un Western blot negativos no excluyen infección aguda si la exposición fue reciente.",
                "Si la sospecha clínica sigue alta, se debe continuar con pruebas más sensibles."
              ]
            },
            {
              id: "6A",
              group: "acute",
              tone: "red",
              badge: "Prueba clave",
              title: "6A. Prueba de cuarta generación",
              text: "Solicitar una prueba de cuarta generación. Detecta el antígeno p24 y anticuerpos contra VIH-1 y VIH-2, por lo que acorta el período de ventana.",
              details: [
                "Es más útil que una prueba rápida simple en infección muy temprana.",
                "El antígeno p24 puede aparecer antes de que los anticuerpos sean detectables."
              ]
            },
            {
              id: "7A",
              group: "acute",
              tone: "yellow",
              badge: "Escalamiento",
              title: "7A. Si hay resultados discordantes o la sospecha sigue alta",
              text: "Solicitar una prueba molecular, como NAT, PCR o carga viral. Estas pruebas buscan el ARN del VIH y ayudan a confirmar infección aguda.",
              details: [
                "Escalar si una prueba de cuarta generación sale reactiva, pero otras pruebas son negativas.",
                "Escalar si hay síntomas compatibles con seroconversión o exposición reciente con alta probabilidad clínica."
              ]
            }
          ]
        },
        screening: {
          label: "Si no hay sospecha aguda: tamizaje habitual",
          nodes: [
            {
              id: "5B",
              group: "screening",
              tone: "green",
              badge: "Ruta habitual",
              title: "5B. Tamizaje inicial",
              text: "Realizar una prueba rápida de VIH o una prueba de cuarta generación, según disponibilidad y el algoritmo nacional.",
              details: [
                "Sirve para tamizaje preventivo o población general.",
                "La elección depende de la norma local y del acceso del servicio."
              ]
            },
            {
              id: "6B",
              group: "screening",
              tone: "green",
              badge: "No reactivo",
              title: "6B. Resultado no reactivo",
              text: "Si el resultado es no reactivo, informarlo con claridad. Si la exposición fue reciente, repetir la prueba después del período de ventana y reforzar prevención.",
              details: [
                "No siempre cierra el caso si hubo riesgo reciente.",
                "Aprovechar para reforzar reducción de riesgo y seguimiento."
              ]
            },
            {
              id: "7B",
              group: "screening",
              tone: "yellow",
              badge: "Reactivo",
              title: "7B. Resultado reactivo",
              text: "Confirmar con una segunda prueba diferente o con el esquema indicado por el país. Entregar el resultado con consejería.",
              details: [
                "Un tamizaje reactivo no es el cierre definitivo sin confirmación.",
                "La consejería reduce ansiedad y aclara los siguientes pasos."
              ]
            }
          ]
        }
      },
      finalNodes: [
        {
          id: "8",
          group: "common",
          tone: "purple",
          badge: "Confirmación",
          title: "8. Confirmación diagnóstica y consejería después de la prueba",
          text: "Registrar el resultado y explicarlo con lenguaje claro. Aclarar confidencialidad, pasos siguientes y qué hacer si las pruebas no coinciden entre sí.",
          details: [
            "Interpretar el resultado con lenguaje claro.",
            "Orientar sobre continuidad de atención y apoyo."
          ]
        },
        {
          id: "9",
          group: "common",
          tone: "orange",
          badge: "Seguimiento",
          title: "9. Seguimiento y vinculación",
          text: "Si el diagnóstico se confirma, vincular de inmediato a atención, valorar tratamiento antirretroviral, solicitar carga viral y conteo basal de CD4, tamizar otras ITS y ofrecer apoyo psicosocial.",
          details: [
            "El conteo de CD4 ayuda a valorar el estado inmunológico inicial.",
            "Si el resultado es negativo pero hubo riesgo reciente, repetir la prueba según el período de ventana."
          ]
        }
      ],
      alert: "Una prueba rápida de anticuerpos o un Western blot negativos no descartan infección aguda si hubo exposición reciente o síntomas compatibles. Si la sospecha clínica es alta, se debe pedir una prueba de cuarta generación y, si hace falta, una prueba molecular.",
      tests: [
        {
          tone: "blue",
          title: "Prueba rápida de anticuerpos",
          text: "Detecta defensas contra el VIH. Es útil para tamizaje, pero puede salir negativa al inicio de la infección."
        },
        {
          tone: "green",
          title: "Prueba de cuarta generación",
          text: "Detecta el antígeno p24 y anticuerpos. Reduce el período de ventana y ayuda más en infección reciente."
        },
        {
          tone: "purple",
          title: "Prueba molecular: NAT, PCR o carga viral",
          text: "NAT y PCR son pruebas moleculares que detectan el ARN del VIH. Son claves cuando hay sospecha aguda o resultados discordantes."
        },
        {
          tone: "red",
          title: "Western blot",
          text: "Técnica confirmatoria antigua. No debe usarse sola para descartar infección aguda por el riesgo de falsos negativos tempranos."
        }
      ],
      team: [
        "Jorge Antonio Gutiérrez Martínez",
        "Jonathan Eliud Lizcano Jinez",
        "Jesús Gael García Guadarrama",
        "Stephany Monserrat Fuantos Pena"
      ],
      citation: "Medina-De la Garza CE, Castro-Corona MA, Salinas-Carmona MC. Near misdiagnosis of acute HIV-infection with ELISA-Western Blot scheme: Time for mindset change. IDCases. 2021;25:e01168. doi:10.1016/j.idcr.2021.e01168.",
      insight: "El punto central de este protocolo es que un resultado negativo aislado no basta para descartar infección aguda si la exposición reciente y la sospecha clínica siguen altas."
    }
  ]
};

(function () {
  const references = {
    jmf: {
      label: "NORD: Jeffrey Modell Foundation, enfermedades relacionadas",
      url: "https://rarediseases.org/organizations/jeffrey-modell-foundation/"
    },
    merckApproach: {
      label: "Merck Manual Professional: abordaje del paciente con sospecha de inmunodeficiencia",
      url: "https://www.merckmanuals.com/professional/immunology-allergic-disorders/immunodeficiency-disorders/approach-to-the-patient-with-suspected-immunodeficiency"
    },
    aaaaiPrimary: {
      label: "AAAAI: enfermedad por inmunodeficiencia primaria",
      url: "https://www.aaaai.org/conditions-treatments/primary-immunodeficiency-disease"
    }
  };

  function immunoProtocol(data) {
    return {
      kind: "clinical",
      category: "Inmunodeficiencias",
      categorySlug: "inmunodeficiencias",
      status: "Disponible",
      updatedAt: "2026-05-08",
      ...data
    };
  }

  window.PROTOCOLOS_SITE.protocols.push(
    immunoProtocol({
      id: "digeorge-completo",
      slug: "digeorge-completo",
      title: "Síndrome de DiGeorge completo",
      summary: "Orientación para sospechar inmunodeficiencia grave por ausencia o función mínima del timo.",
      subtitle: "Protocolo de sospecha y referencia para pacientes con datos compatibles con síndrome de DiGeorge completo o atimia funcional.",
      tags: ["DiGeorge", "atimia", "linfopenia T", "hipocalcemia", "cardiopatía"],
      facts: [
        { label: "Patrón clave", value: "Déficit severo de linfocitos T" },
        { label: "Pistas clínicas", value: "Cardiopatía, hipocalcemia, infecciones graves" },
        { label: "Estudio inicial", value: "BH, calcio, subpoblaciones linfocitarias" },
        { label: "Prioridad", value: "Referencia urgente a inmunología" }
      ],
      quickSummary: [
        "Sospecharlo en recién nacidos o lactantes con infecciones graves, cardiopatía congénita, hipocalcemia o rasgos sindrómicos.",
        "El punto crítico es documentar linfopenia T profunda o ausencia de linfocitos T vírgenes.",
        "Evitar vacunas vivas hasta conocer el estado inmunológico y coordinar manejo con inmunología pediátrica."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Cuándo pensarlo",
          text: "Infecciones virales, fúngicas u oportunistas tempranas, hipocalcemia neonatal, cardiopatía conotruncal, paladar anormal o antecedente de 22q11.2 con T bajos."
        },
        {
          label: "Primer estudio",
          title: "Qué pedir al inicio",
          text: "Biometría hemática con diferencial, calcio sérico, inmunoglobulinas, subpoblaciones linfocitarias y valoración de linfocitos T vírgenes si está disponible."
        },
        {
          label: "Confirmación",
          title: "Cómo cerrar la ruta",
          text: "Confirmar con inmunofenotipo, evaluación genética y estudio del timo. Si hay sospecha fuerte, derivar antes de esperar todos los resultados."
        },
        {
          label: "Seguridad",
          title: "Qué no retrasar",
          text: "Aislamiento protector según gravedad, prevención de infecciones y manejo especializado. Las opciones definitivas pueden incluir implantación de tejido tímico en centros expertos."
        }
      ],
      checklist: [
        "Preguntar por cardiopatía, hipocalcemia y paladar hendido.",
        "Revisar linfocitos absolutos y subpoblaciones T.",
        "Evitar vacunas vivas si hay inmunodeficiencia celular significativa.",
        "Referir de forma urgente si hay infección grave o linfopenia T profunda."
      ],
      alert: "Un lactante con T muy bajos e infecciones graves debe manejarse como inmunodeficiencia celular severa hasta demostrar lo contrario.",
      sources: [
        references.jmf,
        {
          label: "NORD: Complete DiGeorge Syndrome",
          url: "https://rarediseases.org/rare-diseases/complete-digeorge-syndrome/"
        },
        {
          label: "NORD: Congenital Athymia",
          url: "https://rarediseases.org/rare-diseases/congenital-athymia/"
        },
        references.merckApproach
      ]
    }),
    immunoProtocol({
      id: "deficiencia-card9",
      slug: "deficiencia-card9",
      title: "Deficiencia de CARD9",
      summary: "Ruta de sospecha para predisposición genética a infecciones fúngicas invasivas o profundas.",
      subtitle: "Protocolo orientado a reconocer candidiasis invasiva, dermatofitosis profunda y otras micosis inusuales asociadas a CARD9.",
      tags: ["CARD9", "hongos", "Candida", "micosis invasiva", "inmunidad innata"],
      facts: [
        { label: "Patrón clave", value: "Infecciones fúngicas profundas" },
        { label: "Gérmenes guía", value: "Candida, dermatofitos, mohos dematiáceos" },
        { label: "Estudio inicial", value: "Cultivo, imagen, BH, inmunoglobulinas" },
        { label: "Confirmación", value: "Prueba genética dirigida o panel" }
      ],
      quickSummary: [
        "Pensar en CARD9 cuando hay infección fúngica profunda, recurrente o fuera de lo esperado.",
        "La candidiasis del sistema nervioso central o la dermatofitosis profunda son datos de alto valor clínico.",
        "El manejo requiere infectología e inmunología; el tratamiento antifúngico no debe retrasarse si hay enfermedad invasiva."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Cuándo pensarlo",
          text: "Candidiasis invasiva, meningoencefalitis por Candida, osteomielitis fúngica, endoftalmitis, dermatofitosis profunda o micosis por hongos negros sin otra causa clara."
        },
        {
          label: "Primer estudio",
          title: "Documentar el hongo",
          text: "Tomar cultivos, biopsia si aplica, imagen del sitio afectado y estudios básicos de inmunidad. Registrar tratamientos previos y recurrencias."
        },
        {
          label: "Confirmación",
          title: "Buscar causa genética",
          text: "Solicitar panel de inmunodeficiencias o secuenciación dirigida a CARD9 cuando el patrón clínico sea compatible."
        },
        {
          label: "Manejo",
          title: "Coordinar tratamiento",
          text: "Iniciar o ajustar antifúngicos según especie y sitio. Valorar profilaxis secundaria si hay recurrencia o enfermedad invasiva."
        }
      ],
      checklist: [
        "Confirmar especie fúngica siempre que sea posible.",
        "Buscar compromiso cerebral, ocular, óseo o profundo.",
        "Descartar causas secundarias de inmunosupresión.",
        "Referir a infectología e inmunología clínica."
      ],
      alert: "La infección fúngica invasiva requiere manejo urgente; la sospecha genética no debe retrasar antifúngicos ni control del foco.",
      sources: [
        references.jmf,
        {
          label: "NORD: CARD9 Deficiency",
          url: "https://rarediseases.org/rare-diseases/card9-deficiency/"
        },
        {
          label: "NIAID: CARD9 Deficiency and susceptibility to candidiasis",
          url: "https://www.niaid.nih.gov/diseases-conditions/card9-deficiency"
        },
        references.merckApproach
      ]
    }),
    immunoProtocol({
      id: "sindrome-whim",
      slug: "sindrome-whim",
      title: "Síndrome WHIM",
      summary: "Protocolo para warts, hipogammaglobulinemia, infecciones y neutropenia por mielocatexis.",
      subtitle: "Guía de sospecha y confirmación de síndrome WHIM, una inmunodeficiencia asociada con variantes de CXCR4.",
      tags: ["WHIM", "CXCR4", "verrugas", "neutropenia", "hipogammaglobulinemia"],
      facts: [
        { label: "Acrónimo", value: "Warts, Hypogammaglobulinemia, Infections, Myelokathexis" },
        { label: "Dato común", value: "Neutropenia persistente o intermitente" },
        { label: "Riesgo", value: "Infecciones bacterianas y VPH persistente" },
        { label: "Confirmación", value: "Genética de CXCR4" }
      ],
      quickSummary: [
        "Sospecharlo en infecciones bacterianas recurrentes con verrugas extensas o persistentes.",
        "La biometría puede mostrar neutropenia; las inmunoglobulinas pueden estar bajas.",
        "La confirmación se apoya en pruebas genéticas y valoración por inmunología."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Pistas clínicas",
          text: "Verrugas extensas o recalcitrantes, infecciones respiratorias, celulitis, sinusitis, otitis, neumonía, periodontitis o antecedentes de neutropenia."
        },
        {
          label: "Primer estudio",
          title: "Laboratorio inicial",
          text: "Biometría hemática seriada, inmunoglobulinas cuantitativas, subpoblaciones linfocitarias y revisión de infecciones por VPH."
        },
        {
          label: "Confirmación",
          title: "Mielocatexis y CXCR4",
          text: "El diagnóstico se fortalece con hallazgos de mielocatexis en médula ósea y se confirma con variantes patogénicas en CXCR4."
        },
        {
          label: "Seguimiento",
          title: "Prevención de complicaciones",
          text: "Vigilar infecciones respiratorias, salud dental, carga de VPH y lesiones con potencial premaligno o maligno."
        }
      ],
      checklist: [
        "Pedir BH con diferencial más de una vez.",
        "Explorar piel, mucosas y genitales por verrugas.",
        "Medir inmunoglobulinas y valorar respuesta a vacunas.",
        "Referir para confirmación genética y plan preventivo."
      ],
      alert: "Las verrugas persistentes con neutropenia e infecciones recurrentes no deben manejarse solo como problema dermatológico.",
      sources: [
        references.jmf,
        {
          label: "NORD: WHIM Syndrome",
          url: "https://rarediseases.org/rare-diseases/whim-syndrome/"
        },
        references.aaaaiPrimary,
        references.merckApproach
      ]
    }),
    immunoProtocol({
      id: "deficiencia-adhesion-leucocitaria",
      slug: "deficiencia-adhesion-leucocitaria",
      title: "Deficiencia de adhesión leucocitaria",
      summary: "Ruta para sospechar defectos de migración de neutrófilos con infecciones bacterianas graves y poca formación de pus.",
      subtitle: "Protocolo de reconocimiento temprano de síndromes de deficiencia de adhesión leucocitaria.",
      tags: ["LAD", "CD18", "neutrofilia", "omfalitis", "cicatrización"],
      facts: [
        { label: "Patrón clave", value: "Infección bacteriana sin pus esperado" },
        { label: "Dato neonatal", value: "Retraso en caída del cordón u omfalitis" },
        { label: "Laboratorio", value: "Neutrofilia marcada" },
        { label: "Confirmación", value: "Citometría CD18/CD11 y genética" }
      ],
      quickSummary: [
        "Sospechar LAD en lactantes con infecciones bacterianas graves, mala cicatrización y poco pus.",
        "La neutrofilia persistente orienta porque los leucocitos no migran bien al tejido.",
        "La forma grave requiere referencia urgente por riesgo de infecciones potencialmente mortales."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Datos de alto valor",
          text: "Retraso en separación del cordón, omfalitis, periodontitis temprana, heridas con mala cicatrización e infecciones cutáneas o profundas con poca supuración."
        },
        {
          label: "Primer estudio",
          title: "Qué buscar",
          text: "Biometría hemática con diferencial, cultivos del foco, marcadores de inflamación y revisión de historial de cicatrización."
        },
        {
          label: "Confirmación",
          title: "Estudio especializado",
          text: "Solicitar citometría para moléculas de adhesión como CD18/CD11 y panel genético según el tipo sospechado."
        },
        {
          label: "Manejo",
          title: "Evitar retrasos",
          text: "Tratar infecciones de forma agresiva, controlar focos y referir a inmunología/hematología para valorar terapia definitiva."
        }
      ],
      checklist: [
        "Preguntar edad de caída del cordón umbilical.",
        "Comparar gravedad clínica con presencia o ausencia de pus.",
        "Revisar neutrófilos absolutos en varios hemogramas.",
        "Derivar si hay infecciones profundas o neutrofilia marcada persistente."
      ],
      alert: "Omfalitis neonatal, retraso de caída del cordón y neutrofilia importante son combinación de alarma.",
      sources: [
        references.jmf,
        {
          label: "NORD: Leukocyte Adhesion Deficiency Syndromes",
          url: "https://rarediseases.org/rare-diseases/leukocyte-adhesion-deficiency-syndromes/"
        },
        {
          label: "NCBI Bookshelf: Leukocyte Adhesion Deficiency",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK539770/"
        },
        references.merckApproach
      ]
    }),
    immunoProtocol({
      id: "hiper-ige-autosomico-dominante",
      slug: "hiper-ige-autosomico-dominante",
      title: "Síndrome hiper-IgE autosómico dominante",
      summary: "Orientación para sospecha de hiper-IgE asociado a STAT3 con eczema, abscesos, neumonías y rasgos no inmunológicos.",
      subtitle: "Protocolo para reconocer el fenotipo clásico de hiper-IgE autosómico dominante y diferenciarlo de alergia común.",
      tags: ["hiper IgE", "STAT3", "Job", "eczema", "neumonía"],
      facts: [
        { label: "Gen frecuente", value: "STAT3" },
        { label: "Dato guía", value: "IgE elevada con infecciones recurrentes" },
        { label: "Clínica", value: "Eczema, abscesos, neumonías" },
        { label: "Extra", value: "Dientes retenidos, fracturas o neumoceles" }
      ],
      quickSummary: [
        "No todo IgE alto es inmunodeficiencia; importa el patrón de infecciones y complicaciones.",
        "Abscesos cutáneos, neumonías recurrentes y neumoceles orientan a hiper-IgE autosómico dominante.",
        "La evaluación debe incluir eosinófilos, IgE, cultivos e inmunología genética."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Diferenciar de atopia común",
          text: "Eczema temprano con abscesos por Staphylococcus, neumonías repetidas, candidiasis, neumoceles, dientes primarios retenidos, fracturas o facies característica."
        },
        {
          label: "Primer estudio",
          title: "Laboratorio útil",
          text: "Biometría con eosinófilos, IgE total, inmunoglobulinas, cultivos de infecciones activas e imagen si hubo neumonía complicada."
        },
        {
          label: "Confirmación",
          title: "Genética y fenotipo",
          text: "Confirmar con panel genético que incluya STAT3 y correlacionar con rasgos esqueléticos, dentales y pulmonares."
        },
        {
          label: "Seguimiento",
          title: "Prevenir daño pulmonar",
          text: "Vigilar bronquiectasias, neumoceles, infecciones cutáneas recurrentes y necesidad de profilaxis indicada por especialista."
        }
      ],
      checklist: [
        "No interpretar IgE elevada de forma aislada.",
        "Preguntar por abscesos, neumonías y candidiasis.",
        "Buscar datos dentales, óseos y pulmonares.",
        "Referir a inmunología si hay infecciones recurrentes más IgE/eosinofilia."
      ],
      alert: "El riesgo principal es confundirlo con dermatitis atópica aislada y retrasar el estudio de infecciones profundas o daño pulmonar.",
      sources: [
        references.jmf,
        {
          label: "NORD: Autosomal Dominant Hyper IgE Syndrome",
          url: "https://rarediseases.org/rare-diseases/autosomal-dominant-hyper-ige-syndrome/"
        },
        {
          label: "Immune Deficiency Foundation: Hyper IgE syndrome",
          url: "https://primaryimmune.org/understanding-primary-immunodeficiency/types-of-pi/hyper-ige-syndrome"
        },
        {
          label: "NIAID: Hyper-Immunoglobulin E Syndromes",
          url: "https://www.niaid.nih.gov/diseases-conditions/hyper-immunoglobulin-e-syndromes-hies"
        }
      ]
    }),
    immunoProtocol({
      id: "sindrome-hiper-igm",
      slug: "sindrome-hiper-igm",
      title: "Síndromes hiper-IgM",
      summary: "Protocolo para sospechar defectos de cambio de clase con IgG/IgA bajas e IgM normal o elevada.",
      subtitle: "Guía de primer contacto para reconocer hiper-IgM, infecciones oportunistas y necesidad de referencia especializada.",
      tags: ["hiper IgM", "CD40L", "cambio de clase", "IgG baja", "infecciones oportunistas"],
      facts: [
        { label: "Patrón clave", value: "IgG e IgA bajas con IgM normal/alta" },
        { label: "Riesgo", value: "Infecciones respiratorias y oportunistas" },
        { label: "Herencia", value: "Frecuente ligado al X, también AR" },
        { label: "Confirmación", value: "CD40L/CD40 u otros genes" }
      ],
      quickSummary: [
        "Sospecharlo si hay infecciones recurrentes con inmunoglobulinas bajas excepto IgM.",
        "Algunas formas tienen riesgo de infecciones oportunistas, por lo que no es solo un defecto de anticuerpos.",
        "La confirmación genética orienta pronóstico, profilaxis y posibilidad de trasplante en casos seleccionados."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Patrón clínico",
          text: "Otitis, sinusitis, neumonías, diarrea persistente, infecciones oportunistas, neutropenia o antecedentes familiares en varones."
        },
        {
          label: "Primer estudio",
          title: "Perfil humoral",
          text: "Medir IgG, IgA, IgM, IgE, respuesta a vacunas, biometría con diferencial y subpoblaciones linfocitarias."
        },
        {
          label: "Confirmación",
          title: "Defecto de cambio de clase",
          text: "Solicitar expresión de CD40L cuando esté disponible y panel genético que incluya CD40LG, CD40, AICDA, UNG y otros genes relacionados."
        },
        {
          label: "Seguridad",
          title: "Vacunas y profilaxis",
          text: "Evitar vacunas vivas en formas con compromiso celular hasta valoración. Considerar inmunoglobulina, profilaxis y manejo de infecciones con especialista."
        }
      ],
      checklist: [
        "Comparar IgM contra IgG e IgA.",
        "Preguntar por diarrea, neumonías y oportunistas.",
        "Revisar sexo, edad de inicio y antecedentes familiares.",
        "Referir antes de vacunas vivas si hay sospecha importante."
      ],
      alert: "Una IgM normal o alta no excluye inmunodeficiencia si IgG e IgA están bajas y el patrón clínico es compatible.",
      sources: [
        references.jmf,
        {
          label: "NORD: Hyper IgM Syndrome",
          url: "https://rarediseases.org/rare-diseases/hyper-igm-syndrome/"
        },
        {
          label: "Immune Deficiency Foundation: Hyper IgM syndromes",
          url: "https://primaryimmune.org/understanding-primary-immunodeficiency/types-of-pi/hyper-igm-syndromes-higm"
        },
        references.merckApproach
      ]
    }),
    immunoProtocol({
      id: "hiper-ige-autosomico-recesivo",
      slug: "hiper-ige-autosomico-recesivo",
      title: "Síndrome hiper-IgE autosómico recesivo",
      summary: "Ruta para hiper-IgE con infecciones virales cutáneas graves, alergia importante y riesgo de malignidad.",
      subtitle: "Protocolo de sospecha para formas recesivas de hiper-IgE, como deficiencia de DOCK8 y entidades relacionadas.",
      tags: ["DOCK8", "hiper IgE", "viral cutáneo", "alergia", "linfoma"],
      facts: [
        { label: "Fenotipo", value: "Eczema, alergia y virus cutáneos" },
        { label: "Gérmenes guía", value: "Herpes, VPH, molusco, bacterias" },
        { label: "Laboratorio", value: "IgE alta, eosinofilia variable" },
        { label: "Riesgo", value: "Infecciones graves y malignidad" }
      ],
      quickSummary: [
        "Pensar en forma recesiva cuando predominan infecciones virales cutáneas extensas y alergia severa.",
        "A diferencia del STAT3 clásico, puede haber mayor riesgo de infecciones virales persistentes y cáncer.",
        "La confirmación genética es clave porque algunas formas pueden requerir tratamientos definitivos."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Datos distintivos",
          text: "Eczema severo, alergias alimentarias, asma, infecciones por herpes, VPH o molusco extensas, abscesos, neumonías o infecciones recurrentes."
        },
        {
          label: "Primer estudio",
          title: "Evaluación inicial",
          text: "Biometría con eosinófilos, IgE total, inmunoglobulinas, subpoblaciones linfocitarias y documentación de infecciones virales cutáneas."
        },
        {
          label: "Confirmación",
          title: "Panel genético",
          text: "Solicitar panel que incluya DOCK8 y otros genes de hiper-IgE; correlacionar con patrón de infecciones, alergia y linfocitos."
        },
        {
          label: "Seguimiento",
          title: "Vigilancia estrecha",
          text: "Coordinar control de infecciones, piel, alergia, prevención viral y vigilancia de complicaciones malignas según criterio especializado."
        }
      ],
      checklist: [
        "Distinguir alergia común de inmunodeficiencia por gravedad y recurrencia.",
        "Registrar virus cutáneos extensos o persistentes.",
        "Medir linfocitos e inmunoglobulinas además de IgE.",
        "Referir si hay infecciones virales graves o malignidad sospechada."
      ],
      alert: "Las infecciones virales cutáneas extensas con IgE alta son una pista fuerte de inmunodeficiencia combinada, no solo de atopia.",
      sources: [
        references.jmf,
        {
          label: "NORD: Autosomal Recessive Hyper IgE Syndrome",
          url: "https://rarediseases.org/rare-diseases/autosomal-recessive-hyper-ige-syndrome/"
        },
        {
          label: "Immune Deficiency Foundation: Hyper IgE syndrome",
          url: "https://primaryimmune.org/understanding-primary-immunodeficiency/types-of-pi/hyper-ige-syndrome"
        },
        {
          label: "NIAID: Hyper-Immunoglobulin E Syndromes",
          url: "https://www.niaid.nih.gov/diseases-conditions/hyper-immunoglobulin-e-syndromes-hies"
        }
      ]
    }),
    immunoProtocol({
      id: "inmunodeficiencia-comun-variable",
      slug: "inmunodeficiencia-comun-variable",
      title: "Inmunodeficiencia común variable",
      summary: "Protocolo para sospecha de CVID en infecciones respiratorias recurrentes, hipogammaglobulinemia y respuesta pobre a vacunas.",
      subtitle: "Guía para identificar CVID, descartar causas secundarias y orientar referencia para manejo de anticuerpos.",
      tags: ["CVID", "hipogammaglobulinemia", "sinusitis", "neumonía", "vacunas"],
      facts: [
        { label: "Patrón clave", value: "IgG baja con IgA y/o IgM bajas" },
        { label: "Clínica", value: "Sinopulmonares recurrentes" },
        { label: "Confirmación", value: "Respuesta deficiente a vacunas" },
        { label: "Descartar", value: "Causas secundarias de anticuerpos bajos" }
      ],
      quickSummary: [
        "CVID suele presentarse con infecciones respiratorias bacterianas repetidas, pero también puede debutar con autoinmunidad.",
        "La cuantificación de inmunoglobulinas debe repetirse y correlacionarse con respuesta a vacunas.",
        "Antes de etiquetar CVID, descartar pérdidas proteicas, fármacos, VIH y otras causas secundarias."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Cuándo estudiarlo",
          text: "Sinusitis, otitis, bronquitis o neumonías recurrentes, bronquiectasias, diarrea crónica, autoinmunidad, citopenias o linfadenopatía."
        },
        {
          label: "Primer estudio",
          title: "Anticuerpos y vacunas",
          text: "Medir IgG, IgA, IgM, hemograma, subpoblaciones si aplica y anticuerpos contra vacunas previas o respuesta después de vacunación indicada."
        },
        {
          label: "Confirmación",
          title: "Excluir imitadores",
          text: "Buscar causas secundarias como VIH, nefropatía, enteropatía perdedora de proteínas, inmunosupresores o neoplasias hematológicas."
        },
        {
          label: "Seguimiento",
          title: "Prevenir daño acumulado",
          text: "Valorar inmunoglobulina de reemplazo, control de infecciones, función pulmonar, imagen si hay bronquiectasias y vigilancia de autoinmunidad."
        }
      ],
      checklist: [
        "Repetir inmunoglobulinas si el resultado no coincide con la clínica.",
        "Revisar infecciones respiratorias documentadas y antibióticos.",
        "Buscar autoinmunidad, citopenias o granulomas.",
        "Descartar causas secundarias antes de confirmar CVID."
      ],
      alert: "Las infecciones respiratorias repetidas con IgG baja pueden llevar a bronquiectasias si no se identifica y trata el defecto humoral.",
      sources: [
        references.jmf,
        {
          label: "NORD: Common Variable Immune Deficiency",
          url: "https://rarediseases.org/rare-diseases/common-variable-immune-deficiency/"
        },
        {
          label: "Immune Deficiency Foundation: Common variable immune deficiency",
          url: "https://primaryimmune.org/understanding-primary-immunodeficiency/types-of-pi/common-variable-immune-deficiency-cvid"
        },
        references.merckApproach
      ]
    }),
    immunoProtocol({
      id: "sindrome-linfoproliferativo-ligado-x",
      slug: "sindrome-linfoproliferativo-ligado-x",
      title: "Síndrome linfoproliferativo ligado al X",
      summary: "Ruta para varones con respuesta grave a Epstein-Barr, linfohistiocitosis hemofagocítica, linfoma o hipogammaglobulinemia.",
      subtitle: "Protocolo para reconocer XLP y priorizar derivación ante EBV grave o datos de HLH.",
      tags: ["XLP", "EBV", "HLH", "linfoma", "SH2D1A"],
      facts: [
        { label: "Pista central", value: "Respuesta anormal a EBV" },
        { label: "Pacientes", value: "Principalmente varones" },
        { label: "Manifestaciones", value: "HLH, linfoma, hipogammaglobulinemia" },
        { label: "Confirmación", value: "SH2D1A, XIAP u otros genes" }
      ],
      quickSummary: [
        "Sospecharlo en varones con mononucleosis grave, HLH o linfoma relacionado con EBV.",
        "También puede presentarse como hipogammaglobulinemia o infecciones respiratorias recurrentes.",
        "La sospecha de HLH o falla hepática requiere atención urgente y coordinación con hematología/inmunología."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Cuándo encender alarma",
          text: "EBV grave, fiebre persistente, hepatoesplenomegalia, citopenias, hepatitis severa, linfoma, antecedente familiar de varones fallecidos o hipogammaglobulinemia."
        },
        {
          label: "Primer estudio",
          title: "Evaluación inicial",
          text: "BH, ferritina, triglicéridos, fibrinógeno, PFH, carga viral EBV, inmunoglobulinas y valoración de criterios de HLH si la clínica lo sugiere."
        },
        {
          label: "Confirmación",
          title: "Inmunología y genética",
          text: "Solicitar evaluación de SAP/XIAP si está disponible y panel genético. La derivación no debe esperar si el paciente está grave."
        },
        {
          label: "Manejo",
          title: "Escalar rápido",
          text: "Manejar EBV grave, HLH o linfoma en conjunto con hematología, infectología e inmunología; valorar trasplante de células hematopoyéticas según fenotipo."
        }
      ],
      checklist: [
        "Preguntar por EBV grave en paciente o familiares varones.",
        "Buscar criterios de HLH si hay fiebre, citopenias y ferritina alta.",
        "Medir inmunoglobulinas aunque el motivo sea EBV.",
        "Referir urgente si hay falla hepática, HLH o linfoma."
      ],
      alert: "EBV grave con datos de HLH es una urgencia clínica; no esperar genética para iniciar evaluación especializada.",
      sources: [
        references.jmf,
        {
          label: "NORD: X-linked Lymphoproliferative Syndrome",
          url: "https://rarediseases.org/rare-diseases/x-linked-lymphoproliferative-syndrome/"
        },
        {
          label: "NIAID: X-Linked Lymphoproliferative Disease",
          url: "https://www.niaid.nih.gov/diseases-conditions/x-linked-lymphoproliferative"
        },
        {
          label: "GeneReviews: X-Linked Lymphoproliferative Disease",
          url: "https://www.ncbi.nlm.nih.gov/books/NBK1406/"
        }
      ]
    }),
    immunoProtocol({
      id: "enfermedad-granulomatosa-cronica",
      slug: "enfermedad-granulomatosa-cronica",
      title: "Enfermedad granulomatosa crónica",
      summary: "Protocolo para infecciones recurrentes por bacterias y hongos con abscesos, neumonía, linfadenitis o granulomas.",
      subtitle: "Guía de sospecha de CGD y uso de prueba de estallido oxidativo como estudio confirmatorio inicial.",
      tags: ["CGD", "DHR", "NADPH oxidasa", "abscesos", "Aspergillus"],
      facts: [
        { label: "Defecto", value: "Estallido oxidativo fagocitario" },
        { label: "Clínica", value: "Abscesos, neumonía, adenitis, osteomielitis" },
        { label: "Prueba clave", value: "DHR por citometría o NBT" },
        { label: "Gérmenes", value: "Bacterias y hongos catalasa positivos" }
      ],
      quickSummary: [
        "Sospechar CGD en infecciones profundas recurrentes, abscesos hepáticos o neumonía fúngica.",
        "La prueba de DHR evalúa la función oxidativa de neutrófilos y orienta el diagnóstico.",
        "El manejo incluye prevención, tratamiento rápido de infecciones y valoración de trasplante en casos seleccionados."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Patrón de infección",
          text: "Abscesos cutáneos, hepáticos o profundos, linfadenitis, neumonía recurrente, osteomielitis, colitis granulomatosa o Aspergillus."
        },
        {
          label: "Primer estudio",
          title: "Función de neutrófilos",
          text: "Solicitar BH, cultivos, imagen del foco y prueba de dihidrorodamina si está disponible; NBT puede ser alternativa según el centro."
        },
        {
          label: "Confirmación",
          title: "Tipo genético",
          text: "Confirmar con panel genético de NADPH oxidasa para definir herencia, consejo familiar y riesgo."
        },
        {
          label: "Seguimiento",
          title: "Prevención y vigilancia",
          text: "Coordinar profilaxis antibacteriana y antifúngica, educación para consulta temprana y seguimiento pulmonar/gastrointestinal."
        }
      ],
      checklist: [
        "Buscar abscesos profundos y neumonías fúngicas.",
        "Pedir DHR si el patrón clínico es compatible.",
        "Documentar germen y sitio de cada infección.",
        "Referir a inmunología ante resultado anormal o sospecha alta."
      ],
      alert: "Fiebre o síntomas respiratorios en CGD sospechada pueden representar infección fúngica invasiva y requieren valoración rápida.",
      sources: [
        references.jmf,
        {
          label: "NORD: Chronic Granulomatous Disease",
          url: "https://rarediseases.org/rare-diseases/chronic-granulomatous-disease/"
        },
        {
          label: "MedlinePlus Genetics: Chronic granulomatous disease",
          url: "https://medlineplus.gov/genetics/condition/chronic-granulomatous-disease/"
        },
        {
          label: "NIAID: Chronic Granulomatous Disease",
          url: "https://www.niaid.nih.gov/diseases-conditions/chronic-granulomatous-disease-cgd"
        }
      ]
    }),
    immunoProtocol({
      id: "sindrome-chediak-higashi",
      slug: "sindrome-chediak-higashi",
      title: "Síndrome de Chediak-Higashi",
      summary: "Ruta de sospecha para inmunodeficiencia con albinismo parcial, infecciones piógenas y gránulos gigantes en leucocitos.",
      subtitle: "Protocolo para reconocer Chediak-Higashi y derivar ante fase acelerada o datos de HLH.",
      tags: ["Chediak-Higashi", "LYST", "albinismo", "gránulos gigantes", "HLH"],
      facts: [
        { label: "Pista clínica", value: "Albinismo parcial o cabello plateado" },
        { label: "Infecciones", value: "Bacterianas recurrentes" },
        { label: "Hallazgo", value: "Gránulos gigantes en leucocitos" },
        { label: "Riesgo", value: "Fase acelerada tipo HLH" }
      ],
      quickSummary: [
        "Sospecharlo si hay hipopigmentación, infecciones recurrentes y alteraciones neurológicas o hemorrágicas.",
        "El frotis de sangre periférica puede mostrar gránulos gigantes, un dato muy orientador.",
        "La fase acelerada se comporta como una urgencia hematológica/inmunológica."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Datos visibles y sistémicos",
          text: "Piel clara, cabello plateado, fotofobia, nistagmo, infecciones piógenas recurrentes, sangrado fácil, neuropatía o hepatoesplenomegalia."
        },
        {
          label: "Primer estudio",
          title: "Frotis y evaluación",
          text: "Biometría hemática, frotis periférico, cultivos si hay infección, ferritina y estudios de HLH si hay fiebre persistente o citopenias."
        },
        {
          label: "Confirmación",
          title: "Gen LYST",
          text: "Confirmar con estudio genético de LYST y valoración por inmunología/hematología."
        },
        {
          label: "Manejo",
          title: "Reconocer fase acelerada",
          text: "Tratar infecciones de inmediato. Si hay fiebre, citopenias, hepatoesplenomegalia o ferritina alta, escalar por posible HLH."
        }
      ],
      checklist: [
        "Explorar piel, cabello y ojos.",
        "Solicitar frotis periférico si se sospecha.",
        "Buscar datos de sangrado o neurología.",
        "Derivar urgente si hay datos de fase acelerada."
      ],
      alert: "Fiebre persistente, hepatoesplenomegalia y citopenias en este contexto sugieren fase acelerada y requieren atención urgente.",
      sources: [
        references.jmf,
        {
          label: "NORD: Chediak Higashi Syndrome",
          url: "https://rarediseases.org/rare-diseases/chediak-higashi-syndrome/"
        },
        {
          label: "MedlinePlus Genetics: Chediak-Higashi syndrome",
          url: "https://medlineplus.gov/genetics/condition/chediak-higashi-syndrome/"
        },
        {
          label: "Orphanet Journal of Rare Diseases: Chediak-Higashi syndrome review",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7793027/"
        }
      ]
    }),
    immunoProtocol({
      id: "trastornos-relacionados-was",
      slug: "trastornos-relacionados-was",
      title: "Trastornos relacionados con WAS",
      summary: "Protocolo para Wiskott-Aldrich y espectro WAS con trombocitopenia, plaquetas pequeñas, eczema e infecciones.",
      subtitle: "Guía de sospecha para el espectro WAS, incluyendo Wiskott-Aldrich, trombocitopenia ligada al X y neutropenia ligada al X.",
      tags: ["WAS", "Wiskott-Aldrich", "plaquetas pequeñas", "eczema", "trombocitopenia"],
      facts: [
        { label: "Triada clásica", value: "Trombocitopenia, eczema, infecciones" },
        { label: "Dato clave", value: "Plaquetas pequeñas" },
        { label: "Herencia", value: "Ligada al X" },
        { label: "Riesgo", value: "Autoinmunidad y malignidad" }
      ],
      quickSummary: [
        "Pensar en WAS si un varón tiene sangrado por plaquetas bajas, eczema e infecciones recurrentes.",
        "El tamaño plaquetario pequeño ayuda a distinguirlo de otras trombocitopenias.",
        "La gravedad varía; la confirmación genética define riesgo y opciones terapéuticas."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Claves clínicas",
          text: "Petequias, sangrado, diarrea con sangre, eczema, otitis, sinusitis, neumonía, infecciones virales, autoinmunidad o linfoma."
        },
        {
          label: "Primer estudio",
          title: "Hemograma dirigido",
          text: "BH con recuento plaquetario y tamaño plaquetario, inmunoglobulinas, respuesta a vacunas y subpoblaciones linfocitarias según clínica."
        },
        {
          label: "Confirmación",
          title: "Gen WAS",
          text: "Confirmar con estudio del gen WAS y, si está disponible, expresión de WASP."
        },
        {
          label: "Seguridad",
          title: "Evitar daño por sangrado",
          text: "Evitar procedimientos intramusculares innecesarios si hay trombocitopenia severa y coordinar vacunas, profilaxis y tratamiento definitivo con especialistas."
        }
      ],
      checklist: [
        "No pasar por alto plaquetas pequeñas.",
        "Preguntar por sangrado, eczema e infecciones.",
        "Buscar autoinmunidad y crecimiento ganglionar.",
        "Referir a inmunología y hematología si hay sospecha."
      ],
      alert: "Trombocitopenia con plaquetas pequeñas en un varón con eczema o infecciones debe activar estudio de WAS.",
      sources: [
        references.jmf,
        {
          label: "NORD: WAS-Related Disorders",
          url: "https://rarediseases.org/rare-diseases/was-related-disorders/"
        },
        {
          label: "Immune Deficiency Foundation: Wiskott-Aldrich syndrome",
          url: "https://primaryimmune.org/about-primary-immunodeficiencies/specific-disease-types/wiskott-aldrich-syndrome"
        },
        {
          label: "GeneReviews: WAS-Related Disorders",
          url: "https://www.ncbi.nlm.nih.gov/sites/books/NBK1178/"
        }
      ]
    }),
    immunoProtocol({
      id: "agammaglobulinemia",
      slug: "agammaglobulinemia",
      title: "Agammaglobulinemia",
      summary: "Ruta para sospecha de ausencia o disminución marcada de células B con infecciones bacterianas recurrentes.",
      subtitle: "Protocolo para agammaglobulinemia ligada al X y formas autosómicas recesivas con anticuerpos muy bajos.",
      tags: ["agammaglobulinemia", "XLA", "BTK", "células B", "inmunoglobulina"],
      facts: [
        { label: "Patrón clave", value: "Inmunoglobulinas muy bajas" },
        { label: "Dato físico", value: "Amígdalas o ganglios pequeños/ausentes" },
        { label: "Laboratorio", value: "Células B muy bajas o ausentes" },
        { label: "Tratamiento base", value: "Reemplazo de inmunoglobulina" }
      ],
      quickSummary: [
        "Suele hacerse evidente después de que disminuyen anticuerpos maternos, típicamente en lactantes mayores.",
        "Predominan infecciones bacterianas respiratorias, otitis, sinusitis, neumonía y algunas infecciones gastrointestinales.",
        "La ausencia de tejido linfoide visible es una pista útil en exploración."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Cuándo pensarlo",
          text: "Varón con infecciones bacterianas recurrentes desde lactancia, poca respuesta a vacunas, diarrea por Giardia o enterovirus y amígdalas pequeñas o ausentes."
        },
        {
          label: "Primer estudio",
          title: "Perfil de anticuerpos",
          text: "Medir IgG, IgA, IgM, subpoblaciones linfocitarias con células B CD19/CD20 y respuesta a vacunas si aplica."
        },
        {
          label: "Confirmación",
          title: "Genética",
          text: "Confirmar con BTK en sospecha ligada al X o panel para formas autosómicas recesivas."
        },
        {
          label: "Seguimiento",
          title: "Prevención de infecciones",
          text: "Coordinar inmunoglobulina de reemplazo, tratamiento temprano de infecciones y vigilancia respiratoria."
        }
      ],
      checklist: [
        "Explorar amígdalas y ganglios.",
        "Medir células B además de inmunoglobulinas.",
        "Investigar infecciones por enterovirus o Giardia.",
        "Referir para inicio y seguimiento de inmunoglobulina."
      ],
      alert: "Anticuerpos casi ausentes con células B muy bajas requiere referencia para reemplazo de inmunoglobulina y prevención de daño pulmonar.",
      sources: [
        references.jmf,
        {
          label: "NORD: Agammaglobulinemia",
          url: "https://rarediseases.org/rare-diseases/agammaglobulinemia/"
        },
        {
          label: "Immune Deficiency Foundation: Agammaglobulinemia X-linked and autosomal recessive",
          url: "https://primaryimmune.org/understanding-primary-immunodeficiency/types-of-pi/agammaglobulinemia-x-linked-and-autosomal"
        },
        {
          label: "MedlinePlus Genetics: X-linked agammaglobulinemia",
          url: "https://medlineplus.gov/genetics/condition/x-linked-agammaglobulinemia/"
        }
      ]
    }),
    immunoProtocol({
      id: "atimica-congenita",
      slug: "atimica-congenita",
      title: "Atimia congénita",
      summary: "Protocolo para sospecha de ausencia congénita del timo con inmunodeficiencia celular profunda.",
      subtitle: "Guía para reconocer atimia congénita, proteger al paciente y derivar a centros especializados.",
      tags: ["atimia congénita", "timo", "linfocitos T", "Rethymic", "inmunodeficiencia celular"],
      facts: [
        { label: "Órgano afectado", value: "Timo ausente o no funcional" },
        { label: "Defecto", value: "Maduración de linfocitos T" },
        { label: "Riesgo", value: "Infecciones oportunistas graves" },
        { label: "Tratamiento especializado", value: "Implantación de tejido tímico" }
      ],
      quickSummary: [
        "La atimia congénita debe sospecharse en lactantes con linfopenia T profunda e infecciones graves.",
        "El manejo inicial busca proteger al paciente mientras se confirma el diagnóstico.",
        "La implantación de tejido tímico cultivado es una opción especializada disponible en centros concretos."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Datos iniciales",
          text: "Infecciones tempranas graves, oportunistas o persistentes, linfocitos T muy bajos, ausencia de linfocitos T vírgenes o rasgos sindrómicos asociados."
        },
        {
          label: "Primer estudio",
          title: "Confirmar inmunidad T",
          text: "Biometría con diferencial, subpoblaciones linfocitarias, linfocitos T vírgenes/memoria, inmunoglobulinas y búsqueda de causas genéticas."
        },
        {
          label: "Protección",
          title: "Medidas mientras se estudia",
          text: "Evitar vacunas vivas, usar productos sanguíneos irradiados y CMV negativos cuando aplique, reducir exposición infecciosa y coordinar profilaxis."
        },
        {
          label: "Referencia",
          title: "Manejo definitivo",
          text: "Referir a inmunología pediátrica y centros con experiencia en atimia congénita para valorar implantación de tejido tímico u otras opciones."
        }
      ],
      checklist: [
        "Confirmar conteo y fenotipo de linfocitos T.",
        "Evitar vacunas vivas hasta evaluación especializada.",
        "Cuidar transfusiones y exposición a CMV.",
        "Derivar de forma urgente si hay infecciones graves o T muy bajos."
      ],
      alert: "Atimia congénita se maneja como inmunodeficiencia celular severa; proteger al paciente es parte del diagnóstico.",
      sources: [
        references.jmf,
        {
          label: "NORD: Congenital Athymia",
          url: "https://rarediseases.org/rare-diseases/congenital-athymia/"
        },
        {
          label: "Duke Health: Cultured Thymus Tissue Implantation",
          url: "https://www.dukehealth.org/treatments/pediatric-allergy-and-immunology/congenital-athymia"
        },
        references.merckApproach
      ]
    })
  );
})();

(function () {
  const medicationSources = {
    gammagard: {
      label: "DailyMed: GAMMAGARD LIQUID",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9d42adca-0dd7-4df7-864d-5a7feee52130"
    },
    idfIg: {
      label: "IDF: Immunoglobulin replacement therapy",
      url: "https://primaryimmune.org/understanding-primary-immunodeficiency/treatment/immunoglobulin-replacement-therapy"
    },
    actimmune: {
      label: "DailyMed: ACTIMMUNE",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5d0b1256-1981-4519-94f4-a4a2f98bd8a3"
    },
    cgdReview: {
      label: "Review: Chronic Granulomatous Disease prophylaxis",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5709447/"
    },
    xolremdi: {
      label: "XOLREMDI prescribing information",
      url: "https://xolremdihcp.com/pdf/prescribing-information.pdf"
    },
    rethymic: {
      label: "DailyMed: RETHYMIC",
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=e0022c28-8cda-4f1e-bcf1-1f440d37ec4a"
    },
    kresladi: {
      label: "KRESLADI prescribing information",
      url: "https://www.kresladi.com/prescribing-information"
    },
    waskyra: {
      label: "FDA: WASKYRA prescribing information",
      url: "https://www.fda.gov/media/190096/download"
    }
  };

  window.PROTOCOLOS_SITE.medications.push(
    {
      id: "ivig-reemplazo-pi",
      name: "Inmunoglobulina humana IV para reemplazo",
      group: "Reemplazo humoral",
      status: "Fórmula con fuente",
      summary: "Terapia de reemplazo de anticuerpos en inmunodeficiencias primarias con déficit humoral documentado; ajustar por respuesta clínica, infecciones y niveles valle de IgG.",
      formula: "Fórmula de inicio: peso (kg) x 400-600 mg por mes; la etiqueta de GAMMAGARD LIQUID permite 300-600 mg/kg cada 3-4 semanas según respuesta.",
      protocols: [
        "sindrome-whim",
        "sindrome-hiper-igm",
        "inmunodeficiencia-comun-variable",
        "trastornos-relacionados-was",
        "agammaglobulinemia"
      ],
      sources: [medicationSources.idfIg, medicationSources.gammagard],
      dosingRules: [
        {
          criteria: {},
          calculation: { type: "mgPerKgRange", minAmount: 400, maxAmount: 600, unit: "mg" },
          frequency: "cada mes o cada 3-4 semanas",
          route: "IV",
          note: "Cálculo educativo: peso x 400-600 mg. Ajustar por inmunología según infecciones, IgG valle, producto y tolerancia."
        }
      ]
    },
    {
      id: "tmp-smx-profilaxis-cgd",
      name: "Trimetoprim-sulfametoxazol para profilaxis en CGD",
      group: "Profilaxis antibacteriana",
      status: "Fórmula con fuente",
      summary: "Profilaxis antibacteriana usada en enfermedad granulomatosa crónica; la dosis se calcula por el componente trimetoprim.",
      formula: "Fórmula CGD: trimetoprim 5 mg/kg/día dividido cada 12 h; máximo 320 mg de trimetoprim al día.",
      protocols: ["enfermedad-granulomatosa-cronica"],
      sources: [medicationSources.cgdReview],
      dosingRules: [
        {
          criteria: { protocolSlug: "enfermedad-granulomatosa-cronica" },
          calculation: { type: "mgPerKg", amount: 5, maxDose: 320, unit: "mg de trimetoprim/día" },
          frequency: "dividir cada 12 h",
          route: "VO",
          note: "Cálculo basado en el componente trimetoprim. Revisar función renal, citopenias, alergias e interacciones."
        }
      ]
    },
    {
      id: "itraconazol-profilaxis-cgd",
      name: "Itraconazol para profilaxis antifúngica en CGD",
      group: "Profilaxis antifúngica",
      status: "Fórmula con fuente",
      summary: "Profilaxis antifúngica en enfermedad granulomatosa crónica; requiere vigilancia de interacciones, función hepática y formulación.",
      formula: "Fórmula CGD: 5 mg/kg/día; máximo 200 mg al día.",
      protocols: ["enfermedad-granulomatosa-cronica"],
      sources: [medicationSources.cgdReview],
      dosingRules: [
        {
          criteria: { protocolSlug: "enfermedad-granulomatosa-cronica" },
          calculation: { type: "mgPerKg", amount: 5, maxDose: 200, unit: "mg/día" },
          frequency: "cada 24 h",
          route: "VO",
          note: "Cálculo educativo para profilaxis en CGD. Verificar niveles, interacciones CYP3A4 y función hepática según criterio clínico."
        }
      ]
    },
    {
      id: "interferon-gamma-1b-cgd",
      name: "Interferón gamma-1b",
      group: "Inmunomodulador",
      status: "Fórmula con fuente",
      summary: "ACTIMMUNE está indicado para reducir frecuencia y gravedad de infecciones serias asociadas con enfermedad granulomatosa crónica.",
      formula: "Si SC > 0.5 m²: 50 mcg/m² por dosis SC tres veces por semana. Si SC <= 0.5 m²: 1.5 mcg/kg por dosis SC tres veces por semana.",
      protocols: ["enfermedad-granulomatosa-cronica"],
      sources: [medicationSources.actimmune],
      dosingRules: [
        {
          criteria: { protocolSlug: "enfermedad-granulomatosa-cronica", maxBsaM2: 0.5 },
          calculation: { type: "mcgPerKg", amount: 1.5, unit: "mcg/dosis" },
          frequency: "tres veces por semana",
          route: "SC",
          note: "Regla de etiqueta para SC <= 0.5 m²: 1.5 mcg/kg/dosis."
        },
        {
          criteria: { protocolSlug: "enfermedad-granulomatosa-cronica", minBsaM2: 0.50001 },
          calculation: { type: "mcgPerM2", amount: 50, unit: "mcg/dosis" },
          frequency: "tres veces por semana",
          route: "SC",
          note: "Regla de etiqueta para SC > 0.5 m²: 50 mcg/m²/dosis."
        }
      ]
    },
    {
      id: "mavorixafor-whim",
      name: "Mavorixafor",
      group: "Antagonista CXCR4",
      status: "Fórmula con fuente",
      summary: "XOLREMDI está indicado en pacientes de 12 años o más con síndrome WHIM para aumentar neutrófilos y linfocitos maduros circulantes.",
      formula: "Edad >= 12 años: >50 kg, 400 mg VO cada 24 h; <=50 kg, 300 mg VO cada 24 h. Con inhibidor fuerte CYP3A4: reducir a 200 mg/día.",
      protocols: ["sindrome-whim"],
      sources: [medicationSources.xolremdi],
      dosingRules: [
        {
          criteria: { protocolSlug: "sindrome-whim", minAgeYears: 12, maxWeightKg: 50 },
          calculation: { type: "fixed", amount: 300, unit: "mg" },
          frequency: "cada 24 h en ayuno",
          route: "VO",
          note: "Dosis de etiqueta para pacientes de 12 años o más con peso <= 50 kg."
        },
        {
          criteria: { protocolSlug: "sindrome-whim", minAgeYears: 12, minWeightKg: 50.01 },
          calculation: { type: "fixed", amount: 400, unit: "mg" },
          frequency: "cada 24 h en ayuno",
          route: "VO",
          note: "Dosis de etiqueta para pacientes de 12 años o más con peso > 50 kg."
        }
      ]
    },
    {
      id: "rethymic-atimia",
      name: "Tejido tímico procesado alogénico",
      group: "Terapia celular",
      status: "Fórmula con fuente",
      summary: "RETHYMIC está indicado para reconstitución inmune en pacientes pediátricos con atimia congénita.",
      formula: "Fórmula: superficie corporal (m²) x 5,000-22,000 mm² de tejido tímico.",
      protocols: ["digeorge-completo", "atimica-congenita"],
      sources: [medicationSources.rethymic],
      dosingRules: [
        {
          criteria: {},
          calculation: { type: "mm2PerM2Range", minAmount: 5000, maxAmount: 22000, unit: "mm² de tejido tímico" },
          frequency: "implantación quirúrgica única",
          route: "Implantación quirúrgica",
          note: "Cálculo de etiqueta basado en superficie corporal del receptor. Solo en centro especializado."
        }
      ]
    },
    {
      id: "kresladi-lad1",
      name: "Marnetegragene autotemcel",
      group: "Terapia génica autóloga",
      status: "Fórmula con fuente",
      summary: "KRESLADI está indicado para LAD-I severa pediátrica por variantes bialélicas en ITGB2 cuando no hay donador hermano HLA compatible.",
      formula: "Dosis mínima: 2.8 x 10^6 células CD34+ por kg como infusión IV única.",
      protocols: ["deficiencia-adhesion-leucocitaria"],
      sources: [medicationSources.kresladi],
      dosingRules: [
        {
          criteria: { protocolSlug: "deficiencia-adhesion-leucocitaria" },
          calculation: { type: "millionCellsPerKg", amount: 2.8, unit: "CD34+ células mínimo" },
          frequency: "infusión única",
          route: "IV",
          note: "Cálculo mínimo de etiqueta. Requiere movilización, aféresis, manufactura y acondicionamiento mieloablativo."
        }
      ]
    },
    {
      id: "waskyra-was",
      name: "Etuvetidigene autotemcel",
      group: "Terapia génica autóloga",
      status: "Fórmula con fuente",
      summary: "WASKYRA está indicado para pacientes de 6 meses o más y adultos con síndrome de Wiskott-Aldrich por mutación en WAS, cuando HSCT es apropiado y no hay donador relacionado HLA compatible.",
      formula: "Dosis mínima: 7 x 10^6 células CD34+ por kg como infusión IV única.",
      protocols: ["trastornos-relacionados-was"],
      sources: [medicationSources.waskyra],
      dosingRules: [
        {
          criteria: { protocolSlug: "trastornos-relacionados-was", minAgeYears: 0.5 },
          calculation: { type: "millionCellsPerKg", amount: 7, unit: "CD34+ células mínimo" },
          frequency: "infusión única",
          route: "IV",
          note: "Cálculo mínimo de etiqueta. Requiere movilización, aféresis, acondicionamiento y centro de terapia celular."
        }
      ]
    }
  );

  const treatments = {
    "digeorge-completo": {
      title: "Tratamiento del DiGeorge completo",
      summary: "Prioriza protección frente a infecciones, corrección de problemas asociados y valoración de reconstitución inmune.",
      principles: [
        { label: "Protección", title: "Manejo como inmunodeficiencia celular severa", text: "Evitar vacunas vivas, reducir exposición infecciosa y usar productos sanguíneos irradiados/CMV negativos cuando esté indicado." },
        { label: "Reconstitución", title: "Valorar tejido tímico procesado", text: "La ausencia funcional del timo puede requerir implantación de tejido tímico en centro especializado." },
        { label: "Comorbilidad", title: "Corregir cardiopatía e hipocalcemia", text: "El tratamiento inmunológico debe coordinarse con cardiología, endocrinología, genética e inmunología pediátrica." }
      ]
    },
    "deficiencia-card9": {
      title: "Tratamiento de la deficiencia de CARD9",
      summary: "El esquema depende del hongo, el sitio de infección y la gravedad; no hay una fórmula única segura para calculadora.",
      principles: [
        { label: "Antifúngico", title: "Tratamiento dirigido por especie y sitio", text: "Usar cultivo, biopsia o identificación molecular para elegir antifúngico; enfermedad invasiva requiere manejo urgente." },
        { label: "Extensión", title: "Buscar compromiso profundo", text: "Valorar sistema nervioso central, ojo, hueso y órganos profundos cuando la clínica lo sugiera." },
        { label: "Prevención", title: "Profilaxis secundaria individualizada", text: "Si hay recurrencia, inmunología e infectología pueden indicar terapia prolongada o profilaxis según el caso." }
      ]
    },
    "sindrome-whim": {
      title: "Tratamiento del síndrome WHIM",
      summary: "Combina manejo de infecciones, vigilancia de VPH, reemplazo humoral si aplica y terapia dirigida CXCR4 cuando está indicada.",
      principles: [
        { label: "Dirigido", title: "Mavorixafor en pacientes elegibles", text: "En pacientes de 12 años o más, mavorixafor tiene dosis por peso en etiqueta para aumentar neutrófilos y linfocitos." },
        { label: "Humoral", title: "Inmunoglobulina si hay hipogammaglobulinemia clínicamente relevante", text: "Puede considerarse si hay infecciones recurrentes y defecto de anticuerpos documentado." },
        { label: "VPH", title: "Vigilancia dermatológica y mucosa", text: "Las verrugas persistentes requieren seguimiento por riesgo de lesiones premalignas o malignas." }
      ]
    },
    "deficiencia-adhesion-leucocitaria": {
      title: "Tratamiento de la deficiencia de adhesión leucocitaria",
      summary: "La forma severa requiere antibióticos agresivos, control de foco y valoración de HSCT o terapia génica si cumple criterios.",
      principles: [
        { label: "Infección", title: "Tratamiento antibiótico temprano", text: "Cultivar, cubrir patógenos probables y drenar/controlar focos cuando sea necesario." },
        { label: "Definitivo", title: "HSCT o terapia génica en LAD-I severa", text: "KRESLADI tiene dosis mínima publicada para pacientes pediátricos con LAD-I severa sin donador hermano HLA compatible." },
        { label: "Soporte", title: "Cuidado de heridas y cavidad oral", text: "El manejo dental, de piel y cicatrización es parte del control de complicaciones." }
      ]
    },
    "hiper-ige-autosomico-dominante": {
      title: "Tratamiento del hiper-IgE autosómico dominante",
      summary: "No tiene una dosis universal; el manejo se centra en prevención de infecciones, piel y complicaciones pulmonares.",
      principles: [
        { label: "Infecciones", title: "Antibióticos y profilaxis individualizada", text: "El esquema depende de cultivos, frecuencia de abscesos, neumonías y tolerancia; no debe calcularse sin contexto." },
        { label: "Piel", title: "Control de eczema y abscesos", text: "Cuidado cutáneo, tratamiento oportuno de Staphylococcus y vigilancia de sobreinfección." },
        { label: "Pulmón", title: "Seguimiento de neumoceles y bronquiectasias", text: "La imagen y función pulmonar ayudan a evitar daño acumulado." }
      ]
    },
    "sindrome-hiper-igm": {
      title: "Tratamiento de los síndromes hiper-IgM",
      summary: "Incluye reemplazo de inmunoglobulina, prevención de oportunistas y valoración de HSCT según defecto genético.",
      principles: [
        { label: "Humoral", title: "Inmunoglobulina de reemplazo", text: "Indicada cuando hay déficit de IgG y susceptibilidad a infecciones; ajustar por respuesta clínica." },
        { label: "Oportunistas", title: "Profilaxis según fenotipo", text: "Algunas formas requieren profilaxis para Pneumocystis u otros oportunistas; la dosis depende de edad, superficie corporal y contexto." },
        { label: "Definitivo", title: "Valorar trasplante en formas severas", text: "CD40L/CD40 y otros defectos pueden requerir discusión temprana con inmunología y trasplante." }
      ]
    },
    "hiper-ige-autosomico-recesivo": {
      title: "Tratamiento del hiper-IgE autosómico recesivo",
      summary: "El tratamiento depende del gen y del fenotipo; DOCK8 y formas combinadas pueden requerir HSCT.",
      principles: [
        { label: "Infecciones", title: "Control bacteriano, viral y fúngico", text: "Tratar por germen y órgano; las infecciones virales extensas deben escalarse." },
        { label: "Alergia", title: "Manejo integral de dermatitis, asma y alergia alimentaria", text: "Evitar confundirlo con atopia aislada cuando hay infecciones graves." },
        { label: "Definitivo", title: "Valorar HSCT en DOCK8 u otros defectos severos", text: "La indicación depende del genotipo, gravedad infecciosa, malignidad y disponibilidad de centro experto." }
      ]
    },
    "inmunodeficiencia-comun-variable": {
      title: "Tratamiento de CVID",
      summary: "El pilar es reemplazo de inmunoglobulina cuando se confirma defecto humoral, además de control respiratorio y autoinmunidad.",
      principles: [
        { label: "Humoral", title: "Inmunoglobulina de reemplazo", text: "Se ajusta por infecciones, niveles valle, peso, comorbilidades y tolerancia al producto." },
        { label: "Infección", title: "Antibióticos y prevención de daño pulmonar", text: "Tratar infecciones documentadas, vigilar bronquiectasias y considerar profilaxis si el patrón lo justifica." },
        { label: "No infeccioso", title: "Vigilar autoinmunidad y linfoproliferación", text: "CVID puede requerir tratamiento de citopenias, granulomas, enteropatía o linfadenopatía." }
      ]
    },
    "sindrome-linfoproliferativo-ligado-x": {
      title: "Tratamiento del síndrome linfoproliferativo ligado al X",
      summary: "No hay fórmula universal; el manejo depende de EBV, HLH, linfoma, hipogammaglobulinemia y genética.",
      principles: [
        { label: "Urgencia", title: "EBV grave o HLH requiere tratamiento inmediato", text: "Coordinar hematología, infectología e inmunología; pueden usarse protocolos de HLH o terapia anti-CD20 según contexto." },
        { label: "Humoral", title: "Inmunoglobulina si hay hipogammaglobulinemia", text: "Puede reducir infecciones cuando hay defecto de anticuerpos documentado." },
        { label: "Definitivo", title: "Valorar HSCT", text: "El trasplante puede ser curativo en fenotipos seleccionados y debe discutirse temprano." }
      ]
    },
    "enfermedad-granulomatosa-cronica": {
      title: "Tratamiento de enfermedad granulomatosa crónica",
      summary: "Integra profilaxis antibacteriana, antifúngica, inmunomodulación y manejo agresivo de infecciones.",
      principles: [
        { label: "Profilaxis", title: "TMP-SMX e itraconazol", text: "Hay fórmulas publicadas para profilaxis en CGD; ajustar por toxicidad, interacciones y criterio especializado." },
        { label: "Inmunomodulación", title: "Interferón gamma-1b", text: "ACTIMMUNE tiene dosis por superficie corporal o peso según etiqueta." },
        { label: "Definitivo", title: "Valorar HSCT en casos seleccionados", text: "El trasplante es la única terapia curativa establecida; se individualiza por edad, donador, infecciones e inflamación." }
      ]
    },
    "sindrome-chediak-higashi": {
      title: "Tratamiento del síndrome de Chediak-Higashi",
      summary: "El tratamiento se centra en infecciones, fase acelerada tipo HLH y valoración de HSCT.",
      principles: [
        { label: "Infección", title: "Antibióticos tempranos y control de foco", text: "Tratar infecciones bacterianas con cultivos y cobertura adecuada." },
        { label: "HLH", title: "Fase acelerada como urgencia", text: "Fiebre, citopenias, hepatoesplenomegalia o ferritina alta requieren manejo hematológico urgente." },
        { label: "Definitivo", title: "HSCT para componente hematológico/inmunológico", text: "El trasplante puede corregir el defecto inmunohematológico, aunque no necesariamente previene toda la progresión neurológica." }
      ]
    },
    "trastornos-relacionados-was": {
      title: "Tratamiento de trastornos relacionados con WAS",
      summary: "Combina prevención de infecciones, manejo de sangrado, control de eczema y opciones definitivas como HSCT o terapia génica.",
      principles: [
        { label: "Soporte", title: "Sangrado, eczema e infecciones", text: "Evitar procedimientos de riesgo si hay trombocitopenia severa, tratar eczema y usar antimicrobianos según infecciones." },
        { label: "Humoral", title: "Inmunoglobulina si hay defecto de anticuerpos", text: "Puede indicarse para reducir infecciones en fenotipos con respuesta humoral deficiente." },
        { label: "Definitivo", title: "HSCT o WASKYRA si cumple criterios", text: "WASKYRA tiene dosis mínima publicada para pacientes elegibles sin donador relacionado HLA compatible." }
      ]
    },
    "agammaglobulinemia": {
      title: "Tratamiento de agammaglobulinemia",
      summary: "El tratamiento central es reemplazo de inmunoglobulina y prevención de infecciones bacterianas.",
      principles: [
        { label: "Humoral", title: "Inmunoglobulina de reemplazo continua", text: "Ajustar dosis por peso, infecciones, niveles IgG y tolerancia." },
        { label: "Infección", title: "Antibióticos tempranos", text: "Tratar otitis, sinusitis, neumonía, diarrea o infecciones por enterovirus con baja tolerancia al retraso." },
        { label: "Vacunas", title: "Evitar vacunas vivas cuando estén contraindicadas", text: "La estrategia de vacunación debe revisarse con inmunología por ausencia de respuesta humoral efectiva." }
      ]
    },
    "atimica-congenita": {
      title: "Tratamiento de atimia congénita",
      summary: "Requiere protección infecciosa inmediata y valoración de reconstitución inmune con tejido tímico procesado.",
      principles: [
        { label: "Protección", title: "Evitar vacunas vivas y exposición infecciosa", text: "Manejar como inmunodeficiencia celular severa mientras se confirma y se coordina tratamiento." },
        { label: "Reconstitución", title: "RETHYMIC en pacientes pediátricos", text: "La dosis se calcula por superficie corporal y se realiza como implantación quirúrgica en centro especializado." },
        { label: "Soporte", title: "Inmunoglobulina/profilaxis según evaluación", text: "Puede requerir Ig, antimicrobianos y productos sanguíneos especiales mientras se recupera o reemplaza la función tímica." }
      ]
    }
  };

  window.PROTOCOLOS_SITE.protocols.forEach((protocol) => {
    const treatment = treatments[protocol.slug];
    if (!treatment) return;
    protocol.treatment = treatment;
    protocol.tags = [...new Set([...(protocol.tags || []), "tratamiento", "medicamentos"])];
  });
})();
