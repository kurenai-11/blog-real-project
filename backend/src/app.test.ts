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
});
