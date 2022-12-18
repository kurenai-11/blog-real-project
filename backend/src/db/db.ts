import mongoose, { Document, Model, Types } from "mongoose";

export const connect = (url: string) => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(url);
};

// utility stuff

export const findLastCreated = async <T>(model: Model<T>) => {
  return (await model.find({}).sort({ _id: -1 }).limit(1).exec())[0];
};

// types

export type FoundDocumentType<T> = Document<unknown, any, T> &
  T & {
    _id: Types.ObjectId;
  };
