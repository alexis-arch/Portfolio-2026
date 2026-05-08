import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "fr" | "es";

type Dict = {
  nav: { about: string; work: string; projects: string; contact: string; cta: string };
  hero: {
    eyebrow: string;
    title_1: string;
    title_em: string;
    title_2: string;
    intro: string;
    location: string;
  };
  about: { label: string; p1: string; p2: string };
  experience: {
    label: string;
    items: { role: string; company: string; period: string; location: string; icon: "train" | "bank" | "web" | "medical"; bullets: string[] }[];
    educationLabel: string;
    education: { school: string; degree: string; period: string; description: string }[];
  };
  projects: {
    label: string;
    heading: string;
    items: { title: string; tag: string; description: string }[];
  };
  skills: { label: string };
  contact: {
    label: string;
    heading_1: string;
    heading_em: string;
    heading_2: string;
    email: string;
    linkedin: string;
    github: string;
    footer_left: string;
    footer_right: string;
  };
};

const dictionaries: Record<Lang, Dict> = {
  en: {
    nav: { about: "About", work: "Experience", projects: "Projects", contact: "Contact", cta: "Get in touch" },
    hero: {
      eyebrow: "Portfolio — 2026",
      title_1: "Fullstack engineer building ",
      title_em: "reliable",
      title_2: " software for critical industries.",
      intro:
        "I'm Alexis Feau — Java / Spring Boot & Angular developer at Sopra Steria, working on banking, railway and enterprise platforms.",
      location: "Barcelona, Spain",
    },
    about: {
      label: "About",
      p1: "Master's graduate in Web Development & Information Systems (Ynov Toulouse, 2024), I design and build fullstack solutions for demanding clients — banking (Transactis / Société Générale & La Banque Postale), railway (SNCF Réseau), retail banking IT (BPCE) and healthcare (CHU Toulouse, ENVT).",
      p2: "I work across the whole delivery chain: backend in Java / Spring Boot & Spring Batch, frontend in Angular, CI/CD with Jenkins & GitHub Actions, infrastructure as code with Terraform, and observability with Grafana / Loki / Promtail.",
    },
    experience: {
      label: "Experience",
      items: [
        {
          role: "Java / Spring Boot Developer — SITEL Project",
          company: "SNCF Réseau (via Sopra Steria)",
          period: "Dec 2025 — Apr 2026",
          location: "France",
          icon: "train",
          bullets: [
            "Client: SNCF Réseau, French national railway infrastructure manager (28,000+ km), coordinating circulations with neighbouring infrastructure managers (GI) and railway undertakings (EF) across Europe.",
            "App: SITEL (Système pour l'Interopérabilité TELématique) — strategic interoperability platform exchanging real-time operational data between SNCF Réseau, foreign GIs and EFs.",
            "Feeds GOC tools with cross-border train locations, forecast schedules at border points and Train Ready signals.",
            "Standardises external interfaces in compliance with European TSI.",
            "Java / Spring Boot backend development, unit testing, code quality, build & assembly, test strategy.",
          ],
        },
        {
          role: "Cross-functional Integrator — Transactis",
          company: "Transactis / Société Générale & La Banque Postale (via Sopra Steria)",
          period: "Jan 2025 — Present",
          location: "France",
          icon: "bank",
          bullets: [
            "Client: Transactis (TTIS), 50/50 joint venture between La Banque Postale and Société Générale, managing the IT systems for card payment activities.",
            "Scope: payments platform qualification, SWIFT & filtering apps, payment processing factories, integration of channel/acquisition/restitution apps.",
            "Incident & request lifecycle management on SG's internal ticketing platform; supervision of fixes; full certificate management.",
            "Designed & deployed Grafana / Loki / Promtail monitoring stack with custom dashboards for real-time application & infra health.",
            "Built CI/CD pipelines (GitHub Actions, Jenkins), automated infra provisioning with Terraform, developed internal Express.js microservices.",
            "Linux & PostgreSQL administration.",
          ],
        },
        {
          role: "Fullstack Developer — Banking Monitoring Tool",
          company: "BPCE (Banques Populaires & Caisses d'Épargne, via Infotel)",
          period: "Sep 2023 — Sep 2024",
          location: "France",
          icon: "bank",
          bullets: [
            "Client: BPCE, the second-largest banking group in France.",
            "App: internal banking-services monitoring tool.",
            "Backend: Spring Batch jobs to read, process and persist banking-service logs; Spring Boot REST APIs exposing processed data.",
            "Frontend: Angular UI with interactive dashboard for statistics and configurable alerts on global or service-specific anomalies.",
            "Wrote complete technical documentation; active participation in agile ceremonies.",
          ],
        },
        {
          role: "Web Developer",
          company: "Izianet",
          period: "Sep 2022 — Sep 2023",
          location: "France",
          icon: "web",
          bullets: [
            "Built and personalised 10+ professional websites across various industries with the Drupal CMS, including custom modules.",
            "Successfully migrated three live websites with continuity-of-service guarantee.",
            "Performance & UX optimisation.",
            "Technical administration: SSH-based installation, configuration, deployment, complex migrations with full data backup and integrity.",
          ],
        },
        {
          role: "Web Developer — Healthcare Prediction App",
          company: "CHU Toulouse & École Nationale Vétérinaire de Toulouse (ENVT)",
          period: "Sep 2021 — Aug 2022",
          location: "Toulouse, France",
          icon: "medical",
          bullets: [
            "Designed and built an innovative web app in Symfony + R for medical and veterinary professionals at CHU Toulouse and ENVT.",
            "Predicts the right dosage to prescribe to a patient (CHU) or an animal (ENVT).",
            "Implemented an R algorithm analysing patient data to recommend precise dosing.",
            "End-to-end ownership: requirements, development, testing, validation, technical documentation, user training.",
            "Cross-disciplinary work with medical and veterinary teams.",
          ],
        },
        {
          role: "Web Developer & Integrator",
          company: "Uniweb",
          period: "Mar 2021 — Jun 2021",
          location: "France",
          icon: "web",
          bullets: [
            "Built and integrated client websites following web standards.",
            "Developed custom features, optimised SEO and performance.",
            "Produced wireframes and detailed specifications.",
            "End-to-end view of web projects from requirements to maintenance and performance monitoring.",
            "Contributed to several delivered websites with measurable SEO improvements.",
          ],
        },
      ],
      educationLabel: "Education & Certifications",
      education: [
        {
          school: "Ynov Campus Toulouse",
          degree: "Master's — Web Development, Computer & Information Systems Expert",
          period: "2022 — 2024",
          description: "Certification: Computer & Information Systems Expert (Development & Data) — Ynov, 2025.",
        },
        {
          school: "IUT Paul Sabatier — Toulouse",
          degree: "Bachelor (Licence Pro) DREAM — Mobile App Design & Development",
          period: "2021 — 2022",
          description: "Specialisation in mobile applications design and implementation.",
        },
        {
          school: "IUT Paul Sabatier — Toulouse",
          degree: "DUT MMI — Multimedia & Internet, IT option",
          period: "2019 — 2021",
          description: "Communication, media studies, web & software fundamentals. Opquast Web Quality certification (2021).",
        },
      ],
    },
    projects: {
      label: "Selected Work",
      heading: "A few projects I've had the pleasure of building.",
      items: [
        {
          title: "SITEL — Railway Interoperability Platform",
          tag: "SNCF Réseau · Java · Spring Boot",
          description:
            "Cross-border data exchange platform between SNCF Réseau, foreign infrastructure managers and railway operators, feeding French operational tools (GOC) and standardising interfaces under European TSI.",
        },
        {
          title: "Transactis — Payments Monitoring & DevOps",
          tag: "Société Générale · Grafana · Terraform · Jenkins",
          description:
            "Monitoring stack (Grafana / Loki / Promtail), CI/CD pipelines, Terraform provisioning and Express.js microservices for the SG / La Banque Postale card-payment IT platform.",
        },
        {
          title: "BPCE — Banking Services Monitoring Tool",
          tag: "Spring Batch · Spring Boot · Angular",
          description:
            "Internal tool ingesting banking-service logs through Spring Batch jobs, exposing them via REST APIs and an Angular dashboard with configurable anomaly alerts.",
        },
        {
          title: "CHU & ENVT — Dosage Prediction App",
          tag: "Symfony · R · Healthcare",
          description:
            "Web app combining Symfony and an R algorithm to recommend the right dosage to prescribe to patients or animals, in collaboration with medical and veterinary teams.",
        },
      ],
    },
    skills: { label: "Stack" },
    contact: {
      label: "Contact",
      heading_1: "Let's build something ",
      heading_em: "meaningful",
      heading_2: ".",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      footer_left: "© 2026 Alexis Feau. Crafted with care.",
      footer_right: "Barcelona — Available for opportunities",
    },
  },
  fr: {
    nav: { about: "À propos", work: "Expérience", projects: "Projets", contact: "Contact", cta: "Me contacter" },
    hero: {
      eyebrow: "Portfolio — 2026",
      title_1: "Ingénieur fullstack qui construit des logiciels ",
      title_em: "fiables",
      title_2: " pour des secteurs exigeants.",
      intro:
        "Je suis Alexis Feau — développeur Java / Spring Boot & Angular chez Sopra Steria, je travaille sur des plateformes bancaires, ferroviaires et grands comptes.",
      location: "Barcelone, Espagne",
    },
    about: {
      label: "À propos",
      p1: "Diplômé d'un Master en Développement Web & Systèmes d'Information (Ynov Toulouse, 2024), je conçois et développe des solutions fullstack pour des clients exigeants — bancaire (Transactis / Société Générale & La Banque Postale), ferroviaire (SNCF Réseau), banque de détail (BPCE) et santé (CHU Toulouse, ENVT).",
      p2: "J'interviens sur toute la chaîne : back-end Java / Spring Boot & Spring Batch, front-end Angular, CI/CD Jenkins & GitHub Actions, Infrastructure as Code avec Terraform, observabilité Grafana / Loki / Promtail.",
    },
    experience: {
      label: "Expérience",
      items: [
        {
          role: "Développeur Java / Spring Boot — Projet SITEL",
          company: "SNCF Réseau (via Sopra Steria)",
          period: "Déc. 2025 — Avr. 2026",
          location: "France",
          icon: "train",
          bullets: [
            "Client : SNCF Réseau, gestionnaire de l'infrastructure ferroviaire nationale française (plus de 28 000 km), coordonne les circulations avec les GI voisins et les EF européennes.",
            "Application : SITEL (Système pour l'Interopérabilité TELématique) — plateforme stratégique d'interopérabilité échangeant en temps réel les données opérationnelles entre SNCF Réseau, GI étrangers et EF.",
            "Alimente les outils de GOC : localisation des circulations à l'étranger, horaires prévisionnels aux points-frontière, signaux Train Prêt à partir.",
            "Standardisation des interfaces externes en conformité STI européenne.",
            "Développement back-end Java / Spring Boot, tests unitaires, qualité de code, assemblage, stratégie de test.",
          ],
        },
        {
          role: "Intégrateur Transverse — Transactis",
          company: "Transactis / Société Générale & La Banque Postale (via Sopra Steria)",
          period: "Janv. 2025 — Aujourd'hui",
          location: "France",
          icon: "bank",
          bullets: [
            "Client : Transactis (TTIS), co-entreprise 50/50 entre La Banque Postale et Société Générale, gère les SI des activités monétique.",
            "Périmètre : qualification de la plateforme paiements, applications SWIFT & FILTRAGE, usines de traitement, intégration des applications canaux/acquisition/restitution.",
            "Gestion du cycle de vie des incidents et demandes sur la plateforme interne SG ; supervision des corrections ; gestion complète des certificats.",
            "Conception & déploiement de la stack monitoring Grafana / Loki / Promtail avec dashboards sur mesure.",
            "Pipelines CI/CD GitHub Actions & Jenkins, provisionnement Terraform, microservices internes Express.js.",
            "Administration Linux et PostgreSQL.",
          ],
        },
        {
          role: "Développeur Fullstack — Outil de surveillance bancaire",
          company: "BPCE (Banques Populaires & Caisses d'Épargne, via Infotel)",
          period: "Sept. 2023 — Sept. 2024",
          location: "France",
          icon: "bank",
          bullets: [
            "Client : BPCE, deuxième groupe bancaire français.",
            "Application : outil interne de surveillance des services bancaires.",
            "Back-end : traitements Spring Batch pour lire, traiter et insérer les logs en base ; APIs REST Spring Boot.",
            "Front-end Angular avec tableau de bord interactif et alertes configurables sur anomalies globales ou par service.",
            "Rédaction complète de la documentation technique ; participation active aux cérémonies agiles.",
          ],
        },
        {
          role: "Développeur Web",
          company: "Izianet",
          period: "Sept. 2022 — Sept. 2023",
          location: "France",
          icon: "web",
          bullets: [
            "Création et personnalisation de plus d'une dizaine de sites web professionnels avec le CMS Drupal, dont des modules sur mesure.",
            "Migration réussie de trois sites avec continuité de service.",
            "Optimisation performance et ergonomie.",
            "Administration technique : installation, configuration et déploiement via SSH, migrations complexes avec sauvegarde et intégrité des données.",
          ],
        },
        {
          role: "Développeur Web — Application de prédiction médicale",
          company: "CHU Toulouse & École Nationale Vétérinaire de Toulouse (ENVT)",
          period: "Sept. 2021 — Août 2022",
          location: "Toulouse, France",
          icon: "medical",
          bullets: [
            "Conception d'une application web innovante en Symfony + R pour les professionnels du CHU de Toulouse et de l'ENVT.",
            "Prédit la bonne posologie à prescrire à un patient (CHU) ou à un animal (école vétérinaire).",
            "Algorithme R analysant les données patients pour recommander précisément le nombre de doses.",
            "Prise en charge complète : recueil des besoins, développement, tests, validation, documentation, formation utilisateurs.",
            "Travail interdisciplinaire avec les équipes médicales et vétérinaires.",
          ],
        },
        {
          role: "Développeur & Intégrateur Web",
          company: "Uniweb",
          period: "Mars 2021 — Juin 2021",
          location: "France",
          icon: "web",
          bullets: [
            "Création et intégration de sites internet aux standards du web.",
            "Développement de fonctionnalités sur mesure, optimisation SEO et performance.",
            "Réalisation de wireframes et rédaction de cahiers des charges.",
            "Vision globale du projet web, de l'analyse des besoins à la maintenance.",
            "Contribution mesurable au positionnement SEO de plusieurs sites clients.",
          ],
        },
      ],
      educationLabel: "Formation & Certifications",
      education: [
        {
          school: "Ynov Campus Toulouse",
          degree: "Master — Développement Web, Expert Informatique & Systèmes d'Information",
          period: "2022 — 2024",
          description: "Certification : Expert Informatique et Systèmes d'Information (Développement & Data) — Ynov, 2025.",
        },
        {
          school: "IUT Paul Sabatier — Toulouse",
          degree: "Licence Pro DREAM — Design & Réalisation d'Applications Mobiles",
          period: "2021 — 2022",
          description: "Spécialisation conception et développement d'applications mobiles.",
        },
        {
          school: "IUT Paul Sabatier — Toulouse",
          degree: "DUT MMI — Métiers du Multimédia et de l'Internet, option informatique",
          period: "2019 — 2021",
          description: "Communication, médias, fondamentaux web et logiciel. Certification Opquast Maîtrise Qualité Web (2021).",
        },
      ],
    },
    projects: {
      label: "Projets sélectionnés",
      heading: "Quelques projets que j'ai eu le plaisir de construire.",
      items: [
        {
          title: "SITEL — Plateforme d'interopérabilité ferroviaire",
          tag: "SNCF Réseau · Java · Spring Boot",
          description:
            "Plateforme d'échange de données entre SNCF Réseau, GI étrangers et entreprises ferroviaires, alimentant les outils opérationnels français (GOC) et standardisant les interfaces selon les STI européennes.",
        },
        {
          title: "Transactis — Monitoring paiements & DevOps",
          tag: "Société Générale · Grafana · Terraform · Jenkins",
          description:
            "Stack de monitoring (Grafana / Loki / Promtail), pipelines CI/CD, provisionnement Terraform et microservices Express.js pour la plateforme monétique SG / La Banque Postale.",
        },
        {
          title: "BPCE — Outil de surveillance des services bancaires",
          tag: "Spring Batch · Spring Boot · Angular",
          description:
            "Outil interne ingérant les logs des services bancaires via Spring Batch, les exposant via APIs REST et un dashboard Angular avec alertes configurables sur anomalies.",
        },
        {
          title: "CHU & ENVT — Application de prédiction de doses",
          tag: "Symfony · R · Santé",
          description:
            "Application web combinant Symfony et un algorithme R pour recommander la posologie à prescrire à un patient ou à un animal, en collaboration avec équipes médicales et vétérinaires.",
        },
      ],
    },
    skills: { label: "Technos" },
    contact: {
      label: "Contact",
      heading_1: "Construisons quelque chose de ",
      heading_em: "significatif",
      heading_2: ".",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      footer_left: "© 2026 Alexis Feau. Conçu avec soin.",
      footer_right: "Barcelone — Ouvert aux opportunités",
    },
  },
  es: {
    nav: { about: "Sobre mí", work: "Experiencia", projects: "Proyectos", contact: "Contacto", cta: "Contactar" },
    hero: {
      eyebrow: "Portafolio — 2026",
      title_1: "Ingeniero fullstack creando software ",
      title_em: "fiable",
      title_2: " para sectores exigentes.",
      intro:
        "Soy Alexis Feau — desarrollador Java / Spring Boot & Angular en Sopra Steria, trabajo en plataformas bancarias, ferroviarias y empresariales.",
      location: "Barcelona, España",
    },
    about: {
      label: "Sobre mí",
      p1: "Máster en Desarrollo Web y Sistemas de Información (Ynov Toulouse, 2024), diseño y desarrollo soluciones fullstack para clientes exigentes — banca (Transactis / Société Générale & La Banque Postale), ferrocarril (SNCF Réseau), banca minorista (BPCE) y salud (CHU Toulouse, ENVT).",
      p2: "Intervengo en toda la cadena: backend en Java / Spring Boot & Spring Batch, frontend en Angular, CI/CD con Jenkins y GitHub Actions, infraestructura como código con Terraform y observabilidad con Grafana / Loki / Promtail.",
    },
    experience: {
      label: "Experiencia",
      items: [
        {
          role: "Desarrollador Java / Spring Boot — Proyecto SITEL",
          company: "SNCF Réseau (vía Sopra Steria)",
          period: "Dic 2025 — Abr 2026",
          location: "Francia",
          icon: "train",
          bullets: [
            "Cliente: SNCF Réseau, gestor de la infraestructura ferroviaria nacional francesa (más de 28 000 km), coordina las circulaciones con los GI vecinos y las EF europeas.",
            "Aplicación: SITEL — plataforma estratégica de interoperabilidad que intercambia en tiempo real los datos operativos entre SNCF Réseau, GI extranjeros y EF.",
            "Alimenta las herramientas de GOC: localización de trenes en el extranjero, horarios previstos en puntos fronterizos, señales de Tren Listo.",
            "Estandariza las interfaces externas en conformidad con las ETI europeas.",
            "Desarrollo backend Java / Spring Boot, pruebas unitarias, calidad de código, ensamblado, estrategia de pruebas.",
          ],
        },
        {
          role: "Integrador Transversal — Transactis",
          company: "Transactis / Société Générale & La Banque Postale (vía Sopra Steria)",
          period: "Ene 2025 — Actualidad",
          location: "Francia",
          icon: "bank",
          bullets: [
            "Cliente: Transactis (TTIS), joint venture al 50/50 entre La Banque Postale y Société Générale, gestiona los SI de la actividad monética.",
            "Alcance: cualificación de la plataforma de pagos, SWIFT y filtrado, fábricas de procesamiento, integración de aplicaciones de canales/adquisición/restitución.",
            "Gestión del ciclo de vida de incidentes en la plataforma interna SG; supervisión de correcciones; gestión completa de certificados.",
            "Diseño y despliegue del stack Grafana / Loki / Promtail con dashboards a medida.",
            "Pipelines CI/CD con GitHub Actions y Jenkins, aprovisionamiento Terraform, microservicios internos Express.js.",
            "Administración Linux y PostgreSQL.",
          ],
        },
        {
          role: "Desarrollador Fullstack — Herramienta de supervisión bancaria",
          company: "BPCE (Banques Populaires & Caisses d'Épargne, vía Infotel)",
          period: "Sep 2023 — Sep 2024",
          location: "Francia",
          icon: "bank",
          bullets: [
            "Cliente: BPCE, segundo grupo bancario de Francia.",
            "Aplicación: herramienta interna de supervisión de servicios bancarios.",
            "Backend: Spring Batch para procesar logs; APIs REST Spring Boot.",
            "Frontend Angular con dashboard interactivo y alertas configurables sobre anomalías.",
            "Documentación técnica completa; participación activa en ceremonias ágiles.",
          ],
        },
        {
          role: "Desarrollador Web",
          company: "Izianet",
          period: "Sep 2022 — Sep 2023",
          location: "Francia",
          icon: "web",
          bullets: [
            "Creación y personalización de más de diez sitios web profesionales con el CMS Drupal, incluyendo módulos a medida.",
            "Migración con éxito de tres sitios con continuidad de servicio.",
            "Optimización de rendimiento y UX.",
            "Administración técnica: instalación, configuración y despliegue vía SSH, migraciones complejas con integridad de datos.",
          ],
        },
        {
          role: "Desarrollador Web — App de predicción médica",
          company: "CHU Toulouse y Escuela Nacional Veterinaria de Toulouse (ENVT)",
          period: "Sep 2021 — Ago 2022",
          location: "Toulouse, Francia",
          icon: "medical",
          bullets: [
            "Diseño de una aplicación web innovadora en Symfony + R para profesionales del CHU de Toulouse y de la ENVT.",
            "Predice la dosis adecuada para un paciente (CHU) o un animal (escuela veterinaria).",
            "Algoritmo R que analiza los datos del paciente para recomendar con precisión la dosis.",
            "Gestión completa: requisitos, desarrollo, pruebas, validación, documentación, formación.",
            "Trabajo interdisciplinario con equipos médicos y veterinarios.",
          ],
        },
        {
          role: "Desarrollador e Integrador Web",
          company: "Uniweb",
          period: "Mar 2021 — Jun 2021",
          location: "Francia",
          icon: "web",
          bullets: [
            "Creación e integración de sitios web siguiendo estándares.",
            "Desarrollo de funcionalidades a medida, optimización SEO y de rendimiento.",
            "Wireframes y pliegos de especificaciones.",
            "Visión global del proyecto web, del análisis al mantenimiento.",
            "Mejora medible del posicionamiento SEO de varios sitios cliente.",
          ],
        },
      ],
      educationLabel: "Formación y Certificaciones",
      education: [
        {
          school: "Ynov Campus Toulouse",
          degree: "Máster — Desarrollo Web, Experto en Informática y Sistemas de Información",
          period: "2022 — 2024",
          description: "Certificación: Experto en Informática y Sistemas de Información (Desarrollo y Data) — Ynov, 2025.",
        },
        {
          school: "IUT Paul Sabatier — Toulouse",
          degree: "Licenciatura Profesional DREAM — Diseño y Desarrollo de Aplicaciones Móviles",
          period: "2021 — 2022",
          description: "Especialización en concepción y desarrollo de aplicaciones móviles.",
        },
        {
          school: "IUT Paul Sabatier — Toulouse",
          degree: "DUT MMI — Multimedia e Internet, opción informática",
          period: "2019 — 2021",
          description: "Comunicación, medios, fundamentos web y software. Certificación Opquast Calidad Web (2021).",
        },
      ],
    },
    projects: {
      label: "Trabajos seleccionados",
      heading: "Algunos proyectos que he tenido el placer de construir.",
      items: [
        {
          title: "SITEL — Plataforma de interoperabilidad ferroviaria",
          tag: "SNCF Réseau · Java · Spring Boot",
          description:
            "Plataforma de intercambio de datos entre SNCF Réseau, GI extranjeros y empresas ferroviarias, que alimenta las herramientas operativas francesas (GOC) y estandariza las interfaces según las ETI europeas.",
        },
        {
          title: "Transactis — Monitorización de pagos y DevOps",
          tag: "Société Générale · Grafana · Terraform · Jenkins",
          description:
            "Stack de monitorización (Grafana / Loki / Promtail), pipelines CI/CD, aprovisionamiento Terraform y microservicios Express.js para la plataforma monética SG / La Banque Postale.",
        },
        {
          title: "BPCE — Herramienta de supervisión bancaria",
          tag: "Spring Batch · Spring Boot · Angular",
          description:
            "Herramienta interna que ingiere logs de servicios bancarios mediante Spring Batch, los expone vía APIs REST y un dashboard Angular con alertas configurables.",
        },
        {
          title: "CHU & ENVT — App de predicción de dosis",
          tag: "Symfony · R · Salud",
          description:
            "Aplicación web que combina Symfony y un algoritmo R para recomendar la dosis a prescribir a pacientes o animales, en colaboración con equipos médicos y veterinarios.",
        },
      ],
    },
    skills: { label: "Stack" },
    contact: {
      label: "Contacto",
      heading_1: "Construyamos algo ",
      heading_em: "significativo",
      heading_2: ".",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      footer_left: "© 2026 Alexis Feau. Hecho con cuidado.",
      footer_right: "Barcelona — Abierto a oportunidades",
    },
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};