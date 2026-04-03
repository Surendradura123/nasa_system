# 🚀 NASA Data Explorer (Full Stack SaaS Dashboard)

A modern **full-stack web application** that integrates multiple NASA APIs and presents space data through an interactive, animated, and SaaS-style dashboard.

---

## 🌐 Live Demo

👉 Frontend: https://nasa-system-omega.vercel.app/
👉 Backend API: https://nasa-system-backend.onrender.com

---

## 🧠 Project Overview (Deep Explanation)

This project is designed to simulate a **real-world SaaS product** that consumes multiple external APIs, processes the data in a backend service, and delivers it to a rich frontend dashboard.

### 🔄 Data Flow (How it works)

1. User opens the frontend dashboard (React)
2. Frontend calls backend APIs (Express)
3. Backend fetches data from NASA APIs using Axios
4. Backend processes / filters / adds fallback data
5. Frontend receives structured JSON
6. UI renders charts, images, and cards

👉 This architecture ensures:

* Better security (API key hidden in backend)
* Better performance (centralized data handling)
* Better scalability

---

## ✨ Features (Detailed)

### 🌌 APOD (Astronomy Picture of the Day)

* Fetches NASA's daily featured space image
* Displays title, explanation, and HD image
* Includes fallback if API fails

### 🚀 Mars Rover Photos

* Displays photos from Curiosity rover
* Uses `sol=1000` for stable dataset
* Grid layout with image preview cards

### 🌍 EPIC (Earth Images)

* Shows satellite images of Earth
* Dynamically builds image URLs from metadata
* Handles missing data gracefully

### ☄️ Near-Earth Objects (NeoWs)

* Displays asteroid data
* Includes charts (size, count, hazard level)
* Useful for data visualization demonstration

### 🔍 NASA Image Search

* Search NASA's media library
* Displays images/videos dynamically
* Supports keyword-based exploration

---

## 📊 Data Visualization (In Depth)

This project emphasizes **data storytelling**:

* 📈 Asteroid charts → show trends and counts
* 🖼️ Image grids → visually explore space data
* 📊 Dashboard layout → organize complex data

Libraries used:

* Recharts / Chart.js → for graphs
* Tailwind → for layout

👉 Goal: Make raw API data **user-friendly and meaningful**

---

## 🎨 UI/UX Design Philosophy

This app follows **modern SaaS design patterns**:

* Sidebar navigation (like Stripe / Notion)
* Card-based UI (clean and modular)
* Smooth animations (Framer Motion)
* 3D background (Three.js for premium feel)

👉 Focus:

* Clean spacing
* Consistent colors
* Responsive design

---

## 🛠️ Tech Stack (Why these tools?)

### Frontend

* **React.js** → component-based architecture
* **Tailwind CSS** → fast UI development
* **Framer Motion** → smooth animations
* **Recharts** → charts & analytics
* **Three.js** → 3D visuals

### Backend

* **Node.js + Express** → lightweight API server
* **Axios** → external API calls
* **dotenv** → secure API key handling

### Testing

* **Jest + Supertest** → API testing & coverage 
* POSTMAN

---

## 🔌 API Integration (How it's handled)

Each API is wrapped inside a **service layer**:

```js
// example flow
controller -> service -> axios -> NASA API
```

### Benefits:

* Clean separation of concerns
* Easy to test
* Easy to scale

---

## 🧪 Testing Strategy (Important)

* Mocked Axios calls
* Tested all routes
* Added fallback scenarios

👉 Achieved:

* High test coverage (~90%+)
* Reliable API behavior

---

## 📈 Performance & Optimization

* API fallbacks → prevents crashes
* Lazy loading → faster UI
* Disabled source maps → faster build
* Optimized API calls

---

## 🚧 Challenges Solved (Real-world)

### ❌ NASA API failures

✔ Solved using fallback data

### ❌ CORS issues

✔ Fixed via backend proxy

### ❌ Deployment errors

✔ Handled environment configs

### ❌ Test failures

✔ Fixed with proper mocking

---

## 🔮 Future Improvements

* Authentication (JWT)
* Save favorites
* Dark/light mode
* Advanced filters
* Real-time updates

---

## Author

Surendra Dura

---

## Why this project matters

This project demonstrates:

* Full-stack development
* API integration
* Testing practices
* UI/UX design
* Deployment skills


---
