# SafePath: Emergency Response System

An **AI-Powered Emergency Guidance System** for Hospitals.

This project enhances resident safety and staff responsiveness during emergencies using real-time floor maps, broadcast communications, and dynamic SOS tools.

## Features
- **Citizen Dashboard**: Accessed securely via QR code login. Provides dynamic routing, targeted announcements, and an emergency SOS panic button.
- **Community Lead Dashboard**: Allows staff to register residents with QR tokens, monitor real-time hospital occupancy, track active alarms, and broadcast instructions to specific floors or zones.
- **Responder Portal**: Live situational awareness tracking for emergency first-responders.

## Tech Stack
- Frontend: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Zustand
- Backend: Python, Flask, SQLite

## Setup Instructions

### Backend
1. `cd backend`
2. `pip install -r requirements.txt` (Installs Flask and flask-cors)
3. `python app.py`

### Frontend
1. `npm install`
2. `npm run dev`
