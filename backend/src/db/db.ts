import mongoose from "mongoose";

export const connect = (url: string) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(url);
};
