# 🚢 MV-OCEANWATCH-01: Sistema de Telemetría IoT Marítima

---

Este proyecto consiste en un **ecosistema de telemetría en tiempo real** para el monitoreo de buques comerciales. El sistema simula la captura de datos críticos de navegación, los procesa a través de una API local, los almacena de forma segura en la nube y los despliega en un panel web dinámico con una estética profesional.

## 📡 Características del Sistema de Telemetría

* 🛰️ **Conversión de Coordenadas GMS:** El frontend transforma automáticamente los datos geográficos decimales del servidor al formato náutico tradicional de **Grados, Minutos y Segundos (GMS)**.

* 🧭 **Instrumentación Avanzada:** Una brújula digital interactiva calcula y rota la aguja magnética según el rumbo real del buque (`heading`).

* ☁️ **Persistencia en la Nube:** Integración directa con **AWS DynamoDB** para registrar el historial de navegación de la nave segundo a segundo de manera escalable.

* 🔒 **Arquitectura Resiliente:** El backend cuenta con políticas de CORS optimizadas para un tráfico seguro, y la interfaz gráfica incluye un sistema de manejo de errores que detecta fallas de conexión.

## 📂 Estructura del Proyecto

```text
├── public/
│   ├── index.html      # Interfaz de usuario (Panel TRON, Brújula y GMS)
│   └── css/            # Estilos visuales y animaciones de neón
├── servidor.js         # API REST en Express y conexión segura a AWS DynamoDB
├── simulador.js        # Script de generación de datos de telemetría IoT
├── .gitignore          # Archivo de exclusión para proteger credenciales (.env)
└── package.json        # Dependencias del proyecto (dotenv, @aws-sdk)
