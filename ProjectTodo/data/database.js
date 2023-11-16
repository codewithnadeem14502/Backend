import mongoose from "mongoose";

export const connetDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "apidb",
    })
    .then((c) => console.log("Database is connected "))
    .catch((e) => console.log(e));
};
