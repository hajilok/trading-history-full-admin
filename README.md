# Trading History Full Admin

A comprehensive Next.js 15 dashboard for managing and analyzing trading history, built with the "Financial Atelier" aesthetic. This project features automated trade ingestion, real-time analytics, and API token management.

## Backend Repository
The backend for this project can be found here:
[https://github.com/hajilok/trading-history-full-admin-backend](https://github.com/hajilok/trading-history-full-admin-backend)

## Technologies Used
- Next.js 15
- React 19
- Tailwind CSS v3
- TypeScript

## Setup Instructions

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd trading-history-full-admin
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and configure the backend API URL. For example:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3002
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Build for Production
To build the application for production, run:
```bash
npm run build
npm start
```
