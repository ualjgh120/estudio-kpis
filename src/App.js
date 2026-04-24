import { useState } from "react";

const kpiData = [
  {
    categoria: "KPIs FINANCIEROS",
    color: "#1a3a5c",
    accent: "#2e86de",
    objetivo: "Medir la salud financiera y el rendimiento económico de la empresa.",
    indicadores: [
      {
        nombre: "Retorno de la Inversión (ROI)",
        definicion: "Mide la eficacia de una inversión en términos de rentabilidad.",
        proposito: "Evaluar la rentabilidad de diferentes inversiones.",
        formula: "ROI = ((Ganancia de la Inversión − Costo de la Inversión) / Costo de la Inversión) × 100%",
        latex: true,
      },
      {
        nombre: "Margen de Beneficio Bruto",
        definicion: "Porcentaje de ingresos que supera el coste de los bienes vendidos.",
        proposito: "Evaluar la eficiencia productiva y la política de precios.",
        formula: "Margen Bruto = ((Ingresos − Coste de Ventas) / Ingresos) × 100%",
        latex: false,
      },
      {
        nombre: "EBITDA",
        definicion: "Beneficio antes de intereses, impuestos, depreciaciones y amortizaciones.",
        proposito: "Medir la rentabilidad operativa pura, sin efectos contables ni financieros.",
        formula: "EBITDA = Ingresos − Gastos Operativos (excluye intereses, impuestos, depreciación y amortización)",
        latex: false,
      },
      {
        nombre: "Valor Económico Agregado (EVA)",
        definicion: "Medida del valor creado por la empresa por encima del coste del capital invertido.",
        proposito: "Determinar si la empresa genera valor real para los accionistas.",
        formula: "EVA = NOPAT − (Capital Invertido × WACC)",
        latex: false,
      },
    ],
  },
  {
    categoria: "KPIs DE CLIENTES",
    color: "#1a5c3a",
    accent: "#27ae60",
    objetivo: "Evaluar la satisfacción, retención y adquisición de clientes.",
    indicadores: [
      {
        nombre: "Tasa de Retención de Clientes",
        definicion: "Mide el porcentaje de clientes que una empresa retiene durante un período específico.",
        proposito: "Evaluar la lealtad y satisfacción del cliente a lo largo del tiempo.",
        formula: "Retención = ((Clientes al Final − Nuevos Clientes durante el Período) / Clientes al Inicio) × 100%",
        latex: false,
      },
      {
        nombre: "Índice de Satisfacción del Cliente (CSAT)",
        definicion: "Mide el grado de satisfacción del cliente con un producto o servicio.",
        proposito: "Evaluar la calidad del servicio y la experiencia del cliente.",
        formula: "CSAT = (Número de Respuestas Positivas / Número Total de Respuestas) × 100%",
        latex: false,
      },
      {
        nombre: "Costo de Adquisición del Cliente (CAC)",
        definicion: "Calcula el costo total promedio para adquirir un nuevo cliente.",
        proposito: "Entender el costo involucrado en la expansión de la base de clientes.",
        formula: "CAC = Costo Total de Adquisición de Clientes / Número Total de Clientes Adquiridos",
        latex: false,
      },
      {
        nombre: "Valor de Vida del Cliente (CLV)",
        definicion: "Estima el valor total que un cliente aportará a la empresa a lo largo de su relación.",
        proposito: "Determinar la rentabilidad a largo plazo de las relaciones con los clientes.",
        formula: "CLV = Valor Promedio de Compra × Número de Compras al Año × Duración Promedio de la Relación (años)",
        latex: false,
      },
    ],
  },
  {
    categoria: "KPIs OPERACIONALES",
    color: "#5c3a1a",
    accent: "#e67e22",
    objetivo: "Medir la eficiencia, calidad y rendimiento de los procesos operativos.",
    indicadores: [
      {
        nombre: "Tiempo de Ciclo de Producción",
        definicion: "Tiempo total necesario para completar un proceso productivo de inicio a fin.",
        proposito: "Identificar ineficiencias y cuellos de botella en la cadena de producción.",
        formula: "Tiempo de Ciclo = Fecha de Finalización − Fecha de Inicio del Proceso",
        latex: false,
      },
      {
        nombre: "Tasa de Defectos",
        definicion: "Porcentaje de unidades producidas que no cumplen los estándares de calidad.",
        proposito: "Controlar la calidad y detectar fallos en el proceso productivo.",
        formula: "Tasa de Defectos = (Unidades Defectuosas / Total de Unidades Producidas) × 100%",
        latex: false,
      },
      {
        nombre: "Eficiencia de la Cadena de Suministro",
        definicion: "Nivel de rendimiento logístico y operativo en la entrega de productos o servicios.",
        proposito: "Optimizar los flujos de materiales, tiempos y costes en la cadena de valor.",
        formula: "Se mide mediante indicadores compuestos: cumplimiento de pedidos, tiempo de entrega, coste logístico sobre ventas.",
        latex: false,
      },
    ],
  },
  {
    categoria: "KPIs DE RECURSOS HUMANOS",
    color: "#3a1a5c",
    accent: "#8e44ad",
    objetivo: "Evaluar el rendimiento, la satisfacción y la eficiencia de los empleados.",
    indicadores: [
      {
        nombre: "Rotación de Empleados",
        definicion: "Mide la tasa a la que los empleados dejan una organización.",
        proposito: "Evaluar la retención de empleados y la salud organizacional.",
        formula: "Rotación = (Empleados que Dejan la Empresa / Número Promedio de Empleados durante el Período) × 100%",
        latex: false,
      },
      {
        nombre: "Productividad del Empleado",
        definicion: "Relación entre el output generado y los recursos humanos empleados.",
        proposito: "Medir la eficiencia individual o grupal en la generación de valor.",
        formula: "Productividad = Output Total / Número de Empleados (o Horas Trabajadas)",
        latex: false,
      },
      {
        nombre: "Índice de Compromiso de los Empleados",
        definicion: "Nivel de implicación, motivación y alineación del empleado con los objetivos organizacionales.",
        proposito: "Identificar el grado de engagement para reducir la rotación y mejorar el rendimiento.",
        formula: "Se obtiene mediante encuestas de clima laboral con escala Likert. Índice = Puntuación Media Ponderada de Respuestas.",
        latex: false,
      },
    ],
  },
  {
    categoria: "KPIs DE VENTAS",
    color: "#5c1a1a",
    accent: "#e74c3c",
    objetivo: "Medir el rendimiento y la eficacia de las estrategias y equipos de ventas.",
    indicadores: [
      {
        nombre: "Ingresos por Vendedor",
        definicion: "Volumen de ingresos generados por cada miembro del equipo comercial.",
        proposito: "Evaluar el rendimiento individual y detectar brechas de desempeño en el equipo.",
        formula: "Ingresos por Vendedor = Ingresos Totales / Número de Vendedores",
        latex: false,
      },
      {
        nombre: "Tasa de Conversión de Ventas",
        definicion: "Porcentaje de leads u oportunidades comerciales que culminan en venta efectiva.",
        proposito: "Medir la eficiencia del proceso de ventas y la calidad del pipeline comercial.",
        formula: "Conversión = (Ventas Cerradas / Total de Leads u Oportunidades) × 100%",
        latex: false,
      },
      {
        nombre: "Ciclo de Ventas Medio",
        definicion: "Tiempo promedio transcurrido desde el primer contacto con un prospecto hasta el cierre de la venta.",
        proposito: "Optimizar el proceso comercial e identificar etapas críticas de dilación.",
        formula: "Ciclo Medio = Suma de Días por Venta Cerrada / Número de Ventas Cerradas",
        latex: false,
      },
    ],
  },
  {
    categoria: "KPIs ESTRATÉGICOS",
    color: "#1a4a5c",
    accent: "#16a085",
    objetivo: "Medir el progreso hacia los objetivos estratégicos de largo plazo de la empresa.",
    indicadores: [
      {
        nombre: "Participación de Mercado",
        definicion: "Porcentaje de las ventas totales del sector que corresponde a la empresa.",
        proposito: "Evaluar el posicionamiento competitivo y la cuota de mercado capturada.",
        formula: "Market Share = (Ventas de la Empresa / Ventas Totales del Mercado) × 100%",
        latex: false,
      },
      {
        nombre: "Crecimiento de Ingresos Año a Año (YoY)",
        definicion: "Variación porcentual de los ingresos respecto al mismo período del año anterior.",
        proposito: "Medir el ritmo de expansión del negocio en términos de ingresos.",
        formula: "Crecimiento YoY = ((Ingresos Año Actual − Ingresos Año Anterior) / Ingresos Año Anterior) × 100%",
        latex: false,
      },
      {
        nombre: "Expansión Geográfica",
        definicion: "Número de nuevos mercados o territorios en los que la empresa opera o ha iniciado operaciones.",
        proposito: "Rastrear el progreso de la estrategia de internacionalización o diversificación territorial.",
        formula: "Indicador cuantitativo: Nuevos Mercados Activos / Mercados Objetivo Planificados × 100%",
        latex: false,
      },
    ],
  },
  {
    categoria: "KPIs DE CALIDAD",
    color: "#3a5c1a",
    accent: "#2ecc71",
    objetivo: "Evaluar la calidad de los productos o servicios.",
    indicadores: [
      {
        nombre: "Índice de Satisfacción del Producto",
        definicion: "Nivel de conformidad del cliente con las características y prestaciones del producto.",
        proposito: "Detectar gaps entre las expectativas del cliente y el valor percibido del producto.",
        formula: "ISP = (Clientes Satisfechos con el Producto / Total de Clientes Encuestados) × 100%",
        latex: false,
      },
      {
        nombre: "Tasa de Retorno del Producto",
        definicion: "Porcentaje de productos vendidos que son devueltos por los clientes.",
        proposito: "Identificar problemas de calidad, expectativas no cumplidas o errores de especificación.",
        formula: "Tasa de Retorno = (Unidades Devueltas / Unidades Vendidas) × 100%",
        latex: false,
      },
      {
        nombre: "Cumplimiento de los Estándares de Calidad",
        definicion: "Porcentaje de productos o procesos que cumplen los estándares normativos establecidos (ISO, etc.).",
        proposito: "Garantizar la conformidad regulatoria y la consistencia en la entrega de calidad.",
        formula: "Cumplimiento = (Unidades / Procesos Conformes / Total Auditado) × 100%",
        latex: false,
      },
    ],
  },
];

