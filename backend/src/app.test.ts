import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import dotenv from "dotenv";
import app from "./app.js";
import { connect as connectToDB } from "./db/db.js";
import mongoose from "mongoose";

describe("app", () => {
  beforeAll(() => {
    dotenv.config({ path: "backend/.env" });
  });
  afterAll(() => {
    mongoose.disconnect();
  });
  it("should have MONGO_URL environment variable defined", () => {
    expect(process.env.MONGO_URL).toBeDefined();
  });
  it("should properly start http server", async () => {
    const response = await request(app).get("/");
    return expect(response.body).toEqual({
      message: "yes the server is working",
    });
  });
  it("should properly connect to the database.", async () => {
    await expect(connectToDB(process.env.MONGO_URL!)).resolves.toBeDefined();
  });
  const FAKE_USER_ID = 0;
  const FAKE_USER_AUTHKEY = "eb1f4c78-359c-4eb9-a3ed-65b4cfbe6ac6";
  describe("routes", () => {
    describe("blog route", () => {
      describe("GET /blog/", () => {
        let response: request.Response;
        beforeAll(async () => {
          response = await request(app).get("/blog");
        });
        it("should get recently created blogs without query parameters", () => {
          expect(response.body.status).toBe("success");
        });
        it("should have blogs populated", () => {
          expect(response.body.blogs.length).toBeGreaterThan(0);
        });
        it.todo("should work with query parameters");
      });
      describe("POST /blog", () => {
        let createdBlogId: number;
        it("should return 400 with the invalid request", async () => {
          const response = await request(app).post("/blog").send({
            title: 15,
            description: "hey",
            userId: 12,
            authKey: "hey hey",
          });
          expect(response.statusCode).toEqual(400);
        });
        it("should check auth key to create a new blog", async () => {
          const response = await request(app).post("/blog").send({
            title: "a test blog",
            description: "a test blog description",
            userId: FAKE_USER_ID,
            authKey: "hey hey",
          });
          expect(response.statusCode).toEqual(401);
        });
        it("should be able to create a new blog", async () => {
          const response = await request(app).post("/blog").send({
            title: "a test blog",
            description: "a test blog description",
            userId: FAKE_USER_ID,
            authKey: FAKE_USER_AUTHKEY,
          });
          createdBlogId = response.body.blogId;
          expect(response.statusCode).toEqual(200);
        });
        afterAll(async () => {
          const response = await request(app).delete("/blog/").send({
            authKey: "eb1f4c78-359c-4eb9-a3ed-65b4cfbe6ac6",
            userId: FAKE_USER_ID,
            blogId: createdBlogId,
          });
          expect(response.statusCode).toEqual(200);
        });
      });
    });
    describe.todo("post route");
    describe.todo("user route");
  });
  describe("controllers", () => {
    describe.todo("auth controller");
    describe.todo("blog controller");
  });
});
