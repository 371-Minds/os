///(so cucumber-js knows how to execute your tasks.feature scenarios)

import { Given, When, Then } from "@cucumber/cucumber";
import request from "supertest";
import app from "../../src/app.js";
import assert from "assert";

let response;
let createdTask;

Given("I am an authenticated user", function () {
  // For now assume all users are authenticated
});

Given("a task with ID {string} exists", async function (id) {
  const res = await request(app).post("/tasks").send({ title: "Sample task" });
  createdTask = res.body;
  createdTask.id = id; // override for deterministic ID if needed
});

When("I send a POST request to {string} with JSON:", async function (path, body) {
  response = await request(app).post(path).send(JSON.parse(body));
});

When("I send a GET request to {string}", async function (path) {
  response = await request(app).get(path);
});

When("I send a PUT request to {string} with JSON:", async function (path, body) {
  response = await request(app).put(path).send(JSON.parse(body));
});

When("I send a PATCH request to {string} with JSON:", async function (path, body) {
  response = await request(app).patch(path).send(JSON.parse(body));
});

When("I send a DELETE request to {string}", async function (path) {
  response = await request(app).delete(path);
});

Then("the response status should be {int}", function (status) {
  assert.strictEqual(response.status, status);
});

Then("the response JSON should include {string}", function (field) {
  assert.ok(response.body[field] !== undefined);
});

Then("the response JSON should include {string} = {string}", function (field, value) {
  assert.strictEqual(String(response.body[field]), value);
});
