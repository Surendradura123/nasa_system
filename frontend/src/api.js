const BASE_URL = "http://localhost:5001/api";

export const getApod = async () => {
  const res = await fetch(`${BASE_URL}/apod`);
  return res.json();
};

export const getMars = async () => {
  const res = await fetch(`${BASE_URL}/mars`);
  return res.json();
};

export const getNeo = async () => {
  const res = await fetch(`${BASE_URL}/neo`);
  return res.json();
};