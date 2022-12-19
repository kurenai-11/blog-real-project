import { Response } from "express";

export const genericInvalidRequest = (res: Response) => {
  res.status(200).send({ status: "fail", error: "Invalid request" });
};
