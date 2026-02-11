# Paddy Assistance (React + Tailwind + Vite)

A smart farming web app to assist paddy farmers with stage-wise cultivation guidance, notifications based on planting date, and a simulated disease detection demo.

## Tech
- React 18, React Router DOM
- Tailwind CSS
- Vite
- lucide-react icons
- LocalStorage for persistence

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build && npm run preview
   ```

## Features
- Registration stores `name`, `village`, and `plantingDate` in LocalStorage.
- Login checks stored registration (name + village).
- Notifications page shows due guidance items based on days since planting.
- Disease Detection page allows image upload and simulates detection with prevention tips.
- Profile shows stored farmer details.

## Notes
- To enable routing on static hosts, configure SPA fallback (Vite preview handles it automatically).
- You can swap the simulated detection with TensorFlow.js later in `src/utils/diseaseModel.js`.


