import { Project } from '../models/project.model';
import { Experience } from '../models/experience.model';
import { SkillCategory } from '../models/skill.model';

export const PROJECTS: Project[] = [
  {
    id: 'printy',
    title: 'Printy.ar',
    status: 'EN PRODUCCIÓN',
    category: 'SaaS B2B2C',
    categoryIcon: 'fa-solid fa-print',
    categoryColor: 'text-emerald-400',
    gradientTo: 'to-indigo-950',
    badge: 'Go + Angular',
    star: {
      situation:
        'Los talleres de sublimación y estampado carecían de una herramienta interactiva para que sus clientes diseñaran prendas a medida.',
      task: 'Crear un producto SaaS escalable que permitiera a los talleres cargar remeras/bolsas y a sus clientes personalizarlas en tiempo real.',
      action:
        'Desarrollé el frontend dinámico en Angular (diseñador visual interactivo) y un backend de alto rendimiento y ultra concurrente en Go (Golang).',
      result:
        'SaaS 100% operativo en producción. Los clientes de los talleres ahora diseñan en vivo, acelerando los tiempos de venta del rubro.',
    },
    tags: ['Angular', 'Go', 'PostgreSQL', 'MercadoPago', 'Pintrest API'],
    linkLabel: 'Probar SaaS',
    linkColor: 'text-emerald-400 hover:text-emerald-300',
    url: 'https://printy.ar/',
  },
  {
    id: 'daily-scrum',
    title: 'Daily Scrum Master IA',
    status: 'EN PRODUCCIÓN',
    category: 'iceScrum Integration',
    categoryIcon: 'fa-solid fa-clock-rotate-left',
    categoryColor: 'text-indigo-400',
    gradientTo: 'to-violet-950',
    badge: 'React + Node.js',
    star: {
      situation:
        'Las reuniones diarias ágiles requerían un control estricto de tiempos y sistematización para evitar desvíos e ineficiencias.',
      task: 'Diseñar una aplicación interactiva que se conecte a iceScrum para gestionar, temporizar y estructurar la Daily de forma aleatoria.',
      action:
        'Desarrollé la aplicación con integración iceScrum (proxy Go), cronómetros por speaker, rotación aleatoria, panel de tareas/historias del sprint y persistencia de métricas en Firestore.',
      result:
        'Un gestor automatizado en producción que controla tiempos, expone el backlog en vivo durante la Daily y entrega reportes listos para el equipo ágil.',
    },
    tags: ['React', 'Node-js','Firestore', 'iceScrum API'],
    linkLabel: 'Iniciar Daily',
    linkColor: 'text-indigo-400 hover:text-indigo-300',
    url: 'https://daily-sm.netlify.app/',
  },
  {
    id: 'filosofar',
    title: 'Filosofar en Magia',
    status: 'EN PRODUCCIÓN',
    category: 'E-commerce Conversacional',
    categoryIcon: 'fa-solid fa-book-open',
    categoryColor: 'text-violet-400',
    gradientTo: 'to-emerald-950',
    badge: 'React + Node.js',
    star: {
      situation:
        'Los embudos de venta tradicionales de libros digitales son planos, pasivos y tienen una tasa de conversión predecible y baja.',
      task: 'Crear un sitio web inmersivo que venda el libro a través del diálogo interactivo, la gamificación y la persuasión contextual de una IA.',
      action:
        'Implementé un frontend en Angular con un motor de lenguaje natural (Google AI Studio) y una pasarela de pago real integrada con Mercado Pago.',
      result:
        'Landing conversacional exitosa que educa al lector de forma activa e incrementa las compras impulsivas gracias al checkout integrado.',
    },
    tags: ['MercadoPago', 'LLM Funnel'],
    linkLabel: 'Visitar Sitio',
    linkColor: 'text-violet-400 hover:text-violet-300',
    url: 'https://filosofar-en-tiempos-de-magia-102741510725.us-west1.run.app/',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'hms',
    role: 'Liderazgo Técnico',
    title: 'Frontend Tech Lead & Specialist Developer',
    company: 'Health Management Solutions',
    period: '04/2023 - Presente',
    location: 'Remoto - Buenos Aires, Argentina',
    badge: 'Liderazgo Técnico',
    badgeStyle: 'active',
    highlights: [
      'Diseño y arquitectura de aplicaciones web robustas y escalables con <strong>Angular (TypeScript/JavaScript)</strong>, garantizando un rendimiento óptimo bajo estándares corporativos.',
      '<strong>Planificación y Liderazgo Técnico:</strong> Coordinación de tareas para el equipo frontend y definición de prioridades del backlog basadas en requerimientos del negocio.',
      '<strong>Traducción de Historias de Usuario:</strong> Colaboración activa con gerentes de producto e infraestructura para modelar APIs RESTful, garantizando un correcto flujo cliente-servidor.',
      '<strong>Code Reviews:</strong> Aseguro la calidad final y la cohesión de la base de código frente a los criterios de aceptación y arquitectura de negocio establecidos.',
    ],
    tags: ['Angular', 'TypeScript', 'Node.js', 'Scrum Liderazgo', 'Apex', 'PL/SQL & SQL', 'MongoDB'],
  },
  {
    id: 'semillero',
    role: 'Full Stack Developer',
    title: 'Desarrollador Full Stack (Angular + Java)',
    company: 'Semillero Digital',
    period: '09/2022 - 04/2023',
    location: 'Argentina',
    badge: 'Full Stack Developer',
    badgeStyle: 'past',
    projects: [
      {
        label: '# Portal - Municipalidad de Mendoza:',
        description:
          'Colaboré en el desarrollo del frontend con Angular para el portal de empleo e impulso del ecosistema empresarial regional de Mendoza.',
      },
      {
        label: '# Huerta Digital "El Tomillo":',
        description:
          'Desarrollé tanto el frontend interactivo en Angular como los microservicios del backend utilizando Java + Spring Boot, conectándolo con bases de datos MySQL.',
      },
    ],
    highlights: [],
    tags: ['Angular', 'Java', 'Spring Boot', 'MySQL'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Core',
    subtitle: 'Especialidad principal',
    icon: 'fa-brands fa-angular',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-400',
    iconBorder: 'border-red-500/20',
    skills: [
      { name: 'Angular (Standalone & Signals)', level: 'Avanzado', percent: 95, gradientFrom: 'from-red-500', gradientTo: 'to-indigo-500' },
      { name: 'TypeScript & JavaScript', level: 'Avanzado', percent: 90, gradientFrom: 'from-yellow-500', gradientTo: 'to-indigo-500' },
      { name: 'CSS, SCSS, Tailwind & Material', level: 'Avanzado', percent: 90, gradientFrom: 'from-emerald-500', gradientTo: 'to-indigo-500' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & DB',
    subtitle: 'Escalabilidad y datos',
    icon: 'fa-brands fa-golang',
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-400',
    iconBorder: 'border-cyan-500/20',
    skills: [
      { name: 'Go (Golang) & Node.js Microservicios', level: 'Intermedio', percent: 75, gradientFrom: 'from-cyan-400', gradientTo: 'to-indigo-500' },
      { name: 'PL/SQL & SQL (Oracle, MySQL, PostgreSQL, MongoDB)', level: 'Intermedio', percent: 75, gradientFrom: 'from-emerald-500', gradientTo: 'to-indigo-500' },
      { name: 'Java & Spring Boot', level: 'Básico', percent: 60, gradientFrom: 'from-blue-400', gradientTo: 'to-indigo-500' },
    ],
  },
  {
    id: 'ai',
    title: 'IA & Metodologías',
    subtitle: 'Eficiencia en la entrega',
    icon: 'fa-solid fa-wand-magic-sparkles',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    iconBorder: 'border-violet-500/20',
    skills: [
      { name: 'Prompting & SDD (Spec Driven Dev)', level: 'Experto', percent: 95, gradientFrom: 'from-violet-500', gradientTo: 'to-indigo-500' },
      { name: 'Scrum & Code Reviews', level: 'Avanzado', percent: 90, gradientFrom: 'from-emerald-500', gradientTo: 'to-indigo-500' },
      { name: 'Google AI Studio', level: 'Intermedio', percent: 80, gradientFrom: 'from-indigo-500', gradientTo: 'to-violet-500' },
    ],
  },
];

export const NAV_LINKS = [
  { href: '#about', label: 'Sobre Mí', highlight: false },
  { href: '#projects', label: 'Proyectos en Producción', highlight: false },
  { href: '#playground', label: 'Daily Scrum Demo', highlight: true },
  { href: '#experience', label: 'Trayectoria', highlight: false },
  { href: '#skills', label: 'Habilidades', highlight: false },
  { href: '#contact', label: 'Contactame', highlight: false, cta: true },
];

export const TECH_BADGES = [
  { icon: 'fa-brands fa-angular text-red-500', label: 'Angular 14+' },
  { icon: 'fa-brands fa-golang text-cyan-400 text-lg', label: 'Go (Golang)' },
  { icon: 'fa-solid fa-microchip text-violet-400', label: 'Google AI Studio' },
  { icon: 'fa-solid fa-code text-indigo-400', label: 'SDD Workflow' },
];

export const CONTACT_INFO = {
  email: 'njpinget@gmail.com',
  phone: '+54 3424356919',
  location: 'Santa Fe, Santa Fe, Argentina',
  linkedin: 'https://www.linkedin.com/in/nelson-pinget/',
  github: 'https://github.com',
};
