import type { Experience } from "@/lib/types";

/** "Discográfica" — professional experience. */
export const experience: Experience[] = [
  {
    company: "Mondelēz International Venezuela",
    role: {
      es: "Analista de Proyectos Comerciales",
      en: "Commercial Projects Analyst",
    },
    period: {
      es: "Agosto 2026 — presente",
      en: "August 2026 — present",
    },
    description: {
      es: "Desde agosto de 2026 soy Analista de Proyectos Comerciales en Mondelēz Venezuela, un rol con enfoque de product manager: evalúo los requisitos y requerimientos de las distintas áreas del negocio y, a partir de ellos, defino y llevo a cabo los proyectos necesarios para optimizar los procesos dentro de la compañía.",
      en: "Since August 2026 I've been a Commercial Projects Analyst at Mondelēz Venezuela, a role with a product-management focus: I evaluate the requirements of the different business areas and, from them, define and carry out the projects needed to optimize processes across the company.",
    },
    cover: "/images/mondelez/mondelez-introduced.avif",
    highlights: [],
  },
  {
    company: "Mondelēz International Venezuela",
    role: {
      es: "Pasante de Inteligencia de Ventas",
      en: "Sales Intelligence Intern",
    },
    period: {
      // TODO: confirm the internship end month (assumed July 2026, right before the analyst role).
      es: "Agosto 2025 — Julio 2026",
      en: "August 2025 — July 2026",
    },
    scope: {
      es: "Todas las regiones de Venezuela",
      en: "All regions of Venezuela",
    },
    reach: {
      es: "~65 usuarios (analistas, representantes, líderes y gerentes)",
      en: "~65 users (analysts, representatives, sales leaders, and managers)",
    },
    tools: ["SQL Server DW", "ETL", "SQL", "Power BI"],
    cover: "/images/mondelez/mondelez-introduced.avif",
    description: {
      es: "Como pasante de Inteligencia de Ventas en Mondelēz Venezuela, trabajé directamente sobre el Data Warehouse en SQL Server, con acceso a la data de todas las regiones del país donde opera la compañía. Los distribuidores alimentan sus bases de datos transaccionales, que se integran al DW mediante ETL; desde ahí, desarrollé consultas SQL complejas para validar información y responder solicitudes estratégicas de gerencia. Mis reportes son utilizados por aproximadamente 65 personas entre analistas, representantes, líderes de venta y gerentes en Venezuela.",
      en: "As a Sales Intelligence intern at Mondelēz Venezuela, I worked directly with the SQL Server Data Warehouse, with access to data across all regions where the company operates. Distributors feed their transactional databases, which are integrated into the DW via ETL; from there, I wrote complex SQL queries to validate data and respond to strategic requests from management. My reports are used by approximately 65 people across analysts, representatives, sales leaders, and managers in Venezuela.",
    },
    highlights: [
      {
        name: "SORT (Sell Out Reporting Tool)",
        description: {
          es: "Herramienta que centraliza y da visibilidad a todos los reportes de sell out de distribuidores, diseñada para ser expandible a otros tipos de clientes. Desarrollé las consultas de búsqueda, las visuales en Power BI y su documentación técnica y funcional completa.",
          en: "A tool that centralizes and provides visibility into all distributor sell-out reports, designed to be expandable to other client types. I developed the search queries, the visuals in Power BI and its complete technical and functional documentation.",
        },
      },
      {
        name: "DOI (Days of Inventory)",
        description: {
          es: "Reporte de Power BI enfocado en los días de inventario de todos los clientes de Mondelēz. Establecí los métodos de cálculo específicos para cada tipo de cliente, las visuales en Power BI y su documentación técnica y funcional completa.",
          en: "A Power BI report focused on inventory days across all Mondelēz clients. I established the specific calculation methods for each client type, the visuals in Power BI and its complete technical and functional documentation.",
        },
      },
    ],
  },
];
