window.PROTOCOLOS_SITE = {
  categories: [
    {
      id: "ITS",
      slug: "its",
      short: "ITS",
      title: "Infecciones de transmisión sexual",
      description: "Protocolos clínicos para sospecha, tamizaje, confirmación y seguimiento de enfermedades transmitidas por contacto sexual.",
      helper: "Incluye VIH y sífilis.",
      accent: "red"
    },
    {
      id: "Respiratorias",
      slug: "respiratorias",
      short: "RS",
      title: "Enfermedades respiratorias",
      description: "Protocolos clínicos para cuadros respiratorios agudos y crónicos frecuentes en primer contacto y urgencias.",
      helper: "Incluye neumonía y crisis asmática.",
      accent: "blue"
    },
    {
      id: "Gastrointestinales",
      slug: "gastrointestinales",
      short: "GI",
      title: "Enfermedades gastrointestinales",
      description: "Protocolos clínicos para síntomas digestivos, hidratación, signos de alarma y conducta inicial.",
      helper: "Incluye diarrea aguda infecciosa.",
      accent: "green"
    },
    {
      id: "Neurológicas",
      slug: "neurologicas",
      short: "NE",
      title: "Enfermedades neurológicas",
      description: "Protocolos clínicos orientados a identificación de datos de alarma y decisiones de referencia.",
      helper: "Incluye migraña aguda.",
      accent: "purple"
    },
    {
      id: "Metabólicas",
      slug: "metabolicas",
      short: "MB",
      title: "Enfermedades metabólicas",
      description: "Protocolos para urgencias metabólicas y descompensaciones que requieren reconocimiento temprano.",
      helper: "Incluye cetoacidosis diabética.",
      accent: "gold"
    }
  ],
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
    },
    {
      id: "sifilis",
      slug: "sifilis",
      kind: "clinical",
      title: "Sífilis adquirida",
      category: "ITS",
      categorySlug: "its",
      status: "Disponible",
      updatedAt: "2026-04-18",
      summary: "Abordaje inicial ante sospecha de sífilis, interpretación de pruebas treponémicas y no treponémicas y seguimiento serológico.",
      subtitle: "Protocolo clínico orientado a tamizaje, diagnóstico y control posterior al tratamiento.",
      tags: ["ITS", "sífilis", "VDRL", "tratamiento", "seguimiento"],
      facts: [
        { label: "Categoría", value: "ITS" },
        { label: "Sospecha", value: "Úlcera, exantema, riesgo sexual" },
        { label: "Pruebas", value: "VDRL o RPR + prueba treponémica" },
        { label: "Seguimiento", value: "Control serológico" }
      ],
      quickSummary: [
        "Correlaciona clínica con serología.",
        "No interpretes VDRL o RPR sin el contexto del estadio clínico.",
        "Incluye siempre orientación sobre contactos sexuales y prevención."
      ],
      sections: [
        {
          label: "Cuándo sospechar",
          title: "Manifestaciones que deben hacerte pensar en sífilis",
          text: "Úlcera genital indolora, exantema palmoplantar, adenopatías, antecedente sexual de riesgo o hallazgo positivo en tamizaje prenatal o de ITS."
        },
        {
          label: "Pruebas",
          title: "Evaluación inicial",
          text: "Solicitar una prueba no treponémica como VDRL o RPR y confirmarla con una prueba treponémica. Interpretar el resultado según el contexto clínico."
        },
        {
          label: "Conducta",
          title: "Manejo clínico",
          text: "Tratar según el estadio clínico, valorar coinfecciones de transmisión sexual y considerar estudio de contactos sexuales."
        },
        {
          label: "Seguimiento",
          title: "Qué revisar después",
          text: "Dar seguimiento con títulos no treponémicos, vigilar respuesta al tratamiento y educar sobre prevención y notificación de pareja."
        }
      ],
      checklist: [
        "Definir el estadio clínico.",
        "Correlacionar laboratorio con síntomas.",
        "Investigar coinfecciones de transmisión sexual.",
        "Documentar tratamiento y seguimiento."
      ],
      alert: "Una prueba aislada no debe interpretarse sin contexto clínico. Correlaciona siempre estadio, síntomas y serología."
    },
    {
      id: "neumonia",
      slug: "neumonia",
      kind: "clinical",
      title: "Neumonía adquirida en la comunidad",
      category: "Respiratorias",
      categorySlug: "respiratorias",
      status: "Disponible",
      updatedAt: "2026-04-16",
      summary: "Protocolo clínico para evaluación inicial, datos de alarma, estudios básicos y orientación terapéutica en neumonía adquirida en la comunidad.",
      subtitle: "Útil para priorizar gravedad, necesidad de referencia y abordaje inicial en primer contacto.",
      tags: ["respiratorias", "neumonía", "gravedad", "urgencias", "tratamiento"],
      facts: [
        { label: "Categoría", value: "Respiratorias" },
        { label: "Sospecha", value: "Fiebre, tos, disnea, estertores" },
        { label: "Evaluación", value: "Signos vitales y gravedad" },
        { label: "Decisión", value: "Ambulatorio o referencia" }
      ],
      quickSummary: [
        "Primero clasifica gravedad y saturación.",
        "Decide si puede manejarse en casa o necesita referencia.",
        "No olvides reevaluar comorbilidades y signos de deterioro."
      ],
      sections: [
        {
          label: "Cuándo sospechar",
          title: "Clínica inicial",
          text: "Pensar en neumonía ante fiebre, tos, expectoración, dolor pleurítico, taquipnea, hipoxemia o auscultación sugestiva."
        },
        {
          label: "Estudios",
          title: "Valoración básica",
          text: "Revisar signos vitales, saturación, estado general y solicitar estudios de imagen o laboratorio según gravedad y disponibilidad."
        },
        {
          label: "Decisión",
          title: "Sitio de manejo",
          text: "Valorar si la persona puede tratarse en forma ambulatoria o si necesita referencia por gravedad, comorbilidad o deterioro respiratorio."
        },
        {
          label: "Tratamiento",
          title: "Conducta inicial",
          text: "Indicar antibiótico según guías locales, controlar fiebre, hidratación y seguimiento estrecho si el manejo es ambulatorio."
        }
      ],
      checklist: [
        "Tomar signos vitales completos.",
        "Valorar dificultad respiratoria y saturación.",
        "Identificar comorbilidades.",
        "Definir criterios de referencia."
      ],
      alert: "Taquipnea, hipoxemia, hipotensión o alteración del estado mental obligan a reevaluar gravedad y nivel de atención."
    },
    {
      id: "asma",
      slug: "asma",
      kind: "clinical",
      title: "Crisis asmática aguda",
      category: "Respiratorias",
      categorySlug: "respiratorias",
      status: "Disponible",
      updatedAt: "2026-04-12",
      summary: "Protocolo para reconocer gravedad, estabilizar una exacerbación asmática y decidir observación, egreso o referencia.",
      subtitle: "Enfocado en primer contacto y urgencias básicas.",
      tags: ["asma", "respiratorias", "sibilancias", "salbutamol", "gravedad"],
      facts: [
        { label: "Categoría", value: "Respiratorias" },
        { label: "Prioridad", value: "Evaluar gravedad rápido" },
        { label: "Manejo", value: "Broncodilatador y oxígeno" },
        { label: "Salida", value: "Egreso o referencia" }
      ],
      quickSummary: [
        "Clasifica gravedad al ingreso.",
        "Revalora tras cada intervención.",
        "No des egreso sin plan claro de alarma y seguimiento."
      ],
      sections: [
        {
          label: "Triage",
          title: "Clasifica la gravedad",
          text: "Evaluar habla, frecuencia respiratoria, saturación, uso de músculos accesorios, frecuencia cardiaca y respuesta al tratamiento previo."
        },
        {
          label: "Intervención",
          title: "Manejo inicial",
          text: "Iniciar broncodilatador inhalado o nebulizado, considerar oxígeno suplementario y antiinflamatorio sistémico según gravedad."
        },
        {
          label: "Reevaluación",
          title: "Respuesta clínica",
          text: "Revalorar síntomas, auscultación, saturación y esfuerzo respiratorio tras la primera intervención."
        },
        {
          label: "Decisión final",
          title: "Destino del paciente",
          text: "Dar egreso con plan claro si mejora, o referir si persiste la dificultad respiratoria, la hipoxemia o el deterioro."
        }
      ],
      checklist: [
        "Evaluar gravedad al ingreso.",
        "Revalorar tras broncodilatador.",
        "Dar educación de egreso.",
        "Referir si no hay respuesta adecuada."
      ],
      alert: "Silencio auscultatorio, cianosis, agotamiento o dificultad para hablar sugieren crisis grave."
    },
    {
      id: "diarrea",
      slug: "diarrea",
      kind: "clinical",
      title: "Diarrea aguda infecciosa",
      category: "Gastrointestinales",
      categorySlug: "gastrointestinales",
      status: "Disponible",
      updatedAt: "2026-04-10",
      summary: "Protocolo para valorar deshidratación, signos de alarma y conducta inicial en diarrea aguda infecciosa.",
      subtitle: "Pensado para triage, hidratación y decisión de estudios o referencia.",
      tags: ["diarrea", "gastrointestinales", "deshidratación", "rehidratación"],
      facts: [
        { label: "Categoría", value: "Gastrointestinales" },
        { label: "Prioridad", value: "Estado de hidratación" },
        { label: "Conducta", value: "Rehidratación" },
        { label: "Vigilancia", value: "Datos de alarma" }
      ],
      quickSummary: [
        "Lo primero es definir deshidratación.",
        "No subestimar sangre en heces, sepsis o intolerancia a vía oral.",
        "Siempre explicar signos de alarma al egreso."
      ],
      sections: [
        {
          label: "Evaluación",
          title: "Qué revisar primero",
          text: "Determinar número de evacuaciones, vómito, fiebre, sangre en heces, tiempo de evolución y estado de hidratación."
        },
        {
          label: "Hidratación",
          title: "Manejo inicial",
          text: "Corregir pérdidas con solución oral o intravenosa según el grado de deshidratación y tolerancia a la vía oral."
        },
        {
          label: "Estudios",
          title: "Cuándo ampliar abordaje",
          text: "Solicitar estudios si hay sangre en heces, sospecha de sepsis, inmunosupresión, cuadro prolongado o deshidratación importante."
        },
        {
          label: "Seguimiento",
          title: "Qué explicar al egreso",
          text: "Dar medidas de hidratación, signos de alarma y orientación sobre higiene y alimentación."
        }
      ],
      checklist: [
        "Valorar deshidratación.",
        "Buscar sangre en heces o fiebre alta.",
        "Decidir si necesita referencia.",
        "Explicar signos de alarma."
      ],
      alert: "Choque, deshidratación grave, deterioro neurológico o intolerancia total a vía oral requieren atención urgente."
    },
    {
      id: "cetoacidosis",
      slug: "cetoacidosis",
      kind: "clinical",
      title: "Cetoacidosis diabética",
      category: "Metabólicas",
      categorySlug: "metabolicas",
      status: "En revisión",
      updatedAt: "2026-04-04",
      summary: "Protocolo para identificar datos sugestivos de cetoacidosis diabética, estudios iniciales y prioridades de estabilización.",
      subtitle: "Módulo clínico orientado a urgencias metabólicas.",
      tags: ["metabólicas", "diabetes", "cetoacidosis", "urgencias"],
      facts: [
        { label: "Categoría", value: "Metabólicas" },
        { label: "Sospecha", value: "Hiperglucemia y acidosis" },
        { label: "Prioridad", value: "Líquidos y vigilancia" },
        { label: "Estado", value: "En revisión" }
      ],
      quickSummary: [
        "Requiere reconocimiento y manejo urgente.",
        "Líquidos, vigilancia y evaluación metabólica completa son prioritarios.",
        "No olvidar buscar el desencadenante."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Datos clínicos",
          text: "Pensar en cetoacidosis ante poliuria, polidipsia, vómito, dolor abdominal, respiración de Kussmaul, deshidratación y alteración del estado mental."
        },
        {
          label: "Estudios",
          title: "Confirmación inicial",
          text: "Glucosa, electrólitos, cetonas, gasometría y valoración del estado hemodinámico son parte del abordaje inicial."
        },
        {
          label: "Estabilización",
          title: "Conducta inicial",
          text: "Priorizar líquidos, corrección de alteraciones metabólicas, vigilancia estrecha y referencia o manejo hospitalario."
        },
        {
          label: "Seguridad",
          title: "Qué no olvidar",
          text: "Buscar factor desencadenante, vigilar potasio y controlar el estado neurológico de forma seriada."
        }
      ],
      checklist: [
        "Evaluar estado hemodinámico.",
        "Pedir estudios metabólicos completos.",
        "Vigilar potasio.",
        "Identificar desencadenante."
      ],
      alert: "Toda persona con sospecha de cetoacidosis diabética requiere manejo urgente y monitorización estrecha."
    },
    {
      id: "migrana",
      slug: "migrana",
      kind: "clinical",
      title: "Migraña aguda",
      category: "Neurológicas",
      categorySlug: "neurologicas",
      status: "Disponible",
      updatedAt: "2026-03-29",
      summary: "Abordaje clínico básico de cefalea compatible con migraña y signos de alarma que obligan a descartar causas secundarias.",
      subtitle: "Protocolo clínico de primer contacto para cefalea aguda recurrente compatible con migraña.",
      tags: ["neurológicas", "migraña", "cefalea", "alarma"],
      facts: [
        { label: "Categoría", value: "Neurológicas" },
        { label: "Objetivo", value: "Distinguir alarma vs migraña" },
        { label: "Manejo", value: "Tratamiento sintomático" },
        { label: "Seguridad", value: "Identificar cefalea secundaria" }
      ],
      quickSummary: [
        "Antes de etiquetar como migraña, busca banderas rojas.",
        "Revisa patrón previo de cefalea y factores desencadenantes.",
        "Si cambia de patrón o aparecen déficits, amplía abordaje."
      ],
      sections: [
        {
          label: "Sospecha",
          title: "Cuándo pensar en migraña",
          text: "Cefalea pulsátil, recurrente, unilateral o bilateral, con náusea, fotofobia, fonofobia o antecedentes similares."
        },
        {
          label: "Descartar alarma",
          title: "Lo primero es no perder gravedad",
          text: "Buscar fiebre, rigidez de nuca, déficit neurológico, inicio súbito, inmunosupresión o cambio marcado en el patrón habitual."
        },
        {
          label: "Manejo",
          title: "Conducta inicial",
          text: "Ofrecer tratamiento sintomático, reposo, hidratación y seguimiento según intensidad y respuesta."
        },
        {
          label: "Seguimiento",
          title: "Cuándo derivar o estudiar más",
          text: "Si aparecen signos de alarma, no hay mejoría o el cuadro cambia de patrón, ampliar abordaje."
        }
      ],
      checklist: [
        "Buscar banderas rojas.",
        "Valorar patrón previo de cefalea.",
        "Dar tratamiento y revalorar.",
        "Referir si hay alarma."
      ],
      alert: "Una cefalea súbita intensa, con déficit neurológico o fiebre, no debe asumirse como migraña hasta descartar causas secundarias."
    }
  ]
};
