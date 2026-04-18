export interface GuestProfile {
  id: string;
  name: string;
  roomNumber: number;
  floor: number;
  language: string;
  email?: string;
  mobile?: string;
  qrToken?: string;
  checkinDatetime?: string;
  checkedIn: boolean;
}

export interface Alert {
  id: string;
  guestName: string;
  roomNumber: number;
  floor: number;
  severity: 1 | 2 | 3 | 4 | 5;
  message: string;
  timestamp: Date;
  status: "active" | "acknowledged";
}

export interface DangerZone {
  roomId: string;
  level: "warning" | "danger";
}

export interface PriorityRoom {
  rank: number;
  roomNumber: number;
  floor: number;
  elapsedMinutes: number;
  status: "unconfirmed" | "acknowledged";
}

export interface BroadcastMessage {
  target: "all" | "floor1" | "floor2" | "floor3";
  message: string;
  timestamp: Date;
}

export type UserRole = "guest" | "staff" | "responder";
