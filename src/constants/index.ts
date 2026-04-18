import type { Alert } from '../types';

export const APP_NAME = 'SafePath';

// ─── Mock alerts ─────────────────────────────────────────────────────────────
export const MOCK_ALERTS: Alert[] = [
  {
    id: '1', guestName: 'Rahul Mehta', roomNumber: 102, floor: 1, severity: 5,
    message: 'Fire visible in corridor', timestamp: new Date(), status: 'active',
  },
  {
    id: '2', guestName: 'Priya Sharma', roomNumber: 205, floor: 2, severity: 3,
    message: 'Smoke smell in room', timestamp: new Date(Date.now() - 120000), status: 'active',
  },
  {
    id: '3', guestName: 'James Lee', roomNumber: 301, floor: 3, severity: 2,
    message: 'Feeling unsafe, need help', timestamp: new Date(Date.now() - 300000), status: 'active',
  },
  {
    id: '4', guestName: 'Sara Khan', roomNumber: 104, floor: 1, severity: 4,
    message: 'Trapped, door not opening', timestamp: new Date(Date.now() - 60000), status: 'active',
  },
];

// ─── 30-room hotel (used by legacy FloorPlan; HotelMap builds its own layout) ─
export const ROOMS = [
  // Floor 1
  { id: '101', label: '101', x: 40,  y: 60,  width: 80, height: 60, floor: 1 },
  { id: '102', label: '102', x: 40,  y: 130, width: 80, height: 60, floor: 1 },
  { id: '103', label: '103', x: 40,  y: 200, width: 80, height: 60, floor: 1 },
  { id: '104', label: '104', x: 300, y: 60,  width: 80, height: 60, floor: 1 },
  { id: '105', label: '105', x: 300, y: 130, width: 80, height: 60, floor: 1 },
  { id: '106', label: '106', x: 300, y: 200, width: 80, height: 60, floor: 1 },
];

// ─── Priority rooms (Responder Portal) ───────────────────────────────────────
export const MOCK_PRIORITY_ROOMS = [
  { rank: 1, roomNumber: 102, floor: 1, elapsedMinutes: 8, status: 'unconfirmed' as const },
  { rank: 2, roomNumber: 301, floor: 3, elapsedMinutes: 5, status: 'unconfirmed' as const },
  { rank: 3, roomNumber: 104, floor: 1, elapsedMinutes: 2, status: 'acknowledged' as const },
];

// ─── Event log (Responder Portal) ────────────────────────────────────────────
export const MOCK_EVENTS = [
  { time: '14:32', text: 'Alert received — Room 102, Floor 1, Severity 5', color: 'red' },
  { time: '14:33', text: 'Danger zone marked — Corridor B, Floor 1',       color: 'amber' },
  { time: '14:35', text: 'Broadcast sent — All guests',                     color: 'blue' },
  { time: '14:36', text: 'Route recalculated for 4 guests',                 color: 'green' },
  { time: '14:38', text: 'Alert received — Room 301, Floor 3, Severity 4', color: 'red' },
];
