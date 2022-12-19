import { Schema, model } from "mongoose";

interface ICounter {
  counterName: string;
  counter: number;
}

const counterSchema = new Schema<ICounter>({
  counterName: { type: String, required: true },
  counter: { type: Number, required: true },
});

export const Counter = model<ICounter>("Counter", counterSchema);
