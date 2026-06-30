import {
  DemoStory,
  IceProject,
  IceUser,
  MockHistorySession,
  Task,
} from '../models/daily-demo.model';

export const PRODUCTION_DAILY_URL =
  'https://daily-sm.netlify.app/';

export const MOCK_SPRINT_NAME = 'R5S18';

export const MOCK_ICE_PROJECTS: IceProject[] = [
  { id: 1, pkey: 'IAPROCHMS', name: 'IA Procesos HMS' },
  { id: 2, pkey: 'INFRAESTRU', name: 'Infraestructura' },
  { id: 3, pkey: 'PORTALAUTO', name: 'Portal Autogestión' },
  { id: 4, pkey: 'IMPLEMODEL', name: 'Implementación Modelos' },
  { id: 5, pkey: 'OSDE', name: 'OSDE Integración' },
  { id: 6, pkey: 'SCISOPER', name: 'SciS Operaciones' },
  { id: 7, pkey: 'EVOSUITE', name: 'EvoSuite Core' },
  { id: 8, pkey: 'PORTALEMP', name: 'Portal Empleo' },
  { id: 9, pkey: 'HUERTADIG', name: 'Huerta Digital' },
  { id: 10, pkey: 'PRINTY', name: 'Printy SaaS' },
];

export const MOCK_ICE_USERS: IceUser[] = [
  {
    id: 1,
    nombre: 'Nelson Pinget',
    projects: [
      { pkey: 'INFRAESTRU', sprintId: 18 },
      { pkey: 'EVOSUITE', sprintId: 18 },
    ],
  },
  {
    id: 2,
    nombre: 'Mariano Cruz',
    projects: [{ pkey: 'PORTALAUTO', sprintId: 18 }],
  },
  {
    id: 3,
    nombre: 'Omar Laurans',
    projects: [{ pkey: 'IAPROCHMS', sprintId: 18 }],
  },
  {
    id: 4,
    nombre: 'Alexis Molina',
    projects: [{ pkey: 'OSDE', sprintId: 18 }],
  },
  {
    id: 5,
    nombre: 'Nahuel Alamo',
    projects: [{ pkey: 'SCISOPER', sprintId: 18 }],
  },
  {
    id: 6,
    nombre: 'Juan ignacio DE GAETANO',
    projects: [{ pkey: 'IMPLEMODEL', sprintId: 18 }],
  },
];

export const INITIAL_DEMO_TASKS: Task[] = [
  {
    name: 'Nivelar funcionalidad de demo',
    projectKey: 'EVOSUITE',
    state: 1,
    responsible: { id: 1 },
    parentStory: { name: 'CU-003 Refactor módulo demo' },
  },
  {
    name: 'Qr reintegros - DB y Forms',
    projectKey: 'EVOSUITE',
    state: 0,
    responsible: { id: 1 },
    parentStory: { name: 'CU-003 Refactor módulo demo' },
  },
  {
    name: 'Actualizar dirección de facturación',
    projectKey: 'INFRAESTRU',
    state: 2,
    doneDate: '2026-06-01',
    responsible: { id: 1 },
    parentStory: { name: 'CU-001 Billing address' },
  },
  {
    name: 'Implementar validación de datos',
    projectKey: 'INFRAESTRU',
    state: 2,
    doneDate: '2026-06-01',
    responsible: { id: 1 },
    parentStory: { name: 'CU-002 Validación API' },
  },
  {
    name: 'Configurar webhooks',
    projectKey: 'INFRAESTRU',
    state: 2,
    doneDate: '2026-05-30',
    responsible: { id: 1 },
    parentStory: { name: 'CU-002 Validación API' },
  },
  {
    name: 'Pruebas de integración',
    projectKey: 'EVOSUITE',
    state: 2,
    doneDate: '2026-05-29',
    responsible: { id: 1 },
    parentStory: { name: 'CU-004 QA Sprint' },
  },
  {
    name: 'Documentación técnica',
    projectKey: 'EVOSUITE',
    state: 2,
    doneDate: '2026-05-28',
    responsible: { id: 1 },
    parentStory: { name: 'CU-004 QA Sprint' },
  },
  {
    name: 'Migración de endpoints legacy',
    projectKey: 'INFRAESTRU',
    state: 2,
    doneDate: '2026-05-27',
    responsible: { id: 1 },
    parentStory: { name: 'CU-001 Billing address' },
  },
  {
    name: 'Fix timeout en servicio auth',
    projectKey: 'INFRAESTRU',
    state: 2,
    doneDate: '2026-05-26',
    responsible: { id: 1 },
    parentStory: { name: 'CU-001 Billing address' },
  },
  {
    name: 'Refactor componente dashboard',
    projectKey: 'EVOSUITE',
    state: 2,
    doneDate: '2026-05-25',
    responsible: { id: 1 },
    parentStory: { name: 'CU-003 Refactor módulo demo' },
  },
  {
    name: 'Optimizar queries SQL',
    projectKey: 'INFRAESTRU',
    state: 2,
    doneDate: '2026-05-24',
    responsible: { id: 1 },
    parentStory: { name: 'CU-002 Validación API' },
  },
  {
    name: 'Setup CI/CD pipeline',
    projectKey: 'EVOSUITE',
    state: 2,
    doneDate: '2026-05-23',
    responsible: { id: 1 },
    parentStory: { name: 'CU-004 QA Sprint' },
  },
  {
    name: 'Review PR #142',
    projectKey: 'INFRAESTRU',
    state: 2,
    doneDate: '2026-05-22',
    responsible: { id: 1 },
    parentStory: { name: 'CU-002 Validación API' },
  },
  {
    name: 'Actualizar dependencias Angular',
    projectKey: 'EVOSUITE',
    state: 2,
    doneDate: '2026-05-21',
    responsible: { id: 1 },
    parentStory: { name: 'CU-003 Refactor módulo demo' },
  },
  {
    name: 'Corregir bug en formulario',
    projectKey: 'INFRAESTRU',
    state: 2,
    doneDate: '2026-05-20',
    responsible: { id: 1 },
    parentStory: { name: 'CU-001 Billing address' },
  },
  {
    name: 'Implementar cache Redis',
    projectKey: 'EVOSUITE',
    state: 2,
    doneDate: '2026-05-19',
    responsible: { id: 1 },
    parentStory: { name: 'CU-004 QA Sprint' },
  },
  {
    name: 'Diseño modal confirmación',
    projectKey: 'INFRAESTRU',
    state: 2,
    doneDate: '2026-05-18',
    responsible: { id: 1 },
    parentStory: { name: 'CU-001 Billing address' },
  },
  {
    name: 'Sync iceScrum API v2',
    projectKey: 'EVOSUITE',
    state: 2,
    doneDate: '2026-05-17',
    responsible: { id: 1 },
    parentStory: { name: 'CU-003 Refactor módulo demo' },
  },
  {
    name: 'Portal autoservicio - login',
    projectKey: 'PORTALAUTO',
    state: 1,
    responsible: { id: 2 },
    parentStory: { name: 'US-Portal Login' },
  },
  {
    name: 'OSDE - integración API',
    projectKey: 'OSDE',
    state: 0,
    responsible: { id: 4 },
    parentStory: { name: 'US-OSDE Sync' },
  },
];

