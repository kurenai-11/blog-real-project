import { Counter } from "../models/counter.model.js";

type CounterType = "user" | "blog" | "comment" | "post";

export const initializeCounters = async () => {
  // initializing counter collection if it doesn't exist on the server startup
  const userCounter = await Counter.findOne({ counterName: "user" });
  const blogCounter = await Counter.findOne({ counterName: "blog" });
  const commentCounter = await Counter.findOne({ counterName: "comment" });
  const postCounter = await Counter.findOne({ counterName: "post" });
  if (!userCounter) {
    await Counter.create({
      counterName: "user",
      counter: -1,
    });
  }
  if (!blogCounter) {
    await Counter.create({
      counterName: "blog",
      counter: -1,
    });
  }
  if (!commentCounter) {
    await Counter.create({
      counterName: "comment",
      counter: -1,
    });
  }
  if (!postCounter) {
    await Counter.create({
      counterName: "post",
      counter: -1,
    });
  }
};

export const incrementCounter = async (counter: CounterType) => {
  await Counter.updateOne({ counterName: counter }, { $inc: { counter: 1 } });
};

export const findCount = async (counter: CounterType): Promise<number> => {
  return (await Counter.findOne({ counterName: counter }))!.counter;
};
