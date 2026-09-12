<div align="center">
  <h1 align="center">🎬 Shasha (Movie Web Application)</h1>
  <p align="center">
    A modern, feature-rich movie discovery web application built with React, Tailwind CSS, TMDB API, and Appwrite.
  </p>
  
  <p align="center">
    <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38BDF8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/Appwrite-Backend-F02E65?style=for-the-badge&logo=appwrite" alt="Appwrite">
    <img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite" alt="Vite">
  </p>
</div>

---

## 🌟 Features

- **Dynamic Movie Discovery**: Browse popular movies or search through thousands of titles instantly using the TMDB API.
- **Debounced Search**: Optimized search bar with delay handling to prevent excessive API calls.
- **Trending Searches Tracking**: Automatically tracks and displays the most searched movies using **Appwrite** database integration.
- **Cinematic UI/UX**: Immersive dark theme, custom gradients, smooth fading background masks, and responsive movie cards built with Tailwind CSS.
- **Detailed View & Trailers**: Click on any movie to view full details alongside embedded YouTube trailers.
- **Client-Side Routing**: Smooth page navigation using `react-router-dom`.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, React Router, Tailwind CSS
- **APIs**: The Movie Database (TMDB) API
- **Backend-as-a-Service**: Appwrite (for tracking search analytics)
- **Utilities**: `react-use` (for debouncing)

---

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### 1. Clone the repository
git clone https://github.com/mohamed-x-mamdouh/Movie-App.git
cd Movie-App

### 2. Install dependencies
npm install

### 3. Set up Environment Variables
Create a `.env.local` file in the root directory and add your API keys:
VITE_TMDB_API_KEY=your_tmdb_bearer_token_or_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id

### 4. Run the development server
npm run dev

Open http://localhost:5173 in your browser to view the app.

---

## 📦 Building for Production

To build the app for production optimization:
npm run build

---

## 👤 Author

**Mohamed Mamdouh**
- GitHub: [@mohamed-x-mamdouh](https://github.com/mohamed-x-mamdouh)