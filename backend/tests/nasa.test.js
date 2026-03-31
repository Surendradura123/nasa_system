// 🔥 MOCK FIRST
jest.mock("axios");

const axios = require("axios");

// 🔥 Mock axios instance
const mockAxiosInstance = {
  get: jest.fn()
};

// 🔥 Mock axios.create BEFORE importing app
axios.create = jest.fn(() => mockAxiosInstance);

const request = require("supertest");
const app = require("../src/app");

describe("NASA API Routes", () => {

  // 🔇 Clean console output during tests
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ============================
  // APOD
  // ============================

  describe("GET /api/apod", () => {

    test("should return APOD data (200)", async () => {
      mockAxiosInstance.get.mockResolvedValue({
        data: {
          title: "Test APOD",
          url: "test.jpg"
        }
      });

      const res = await request(app).get("/api/apod");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("title", "Test APOD");
      expect(res.body).toHaveProperty("url");
    });

    test("should handle APOD error (500)", async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error("API failed"));

      const res = await request(app).get("/api/apod");

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("message");
    });

  });

  // ============================
  // MARS
  // ============================

  describe("GET /api/mars", () => {

    test("should return Mars photos (200)", async () => {
      mockAxiosInstance.get.mockResolvedValue({
        data: {
          photos: [
            { id: 1, img_src: "mars1.jpg" }
          ]
        }
      });

      const res = await request(app).get("/api/mars");

      expect(res.statusCode).toBe(200);
      expect(res.body.photos).toBeInstanceOf(Array);
      expect(res.body.photos.length).toBeGreaterThan(0);
    });

    test("should handle Mars error (500)", async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error("Mars API failed"));

      const res = await request(app).get("/api/mars");

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("message");
    });

  });

  // ============================
  // NEO
  // ============================

  describe("GET /api/neo", () => {

    test("should return NEO data (200)", async () => {
      mockAxiosInstance.get.mockResolvedValue({
        data: {
          near_earth_objects: {}
        }
      });

      const res = await request(app).get("/api/neo");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("near_earth_objects");
    });

    test("should handle NEO error (500)", async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error("NEO API failed"));

      const res = await request(app).get("/api/neo");

      expect(res.statusCode).toBe(500);
      expect(res.body).toHaveProperty("message");
    });

  });

});