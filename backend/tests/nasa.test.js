// ✅ MOCK AXIOS FIRST
jest.mock("axios");

// ✅ IMPORTS
const axios = require("axios");
const request = require("supertest");

// ✅ MOCK INSTANCE
const mockAxiosInstance = {
  get: jest.fn()
};

// ✅ MOCK axios.create
axios.create = jest.fn(() => mockAxiosInstance);

// ✅ IMPORT APP AFTER MOCK
const app = require("../src/app");

describe("🚀 NASA API Routes (95% Coverage)", () => {

  // 🔇 MUTE LOGS (clean test output)
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 🌌 APOD
  test("GET /api/apod - success", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: { title: "Test APOD", url: "test.jpg" }
    });

    const res = await request(app).get("/api/apod");

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Test APOD");
  });

  test("GET /api/apod - fallback", async () => {
    mockAxiosInstance.get.mockRejectedValueOnce(new Error());

    const res = await request(app).get("/api/apod");

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBeDefined();
  });

  test("GET /api/apod - empty response", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({ data: {} });

    const res = await request(app).get("/api/apod");

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

  // 🚀 MARS
  test("GET /api/mars - success", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: { photos: [{ id: 1 }, { id: 2 }] }
    });

    const res = await request(app).get("/api/mars");

    expect(res.statusCode).toBe(200);
    expect(res.body.photos.length).toBeGreaterThan(0);
  });

  test("GET /api/mars - fallback", async () => {
    mockAxiosInstance.get.mockRejectedValueOnce(new Error());

    const res = await request(app).get("/api/mars");

    expect(res.statusCode).toBe(200);
    expect(res.body.photos).toBeDefined();
  });

  test("GET /api/mars - empty photos", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: { photos: [] }
    });

    const res = await request(app).get("/api/mars");

    expect(res.statusCode).toBe(200);
    expect(res.body.photos).toEqual([]);
  });

  // ☄️ NEO
  test("GET /api/neo - success", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: { element_count: 42 }
    });

    const res = await request(app).get("/api/neo");

    expect(res.statusCode).toBe(200);
    expect(res.body.element_count).toBe(42);
  });

  test("GET /api/neo - fallback", async () => {
    mockAxiosInstance.get.mockRejectedValueOnce(new Error());

    const res = await request(app).get("/api/neo");

    expect(res.statusCode).toBe(200);
  });

  // 🌍 EPIC
  test("GET /api/epic - success", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: [{ image: "epic1" }]
    });

    const res = await request(app).get("/api/epic");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/epic - fallback", async () => {
    mockAxiosInstance.get.mockRejectedValueOnce(new Error());

    const res = await request(app).get("/api/epic");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("GET /api/epic - empty", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: []
    });

    const res = await request(app).get("/api/epic");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // 🔍 SEARCH
  test("GET /api/search - success", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: {
        collection: {
          items: [{ data: [{ title: "Moon" }] }]
        }
      }
    });

    const res = await request(app).get("/api/search?q=moon");

    expect(res.statusCode).toBe(200);
    expect(res.body.collection).toBeDefined();
  });

  test("GET /api/search - fallback", async () => {
    mockAxiosInstance.get.mockRejectedValueOnce(new Error());

    const res = await request(app).get("/api/search?q=moon");

    expect(res.statusCode).toBe(200);
    expect(res.body.collection).toBeDefined();
  });

  test("GET /api/search - default query", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: {
        collection: {
          items: [{ data: [{ title: "Default" }] }]
        }
      }
    });

    const res = await request(app).get("/api/search");

    expect(res.statusCode).toBe(200);
  });

  test("GET /api/search - empty result", async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: {
        collection: {
          items: []
        }
      }
    });

    const res = await request(app).get("/api/search?q=space");

    expect(res.statusCode).toBe(200);
    expect(res.body.collection.items).toEqual([]);
  });

});