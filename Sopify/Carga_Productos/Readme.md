# Excel → Shopify CSV Converter

![HTML5](https://img.shields.io/badge/HTML5-Estructura-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Estilos-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![Shopify](https://img.shields.io/badge/Shopify-CSV%20Compatible-7AB55C?logo=shopify&logoColor=white)
![SheetJS](https://img.shields.io/badge/SheetJS-Parser%20XLSX-2C3E50)
![Estado](https://img.shields.io/badge/Estado-Estable-brightgreen)

Dashboard web para convertir archivos de productos en Excel (.xlsx / .xls) al formato CSV totalmente compatible con Shopify.

La herramienta procesa los datos directamente en el navegador y genera un archivo CSV basado en el encabezado oficial `product_template.csv` de Shopify.

---

## 📌 Descripción General

Este proyecto fue desarrollado para optimizar la carga masiva de productos en Shopify mediante:

- Lectura y análisis de archivos Excel
- Mapeo dinámico de columnas
- Generación automática de CSV compatible con Shopify
- Validación y vista previa en tiempo real

No requiere backend. Todo el procesamiento ocurre del lado del cliente.

---

## 🗂 Estructura del Proyecto


Carga_Productos/
│
├── index.html # Interfaz principal (Dashboard)
├── styles.css # Estilos modernos del panel
├── app.js # Lógica de lectura y conversión Excel → CSV
└── README.md # Documentación


---

## ⚙️ Funcionamiento

### 1️⃣ Entrada (Excel)

El sistema detecta automáticamente variaciones comunes en los nombres de columnas, por ejemplo:

| Columna en Excel | Campo en Shopify        |
|------------------|-------------------------|
| Articulo         | SKU                     |
| Descripcion      | Title / Description     |
| Existencia       | Inventory quantity      |
| Linea            | Tags                    |
| Proveedor        | Vendor                  |
| Bodega           | Tags                    |
| BU               | Tags                    |

También reconoce variantes como:

- "Artículo"
- "Descripción"
- "Stock"
- "Inventario"

---

### 2️⃣ Procesamiento

El script:

- Normaliza los nombres de columnas
- Genera automáticamente `URL handle` únicos
- Combina etiquetas (Tags)
- Valida campos obligatorios
- Aplica escape correcto para formato CSV
- Inicializa columnas faltantes como vacías según la plantilla oficial

---

### 3️⃣ Salida (CSV para Shopify)

El archivo generado:

- Utiliza el encabezado completo oficial de Shopify
- Rellena los campos esenciales
- Deja vacías las columnas no utilizadas
- Establece valores operativos por defecto:

  - Status → Active  
  - Published on online store → TRUE  
  - Inventory tracker → shopify  
  - Continue selling when out of stock → DENY  
  - Requires shipping → TRUE  
  - Fulfillment service → manual  

---

## 🚀 Cómo Usarlo

1. Abrir `index.html` en el navegador.
2. Arrastrar o seleccionar el archivo Excel.
3. Revisar la vista previa.
4. Presionar **Convertir**.
5. Descargar `shopify_products.csv`.
6. Importar el archivo en el panel de administración de Shopify.

---

## 🧠 Sistema de Validación

El dashboard incluye:

- Verificación de columnas obligatorias
- Advertencias por datos incompletos
- Indicador de estado en tiempo real
- Visualización de metadatos del archivo
- Vista previa de las primeras 12 filas
- Panel de registro (log) de conversión

---

## 🛠 Tecnologías Utilizadas

- HTML5
- CSS3 (variables personalizadas y diseño moderno tipo dashboard)
- JavaScript Vanilla (ES6+)
- SheetJS (parser XLSX vía CDN)

---

## 🔒 Seguridad y Arquitectura

- Procesamiento 100% del lado del cliente
- No requiere servidor
- No almacena datos externamente
- No realiza llamadas a API
- Seguro para uso interno u offline

---

## 📈 Posibles Mejoras Futuras

- Integración directa con la API de Shopify
- Soporte automático para imágenes
- Gestión de precios y costos
- Soporte para variantes de productos
- Panel de configuración personalizada de campos
- Soporte para múltiples hojas de Excel
- Reportes avanzados de validación

---

## 🏷 Casos de Uso

Ideal para:

- Proveedores industriales
- Distribuidores con inventario amplio
- Migraciones masivas a Shopify
- Automatización de catálogos
- Flujos internos de carga de productos

---

## 📄 Licencia

Uso privado / interno.  
Puede modificarse y adaptarse según necesidades del proyecto.

---



## 👨‍💻 Autor

**Bismar Acevedo**  
GitHub: [@bismaracevedo003-del Bismar-Ac](https://github.com/bismaracevedo003-del)

Desarrollado como parte de un flujo interno de automatización para carga masiva en Shopify.
