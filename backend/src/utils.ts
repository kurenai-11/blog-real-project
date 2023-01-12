import { Response } from "express";

export const genericInvalidRequest = (res: Response) => {
  res.status(400).send({ status: "fail", error: "Invalid request" });
};