export const INITIAL_DEMO_STORIES: DemoStory[] = [
  {
    code: 'CU-001',
    name: 'Como usuario quiero actualizar mi dirección de facturación',
    effort: 5,
    progress: 100,
    status: 'Completado',
  },
  {
    code: 'CU-002',
    name: 'Validación de datos en formularios de registro',
    effort: 8,
    progress: 100,
    status: 'Completado',
  },
  {
    code: 'CU-003',
    name: 'Refactor del módulo demo interactivo',
    effort: 13,
    progress: 63,
    status: 'En progreso',
  },
  {
    code: 'CU-004',
    name: 'Suite de pruebas de integración end-to-end',
    effort: 8,
    progress: 100,
    status: 'Completado',
  },
  {
    code: 'CU-005',
    name: 'Optimización de rendimiento en listados',
    effort: 5,
    progress: 0,
    status: 'Pendiente',
  },
  {
    code: 'CU-006',
    name: 'Integración con proxy Go para iceScrum',
    effort: 13,
    progress: 40,
    status: 'En progreso',
  },
];

export const MOCK_HISTORY_SESSIONS: MockHistorySession[] = [
  {
    id: 'session-001',
    date: Date.now() - 86400000 * 2,
    globalTimer: 3720,
    participantsCount: 6,
    pauseCount: 1,
    totalPauseSeconds: 45,
    delaySeconds: 180,
    projectKeys: ['INFRAESTRU', 'EVOSUITE'],
    results: [
      { name: 'Nelson Pinget', time: 89, pauseTime: 45, isLate: true, isDelayed: true, skipped: false, isParkingLot: false },
      { name: 'Mariano Cruz', time: 52, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Nahuel Alamo', time: 28, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Omar Laurans', time: 61, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Alexis Molina', time: 0, pauseTime: 0, isLate: false, isDelayed: false, skipped: true, isParkingLot: false },
      { name: 'Preguntas / Parking Lot', time: 120, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: true },
    ],
  },
  {
    id: 'session-002',
    date: Date.now() - 86400000 * 5,
    globalTimer: 2940,
    participantsCount: 5,
    pauseCount: 0,
    totalPauseSeconds: 0,
    delaySeconds: -120,
    projectKeys: ['PORTALAUTO', 'OSDE'],
    results: [
      { name: 'Mariano Cruz', time: 45, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Nelson Pinget', time: 72, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Juan ignacio DE GAETANO', time: 38, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Nahuel Alamo', time: 22, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Preguntas / Parking Lot', time: 95, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: true },
    ],
  },
  {
    id: 'session-003',
    date: Date.now() - 86400000 * 9,
    globalTimer: 4200,
    participantsCount: 7,
    pauseCount: 2,
    totalPauseSeconds: 120,
    delaySeconds: 300,
    projectKeys: ['IAPROCHMS', 'SCISOPER', 'IMPLEMODEL'],
    results: [
      { name: 'Omar Laurans', time: 55, pauseTime: 60, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Nelson Pinget', time: 110, pauseTime: 60, isLate: true, isDelayed: true, skipped: false, isParkingLot: false },
      { name: 'Alexis Molina', time: 48, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Mariano Cruz', time: 65, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Nahuel Alamo', time: 18, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Juan ignacio DE GAETANO', time: 42, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: false },
      { name: 'Preguntas / Parking Lot', time: 150, pauseTime: 0, isLate: false, isDelayed: false, skipped: false, isParkingLot: true },
    ],
  },
];

export function cloneTasks(tasks: Task[]): Task[] {
  return tasks.map((t) => ({ ...t, responsible: t.responsible ? { ...t.responsible } : undefined, parentStory: t.parentStory ? { ...t.parentStory } : undefined }));
}

export function cloneStories(stories: DemoStory[]): DemoStory[] {
  return stories.map((s) => ({ ...s }));
}
