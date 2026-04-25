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
    }
  ]
};