const primarioSecundario = {
  primarios: {
    definicion: "Son los indicadores más críticos para el éxito de la organización. Están directamente alineados con los objetivos estratégicos y metas principales de la empresa.",
    caracteristicas: ["Alta relevancia estratégica.", "Impacto directo en el rendimiento y éxito general.", "Se relacionan con aspectos financieros, crecimiento del negocio y satisfacción del cliente."],
    ejemplos: ["ROI", "Tasa de Retención de Clientes", "Crecimiento de Ingresos"],
  },
  secundarios: {
    definicion: "Son indicadores que apoyan y proporcionan contexto a los KPIs primarios. Ayudan a entender mejor el desempeño en áreas específicas sin estar directamente vinculados a los objetivos estratégicos clave.",
    caracteristicas: ["Menor impacto directo en los objetivos estratégicos.", "Útiles para seguimiento y mejora de procesos operativos y tácticos.", "Ayudan a desglosar los factores que contribuyen a los KPIs primarios."],
    ejemplos: ["Tasa de respuesta del servicio al cliente", "Tiempo promedio de resolución de problemas", "Tasa de clics en campaña de marketing digital"],
  },
};

export default function KPIStudyForm() {
  const [activeTab, setActiveTab] = useState("tabla");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [flashcard, setFlashcard] = useState({ catIdx: 0, indIdx: 0, flipped: false });
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
const [, setQuizResult] = useState(null);

  const allIndicadores = kpiData.flatMap((cat, ci) =>
    cat.indicadores.map((ind, ii) => ({ ...ind, categoria: cat.categoria, catIdx: ci, indIdx: ii }))
  );

  const currentFlashcard = kpiData[flashcard.catIdx]?.indicadores[flashcard.indIdx];
  const currentCat = kpiData[flashcard.catIdx];

  const nextCard = () => {
    setFlashcard(prev => {
      const cat = kpiData[prev.catIdx];
      if (prev.indIdx < cat.indicadores.length - 1) {
        return { catIdx: prev.catIdx, indIdx: prev.indIdx + 1, flipped: false };
      } else if (prev.catIdx < kpiData.length - 1) {
        return { catIdx: prev.catIdx + 1, indIdx: 0, flipped: false };
      }
      return { catIdx: 0, indIdx: 0, flipped: false };
    });
    setQuizAnswer("");
    setQuizResult(null);
  };

  const prevCard = () => {
    setFlashcard(prev => {
      if (prev.indIdx > 0) {
        return { catIdx: prev.catIdx, indIdx: prev.indIdx - 1, flipped: false };
      } else if (prev.catIdx > 0) {
        const newCatIdx = prev.catIdx - 1;
        return { catIdx: newCatIdx, indIdx: kpiData[newCatIdx].indicadores.length - 1, flipped: false };
      }
      const lastCat = kpiData.length - 1;
      return { catIdx: lastCat, indIdx: kpiData[lastCat].indicadores.length - 1, flipped: false };
    });
    setQuizAnswer("");
    setQuizResult(null);
  };

  const totalCards = allIndicadores.length;
  const currentCardNum = kpiData.slice(0, flashcard.catIdx).reduce((a, c) => a + c.indicadores.length, 0) + flashcard.indIdx + 1;

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0d1117", minHeight: "100vh", color: "#e6edf3", padding: "0" }}>
      {/* HEADER */}
      <div style={{
        background: "linear-gradient(135deg, #1a2740 0%, #0d1117 60%, #1a1a2e 100%)",
        borderBottom: "2px solid #2e86de",
        padding: "32px 40px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, width: "300px", height: "100%",
          background: "radial-gradient(ellipse at top right, rgba(46,134,222,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#2e86de", marginBottom: "8px", textTransform: "uppercase" }}>
          Inteligencia de Negocio · Universidad de Almería
        </div>
        <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "700", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
          Formulario de Estudio
        </h1>
        <h2 style={{ margin: "4px 0 0", fontSize: "18px", fontWeight: "400", color: "#8b949e" }}>
          Indicadores Clave de Rendimiento (KPIs)
        </h2>
        <div style={{ marginTop: "8px", fontSize: "12px", color: "#58a6ff" }}>
          {totalCards} indicadores · {kpiData.length} categorías
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", gap: "2px", padding: "0 40px", background: "#161b22", borderBottom: "1px solid #30363d" }}>
        {[
          { key: "tabla", label: "📊 Tabla Maestra" },
          { key: "flash", label: "🃏 Flashcards" },
          { key: "primarios", label: "⭐ Primarios vs Secundarios" },
          { key: "diseño", label: "🔧 Diseño de KPIs" },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              background: activeTab === tab.key ? "#0d1117" : "transparent",
              border: "none",
              borderTop: activeTab === tab.key ? "2px solid #2e86de" : "2px solid transparent",
              color: activeTab === tab.key ? "#e6edf3" : "#8b949e",
              padding: "12px 20px",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "Georgia, serif",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "32px 40px" }}>

        {/* ============ TABLA MAESTRA ============ */}
        {activeTab === "tabla" && (
          <div>
            {kpiData.map((cat, ci) => (
              <div key={ci} style={{ marginBottom: "32px" }}>
                {/* Category Header */}
                <div
                  style={{
                    background: `linear-gradient(90deg, ${cat.color} 0%, #161b22 100%)`,
                    borderLeft: `4px solid ${cat.accent}`,
                    padding: "14px 20px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "4px 4px 0 0",
                  }}
                  onClick={() => setExpandedCategory(expandedCategory === ci ? null : ci)}
                >
                  <div>
                    <div style={{ fontSize: "13px", letterSpacing: "2px", color: cat.accent, marginBottom: "2px" }}>
                      {cat.categoria}
                    </div>
                    <div style={{ fontSize: "12px", color: "#8b949e" }}>{cat.objetivo}</div>
                  </div>
                  <div style={{ fontSize: "20px", color: cat.accent }}>{expandedCategory === ci ? "▲" : "▼"}</div>
                </div>

                {/* Table */}
                {(expandedCategory === ci || expandedCategory === null) && (
                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                      <thead>
                        <tr style={{ background: "#161b22" }}>
                          <th style={{ padding: "10px 16px", textAlign: "left", color: cat.accent, borderBottom: `2px solid ${cat.accent}`, width: "20%", fontWeight: "600", letterSpacing: "1px" }}>KPI</th>
                          <th style={{ padding: "10px 16px", textAlign: "left", color: "#8b949e", borderBottom: "2px solid #30363d", width: "30%" }}>Definición</th>
                          <th style={{ padding: "10px 16px", textAlign: "left", color: "#8b949e", borderBottom: "2px solid #30363d", width: "20%" }}>Propósito</th>
                          <th style={{ padding: "10px 16px", textAlign: "left", color: "#8b949e", borderBottom: "2px solid #30363d", width: "30%" }}>Fórmula</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.indicadores.map((ind, ii) => (
                          <tr key={ii} style={{ borderBottom: "1px solid #21262d", background: ii % 2 === 0 ? "#0d1117" : "#161b22" }}>
                            <td style={{ padding: "12px 16px", fontWeight: "600", color: "#e6edf3", verticalAlign: "top" }}>
                              <div style={{ color: cat.accent, fontSize: "11px", marginBottom: "2px", letterSpacing: "0.5px" }}>
                                {cat.categoria.replace("KPIs ", "").replace("KPIs", "").trim()}
                              </div>
                              {ind.nombre}
                            </td>
                            <td style={{ padding: "12px 16px", color: "#c9d1d9", lineHeight: "1.6", verticalAlign: "top" }}>
                              {ind.definicion}
                            </td>
                            <td style={{ padding: "12px 16px", color: "#8b949e", lineHeight: "1.6", verticalAlign: "top", fontStyle: "italic" }}>
                              {ind.proposito}
                            </td>
                            <td style={{ padding: "12px 16px", verticalAlign: "top" }}>
                              <div style={{
                                background: "#1c2333",
                                border: `1px solid ${cat.accent}40`,
                                borderRadius: "6px",
                                padding: "10px 12px",
                                fontFamily: "'Courier New', monospace",
                                fontSize: "12px",
                                color: cat.accent,
                                lineHeight: "1.6",
                              }}>
                                {ind.formula}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ============ FLASHCARDS ============ */}
        {activeTab === "flash" && (
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "13px", color: "#8b949e" }}>
                Tarjeta <span style={{ color: currentCat?.accent }}>{currentCardNum}</span> de {totalCards} · {currentCat?.categoria}
              </div>
              <button
                onClick={() => { setQuizMode(!quizMode); setQuizAnswer(""); setQuizResult(null); setFlashcard(prev => ({ ...prev, flipped: false })); }}
                style={{
                  background: quizMode ? "#2e86de20" : "transparent",
                  border: `1px solid ${quizMode ? "#2e86de" : "#30363d"}`,
                  color: quizMode ? "#2e86de" : "#8b949e",
                  padding: "6px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "Georgia, serif",
                }}
              >
                {quizMode ? "✅ Modo Quiz" : "🎯 Activar Quiz"}
              </button>
            </div>

            {/* Progress bar */}
            <div style={{ background: "#21262d", borderRadius: "4px", height: "4px", marginBottom: "24px" }}>
              <div style={{
                background: currentCat?.accent,
                width: `${(currentCardNum / totalCards) * 100}%`,
                height: "100%",
                borderRadius: "4px",
                transition: "width 0.3s ease",
              }} />
            </div>

            {/* Card */}
            <div
              onClick={() => !quizMode && setFlashcard(prev => ({ ...prev, flipped: !prev.flipped }))}
              style={{
                background: `linear-gradient(135deg, #161b22 0%, #1c2333 100%)`,
                border: `2px solid ${flashcard.flipped ? currentCat?.accent : "#30363d"}`,
                borderRadius: "12px",
                padding: "40px",
                minHeight: "280px",
                cursor: quizMode ? "default" : "pointer",
                transition: "all 0.3s ease",
                position: "relative",
              }}
            >
              {/* Front */}
              {!flashcard.flipped && (
                <div>
                  <div style={{ fontSize: "11px", letterSpacing: "3px", color: currentCat?.accent, marginBottom: "16px" }}>
                    {currentCat?.categoria}
                  </div>
                  <h2 style={{ fontSize: "22px", margin: "0 0 20px", color: "#e6edf3" }}>
                    {currentFlashcard?.nombre}
                  </h2>
                  {!quizMode && (
                    <div style={{ fontSize: "13px", color: "#8b949e", position: "absolute", bottom: "20px", right: "24px" }}>
                      Toca para ver definición y fórmula →
                    </div>
                  )}
                  {quizMode && (
                    <div>
                      <p style={{ fontSize: "14px", color: "#8b949e", marginBottom: "16px" }}>
                        Escribe la definición y/o fórmula de este KPI:
                      </p>
                      <textarea
                        value={quizAnswer}
                        onChange={e => setQuizAnswer(e.target.value)}
                        placeholder="Tu respuesta aquí..."
                        style={{
                          width: "100%",
                          minHeight: "100px",
                          background: "#0d1117",
                          border: "1px solid #30363d",
                          borderRadius: "6px",
                          padding: "12px",
                          color: "#e6edf3",
                          fontSize: "13px",
                          fontFamily: "Georgia, serif",
                          resize: "vertical",
                          boxSizing: "border-box",
                        }}
                      />
                      <button
                        onClick={() => { setQuizResult(true); setFlashcard(prev => ({ ...prev, flipped: true })); }}
                        style={{
                          marginTop: "12px",
                          background: currentCat?.accent,
                          border: "none",
                          color: "white",
                          padding: "10px 24px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontFamily: "Georgia, serif",
                          fontSize: "13px",
                        }}
                      >
                        Ver Respuesta
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Back */}
              {flashcard.flipped && (
                <div>
                  <div style={{ fontSize: "11px", letterSpacing: "3px", color: currentCat?.accent, marginBottom: "8px" }}>
                    {currentCat?.categoria} · {currentFlashcard?.nombre}
                  </div>

                  {quizMode && quizAnswer && (
                    <div style={{ background: "#1c2333", border: "1px solid #30363d", borderRadius: "6px", padding: "12px", marginBottom: "16px" }}>
                      <div style={{ fontSize: "11px", color: "#8b949e", marginBottom: "4px" }}>Tu respuesta:</div>
                      <div style={{ fontSize: "13px", color: "#c9d1d9" }}>{quizAnswer}</div>
                    </div>
                  )}

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "11px", color: "#8b949e", marginBottom: "4px", letterSpacing: "1px" }}>DEFINICIÓN</div>
                    <div style={{ fontSize: "14px", color: "#e6edf3", lineHeight: "1.7" }}>{currentFlashcard?.definicion}</div>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ fontSize: "11px", color: "#8b949e", marginBottom: "4px", letterSpacing: "1px" }}>PROPÓSITO</div>
                    <div style={{ fontSize: "13px", color: "#c9d1d9", fontStyle: "italic", lineHeight: "1.6" }}>{currentFlashcard?.proposito}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "11px", color: "#8b949e", marginBottom: "8px", letterSpacing: "1px" }}>FÓRMULA</div>
                    <div style={{
                      background: "#0d1117",
                      border: `1px solid ${currentCat?.accent}60`,
                      borderRadius: "6px",
                      padding: "12px 16px",
                      fontFamily: "'Courier New', monospace",
                      fontSize: "12px",
                      color: currentCat?.accent,
                      lineHeight: "1.6",
                    }}>
                      {currentFlashcard?.formula}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", gap: "12px", marginTop: "20px", justifyContent: "center" }}>
              <button
                onClick={prevCard}
                style={{
                  background: "#21262d",
                  border: "1px solid #30363d",
                  color: "#e6edf3",
                  padding: "10px 28px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "14px",
                }}
              >
                ← Anterior
              </button>
              <button
                onClick={nextCard}
                style={{
                  background: currentCat?.accent,
                  border: "none",
                  color: "white",
                  padding: "10px 28px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontFamily: "Georgia, serif",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* ============ PRIMARIOS VS SECUNDARIOS ============ */}
        {activeTab === "primarios" && (
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{
              background: "#161b22",
              border: "1px solid #30363d",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "24px",
              fontSize: "14px",
              color: "#8b949e",
              lineHeight: "1.7",
            }}>
              <strong style={{ color: "#e6edf3" }}>Distinción fundamental:</strong> No todo indicador cuantificable es un KPI, y no todos los KPIs tienen el mismo nivel jerárquico dentro del sistema de medición organizacional. Esta clasificación determina la prioridad de atención en el proceso de toma de decisiones estratégicas.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {/* Primarios */}
              <div style={{
                background: "linear-gradient(135deg, #1a2740 0%, #161b22 100%)",
                border: "2px solid #2e86de",
                borderRadius: "10px",
                padding: "28px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "24px" }}>⭐</span>
                  <div>
                    <div style={{ fontSize: "11px", color: "#2e86de", letterSpacing: "2px" }}>NIVEL SUPERIOR</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#e6edf3" }}>KPIs Primarios</div>
                  </div>
                </div>
                <div style={{ fontSize: "13px", color: "#c9d1d9", lineHeight: "1.7", marginBottom: "20px" }}>
                  {primarioSecundario.primarios.definicion}
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px", marginBottom: "8px" }}>CARACTERÍSTICAS</div>
                  {primarioSecundario.primarios.caracteristicas.map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px", fontSize: "13px", color: "#c9d1d9" }}>
                      <span style={{ color: "#2e86de" }}>→</span> {c}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px", marginBottom: "8px" }}>EJEMPLOS</div>
                  {primarioSecundario.primarios.ejemplos.map((e, i) => (
                    <span key={i} style={{
                      display: "inline-block",
                      background: "#2e86de20",
                      border: "1px solid #2e86de40",
                      color: "#2e86de",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      marginRight: "6px",
                      marginBottom: "6px",
                    }}>{e}</span>
                  ))}
                </div>
              </div>

              {/* Secundarios */}
              <div style={{
                background: "linear-gradient(135deg, #1a2030 0%, #161b22 100%)",
                border: "2px solid #8b949e",
                borderRadius: "10px",
                padding: "28px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "24px" }}>🔹</span>
                  <div>
                    <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "2px" }}>NIVEL DE SOPORTE</div>
                    <div style={{ fontSize: "18px", fontWeight: "700", color: "#e6edf3" }}>KPIs Secundarios</div>
                  </div>
                </div>
                <div style={{ fontSize: "13px", color: "#c9d1d9", lineHeight: "1.7", marginBottom: "20px" }}>
                  {primarioSecundario.secundarios.definicion}
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px", marginBottom: "8px" }}>CARACTERÍSTICAS</div>
                  {primarioSecundario.secundarios.caracteristicas.map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px", fontSize: "13px", color: "#c9d1d9" }}>
                      <span style={{ color: "#8b949e" }}>→</span> {c}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#8b949e", letterSpacing: "1px", marginBottom: "8px" }}>EJEMPLOS</div>
                  {primarioSecundario.secundarios.ejemplos.map((e, i) => (
                    <span key={i} style={{
                      display: "inline-block",
                      background: "#8b949e20",
                      border: "1px solid #8b949e40",
                      color: "#8b949e",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      marginRight: "6px",
                      marginBottom: "6px",
                    }}>{e}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ DISEÑO DE KPIs ============ */}
        {activeTab === "diseño" && (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ marginBottom: "32px" }}>
              <div style={{ fontSize: "13px", color: "#2e86de", letterSpacing: "2px", marginBottom: "8px" }}>PRINCIPIOS DE DISEÑO</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { titulo: "Relevancia", desc: "Deben estar alineados con los objetivos estratégicos y operativos de la organización." },
                  { titulo: "Claridad", desc: "Deben ser claros y comprensibles para todos los involucrados en el proceso." },
                  { titulo: "Medible", desc: "Deben ser cuantificables para permitir un seguimiento efectivo y objetivo." },
                  { titulo: "Alcanzable", desc: "Los objetivos establecidos deben ser realistas y alcanzables dentro del contexto organizacional." },
                  { titulo: "Temporalidad", desc: "Deben estar vinculados a un marco temporal específico para medir el progreso." },
                ].map((p, i) => (
                  <div key={i} style={{
                    background: "#161b22",
                    border: "1px solid #30363d",
                    borderLeft: "3px solid #2e86de",
                    borderRadius: "6px",
                    padding: "16px",
                  }}>
                    <div style={{ fontWeight: "700", color: "#2e86de", marginBottom: "6px" }}>{p.titulo}</div>
                    <div style={{ fontSize: "13px", color: "#8b949e", lineHeight: "1.6" }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "13px", color: "#e67e22", letterSpacing: "2px", marginBottom: "16px" }}>PROCESO DE IMPLEMENTACIÓN (SECUENCIA OBLIGATORIA)</div>
              {[
                { num: "01", titulo: "Definir Objetivos Claros", desc: "Comprender los objetivos y metas del negocio antes de diseñar cualquier KPI." },
                { num: "02", titulo: "Identificar Áreas de Rendimiento Clave", desc: "Focalizar en las áreas de rendimiento más críticas para alcanzar los objetivos definidos." },
                { num: "03", titulo: "Establecer KPIs Específicos y Medibles", desc: "Cada KPI debe ser concreto, claro y reflejar el rendimiento en las áreas identificadas." },
                { num: "04", titulo: "Asegurar Alcanzabilidad y Relevancia", desc: "Verificar que los KPIs sean realistas, alcanzables y directamente relevantes para el negocio." },
                { num: "05", titulo: "Planificar Recolección y Análisis de Datos", desc: "Identificar las fuentes de datos y las herramientas necesarias para medir y analizar los KPIs." },
                { num: "06", titulo: "Comunicar y Educar", desc: "Garantizar que todos los stakeholders entiendan los KPIs y su importancia operativa." },
                { num: "07", titulo: "Implementar y Monitorear", desc: "Poner en práctica los KPIs e iniciar el monitoreo regular y sistemático." },
                { num: "08", titulo: "Evaluar y Ajustar", desc: "Revisión continua para asegurar que los KPIs permanezcan relevantes y efectivos a lo largo del tiempo." },
              ].map((step, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "12px",
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    background: "#e67e2220",
                    border: "1px solid #e67e22",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "14px",
                    color: "#e67e22",
                    fontWeight: "700",
                    minWidth: "36px",
                    textAlign: "center",
                  }}>{step.num}</div>
                  <div style={{
                    background: "#161b22",
                    border: "1px solid #21262d",
                    borderRadius: "6px",
                    padding: "12px 16px",
                    flex: 1,
                  }}>
                    <div style={{ fontWeight: "600", color: "#e6edf3", marginBottom: "4px" }}>{step.titulo}</div>
                    <div style={{ fontSize: "13px", color: "#8b949e", lineHeight: "1.6" }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #21262d",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "11px",
        color: "#484f58",
      }}>
        <span>Inteligencia de Negocio · Ingeniería Informática · Universidad de Almería</span>
        <span>Basado en material oficial del profesor · pp. 5–35</span>
      </div>
    </div>
  );
}
