require("dotenv").config();

const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const apiUrl = process.env.TEST_API_URL || "http://localhost:3000";

const api = request(apiUrl);

let gameId;
let developerId;
let consoleId;
let userId;

test("GET /games returns an array", async () => {
  const response = await api.get("/games");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));

  if (response.body.length > 0) {
    gameId = response.body[0]._id;
  }
});

test("GET /games/:id returns one game", async (t) => {
  if (!gameId) {
    return t.skip("No game documents are available.");
  }

  const response = await api.get(`/games/${gameId}`);

  assert.equal(response.status, 200);
  assert.equal(response.body._id, gameId);
});

test("GET /developers returns an array", async () => {
  const response = await api.get("/developers");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));

  if (response.body.length > 0) {
    developerId = response.body[0]._id;
  }
});

test("GET /developers/:id returns one developer", async (t) => {
  if (!developerId) {
    return t.skip("No developer documents are available.");
  }

  const response = await api.get(`/developers/${developerId}`);

  assert.equal(response.status, 200);
  assert.equal(response.body._id, developerId);
});

test("GET /consoles returns an array", async () => {
  const response = await api.get("/consoles");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));

  if (response.body.length > 0) {
    consoleId = response.body[0]._id;
  }
});

test("GET /consoles/:id returns one console", async (t) => {
  if (!consoleId) {
    return t.skip("No console documents are available.");
  }

  const response = await api.get(`/consoles/${consoleId}`);

  assert.equal(response.status, 200);
  assert.equal(response.body._id, consoleId);
});

test("GET /users returns an array", async () => {
  const response = await api.get("/users");

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));

  if (response.body.length > 0) {
    userId = response.body[0]._id;
  }
});

test("GET /users/:id returns one user", async (t) => {
  if (!userId) {
    return t.skip("No user documents are available.");
  }

  const response = await api.get(`/users/${userId}`);

  assert.equal(response.status, 200);
  assert.equal(response.body._id, userId);
});
