const BASE_URL = "https://nasa-system-backend.onrender.com/api";

// 🌌 APOD
export const getApod = async () => {
  const res = await fetch(`${BASE_URL}/apod`);
  return res.json();
};

// 🚀 Mars
export const getMars = async () => {
  const res = await fetch(`${BASE_URL}/mars`);

  if (!res.ok) throw new Error("Mars API failed");

  return res.json();
};

// ☄️ NEO
export const getNeo = async () => {
  const res = await fetch(`${BASE_URL}/neo`);
  return res.json();
};

// 🌍 EPIC
export const getEpic = async () => {
  const res = await fetch(`${BASE_URL}/epic`);
  return res.json();
};

// 🔍 Search
export const searchImages = async (query) => {
  const res = await fetch(`${BASE_URL}/search?q=${query}`);
  return res.json();
};