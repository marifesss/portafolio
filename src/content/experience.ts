import type { Experience } from "@/lib/types";

/** "Discográfica" — professional experience. */
export const experience: Experience[] = [
  {
    company: "Mondelēz International Venezuela",
    role: {
      es: "Pasante de Inteligencia de Ventas",
      en: "Sales Intelligence Intern",
    },
    period: {
      es: "Agosto 2025 — presente",
      en: "August 2025 — present",
    },
    description: {
      es: "Como pasante de Inteligencia de Ventas en Mondelēz Venezuela, trabajo directamente sobre el Data Warehouse en SQL Server, con acceso a la data de todas las regiones del país donde opera la compañía. Los distribuidores alimentan sus bases de datos transaccionales, que se integran al DW mediante ETL; desde ahí, desarrollo consultas SQL complejas para validar información y responder solicitudes estratégicas de gerencia. Mis reportes son utilizados por aproximadamente 100 personas entre representantes, líderes de venta y gerentes en Venezuela.",
      en: "As a Sales Intelligence intern at Mondelēz Venezuela, I work directly with the SQL Server Data Warehouse, with access to data across all regions where the company operates. Distributors feed their transactional databases, which are integrated into the DW via ETL; from there, I write complex SQL queries to validate data and respond to strategic requests from management. My reports are used by approximately 100 people across representatives, sales leaders, and managers in Venezuela.",
    },
    highlights: [
      {
        name: "SORT (Sell Out Reporting Tool)",
        description: {
          es: "Herramienta que centraliza y da visibilidad a todos los reportes de sell out de distribuidores, diseñada para ser expandible a otros tipos de clientes. Desarrollé su documentación técnica y funcional completa.",
          en: "A tool that centralizes and provides visibility into all distributor sell-out reports, designed to be expandable to other client types. I developed its complete technical and functional documentation.",
        },
      },
      {
        name: "DOI (Days of Inventory)",
        description: {
          es: "Reporte de Power BI enfocado en los días de inventario de todos los clientes de Mondelēz. Establecí los métodos de cálculo específicos para cada tipo de cliente.",
          en: "A Power BI report focused on inventory days across all Mondelēz clients. I established the specific calculation methods for each client type.",
        },
      },
    ],
  },
];
